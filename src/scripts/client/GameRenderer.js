const Logger = require('../utils/logger.js');
const logger = new Logger({
  label: 'gameRenderer',
});

class GameRenderer {
  constructor(options) {
    logger.log('initializing...', options);
    this.gameEngine = options.gameEngine;
  }
  start() {
    const self = this;
    let loop = (function loop() {
      self.render();
      requestAnimationFrame(loop);
    })();
  }
  render() {
    for(const i in this.gameEngine.players) {
      // Draw
    }
  }
}

module.exports = GameRenderer;
