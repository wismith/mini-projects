let printBoard = require('./printBoard');
let classes = require('./classes');
let createNewBoard = require('./createNewBoard');
let process = require('process');
let readlineSync = require('readline-sync');

function startGame() {
  let player1 = new classes.Player(readlineSync.question('Player 1 Name? '), readlineSync.question('Black or red? '));
  let player2 = new classes.Player(readlineSync.question('Player 2 Name? '), readlineSync.question('Black or red? '));
  let game = new classes.Game(createNewBoard(), player1, player2, 1);


}

let allSpaces = [];
for(let place of board.places){
  allSpaces.push(place.name);
}

let takenPiecesRed = [];
let takenPiecesBlack = [];

function results(){
  if(takenPiecesRed.length === 12){
    let winner = black
  }

  if(takenPiecesBlack.length === 12) {
    endGame();
  }
}


function move(player, pieceName, newSpot, board) {
  if(!(allSpaces.includes(newSpot))){
    throw new Error('That is not a valid move!');
  }

  let checker = board.pieces.filter(piece => piece.name === pieceName)[0];

  let oldPlace = board.places.filter(place => place.row === checker.row && place.column === checker.column)[0];

  let destination = board.places.filter(place => place.name === newSpot)[0];


  //checks for valid move
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
  let landingPlace = board.places.filter(place => place.row === victimPiece.row + (victimPiece.row - myPiece.row) && place.column === victimPiece.column + (victimPiece.column - myPiece.column))[0];


  if (victimPiece.color === myPiece.color) {
    throw new Error('You can\'t take your own piece!');
  }


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
    oldPlace.piece = undefined;
    victimPlace.occupied = false;
    victimPlace.piece = undefined;

    if (victimPiece.color === 'red') {
      takenPiecesRed.push(victimPiece);
    }
    if (victimPiece.color === 'black') {
      takenPiecesBlack.push(victimPiece);
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

startGame();
