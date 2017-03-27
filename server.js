/*
  Server logic.

  IMPORTANT:
    When using SSL make sure that you generate the certificate.

    openssl genrsa -out key.pem 2048
    openssl req -new -key key.pem -out client.csr
    openssl x509 -req -in client.csr -signkey key.pem -out cert.pem
    rm client.csr

  const url = require('url');
  const location = url.parse(ws.upgradeReq.url, true);
  You might use location.query.access_token to authenticate or share sessions
  or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

 */

const config = require('./config.json');
const httpMod = (config.protocol === 'http') ? require('http') : require('https');
const fs = require('fs');
const options = (config.protocol === 'https') ?
{
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
} : null;

const session = require('express-session');
const uuid = require('uuid');
const express = require('express');
const app = express();
//
// We need the same instance of the session parser in express and
// WebSocket server.
//
const sessionParser = session({
  saveUninitialized: false,
  secret: '$eCuRiTy',
  resave: false,
});

app.use(express.static(`${__dirname}/public/`));
app.use(sessionParser);

app.post('/login', (req, res) => {
  //
  // "Log in" user and set userId to session.
  //
  const id = uuid.v4();

  console.log(`Updating session for user ${id}`);
  req.session.userId = id;
  res.send({ result: 'OK', message: 'Session updated' });
});

app.delete('/logout', (request, response) => {
  console.log(`Destroying session... ${request.session.userId}`);
  request.session.destroy();
  response.send({ result: 'OK', message: 'Session destroyed' });
});

const server = (config.protocol === 'http') ? httpMod.createServer(app) : httpMod.createServer(options, app);
/**
 *
 * Manage connections
 *
 */
const WebSocket = require('ws');
const wss = new WebSocket.Server({
  server: server,
  clientTracking: true,
  verifyClient: (info, done) => {
    console.log('Parsing session from request...');
    sessionParser(info.req, {}, () => {
      console.log('Session is parsed!');

      //
      // We can reject the connection by returning false to done(). For example,
      // reject here if user is unknown.
      //
      done(info.req.session.userId);
    });
  },
});

wss.on('connection', (ws)=>{
  ws.on('message', (message)=>{
    const userSession = ws.upgradeReq.session;
    //
    // Here we can now use session parameters.
    //
    console.log(`WS message ${message} from user ${userSession.userId}`);
  });
  ws.send(JSON.stringify({
    event: 'ws.message',
    args: ['arg1', 'arg2']
  }));
  console.log(`[server] New ws added to connections: ${ws.upgradeReq.session.userId}`);
});

/**
 *
 * Messages arriving from gulp tasks
 *
 */

process.on('message', (msg)=>{
  console.log('[server]', msg);
  if(msg.reload) {
    if(wss.clients.size) {
      wss.clients.forEach((connection)=>{
        connection.send(JSON.stringify({
          event: 'client.reload',
          args: {
            reload: true,
          },
        }));
      });
    }
    else{
      console.log('[server] no connections');
    }
  }
  else{
    console.log('[server] Unhandled msg:', msg);
  }
});

server.listen(config.port, config.ip, function listening() {
  console.log('______________________________________________________\n');
  console.log(`[server] ${config.protocol}://${server.address().address}:${server.address().port}...`);
  console.log('______________________________________________________\n');
  if(typeof process.send !== 'undefined') {
    process.send({ ready: true });
  }
});
