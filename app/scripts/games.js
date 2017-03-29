const EventEmitter = require('events');
const Game = require('./game.js');

class Games extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
    this.games = {};
    this.setListeners();
  }
  setListeners() {

    this.on('list.games',this.listGames);
    this.on('new.game', this.newGame);

  }
  listGames(obj) {
    obj.ws.send(JSON.stringify({
      event: 'list.games',
      args: {
        games: Object.keys(this.games),
      },
    }));
  }
  newGame(obj) {

    this.games[obj.args.uid] = new Game({
      uid: obj.args.uid,
    });

    obj.ws.send(JSON.stringify({
      event: 'new.game',
      args: {
        result: 'OK',
        game: this.games[obj.args.uid],
      },
    }));
  }
  length() {
    let c = 0;
    for(const i in this.games) {
      c++;
    }
    return c;
  }
}

module.exports = Games;
