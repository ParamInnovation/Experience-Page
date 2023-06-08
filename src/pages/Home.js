import React from "react";
import Content from "../components/experienceHome/Content";
import ParamNavbar from "../components/Navbar";
import "./Home.css"

export default function Home() {
  return (
    <div className="superContainer">
      <ParamNavbar />
      <Content />
    </div>
  );
}
