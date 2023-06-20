import React, { useState, useEffect, forwardRef } from 'react';

const Section = forwardRef(({ setImage, image, index, text, setText, link, id }, ref) => {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setImage(image);
        setText(text);
      }
    }, { threshold: 0.7 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, setImage, setText, image, text]);
  
  return (
    <div id={id} ref={ref} style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <h2 style={{ position: 'absolute', top: '50%', color: 'white', textShadow: '2px 2px 4px #000000' }}>
        <a href={link}>{text}</a>
      </h2>
    </div>
  );
});

export default Section;
   

  