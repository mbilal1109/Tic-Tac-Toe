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

    return {name, marker, startPlayersTurn, endPlayersTurn, isPlayersTurn};
}

function playGame() {
    // Winning Condition
    function checkIfWinner(player) {
        // Can win vertically, horizontally, and diagonally
        // Player can win from 8 ways: 3 vertically, 3 horizontallly, 2 diagonally
        let count = 0;

        for(let col = 0; col < gameboard.length; col++) {
            for(let row = 0; row < gameboard.length; row++) {
                if(gameboard[col][row] == player.marker && count < 3) {
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
    function checkIfDraw(totalTurns, playerOne, playerTwo) {
        // Keep a var that keeps track of the moves made in total by both players
        // Total 9 moves can be made, if var reaches 9 and no winner declared then its
        // a draw.
        if(totalTurns == 9 && !checkIfWinner(playerOne) && !checkIfWinner(playerTwo)) {
            console.log("Draw");
            return true;
        }
        return false;
    }

    // Player Moves
    function makeMove(row, column, player) {
        // Before the move is made, check if cell is valid
        // If cell valid, then it will place the marker
        if(checkIfCellEmpty(row, column, player)) {
            gameboard[row][column] = player.marker;
            console.log("Move Made");
        } else {
            console.log("Select a valid cell");
        }
        // Also will need to check if winner should be declared or
        // a draw should happen.
    }

    // Cell Validation
    function checkIfCellEmpty(row, column) {
        // First check if the row & cols given are valid
        // Next check if that index is empty or not
        if(row <= 2 && column <= 2) {
            if(gameboard[row][column] == '') {
                console.log("Cell is empty!");
                return true;
            } 
            console.log("Cell is not empty!");
            return false;
        }
        console.log("Cell Out Of Bound, Row & Columns Start From 0.");
    }

    // Cell Validation
    function checkIfCellIsEmpty(savedCellInfo, cellValues) {
        if(cellValues.includes(savedCellInfo)) {
            console.log("It includes")
            return true;
        } 
        console.log("Cell not Empty!")
        return false;
    }

    // Game Over
    function endGame(player) {
        // Resetting the gameboard array
        for(let row = 0; row < gameboard.length; row++) {
            for(let col = 0; col < gameboard.length; col++) {
                gameboard[row][col] = '';
            }
        }
        console.log(`${player.name} Wins!!`);
        console.log("Game Over");
    }

    // function gameOver(player, cellValues) {

    // }

    return {checkIfWinner, checkIfDraw, makeMove, endGame, checkIfCellIsEmpty};
}

function playGameUI() {
    const container = document.querySelector("#container");
    const cellValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    const playerOne = createPlayer("Player-1", "X");
    const playerTwo = createPlayer("Player-2", "O");
    playerOne.startPlayersTurn();
    const game = playGame();
    
    function displayGameboard() {
        for(let i = 0; i <= 8; i++) {
            let innerContainer = document.createElement("div");
            innerContainer.setAttribute("class", "inner-container");
            innerContainer.setAttribute("data-index", `${i}`);
            container.appendChild(innerContainer);
            container.style.setProperty('grid-template-columns', 'repeat(' + 3 + ', 1fr)');
            container.style.setProperty('grid-template-rows', 'repeat(' + 3 + ', 1fr)');
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

    function displayPlayersMarker(event) {
        const clickedCell = event.target
        const savedCellInfo = clickedCell.getAttribute("data-index");
        const markerSpace = document.createElement("p");

        // grabbing a specific element using the data attribute value
        const cell = document.querySelector(`[data-index="${savedCellInfo}"]`);

        if(game.checkIfCellIsEmpty(savedCellInfo, cellValues)) {
            let cellIndex = cellValues.indexOf(savedCellInfo);
            cellValues.splice(cellIndex, 1);

            if(playerOne.isPlayersTurn()) {
                markerSpace.innerHTML = playerOne.marker;
                cell.appendChild(markerSpace);
                playerOne.endPlayersTurn();
                playerTwo.startPlayersTurn();
            } else {
                markerSpace.innerHTML = playerTwo.marker;
                cell.appendChild(markerSpace);
                playerTwo.endPlayersTurn();
                playerOne.startPlayersTurn();
            }
        }
    }

    function clearUIGrid() {
        const clearButton = document.querySelector("#clear");
        clearButton.addEventListener('click', function() {
            window.location.reload();
        });
    }

    return { displayGameboard, getHoverEffect, displayPlayersMarker, clearUIGrid }
}

function startGame() {
    const playerOne = createPlayer("Player-1", "X");
    const playerTwo = createPlayer("Player-2", "O");
    const gameUI = playGameUI();

    playerTwo.startPlayersTurn();
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


// Testing

// const game = playGame();

// // Diagonal Testing from [0][0]:
// // game.makeMove(0, 0, playerOne);

// // game.makeMove(1, 1, playerOne);

// // game.makeMove(2, 2, playerOne);

// // ---------------------------------

// // Diagonal Testing from [0][2]:
// game.makeMove(0, 2, playerOne);

// game.makeMove(1, 1, playerOne);

// game.makeMove(2, 0, playerOne);
// game.checkIfCellEmpty(3, 2);

// // ---------------------------------

// // Horizontal Testing:
// // game.makeMove(0, 0, playerOne);

// // game.makeMove(0, 1, playerOne);

// // game.makeMove(0, 2, playerOne);

// // ---------------------------------

// // Vertical Testing:
// // game.makeMove(0, 1, playerOne);

// // game.makeMove(1, 1, playerOne);

// // game.makeMove(2, 1, playerOne);

// game.checkIfWinner(playerOne);
// game.endGame(playerOne);
