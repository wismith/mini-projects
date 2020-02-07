let printBoard = require('./printBoard');
let classes = require('./classes');
let createNewBoard = require('./createNewBoard');
let process = require('process');
let readlineSync = require('readline-sync');

function startGame() {
  let turn = 1;
  let player1 = new classes.Player(readlineSync.question('Player 1 Name? '), readlineSync.question('Black or red? ').toLocaleLowerCase());
  let player2 = new classes.Player(readlineSync.question('Player 2 Name? '), readlineSync.question('Black or red? ').toLocaleLowerCase());
  let game = new classes.Game(createNewBoard(), player1, player2, turn);
  return game;
}

function playGame(game){

  let winner;

  let allSpaces = [];
  for(let place of game.board.places){
    allSpaces.push(place.name);
  }

  while (!game.isFinished) {


    if (game.turn % 2 !== 0) {
      printBoard(game.board);
      console.log(`${game.player1.name}, it's your turn!`);
      console.log('Usage: <move OR take> <yourPiece> <destination OR targetPiece>');
      readlineSync.promptCLLoop({
        move: function(piece, destination) {
          move(game.player1, piece, destination, game);
          return true;
        },
        take: function(piece, target) {
          take(game.player1, piece, target, game);
          return true;
        },
        cancel: function() {return true},
      });
    }
    if (game.turn % 2 === 0) {
      printBoard(game.board);
      console.log(`${game.player2.name}, it's your turn!`);
      console.log('Usage: <move OR take> <yourPiece> <destination OR targetPiece>');
      readlineSync.promptCLLoop({
        move: function(piece, destination) {
          move(game.player2, piece, destination, game);
          return true;
        },
        take: function(piece, target) {
          take(game.player2, piece, target, game);
          return true;
        },
        cancel: function() {return true},
      });
    }

    console.log('taken pieces red: ' + game.board.takenPiecesRed + ' and length is: ' + game.board.takenPiecesRed.length);
    console.log('taken pieces black: ' + game.board.takenPiecesBlack + ' and length is: ' + game.board.takenPiecesBlack.length);

    game.board.takenPiecesBlack.length = 12;
    if (game.board.takenPiecesBlack.length === 12 || game.board.takenPiecesRed.length === 12) {
      game.isFinished = true;
    }
  }

  if(game.board.takenPiecesBlack.length === 12) {
    if (game.player1.color === 'red') {
      let winner = game.player1;
    } else {
      let winner = game.player2;
    }
  }

  if(game.board.takenPiecesRed.length === 12) {
    if (game.player1.color === 'black') {
      winner = game.player1;
    } else {
      winner = game.player2;
    }
  }

  endGame(winner.name);

}


function move(player, pieceName, newSpot, game) {
  // let allSpaces = playGame.allSpaces;
  // if(!(allSpaces.includes(newSpot))){
  //   throw new Error('That is not a valid move!');
  // }

  let error = false;

  let newSpotValid = false;
  for (let place of game.board.places) {
    if (place.name === newSpot) {
      newSpotValid = true;
    }
  }
  if (!newSpotValid) {
    error = true;
  }

  let checker = game.board.pieces.filter(piece => piece.name === pieceName)[0];

  let oldPlace = game.board.places.filter(place => place.row === checker.row && place.column === checker.column)[0];

  let destination = game.board.places.filter(place => place.name === newSpot)[0];


  //checks for valid move

  if(checker.color !== player.color) {
    error = true;
  }

  if(!(destination.row !== oldPlace.row && destination.column !== oldPlace.column)){
    error = true;
  }

  if(checker.color === 'black' && checker.isKing === false){
    if(!(destination.row > oldPlace.row)){
      error = true;
    }

    if(Math.abs(destination.row - oldPlace.row) > 1 || Math.abs(destination.column - oldPlace.column) > 1){
      error = true;
    }
  }

  if(checker.color === 'red' && checker.isKing === false){
    if(!(destination.row < oldPlace.row)){
      error = true;
    }

    if(Math.abs(oldPlace.row - destination.row) > 1 || Math.abs(oldPlace.column - destination.column)> 1){
      error = true;
    }
  }

  if(destination.occupied){
    error = true;
  }

  if (!error) {
    oldPlace.piece = undefined;
    oldPlace.occupied = false;

    checker.row = destination.row;
    checker.column = destination.column;

    if (checker.color === 'red' && destination.row === 0) {
      checker.kingMe();
    }
    if (checker.color === 'black' && destination.row === 7) {
      checker.kingMe();
    }
    destination.occupied = true;
    destination.piece = checker;
    game.turn++;

  } else {
    console.log('That is an invalid move!');
  }


}

function take(player, pieceName, target, game) {
  let myPiece = game.board.pieces.filter(piece => piece.name === pieceName)[0];
  let victimPiece = game.board.pieces.filter(piece => piece.name === target)[0];
  let oldPlace = game.board.places.filter(place => place.row === myPiece.row && place.column === myPiece.column)[0];
  let victimPlace = game.board.places.filter(place => place.row === victimPiece.row && place.column === victimPiece.column)[0];
  let landingPlace = game.board.places.filter(place => (place.row === (victimPlace.row + (victimPlace.row - oldPlace.row)) && place.column === (victimPlace.column + (victimPlace.column - oldPlace.column))))[0];


  if (victimPiece.color === myPiece.color) {
    throw new Error('You can\'t take your own piece!');
  }

  if(myPiece.color !== player.color) {
    throw new Error('You can\'t move that piece!');
  }
  console.log(victimPlace);
  console.log(oldPlace);
  console.log(victimPlace.row + (victimPlace.row - oldPlace.row), victimPlace.column + (victimPlace.column - oldPlace.column));
  if (!landingPlace.occupied) {
    if (myPiece.color === 'red' && landingPlace.row === 0) {
      myPiece.kingMe();
    }
    if (myPiece.color === 'black' && landingPlace.row === 7) {
      myPiece.kingMe();
    }

    landingPlace.piece = myPiece;
    landingPlace.occupied = true;

    myPiece.row = landingPlace.row;
    myPiece.column = landingPlace.column;

    oldPlace.occupied = false;
    oldPlace.piece = undefined;
    victimPlace.occupied = false;
    victimPlace.piece = undefined;

    if (victimPiece.color === 'red') {
      game.board.takenPiecesRed.push(victimPiece);
    }
    if (victimPiece.color === 'black') {
      game.board.takenPiecesBlack.push(victimPiece);
    }
    game.turn++;
  } else {
    throw new Error('That action won\'t work!');
  }
}

function endGame(winner) {
  console.log("Good job, " + winner + ", you won!");
}

//test
// printBoard(board);
// move('player', 'R3', 'D4', board);
// printBoard(board);
// move('player', 'B10', 'C3', board);
// printBoard(board);
// take('player', 'B10', 'R3', board);
// printBoard(board);

let game = startGame();
playGame(game);
