class GameRenderer {
  constructor(options) {
    console.log(`[gamerendered] ${options}`);
  }
  start() {
    let loop = function loop() {
      this.render();
      requestAnimationFrame(loop);
    };
  }
  render(){

  }
}

module.exports = GameRenderer;
