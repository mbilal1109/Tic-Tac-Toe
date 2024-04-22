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
    return {name, marker};
}

function playGame() {
    // Swtiching Players


    // Winning Condition


    // Draw Condition


    // Player Moves


    // Game Over

}

// Some Testing
console.log(gameboard)
console.log(createPlayer("Player1", "X"))