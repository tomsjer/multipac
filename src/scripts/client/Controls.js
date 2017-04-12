const EventEmitter = require('events');
const Logger = require('../utils/logger.js');
const logger = new Logger({
  label: 'controls',
});

class Controls extends EventEmitter {
  constructor(options) {
    super(null);
    console.log(logger.format('initializing...', options));
  }
}

module.exports = Controls;
