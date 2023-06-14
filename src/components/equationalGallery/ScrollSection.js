import React from 'react';
import { Element } from 'react-scroll';

const ScrollSection = ({ name, image, children, opacity }) => (
  <div className="section">
    <Element name={name}>
      <div className="background" style={{ backgroundImage: `url(${image})`, opacity }} />
      <div className="content">{children}</div>
    </Element>
  </div>
);

export default ScrollSection;
