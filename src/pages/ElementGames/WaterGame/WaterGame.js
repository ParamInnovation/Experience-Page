import React from "react";
import { useEffect } from "react";
import "./WaterGame.css";
import GameNav from "../../../components/gaminZone/GameNav";
import bubble2 from "./bubble2.png";
import coin from "./coin.png";
import danger from "./danger.png";
import red_fish_swim_left from "./red_fish_swim_left.png";
import red_fish_swim_right from "./red_fish_swim_right.png";
import retry from "./retry.png";
import treasure from "./treasure-png-6148.png";
import food from "./food.png";
import bubblesingle1 from "./sounds/bubbles-single1.wav";
import plop from "./sounds/plop.ogg";

export default function WaterGame() {
  function returnback() {
    window.location.reload();
  }
  useEffect(() => {
    // Canvas Setup
    const canvas = document.getElementById("mainWater");
    const firstScreen = document.getElementsByClassName("firstScreen")[0];
    const start = document.getElementById("start");
    const GameOver = document.getElementsByClassName("game-over")[0];
    const yourScore = document.getElementById("yourScore");
    const BestScore=document.getElementById('bestScrore')
    const gameEle = document.querySelector('#waterGameContainer');
    const screenWidth = window.innerWidth;

    function enterFullScreen(element) {
      if(element.requestFullscreen) {
        element.requestFullscreen();
      }else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();     // Firefox
      }else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();  // Safari
      }else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();      // IE/Edge
      }
    };
    start.addEventListener("click", function () {
      enterFullScreen(gameEle);
    
      timeLimit = 60;
      animate();
      firstScreen.style.display = "none";
      canvas.style.display = "block";
      GameOver.style.display = "none";
    });

    const ctx = canvas.getContext("2d");

    if (screenWidth <= 768) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    } else {
      canvas.width = 800;
      canvas.height = 600;
    }

    let score = 0;
    let gameFrame = 0;
    let timeLimit = 60; // in seconds

    ctx.font = "40px Georgia";

    // Mouse Interactivity
    let canvasPosition = canvas.getBoundingClientRect();

    const mouse = {
      x: canvas.width,
      y: canvas.height,
      click: false,
    };

    // When you calculate the mouse position relative to the canvas, you use the getBoundingClientRect() method, which returns the size of an element and its position relative to the viewport. However, if the canvas is not positioned at the top left corner of the screen, you might need to adjust the mouse coordinates accordingly.

    const updateMousePosition = (X, Y) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = X - rect.left;
      mouse.y = Y - rect.top;
      // mouse.x = X;
      // mouse.y = Y;
    };

    canvas.addEventListener("mousedown", (ev) => {
      mouse.click = true;
      updateMousePosition(ev.x, ev.y);
    });

    canvas.addEventListener("mouseup", () => {
      mouse.click = false;
    });

    canvas.addEventListener("mousemove", (ev) => {
      mouse.click && updateMousePosition(ev.x, ev.y);
    });

    window.addEventListener(
      "resize",
      () => (canvasPosition = canvas.getBoundingClientRect())
    );

    const touch = {
      x: null,
      y: null,
      isPressed: false,
    };
    canvas.addEventListener("touchstart", (ev) => {
      touch.isPressed = true;
      updateMousePosition(ev.touches[0].clientX, ev.touches[0].clientY);
    });

    canvas.addEventListener("touchend", (ev) => {
      touch.isPressed = false;
    });

    canvas.addEventListener("touchmove", (ev) => {
      updateMousePosition(ev.touches[0].clientX, ev.touches[0].clientY);
    });

    const updateTouchPosition = (X, Y) => {
      const rect = canvas.getBoundingClientRect();
      touch.x = X - rect.left;
      touch.y = Y - rect.top;
    };

    const playerLeft = new Image();
    playerLeft.src = red_fish_swim_left;

    const playerRight = new Image();
    playerRight.src = red_fish_swim_right;

    const planktonImage = new Image();
    planktonImage.src = food;

    const obstacleImage = new Image();
    obstacleImage.src = danger; // Replace with the correct path to your obstacle image

    const waterBubbleImage = new Image();
    waterBubbleImage.src = bubble2;

    // Player
    class Player {
      constructor() {
        if (screenWidth <= 768) {
          this.scaleFactor = 0.1; // Adjust the scale factor as needed
          this.radius = 20;
        } else {
          this.scaleFactor = 0.2;
          this.radius = 50;
        }

        this.x = canvas.width;
        this.y = canvas.height;

        this.angle = 0;

        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;

        this.spriteWidth = 498;
        this.spriteHeight = 327;
      }

      update() {
        const distanceX = this.x - mouse.x;
        const distanceY = this.y - mouse.y;

        this.angle = Math.atan2(distanceY, distanceX);

        if (mouse.x !== this.x) {
          this.x -= distanceX / 15;
        }

        if (mouse.y !== this.y) {
          this.y -= distanceY / 15;
        }
      }

      draw() {
        if (mouse.click) {
          ctx.lineWidth = 0.2;
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        ctx.fillStyle = "transparent";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "green";
        ctx.closePath();

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        this.x >= mouse.x
          ? this.drawFish(playerLeft)
          : this.drawFish(playerRight);

        ctx.restore();
      }

      drawFish(playerImage) {
        ctx.drawImage(
          playerImage,
          this.frameX * this.spriteWidth,
          this.frameY * this.spriteHeight,
          this.spriteWidth,
          this.spriteHeight,
          0 - (this.spriteWidth * this.scaleFactor) / 2,
          0 - (this.spriteHeight * this.scaleFactor) / 2,
          this.spriteWidth * this.scaleFactor,
          this.spriteHeight * this.scaleFactor
        );
      }
    }

    const player = new Player();

    // Bubbles
    let bubbles = [];

    class Bubble {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;

        this.radius = 30;
        this.speed = Math.random() * 5 + 1;
        this.distance = 0;

        this.touched = false;
        this.sound = Math.random() <= 0.5 ? true : false;
      }

      update() {
        this.y -= this.speed;

        const distanceX = this.x - player.x;
        const distanceY = this.y - player.y;
        this.distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY
        );
      }

      draw() {
        ctx.drawImage(
          planktonImage,
          this.x - this.radius,
          this.y - this.radius,
          this.radius * 1,
          this.radius * 1
        );
      }
    }

    const bubblePop1 = document.createElement("audio");
    bubblePop1.src = bubblesingle1;

    const bubblePop2 = document.createElement("audio");
    bubblePop2.src = plop;

    const handleBubbles = () => {
      if (gameFrame % 50 === 0) {
        bubbles = [...bubbles, new Bubble()];
      }

      for (const B of bubbles) {
        B.update();
        // console.log(B)
        B.draw();
      }

      // remove bubbles that reach the top in separate loop
      // this stops rest of the bubbles from blinking - not sure why
      for (const [i, B] of bubbles.entries()) {
        // B.y < 0 - this.radius * 2 && bubbles.splice(i, 1);

        // collision detection
        if (B.distance < B.radius + player.radius && bubbles[i]) {
          !B.touched && B.sound && bubblePop1.play();
          !B.touched && !B.sound && bubblePop2.play();

          !B.touched && score++;
          B.touched = true;

          bubbles.splice(i, 1);
        }
      }
    };

    // Create an Obstacle class:

    class Obstacle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = 0 - 100;
        // this.radius = 30;
        this.radius = Math.random() * 10 + 10;
        // this.speed = Math.random() * 3 + 2;

        this.speed = Math.random() * 5 + 1;
        this.distance = 0;

        this.touched = false;
      }

      update() {
        this.y += this.speed;

        const distanceX = this.x - player.x;
        const distanceY = this.y - player.y;
        this.distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY
        );
      }

      draw() {
        // console.log(obstacleImage);
        ctx.drawImage(
          obstacleImage,
          this.x - this.radius,
          this.y - this.radius,
          this.radius * 2,
          this.radius * 2
        );
      }
    }
    // Add an array to store the obstacles and create a function to handle them:
    let obstacles = [];

    const handleObstacles = () => {
      if (gameFrame % 50 === 0) {
        obstacles = [...obstacles, new Obstacle()];
      }

      for (const O of obstacles) {
        O.update();
        O.draw();
      }

      for (const [i, O] of obstacles.entries()) {
        O.y > canvas.height + O.radius * 2 && obstacles.splice(i, 1);

        // collision detection
        if (O.distance < O.radius + player.radius && obstacles[i]) {
          !O.touched && (score -= 5);
          O.touched = true;

          obstacles.splice(i, 1);
        }
      }
    };

    class WaterBubble {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.radius = Math.random() * 10 + 10;
        this.speed = Math.random() * 5 + 1;
        this.distance = 0;

        this.touched = false;
      }

      update() {
        this.y -= this.speed;
        const distanceX = this.x - player.x;
        const distanceY = this.y - player.y;
        this.distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY
        );
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(
          waterBubbleImage,
          this.x - this.radius,
          this.y - this.radius,
          this.radius * 2,
          this.radius * 2
        );
        ctx.restore();
      }
    }

    let waterBubbles = [];

    const handleWaterBubbles = () => {
      if (gameFrame % 100 === 0) {
        waterBubbles = [...waterBubbles, new WaterBubble()];
      }

      for (const B of waterBubbles) {
        B.update();
        B.draw();
      }

      // remove water bubbles that reach the top in separate loop
      // this stops rest of the bubbles from blinking - not sure why
      for (const [i, B] of waterBubbles.entries()) {
        // B.y < 0 - this.radius * 2 && waterBubbles.splice(i, 1);
        // collision detection
        if (B.distance < B.radius + player.radius && waterBubbles[i]) {
          !B.touched && (score += 5);
          B.touched = true;

          waterBubbles.splice(i, 1);
        }
      }
    };
    //treasure

    class Treasure {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;

        this.radius = 30;
        this.speed = Math.random() * 5 + 1;
        this.distance = 0;

        this.touched = false;
        this.image = new Image();
        this.image.src = treasure; // Replace with the correct path to your treasure image
      }

      update() {
        this.y -= this.speed;

        const distanceX = this.x - player.x;
        const distanceY = this.y - player.y;
        this.distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY
        );
      }

      draw() {
        ctx.drawImage(
          this.image,
          this.x - this.radius,
          this.y - this.radius,
          this.radius * 2,
          this.radius * 2
        );
      }
    }

    let treasures = [];

    const handleTreasures = () => {
      if (gameFrame % 50 === 0 && timeLimit === 10) {
        treasures = [...treasures, new Treasure()];
      }

      for (const T of treasures) {
        T.update();
        T.draw();
      }

      for (const [i, T] of treasures.entries()) {
        T.y < 0 - T.radius * 2 && treasures.splice(i, 1);

        // collision detection
        if (T.distance < T.radius + player.radius && treasures[i]) {
          !T.touched && (score += 10);
          T.touched = true;

          treasures.splice(i, 1);
        }
      }
    };

    const animate = () => {
      if (timeLimit > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        handleBubbles();
        handleObstacles();
        handleWaterBubbles();
        handleTreasures();
        player.update();
        player.draw();
        ctx.font = "20px Georgia";
        ctx.fillStyle = "black";
        ctx.fillText(`score: ${score}`, 10, 40);
        ctx.fillText(`Time left: ${timeLimit} s`, canvas.width - 170, 40);
        yourScore.innerHTML = `${score}`;
        BestScore.innerHTML=`Best Score :${score}`
        gameFrame++;
        if (gameFrame % 60 === 0) {
          timeLimit--;
        }

        if (timeLimit <= 0) {
          const animationId = requestAnimationFrame(animate);
          canvas.style.display = "none";
          GameOver.style.display =
            "block";
          cancelAnimationFrame(animationId);
          return;
        }
      }

      requestAnimationFrame(animate);
    };
  });
  return (
    <div id="waterGameContainer">
      <GameNav />
      <div className="waterGameContainer">
        <div className="firstScreen">
          <div className="dialogbox1">
            <div className="dialogbox">
              <div className="bacteria">
                <div className="food">
                  <div className="scoreDescription">
                    <img src={bubble2} alt="" srcSet="" />
                  </div>
                  <div className="points">
                    <p className="pointsScore">+1</p>
                  </div>
                </div>
                <div className="food">
                  <div className="scoreDescription">
                    <img src={danger} alt="" srcSet="" />
                  </div>
                  <div className="points">
                    <p className="pointsScore">-5</p>
                  </div>
                </div>
                <div className="food">
                  <div className="scoreDescription">
                    <img src={treasure} alt="" srcSet="" />
                  </div>
                  <div className="points">
                    <p className="pointsScore">+10</p>
                  </div>
                </div>
                <div className="food">
                  <div className="scoreDescription">
                    <img src={food} alt="" srcSet="" />
                  </div>
                  <div className="points">
                    <p className="pointsScore">+5</p>
                  </div>
                </div>
              </div>

              <div className="description0">
                <div className="description">
                  <p id="description1">
                    Swim through the ocean and collect bubbles and food while
                    avoiding dangerous obstacles in this underwater adventure!
                  </p>
                </div>
                <div className="start1">
                  <button id="start">start</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <canvas id="mainWater"></canvas>
        <div className="game-over">
          <div className="gameOverContainer">
            <div className="gameOverContainer1">
              <div className="bestScrore" id="bestScrore">
                <p>Best Score: 50</p>
              </div>
              <div className="gameOverWater"></div>
              <div className="description">
                <div className="retry" onClick={returnback}>
                  <img src={retry} alt="retry" />
                </div>
                <div id="diplayScore">
                  {" "}
                  <div id="des">
                    <p id="description2">Score:</p>
                  </div>
                  <div className="coinPlusScore">
                    <div className="coinImage">
                      <img src={coin} alt="coin" />
                      <p>
                        <p id="yourScore"></p>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
