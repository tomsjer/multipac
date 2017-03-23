const config = require('../../config.json');
const ws = new WebSocket(`${(config.protocol === 'http') ? 'ws' : 'wss'}://${config.ip}:${config.port}`);

ws.onopen = ()=>{
  ws.send('somethingasds');

};

ws.onmessage = (message)=>{

  const msg = JSON.parse(message.data);
  console.log(msg);

  if(msg.reload) {
    window.location.reload(true);
  }
  else {
    console.log(`Unhandled message: ${message.data.toString()}`);
  }
};
