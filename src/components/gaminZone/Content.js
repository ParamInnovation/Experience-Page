import React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

export default function Content() {
  const ref = useRef(null);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    $(".option").click(function () {
      $(".option").removeClass("active");
      $(this).addClass("active");
    });
  }, []);

  return (
    <>
      <div className="gmContainer">
        <div className="gmTag">
          <div className="heading">
            <h1>Elements of Science</h1>
          </div>
          <div className="para">
            <p>
              Immerse yourself in our five exciting games each representing the
              core elements of our vision.
            </p>
          </div>
          <div className="buttonContainer ExploreBtn">
            <a href="#content" className="button explore">
              <i class="fa-solid fa-arrow-down link"></i>
              Explore Games
            </a>
          </div>
        </div>
        <div className="gmImg"></div>
      </div>
      <div className="gmContainer2" id="content" ref={ref}>
        <div className="options">
          <div className="option active" id="prithvi">
            <div className="shadow"></div>
            <div className="label">
              <div className="icon">
                <i className="fa-solid fa-earth-africa"></i>
              </div>
              <div className="info">
                <div className="main">
                  <Link to="/earth-game" className="button gameLink">
                    <i class="fa-solid fa-link link"></i>
                    Earth
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="option" id="jala">
            <div className="shadow"></div>
            <div className="label">
              <div className="icon">
                <i className="fas fa-tint"></i>
              </div>
              <div className="info">
                <div className="main">
                  <Link to="/water-game" className="button gameLink">
                    <i class="fa-solid fa-link link"></i>
                    Water
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="option" id="tejas">
            <div className="shadow"></div>
            <div className="label">
              <div className="icon">
                {/* <i className="fas fa-snowflake"></i> */}
                <i className="fa-solid fa-fire"></i>
              </div>
              <div className="info">
                <div className="main">
                  <Link to="/fire-game" className="button gameLink">
                    <i class="fa-solid fa-link link"></i>
                    Fire
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="option" id="vayu">
            <div className="shadow"></div>
            <div className="label">
              <div className="icon">
                <i className="fa-solid fa-wind"></i>
              </div>
              <div className="info">
                <div className="main">
                  <Link to="/air-game" className="button gameLink">
                    <i class="fa-solid fa-link link"></i>
                    Air
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="option" id="akash">
            <div className="shadow"></div>
            <div className="label">
              <div className="icon">
                <i className="fa-solid fa-rocket"></i>
              </div>
              <div className="info">
                <div className="main">
                  <Link to="/space-game" className="button gameLink">
                    <i class="fa-solid fa-link link"></i>
                    Space
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
