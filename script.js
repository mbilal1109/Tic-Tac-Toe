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
    if (playerTurn == true) return (playerTurn = false);
  };

  return { marker, isPlayersTurn, endPlayersTurn, startPlayersTurn };
}

function playGame() {
  const playerOne = createPlayer("Player-1", "X");
  const playerTwo = createPlayer("Player-2", "O");
  const gameboardObj = gameboard;

  function updateGameboard(row, col, player, gameboard) {
    gameboard[row][col] = player.marker;
    return gameboard;
  }

  function start() {

    // randomize this later to randomly select who goes first.
    playerOne.startPlayersTurn();
    
    if(playerOne.isPlayersTurn()) {
      console.log("Player 1 Turn");
    } else if(playerTwo.isPlayersTurn()) {
      console.log("Player 2 Turn");
    }
  }

  return { start };
}

const game = playGame();
game.start();
