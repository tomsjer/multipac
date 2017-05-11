const GameEngine = require('./GameEngine.js');

class CirclesEngine extends GameEngine {
  constructor(options) {
    super(options);
  }
  processInput(input) {
    if(this.players[input.playerId]) {
      if(input.type === 'mousemove' || input.type === 'touchmove') {
        this.players[input.playerId].x = input.input[0];
        this.players[input.playerId].y = input.input[1];
      }
    }
  }
}

module.exports = CirclesEngine;
