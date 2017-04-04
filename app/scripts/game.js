const Player = require('./player.js');
class Game {
  constructor(wss) {
    this.wss = wss;
    this.players = {};

    this.setListeners();
    console.log('[game] init');
  }
  setListeners() {
    this.wss.on('wss:connection:new', this.addPlayer.bind(this));
    this.wss.on('ws:connection:move', this.movePlayer.bind(this));
    this.wss.on('ws:connection:move', this.broadCastState.bind(this));
  }
  addPlayer(ws) {
    this.players[ws.id] = new Player({ ws });
    console.log(`[game] addPlayer ${this.players[ws.id]}`);
  }
  movePlayer(ws, args) {
    this.players[ws.id].move(args);
    console.log(`[game] movePlayer ${this.players[ws.id]}`);
  }
  broadCastState(ws, args) {
    this.wss.emit('ws:send', false, 'ws:game:update' ,this.players);
  }
}

module.exports = Game;
