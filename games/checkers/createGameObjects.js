let classes = require('./classes');

let initialPositions = {
  'B1': [0,1],
  'B2': [0,3],
  'B3': [0,5],
  'B4': [0,7],
  'B5': [1,0],
  'B6': [1,2],
  'B7': [1,4],
  'B8': [1,6],
  'B9': [2,1],
  'B10': [2,3],
  'B11': [2,5],
  'B12': [2,7],
  'R1': [5,0],
  'R2': [5,2],
  'R3': [5,4],
  'R4': [5,6],
  'R5': [6,1],
  'R6': [6,3],
  'R7': [6,5],
  'R8': [6,7],
  'R9': [7,0],
  'R10': [7,2],
  'R11': [7,4],
  'R12': [7,6],
}

function createNewBoard() {
  let board = new classes.Board();
  // Add places to board
  for(let i = 0; i<8; i++){
    for(let j = 0; j<8; j++){
      board.addPlace(new classes.Place(i,j));
    }
  }
  // Add Pieces to board
  for (let i = 1; i <= 12; i++) {
    board.addPiece(new classes.Checker(`R${i}`, 'red'));
    board.addPiece(new classes.Checker(`B${i}`, 'black'));
  }

  // Assign locations
  for (let checker of board.pieces) {
    checker.row = initialPositions[checker.name][0];
    checker.column = initialPositions[checker.name][1];
  }

  for (let place of board.places) {
    for (let checker of board.pieces) {
      if (place.row === checker.row && place.column === checker.column) {
        place.occupied = true;
        place.piece = checker;
      }
    }
  }


  return board;
}

let board = createNewBoard();

console.log(board);
