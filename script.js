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
    function checkWinner(player) {
        // Can win vertically, horizontally, and diagonally
        // Player can win from 8 ways: 3 vertically, 3 horizontallly, 2 diagonally
        gameArray = gameboard;
        let count = 0;

        // for(let row = 0; row < gameboard.length; row++) {
        //     for(let col = 0; col < gameboard.length; col++) {
        //         if(gameboard[row][col] == player.marker && count <= 3) {
        //             count++;
        //         }
        //     }
        // }

        // for(let col = 0; col < gameboard.length; col++) {
        //     for(let row = 0; row < gameboard.length; row++) {
        //         if(gameboard[col][row] == player.marker && count <= 3) {
        //             count++;
        //         }
        //     }
        // }

        // First Diagonal Check
        for(let row = 0; row < gameboard.length; row++) {
            if(gameboard[row][row] == player.marker && count < 3) {
                count++;
            }
        }
        //count = winningHelper(count);

        // Second Diagonal Check
        let col = gameboard.length - 1; // should be 2 according to the board
        for(let row = 0; row < gameboard.length; row++) {
            if(gameboard[row][col] == player.marker && count < 3) {
                count++;
                col--;
            }
        }
        //winningHelper(count);
    }

    function winningHelper(count) {
        if(count == 3) {
            console.log("Winner -> True")
        }
        console.log("Winner -> False")
        return 0;
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
    function checkIfGameOver() {
        console.log("Game Over");
        // If a winner is found or draw happens then we call this method
        // Need to use checkWinner and checkIfDraw methods here
    }

    return {checkWinner, checkIfDraw, makeMove, checkIfGameOver, checkIfCellEmpty};
}

// Some Testing
console.log(gameboard)

const playerOne = createPlayer("Player-1", "X");
const playerTwo = createPlayer("Player-2", "O");

const game = playGame();
game.makeMove(0, 2, playerOne);

game.makeMove(1, 1, playerOne);

game.makeMove(2, 0, playerOne);

game.checkWinner(playerOne);
