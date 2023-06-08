import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ReactDOM from "react-dom";
import Home from "./pages/Home";
import ScienceFields from "./pages/ScienceFields";
import { ElementGames } from "./pages/ElementGames";
import SpaceGame from "./pages/ElementGames/SpaceGame";
import FireGame from "./pages/ElementGames/FireGame";
import AirGame from "./pages/ElementGames/AirGame";
import WaterGame from "./pages/ElementGames/WaterGame";
import EarthGame from "./pages/ElementGames/EarthGame";


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
