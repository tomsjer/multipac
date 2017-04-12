const Logger = require('../utils/logger.js');
const logger = new Logger({
  label: 'gameRenderer',
});

class GameRenderer {
  constructor(options) {
    console.log(logger.format('initializing...', options));
  }
  start() {
    const self = this;
    let loop = (function loop() {
      self.render();
      requestAnimationFrame(loop);
    })();
  }
  render() {

  }
}

module.exports = GameRenderer;
