var express   = require('express');
var app       = express();
var http      = require('http').Server(app);
var io        = require('socket.io')(http);

app.use('/scripts',express.static(__dirname + '/scripts'));
app.use('/css',express.static(__dirname + '/css'));
app.use('/img',express.static(__dirname + '/img'));
app.use('/html',express.static(__dirname + '/html'));
app.use('/sounds',express.static(__dirname + '/sounds'));

app.get('/juego', function(req, res){
  res.sendfile('html/juego.html');
});

app.get('/jugador', function(req, res){
  res.sendfile('html/jugador.html');
});


io.on('connection', function(socket){
  
  socket.on('nuevo jugador cliente', function(jugador){
    console.log('Nuevo '+jugador.id);
    io.emit('nuevo jugador tablero',jugador);
  });

  socket.on('touchstart', function(toque){
    console.log(toque.id + ' ' + toque.dir);
    io.emit('comando jugador',toque);
  });

  socket.on('comio jugador',function(jugador){
    io.emit('actualizar puntaje',jugador);
  });
  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});