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
  constructor (){
    let places = [];
    let pieces = [];
  }

  addPiece(piece){
    this.pieces.push(piece);
  }
}


class Piece {
  constructor(name, color, row, column){
    this.name = name;
    this.color = color;
    this.row = row;
    this.column = column;
  }
}

let R1 = new Piece('R1', 'red', 1, 2);
console.log(R1);

class Place {
  constructor(row, column, color = undefined) {
    this.row = row;
    this.column = column;
    this.occupied = false;
    this.color = color;
  }
}
