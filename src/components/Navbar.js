import React from "react";
import { Link } from "react-router-dom";

export default function ParamNavbar() {
  return (
    <div className="nav">
      <div id="logo">
        <a href="http://paraminnovation.org/"></a>
      </div>
      <div>
        <p>
          <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
}
