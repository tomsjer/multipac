const isMobile = require('../utils/utils.js');
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
const CanvasRenderer = require('./CirclesRenderer.js');
const KeyboardControls = require('./KeyboardControls.js');
const MobileControls = require('./MobileControls.js');
const CirclesEngine = require('../common/CirclesEngine.js');
const engine = new CirclesEngine({});
const mobile = isMobile();
if(mobile) {
  const flag = false;
  document.body.addEventListener('touchstart', function(){
    if(!flag){
      document.body.webkitRequestFullscreen();
      flag = true;
    }
  });
}

login()
.then((response)=>{
  ws.init()
  .then((r)=>{
    // Para pacman, PacmanEngine extends Engine?
    const game = new Engine({
      ws: ws,
      gameEngine: engine,
      gameRenderer: new CanvasRenderer({
        gameEngine: engine,
      }),
      controls: (mobile) ? new MobileControls() : new KeyboardControls(),
    });
  });
});
