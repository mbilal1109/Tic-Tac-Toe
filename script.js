// Gameboard
const gameboard = (function() {
    let gameboardArray = [];
    let rows = 3;
    let columns = 3;
    for(let i = 0; i < rows; i++) {
        gameboardArray[i] = [];
        for(let j = 0; j < columns; j++) {
            gameboardArray[i][j] = ''
        }
    }
    return gameboardArray;
})();

function createPlayer(name, marker) {
    let playersTurn = false;

    const startPlayersTurn = () => playersTurn = true;
    const endPlayersTurn = () => playersTurn = false;
    const isPlayersTurn = () => playersTurn;

    return { name, marker, startPlayersTurn, endPlayersTurn, isPlayersTurn };
}

function playGame() {
    // Winning Condition
    function checkIfWinner(player) {
        // Can win vertically, horizontally, and diagonally
        // Player can win from 8 ways: 3 vertically, 3 horizontallly, 2 diagonally
        let count = 0;

        for(let row = 0; row < gameboard.length; row++) {
            count = 0;
            for(let col = 0; col < gameboard.length; col++) {
                if(gameboard[row][col] == player.marker && count < 3) {
                    count++;
                }
            }
            if(count == 3) {
                console.log("Winner -> True")
                return true;
            }
        }

        if(count != 3) {
            count = 0;
            // First Diagonal Check
            for(let row = 0; row < gameboard.length; row++) {
                count = 0;
                for(let col = 0; col < gameboard.length; col++) {
                    if(gameboard[col][row] == player.marker && count < 3) {
                        count++;
                    }
                }
            }
        } else {
            console.log("Winner -> True")
            return true;
        }

        if(count != 3) {
            count = 0;
            // First Diagonal Check
            for(let row = 0; row < gameboard.length; row++) {
                if(gameboard[row][row] == player.marker) {
                    count++;
                }
            }
        } else {
            console.log("Winner -> True")
            return true;
        }

        if(count != 3) {
            count = 0;
            // Second Diagonal Check
            let col = gameboard.length - 1;
            for(let row = 0; row < gameboard.length; row++) {
                if(gameboard[row][col] == player.marker) {
                    count++;
                    col--;
                }
            }
        } else {
            console.log("Winner -> True")
            return true;
        }

        console.log("Winner -> False")
        return false;
    }

    // Draw Condition
    // Later check the winning condition methods here, along with cellValues
    function checkIfDraw(cellValues) {
        if(cellValues.length == 0) {
            return true;
        }
        return false;
    }

    // Player Moves
    function makeMove(markerSpace, cell, playerOne, playerTwo, savedRowInfo, savedColInfo) {
        if(playerOne.isPlayersTurn()) {
            markerSpace.innerHTML = playerOne.marker;
            gameboard[savedRowInfo][savedColInfo] = playerOne.marker;
            cell.appendChild(markerSpace);
            playerOne.endPlayersTurn();
            playerTwo.startPlayersTurn();
        } else {
            markerSpace.innerHTML = playerTwo.marker;
            gameboard[savedRowInfo][savedColInfo] = playerTwo.marker;
            cell.appendChild(markerSpace);
            playerTwo.endPlayersTurn();
            playerOne.startPlayersTurn();
        }
    }

    // Cell Validation
    function checkIfCellEmpty(savedCellInfo, cellValues) {
        if(cellValues.includes(savedCellInfo)) {
            console.log("It includes")
            return true;
        } 
        console.log("Cell not Empty!")
        return false;
    }

    function clearGameboard() {
        // Resetting the gameboard array
        for(let row = 0; row < gameboard.length; row++) {
            for(let col = 0; col < gameboard.length; col++) {
                gameboard[row][col] = '';
            }
        }
    }

    // Game Over
    function gameOver(player, cellValues) {
        // Check if the game is draw, or if one of the players has won.
        console.log(gameboard);
        if(checkIfDraw(cellValues)) {
            alert("Draw!!!");
            alert("Game Over!");
            return true; 
        } else if(checkIfWinner(player)) {
            alert(`${player.name} Wins!!`);
            alert("Game Over!");
            return true;
        }
        return false;
    }

    return { makeMove, gameOver, checkIfCellEmpty, clearGameboard }; 
}

function playGameUI() {
    const container = document.querySelector("#container");
    const cellValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

    const playerOne = createPlayer("Player-1", "X");
    const playerTwo = createPlayer("Player-2", "O");
    playerOne.startPlayersTurn();
    
    const game = playGame();
    let tempCount = 0;
    let row = 0;
    let column = 0;
    
    function displayGameboard() {
        for(let i = 0; i <= 8; i++) {
            let innerContainer = document.createElement("div");
            innerContainer.setAttribute("class", "inner-container");
            tempCount++;
            innerContainer.setAttribute("data-row", `${row}`);
            innerContainer.setAttribute("data-column", `${column}`);
            innerContainer.setAttribute("data-index", `${i}`);
            container.appendChild(innerContainer);
            container.style.setProperty('grid-template-columns', 'repeat(' + 3 + ', 1fr)');
            container.style.setProperty('grid-template-rows', 'repeat(' + 3 + ', 1fr)');
            column++;

            if(tempCount == 3) {
                row++;
                column = 0;
                tempCount = 0;
            }
        }
    }

    function getHoverEffect() {
        const innerContainer = document.querySelectorAll(".inner-container");
        innerContainer.forEach((div) => {
            div.addEventListener("mouseover", function () {
                div.classList.add("hover-effect");
            });
            div.addEventListener("mouseout", function () {
                div.classList.remove("hover-effect");
            });
        });
    }

    function clearUIGameboard() {
        const innerContainer = document.querySelectorAll(".inner-container");
        innerContainer.forEach((div) => {
            div.innerHTML = "";
        });
    }

    function displayPlayersMarker(event) {
        // Event Delegation
        const clickedCell = event.target
        const savedCellInfo = clickedCell.getAttribute("data-index");
        const markerSpace = document.createElement("p");

        const savedRowInfo = clickedCell.getAttribute("data-row");
        const savedColInfo = clickedCell.getAttribute("data-column");

        // grabbing a specific element using the data attribute value
        const cell = document.querySelector(`[data-index="${savedCellInfo}"]`);

        if(game.checkIfCellEmpty(savedCellInfo, cellValues)) {
            let cellIndex = cellValues.indexOf(savedCellInfo);
            cellValues.splice(cellIndex, 1);
            const player = (playerOne.isPlayersTurn()) ? (playerOne) : (playerTwo);
            game.makeMove(markerSpace, cell, playerOne, playerTwo, savedRowInfo, savedColInfo);
            if(game.gameOver(player, cellValues)) {
                clearUIGameboard();
                game.clearGameboard();
                window.location.reload();
            }
        }
    }

    function clearUIGrid() {
        const clearButton = document.querySelector("#clear");
        clearButton.addEventListener('click', function() {
            window.location.reload();
        });
    }

    return { displayGameboard, getHoverEffect, displayPlayersMarker, clearUIGrid, clearUIGameboard }
}

function startGame() {
    const playerOne = createPlayer("Player-1", "X");
    const playerTwo = createPlayer("Player-2", "O");
    const gameUI = playGameUI();

    gameUI.displayGameboard();
    gameUI.getHoverEffect();

    const container = document.querySelector("#container");

    function start() {
        container.addEventListener("click", gameUI.displayPlayersMarker);
        gameUI.clearUIGrid();
    }
    
    return { start };
}

// Some Testing
const ticTacToe = startGame().start();
