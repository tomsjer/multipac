const EventEmitter = require('events');
class Player extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
    this.name = `Jugador ${Date.now()}`;
    this.setListeners();
    return this;
  }
  setListeners() {

  }
}

module.exports = Player;
