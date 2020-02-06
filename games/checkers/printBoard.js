let createNewBoard = require('./createNewBoard')
let board = createNewBoard()
function printBoard(board) {
  for (let i = 0; i < 8; i++) {
    let row = [];
    for (let place of board.places) {
      if (place.row === i) {
        if (place.occupied) {
          row.push(place.piece.name.padEnd(3));
        } else {
          row.push(' _ ')
        }
      }
    }
    console.log('| ' + row.join(' | ') + ' |')
    console.log('-------------------------------------------------')
  }





}
printBoard(board)
