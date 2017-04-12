const Logger = require('../utils/logger.js');
const logger = new Logger({
  label: 'player',
});
const Entity = require('./Entity.js');
class Player extends Entity {
  constructor(options) {
    super(options);
    this.ws = options.ws;
    this.name = 'Player '+ Math.random();
    logger.log(this);
    this.x = 0;
    this.y = 0;
  }
}

module.exports = Player;
