import React from "react";
import EquationNav from "../EquationNav";
import GraphCalculator from "../../../components/equationalGallery/desmos/GraphCalculator";
import Content from "../../../components/equationalGallery/desmos/Content";
import Example from "../../../components/equationalGallery/desmos/Example";
import "./Desmos.css";

export default function Desmos() {
  return (
    <div id="desmosContainer">
      <EquationNav />
      <div className="desmosContentContainer">
        <div>
          <GraphCalculator />
        </div>
        <div>
          <Content />
        </div>
        <div>
          <Example />
        </div>
      </div>
    </div>
  );
}
