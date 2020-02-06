// let newBoard = [
//     [' ', 'B1', ' ', 'B2', ' ', 'B3',' ','B4'],
//     ['B5', ' ', 'B6', ' ', 'B7',' ','B8', ' '],
//     [' ', 'B9', ' ', 'B10', ' ', 'B11',' ','B12'],
//     ['_', ' ', '_', ' ', '_', ' ', '_', ' '],
//     [' ', '_', ' ', '_', ' ', '_', ' ', '_'],
//     ['R1', ' ', 'R2', ' ', 'R3', ' ','R4', ' '],
//     [' ', 'R5', ' ', 'R6', ' ', 'R7',' ','R8'],
//     ['R9', ' ', 'R10', ' ', 'R11',' ','R12', ' ']
// ];

let newBoard = [
    [' ', '_', ' ', '_', ' ', '_',' ', '_'],
    ['_', ' ', '_', ' ', '_',' ','_', ' '],
    [' ', '_', ' ', '_', ' ', '_',' ','_'],
    ['_', ' ', '_', ' ', '_', ' ', '_', ' '],
    [' ', '_', ' ', '_', ' ', '_', ' ', '_'],
    ['_', ' ', '_', ' ', '_', ' ','_', ' '],
    [' ', '_', ' ', '_', ' ', '_',' ','_'],
    ['_', ' ', '_', ' ', '_',' ','_', ' ']
];

class Board {
  constructor () {
    this.places = [];
    this.pieces = [];
  }

  addPiece(piece) {
    this.pieces.push(piece);
  }

  addPlace(place) {
    this.places.push(place);
  }
}

class Checker {
  constructor(name, color, row = undefined, column = undefined){
    this.name = name;
    this.color = color;
    this.row = row;
    this.column = column;
    this.isKing = false;
  }

  kingMe() {
    this.isKing = true;
  }
}

class Place {
  constructor(row, column, piece = undefined) {
    this.name = `${row},${column}`;
    this.row = row;
    this.column = column;
    this.occupied = false;
    this.piece = piece;

  }
}

module.exports = {
  Place: Place,
  Checker: Checker,
  Board: Board,
};
