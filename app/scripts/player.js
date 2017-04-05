class Player {
  constructor(opts) {
    this.id = opts.id;
    this.location = { x: Math.random()*500, y: Math.random()*500 };
    this.velocity = { x: 1, y: 1 };
    return this;
  }
  move(args) {
    this.location.x += args.x | 0;
    this.location.y += args.y | 0;
  }

}

module.exports = Player;
