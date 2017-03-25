const config = require('../../config.json');
const wsServer = `${(config.protocol === 'http') ? 'ws' : 'wss'}://${config.ip}:${config.port}`;

function startWsConnection() {

  const ws = new WebSocket(wsServer);

  ws.onopen = ()=>{
    ws.send('somethingasds');
  };

  ws.onmessage = (message)=>{

    const msg = (message.data.indexOf('{') !== -1) ? JSON.parse(message.data) : message.data;
    console.log(msg);

    if(msg.reload) {
      window.location.reload(true);
    }
    else {
      console.log(`Unhandled message: ${message.data.toString()}`);
    }
  };
}

fetch('/login', { method: 'POST', credentials: 'same-origin' })
.then(()=>{
  startWsConnection();
})
.catch((err)=>{
  console.log(err);
});
