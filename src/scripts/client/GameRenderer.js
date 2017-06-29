const Logger = require('../utils/logger.js');
const logger = new Logger({
  label: 'gameRenderer',
});

class GameRenderer {
  constructor(options) {
    logger.log('initializing...', options);
    this.gameEngine = options.gameEngine;
    this.canvas = document.getElementById('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
  }
  start() {
    const self = this;
    let loop = (function loop() {
      self.render();
      requestAnimationFrame(loop);
    })();
  }
  render() {
    this.ctx.fillStyle = 'rgba(0,0,0,.2)';
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    for(const i in this.gameEngine.players) {
      this.ctx.strokeStyle = this.gameEngine.players[i].color;
      this.ctx.beginPath();
      this.ctx.strokeRect(this.gameEngine.players[i].x-10, this.gameEngine.players[i].y-10, 20, 20);
      this.ctx.stroke();
    }
  }
}

module.exports = GameRenderer;
