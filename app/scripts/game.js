const Player = require('./player.js');

class Game {
  constructor(config) {
    
    this.config = config;
    this.players = {};
  }
  addPlayer(id) {
    this.players[id] = new Player({ id: id });
    console.log(`[game] addPlayer ${id}`);
  }
  removePlayer(id) {
    delete this.players[id];
    console.log(`[game] removePlayer ${id}`);
  }
  movePlayer(id, args) {
    this.players[id].move(args);
  }
}

module.exports = Game;
