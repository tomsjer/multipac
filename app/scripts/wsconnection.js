const EventEmitter = require('events');

class WsConnection extends EventEmitter {
  constructor(opts) {
    super();
    this.opts = opts;
    this.setListeners();
    return this;
  }
  setListeners() {
    this.on('client.reload', (args)=>{
      if(args.reload) {
        window.location.reload(true);
      }
    });

    window.addEventListener('beforeunload', ()=>{
      this.ws.close(1000, 'client closed window');
    });
  }
  init() {

    this.ws = new WebSocket(this.opts.wsServer);
    const promise = new Promise((resolve, reject)=>{

      this.ws.onopen = (response)=>{
        this.emit('ws.open');
        resolve(response);
      };

      this.ws.onerror = (err)=>{
        this.emit('ws.error');
        reject(err);
      };

      this.ws.onclose = ()=>{
        this.emit('ws.close');
      };

      // If wanted to support Binary?
      this.ws.onmessage = (message)=>{
        const msg = (message.data.indexOf('{') !== -1) ? JSON.parse(message.data) : {};
        this.emit(msg.event, msg.args);
      };
    });

    return promise;
  }
  send(event, args) {
    this.ws.send(JSON.stringify({
      event: event,
      args: args,
    }));
  }
  sendPromise(event, args) {
    const self = this;
    const promise = new Promise((resolve, reject)=>{
      self.ws.send(JSON.stringify({
        event: event,
        args: args,
      }));

      self.on(event, (data)=>{
        resolve(data);
      });
    });

    return promise;
  }
}

module.exports = WsConnection;
