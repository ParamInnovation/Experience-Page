const Game = require('./game.js');

const MOVES = {
  "w": [ 0, -1],
  "a": [-1,  0],
  "s": [ 0,  1],
  "d": [ 1,  0],
  "up": [ 0, -1],
  "left": [-1,  0],
  "down": [ 0,  1],
  "right": [ 1,  0] , 
  "upButton": [ 0, -1],
  "leftButton": [-1,  0],
  "downButton": [ 0,  1],
  "rightButton": [ 1,  0] , 
};

export default class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.game.gameView = this;
    this.ctx = ctx;
    this.start = this.start.bind(this);
    this.userBubble = this.game.userBubbles[0];
    this.lastTime = 0;
    this.run = false;
    this.paused = false;
    this.firstGame = true;
    this.mute = false;
  }

  animate(curTime) {
    let delta = curTime - this.lastTime;

    if (delta > 35) {
      delta = 16.66;
    }

    this.game.draw(this.ctx);
    this.game.step(delta);
    this.lastTime = curTime;

    if(this.run === true) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  bindKeyHandlers() {
    const ship = this.userBubble;
    document.onkeydown = this.userBubble.propel;
    document.onkeyup = this.userBubble.propel;
    if (this.firstGame) {
      this.firstGame = false;
      document.addEventListener("keydown", (e) => {
        if (e.key === " ") {
          let win = document.getElementById('win-display');
          let end = document.getElementById('end-display');
          let difficulty = document.getElementById('difficulty');
          this.game.resetGame();
          win.className = 'win-display gone';
          end.className = 'end-display gone';
          difficulty.className = "difficulty gone";
          this.userBubble = this.game.userBubbles[0];
          this.bindKeyHandlers();
        }
      });
    }   
 

   
  }

  start() {
    if (!this.paused) {
      this.game.addBubbles();
    }
    this.bindKeyHandlers();
    requestAnimationFrame(this.animate.bind(this));
  }

}


