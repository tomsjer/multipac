// http://docs.lance.gg/develop/tutorial-overview_architecture.html
const Logger = require('../utils/logger.js');
const logger = new Logger({
  label: 'clientEngine',
});
class Engine {
  constructor(options) {

    /**
     *
     * Config
     *
     */
    this.config = {
      step: Date.now(),
      updateFrequency: 60,
    };

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
    this.ws.on('engine:newConnection', function(args) {
      logger.log('new connection', args);
    });

    /**
     *
     * Game Engine
     *
     */
    this.gameEngine = options.gameEngine;
    this.controls = options.controls;
    this.controls.on('controls:input', this.sendInput.bind(this));

    this.playerId = null;

    /**
     * Game Renderer
     */
    this.gameRenderer = options.gameRenderer;
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
  playerJoined(player) {
    logger.log('playerJoined', player);
    this.playerId = player.id;
    this.start();
  }
  gameUpdate(message) {
    this.gameEngine.players = message.players;
  }
  /*
   *
   * Engine logic
   *
   */
  start() {
    this.gameEngine.start();
    this.gameRenderer.start();
    this.delta = 0;
    this.step();
  }
  step() {
    this.gameEngine.update();
    // this.sendInput({
    //   playerId: this.playerId,
    //   type: 'mousemove',
    //   input:[
    //     300 + Math.cos(this.delta * Math.PI/180) * 100,
    //     300 + Math.sin(this.delta * Math.PI/180) * 100
    //   ]
    // });
    // this.delta++;
    setTimeout(this.step.bind(this), 1000 / this.updateFrequency);
  }
  sendInput(input) {
    input.playerId = this.playerId;
    this.ws.emit('ws:send:input', input);
    this.gameEngine.processInput(input);
  }
}

module.exports = Engine;
