class Player {
  constructor(opts) {
    this.location = { x: Math.random()*100, y: Math.random()*100 };
    this.velocity = { x: 1, y: 1 };
    return this;
  }
  move(args) {
    this.location.x += args.x | 0;
    this.location.y += args.y | 0;

    console.log(this.location);
  }

}

module.exports = Player;
