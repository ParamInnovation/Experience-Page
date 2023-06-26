import { React, useEffect, useRef } from "react";
import p5 from "p5";
import $ from "jquery";
import "round-slider/dist/roundslider.min.css";
import "round-slider";
import "./Attractors.css";
import EquationNav from "../EquationNav";
// import three from 'three'

export default function Attractors() {
  const myRef = useRef();

  useEffect(() => {
    const alphaDiv = document.getElementById("alpha");
    const betaDiv = document.getElementById("beta");
    const gammaDiv = document.getElementById("gamma");
    myRef.current = new p5((myP5) => {
      const displayContentlargescreen = document.querySelector(
        "#displayContentlargescreen"
      );
      displayContentlargescreen.addEventListener("click", displayContent);

      const item = document.querySelector("#item");
      item.addEventListener("click", displayvlueContainer);

      const backwardButton = document.querySelector("#backwardButton");
      const forwardBackword = document.querySelector("#forwardBackword");
      backwardButton.addEventListener("click", () => {
        changeAttractor(-1);
      });
      forwardBackword.addEventListener("click", () => {
        changeAttractor(1);
      });

      let ball = false;
      let content = false;

      function displayContent() {
        content = !content;
        if (content) {
          document.getElementById("content").style.display = "block";
          document.getElementsByClassName("valueContainer")[0].style.display =
            "none";
          document.getElementById("displayContentlargescreen").innerHTML = "X";
        } else {
          document.getElementById("content").style.display = "none";
          document.getElementById("displayContentlargescreen").innerHTML = "i";
        }
      }
      function displayN() {
        document.getElementById("content").style.display = "none";
      }
      function displayvlueContainer() {
        ball = !ball;
        if (ball == true) {
          document.getElementsByClassName("valueContainer")[0].style.display =
            "block";
          document.getElementById("content").style.display = "none";
          document.getElementById("icon").style.display = "none";
          document.getElementById("x").style.display = "block";
        } else {
          document.getElementsByClassName("valueContainer")[0].style.display =
            "none";
          document.getElementById("icon").style.display = "block";
          document.getElementById("x").style.display = "none";
        }
      }

      document.getElementById("skip").addEventListener("click", function () {
        document.getElementsByClassName("moreInfoalphaBeta")[0].style.display =
          "none";
      });
      document
        .getElementById("skipphone")
        .addEventListener("click", function () {
          document.getElementsByClassName(
            "moreInfoalphaBetaphone"
          )[0].style.display = "none";
          document.getElementsByClassName("valueContainer")[0].style.display =
            "none";
        });
      let textfield = document.getElementById("text-container");

      let textfieldmoreInfo = document.getElementById("moreInfo");

      const colorPicker = document.querySelector("#colorPicker");
      const colorPicker1 = document.querySelector("#colorPicker1");
      const colorPreview = document.querySelector("#colorPreview");
      const colorPreview1 = document.querySelector("#colorPreview1");

      let o; // mathmatical constnts
      let b;
      let p; //"you down with OBP (yeah you know me!)"
      let q;
      let d;
      let e;
      let r;
      let f;
      let g;
      const num = 200; //number of points
      const tsize = 400; //length of point tails
      const waitTime = 5 * 30; //time between each shape (seconds * FPS)
      let a = []; // array of points

      let font;
      let poof;
      let dicon;
      /*to add another shape to the system:
		add another variable case to lorenz/constructor,
		add another function case to lorenz/calculate,
		add 1 to numShapes in newLorenz
		add another if else case to newLorenz with the initail contitions s (randomness) and speed (runtime speed)
		optional : add another text case to draw
		*/
      /*****************************************************************************************************************
       * class that holds the position of each individual point, as well as the trail it leaves behind.
       *
       * calculate function takes the current position, throws it into some funky math, then you get the delta V.
       * add the deltaV*timestep to the current position and you have the moving point.
       *
       * the position is recorded to an array length "tsize" then a trail using those positions is drawn once per frame.
       * the trail uses the distance between the current point and the next point to decide how smooth to draw the line.
       * I wanted to make the trail fade to trasparent near the end, but I couldn't figure out an easy way to do that.
       ****************************************************************************************************************/
      class lorenz {
        constructor(x, y, z, h, k, myP5) {
          this.myP5 = myP5;
          this.pos = myP5.createVector(x, y, z);
          this.dV = myP5.createVector(0, 0, 0);

          this.v1 = myP5.createVector(0, 0, 0);
          this.v2 = myP5.createVector(0, 0, 0);
          this.prev = [];
          this.prev.push(this.pos.array());
          this.prev.push(this.pos.array());
          this.c = h;
          this.avg = 0;

          this.k = k;

          //initailize variables (variable case)
          switch (k) {
            case 0: //lorenz attractor
              o = 10;
              p = 28;
              b = 8 / 3;
              break;
            case 1: //chen attractor
              o = 40;
              p = 3;
              b = 28;
              break;
            case 2: //chua chaotic attractor
              o = 10.82;
              p = 14.286;
              break;
            case 3: //"modified" rossler attractor
              o = 0.1;
              p = 0.1;
              b = 14;
              break;
            case 4: //Hadley
              o = 0.2;
              p = 4;
              b = 8;
              g = 1;

              break;
            case 5: //THREE-SCROLL UNIFIED CHAOTIC SYSTEM
              o = 32.48;
              p = 45.84;
              b = 1.18;
              d = 0.13;
              e = 0.57;
              f = 14.7;
              break;
            case 6: //HALVORSEN
              o = 2;
              break;
            case 7: //RABINOVICH-FABRIKANT
              o = 1;
              b = 8;
              f = 5;
              g = 5;
              break;
            case 8: //DADRAS
              o = 3;
              p = 3;
              b = 2;
              q = 2;
              r = 9;
              break;
          }
        }

        /*****************************************************************************
         * runs the functions that make the patterns
         * uses the above constants to control the shape
         * all are accurate to the original functions apart from the rossler attractor
         * that was modified to prevent numbers approacing infinity
         ****************************************************************************/
        calculate(t) {
          switch (
            this.k //function cases
          ) {
            case 0: //lorenz
              this.dV.set(
                this.pos.x + t * 7 * o * (this.pos.y - this.pos.x),
                this.pos.y +
                  t * 7 * (this.pos.x * (p - this.pos.z) - this.pos.y),
                this.pos.z + t * 7 * (this.pos.x * this.pos.y - b * this.pos.z)
              );
              break;
            case 1: //chen
              this.dV.set(
                this.pos.x + t * 3 * o * (this.pos.y - this.pos.x),
                this.pos.y +
                  t *
                    3 *
                    ((b - o) * this.pos.x -
                      this.pos.x * this.pos.z +
                      b * this.pos.y),
                this.pos.z + t * 3 * (this.pos.x * this.pos.y - p * this.pos.z)
              );
              break;
            case 2: //chua
              this.h = -0.11 * Math.sin((Math.PI * this.pos.x) / 2.6);
              this.dV.set(
                this.pos.x + t * 5 * (o * (this.pos.y - this.h)),
                this.pos.y + t * 5 * (this.pos.x - this.pos.y + this.pos.z),
                this.pos.z + t * 5 * (-p * this.pos.y)
              );
              break;
            case 3: //rossler
              this.dV.set(
                this.pos.x +
                  t * 10 * (-this.pos.y - Math.pow(o * this.pos.z, 2)),
                this.pos.y + t * 10 * (this.pos.x + o * this.pos.y),
                this.pos.z + t * 10 * (p + this.pos.z * (this.pos.x - b))
              );
              break;
            case 4: //Hadley
              this.dV.set(
                this.pos.x +
                  t *
                    200 *
                    (-(this.pos.y * this.pos.y) -
                      this.pos.z * this.pos.z -
                      o * this.pos.x +
                      o * b),
                this.pos.y +
                  t *
                    200 *
                    (this.pos.x * this.pos.y -
                      p * this.pos.x * this.pos.z -
                      this.pos.y +
                      g),
                this.pos.z +
                  t *
                    200 *
                    (p * this.pos.x * this.pos.y +
                      this.pos.x * this.pos.z -
                      this.pos.z)
              );
              break;
            case 5: //THREE-SCROLL UNIFIED CHAOTIC SYSTEM
              this.dV.set(
                this.pos.x +
                  t *
                    (o * (this.pos.y - this.pos.x) +
                      d * this.pos.x * this.pos.z),
                this.pos.y +
                  t *
                    (p * this.pos.x - this.pos.x * this.pos.z + f * this.pos.y),
                this.pos.z +
                  t *
                    (b * this.pos.z +
                      this.pos.x * this.pos.y -
                      e * this.pos.x * this.pos.x)
              );
              break;
            case 6: //HALVORSEN
              this.dV.set(
                this.pos.x +
                  t *
                    (-o * this.pos.x -
                      4 * this.pos.y -
                      4 * this.pos.z -
                      this.pos.y * this.pos.y),
                this.pos.y +
                  t *
                    (-o * this.pos.y -
                      4 * this.pos.z -
                      4 * this.pos.x -
                      this.pos.z * this.pos.z),
                this.pos.z +
                  t *
                    (-o * this.pos.z -
                      4 * this.pos.x -
                      4 * this.pos.y -
                      this.pos.x * this.pos.x)
              );
              break;
            case 7: //LORENZ83
              this.dV.set(
                this.pos.x +
                  t *
                    (-o * this.pos.x -
                      this.pos.y * this.pos.y -
                      this.pos.z * this.pos.z +
                      o * f),
                this.pos.y +
                  t *
                    (-this.pos.y +
                      this.pos.x * this.pos.y -
                      b * this.pos.x * this.pos.z +
                      g),
                this.pos.z +
                  t *
                    (-this.pos.z +
                      b * this.pos.x * this.pos.y +
                      this.pos.x * this.pos.z)
              );
              break;
            case 8: //DADRAS
              this.dV.set(
                this.pos.x +
                  t *
                    (this.pos.y - o * this.pos.x + p * this.pos.y * this.pos.z),
                this.pos.y +
                  t * (b * this.pos.y - this.pos.x * this.pos.z - this.pos.z),
                this.pos.z + t * (q * this.pos.x * this.pos.y - r * this.pos.z)
              );
              break;
          }

          this.pos.set(this.dV);
        }
        /****************************
         * draws the points and tails
         ***************************/
        draw() {
          this.prev.push(this.pos.array()); //array of tail vectors
          if (this.prev.length > tsize) {
            this.prev.splice(0, 1);
          }

          //calculates the color of the trail based on the speed of the point
          let G;
          let R = 1;
          this.v1.set(
            this.myP5.createVector(
              this.prev[this.prev.length - 1][0],
              this.prev[this.prev.length - 1][1],
              this.prev[this.prev.length - 1][2]
            )
          );
          this.v2.set(
            this.myP5.createVector(
              this.prev[this.prev.length - 2][0],
              this.prev[this.prev.length - 2][1],
              this.prev[this.prev.length - 2][2]
            )
          );
          this.mod = p5.Vector.sub(this.v1, this.v2);
          G = this.mod.mag();
          this.myP5.stroke(this.c, 100, G * 50 + 0);

          //draws the tail
          //uses the distance/speed between points to determine how detailed the trail should be
          this.myP5.beginShape();
          this.myP5.vertex(
            this.prev[this.prev.length - 1][0],
            this.prev[this.prev.length - 1][1],
            this.prev[this.prev.length - 1][2]
          );
          for (let i = this.prev.length - 2; i >= 0; i -= R) {
            this.v1 = this.myP5.createVector(
              this.prev[i][0],
              this.prev[i][1],
              this.prev[i][2]
            );
            this.v2 = this.myP5.createVector(
              this.prev[i + 1][0],
              this.prev[i + 1][1],
              this.prev[i + 1][2]
            );
            this.mod = p5.Vector.sub(this.v1, this.v2);
            G = this.mod.mag();
            R = this.myP5.constrain(Math.round(5 / (G + 1)), 1, tsize / 2);

            this.myP5.vertex(this.prev[i][0], this.prev[i][1], this.prev[i][2]);
          }
          this.myP5.vertex(this.prev[0][0], this.prev[0][1], this.prev[0][2]);
          this.myP5.endShape();

          //yes the point at the front is a sphere
          this.myP5.push();
          this.myP5.translate(this.pos.x, this.pos.y, this.pos.z);
          this.myP5.sphere(0.5, 3, 3);
          this.myP5.pop();
        }
      }

      /************************************
       * adds subtle glow to the background
       ***********************************/
      function glow() {
        myP5.tint(
          C,
          100,
          50,
          myP5.constrain(Math.sqrt(time / tsize), 0, 1) * 50
        );
        // image( -127, -127, 255, 255);
        myP5.pop();
      }

      let C;
      /*******************************************
       * creates and sets up a new attractor shape
       ******************************************/
      function changeAttractor(direction) {
        console.log(direction);
        aType += direction;
        aType = newLorenz(aType);
      }
      function newLorenz(A) {
        let numShapes = 9;

        A = ((A % numShapes) + numShapes) % numShapes; //iterates next attractor

        let s = 1; //randomness
        let x = 1; //direction specific randomness
        let y = 1;
        let z = 1;

        //remove previous attractor
        while (a.length > 0) {
          a.pop();
        }

        //setup initial variables
        if (A == 0) {
          s = 10;
          sspeed = 0.0005;
        } else if (A == 1) {
          s = 1;
          sspeed = 0.0005;
        } else if (A == 2) {
          s = 0.01;
          sspeed = 0.01;
        } else if (A == 3) {
          s = 1;
          x = 20;
          y = 20;
          z = 0;
          sspeed = 0.002;
        } else if (A == 4) {
          s = 1;
          x = 20;
          y = 20;
          z = 0;
          sspeed = 0.00007;
        } else if (A == 5) {
          s = 20;

          // x = 3;
          // y = 2;
          // z = -1;
          sspeed = 0.0007;
        } else if (A == 6) {
          s = 1;
          x = 20;
          y = 20;
          z = 0;
          sspeed = 0.002;
        } else if (A == 7) {
          s = 1;
          x = 10;
          y = 10;
          z = 0;
          sspeed = 0.0005;
        } else if (A == 8) {
          s = 20;
          // x = 10;
          // y = 10;
          // z = 0;
          sspeed = 0.0005;
        }

        //make new attractor with randomized colors
        C = myP5.map(b, 0, 100, 0, 100);
        for (let i = 0; i < num; i++) {
          a.push(
            new lorenz(
              Math.random(x * s, x * -s),
              Math.random(y * s, y * -s),
              Math.random(z * s, z * -s),
              Math.abs(myP5.randomGaussian(C, 5)) % 100,
              A,
              myP5
            )
          );
        }
        return A;
      }
      /*******************************************
       * controls the smooth rotation of the shape
       ******************************************/
      let mx;
      let mv;

      function orbit() {
        if (myP5.mouseIsPressed) {
          mv.add(
            (myP5.mouseX - myP5.pmouseX) / 1000,
            (myP5.pmouseY - myP5.mouseY) / 1000
          );
        }
        mv.mult(0.9);
        mx.add(mv);
        myP5.rotateX(mx.y);
        myP5.rotateY(mx.x);
      }

      myP5.setup = () => {
        mx = myP5.createVector(0, 0);
        mv = myP5.createVector(0, 0);

        myP5.createCanvas(myP5.windowWidth, myP5.windowHeight, myP5.WEBGL);
        myP5.strokeWeight(1);
        myP5.noFill();

        myP5.background(0);
        myP5.perspective(Math.PI / 4, myP5.width / myP5.height, 1, 1000);
        myP5.colorMode(myP5.HSL, 100);
        myP5.blendMode(myP5.ADD);
        // textFont(font);

        myP5.textAlign(myP5.CENTER, myP5.CENTER);
        myP5.camera(0, 0, 150);
      };

      let time = waitTime + 1;
      let aType = 0;
      let sspeed;

      myP5.draw = () => {
        if (time > waitTime) {
          time = 0;
          aType = newLorenz(aType);
        }
        const headingsize =
          Math.min(myP5.windowWidth, myP5.windowHeight) * 0.008;
        const textsize = Math.min(myP5.windowWidth, myP5.windowHeight) * 0.0045;
        time++;
        myP5.frameRate(30);

        myP5.background(0);
        myP5.fill(0, 100, 100);
        myP5.textSize(textsize);

        myP5.push();
        myP5.translate(0, 0, -100);
        myP5.textSize(headingsize);

        switch (aType) {
          case 0:
            b = parseInt(b);
            textfieldmoreInfo.innerHTML = "Lorenz Attractor";
            $("#slider1").roundSlider("setValue", o);
            $("#slider3").roundSlider("setValue", b);
            $("#slider2").roundSlider("setValue", p);
            alphaDiv.innerHTML = o;
            betaDiv.innerHTML = b;
            gammaDiv.innerHTML = p;
            // $("#slider3").roundSlider("setValue", 3);
            // text("Lorenz Attractor", 0, -90);
            break;
          case 1:
            b = parseInt(b);
            // text("Chen Attractor", 0, -90);
            textfieldmoreInfo.innerHTML = "Chen Attractor";
            $("#slider1").roundSlider("setValue", o);
            $("#slider3").roundSlider("setValue", b);
            $("#slider2").roundSlider("setValue", p);
            alphaDiv.innerHTML = o;
            betaDiv.innerHTML = p;
            gammaDiv.innerHTML = b;
            break;
          case 2:
            b = parseInt(b);
            // text("Modified Chua Chaotic Attractor", 0, -90);
            textfieldmoreInfo.innerHTML = "Modified Chua Chaotic Attractor";
            $("#slider1").roundSlider("setValue", o);
            $("#slider3").roundSlider("setValue", b);
            $("#slider2").roundSlider("setValue", p);
            alphaDiv.innerHTML = o;
            betaDiv.innerHTML = p;
            gammaDiv.innerHTML = b;
            break;
          case 3:
            b = parseInt(b);
            // text("Modified Rossler Attractor", 0, -90);
            textfieldmoreInfo.innerHTML = "Modified Rossler Attractor";
            $("#slider1").roundSlider("setValue", o);
            $("#slider3").roundSlider("setValue", b);
            $("#slider2").roundSlider("setValue", p);
            alphaDiv.innerHTML = o;
            betaDiv.innerHTML = p;
            gammaDiv.innerHTML = b;
            break;
          case 4:
            b = parseInt(b);
            // text("Modified Rossler Attractor", 0, -90);
            textfieldmoreInfo.innerHTML = "Hadley";
            $("#slider1").roundSlider("setValue", o);
            $("#slider3").roundSlider("setValue", b);
            $("#slider2").roundSlider("setValue", p);
            alphaDiv.innerHTML = o;
            betaDiv.innerHTML = p;
            gammaDiv.innerHTML = b;
            break;
          case 5:
            b = parseInt(b);
            // text("Modified Rossler Attractor", 0, -90);
            textfieldmoreInfo.innerHTML = "THREE-SCROLL UNIFIED CHAOTIC SYSTEM";
            $("#slider1").roundSlider("setValue", o);
            $("#slider3").roundSlider("setValue", b);
            $("#slider2").roundSlider("setValue", p);
            alphaDiv.innerHTML = o;
            betaDiv.innerHTML = p;
            gammaDiv.innerHTML = b;
            break;
          case 6:
            b = parseInt(b);
            // text("Modified Rossler Attractor", 0, -90);
            textfieldmoreInfo.innerHTML = "HALVORSEN";
            $("#slider1").roundSlider("setValue", o);
            $("#slider3").roundSlider("setValue", b);
            $("#slider2").roundSlider("setValue", p);
            alphaDiv.innerHTML = o;
            betaDiv.innerHTML = p;
            gammaDiv.innerHTML = b;
            break;
          case 7:
            b = parseInt(b);
            // text("Modified Rossler Attractor", 0, -90);
            textfieldmoreInfo.innerHTML = "RABINOVICH-FABRIKANT";
            $("#slider1").roundSlider("setValue", o);
            $("#slider3").roundSlider("setValue", b);
            $("#slider2").roundSlider("setValue", p);
            alphaDiv.innerHTML = o;
            betaDiv.innerHTML = p;
            gammaDiv.innerHTML = b;
            break;
          case 8:
            b = parseInt(b);
            // text("Modified Rossler Attractor", 0, -90);
            textfieldmoreInfo.innerHTML = "DADRAS";
            $("#slider1").roundSlider("setValue", o);
            $("#slider3").roundSlider("setValue", b);
            $("#slider2").roundSlider("setValue", p);
            alphaDiv.innerHTML = o;
            betaDiv.innerHTML = p;
            gammaDiv.innerHTML = b;
            break;
        }
        myP5.textSize(textsize);
        let sentence =
          "Note: This is a 3D generative model.  Drag mouse to move around. Press space bar on keyboard to generate new attractor";
        // text(sentence.toLowerCase(), 0, 90);
        textfield.innerHTML = "Attractor";
        glow();
        orbit();
        myP5.noFill();
        myP5.push();
        myP5.translate(0, 0, -20);
        for (let x = 0; x < num; x++) {
          for (let i = 0; i < 10; i++) {
            a[x].calculate(sspeed);
          }
          //a[x].glow();
          a[x].draw();
        }
        myP5.pop();
      };

      const hues = [];
      function keyPressed() {
        time = waitTime;
      }

      let sliderValue = 50; // initial slider value

      function updateColor(hue) {
        console.log(hue);
        const saturation = 100;
        const lightness = 50;

        // update color of the attractor shape
        for (let i = 0; i < a.length; i++) {
          a[i].c = myP5.color(hues[i % hues.length], saturation, lightness); // set the color of the attractor based on the stored hue value
        }
      }

      $("#slider1").roundSlider({
        radius: 74.82,
        width: 5,
        handleSize: "+10",
        handleShape: "dot",
        sliderType: "min-range",
        value: 10,
        tooltipFormat: "tooltipVal1",
        borderColor: "transparent",
        border: null,
        min: 0,
        max: 100,
        step: 1,
        rangeColor: "#FF0000",
        drag: function (event) {
          // handle slider value changes here
          console.log("Slider value changed to:", event.value);
          o = event.value;
        },
      });
      function tooltipVal1(args) {
        if (o == undefined) {
          var val = "alpha" + " " + 10;
        }
        if (o != undefined) {
          var val = "alpha " + " " + o;
        }
        return val;
      }

      $("#slider3").roundSlider({
        radius: 74.82,
        width: 5,
        handleSize: "+10",
        handleShape: "dot",
        sliderType: "min-range",
        value: 3,
        tooltipFormat: "tooltipVal10",
        drag: function (event) {
          // handle slider value changes here
          console.log("Slider value changed to:", event.value);
          b = event.value;
        },
      });
      function tooltipVal10(args) {
        if (b == undefined) {
          var val = "beta" + " " + 3;
        }
        if (b != undefined) {
          var val = "beta" + " " + parseInt(b);
        }
        return val;
      }

      $("#slider2").roundSlider({
        radius: 74.82,
        width: 5,
        handleSize: "+10",
        handleShape: "dot",
        sliderType: "min-range",
        value: 3,
        tooltipFormat: "tooltipVal20",
        drag: function (event) {
          // handle slider value changes here
          console.log("Slider value changed to:", event.value);
          p = event.value;
        },
      });
      function tooltipVal20(args) {
        if (p == undefined) {
          var val = "gamma" + " " + 3;
        }
        if (p != undefined) {
          var val = "gamma" + " " + parseInt(p);
        }
        return val;
      }
      $("#uniqueslider").roundSlider({
        radius: 74.82,
        width: 5,
        handleSize: "+10",
        handleShape: "dot",
        sliderType: "min-range",
        value: 3,
        tooltipFormat: "tooltipVal2",
        drag: function (event) {
          // handle slider value changes here
          console.log("Slider value changed to:", event.value);
          b = event.value;
        },
      });
      function tooltipVal2(args) {
        if (b == undefined) {
          var val = "beta" + " " + 3;
        }
        if (b != undefined) {
          var val = "beta" + " " + parseInt(b);
        }

        return val;
      }

      function tooltipVal3(args) {
        if (p == undefined) {
          var val = "gamma" + " " + 3;
        }
        if (p != undefined) {
          var val = "gamma" + " " + parseInt(p);
        }

        return val;
      }

      colorPicker.addEventListener("input", function () {
        const hue = this.value;
        const color = `hsl(${hue}, 100%, 50%)`;
        colorPreview.style.backgroundColor = color;
        hues[0] = hue; // store the hue value in an array
        updateColor(hues);
      });

      colorPicker1.addEventListener("input", function () {
        const hue = this.value;
        const color = `hsl(${hue}, 100%, 50%)`;
        colorPreview1.style.backgroundColor = color;
        hues[0] = hue; // store the hue value in an array
        updateColor(hues);
      });
      let zoom = 1.0; // initial zoom level

      function mouseWheel(event) {
        // increase or decrease zoom level based on mouse wheel direction
        zoom += event.delta * 0.001;

        // limit zoom level to a reasonable range
        zoom = myP5.constrain(zoom, 0.1, 10.0);

        // adjust camera position based on zoom level
        myP5.camera(0, 0, 150 * zoom);
      }

      //scrollable ball
      var dragItem = document.querySelector("#item");
      var container = document.querySelector("#container");

      var active = false;
      var currentX;
      var currentY;
      var initialX;
      var initialY;
      var xOffset = 0;
      var yOffset = 0;

      container.addEventListener("touchstart", dragStart, false);
      container.addEventListener("touchend", dragEnd, false);
      container.addEventListener("touchmove", drag, false);

      container.addEventListener("mousedown", dragStart, false);
      container.addEventListener("mouseup", dragEnd, false);
      container.addEventListener("mousemove", drag, false);

      function dragStart(e) {
        if (e.type === "touchstart") {
          initialX = e.touches[0].clientX - xOffset;
          initialY = e.touches[0].clientY - yOffset;
        } else {
          initialX = e.clientX - xOffset;
          initialY = e.clientY - yOffset;
        }

        if (e.target === dragItem) {
          active = true;
        }
      }

      function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;

        active = false;
      }

      function drag(e) {
        if (active) {
          e.preventDefault();

          if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
          } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
          }

          xOffset = currentX;
          yOffset = currentY;

          setTranslate(currentX, currentY, dragItem);
        }
      }

      function setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
      }
      $("#uniqueslider1").roundSlider({
        radius: 74.82,
        width: 5,
        handleSize: "+10",
        handleShape: "dot",
        sliderType: "min-range",
        value: 3,
        tooltipFormat: "tooltipVal1",
      });

      let alpha1 = document.getElementById("alphaa");
      let beta1 = document.getElementById("betaa");
      let gamma1 = document.getElementById("gammaa");

      alpha1.addEventListener("click", updatealpha);
      beta1.addEventListener("click", updatebeta);
      gamma1.addEventListener("click", updategamma);

      function updatealpha() {
        document.getElementById("uniqueslider").style.display = "none";
        document.getElementById("uniqueslider1").style.display = "block";
        document.getElementById("uniqueslider2").style.display = "none";
        document.getElementById("uniqueslider3").style.display = "none";
        this.classList.add("clicked");
        beta1.classList.remove("clicked");
        gamma1.classList.remove("clicked");
        $("#uniqueslider1").roundSlider({
          radius: 74.82,
          width: 5,
          handleSize: "+10",
          handleShape: "dot",
          sliderType: "min-range",
          value: 3,
          tooltipFormat: "tooltipVal1",
          drag: function (event) {
            // handle slider value changes here
            console.log("Slider value changed to:", event.value);
            o = event.value;
          },
        });
        document
          .getElementsByClassName("constantValues")[0]
          .classList.add("filling-button");
      }

      function updatebeta() {
        document.getElementById("uniqueslider").style.display = "none";
        document.getElementById("uniqueslider1").style.display = "none";
        document.getElementById("uniqueslider2").style.display = "block";
        document.getElementById("uniqueslider3").style.display = "none";
        this.classList.add("clicked");

        alpha1.classList.remove("clicked");
        gamma1.classList.remove("clicked");

        $("#uniqueslider2").roundSlider({
          radius: 74.82,
          width: 5,
          handleSize: "+10",
          handleShape: "dot",
          sliderType: "min-range",
          value: 3,
          tooltipFormat: "tooltipVal2",
          drag: function (event) {
            // handle slider value changes here
            console.log("Slider value changed to:", event.value);
            b = event.value;
          },
        });
      }

      function updategamma() {
        document.getElementById("uniqueslider").style.display = "none";
        document.getElementById("uniqueslider1").style.display = "none";
        document.getElementById("uniqueslider2").style.display = "none";
        document.getElementById("uniqueslider3").style.display = "block";

        this.classList.add("clicked");
        alpha1.classList.remove("clicked");
        beta1.classList.remove("clicked");
        $("#uniqueslider3").roundSlider({
          radius: 74.82,
          width: 5,
          handleSize: "+10",
          handleShape: "dot",
          sliderType: "min-range",
          value: 3,
          tooltipFormat: "tooltipVal3",
          drag: function (event) {
            // handle slider value changes here
            console.log("Slider value changed to:", event.value);
            p = event.value;
          },
        });
      }
      // Master DOManipulator v2 ------------------------------------------------------------
      const items = document.querySelectorAll(".carousel-item"),
        controls = document.querySelectorAll(".carousel-control"),
        headerItems = document.querySelectorAll(".item-header"),
        descriptionItems = document.querySelectorAll(".item-description"),
        activeDelay = 0.76,
        interval = 5000;

      let current = 0;

      const slider = {
        init: () => {
          controls.forEach((control) =>
            control.addEventListener("click", (e) => {
              slider.clickedControl(e);
            })
          );
          controls[current].classList.add("active");
          items[current].classList.add("active");
        },
        nextSlide: () => {
          // Increment current slide and add active class
          slider.reset();
          if (current === items.length - 1) current = -1; // Check if current slide is last in array
          current++;
          controls[current].classList.add("active");
          items[current].classList.add("active");
          slider.transitionDelay(headerItems);
          slider.transitionDelay(descriptionItems);
        },
        clickedControl: (e) => {
          // Add active class to clicked control and corresponding slide
          slider.reset();
          clearInterval(intervalF);

          const control = e.target,
            dataIndex = Number(control.dataset.index);

          control.classList.add("active");
          items.forEach((item, index) => {
            if (index === dataIndex) {
              // Add active class to corresponding slide
              item.classList.add("active");
            }
          });
          current = dataIndex; // Update current slide
          slider.transitionDelay(headerItems);
          slider.transitionDelay(descriptionItems);
          intervalF = setInterval(slider.nextSlide, interval); // Fire that bad boi back up
        },
        reset: () => {
          // Remove active classes
          items.forEach((item) => item.classList.remove("active"));
          controls.forEach((control) => control.classList.remove("active"));
        },
        transitionDelay: (items) => {
          // Set incrementing css transition-delay for .item-header & .item-description, .vertical-part, b elements
          let seconds;

          items.forEach((item) => {
            const children = item.childNodes; // .vertical-part(s)
            let count = 1,
              delay;

            item.classList.value === "item-header"
              ? (seconds = 0.015)
              : (seconds = 0.007);

            children.forEach((child) => {
              // iterate through .vertical-part(s) and style b element
              if (child.classList) {
                item.parentNode.classList.contains("active")
                  ? (delay = count * seconds + activeDelay)
                  : (delay = count * seconds);
                child.firstElementChild.style.transitionDelay = `${delay}s`; // b element
                count++;
              }
            });
          });
        },
      };

      let intervalF = setInterval(slider.nextSlide, interval);
      slider.init();
    }, myRef.current);
  }, []);


  return (
    <div id="lorenzAttractorContent">
      <EquationNav />
      <div className="AttractorMain">
        <div id="#text-container"></div>
        <div className="i-button">
          <div id="curious">Curious to know what it is?</div>
          <div className="btn">
            <button id="displayContentlargescreen">i</button>
          </div>
        </div>
        <div className="slider1Container">
          <div className="sliderContainer">
            <div id="slider1">
              <h1>alpha</h1>
            </div>

            <div id="slider3">
              <h1>beta</h1>
            </div>
            <div id="slider2">
              <h1>gamma</h1>
            </div>
            <div className="moreInfoalphaBeta">
              <div className="moreInfoalphaBetaCircle">
                <div className="contentAlpha">
                  An alpha ,beta values influences the behaviour of a system,
                  like a dial controlling the balance between predictable
                  patterns and randomness. By changing these alpha,beta value,
                  one can study how the system's behavior changes under
                  different settings.
                </div>
                <button id="skip">Skip</button>
                <div></div>
              </div>
            </div>
          </div>
          <div className="picker">
            <div className="colorPicker">
              <input
                type="range"
                id="colorPicker"
                min="0"
                max="100"
                step="1"
                value="0"
              />
              <div id="colorPreview"></div>
            </div>
          </div>
        </div>
      </div>
      <div id="outerContainer">
        <div id="container">
          <div id="item">
            <i
              className="fa fa-gear"
              id="icon"
              style={{
                fontSize: "36px",
                color: "#3ABECB",
              }}
            ></i>
            <div id="x">X</div>
          </div>
        </div>
      </div>
      <div className="valueContainer1">
        <div className="valueContainer">
          <div className="sliderBlock1">
            <div className="sblock1" id="uniqueslider"></div>
            <div className="sblock1" id="uniqueslider1"></div>
            <div className="sblock1" id="uniqueslider2"></div>
            <div className="sblock1" id="uniqueslider3"></div>
            <div className="sblock1 ">
              <div className="constantValues " id="alphaa">
                <div className="constantcircle">
                  <div className="constantcircle1">α</div>
                </div>
                <div id="alpha"></div>
              </div>
              <div className="constantValues" id="betaa">
                <div className="constantcircle">
                  <div className="constantcircle1"> β</div>
                </div>
                <div id="beta"></div>
              </div>
              <div className="constantValues" id="gammaa">
                <div className="constantcircle">
                  <div className="constantcircle1"> γ</div>
                </div>
                <div id="gamma"></div>
              </div>
            </div>
          </div>
          <div className="sliderBlock2"></div>
          <div className="picker1">
            <div className="colorPicker1">
              <input
                type="range"
                id="colorPicker1"
                min="0"
                max="100"
                step="1"
                value="0"
              />
              <div id="colorPreview1"></div>
            </div>
          </div>
        </div>

        <div></div>
      </div>
      <div id="content">
        <div id="innerContent">
          <div className="displayN displayns">
            <div className="carousel">
              <div className="carousel-inner">
                <input
                  className="carousel-open"
                  type="radio"
                  id="carousel-1"
                  name="carousel"
                  aria-hidden="true"
                  hidden=""
                  checked="checked"
                />
                <div className="carousel-item">
                  <h1>Astrophysics</h1>
                  <div className="IMAGE">
                    <img src="nasa-rTZW4f02zY8-unsplash.jpg" />
                  </div>
                  <div>
                    <p>
                      Galaxies and Cosmic structures show factral patterns,used
                      to model the universe's large scale structure
                    </p>
                  </div>
                  <div className="displaynoneforlargerscreen" id="factral">
                    Fractal art is a form of digital art that utilizes
                    mathematical algorithms to create self-similar patterns and
                    structures.
                  </div>
                </div>
                <input
                  className="carousel-open"
                  type="radio"
                  id="carousel-2"
                  name="carousel"
                  aria-hidden="true"
                  hidden=""
                />
                <div className="carousel-item">
                  <h1>Ocean Current</h1>
                  <div className="IMAGE">
                    <img src="pexels-pixabay-462162.jpg" />
                  </div>
                  <div>
                    <p>
                      The Ocean current analysis predicts the complex oceanic
                      movement,imapacting climatic and marine life
                    </p>
                  </div>
                  <div className="displaynoneforlargerscreen" id="factral">
                    Fractal art is a form of digital art that utilizes
                    mathematical algorithms to create self-similar patterns and
                    structures.
                  </div>
                </div>
                <input
                  className="carousel-open"
                  type="radio"
                  id="carousel-3"
                  name="carousel"
                  aria-hidden="true"
                  hidden=""
                />
                <div className="carousel-item">
                  <h1>Medical</h1>
                  <div className="IMAGE">
                    <img src="pexels-vidal-balielo-jr-1250655.jpg" />
                  </div>
                  <div>
                    <p>
                      The Ocean current analysis predicts the complex oceanic
                      movement,imapacting climatic and marine life
                    </p>
                  </div>
                  <div className="displaynoneforlargerscreen" id="factral">
                    Fractal art is a form of digital art that utilizes
                    mathematical algorithms to create self-similar patterns and
                    structures.
                  </div>
                </div>
                <label
                  for="carousel-3"
                  className="carousel-control prev control-1"
                  id="arrowbutton"
                >
                  ‹
                </label>
                <label
                  for="carousel-2"
                  className="carousel-control next control-1"
                  id="arrowbutton"
                >
                  ›
                </label>
                <label
                  for="carousel-1"
                  className="carousel-control prev control-2"
                  id="arrowbutton"
                >
                  ‹
                </label>
                <label
                  for="carousel-3"
                  className="carousel-control next control-2"
                  id="arrowbutton"
                >
                  ›
                </label>
                <label
                  for="carousel-2"
                  className="carousel-control prev control-3"
                  id="arrowbutton"
                >
                  ‹
                </label>
                <label
                  for="carousel-1"
                  className="carousel-control next control-3"
                  id="arrowbutton"
                >
                  ›
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="text-container">
        <div></div>
      </div>

      <div id="moreInfo1">
        <div className="buttons">
          <div>
            <button id="backwardButton">&larr;</button>
          </div>
          <div id="moreInfo"></div>
          <div>
            <button id="forwardBackword">&rarr;</button>
          </div>
        </div>
        <div className="moreInfo"></div>
      </div>
      <div className="moreInfoalphaBetaphone">
        <div className="moreInfoalphaBetaCirclephone">
          <div className="contentAlpha">
            An alpha ,beta values influences the behaviour of a system, like a
            dial controlling the balance between predictable patterns and
            randomness. By changing these alpha,beta value, one can study how
            the system's behavior changes under different settings.
          </div>
          <button id="skipphone">Skip</button>
          <div></div>
        </div>
      </div>
    </div>
  );
}
