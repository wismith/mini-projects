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
          move(game.player1, piece, destination, game.board);
          return true;
        },
        take: function(piece, target) {
          take(game.player1, piece, target, game.board);
          return true;
        }
      });
    }
    if (game.turn % 2 === 0) {
      printBoard(game.board);
      console.log(`${game.player2.name}, it's your turn!`);
      console.log('Usage: <move OR take> <yourPiece> <destination OR targetPiece>');
      readlineSync.promptCLLoop({
        move: function(piece, destination) {
          move(game.player2, piece, destination, game.board);
          return true;
        },
        take: function(piece, target) {
          take(game.player2, piece, target, game.board);
          return true;
        }
      });
    }

    game.turn++;

    if (game.board.takenPiecesBlack.length === 12 || game.board.takenPiecesRed.length === 12) {
      game.isFinished = true;
    }
  }

  endGame();

}


function move(player, pieceName, newSpot, board) {
  // let allSpaces = playGame.allSpaces;
  // if(!(allSpaces.includes(newSpot))){
  //   throw new Error('That is not a valid move!');
  // }

  let newSpotValid = false;
  for (let place of board.places) {
    if (place.name === newSpot) {
      newSpotValid = true;
    }
  }
  if (!newSpotValid) {
    throw new Error('That is not a valid move!');
  }

  let checker = board.pieces.filter(piece => piece.name === pieceName)[0];

  let oldPlace = board.places.filter(place => place.row === checker.row && place.column === checker.column)[0];

  let destination = board.places.filter(place => place.name === newSpot)[0];


  //checks for valid move

  if(checker.color !== player.color) {
    throw new Error('You can\'t move that piece!');
  }

  if(!(destination.row !== oldPlace.row && destination.column !== oldPlace.column)){
    throw new Error('That is not a valid move!');
  }

  if(checker.color === 'black' && checker.isKing === false){
    if(!(destination.row > oldPlace.row)){
      throw new Error('That is not a valid move!');
    }

    if(Math.abs(destination.row - oldPlace.row) > 1 || Math.abs(destination.column - oldPlace.column) > 1){
      throw new Error('That is not a valid move!');
    }
  }

  if(checker.color === 'red' && checker.isKing === false){
    if(!(destination.row < oldPlace.row)){
      throw new Error('That is not a valid move!');
    }

    if(Math.abs(oldPlace.row - destination.row) > 1 || Math.abs(oldPlace.column - destination.column)> 1){
      throw new Error('That is not a valid move!');
    }
  }

  if(destination.occupied){
    throw new Error('That is not a valid move!');


  }

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


}

function take(player, pieceName, target, board) {
  let myPiece = board.pieces.filter(piece => piece.name === pieceName)[0];
  let victimPiece = board.pieces.filter(piece => piece.name === target)[0];
  let oldPlace = board.places.filter(place => place.row === myPiece.row && place.column === myPiece.column)[0];
  let victimPlace = board.places.filter(place => place.row === victimPiece.row && place.column === victimPiece.column)[0];
  let landingPlace = board.places.filter(place => (place.row === victimPiece.row + (victimPiece.row - myPiece.row) && place.column === victimPiece.column + (victimPiece.column - myPiece.column)))[0];


  if (victimPiece.color === myPiece.color) {
    throw new Error('You can\'t take your own piece!');
  }

  if(myPiece.color !== player.color) {
    throw new Error('You can\'t move that piece!');
  }

  console.log(landingPlace);
  if (!landingPlace.occupied) {
    if (myPiece.color === 'red' && landingPlace.row === 0) {
      myPiece.kingMe();
    }
    if (myPiece.color === 'black' && landingPlace.row === 7) {
      myPiece.kingMe();
    }

    landingPlace.piece = myPiece;
    landingPlace.occupied = true;

    oldPlace.occupied = false;
    console.log(oldPlace.occupied);
    oldPlace.piece = undefined;
    victimPlace.occupied = false;
    console.log(victimPlace.occupied);
    victimPlace.piece = undefined;
    console.log(victimPlace);

    if (victimPiece.color === 'red') {
      board.takenPiecesRed.push(victimPiece);
    }
    if (victimPiece.color === 'black') {
      board.takenPiecesBlack.push(victimPiece);
    }
  } else {
    throw new Error('That action won\'t work!');
  }
}

function endGame() {

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
