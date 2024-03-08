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

  const startPlayersTurn = function() {
    if(playerTurn == false) 
    return playerTurn = true;
  }

  const endPlayersTurn = function() {
    if(playerTurn == true) 
    return playerTurn == false;
  }

  return { name, marker, isPlayersTurn, endPlayersTurn, startPlayersTurn };
}

function playGame() {
  const playerOne = createPlayer("Player-1", "X");
  const playerTwo = createPlayer("Player-2", "O");

  console.log(gameboard);

  console.log(playerOne.isPlayersTurn());
  console.log(playerTwo.isPlayersTurn());

  console.log(playerOne.startPlayersTurn());
  console.log(playerTwo.startPlayersTurn());

  console.log(playerOne.endPlayersTurn());

  return { playerOne, playerTwo }
}


playGame()

// Testing