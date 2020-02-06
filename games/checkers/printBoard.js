let createNewBoard = require('./createNewBoard');
let board = createNewBoard();
function printBoard(board) {
  console.log('    A     B     C     D     E     F     G     H')
  console.log('  ------------------------------------------------');
  for (let i = 0; i < 8; i++) {
    let row = [];
    for (let place of board.places) {
      if (place.row === i) {
        if (place.occupied) {
          row.push(place.piece.name.padEnd(3));
        } else {
          row.push(' _ ');
        }
      }
    }
    console.log(i + ' | ' + row.join(' | ') + ' |');
    console.log('  ------------------------------------------------');
  }
}
<<<<<<< HEAD
=======

module.exports = printBoard
>>>>>>> 79dfacb2c457ea388580201d033e689571c3987f
