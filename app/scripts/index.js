
const config = require('../../config.json');
const wsServer = `${(config.protocol === 'http') ? 'ws' : 'wss'}://${config.ip}:${config.port}`;
const WsConnection = require('./wsconnection');
const Emitter = new WsConnection({
  wsServer: wsServer
});
const loginOpts = { method: 'POST', credentials: 'same-origin' };
// const Player = require('./player.js');
// let player;

const wrapper = document.getElementById('wrapper');
const Router = require('./router.js');
const router = new Router(wrapper);

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

function checkCookie(cookie) {
  console.log(cookie);
  return true;
}

function isAuthenticated() {
  console.log('');
  return (document.cookie !== '' && checkCookie(document.cookie));
}

function startWsConnection() {
  return Emitter.init();
}
function listGames() {
  return Emitter.send('list.games');
}

/**
 *
 * /index
 * |
 * --> localStorage/cookie
 *                       |__ authenticated --> /play
 *                       |__ unauthenticated --> /login
 *
 * /login
 *  |__ anonymous --|___ session.isValid()
 *  |__ Facebook  --|    | session.inGame()
 *                       |__ true: ---> /play/<gameId>/
 *                       |__ false: --> /play
 *
 * /play
 *  |__ join --> games.filter( players.length < maxPlayers).
 *  |            |_ list: select game --> /play/<gameId>/
 *  |
 *  |__ create -->  games.push(uuid)
 *                    |
 *                    --> /create/<gameId>/
 */


/**
 *
 * Root
 *
 */
router.on('/', function onStart() {
  if(!isAuthenticated()) {
    this.to('/login');
  }
  else{
    this.to('/game');
  }
})

/**
 *
 * Login
 *
 */
.on('/login', function onLogin() {
  const self = this;

  login()
  .then((response) => {
    console.log(response);
    self.to('/game');
  })
  .catch((err)=>{
    console.log(err);
  });
})

/**
 *
 * Game
 *
 */
.on('/game', ()=> {

  startWsConnection()
  .then(listGames)
  .then((games)=>{
    console.log(games);
    //
  })
  .catch((err)=>{
    console.log(err);
  });
});

router.start();
