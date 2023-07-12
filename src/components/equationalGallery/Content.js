import React, { useState, useEffect, useRef } from "react";

import { animated } from "@react-spring/web";
import { useTransition } from "@react-spring/core";
import Fullpage, {
  FullPageSections,
  FullpageSection,
} from "@ap.cx/react-fullpage";
import "../../pages/EquationGallery/EquationGallery.css";
import image01 from "./public/desmos.png";
import image01back from "./public/desmosBack.png";
import image2 from "./public/harmono.png";
import image2back from "./public/harmonoBack.png";
import image3 from "./public/attractor.png";
import image3back from "./public/attractorBack.png";
import image4 from "./public/quiz.png";
import image4back from "./public/quizBack.png";

import Section from "./Section";

export default function Content() {
  const [bgImage, setBgImage] = useState("");

  const [backimg, setbackimg] = useState("");
  const [grad, setGred] = useState("");
  const [text, setText] = useState("");
  const [content, setContent] = useState("");
  const [heading, setHeading] = useState("");

  const sections = [
    {
      image: image01,
      backimage: image01back,
      text: "Start Calculating",
      position: "left",
      link: "/desmos",
      gradient: "linear-gradient(to right, #000000 0%, #3E3F3E 100%)",
      heading: "Mathscape",
      content:
        "An engaging platform blending art and math, perfect for designing unique graphs and exploring the beauty of mathematics.",
    },
    {
      image: image2,
      backimage: image2back,
      text: "Create Your Pattern",
      position: "right",
      link: "/harmonograph",
      gradient: "linear-gradient(to right, #38C5AD 0%,#1F199F 100%)",
      heading: "Harmonograph",
      content:
        "Experience captivating, interactive physics simulations with our Harmonograph: Create intricate designs inspired by the principles of harmonic motion.",
    },
    {
      image: image3,
      backimage: image3back,
      text: "Create Chaos",
      position: "right",
      link: "/attractors",
      gradient:
        "linear-gradient(to right, #091618 0%,#1C3F43 50%, #67C8C8  100%)",
      heading: "Attractors",
      content:
        "A captivating application that lets you experience the wonders of chaos theory through interactive and ever-changing visuals.",
    },
    {
      image: image4,
      backimage: image4back,
      text: "Test Your Knowledge",
      position: "left",
      link: "https://paraminnovation.org/equational-gallery-quiz/",
      gradient:
        "linear-gradient(89.7deg, rgb(0, 32, 95) 2.8%, rgb(132, 53, 142) 97.8%)",
      heading: "Quiz",
      content:
        "Challenge your understanding of the concepts explored in the other apps with our Quiz. An engaging, interactive way to test and reinforce your learning.",
    },
  ];
  const sectionRefs = sections.map(() => React.createRef());
  const transitions = useTransition(text, {
    from: { opacity: 0, transform: "translate3d(0, -1005%, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(0, -500%, 0)" },
    config: { duration: 0 },
  });

  const sectionStyle = {
    height: "100vh",
  };

  return (
    <>
      {transitions((style, item) => (
        <animated.div
          className="fixed"
          style={{
            height: "100vh",
            width: "100%",
            position: "fixed",
            // backgroundImage: `url(${bgImage})`,
            background: grad,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            ...style,
          }}
        ></animated.div>
      ))}
      <div className="fullPageSection">
        {sections.map((section, index) => (
          <Section
            key={index}
            className="fullPageSections"
            setgrad={setGred}
            setImage={setBgImage}
            setbackimage={setbackimg}
            image={section.image}
            grad={section.gradient}
            backimage={section.backimage}
            index={index}
            text={section.text}
            setText={setText}
            link={section.link}
            id={`section${index}`}
            ref={sectionRefs[index]}
            setcontent={setContent}
            content={section.content}
            setHeading={setHeading}
            heading={section.heading}
          />
        ))}
      </div>
    </>
  );
}
