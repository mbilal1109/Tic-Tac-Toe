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
    let turnTaken = false;

    const startPlayersTurn = () => playersTurn = true;
    const endPlayersTurn = () => playersTurn = false;

    const triggerTurn = () => {
        // Player's turn will end if turnTaken is true
        if(turnTaken) {
            turnTaken = false;
        }
    }

    const checkIfTurnTaken = () => {
        if(turnTaken) {
            return true;
        } else {
            return false;
        }
    }

    return {name, marker, startPlayersTurn, endPlayersTurn, triggerTurn, checkIfTurnTaken};
}

function playGame() {
    // Winning Condition
    function checkWinner() {
        // Can win from 
        console.log("Winner");
    }

    // Draw Condition
    function checkIfDraw() {
        console.log("Draw");
    }

    // Player Moves
    function makeMove(player) {
        // before the move is made, check if cell is valid
        checkIfCellEmpty();
        console.log("Move Made");
        player.triggerTurn();
        player.endPlayersTurn();
        // Also will need to check the winner after every move and draw
    }

    // Cell Validation
    function checkIfCellEmpty(row, column, player) {
        // First check if the row & cols given are valid
        // Next check if that index is empty or not
        if(row <= 2 && column <= 2) {
            gameArray = gameboard;
            if(gameArray[row][column] == '') {
                gameArray[row][column] = player.marker;
                console.log(gameArray)
            } else {
                console.log("Cell is not empty!")
            }
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
game.checkIfCellEmpty(1, 2, playerOne);
game.checkIfCellEmpty(1, 1, playerOne);
