const EventEmitter = require('events');
const Player = require('./Player.js');

class GameEngine extends EventEmitter {
  constructor(options) {
    super(null);
    this.options = options;
    this.players = {};
    this.status = { players: this.players };
    return this;
  }
  start() {

  }
  update() {

  }
  addPlayer(opts) {
    this.players[opts.wsId] = new Player(opts);
    console.log(`[gameEngine] addPlayer ${opts.wsId}`);
  }
  removePlayer(ws) {
    delete this.players[ws.id];
    console.log(`[gameEngine] deletePlayer ${ws.id}`);
  }
  getStatus() {
    return this.status;
  }
}

module.exports = GameEngine;
