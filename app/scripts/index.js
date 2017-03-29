
const config = require('../../config.json');
const wsServer = `${(config.protocol === 'http') ? 'ws' : 'wss'}://${config.ip}:${config.port}`;
const WsConnection = require('./wsconnection');
const Emitter = new WsConnection({
  wsServer: wsServer,
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
    this.to('/play');
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
    self.to('/play');
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
.on('/play', function onPlay() {

  const self = this;
  const gamesList = document.querySelector('#games-list');

  startWsConnection()
  .then(listGames)
  .then((response)=>{
    if(response.games.length) {
      response.games.forEach((gameUid)=>{
        const li = document.createElement('li');
        li.innerHTML = gameUid;
        li.onclick = ()=>{
          self.to(`/game/${gameUid}/`);
        };
        gamesList.appendChild(li);
      });
    }
    else{
      self.to('/create');
    }
  })
  .catch((err)=>{
    console.log(err);
  });
})

.on('/play/<game>', function playGame(game){
  console.log(game);
})

/**
 *
 * Game (create)
 *
 */
.on('/create', function onCreate() {

  if(!isAuthenticated()) {
    login();
  }

  startWsConnection()
  .then(()=>{

    const self = this;
    const input = document.querySelector('#gameUid');
    const button = document.querySelector('#submit');

    button.onclick = function() {
      Emitter.send('new.game', {
        uid: input.value,
      })
      .then((response)=>{
        if(response.result === 'OK'){
          self.to(`/play/${response.game.uid}`);
        }
      });
    };
  });

});

router.start();
