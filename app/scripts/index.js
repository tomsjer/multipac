const config = require('../../config.json');
const wsServer = `${(config.protocol === 'http') ? 'ws' : 'wss'}://${config.ip}:${config.port}`;
const EventEmitter = require('events');
const Emitter = new EventEmitter();
const Player = require('./player.js');
let player;

function startWsConnection() {

  const ws = new WebSocket(wsServer);

  ws.onopen = ()=>{
    Emitter.emit('ws.open');
  };

  ws.onerror = ()=>{
    Emitter.emit('ws.error');
  };

  ws.onclose = ()=>{
    Emitter.emit('ws.close');
  };

  ws.onmessage = (message)=>{
    const msg = (message.data.indexOf('{') !== -1) ? JSON.parse(message.data) : {};
    Emitter.emit(msg.event, msg.args);
  };

  Emitter.on('ws.send', (event, args)=>{
    ws.send(JSON.stringify({
      event: event,
      args: args,
    }));
  });

  Emitter.on('client.reload', (args)=>{
    if(args.reload) {
      window.location.reload(true);
    }
  });
}

fetch('/login', { method: 'POST', credentials: 'same-origin' })
.then(()=>{
  startWsConnection();
  player = new Player(Emitter);
})
.catch((err)=>{
  console.log(err);
});

