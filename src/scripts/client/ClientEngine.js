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
    this.ws.on('engine:gameupdate', this.gameUpdate.bind(this));
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
  gameUpdate(message){
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
