import React from "react";
import { Link } from "react-router-dom";

export default function Content() {
  return (
    <div className="expContainer">
      <div className="expImg">
        <div className="expTag">
          <h1>Experience the exciting world</h1>
          <p>
            Welcome to our immersive experience page, where you can explore the
            exciting world of Indian minds, virtual zones, and science games and
            many more!
          </p>
        </div>
      </div>
      <div className="cardsContainer">
        <div className="cardHolder">
          <div>
            <div id="indianMinds" className="cardDisplay"></div>
            <div className="buttonContainer">
              <a
                href="https://paraminnovation.org/indian-minds/"
                className="button"
              >
                Indian Minds
              </a>
            </div>
          </div>
          <div>
            <div id="virtualZone" className="cardDisplay"></div>
            <div className="buttonContainer">
              <a
                href="https://paraminnovation.org/virtual-zone/"
                className="button"
              >
                Virtual Zone
              </a>
            </div>
          </div>
          <div>
            <div id="gamingZone" className="cardDisplay"></div>
            <div className="buttonContainer">
              <Link to="/gaming-zone" className="button">
                Gaming Zone
              </Link>
            </div>
          </div>
          <div>
            <div id="rangolify" className="cardDisplay"></div>
            <div className="buttonContainer">
              <a
                href="https://paraminnovation.org/rangolify/"
                className="button"
              >
                Rangolify
              </a>
            </div>
          </div>
          <div>
            <div id="curaspace" className="cardDisplay"></div>
            <div className="buttonContainer">
              <a
                href="https://paraminnovation.org/curaspace/"
                className="button"
              >
                Curaspace
              </a>
            </div>
          </div>
          <div>
            <div id="fos" className="cardDisplay"></div>
            <div className="buttonContainer">
              <Link to="/fields-of-science" className="button">
                Fields of Science
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
