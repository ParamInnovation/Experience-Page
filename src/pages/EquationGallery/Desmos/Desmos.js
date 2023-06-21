import React from "react";
import EquationNav from "../EquationNav";
import GraphCalculator from "../../../components/equationalGallery/desmos/GraphCalculator";
import Content from "../../../components/equationalGallery/desmos/Content";
import Example from "../../../components/equationalGallery/desmos/Example";

export default function Desmos() {
  return (
    <div id="desmosContainer">
      <EquationNav />
      <GraphCalculator />
      <Content />
      <Example />
    </div>
  );
}
