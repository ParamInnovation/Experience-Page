import React, { useState, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { animated } from "@react-spring/web";
import { useTransition } from "@react-spring/core";

const Section = forwardRef(({ className, setgrad, setImage, setbackimage, image, grad, backimage, index, text, setText, link, id, setcontent, content, setHeading, heading }, ref) => {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setImage(image);
        setbackimage(backimage)
        setgrad(grad)
        setText(text);
        setcontent(content)
        setHeading(heading)
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

  const isEven = index % 2 === 0;
  const transitions = useTransition(text, {
    from: { opacity: 0, transform: "translate3d(0, -1005%, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(0, -500%, 0)" },
    config: { duration: 0 },
  });


  return (
    <>
 
      <div className={`${className}`} id={id} ref={ref} style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: isEven ? 'row' : 'row-reverse', justifyContent: 'space-around' }}>
        <div className='contents'>
          <h1 style={{ color: "white" }}>{heading}</h1>
          <div className="paraContent" >

            <p className='contentPara'>{content}</p>
            <h2 className='h2'>

              <button className='button' style={{ background: grad, boxShadow: '0px 0px 1px 1px' }}> <Link to={link} > {text}</Link></button>
            </h2>
          </div>
        </div>
        <div className='fullpage box' id={id}>
          <div className="hover-point"></div>
          <div className="hover-point"></div>
          <div className="hover-point"></div>
          <div className="hover-point"></div>
          <div className="hover-point"></div>
          <div className="hover-point"></div>
          <div className="hover-point"></div>
          <div className="hover-point"></div>
          <img className='box-contents-back' src={backimage} alt={text} style={{ width: '75%', height: 'auto' }} />
          <img className='box-contents' src={image} alt={text} style={{ width: '80%', height: 'auto' }} />
        </div>
      </div>
    </>
  );
});

export default Section;

