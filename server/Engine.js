// http://docs.lance.gg/develop/tutorial-overview_architecture.html
class Engine {
  constructor(options) {

    /**
     *
     * Config
     *
     */
    this.config = {
      step: Date.now(),
      updateInterval: 16,
    };

    /**
     *
     * Connections
     *
     */
    this.wss = options.wss;
    this.wss.on('wss:connection:new', this.newConnection.bind(this));
    this.wss.on('wss:connection:close', this.CloseConnection.bind(this));
    this.wss.on('wss:connection:error', this.connectionError.bind(this));
    this.wss.on('wss:client:update', this.clientUpdate.bind(this));

    /**
     *
     * Game
     *
     */
    this.gameEngine = options.gameEngine;
    this.connectedPlayers = {};
    this.playerInputQues = {};

    const self = this;
    setInterval(function stepper() {
      self.step();
    }, this.config.updateInterval);

  }

  /*
   *
   * Connections
   *
   */
  newConnection(ws) {
    console.log(`[engine] newConnection: ${ws.id}`);
    this.connectedPlayers[ws.id] = ws.id;
    this.gameEngine.addPlayer({ wsId: ws.id });
    this.wss.emit('ws:send', null, 'engine:newConnection', this.gameEngine.players);
  }
  CloseConnection(ws, code, message) {
    console.log(`[engine] closeConnection: ${ws.id}\n code: ${code}\n message: ${message}`);
    delete this.connectedPlayers[ws.id];
    this.gameEngine.removePlayer(ws);
  }
  connectionError(ws, error) {
    console.log(`[engine] connectionError: ${ws.id}\n error: ${error}`);
    delete this.connectedPlayers[ws.id];
    this.gameEngine.removePlayer(ws);
  }
  broadcastUpdate() {
    this.wss.emit('ws:send', false, 'engine:gameupdate', this.gameEngine.status);
  }
  clientUpdate(ws, message) {
    console.log(ws, message);
  }

  /*
   *
   * Engine logic
   *
   */
  step() {
    this.gameEngine.update();
    this.broadcastUpdate();
  }
}

module.exports = Engine;
