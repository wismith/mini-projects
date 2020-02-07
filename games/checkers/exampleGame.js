let gameLayer = require('./gameLayer');

let game = gameLayer.startGame();
let winner = gameLayer.playGame(game);
gameLayer.endGame(winner);
