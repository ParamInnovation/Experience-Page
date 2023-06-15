import MovingObject from './moving_object';
import Physics from './physics.js';
import Glitter from './glitter';
import Color from './color';
const RADIUS = 2;
const SPEED = Math.min(Math.ceil(Math.ceil((Math.random()*1 +1)*window.innerHeight/100+2*window.innerWidth/100)*Math.random()-20 ), 8); 
 

export default class Bubble extends MovingObject {
  constructor(game, idx, color) {
    let opts = {};
    
    let speed = Math.floor(Math.random() * SPEED) + 1;
    opts.radius = Math.floor((Math.random()*.5+.5) * idx * game.difficulty) + 1;
    opts.vel = Physics.randomVec(speed);
    opts.pos = Physics.randomPos(opts.radius);
    opts.color = color;
    super(opts);
    this.game = game;
    this.bubble = true;
    this.createGlitter = this.createGlitter.bind(this);
  }

  bounce (x, y, otherBubble) {
    this.vel = [x, y];
    this.createGlitter(otherBubble);
    this.pos = [this.pos[0] + x, this.pos[1] + y];
 
  }

  createGlitter(otherBubble) {
    let poc = Physics.pointOfContact(this, otherBubble);
    for (var i = 0; i < this.radius*(Physics.mag(this.vel)+Physics.mag(otherBubble.vel))/20; i++) {
      this.game.glitter.push(new Glitter(this.color, poc, this.radius, this.vel));
      this.radius = this.radius - .01;
    }
  }
}

// module.exports = Bubble;
