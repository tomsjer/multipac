const Logger = require('../utils/logger.js');
const logger = new Logger({
  label: 'gameEngine',
});
const EventEmitter = require('events');
const Player = require('./Player.js');

class GameEngine extends EventEmitter {
  constructor(options) {
    super(null);
    this.options = options || {};
    this.players = options.players || {};
    this.state = { players: this.players };
    return this;
  }
  start(game) {
    for(const i in game.players) {
      this.players[i] = new Player(game.players[i]);
    }
  }
  step() {
    // for(const i in this.players) {
      
    // }
  }
  stop() {

  }
  addPlayer(opts) {
    this.players[opts.wsId] = new Player(opts);
    logger.log(`addPlayer ${opts.wsId}`);
  }
  removePlayer(ws) {
    delete this.players[ws.id];
    logger.log(`deletePlayer ${ws.id}`);
  }
  getStatus() {
    return this.status;
  }
  getPlayers() {
    return this.players;
  }
  processInput(input) {
    this.players[input.id].emit(input.type, input.input);
  }
}

module.exports = GameEngine;
