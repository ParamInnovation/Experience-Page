import React, { useEffect, useRef } from "react";
import { useState } from "react";

export default function GraphCalculator() {
  const calculatorRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [calculator, setCalculator] = useState(null);

  useEffect(() => {
    // Add the script to the document
    const script = document.createElement("script");
    script.src =
      "https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
    script.async = true;
    document.body.appendChild(script);

    // Wait for the script to load before initializing the calculator
    script.onload = () => {
      if (calculatorRef.current) {
        const calculator = window.Desmos.GraphingCalculator(
          calculatorRef.current
        );
        setCalculator(calculator);
        setIsLoaded(true);
      }
    };

    // Clean up on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleButtonClick = (event) => {
    if (calculator) {
        const expression = event.target.getAttribute("data-expression");
        calculator.setExpression({ id: "m", latex: expression });
    }
  };

  return (
    <div className="calculatorContainer">
      {!isLoaded && (
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <div
        id="calculator"
        ref={calculatorRef}
        style={{ width: "60%", height: "70%" }}
      />
      <button
        data-expression="r*\theta=600*\sqrt{(\cos(\theta*\pi/3))}"
        onClick={handleButtonClick}
      >
        Set Expression
      </button>
    </div>
  );
}
