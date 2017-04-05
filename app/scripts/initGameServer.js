const GameServer = require('./gameServer.js');
function init(opts){
  const game = new GameServer(opts.wss);
}

module.exports = init;
