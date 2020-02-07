let printBoard = require('./printBoard');
let classes = require('./classes');
let createNewBoard = require('./createNewBoard');

let board = createNewBoard();

let allSpaces = [];
for(let place of board.places){
  allSpaces.push(place.name);
}

function startGame() {

}

function move(player, pieceName, newSpot, board) {
  if(!(allSpaces.includes(newSpot))){
    throw new Error('That is not a valid move!');
  }

  let checker = board.pieces.filter(function(piece){
    return piece.name===pieceName}
  )[0];

  let oldPlace = board.places.filter(function(place){
    return place.row===checker.row && place.column === checker.column;
  })[0];

  let destination = board.places.filter(function(place){
    return place.name===newSpot}
  )[0];

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

  destination.occupied = true;
  destination.piece = checker;
}

function take(player, piece, victim, board) {

}

function endGame() {

}

//test
printBoard(board);
move('player', 'B10', 'C3', board);
printBoard(board);
