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

    return {name, marker, startPlayersTurn, endPlayersTurn};
}

function playGame() {
    const playerOne = createPlayer("Player-1", "X");
    const playerTwo = createPlayer("Player-2", "O");

    // Swtiching Players
    function changePlayersTurn() {

    }

    // Winning Condition
    function checkWinner() {
        console.log("Winner");
    }

    // Draw Condition
    function checkIfDraw() {
        console.log("Draw");
    }

    // Player Moves
    function makeMove() {
        console.log("Move Made");
    }

    // Cell Validation
    function checkIfCellEmpty() {
        console.log("Cell Empty");
    }

    // Game Over
    function checkIfGameOver() {
        console.log("Game Over");
    }

    return {changePlayersTurn, checkWinner, checkIfDraw, makeMove, checkIfGameOver};
}

// Some Testing
console.log(gameboard)
const game = playGame();
