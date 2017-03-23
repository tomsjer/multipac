const config = require('../../config.json');
const ws = new WebSocket(`${(config.protocol === 'http') ? 'ws' : 'wss'}://${config.ip}:${config.port}`);

ws.onopen = ()=>{
  ws.send('something');

};

ws.onmessage = (message)=>{

  const msg = JSON.parse(message.data);

  if(msg.reload) {
    window.location.reload(true);
  }
  else {
    console.log(`Unhandled message: ${message.data.toString()}`);
  }
};
