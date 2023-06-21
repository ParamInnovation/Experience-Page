import React, { useState, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';

const Section = forwardRef(({ className, setImage, image, index, text, setText, link, id }, ref) => {
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
    <div className={className} id={id} ref={ref} style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <h2>
        <Link to={link}>{text}</Link>
      </h2>
    </div>
  );
});

export default Section;
   

  