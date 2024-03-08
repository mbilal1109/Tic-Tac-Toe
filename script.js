const gameboard = (function () {
  const gameboardArray = [];

  for (let row = 0; row < 3; row++) {
    gameboardArray[row] = [];
    for (let col = 0; col < 3; col++) {
      gameboardArray[row][col] = "";
    }
  }
  return gameboardArray;
})();

function createPlayer(name, marker) {
  let playerTurn = false;

  const isPlayersTurn = () => playerTurn;
  const endPlayersTurn = () =>
    playerTurn == true ? (playerTurn = false) : (playerTurn = true);

  return { name, marker, isPlayersTurn, endPlayersTurn };
}

function playGame() {
  const playerOne = createPlayer("Player-1", "X");
  const playerTwo = createPlayer("Player-2", "O");

  return { playerOne, playerTwo }
}



// Testing
console.log(gameboard);

const player1 = createPlayer("player1", "X");
console.log(player1)
console.log(player1.isPlayersTurn())
console.log(player1.endPlayersTurn())
console.log(player1.endPlayersTurn())
console.log(player1.endPlayersTurn())

console.log(playGame())
console.log(playGame().playerOne)
console.log(playGame().playerTwo)