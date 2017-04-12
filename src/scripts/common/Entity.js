const Logger = require('../utils/logger.js');
const logger = new Logger({
  label: 'entity'
});
class Entity {
  constructor(options) {
    logger.log(` New entity...`);
  }
}

module.exports = Entity;
