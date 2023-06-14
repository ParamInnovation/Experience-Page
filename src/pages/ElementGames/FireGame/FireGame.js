import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GameNav from "../../../components/gaminZone/GameNav";
import "./FireGame.css";

export default function FireGame() {
  const [key, setKey] = useState(Math.random());
  //reload function

  const reload = () => {
    window.location.reload();
  };

  useEffect(() => {
    let laoder = document.getElementById("loader");
    let mobIns = document.getElementById("mob-instruction");
    let deskIns = document.getElementById("desk-instruction");
    let warning = document.getElementById("warning");
    let rborder = document.getElementsByClassName("right-border")[0];
    let crown = document.getElementsByClassName("crown")[0];
    let gameScreen = document.getElementById("game-screen");
    const gameContainer = document.getElementById("game-container");
    let instruction = document.getElementsByClassName("instructionFire")[0];
    // console.log(instruction)
    let fuelDisplay = document.getElementById("fuel");
    // let scoreInfo = document.getElementById('scoreInfo');
    let scoreDisplay = document.getElementById("score");
    let win = document.getElementsByClassName("wins")[0];
    let lowFuel = document.getElementsByClassName("low")[0];
    let gameOver = document.getElementsByClassName("gif")[0];
    let deskGotIt = document.getElementById("desk-gotIt");
    let mobGotIt = document.getElementById("mob-gotIt");
    let Wscreen = window.innerWidth;
    let numFuelSrc;
    let timer;

    // Timer for fuel
    function fuelReducer() {
      timer = setInterval(() => {
        player.fuel -= 1;
        // Update the fuel display
        fuelDisplay.innerText = player.fuel;
      }, 1000); // Execute the function every 1000 milliseconds (1 second)
    }

    // Hide Instruction function in Desktop mode

    deskGotIt.addEventListener("click", () => {
      instruction.style.display = "none";
      gameContainer.style.filter = "blur()";
      fuelReducer();
    });

    // Hide Instruction function in Mobile mode

    mobGotIt.addEventListener("click", () => {
      instruction.style.display = "none";
      gameContainer.style.filter = "blur()";
      fuelReducer();
    });

    // const hideDInstruction = () => {
    //     instruction.style.display = "none";
    //     gameContainer.style.filter = "blur()";
    //     // startGame();
    // };

    // generate random maze desings
    function generateMaze(rows, cols, numFuels, numWaters) {
      numFuelSrc = numFuels;      
      var waterCells = [];
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }

      function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
      }

      // Initialize maze array filled with walls (value 1)
      var maze = new Array(rows + 1)
        .fill(null)
        .map(() => new Array(cols + 1).fill(1));
      // Create starting position at the wall (top-left corner)
      maze[1][0] = 0;

      // Create ending position at the wall (bottom-right corner)
      maze[rows - 1][cols] = 0;
      maze[rows - 1][cols - 2] = 0;
      maze[rows - 2][cols - 1] = 0;
      maze[rows - 2][cols - 2] = 0;

      function isValidStartOrExitCell(x, y) {
        if (x < 0 || x >= rows || y < 0 || y >= cols) {
          return false;
        }

        // Check if there's at least one neighboring empty cell (value 0)
        const neighbors = [
          [x - 1, y],
          [x + 1, y],
          [x, y - 1],
          [x, y + 1],
        ];

        for (const [nx, ny] of neighbors) {
          if (
            nx >= 0 &&
            nx < rows &&
            ny >= 0 &&
            ny < cols &&
            maze[nx][ny] === 0
          ) {
            return true;
          }
        }

        return false;
      }

      // Depth-first search algorithm
      // Depth-first search algorithm
      function dfs(x, y) {
        const directions = shuffleArray([
          [0, 1],
          [1, 0],
          [0, -1],
          [-1, 0],
        ]);

        for (const [dx, dy] of directions) {
          const nx = x + 2 * dx;
          const ny = y + 2 * dy;

          if (
            nx > 0 &&
            nx < rows &&
            ny > 0 &&
            ny < cols &&
            maze[nx][ny] === 1
          ) {
            maze[x + dx][y + dy] = 0;
            maze[nx][ny] = 0;
            dfs(nx, ny);
          }
        }
      }

      // Carve out the maze using the DFS algorithm
      maze[1][1] = 0;
      dfs(1, 1);

      //------------------------------------------------------
      // Place fuel and water cells
      var numPlacedFuels = 0;
      var numPlacedWaters = 0;
      var validPositions = [];

      for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
          if (maze[row][col] === 0) {
            validPositions.push([row, col]);
          }
        }
      }

      validPositions = shuffleArray(validPositions);

      while (numPlacedFuels < numFuels || numPlacedWaters < numWaters) {
        var [row, col] = validPositions.pop();
        if (row != 1 && col != 0) {
          if (numPlacedFuels < numFuels) {
            maze[row][col] = 2;
            numPlacedFuels++;
          } else if (numPlacedWaters < numWaters) {
            maze[row][col] = 4;
            numPlacedWaters++;
            waterCells.push([row, col]); // Store water cell positions
          }
        }
      }
      function getRandomPosition(maze) {
        let row, col;
        do {
          row = Math.floor(Math.random() * maze.length);
          col = Math.floor(Math.random() * maze[0].length);
        } while (maze[row][col] !== 0);

        return { row, col };
      }

      //------------------------------------------------------
      // Place the key
      var keyPlaced = false;
      while (!keyPlaced) {
        const { row, col } = getRandomPosition(maze);

        // Check if the cell is on the edge and empty
        if (
          (row != 1 || col != 0 || row === rows - 1 || col === cols - 1) &&
          maze[row][col] === 0
        ) {
          maze[row][col] = 5;
          keyPlaced = true;
        }
      }
      //------------------------------------------------------
      // Place the exit
      var exitPlaced = false;
      while (!exitPlaced) {
        var row = rows - 1;
        var col = cols;

        // Check if the cell is on the edge and empty
        if (
          (row === 0 || col === 0 || row === rows - 1 || col === cols - 1) &&
          maze[row][col] === 0
        ) {
          maze[row][col] = 3;
          exitPlaced = true;
        }
      }

      function toggleWaterCells() {
        for (const [row, col] of waterCells) {
          var waterCell = document.querySelector(
            `.cell[data-x="${row}"][data-y="${col}"]`
          );

          if (waterCell) {
            if (maze[row][col] === 4) {
              waterCell.classList.remove("water");
              maze[row][col] = 0;
            } else {
              waterCell.classList.add("water");
              maze[row][col] = 4;
            }
          }
        }
      }

      setInterval(toggleWaterCells, 1000); // Call toggleWaterCells every 2 seconds

      return maze;
    }
    
    // Generate a solvable maze with given dimensions and number of fuel and water cells
    let mazeLayout;

    if (Wscreen <= 450) {
      mazeLayout = generateMaze(10, 20, 8, 15);
      mobIns.style.display = "flex";
    } else {
      mazeLayout = generateMaze(20, 20, 8, 15);
      deskIns.style.display = "flex";
    }

    var player = {
      x: 1,
      y: 0,
      fuel: 100,
      fuelCount: 0,
      score: 0,
      hasKey: false,
      gameOver: false,
    };

    // Create maze layout on game screen
    for (var i = 0; i < mazeLayout.length; i++) {
      var row = document.createElement("div");
      row.className = "column";

      for (var j = 0; j < mazeLayout[0].length; j++) {
        var cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.x = i; // Use j for column index
        cell.dataset.y = j; // Use i for row index

        if (mazeLayout[i][j] === 1) {
          cell.className += " wall";
        }
        if (mazeLayout[i][j] === 2) {
          cell.className += " fuel";
        }
        if (mazeLayout[i][j] === 3) {
          cell.className += " exit";
          cell.appendChild(rborder);
          cell.appendChild(crown);
        }
        if (mazeLayout[i][j] === 4) {
          cell.className += " water";
        }
        if (mazeLayout[i][j] === 5) {
          cell.className += " key";
        }

        row.appendChild(cell); /*  0 0  01 02 03 */
      }

      gameScreen.appendChild(row);
    }
    setTimeout(() => {
      laoder.style.display = "none";
    }, 2000);

    function logGameState() {
      // console.clear();
      console.log("Player position: (" + player.x + ", " + player.y + ")");
      console.log("Maze layout:");
      console.table(mazeLayout);
    }

    // let flame = document.getElementById("flame");
    // Update player position on game screen
    function updatePlayer() {
      var playerCellFuel = document.querySelector(".cell.player.fuel");
      var playerCellKey = document.querySelector(".cell.player.key");
      var playerCell = document.querySelector(".cell.player");
      if (playerCell || playerCellFuel) {
        playerCell.classList.remove("fuel");
        playerCell.classList.remove("player");
        playerCell.classList.remove("key");
      }

      var newPlayerCell = document.querySelector(
        `.cell[data-x="${player.x}"][data-y="${player.y}"]`
      );
      if (newPlayerCell) {
        newPlayerCell.classList.add("player");
      }
      updatePlayerStats();
    }

    // Handle user input for player movement
    function handleKeyPress(event) {
      var key = event.key;

      var keyToDirection = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
      };

      var direction = keyToDirection[key];

      if (direction && Wscreen <= 450) {
        movePlayer(direction);
      } else {
        if (key === "ArrowLeft" && !isWall(player.x - 1, player.y)) {
          // Left arrow
          player.x--;
        } else if (key === "ArrowRight" && !isWall(player.x + 1, player.y)) {
          // Right arrow
          player.x++;
        } else if (key === "ArrowUp" && !isWall(player.x, player.y - 1)) {
          // Up arrow
          player.y--;
        } else if (key === "ArrowDown" && !isWall(player.x, player.y + 1)) {
          // Down arrow
          player.y++;
        }
      }

      updatePlayer();
    }

    // Check if player position is a wall
    function isWall(x, y) {
      if (
        x < 0 ||
        x >= mazeLayout.length ||
        y < 0 ||
        y >= mazeLayout[0].length
      ) {
        return true;
      }

      return mazeLayout[x][y] === 1;
    }

    // Check if player position is a fuel source
    function isFuel(x, y) {
      if (
        x < 0 ||
        x >= mazeLayout.length ||
        y < 0 ||
        y >= mazeLayout[0].length
      ) {
        return false;
      }

      return mazeLayout[x][y] === 2;
    }

    // Check if player position is the exit
    function isExit(x, y) {
      if (
        x < 0 ||
        x >= mazeLayout.length ||
        y < 0 ||
        y >= mazeLayout[0].length
      ) {
        return false;
      }

      return mazeLayout[x][y] === 3;
    }

    // Check if player position is the water
    function isWater(x, y) {
      if (
        x < 0 ||
        x >= mazeLayout.length ||
        y < 0 ||
        y >= mazeLayout[0].length
      ) {
        return false;
      }

      return mazeLayout[x][y] === 4;
    }

    function doHaveKey(x, y) {
      if (
        x < 0 ||
        x >= mazeLayout.length ||
        y < 0 ||
        y >= mazeLayout[0].length
      ) {
        return false;
      }

      return mazeLayout[x][y] === 5;
    }

    // Update player's fuel and score based on current position
    function updatePlayerStats() {
      if (player.gameOver) return;

      var currentCell = mazeLayout[player.x][player.y];

      if (isFuel(player.x, player.y)) {
        warning.style.color = "black";
        warning.style.fontWeight = "100";
        player.fuel += 10;
        player.fuelCount += 1;
        fuelDisplay.textContent = player.fuel;
        if (player.fuel > 70) {
          player.score = Math.floor(80 + ((player.fuel - 70) / 30) * 20);
        } else if (player.fuel > 50) {
          player.score = Math.floor(50 + ((player.fuel - 50) / 20) * 30);
        } else if (player.fuel > 25) {
          player.score = Math.floor(30 + ((player.fuel - 25) / 25) * 20);
        } else {
          player.score = Math.floor((player.fuel / 25) * 30);
        }
        player.score = player.fuelCount * 20;
        scoreDisplay.textContent = player.score;
        mazeLayout[player.x][player.y] = 0;
        updatePlayer();
      }

      if (isExit(player.x, player.y)) {
        if (player.hasKey == false) {
          warning.style.color = "red";
          warning.style.fontWeight = "Bold";
        } else {
          if (document.querySelector(".cell.player.exit")) {
            player.gameOver = true;
            clearInterval(timer);
            // Handle end of game
            scoreDisplay.textContent = player.score + 10;
            // scoreInfo.style.display = "flex";
            setTimeout(() => {
              win.style.display = "flex";
              gameScreen.style.filter = "blur(10px)";
              instruction.style.filter = "blur(10px)";
              document.removeEventListener("keydown", handleKeyPress);
            }, 200);

            return;
          }
        }
      }

      if (isWater(player.x, player.y)) {
        if (document.querySelector(".cell.player.water")) {
          player.gameOver = true;
          clearInterval(timer);
          // Handle end of game
          gameOver.style.display = "flex";
          gameScreen.style.filter = "blur(10px)";
          instruction.style.filter = "blur(10px)";
          document.removeEventListener("keydown", handleKeyPress);
          // return;
        }
      }
      if (doHaveKey(player.x, player.y)) {
        if (document.querySelector(".cell.player.key")) {
          console.log("found the cell");
          player.hasKey = true;
          console.log(mazeLayout[player.x][player.y]);
          mazeLayout[player.x][player.y] = 0;
          warning.style.color = "black";
          warning.style.fontWeight = "";
          updatePlayer();
        }
      }

      if (currentCell === 0) {
        fuelDisplay.textContent = Math.ceil(player.fuel);

        if (player.fuel <= 0) {
          player.gameOver = true;
          clearInterval(timer);
          // Handle end of game
          lowFuel.style.display = "flex";
          gameScreen.style.filter = "blur(10px)";
          instruction.style.filter = "blur(10px)";
          document.removeEventListener("keydown", handleKeyPress);
        }
      }
    }

    // Start the game
    function startGame() {
      updatePlayer();
      fuelDisplay.textContent = player.fuel;
      scoreDisplay.textContent = player.score;

      document.addEventListener("keydown", handleKeyPress);
      setInterval(updatePlayerStats, 1000);
    }

    //-----------------------------------------Smartphones function------------------------------------
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);
    document.addEventListener("touchend", handleTouchEnd, false);

    let touchStartX = null;
    let touchStartY = null;

    function handleTouchStart(event) {
      const firstTouch = event.touches[0];
      touchStartX = firstTouch.clientX;
      touchStartY = firstTouch.clientY;
    }

    function handleTouchMove(event) {
      // Prevent default behavior to avoid scrolling while swiping
      event.preventDefault();
      console.clear();
    }

    function handleTouchEnd(event) {
      if (touchStartX === null || touchStartY === null) {
        return;
      }

      let deltaX = event.changedTouches[0].clientX - touchStartX;
      let deltaY = event.changedTouches[0].clientY - touchStartY;

      let moveThreshold = 30; // Minimum distance to consider a swipe

      if (
        Math.abs(deltaX) > moveThreshold ||
        Math.abs(deltaY) > moveThreshold
      ) {
        let swipeDirection;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          swipeDirection = deltaX > 0 ? "right" : "left";
        } else {
          swipeDirection = deltaY > 0 ? "down" : "up";
        }

        movePlayer(swipeDirection);
      }

      // Reset touch coordinates
      touchStartX = null;
      touchStartY = null;
    }

    function movePlayer(direction) {
      if (direction === "left" && !isWall(player.x - 1, player.y)) {
        player.x--;
      } else if (direction === "right" && !isWall(player.x + 1, player.y)) {
        player.x++;
      } else if (direction === "up" && !isWall(player.x, player.y - 1)) {
        player.y--;
      } else if (direction === "down" && !isWall(player.x, player.y + 1)) {
        player.y++;
      }

      updatePlayer();
    }

    window.addEventListener("keydown", function (event) {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        event.preventDefault();
      }
    });

    startGame();
  });
  return (
    <div className="fireBox" key={key}>
      <GameNav />
      <main id="loader">
        <div className="dank-ass-loader">
          <div className="row">
            <div className="arrow up outer outer-18"></div>
            <div className="arrow down outer outer-17"></div>
            <div className="arrow up outer outer-16"></div>
            <div className="arrow down outer outer-15"></div>
            <div className="arrow up outer outer-14"></div>
          </div>
          <div className="row">
            <div className="arrow up outer outer-1"></div>
            <div className="arrow down outer outer-2"></div>
            <div className="arrow up inner inner-6"></div>
            <div className="arrow down inner inner-5"></div>
            <div className="arrow up inner inner-4"></div>
            <div className="arrow down outer outer-13"></div>
            <div className="arrow up outer outer-12"></div>
          </div>
          <div className="row">
            <div className="arrow down outer outer-3"></div>
            <div className="arrow up outer outer-4"></div>
            <div className="arrow down inner inner-1"></div>
            <div className="arrow up inner inner-2"></div>
            <div className="arrow down inner inner-3"></div>
            <div className="arrow up outer outer-11"></div>
            <div className="arrow down outer outer-10"></div>
          </div>
          <div className="row">
            <div className="arrow down outer outer-5"></div>
            <div className="arrow up outer outer-6"></div>
            <div className="arrow down outer outer-7"></div>
            <div className="arrow up outer outer-8"></div>
            <div className="arrow down outer outer-9"></div>
          </div>
        </div>
        <div className="fact">
          <p>Fact</p>
          <p>:</p>
          <p id="aa2708">
            {" "}
            A flame color is affected by the oxygen supply. Low-oxygen flames
            emit a <span id="d4d41a">yellow glow</span>, while high-oxygen ones
            emit a <span id="2e6fd7">blue glow</span>.
          </p>
        </div>
      </main>
      <div id="gameBox">
        <div id="game-info">
          <div className="game-child-info">
            <div>
              Fuel left:
              <div id="fuel-indicator">
                <img
                  src="https://paraminnovation.org/wp-content/uploads/2023/04/pngegg.webp"
                  alt="fuel"
                />
              </div>{" "}
              x<span id="fuel">100</span>
            </div>
            <div>
              Score: <span id="score">0</span>
            </div>
          </div>
        </div>
        <div id="game-container">
          <div id="game-screen">
            <div className="right-border"></div>
            <div className="crown">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="instructionFire">
          <div id="warning">Collect the key to win the game</div>
          <div id="desk-instruction">
            <div>
              <div className="arrows"></div>
              <div className="instructionPara">
                Use arrow keys to move around.
              </div>
            </div>
            <button id="desk-gotIt">Got it</button>
          </div>
          <div id="mob-instruction">
            <div>
              <div className="swipe"></div>
              <div className="instructionPara">swipe to move around.</div>
            </div>
            <button id="mob-gotIt">Got it</button>
          </div>
        </div>
      </div>

      <div className="popups">
        <div className="low">
          <div className="lowFuel promptBox">
            <div className="message">
              <p>Low Fuel. You ran out of Fuel..</p>
            </div>
          </div>
          <div className="buttonsFire">
            <button onClick={reload}>Play Again</button>
            <Link to="/gaming-zone"><button>Exit</button></Link>
          </div>
        </div>
        <div className="gif">
          <div className="gameOverFire promptBox">
            <div className="message">
              <p>Game Over. You step on Water!...</p>
            </div>
          </div>
          <div className="buttonsFire bt-52">
            <button onClick={reload}>Play Again</button>
            <Link to="/gaming-zone"><button>Exit</button></Link>
          </div>
        </div>
        <div className="wins">
          <div className="win promptBox">
            <div className="message">
              <p>You Won...</p>
            </div>
          </div>
          <div className="buttonsFire bt-30">
            <button onClick={reload}>Play Again</button>
            <Link to="/gaming-zone"><button>Exit</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
