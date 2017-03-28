const EventEmitter = require('events');
class Game extends EventEmitter {
  constructor() {
    super();
    this.players = [];
    this.setListeners();
  }
  setListeners() {
    this.on('player.add', (args) =>{
      // console.log(args);
    });
  }
}

module.exports = Game;
