import React from "react";
import { Link } from "react-router-dom";

export default function EquationNav() {
  return (
    <div>
      <div className="nav">
        <div id="logo">
          <a href="http://paraminnovation.org/"></a>
        </div>
        <div>
          <p>
            <Link to="/equational-gallery">
              <i class="fa-solid fa-arrow-left"></i>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
