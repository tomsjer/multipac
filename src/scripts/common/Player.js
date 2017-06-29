const Logger = require('../utils/logger.js');
const logger = new Logger({
  label: 'player',
});
const EventEmitter = require('events');

class Player extends EventEmitter {
  constructor(options) {
    super(options);
    
    this.ws = options.ws;
    this.name = `Player${ Math.random() } `;

    this.color = options.color || 'red';
    this.x = 0;
    this.y = 0;

    logger.log(this);

    this.on('mousemove', this.onMouseMove.bind(this));
  }
  onMouseMove(input) {
    this.x = input[0];
    this.y = input[1];
  }
}

module.exports = Player;
