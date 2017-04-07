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
    // this.offCtx.strokeStyle = 'cyan';
    // this.offCtx.beginPath();
    // this.offCtx.arc(10, 10, 20, 0, 2 * Math.PI);
    // this.offCtx.stroke();
    this.offCtx.fillStyle = 'red';
    this.offCtx.fillRect(0, 0, 20, 20);

  }
  render() {
    this.ctx.clearRect(0, 0, width, height);
    for(const player in this.gameEngine.players) {
      this.ctx.drawImage(this.offCanvas, this.gameEngine.players[player].x, this.gameEngine.players[player].y);
    }
  }
}

module.exports = CirclesRenderer;
