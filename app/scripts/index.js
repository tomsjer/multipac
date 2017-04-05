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

const Game = function(players){
  
  var self = this;
  
  this.canvas = document.querySelector('canvas');
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.ctx = this.canvas.getContext('2d');
  this.players = {};

  this.setup = function(){
    this.ctx.background = 'black';

  }

  this.update = function(){
    for(var p in this.players){

    }
  }

  this.updateState = function(players){
    this.players = players;
  }

  this.render = function(){
    this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
    this.ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    for(var p in this.players){
      this.ctx.fillStyle = 'white';
      this.ctx.beginPath();
      this.ctx.arc(this.players[p].location.x,this.players[p].location.y,1,0,Math.PI*180,false);
      this.ctx.fill();
    }
  };

  this.run = function(){

    requestAnimationFrame(self.run);
    // self.update();
    self.render();
  }
  this.setup();
  this.run();
};

login()
.then(()=>{
  ws.init()
  .then((response)=>{
    // response.json().then((state)=>{
      const game = new Game();
      
      ws.on('ws:game:update',function(args){
        game.updateState(args);
      });

      var delta = 0;
      setInterval(function(){
        var x,y;
        x = Math.cos(delta) * 5;
        y = Math.sin(delta) * 5;
        ws.send('ws:connection:move',{
          x: x,
          y: y,
        });
        delta += 0.1;
      },50);
  });
});
