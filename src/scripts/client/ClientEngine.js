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

    this.ws.on('engine:newConnection', function(args) {
      console.log(args);
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
    console.log(`[engine] ${response}`);
    this.gameEngine.start();
  }
  wsOnClose(message) {
    console.log(`[engine] ${message}`);
    this.gameEngine.stop();
  }
  wsOnError(error) {
    console.log(`[engine] ${error}`);
    this.gameEngine.stop();
  }
  playerJoined(player) {
    console.log(player);
    this.playerId = player.id;
    this.start();
  }

  /*
   *
   * Engine logic
   *
   */
  start() {
    this.gameEngine.start();
    this.gameRenderer.start();
    this.step();
  }
  step() {
    this.gameEngine.update();
    setTimeout(this.step.bind(this), 1000 / this.updateFrequency);
  }
  sendInput(message) {
    this.ws.emit('ws:send:input', message);
  }
}

module.exports = Engine;
