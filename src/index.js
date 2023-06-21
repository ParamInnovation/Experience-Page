import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ReactDOM from "react-dom";
import Home from "./pages/Home/Home";
import ScienceFields from "./pages/ScienceFields/ScienceFields";
import { ElementGames } from "./pages/ElementGames/ElementGames";
import SpaceGame from "./pages/ElementGames/SpaceGame/SpaceGame";
import FireGame from "./pages/ElementGames/FireGame/FireGame";
import AirGame from "./pages/ElementGames/AirGame/AirGame";
import WaterGame from "./pages/ElementGames/WaterGame/WaterGame";
import EarthGame from "./pages/ElementGames/EarthGame/EarthGame";
import EquationGallery from "./pages/EquationGallery/EquationGallery";
import Desmos from "./pages/EquationGallery/Desmos/Desmos";


function App() {
  const location = useLocation();

  return (
    <React.Fragment key={location.pathname}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fields-of-science" element={<ScienceFields />} />
        <Route path="/gaming-zone" element={<ElementGames />} />
        <Route path="/space-game" element={<SpaceGame />} />
        <Route path="/fire-game" element={<FireGame />} />
        <Route path="/air-game" element={<AirGame />} />
        <Route path="/water-game" element={<WaterGame />} />
        <Route path="/earth-game" element={<EarthGame />} />
        <Route path="/equational-gallery" element={<EquationGallery />} />
        <Route path="/desmos" element={<Desmos />} />
        <Route path="/Harmonograph" element={<EquationGallery />} />
        <Route path="/Attractors" element={<EquationGallery />} />
        <Route path="/weights-on-planets" element={<EquationGallery />} />
      </Routes>
    </React.Fragment>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
