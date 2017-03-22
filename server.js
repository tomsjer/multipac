// const http = require('http');
const https = require('https'); // https://docs.nodejitsu.com/articles/HTTP/servers/how-to-create-a-HTTPS-server/
const fs = require('fs');
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};
const express = require('express');
const app = express();
const server = https.createServer(options, app);
// const server = http.createServer(app);
// const url = require('url');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server: server });
const PORT = process.argv[2];
let _ws;

app.use(express.static(`${__dirname}/public/`));

wss.on('connection', function connection(ws) {
  // const location = url.parse(ws.upgradeReq.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
  _ws = ws;

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send(JSON.stringify({
    ip: '10.226.110.127',
  }));

});

server.listen(PORT, function listening() {
  console.log('Listening on %d', server.address().port);
  process.send({ ready: true });
});

process.on('message', (msg)=>{
  console.log(typeof msg, msg);
  
  if(msg.reload){
    _ws.send(JSON.stringify({ reload: true }));
  }
  else{
    console.log('[server] Unhandled msg:',msg);
  }
});

// app.get('/juego', function(req, res){
//   res.sendfile('html/juego.html');
// });

// app.get('/jugador', function(req, res){
//   res.sendfile('html/jugador.html');
// });

// io.on('connection', function(socket){

//   socket.on('nuevo jugador cliente', function(jugador){
//     console.log('Nuevo '+jugador.id);
//     io.emit('nuevo jugador tablero',jugador);
//   });

//   socket.on('touchstart', function(toque){
//     console.log(toque.id + ' ' + toque.dir);
//     io.emit('comando jugador',toque);
//   });

//   socket.on('comio jugador',function(jugador){
//     io.emit('actualizar puntaje',jugador);
//   });

// });
