import React, { useEffect, useSyncExternalStore } from "react";
import GameNav from "../../../components/gaminZone/GameNav";
 
import "./stylesheets/style1.css";

import "./lib/bubble";

import "./lib/color"

import Game from "./lib/game";

import GameView from "./lib/game_view";

import "./lib/glitter";

import "./lib/moving_object";

import Pellet from "./lib/pellet";

import "./lib/physics";

import UserBubble from "./lib/user_bubble";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default function AirGame() {

  useEffect(() => {
    // Add event listeners for button clicks
   

    let canvas = document.getElementById('game-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    let game = new Game();
    let gv = new GameView(game, ctx);
    let pause = document.getElementById('pause');
    
    let corner = document.getElementById('corner-instructions');
    let display = document.getElementById('start-display');
    let space = document.getElementById('press-space');
    let win = document.getElementById('win-display') ; 
    let space2 = document.getElementById('press-space-1'); 
    let difficulty = document.getElementById('difficulty');
    let caveman = document.getElementById('caveman');


    pause.addEventListener("click", () => {
      gv.run = !gv.run;
      if (gv.run) {
        gv.start();
      }
    });

   

    window.addEventListener("keydown", (e) => {
      if (e.key === " " && !gv.run) {
        pause.className = "pause";
        
        corner.className = "corner-instructions";
        display.className = "start-display gone";
        space.className = "press-space gone";
        space2.className = "gone"
        difficulty.className = "difficulty gone";
        gv.run = true;
        gv.start();
      }
    });

    const upButton = document.getElementById('upButton');
    const downButton = document.getElementById('downButton');
    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');
    const start = document.getElementById('startAir');
    const end_game = document.getElementById('end-display') ;

    // Add event listeners for button touch events (for mobile devices)
    start.addEventListener('touchstart', (e) => { 
      if(gv.firstGame == true){
        pause.className = "pause";
        gv.firstGame = false ; 
        corner.className = "corner-instructions";
        display.className = "start-display gone";
        space.className = "press-space gone";
        space2.className = "gone" ; 
         
        difficulty.className = "difficulty gone";
        end_game.className = "end-display gone"
        gv.run = true;
        gv.start();
      }
      else if(gv.firstGame == false){
       { 
         gv.game.resetGame();
         gv.userBubble = gv.game.userBubbles[0];
         pause.className = "pause";
         gv.firstGame = false ; 
         corner.className = "corner-instructions";
         display.className = "start-display gone";
         space.className = "press-space gone";
         space2.className = "gone" ; 
         win.className = "gone" ; 
         difficulty.className = "difficulty gone";
         end_game.className = "end-display gone"
         gv.run = true;
         gv.start();
        
         
          
        }
      }
    }); 
    upButton.addEventListener('touchstart', () => {
      gv.userBubble.up = true;
    });
    
    downButton.addEventListener('touchstart', () => {
      gv.userBubble.down = true;
    });

    leftButton.addEventListener('touchstart', () => {
      gv.userBubble.left = true;
    });

    rightButton.addEventListener('touchstart', () => {
      gv.userBubble.right = true;
    });

    // Add touchend event listeners to stop the movement when the button is released
    upButton.addEventListener('touchend', () => {
      gv.userBubble.up = false;
      console.log("touchend")
    });

    downButton.addEventListener('touchend', () => {
      gv.userBubble.down = false;
    });

    leftButton.addEventListener('touchend', () => {
      gv.userBubble.left = false;
    });

    rightButton.addEventListener('touchend', () => {
      gv.userBubble.right = false;
    });

  }, [])
  return (
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Buttons/2.0.0/css/buttons.min.css" integrity="sha512-x8eU2Yx8Pd8XjWOTv+S/2jXGe586o6Ow722EaqGwG+4hkWaW1ZSAIMYUAY5QDyMglc9fPT0E1kZRIBwsdggtqg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Buttons/2.0.0/css/buttons.css" integrity="sha512-YfaMxZqFKwlIxBK83XXwTsJWa2rCB4a98nT1x00qjlxWMJ7gX3NSJAewuv/6LMB1Ug2aMSsjoWg9UPAkI+CXnQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <GameNav />
      <div className="mainAir">
        <canvas id="game-canvas"></canvas>
        <img className="pause gone" id="pause" src="https://res.cloudinary.com/dsguwnfdw/image/upload/v1479322057/Bubbles/icon-pause-white.png" />
      
        <div className="corner-instructions gone" id="corner-instructions">
          <p>Controls: </p>
          <p>arrow keys or w-a-s-d to move </p>
          <p>p to pause </p>
          <p>space to restart</p>
        </div>

        <div className="start-display" id="start-display">
          <span className="header"><p>Eat smaller bubbles or be eaten!</p> </span>

        </div>
        <div className="difficulty" id="difficulty">
          <div className="d-header-row">
            <span className="d-header-left"></span>
            <span className="d-header"></span>
            <span className="d-header-right"></span>
          </div>
          <div className="d-row">
            <span className="d-choice" id="caveman"></span>

          </div>
        </div>
        <span className="press-space" id="press-space">Press space to start</span>
        <span className="press-space-1" id="press-space-1"><button id = "startAir">Press to Start</button></span>
       
        <div className="controllers-main">
          <span className="circle" >

            <button id="downButton"><i class="fa-solid fa-arrow-down"></i></button>
          </span>
          <span className="circle2">
            <button id="leftButton"><i class="fa-solid fa-arrow-left"></i></button>
            <button id="rightButton"><i class="fa-solid fa-arrow-right"></i></button>
          </span>
          <span className="circle3">
            <button id="upButton"><i class="fa-solid fa-arrow-up"></i></button>
          </span>
        </div>
        <div className="end-display gone" id="end-display" >
          <span className="header2">You've been devoured!</span>
          <span className="subheader2">Press space to try again</span>
        </div>

        <div className="win-display gone" id="win-display">
          <span className="header2">You have succeeded!</span>
          <span className="subheader2">Press space to play again</span>
        </div>
      </div>
    </div>
  );
}
