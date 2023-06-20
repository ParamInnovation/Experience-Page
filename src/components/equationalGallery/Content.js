import React, { useState, useEffect, useRef } from "react";
import { animated } from "@react-spring/web";
import { useTransition } from "@react-spring/core";
import Fullpage, {
  FullPageSections,
  FullpageSection,
} from "@ap.cx/react-fullpage";
import "../../pages/EquationGallery/EquationGallery.css";
import image1 from "./public/Desmos.PNG";
import image2 from "./public/Harmonograph.png";
import image3 from "./public/Lorenz_Attractor.PNG";
import image4 from "./public/Weight_on_Planets.PNG";

import Section from "./Section";

export default function Content() {
  const [bgImage, setBgImage] = useState("");
  const [text, setText] = useState("");

  const sections = [
    { image: image1, text: "Desmos", position: "left", link: "/Run" },
    { image: image2, text: "Harmonograph", position: "right", link: "/about" },
    { image: image3, text: "Attractors", position: "right", link: "/services" },
    {
      image: image4,
      text: "Weights On Other Planets",
      position: "left",
      link: "/contact",
    },
  ];
  const sectionRefs = sections.map(() => React.createRef());
  const transitions = useTransition(text, {
    from: { opacity: 0, transform: "translate3d(0, -1005%, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(0, -500%, 0)" },
    config: { duration: -300 },
  });

  const sectionStyle = {
    height: '100vh',
  }

  return (
    <>
      {transitions((style, item) => (
        <animated.div
          className="fixed"
          style={{
            height: "100vh",
            width: "100%",
            position: "fixed",
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            ...style,
          }}
        />
      ))}
      <Fullpage>
        <FullPageSections>
          {sections.map((section, index) => (
            <FullpageSection key={index} style={sectionStyle}>
              <Section
                setImage={setBgImage}
                image={section.image}
                index={index}
                text={section.text}
                setText={setText}
                link={section.link}
                id={`section${index}`}
                ref={sectionRefs[index]}
              />
            </FullpageSection>
          ))}
        </FullPageSections>
      </Fullpage>
    </>
  );
}
