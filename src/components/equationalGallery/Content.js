import React, { useEffect, useState } from "react";
import $ from "jquery";
import ScrollSection from "./ScrollSection";

export default function Content() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [opacities, setOpacities] = useState([1, 0, 0]);

  const handleScroll = (event) => {
    if (isScrolling) return;
    setIsScrolling(true);
    setTimeout(() => setIsScrolling(false), 1000); // Adjust this based on your scroll speed
    if (event.deltaY > 0) {
      setCurrentSection((prevSection) => Math.min(prevSection + 1, 2));
    } else {
      setCurrentSection((prevSection) => Math.max(prevSection - 1, 0));
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [isScrolling]);

  useEffect(() => {
    window.scrollTo({
      top: currentSection * window.innerHeight,
      behavior: "smooth",
    });
  }, [currentSection]);

  useEffect(() => {
    const newOpacities = opacities.map((_, i) => {
      if (i < currentSection) return 0;
      if (i === currentSection) return 1;
      return 0;
    });
    setOpacities(newOpacities);
  }, [currentSection]);

  return (
    <div className="equGalleryContent">
      <ScrollSection
        name="section1"
        image="https://img.freepik.com/free-vector/night-ocean-landscape-full-moon-stars-shine_107791-7397.jpg" opacity={opacities[0]}>
        <h1>Section 1</h1>
        <p>Content for section 1...</p>
      </ScrollSection>
      <ScrollSection
        name="section2"
        image="https://img.freepik.com/free-photo/india-flag-wrinkled-dark-background-3d-render_1379-583.jpg?size=626&ext=jpg&ga=GA1.2.942034155.1685687559&semt=sph" opacity={opacities[0]}>
        <h1>Section 2</h1>
        <p>Content for section 2...</p>
      </ScrollSection>
      <ScrollSection
        name="section3"
        image="https://img.freepik.com/free-photo/leafy-tree-branch-vibrant-autumn-colors-generated-by-ai_188544-10399.jpg?w=1380&t=st=1686656373~exp=1686656973~hmac=455ae80cbb772f27e032296c5aec8e5fe81c6bb043f9b72764d0649271e2cc2b" opacity={opacities[0]}>
        <h1>Section 3</h1>
        <p>Content for section 3...</p>
      </ScrollSection>
    </div>
  );
}
