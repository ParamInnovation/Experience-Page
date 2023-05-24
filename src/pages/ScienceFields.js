import React, { useEffect } from "react";

export default function ScienceFields() {
  useEffect(() => {
    window.scrollTo(0, 0);
    var screenWidth = window.innerWidth;

    var navLinks = document.querySelectorAll(".side-nav ul li a");
    var desktop = document.getElementsByClassName("desktop")[0];
    var mobile = document.getElementsByClassName("mobile")[0];
    let navColors = [
      "#AD7B10",
      "#AD7B10",
      "#4E6D6E",
      "#4E5F33",
      "#7D2B05",
      "#6F2700",
      "#012443",
      "#B1CC81",
      "#981F0E",
      "#233730",
      "#74B3BC",
      "#CD8D5D",
      "#F74521",
      "#643C25",
      "#A5A885",
    ];
    if (screenWidth > 450) {
      mobile.classList.remove("active-section");
      desktop.classList.add("active-section");
    } else {
      mobile.classList.add("active-section");
      desktop.classList.remove("active-section");
    }

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        if (current) {
          current[0].className = current[0].className.replace(" active", "");
        }
        this.className += " active";
      });
    });

    window.onload = function () {
      changeActiveNav();
    };

    // JavaScript
    window.onscroll = function () {
      changeActiveNav();
    };

    function changeActiveNav() {
      let sections, nav_links, index;
      const activeSection = document.querySelector(".active-section");
      if (activeSection){
        sections = activeSection.querySelectorAll(".sContainer > div");     
        nav_links = document.querySelectorAll(".side-nav ul li a");
        index = sections.length;   
      }

      while (
        --index &&
        window.scrollY + window.innerHeight / 2 < sections[index].offsetTop
      ) {}

      if(nav_links){
        nav_links.forEach((link) => {
          link.classList.remove("active");
          // Change the color of all links
          link.style.backgroundColor = navColors[index];
          // Also change the color of <p> elements within the links
          let pElement = link.querySelector('.side-nav ul li a p');
          if (pElement) {
              pElement.style.color = navColors[index];
          }
        });
        nav_links[index].classList.add("active");
      }
    }
  }, []);

  return (
    <div>
      <div className="top-nav">
        <ul>
          <li id="logo">
            <a href="#logo"></a>
          </li>
          <li>
            <a href="http://paraminnovation.org/">Home</a>
          </li>
        </ul>
      </div>
      <div className="welcome">
        <div id="dSwipe"></div>
      </div>
      <div className="desktop">
        <div className="sContainer">
          <div id="first" className="first background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="second" className="second background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="third" className="third background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="fourth" className="fourth background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="fifth" className="fifth background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="sixth" className="sixth background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="seventh" className="seventh background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="eight" className="eight background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="ninth" className="ninth background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="tenth" className="tenth background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="eleventh" className="eleventh background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="twelfth" className="twelfth background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div
            id="thirteenth"
            className="thirteenth background"
            data-speed="0.5"
          >
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div
            id="fourtheenth"
            className="fourtheenth background"
            data-speed="0.5"
          >
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="fifteenth" className="fifteenth background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="side-nav">
          <ul>
            <li>
              <a href="#first">
                <p>Aeronautics</p>
              </a>
            </li>
            <li>
              <a href="#second">
                <p>Anatomy</p>
              </a>
            </li>
            <li>
              <a href="#third">
                <p>Botany</p>
              </a>
            </li>
            <li>
              <a href="#fourth">
                <p>Mechanics</p>
              </a>
            </li>
            <li>
              <a href="#fifth">
                <p>Geography</p>
              </a>
            </li>
            <li>
              <a href="#sixth">
                <p>Mineralogy</p>
              </a>
            </li>
            <li>
              <a href="#seventh">
                <p>Physics</p>
              </a>
            </li>
            <li>
              <a href="#eight">
                <p>Forestry</p>
              </a>
            </li>
            <li>
              <a href="#ninth">
                <p>Medicine</p>
              </a>
            </li>
            <li>
              <a href="#tenth">
                <p>Paleontology</p>
              </a>
            </li>
            <li>
              <a href="#eleventh">
                <p>Robotics</p>
              </a>
            </li>
            <li>
              <a href="#twelfth">
                <p>Accoustics</p>
              </a>
            </li>
            <li>
              <a href="#thirteenth">
                <p>Volcanology</p>
              </a>
            </li>
            <li>
              <a href="#fourtheenth">
                <p>Mining</p>
              </a>
            </li>
            <li>
              <a href="#fifteenth">
                <p>Archaeology</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mobile">
        <div className="sContainer">
          <div id="first" className="first background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="second" className="second background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="third" className="third background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="fourth" className="fourth background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="fifth" className="fifth background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="sixth" className="sixth background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="seventh" className="seventh background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="eight" className="eight background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="ninth" className="ninth background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="tenth" className="tenth background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="eleventh" className="eleventh background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="twelfth" className="twelfth background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div
            id="thirteenth"
            className="thirteenth background"
            data-speed="0.5"
          >
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div
            id="fourtheenth"
            className="fourtheenth background"
            data-speed="0.5"
          >
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="fifteenth" className="fifteenth background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
