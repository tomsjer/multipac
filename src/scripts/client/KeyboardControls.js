const Controls = require('./Controls');

class KeyboardControls extends Controls {
  constructor() {
    super(null);

    window.addEventListener('keydown', this.onKeyDown.bind(this));
  }
  onKeyDown(e) {
    this.emit('controls:input', { input: e.keyCode });
  }
}

module.exports = KeyboardControls;
