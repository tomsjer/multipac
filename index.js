var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/scripts',express.static(__dirname + '/scripts'));
app.use('/styles',express.static(__dirname + '/styles'));
app.use('/img',express.static(__dirname + '/img'));

app.get('/tablero', function(req, res){
  res.sendfile('tablero.html');
});

app.get('/jugador', function(req, res){
  res.sendfile('jugador.html');
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('nuevo jugador', function(jugador){
    io.emit('nuevo jugador',jugador);
  });
  socket.on('mover', function(dir){
    io.emit('moverPac',dir);
  });
  socket.on('quitar', function(dir){
    io.emit('quitarTecla',dir);
  });
  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});