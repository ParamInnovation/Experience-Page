const Game = require('./game.js');
const GameView = require('./game_view.js');

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById('game-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  let game = new Game();
  let gv = new GameView(game, ctx);
  let pause = document.getElementById('pause');
  let mute = document.getElementById('mute');
  let corner = document.getElementById('corner-instructions');
  let display = document.getElementById('start-display');
  let space = document.getElementById('press-space');
  let difficulty = document.getElementById('difficulty');
//  let caveman = document.getElementById('caveman') ;
  // let caveman = document.getElementById('caveman');
  let newton = document.getElementById('newton');
  // let relativity = document.getElementById('relativity');
  // let quantum = document.getElementById('quantum');
  // let string = document.getElementById('string');
  let dSettings = [newton]  ; 
  let dHash = {"newton": 1};

  const setDifficulty = (e) => {
    dSettings.forEach((setting) => {setting.className="d-choice";});
    e.target.className = "d-choice selected";
    game.difficulty = dHash[e.target.id];
  };

  // caveman.addEventListener("click", setDifficulty);
  // newton.addEventListener("click", setDifficulty);
  // relativity.addEventListener("click", setDifficulty);
  // quantum.addEventListener("click", setDifficulty);
  // string.addEventListener("click", setDifficulty);

  pause.addEventListener("click", () => {
    gv.run = !gv.run;
    if (gv.run) {
      gv.start();
    }
  });

 

  document.addEventListener("keydown", (e) => {
  	if (e.which === 32 && !gv.run){
      pause.className = "pause";
      mute.className = "mute";
      corner.className = "corner-instructions";
      display.className = "start-display gone";
      space.className = "press-space gone";
      difficulty.className = "difficulty gone";
      gv.run = true;
  		gv.start();
  	}
  });
});
