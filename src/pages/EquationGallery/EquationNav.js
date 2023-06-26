import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function EquationNav() {

  let navigate = useNavigate();

  

  return (
    <div>
      <div className="nav">
        <div id="logo">
          <a href="http://paraminnovation.org/"></a>
        </div>
        <div>
          <p>
            <a href="/equational-gallery">
            {/* <Link to="/equational-gallery"> */}
              <i class="fa-solid fa-arrow-left"></i>
            {/* </Link> */}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
