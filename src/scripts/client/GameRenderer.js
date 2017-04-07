class GameRenderer {
  constructor(options) {
    console.log(`[gamerendered] ${options}`);
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
