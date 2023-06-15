import UserBubble from './user_bubble.js';
import Bubble from './bubble.js';
import Physics from './physics.js';
import Color from './color.js';
const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');

class Game {
  constructor() {
    this.bubbles = [];
    this.userBubbles = [];
    this.glitter = [];
    this.pellets = [];
    this.difficulty = 2;
    this.gameOver = false;
    this.addUserBubble();
    this.draw = this.draw.bind(this);
    this.moveObjects = this.moveObjects.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.step = this.step.bind(this);
    this.allBubbles = this.allBubbles.bind(this);
    this.checkRadius = this.checkRadius.bind(this);
    this.applyGravity = this.applyGravity.bind(this);
    this.checkEnd = this.checkEnd.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.checkBox = this.checkBox.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.NUM_BUBBLES = Math.ceil( window.innerHeight/100+ window.innerWidth/100); 
  }

  allBubbles() {
    let newArray = this.userBubbles.concat(this.bubbles).concat(this.glitter).concat(this.pellets);
    return newArray;
  }

  addBubbles() {
    this.bubbles = [] ; 
    let colors = ["#4C00FF", "#0042FF", "#0088FF", "#0400FF", "#01CEFF",
      "#00FFF8", "#00FF62", "#00FF17", "#00FFAD", "#40FF01", "#9DFF00", "#FFE600",
      "#FFCB00", "#F9FF00", "#FFB101", "#FF9900", "#FF4E00", "#FF2700", "#FF7400",
      "#FF0101", "#FF0060", "#C500FF", "#7D00FF", "#FF00E4", "#FF00BB"];
    colors = this.shuffle(colors);
    for (var i = 0; i < Math.min( this.NUM_BUBBLES , colors.length); i++) {
      let bubble = new Bubble(this, i, colors[i]);
      while (this.checkCollision(bubble) || this.checkBox(bubble)) {
        bubble = new Bubble(this, i, colors[i]);
      }
      this.bubbles.push(bubble);
    }
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  checkBox(bubble) {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let x = bubble.pos[0];
    let y = bubble.pos[1];
    return (
      (x > width / 2 - 300 && x < width / 2 + 300) &&
      (y > height / 2 - 300 && y < height / 2 + 300)
    );
  }

  addUserBubble() {
    this.userBubbles.push(new UserBubble(this));
  }

  // Function to ensure bubbles are initialized separated from one another
  checkCollision(bubble) {
    let collided = false;
    for (var i = 0; i < this.allBubbles().length; i++) {
      if (this.allBubbles()[i].isCollidedWith(bubble)) {
        collided = true;
      }
    }
    return collided;
  }

  checkCollisions() {

    this.checkUserCollision();

    for (var i = 0; i < this.bubbles.length; i++) {
      for (var j = i + 1; j < this.bubbles.length; j++) {
        if (this.bubbles[i].isCollidedWith(this.bubbles[j])) {
          Physics.collide(this.bubbles[i], this.bubbles[j]);
        }
      }
    }
  }

  checkUserCollision() {
    let user = this.userBubbles[0];
    // console.log(user)

    for (var i = 0; i < this.bubbles.length; i++) {
      let bubble = this.bubbles[i];
      if (user.isCollidedWith(bubble)) {
        if (user.radius >= bubble.radius) {
          if (bubble.alive === true) {
            user.absorbBubble(bubble);
          }
        }
        else {
          user.createGlitter(bubble);
          user.alive = false;
        }
      }
    }
  }

  checkRadius() {
    this.bubbles = this.bubbles.filter(obj => {
      return obj.radius > 1;
    });

    this.glitter = this.glitter.filter(obj => {
      return obj.radius > 0.005;
    });

    this.pellets = this.pellets.filter(obj => {
      return obj.radius > 0.005;
    });
  }

  applyGravity() {
    this.bubbles.forEach(bubble => {
      this.allBubbles().forEach(obj => {
        if (bubble.pos[0] !== obj.pos[0] && bubble.pos[1] !== obj.pos[1]) {
          obj.vel = Physics.calculateGravity(obj, bubble);
        }
      });
    });
    this.userBubbles.forEach(bubble => {
      this.allBubbles().forEach(obj => {
        if (bubble.pos[0] !== obj.pos[0] && bubble.pos[1] !== obj.pos[1]) {
          obj.vel = Physics.calculateGravity(obj, bubble);
        }
      });
    });
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
    this.checkRadius();
    this.applyGravity();
    this.userBubbles[0].setRandomColor();
    this.userBubbles[0].moveUserBubble();
    this.checkEnd();
    this.checkWin();
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.X_COORD, Game.Y_COORD);
    this.allBubbles().forEach(bubble => { bubble.draw(ctx); });
  }

  moveObjects(delta) {
    this.allBubbles().forEach(bubble => { bubble.move(delta); });
  }

  resetGame() {
    this.bubbles = [];
    this.userBubbles = [];
    this.glitter = [];
    this.pellets = [];
    this.addUserBubble();
    this.addBubbles();
    this.gameOver = false;
  }

  checkEnd() {
    if (!this.userBubbles[0].alive && !this.gameOver) {
      this.gameOver = true;
      let end = document.getElementById('end-display');
       if(end) end.className = 'end-display';
      let start = document.getElementById('press-space-1') ; 
      if (start){
        start.className = 'press-space-1' ; 
      }
      let difficulty = document.getElementById('difficulty');
      if (difficulty){
        difficulty.className = 'difficulty-end';
      }
    }
  }

  checkWin() {
    if (this.userBubbles[0].alive && this.bubbles.length === 0 && !this.gameOver) {
      this.gameOver = true;
      this.userBubbles[0].won = true;
      let win = document.getElementById('win-display');
      win.className = 'win-display';
      let difficulty = document.getElementById('difficulty');
      difficulty.className = 'difficulty-end';
      let start =  document.getElementById('press-space-1'); 
      start.className = "press-space-1" ;
    }
  }
}

 
//-------------------------------------------------------------------------------------------

Game.X_COORD = window.innerWidth;
Game.Y_COORD = window.innerHeight;
Game.NUM_BUBBLES = Math.ceil((Math.random()*1 +1)*window.innerHeight/100+window.innerWidth/100);

export default Game;
