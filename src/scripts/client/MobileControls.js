const Controls = require('./Controls');

class MobileControls extends Controls {
  constructor() {
    super(null);
    window.addEventListener('touchmove', this.onTouchMove.bind(this));
  }
  onTouchMove(e) {
    this.emit('controls:input', { type: 'touchmove', input: [e.touches[0].clientX, e.touches[0].clientY] });
  }
}

module.exports = MobileControls;
