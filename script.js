const Gameboard = (function () {
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
    playerTurn == false ? (playerTurn = true) : (playerTurn = false);

  return { name, marker, isPlayersTurn, endPlayersTurn };
}

// Testing
console.log(Gameboard);

const player1 = createPlayer("player1", "X");
console.log(player1)
console.log(player1.isPlayersTurn())
console.log(player1.endPlayersTurn())
console.log(player1.endPlayersTurn())
console.log(player1.endPlayersTurn())