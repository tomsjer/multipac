// http://docs.lance.gg/develop/tutorial-overview_architecture.html
const Logger = require('../utils/logger.js');
const logger = new Logger({
  label: 'clientEngine',
});

/**
 * 
 * @class ClientEngine
 * @return {Object} ClientEngine instance.
 */
class ClientEngine {
  constructor(options) {

    /**
     *
     * Config
     *
     */
    this.updateFrequency = 60;

    /**
     *
     * Connections
     *
     */
    this.ws = options.ws;
    this.ws.on('ws:open', this.wsOnOpen.bind(this));
    this.ws.on('ws:close', this.wsOnClose.bind(this));
    this.ws.on('ws:error', this.wsOnError.bind(this));
    this.ws.on('engine:playerJoined', this.playerJoined.bind(this));
    this.ws.on('engine:gameupdate', this.gameUpdate.bind(this));
    

    /**
     *
     * Game Engine
     *
     */
    this.gameEngine = options.gameEngine;
    this.controls = options.controls;
    this.updateState = [];
    // this.controls.on('controls:input', this.sendInput.bind(this));

    this.playerId = null;

    /**
     * Game Renderer
     */
    this.gameRenderer = options.gameRenderer;

    /*
     * Setup packets
     *
     */
    this.clientInput = [];
    this.controls.on('controls:input', this.processInput.bind(this));
  }

  /*
   *
   * Connections
   *
   */
  wsOnOpen(response) {
    logger.log('wsOnOpen', response);
    this.gameEngine.start();
  }
  wsOnClose(message) {
    logger.warn('wsOnClose', message);
    this.gameEngine.stop();
  }
  wsOnError(error) {
    logger.error('wsOnError', error);
    this.gameEngine.stop();
  }
  playerJoined(response) {
    logger.log('playerJoined', response);
    this.playerId = response.id;
    this.stepCount = response.stepCount;
    this.start(response.game);
  }
  gameUpdate(update) {
    
    for(const i in update.game.players) {
      if (i !== this.playerId) {
        if(typeof this.gameEngine.players[i] === 'undefined') {
          update.game.players[i].wsId = i;
          this.gameEngine.addPlayer(update.game.players[i]);
        }
        else {
          this.gameEngine.players[i].x = update.game.players[i].x;
          this.gameEngine.players[i].y = update.game.players[i].y;
        }
      }
    }
  }
  /*
   *
   * Engine logic
   *
   */
  start(game) {
    this.gameEngine.start(game);
    this.gameRenderer.start();
    this.delta = 0;
    this.step();
  }
  step() {
    if(this.clientInput.length) {
      this.ws.emit('ws:send:input', this.clientInput);
      this.clientInput = [];
    }
    this.gameEngine.step();
    this.stepCount++;

    setTimeout(this.step.bind(this), 1000 / this.updateFrequency);
  }
  sendInput(input) {
    input.playerId = this.playerId;
    this.ws.emit('ws:send:input', input);
    this.gameEngine.processInput(input);
  }
  processInput(input) {
    input.id = this.playerId;
    input.stepCount = this.stepCount;

    this.clientInput.push(input);
    this.gameEngine.processInput(input);
  }
}

module.exports = ClientEngine;
