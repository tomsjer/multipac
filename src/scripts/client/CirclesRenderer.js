const GameRenderer = require('./GameRenderer.js');
let width = window.innerWidth;
let height = window.innerHeight;
window.addEventListener('resize', ()=>{
  width = window.innerWidth;
  height = window.innerHeight;
});

class CirclesRenderer extends GameRenderer {
  constructor(options) {
    super(options);

    this.gameEngine = options.gameEngine;

    /**
     *
     * Canvas
     *
     */
    this.canvas = document.querySelector('#canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    /**
     *
     * Offcanvas
     *
     */
    this.offCanvas = document.createElement('canvas');
    this.offCanvas.width = 20;
    this.offCanvas.height = 20;
    this.offCtx = this.offCanvas.getContext('2d');
    

  }
  render() {
    this.ctx.clearRect(0, 0, width, height);
    this.ctx.fillStyle = 'rgba(0,0,255,0.5)';

    for(const player in this.gameEngine.players) {
      this.ctx.beginPath();
      this.ctx.arc(this.gameEngine.players[player].x, this.gameEngine.players[player].y, 40, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }
}

module.exports = CirclesRenderer;
