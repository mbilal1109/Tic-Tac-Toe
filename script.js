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
    // let turnTaken = false;

    const startPlayersTurn = () => playersTurn = true;
    const endPlayersTurn = () => playersTurn = false;

    return {name, marker, startPlayersTurn, endPlayersTurn};
}

function playGame() {
    // Winning Condition
    function checkIfWinnerOrDraw(player) {
        // Can win vertically, horizontally, and diagonally
        // Player can win from 8 ways: 3 vertically, 3 horizontallly, 2 diagonally
        let count = 0;

        // for(let row = 0; row < gameboard.length; row++) {
        //     for(let col = 0; col < gameboard.length; col++) {
        //         if(gameboard[row][col] == player.marker && count <= 3) {
        //             count++;
        //         }
        //     }
        // }

        // if(count != 3) {
        //     count = 0;
        //     for(let col = 0; col < gameboard.length; col++) {
        //         count = 0;
        //         for(let row = 0; row < gameboard.length; row++) {
        //             if(gameboard[col][row] == player.marker && count < 3) {
        //                 count++;
        //             }
        //         }
        //         if(count == 3) {
        //             return true;
        //         }
        //     }
        // } else {
        //     console.log("Winner -> True")
        //     return true;
        // }

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
    function checkIfDraw() {
        // Keep a var that keeps track of the moves made in total by both players
        // Total 9 moves can be made, if var reaches 9 and no winner declared then its
        // a draw.
        console.log("Draw");
    }

    // Player Moves
    function makeMove(row, column, player) {
        // Before the move is made, check if cell is valid
        // If cell valid, then it will place the marker
        gameArray = gameboard;
        if(checkIfCellEmpty(row, column, player)) {
            gameArray[row][column] = player.marker;
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
            gameArray = gameboard;
            if(gameArray[row][column] == '') {
                console.log("Cell is empty!");
                return true;
            } 
            console.log("Cell is not empty!");
            return false;
        }
        console.log("Cell Out Of Bound, Row & Columns Start From 0.");
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

    return {checkIfWinnerOrDraw, checkIfDraw, makeMove, endGame, checkIfCellEmpty};
}

// Some Testing
console.log(gameboard)

const playerOne = createPlayer("Player-1", "X");
const playerTwo = createPlayer("Player-2", "O");

const game = playGame();

// Diagonal Testing from [0][0]:
// game.makeMove(0, 0, playerOne);

// game.makeMove(1, 1, playerOne);

// game.makeMove(2, 2, playerOne);

// ---------------------------------

// Diagonal Testing from [0][2]:
game.makeMove(0, 2, playerOne);

game.makeMove(1, 1, playerOne);

game.makeMove(2, 0, playerOne);

// ---------------------------------

// Horizontal Testing:
// game.makeMove(0, 0, playerOne);

// game.makeMove(0, 1, playerOne);

// game.makeMove(0, 2, playerOne);

// ---------------------------------

// Vertical Testing:
// game.makeMove(0, 1, playerOne);

// game.makeMove(1, 1, playerOne);

// game.makeMove(2, 1, playerOne);

game.checkIfWinnerOrDraw(playerOne);
game.endGame(playerOne);
