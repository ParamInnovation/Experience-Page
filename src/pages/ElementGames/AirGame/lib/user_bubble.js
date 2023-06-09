import MovingObject from './moving_object';
import Pellet from './pellet';
import Physics from './physics';
import Color from './color';
import Glitter from './glitter';

 
class UserBubble extends MovingObject {
  constructor (game) {
    let opts = {};
    opts.radius = 10;
    opts.vel = [0, 0];
    opts.pos = [window.innerWidth/2, window.innerHeight/2];
    opts.color = "Color.randomColor()";
    super(opts);
    this.game = game;
    this.firstAbsorb = false;
    this.colorCount = 0;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.user = true;
    this.velCounter = 0;
    this.propel = this.propel.bind(this); 

  }

  propel(e) { 
    if (e.type === "keydown") {
      if (e.key === "ArrowUp" || e.key === "w") {
        this.up = true;
      }
      if (e.key === "ArrowDown" || e.key === "s") {
        this.down = true;
      }
      if (e.key === "ArrowLeft" || e.key === "a") {
        this.left = true;
      }
      if (e.key === "ArrowRight" || e.key === "d") {
        this.right = true;
      } 
     

      if (e.key === "p"){
        this.game.gameView.run = !this.game.gameView.run;
        this.game.gameView.paused = true;
        if (this.game.gameView.run) {
          this.game.gameView.start();
        }
      }
      if (e.key === "m"){
        this.game.gameView.mute = !this.game.gameView.mute;
      }
    }
    else if (e.type === "keyup") {
      if (e.key === "ArrowUp" || e.key === "w") {
        this.up = false;
      }
      if (e.key === "ArrowDown" || e.key === "s") {
        this.down = false;
      }
      if (e.key === "ArrowLeft" || e.key === "a") {
        this.left = false;
      }
      if (e.key === "ArrowRight" || e.key === "d") {
        this.right = false;
      }
    }
  }

  moveUserBubble() {
    if (this.up) {
      this.vel[1] -= .2;
      this.velCounter += 1;
    }
    if (this.down) {
      this.vel[1] += .2;
      this.velCounter += 1;
    }
    if (this.left) {
      this.vel[0] -= .2;
      this.velCounter += 1;
    }
    if (this.right) {
      this.vel[0] += .2;
      this.velCounter += 1;
    }
    if ((this.vel[0] > 0 || this.vel[1] > 0) && this.alive && this.velCounter >= 10) {
      this.velCounter = 0;
      this.radius = this.radius * .999;
      this.game.pellets.push(new Pellet(this.color, this.pos, this.radius, this.vel));
    }
  }

  absorbBubble(bubble) {
    // if(this.alive && !this.game.gameView.mute){explode.play();}
    this.targetRadius = Physics.addMassMath(this, bubble);
    this.color = Color.colorDifference(this, bubble);
    this.firstAbsorb = true;
    bubble.alive = false;
    for (var i = 0; i < bubble.radius/2; i++) {
      bubble.createGlitter(this);
    }
  }

  createGlitter(otherBubble) {
    let poc = Physics.pointOfContact(this, otherBubble);
    for (var i = 0; i < this.radius*(Physics.mag(this.vel)+Physics.mag(otherBubble.vel)); i++) {
      this.game.glitter.push(new Glitter(this.color, poc, this.radius, this.vel));
      this.radius = this.radius - .01;
    }
    // if(this.alive && !this.game.gameView.mute){explode.play();}
  }

  setRandomColor() {
    if (this.firstAbsorb === false) {
      this.colorCount += 1;
      if (this.colorCount === 15) {
        this.color = Color.randomColor();
        this.colorCount = 0;
      }
    }
  }
}

export default UserBubble;
