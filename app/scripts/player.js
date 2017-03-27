class Player {
  constructor(emitter) {
    this.name = `Jugador ${Date.now()}`;
    this.emitter = emitter;
    this.setListeners();
    return this;
  }
  setListeners() {
    this.emitter.on('ws.open', this.wsOnOpen.bind(this));
    this.emitter.on('ws.message', this.wsOnMessage.bind(this));
  }
  wsOnOpen() {
    console.log(`Player#wsOnOpen: ${this.name}`);
    console.log(this);
    console.log(arguments);
    
    this.emitter.emit('ws.send', this.name);
  }
  wsOnMessage() {
    console.log(`Player#wsOnMessage: ${this.name}`);
    console.log(this);
    console.log(arguments);
  }
}

module.exports = Player;
