const EventEmitter = require('events');

class Controls extends EventEmitter {
  constructor(options) {
    super(null);
    console.log(`[Controls] ${options}`);
  }
}

module.exports = Controls;
