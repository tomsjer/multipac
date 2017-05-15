const Controls = require('./Controls');

/**
 * 
 */
class KeyboardControls extends Controls {
  constructor() {
    super(null);

    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
  }
  onKeyDown(e) {
    this.emit('controls:input', { type: 'keydown', input: e.keyCode });
  }
  onMouseMove(e) {
    this.emit('controls:input', { type: 'mousemove', input: [e.clientX, e.clientY] });
  }
}

module.exports = KeyboardControls;
