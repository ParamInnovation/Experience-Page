import React, { useEffect } from "react";
import ParamNavbar from "../../components/Navbar";
import Content from "../../components/equationalGallery/Content";

export default function EquationGallery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div id="equationGalleryContainer">
      <ParamNavbar />
      <Content />
    </div>
  );
}
