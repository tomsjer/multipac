/*
  Server logic.

  IMPORTANT:
    When using SSL make sure that you generate the certificate.

    openssl genrsa -out key.pem 2048
    openssl req -new -key key.pem -out client.csr
    openssl x509 -req -in client.csr -signkey key.pem -out cert.pem
    rm client.csr

 */

const config = require('./config.json');
const httpMod = (config.protocol === 'http') ? require('http') : require('https');
const fs = require('fs');
const options = (config.protocol === 'https') ?
{
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
} : null;

const express = require('express');
const app = express();
const server = (config.protocol === 'http') ? httpMod.createServer(app) : httpMod.createServer(options, app);
// const url = require('url');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server: server });

app.use(express.static(`${__dirname}/public/`));

wss.on('connection', function connection(ws) {
  // const location = url.parse(ws.upgradeReq.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send(JSON.stringify({
    ip: '10.226.110.127',
  }));

});

server.listen(config.port, config.ip, function listening() {
  console.log('______________________________________________________\n');
  console.log(`[server] ${config.protocol}://${server.address().address}:${server.address().port}...`);
  console.log('______________________________________________________\n');
  process.send({ ready: true });
});

process.on('message', (msg)=>{

  if(msg.reload) {
    if(wss.clients.lenth) {
      wss.clients.forEach((ws)=>{
        ws.send(JSON.stringify({ reload: true }));
      });
    }
  }
  else{
    console.log('[server] Unhandled msg:', msg);
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
