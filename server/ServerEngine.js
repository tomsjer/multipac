// http://docs.lance.gg/develop/tutorial-overview_architecture.html
const Logger = require('../src/scripts/utils/logger.js');
const logger = new Logger({
  label: 'engine',
});

/**
 * @class ServerEngine
 * @param {Object} options Configuration options object
 */
class ServerEngine {
  constructor(options) {

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
    this.wss.on('wss:client:input', this.appendClientInput.bind(this));

    /**
     *
     * Game
     *
     */
    this.updateFrequency = 60;
    this.broadcastFrequency = 20;
    this.gameEngine = options.gameEngine;
    this.connectedPlayers = {};
    this.playerInputQues = {};
    this.clientInput = [];
    this.stepCount = 0;
    this.start();
  }

  /*
   *
   * Connections
   *
   */
  newConnection(ws) {
    logger.log(`[engine] newConnection: ${ws.id}`);
    this.connectedPlayers[ws.id] = ws.id;
    this.gameEngine.addPlayer({ wsId: ws.id });
    this.wss.emit('ws:send', ws.id, 'engine:playerJoined', {
      id: ws.id,
      stepCount: this.stepCount,
      game: this.gameEngine.state,
    });
    this.wss.emit('ws:send', null, 'engine:newConnection', this.gameEngine.state);
  }
  CloseConnection(ws, code, message) {
    logger.log(`[engine] closeConnection: ${ws.id}\n code: ${code}\n message: ${message}`);
    delete this.connectedPlayers[ws.id];
    this.gameEngine.removePlayer(ws);
  }
  connectionError(ws, error) {
    logger.log(`[engine] connectionError: ${ws.id}\n error: ${error}`);
    delete this.connectedPlayers[ws.id];
    this.gameEngine.removePlayer(ws);
  }
  broadcastUpdate() {
    this.wss.emit('ws:send', false, 'engine:gameupdate', {
      stepCount: this.stepCount,
      game: this.gameEngine.state,
    });
  }
  clientUpdate(ws, message) {
    logger.log(ws, message);
  }
  appendClientInput(ws, input) {
    this.clientInput.push(input);
  }
  processClientInput() {
    if(this.clientInput.length) {
      this.clientInput.forEach((input)=> {
        this.gameEngine.processInput(input[0]);
      });
      this.clientInput = [];
    }
  }

  /*
   *
   * Engine logic
   *
   */
  start() {
    this.stepCount = Date.now() / 1000 | 0;
    this.gameEngine.start({ players: { } });
    this.step();
  }
  step() {
    this.processClientInput();
    this.gameEngine.step();
    this.stepCount++;

    if(this.stepCount % this.broadcastFrequency === 0) {
      this.broadcastUpdate();
    }

    setTimeout(this.step.bind(this), 1000 / this.updateFrequency);
  }
  stop() {

  }
}

module.exports = ServerEngine;
