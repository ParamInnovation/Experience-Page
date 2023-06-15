import MovingObject from './moving_object';
import Physics from './physics.js';

export default class Glitter extends MovingObject {
  constructor(color, pos, radius, vel) {
    let opts = {};
    let speed = 3;
    opts.radius = 1;
    opts.vel = Physics.glitterVel(vel);
    opts.pos = pos;
    opts.color = color;
    super(opts);
    this.glitter = true;
  }
}

// export default Glitter;
