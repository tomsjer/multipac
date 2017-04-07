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

const Engine = require('./ClientEngine.js');
const GameRenderer = require('./GameRenderer.js');
const Controls = require('./KeyboardControls.js');
const GameEngine = require('../common/GameEngine.js');

login()
.then((response)=>{
  ws.init()
  .then((r)=>{
    // Para pacman, PacmanEngine extends Engine?
    const game = new Engine({
      ws: ws,
      gameEngine: new GameEngine({}),
      gameRenderer: new GameRenderer(),
      controls: new Controls(),
    });
  });
});
