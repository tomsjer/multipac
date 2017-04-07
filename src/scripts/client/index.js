const config = require('../../../config.json');
const wsServer = `${(config.protocol === 'http') ? 'ws' : 'wss'}://${config.ip}:${config.port}`;
const WsConnection = require('./wsconnection');
const ws = new WsConnection({
  wsServer: wsServer,
});
const loginOpts = { method: 'POST', credentials: 'same-origin' };

function login() {
  const promise = new Promise((resolve, reject)=>{
    fetch('/login', loginOpts)
    .then((response)=>{
      return response.json().then(resolve);
    })
    .catch((err)=>{
      console.log(err);
      reject(err);
    });
  });

  return promise;
}
const GameEngine = require('../common/GameEngine.js');

login()
.then(()=>{
  ws.init()
  .then(()=>{
    const game = new GameEngine({ ws });
    console.log(game)
    game.options.ws.on('engine:newConnection',function(args){
      console.log(args);
    });
  });
});
