import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./pages/Home";
import ScienceFields from "./pages/ScienceFields";

function App() {
  const location = useLocation();

  return (
    <React.Fragment key={location.pathname}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fields-of-science" element={<ScienceFields />} />
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
