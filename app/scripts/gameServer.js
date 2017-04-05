const Player = require('./player.js');
const Game = require('./game.js');

class GameServer extends Game {
  constructor(wss) {
    super(null);
    this.wss = wss;
    this.setListeners();
  }
  setListeners() {
    this.wss.on('wss:connection:new', this.addPlayer.bind(this));
    this.wss.on('wss:connection:close', this.removePlayer.bind(this));
    this.wss.on('ws:connection:move', this.movePlayer.bind(this));
    this.wss.on('ws:connection:move', this.broadCastState.bind(this));
  }
  addPlayer(ws) {
    this.players[ws.id] = new Player({ id: ws.id });
    console.log(`[game] addPlayer ${ws.id}`);
  }
  removePlayer(ws) {
    delete this.players[ws.id];
    console.log(`[game] removePlayer ${ws.id}`);
  }
  movePlayer(ws, args) {
    this.players[ws.id].move(args);
    // console.log(`[game] movePlayer ${this.players[ws.id]}`);
  }
  broadCastState(ws, args) {
    this.wss.emit('ws:send', false, 'ws:game:update' ,this.players);
  }
}

module.exports = GameServer;
