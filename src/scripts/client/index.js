const config = require('../../../config.json');
const wsServer = `${(config.protocol === 'http') ? 'ws' : 'wss'}://${config.ip}:${config.port}`;
const WsConnection = require('./wsconnection');
const ws = new WsConnection({
  wsServer: wsServer,
});
const loginOpts = { method: 'POST', credentials: 'same-origin' };

/**
 * Fetches a login resource and return a promise.
 *
 * @param {Object} opts Login options such as HTTP methos, credenctials, etc.
 * @return { Promise }
 */
function login(opts) {
  const promise = new Promise((resolve, reject)=>{
    fetch('/login', opts)
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

/*
 * Main classes
 * 
 */
const ClientEngine = require('./ClientEngine.js');
const GameEngine = require('../common/GameEngine.js');
const GameRenderer = require('./GameRenderer.js');
const Controls = require('./KeyboardControls.js');

/*
 * Instantiate
 * 
 */
const gameEngine = new GameEngine({});

/*
 * Initialize app
 * 
 */
login(loginOpts)
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
