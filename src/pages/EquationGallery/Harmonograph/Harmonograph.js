import React from "react";
import { useEffect, useState } from "react";
import $ from "jquery";
import "round-slider";
import "round-slider/dist/roundslider.min.css";

import "./Harmonograph.css";
import EquationNav from "../EquationNav";

export default function Harmonograph() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //------------------------------------------
  // var isDragging = false;
  // var previousMousePosition = { x: 0, y: 0 };
  // var rotationAngle = 0;
  //------------------------------------------
  useEffect(() => {
    var gr = null;
    graph = document.getElementById("harmonograph");
    // console.log(graph);
    gr = graph.getContext("2d");

    //------------------------------------------
    // var isDragging = false;
    // var previousMousePosition = { x: 0, y: 0 };
    // var rotationAngle = 0;
    //------------------------------------------

    let screenWidth;

    let presetsVisible = false;
    var color;
    let timerId;
    let ball = false;
    let content = false;
    var s = 1;
    var x = 0.0,
      y = 0.0;
    var t = 0.0,
      dt = 0.001;
    var a1x = 100,
      a1y = 100,
      p1x = 0,
      p1y = 90,
      f1 = 1,
      td1 = 180;
    var a2x = 100,
      a2y = 100,
      p2x = 90,
      p2y = 0,
      f2 = 1,
      td2 = 180;
    var a3x = 100,
      a3y = 100,
      p3x = 0,
      p3y = 0,
      f3 = 1,
      td3 = 80;
    var R = 400.0;
    var Ax = 0.0,
      Ay = R,
      Bx = R,
      By = 0.0;
    var Cx, Cy, Dx, Dy, Px, Py, Ex, Ey;
    var graph, gr, scene, sc;
    var intId = window.setInterval(step, 1000 * dt);
    var ns,
      setns = 100000;
    var vis1 = true,
      vis2 = true;

    var dragItem = document.getElementById("harmonoitem");
    // console.log(dragItem);
    var container = document.getElementById("harmonocontainer");
    var active = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;

    const colorPicker = document.querySelector("#harmonocolorPicker");
    const colorPreview = document.querySelector("#harmonocolorPreview");

    const colorPicker1 = document.querySelector("#harmonocolorPicker1");
    const colorPreview1 = document.querySelector("#harmonocolorPreview1");

    var stsp = document.getElementById("harmonostSp");

    var pend1Freq = document.getElementById("harmonopend1Freq");
    var pend1 = document.getElementById("harmonopend1");
    var sliderPend1 = document.getElementById("harmonouniqueslider1");

    var pend2Freq = document.getElementById("harmonopend2Freq");
    var pend2 = document.getElementById("harmonopend2");
    var sliderPend2 = document.getElementById("harmonouniqueslider2");

    var pend3Freq = document.getElementById("harmonopend3Freq");
    var pend3 = document.getElementById("harmonopend3");
    var sliderPend3 = document.getElementById("harmonouniqueslider3");

    pend1Freq.innerHTML = f1 + "Hz";
    pend2Freq.innerHTML = f2 + "Hz";
    pend3Freq.innerHTML = f3 + "Hz";

    scene = document.getElementById("harmonoscene");
    sc = scene.getContext("2d");

    function changeColor() {
      // console.log("harmonoClicked");
      gr.strokeStyle = "hsl(230, 100%, 38%)";
    }

    function init() {
      $("#harmonofrequencySlider1").roundSlider("setValue", 1);
      $("#harmonofrequencySlider2").roundSlider("setValue", 1);
      $("#harmonofrequencySlider3").roundSlider("setValue", 1);
      $("#harmonouniqueslider1").roundSlider("setValue", 1);
      $("#harmonouniqueslider2").roundSlider("setValue", 1);
      $("#harmonouniqueslider3").roundSlider("setValue", 1);
      graph = document.getElementById("harmonograph");
      gr = graph.getContext("2d");
      gr.setTransform(2, 0, 0, -2, 490, 390);
      gr.rotate(0.7854);
      gr.clearRect(-490, -390, graph.width, graph.height);
      gr.strokeStyle = "hsl(44, 98%, 62%)"; // Visual data color
      gr.lineWidth = 0.5;
      gr.globalAlpha = 0.8;
      scene = document.getElementById("harmonoscene");
      sc = scene.getContext("2d");
      sc.setTransform(0.25, 0, 0, -0.25, 150, 180);
      sc.rotate(0.7854);
      sc.clearRect(-560, -560, scene.width * 4, scene.height * 4);
      sc.fillStyle = "rgba(37, 36, 36 ,0.8)"; // Center Pendulum circle color
      sc.lineWidth = 4;
      sc.globalAlpha = 0.8;
      t = 0.0;
      ns = setns;
      inputChange();
      swing();
    }

    function step() {
      gr.beginPath();
      gr.moveTo(x, y);
      for (var i = 0; i < s; ++i) {
        t += dt;
        swing();
        gr.lineTo(x, y);

        gr.stroke();
        sc.clearRect(-680, -680, 1600, 1600);
        sc.strokeStyle = "#999966"; // Pendulums cover box color
        sc.strokeRect(Ax - 80, By - 80, Bx - Ax + 160, Ay - By + 160);
        sc.beginPath();
        sc.arc(Ax, Ay, 10, 0, 6.2832);
        sc.stroke();
        sc.beginPath();
        sc.arc(Bx, By, 10, 0, 6.2832);
        sc.stroke();
        sc.beginPath();
        sc.arc(Ax, By, 10, 0, 6.2832);
        sc.stroke();
        sc.beginPath();
        sc.arc(Ex, Ey, 200, 0, 6.2832);
        sc.fill();
        sc.stroke();
        sc.beginPath();
        sc.moveTo(Ax, By);
        sc.lineTo(Ex, Ey);
        sc.stroke();
        sc.strokeStyle = "#fdca3f"; // Pendulum movements visuals color
        sc.beginPath();
        sc.moveTo(Ax, Ay);
        sc.lineTo(Cx, Cy);
        sc.lineTo(Px, Py);
        sc.lineTo(Dx, Dy);
        sc.lineTo(Bx, By);
        sc.stroke();
        ns -= 1;
        if (ns <= 0) {
          window.clearInterval(intId);
        }
      }

      //-------------------
      //gr.restore();
      //-------------------
    }

    function swing() {
      var x1 =
        a1x * Math.exp(-t / td1) * Math.sin(2.0 * Math.PI * f1 * t + p1x);
      var y1 =
        a1y * Math.exp(-t / td1) * Math.sin(2.0 * Math.PI * f1 * t + p1y);
      var x2 =
        a2x * Math.exp(-t / td2) * Math.sin(2.0 * Math.PI * f2 * t + p2x);
      var y2 =
        a2y * Math.exp(-t / td2) * Math.sin(2.0 * Math.PI * f2 * t + p2y);
      var x3 =
        a3x * Math.exp(-t / td3) * Math.sin(2.0 * Math.PI * f3 * t + p3x);
      var y3 =
        a3y * Math.exp(-t / td3) * Math.sin(2.0 * Math.PI * f3 * t + p3y);
      var CD = Math.sqrt(Math.pow(R + x2 - x1, 2) + Math.pow(R + y1 - y2, 2));
      var gamma = Math.acos(CD / (2 * R)) - Math.acos((R + y1 - y2) / CD);
      Px = x1 - R * Math.sin(gamma);
      Py = R + y1 - R * Math.cos(gamma);
      x = Px - x3;
      y = Py - y3;
      Cx = x1;
      Cy = R + y1;
      Dx = R + x2;
      Dy = y2;
      Ex = x3;
      Ey = y3;
    }

    function startStop() {
      if (intId == null) {
        intId = window.setInterval(step, 1000 * dt);
        stsp.innerHTML = "Pause";
      } else {
        window.clearInterval(intId);
        intId = null;
        stsp.innerHTML = "Run";
      }
    }

    stsp.addEventListener("click", function () {
      // Update the speed and display it

      // Clear previous timer if any
      if (timerId) {
        clearTimeout(timerId);
      }

      // Set the timer
      timerId = setTimeout(function () {
        // Hide the speed display after 2 seconds
        let spfxElement = document.getElementById("spfx");
        if (spfxElement) {
          spfxElement.style.display = "none";
        }
      }, 2000);
    });

    function speed() {
      clearTimeout(timerId);
      let buttonP = document.querySelector(".harmonobutton-17 #harmonospeed");

      // document.getElementById('spfx').style.display = '';
      s = s * 2;
      if (s > 128) {
        s = 1;
      }
      buttonP.innerText = s + "x";
      if (timerId) {
        clearTimeout(timerId);
      }

      // Set the timer
      timerId = setTimeout(function () {
        // Hide the speed display after 2 seconds
        // document.getElementById('spfx').style.display = 'none';
        buttonP.innerText = "Speed";
      }, 2000);
    }

    function showSettings() {
      if (vis1) {
        document.getElementById("harmonosettings").style.visibility = "hidden";
        vis1 = false;
      } else {
        document.getElementById("harmonosettings").style.visibility = "visible";
        vis1 = true;
      }
    }
    function showScene() {
      if (vis2) {
        document.getElementById("harmonotopview").style.visibility = "hidden";
        vis2 = false;
      } else {
        document.getElementById("harmonotopview").style.visibility = "visible";
        vis2 = true;
      }
    }

    function save() {
      let canvas = document.getElementById("harmonograph"); // Replace with your canvas id
      let dataURL = canvas.toDataURL("image/png");
      let a = document.createElement("a");
      a.href = dataURL;
      a.download = "harmonograph.png";
      a.click();
    }

    function showPresets() {
      screenWidth = window.innerWidth;
      var presetDiv = document.getElementById("harmonopresets");
      if (presetsVisible) {
        if (screenWidth < 330 && screenWidth > 259) {
          presetDiv.style.animation =
            "slide-down320 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards";
          presetsVisible = false;
        } else {
          presetDiv.style.animation =
            "slide-down 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards";
          presetsVisible = false;
        }
      } else {
        if (screenWidth < 330 && screenWidth > 259) {
          presetDiv.style.display = "flex";
          presetDiv.style.animation =
            "slide-up320 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards";
          presetsVisible = true;
        } else {
          presetDiv.style.display = "flex";
          presetDiv.style.animation =
            "slide-up 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards";
          presetsVisible = true;
        }
      }
    }

    function hidePresets() {
      screenWidth = window.innerWidth;
      var presetDiv = document.getElementById("harmonopresets");
      if (screenWidth < 330 && screenWidth > 259) {
        presetDiv.style.animation =
          "slide-down320 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards";
        presetsVisible = false;
      } else {
        presetDiv.style.animation =
          "slide-down 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards";
        presetsVisible = false;
      }
    }

    function read(id) {
      var input = document.getElementById(id);
      var value = input.value;
      var f = parseFloat(value);
      if (isNaN(f)) {
        input.className = "error";
      } else {
        input.className = "";
      }
      return f;
    }

    function inputChange() {
      a1x = read("a1x");
      a1y = read("a1y");
      p1x = (read("p1x") / 180.0) * Math.PI;
      p1y = (read("p1y") / 180.0) * Math.PI;
      f1 = read("f1");
      td1 = read("td1");
      a2x = read("a2x");
      a2y = read("a2y");
      p2x = (read("p2x") / 180.0) * Math.PI;
      p2y = (read("p2y") / 180.0) * Math.PI;
      f2 = read("f2");
      td2 = read("td2");
      a3x = read("a3x");
      a3y = read("a3y");
      p3x = (read("p3x") / 180.0) * Math.PI;
      p3y = (read("p3y") / 180.0) * Math.PI;
      f3 = read("f3");
      td3 = read("td3");
    }

    colorPicker.addEventListener("input", function () {
      colorPicker.value = this.value;
      const hue = this.value;
      color = `hsl(${hue}, 98%, 62%)`;
      colorPreview.style.backgroundColor = color;
      gr.strokeStyle = color;
    });

    colorPicker1.addEventListener("input", function () {
      colorPicker1.value = this.value;
      const hue = this.value;
      color = `hsl(${hue}, 98%, 62%)`;
      colorPreview1.style.backgroundColor = color;
      gr.strokeStyle = color;
    });

    $(document).ready(function () {
      function changeTooltipFormat(args) {
        return args.value + " Hz";
      }

      $("#harmonofrequencySlider1").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        handleSize: "+10",
        width: 5,
        radius: 74.82,
        value: 1,
        min: 0,
        max: 999,
        step: 1,
        tooltipFormat: "changeFreqA",
        change: function (args) {
          // console.log("Frequency 1: " + args.value); // This is just for testing. Replace this with your logic.
          f1 = args.value;
        },
      });

      $("#harmonofrequencySlider2").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        handleSize: "+10",
        width: 5,
        radius: 74.82,
        value: 1,
        min: 0,
        max: 999,
        step: 1,
        tooltipFormat: "changeFreqB",
        change: function (args) {
          // console.log("Frequency 2: " + args.value); // This is just for testing. Replace this with your logic.
          f2 = args.value;
        },
      });

      $("#harmonofrequencySlider3").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        handleSize: "+10",
        width: 5,
        radius: 74.82,
        value: 1,
        min: 0,
        max: 999,
        step: 1,
        tooltipFormat: "changeFreqC",
        change: function (args) {
          // console.log("Frequency 3: " + args.value); // This is just for testing. Replace this with your logic.
          f3 = args.value;
        },
      });
    });

    //Draggable settings button
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
    //----------------------------------

    function displayvlueContainer() {
      ball = !ball;
      if (ball == true) {
        document.getElementsByClassName(
          "harmonovalueContainer"
        )[0].style.display = "block";
        // document.getElementById("content").style.display = "none";
        document.getElementById("harmonoicon").style.display = "none";
        document.getElementById("harmonox").style.display = "block";
      } else {
        document.getElementsByClassName(
          "harmonovalueContainer"
        )[0].style.display = "none";
        document.getElementById("harmonoicon").style.display = "block";
        document.getElementById("harmonox").style.display = "none";
      }
    }

    //-----------------------------------------
    $("#harmonouniqueslider1").roundSlider({
      radius: 74.82,
      width: 5,
      handleSize: "+10",
      handleShape: "dot",
      sliderType: "min-range",
      value: 1,
      min: 0,
      max: 999,
      step: 1,
      tooltipFormat: "tooltipVal1",
      drag: function (event) {
        // handle slider value changes here

        f1 = event.value;

        document.getElementById("harmonopend1Freq").innerHTML = f1 + "Hz";
      },
      change: function (event) {
        // handle slider value changes here

        f1 = event.value;

        document.getElementById("harmonopend1Freq").innerHTML = f1 + "Hz";
      },
    });

    $("#harmonouniqueslider2").roundSlider({
      radius: 74.82,
      width: 5,
      handleSize: "+10",
      handleShape: "dot",
      sliderType: "min-range",
      value: 1,
      min: 0,
      max: 999,
      step: 1,
      tooltipFormat: "tooltipVal2",
      drag: function (event) {
        // handle slider value changes here
        // console.log("Slider value changed to:", event.value);
        f2 = event.value;

        document.getElementById("harmonopend2Freq").innerHTML = f2 + "Hz";
      },
      change: function (event) {
        // handle slider value changes here
        // console.log("Slider value changed to:", event.value);
        f2 = event.value;

        document.getElementById("harmonopend2Freq").innerHTML = f2 + "Hz";
      },
    });

    $("#harmonouniqueslider3").roundSlider({
      radius: 74.82,
      width: 5,
      handleSize: "+10",
      handleShape: "dot",
      sliderType: "min-range",
      value: 1,
      min: 0,
      max: 999,
      step: 1,
      tooltipFormat: "tooltipVal3",
      drag: function (event) {
        // handle slider value changes here
        // console.log("Slider value changed to:", event.value);
        f3 = event.value;

        document.getElementById("harmonopend3Freq").innerHTML = f3 + "Hz";
      },
      change: function (event) {
        // handle slider value changes here
        // console.log("Slider value changed to:", event.value);
        f3 = event.value;

        document.getElementById("harmonopend3Freq").innerHTML = f3 + "Hz";
      },
    });

    // Function for updating the mobile slider values

    function tooltipVal1() {
      if (f1 == undefined) {
        var val = "Freq" + " " + 1 + "Hz";
      }
      if (f1 != undefined) {
        var val = "Freq" + " " + parseInt(f1) + "Hz";
      }
      return val;
    }
    function tooltipVal2() {
      if (f2 == undefined) {
        var val = "Freq" + " " + 1 + "Hz";
      }
      if (f2 != undefined) {
        var val = "Freq" + " " + parseInt(f2) + "Hz";
      }
      return val;
    }
    function tooltipVal3() {
      if (f3 == undefined) {
        var val = "Freq" + " " + 1 + "Hz";
      }
      if (f3 != undefined) {
        var val = "Freq" + " " + parseInt(f3) + "Hz";
      }
      return val;
    }

    //For mobile view
    function updatePend1() {
      sliderPend1.style.display = "block";
      sliderPend2.style.display = "none";
      sliderPend3.style.display = "none";

      pend1.classList.add("harmono");
      pend2.classList.remove("harmonoclicked");
      pend3.classList.remove("harmonoclicked");
    }
    function updatePend2() {
      sliderPend1.style.display = "none";
      sliderPend2.style.display = "block";
      sliderPend3.style.display = "none";

      pend1.classList.remove("harmonoclicked");
      pend2.classList.add("harmonoclicked");
      pend3.classList.remove("harmonoclicked");
    }
    function updatePend3() {
      sliderPend1.style.display = "none";
      sliderPend2.style.display = "none";
      sliderPend3.style.display = "block";

      pend1.classList.remove("harmonoclicked");
      pend2.classList.remove("harmonoclicked");
      pend3.classList.add("harmonoclicked");
    }

    function loadPreset(a, b, c, t) {
      // console.log("preset harmonoclicked");
      if (stsp.innerHTML == "Pause") {
        startStop();
      }
      init();
      gr.strokeStyle = color;

      s = 1;
      $("#harmonofrequencySlider1").roundSlider("setValue", a);
      $("#harmonofrequencySlider2").roundSlider("setValue", b);
      $("#harmonofrequencySlider3").roundSlider("setValue", c);
      $("#harmonouniqueslider1").roundSlider("setValue", a);
      $("#harmonouniqueslider2").roundSlider("setValue", b);
      $("#harmonouniqueslider3").roundSlider("setValue", c);
      f1 = a;
      f2 = b;
      f3 = c;
      startStop();
      hidePresets();
      // console.log(t);
      setTimeout(startStop, t);
    }

    function updatedialog() {
      setIsDialogOpen(!isDialogOpen);
      document
        .getElementById("harmonoCloseDialogbox")
        .addEventListener("click", closeDialogbox);
    }
    function closeDialogbox() {
      setIsDialogOpen(false);
    }

    document.getElementById("a1x").addEventListener("change", inputChange);
    document.getElementById("a2x").addEventListener("change", inputChange);
    document.getElementById("a3x").addEventListener("change", inputChange);
    document.getElementById("a1y").addEventListener("change", inputChange);
    document.getElementById("a2y").addEventListener("change", inputChange);
    document.getElementById("a3y").addEventListener("change", inputChange);
    document
      .getElementById("harmonochangeColor")
      .addEventListener("click", changeColor);
    document
      .getElementById("harmonoitem")
      .addEventListener("click", displayvlueContainer);

    document
      .getElementById("harmonopend1")
      .addEventListener("click", updatePend1);
    document
      .getElementById("harmonopend2")
      .addEventListener("click", updatePend2);
    document
      .getElementById("harmonopend3")
      .addEventListener("click", updatePend3);

    document.getElementById("b-17").addEventListener("click", startStop);
    document.getElementById("b-18").addEventListener("click", init);
    document.getElementById("b-19").addEventListener("click", speed);

    document.getElementById("b-20").addEventListener("click", showPresets);

    document.getElementById("harmonodownload").addEventListener("click", save);

    document.getElementById("harmonopreset1").addEventListener("click", () => {
      loadPreset(515, 515, 515, 3000);
    });
    document.getElementById("harmonopreset2").addEventListener("click", () => {
      loadPreset(1, 1, 504, 2278);
    });

    document
      .getElementById("harmnoinfoButton")
      .addEventListener("click", updatedialog);

    init();
  }, []);

  return (
    <>
      <EquationNav />
      <div className="harmonographConatiner">
        <div className="infoButton" id="harmnoinfoButton">
          <i className="fa fa-info-circle"></i>
        </div>
        <h1 id="harmonochangeColor">HARMONOGRAPH</h1>
        {isDialogOpen && (
          <div className="dialog-container">
            <div className="dialog-box">
              <h2>Welcome to our Harmonograph Web Application!</h2>
              <p>
                Wondering what a Harmonograph is? It's an intriguing device that
                blends art, mathematics, and physics to create mesmerising
                designs. It's like a drawing machine, but with a special twist!
              </p>
              <p>
                Traditionally, a Harmonograph uses pendulums to create its
                drawings. These pendulums swing back and forth, each at its own
                pace, and as they move, they guide a pen across a sheet of
                paper. The combination of their movements results in stunning,
                often symmetrical, images.
              </p>
              <p>
                In our web application, you don't need any physical pendulums or
                paper. We've digitised the entire experience. You can create
                beautiful Harmonograph designs right here on your screen.
              </p>
              <p>Here's how to use it:</p>
              <h3>1. Setting the Pendulums:</h3>
              <p>
                You can adjust the speed and frequency of multiple "virtual
                pendulums" in our application. Each pendulum influences the
                motion of the drawing, adding complexity and beauty to the
                design.
              </p>
              <h3>2. Choosing Colours:</h3>
              <p>
                You can also select the colour of your lines, creating a visual
                masterpiece that's uniquely yours.
              </p>
              <h3>3. Saving and Sharing:</h3>
              <p>
                Once you've created a design you love, you can save it and share
                it with friends.
              </p>
              <h3>4. Learning More:</h3>
              <p>
                Interested in the maths and physics behind the scenes? Check out
                our 'Learn More' section for an easy-to-understand explanation
                of the science that makes your designs possible. Remember,
                there's no right or wrong way to create a Harmonograph design.
                It's all about exploration and having fun. So, start
                experimenting with different pendulum settings and colours, and
                see what amazing patterns you can create!
              </p>
              <button id="harmonoCloseDialogbox">Close</button>
            </div>
          </div>
        )}

        <div id="harmonoframe">
          <canvas id="harmonograph" width="980" height="780">
            {" "}
          </canvas>
          <div className="harmonosliders">
            <div className="harmonolable1">Pendulum A</div>
            <div id="harmonofrequencySlider1"></div>
            <div className="harmonolable1">Pendulum B</div>
            <div id="harmonofrequencySlider2"></div>
            <div className="harmonolable1">Pendulum C</div>
            <div id="harmonofrequencySlider3"></div>
          </div>
          <div id="harmonosettings">
            <form>
              <table>
                <tr className="harmonohead">
                  <td> </td>
                  <td>Pend A</td>
                  <td>Pend B</td>
                  <td>Pend C</td>
                </tr>
                <tr>
                  <td className="harmonolabel">&nbsp;Amplitude x</td>
                  <td>
                    <input id="a1x" value="100" />{" "}
                  </td>
                  <td>
                    <input id="a2x" value="100" />{" "}
                  </td>
                  <td>
                    <input id="a3x" value="100" />{" "}
                  </td>
                  <td>&nbsp;px</td>
                </tr>
                <tr>
                  <td className="harmonolabel">Amplitude y</td>
                  <td>
                    <input id="a1y" value="100" />{" "}
                  </td>
                  <td>
                    <input id="a2y" value="100" />{" "}
                  </td>
                  <td>
                    <input id="a3y" value="-100" />{" "}
                  </td>
                  <td>&nbsp;px</td>
                </tr>
                <tr>
                  <td className="harmonolabel">Phase x</td>
                  <td>
                    <input id="p1x" value="0" />{" "}
                  </td>
                  <td>
                    <input id="p2x" value="90" />{" "}
                  </td>
                  <td>
                    <input id="p3x" value="0" />{" "}
                  </td>
                  <td>&nbsp;&deg;</td>
                </tr>
                <tr>
                  <td className="harmonolabel">Phase y</td>
                  <td>
                    <input id="p1y" value="90" />{" "}
                  </td>
                  <td>
                    <input id="p2y" value="0" />{" "}
                  </td>
                  <td>
                    <input id="p3y" value="0" />{" "}
                  </td>
                  <td>&nbsp;&deg;</td>
                </tr>
                <tr>
                  <td className="harmonolabel">Damping</td>
                  <td>
                    <input id="td1" value="180" />{" "}
                  </td>
                  <td>
                    <input id="td2" value="180" />{" "}
                  </td>
                  <td>
                    <input id="td3" value="80" />{" "}
                  </td>
                  <td>&nbsp;s</td>
                </tr>
                <tr>
                  <td className="harmonolabel">Frequency</td>
                  <td>
                    <input id="f1" value="1" />{" "}
                  </td>
                  <td>
                    <input id="f2" value="0.98" />{" "}
                  </td>
                  <td>
                    <input id="f3" value="1" />{" "}
                  </td>
                  <td>&nbsp;Hz&nbsp;</td>
                </tr>
              </table>
            </form>
          </div>
        </div>
        <div id="harmonotopview" className="harmonotopview">
          <canvas id="harmonoscene" width="300" height="300"></canvas>
          <div className="harmonopicker">
            <div className="harmonocolorPicker">
              <input
                type="range"
                id="harmonocolorPicker"
                min="0"
                max="360"
                step="1"
                value="0"
              />
              <div id="harmonocolorPreview"></div>
            </div>
          </div>
        </div>
        <div id="harmonoouterContainer">
          <div id="harmonocontainer">
            <div id="harmonoitem">
              <i
                className="fa fa-gear"
                id="harmonoicon"
                style={{ fontSize: "36px", color: "#3ABECB" }}
              />
              <div id="harmonox">X</div>
            </div>
          </div>
        </div>
        <div className="harmonovalueContainer">
          <div className="harmonosliderBlock1">
            <div className="harmonosblock1" id="harmonouniqueslider1"></div>
            <div className="harmonosblock1" id="harmonouniqueslider2"></div>
            <div className="harmonosblock1" id="harmonouniqueslider3"></div>
            <div className="harmonosblock1 ">
              <div
                className="harmonoconstantValues harmonoclicked"
                id="harmonopend1"
              >
                <div className="harmonoconstantcircle">
                  <div className="harmonoconstantcircle1">A</div>
                </div>
                <div id="harmonopend1Freq"></div>
              </div>
              <div className="harmonoconstantValues" id="harmonopend2">
                <div className="harmonoconstantcircle">
                  <div className="harmonoconstantcircle1">B</div>
                </div>
                <div id="harmonopend2Freq"></div>
              </div>
              <div className="harmonoconstantValues" id="harmonopend3">
                <div className="harmonoconstantcircle">
                  <div className="harmonoconstantcircle1">C</div>
                </div>
                <div id="harmonopend3Freq"></div>
              </div>
            </div>
          </div>
          <div className="harmonopicker1">
            <div className="harmonocolorPicker1">
              <input
                type="range"
                id="harmonocolorPicker1"
                min="0"
                max="360"
                step="1"
                value="0"
              />
              <div id="harmonocolorPreview1"></div>
            </div>
          </div>
        </div>
        <div className="harmonobuttons">
          <button className="harmonobutton-17" id="b-17" role="button">
            <p id="harmonostSp">Pause</p>
          </button>
          <button className="harmonobutton-17" id="b-18" role="button">
            <p>Reset</p>
          </button>
          <button className="harmonobutton-17" id="b-19" role="button">
            <p id="harmonospeed">Speed</p>
          </button>
          <div className="harmonopresetContainer">
            <button className="harmonobutton-17" id="b-20" role="button">
              <p>Preset</p>
            </button>
            <div id="harmonopresets">
              <button className="harmonobutton-17" id="harmonopreset1">
                <p>PARAM</p>
              </button>
              <button className="harmonobutton-17" id="harmonopreset2">
                <p>DNA</p>
              </button>
            </div>
          </div>
          <button
            className="harmonobutton-17"
            id="harmonodownload"
            role="button"
          ></button>
        </div>
      </div>
    </>
  );
}
