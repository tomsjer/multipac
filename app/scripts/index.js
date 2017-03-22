const ws = new WebSocket('wss://10.226.108.71:8080');

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
