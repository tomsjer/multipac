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

    const p = document.createElement('p');
    p.innerHTML = `Soy: ${Math.random()}`;
    document.body.appendChild(p);

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

function logout() {
  fetch('/logout', { method: 'DELETE', credentials: 'same-origin' })
  .then((response)=> {
    console.log('Logout...');
    console.log(response);
  })
  .catch((err) => {
    console.log(err.message);
  });
}

setTimeout(logout, 5000);
