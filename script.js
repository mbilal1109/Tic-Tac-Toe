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

  const startPlayersTurn = function () {
    if (playerTurn == false) return (playerTurn = true);
  };

  const endPlayersTurn = function () {
    if (playerTurn == true) return playerTurn == false;
  };

  return { name, marker, isPlayersTurn, endPlayersTurn, startPlayersTurn };
}

function updateGameboard(row, col, player, gameboard) {
  gameboard[row][col] = player.marker;
  return gameboard;
}

function playGame() {
  const playerOne = createPlayer("Player-1", "X");
  const playerTwo = createPlayer("Player-2", "O");
  const gameboardObj = gameboard;

  console.log(updateGameboard(2, 0, playerOne, gameboardObj));
  console.log(updateGameboard(2, 2, playerTwo, gameboardObj));
  console.log(updateGameboard(0, 0, playerOne, gameboardObj));
  console.log(updateGameboard(1, 1, playerTwo, gameboardObj));
  console.log(updateGameboard(1, 0, playerOne, gameboardObj));

  return { playerOne, playerTwo };
}

playGame();

// Testing
// console.log(gameboard);

// console.log(playerOne.isPlayersTurn());
// console.log(playerTwo.isPlayersTurn());

// console.log(playerOne.startPlayersTurn());
// console.log(playerTwo.startPlayersTurn());

// console.log(playerOne.endPlayersTurn());
