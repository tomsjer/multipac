const EventEmitter = require('events');
const Player = require('./player.js');

class Game extends EventEmitter {
  constructor(options) {
    super();
    this.uid = options.uid;
    this.options = options;
    this.players = [];
    this.setListeners();
  }
  setListeners() {
    this.on('player.add', (args) =>{
      this.players.push(new Player(args));
    });
  }
  vacancy(){
    return (this.players.length < this.options.maxPlayers);
  }
}

module.exports = Game;
