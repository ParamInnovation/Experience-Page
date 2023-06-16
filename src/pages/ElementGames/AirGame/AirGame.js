import React, { useEffect, useState, useSyncExternalStore } from "react";
import GameNav from "../../../components/gaminZone/GameNav";

import "./stylesheets/style1.css";

import "./lib/bubble";

import "./lib/color";

import Game from "./lib/game";

import GameView from "./lib/game_view";

import "./lib/glitter";

import "./lib/moving_object";

import Pellet from "./lib/pellet";

import "./lib/physics";

// import UserBubble from "./lib/user_bubble";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Joystick } from "react-joystick-component";

export default function AirGame() {
  const [directions, setDirection] = useState("None");
  const [gv, SetGv] = useState();

  const [truth, Settruth] = useState(1);

  useEffect(() => {
    // Add event listeners for button clicks

    const corner = document.getElementById("corner-instructions");
    const display = document.getElementById("start-display");
    const space = document.getElementById("press-space");
    const win = document.getElementById("win-display");
    const space2 = document.getElementById("press-space-1");
    const difficulty = document.getElementById("difficulty");
    const start = document.getElementById("startAir");
    const end_game = document.getElementById("end-display");
    const gameEle = document.querySelector("#mainAir");
    // Add event listeners for button clicks

    const canvas = document.getElementById("game-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    const pause = document.getElementById("pause");

    const game = new Game();

    Settruth(0);
    if (truth) {
      SetGv(new GameView(game, ctx));
    }

    // if(truth)intialize(truth);
    pause.addEventListener("click", () => {
      gv.run = !gv.run;
      if (gv.run) {
        gv.start();
      }
    });

    window.addEventListener(
      "keydown",
      (e) => {
        console.log("here");
        if (gv && e.key === " " && !gv.run) {
          pause.className = "pause";

          corner.className = "corner-instructions";
          display.className = "start-display gone";
          space.className = "press-space gone";
          space2.className = "gone";
          difficulty.className = "difficulty gone";
          gv.run = true;
          gv.start();
        }
      },
      []
    );

    function enterFullScreen(element) {
      console.log(element);
      if (element.requestFullscreen) {
        element.requestFullscreen().catch((err) => {
          console.log("Error attempting to open in full screen mode");
        });
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen(); // Firefox
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(); // Safari
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen(); // IE/Edge
      }
    }

    // Add event listeners for button touch events (for mobile devices)
    start.addEventListener("click", (e) => {
      if (gv && gv.firstGame == true) {
        pause.className = "pause";
        gv.firstGame = false;
        corner.className = "corner-instructions";
        display.className = "start-display gone";
        space.className = "press-space gone";
        space2.className = "gone";

        difficulty.className = "difficulty gone";
        end_game.className = "end-display gone";
        console.log(gv);
        gv.run = true;
        gv.start();
        if (gameEle) {
          console.log(gameEle)
          enterFullScreen(gameEle);
        }
      } else if (gv && gv.firstGame == false) {
        {
          gv.game.resetGame();

          // window.location.reload();
          gv.userBubble = gv.game.userBubbles[0];

          pause.className = "pause";
          gv.firstGame = false;
          corner.className = "corner-instructions";
          display.className = "start-display gone";
          space.className = "press-space gone";
          space2.className = "gone";
          win.className = "gone";
          difficulty.className = "difficulty gone";
          end_game.className = "end-display gone";
          gv.run = true;
          gv.start();
        }
      }
    });
    if (gv) {
      if (directions == "RIGHT") {
        gv.userBubble.right = true;
        gv.userBubble.up = false;
        gv.userBubble.down = false;
        gv.userBubble.left = false;
      } else if (directions == "LEFT") {
        gv.userBubble.left = true;
        gv.userBubble.up = false;
        gv.userBubble.down = false;
        gv.userBubble.right = false;
      } else if (directions == "FORWARD") {
        gv.userBubble.up = true;
        gv.userBubble.right = false;
        gv.userBubble.down = false;
        gv.userBubble.left = false;
      } else if (directions == "BACKWARD") {
        gv.userBubble.down = true;
        gv.userBubble.up = false;
        gv.userBubble.right = false;
        gv.userBubble.left = false;
      } else {
        gv.userBubble.down = false;
        gv.userBubble.up = false;
        gv.userBubble.right = false;
        gv.userBubble.left = false;
      }
    }
  });
  return (
    <div id="mainAir">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/Buttons/2.0.0/css/buttons.min.css"
        integrity="sha512-x8eU2Yx8Pd8XjWOTv+S/2jXGe586o6Ow722EaqGwG+4hkWaW1ZSAIMYUAY5QDyMglc9fPT0E1kZRIBwsdggtqg=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/Buttons/2.0.0/css/buttons.css"
        integrity="sha512-YfaMxZqFKwlIxBK83XXwTsJWa2rCB4a98nT1x00qjlxWMJ7gX3NSJAewuv/6LMB1Ug2aMSsjoWg9UPAkI+CXnQ=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <GameNav />
      <div className="mainAir">
        <canvas id="game-canvas"></canvas>
        <img
          className="pause gone"
          id="pause"
          src="https://res.cloudinary.com/dsguwnfdw/image/upload/v1479322057/Bubbles/icon-pause-white.png"
        />

        <div className="corner-instructions gone" id="corner-instructions">
          <p>Controls: </p>
          <p>arrow keys or w-a-s-d to move </p>
          <p>p to pause </p>
          <p>space to restart</p>
        </div>

        <div className="start-display" id="start-display">
          <span className="header">
            <p>Eat smaller bubbles or be eaten!</p>{" "}
          </span>
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
        <span className="press-space" id="press-space">
          Press space to start
        </span>
        <span className="press-space-1" id="press-space-1">
          <button id="startAir">Press to Start</button>
        </span>

        <div className="controllers-main">
          <Joystick
            size={100}
            sticky={false}
            baseColor="#808080"
            stickColor="white"
            move={(IJoystickUpdateEvent) => {
              console.log(IJoystickUpdateEvent.direction);
              setDirection(IJoystickUpdateEvent.direction);
            }}
            stop={(IJoystickUpdateEvent) => {
              console.log("stop", IJoystickUpdateEvent);

              // setDirection(IJoystickUpdateEvent);
              IJoystickUpdateEvent.x = 0;
              IJoystickUpdateEvent.y = 0;
              console.log("stop", IJoystickUpdateEvent);
            }}
          ></Joystick>
        </div>
        <div className="end-display gone" id="end-display">
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
