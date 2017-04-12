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

const ClientEngine = require('./ClientEngine.js');
const GameEngine = require('../common/GameEngine.js');
const GameRenderer = require('./GameRenderer.js');
const Controls = require('./KeyboardControls.js');
const gameEngine = new GameEngine({});
login()
.then((response)=>{
  ws.init()
  .then((r)=>{
    const game = new ClientEngine({
      ws: ws,
      gameEngine: gameEngine,
      gameRenderer: new GameRenderer({
        gameEngine: gameEngine,
      }),
      controls: new Controls(),
    });
  });
});
