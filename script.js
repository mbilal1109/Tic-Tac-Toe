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
    function checkWinner() {
        // Can win verically, horizontally, and diagonally
        console.log("Winner");
    }

    // Draw Condition
    function checkIfDraw() {
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
                console.log("Cell is empty!")
                return true;
            } 
            console.log("Cell is not empty!")
            return false;
        }
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
gameboard[1][2] = "X"

const playerOne = createPlayer("Player-1", "X");
const playerTwo = createPlayer("Player-2", "O");

const game = playGame();
game.checkIfCellEmpty(1, 2);
game.checkIfCellEmpty(1, 1);

game.makeMove(1, 2, playerTwo);
