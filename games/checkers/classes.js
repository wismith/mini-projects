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

let letterDict = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
  7: 'H',
}

class Board {
  constructor () {
    this.places = [];
    this.pieces = [];
    this.takenPiecesRed = [];
    this.takenPiecesBlack = [];
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
    this.name  = `*${this.name}*`;
  }
}

class Place {
  constructor(row, column, piece = undefined) {
    this.name = `${letterDict[column]}${row}`;
    this.row = row;
    this.column = column;
    this.occupied = false;
    this.piece = piece;

  }
}

class Game {
  constructor(board, player1, player2, turn) {
    this.board = board;
    this.player1 = player1;
    this.player2 = player2;
    this.turn = turn;
    this.isFinished = false;
  }
}

class Player {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}

module.exports = {
  Place: Place,
  Checker: Checker,
  Board: Board,
  Game: Game,
  Player: Player,
};
