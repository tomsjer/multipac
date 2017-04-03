const config = require('../../config.json');
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

login()
.then(()=>{
  ws.init()
  .then(()=>{
    ws.sendPromise('new:client',{
      uid: Date.now()
    }).then((response)=>{
      console.log(response);
    })
  });
})
