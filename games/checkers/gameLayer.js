let printBoard = require('./printBoard');
let classes = require('./classes');
let createNewBoard = require('./createNewBoard');

function startGame() {

}

function move(player, pieceName, newSpot, board) {
  let checker = board.pieces.filter(function(piece){
    return piece.name===pieceName}
  )[0];

  let oldPlace = board.places.filter(function(place){
    return place.row===checker.row && place.column === checker.column;
  })[0];

  oldPlace.piece = undefined;
  console.log(oldPlace);
  oldPlace.occupied = false;



  let destination = board.places.filter(function(place){
    return place.name===newSpot}
  )[0];

  checker.row = destination.row;
  checker.column = destination.column;
  destination.occupied = true;
  destination.piece = checker;

}

function take(player, piece, victim, board) {

}

function endGame() {

}

function isValidMove() {
  if(){

  }
}

//test
let board = createNewBoard();
printBoard(board);
move('player', 'B10', 'C3', board);
printBoard(board);
