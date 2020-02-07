let createNewBoard = require('./createNewBoard');
let board = createNewBoard();
function printBoard(board) {
  console.log('     A      B       C      D      E      F       G      H')
  console.log('  ----------------------------------------------------------');
  for (let i = 0; i < 8; i++) {
    let row = [];
    for (let place of board.places) {
      if (place.row === i) {
        if (place.occupied) {
          row.push(place.piece.name.padEnd(4));
        } else {
          row.push(' __ ');
        }
      }
    }
    console.log(i + ' |  ' + row.join(' | ') + '  |');
    console.log('  ----------------------------------------------------------');
  }
}

printBoard(board);

module.exports = printBoard
