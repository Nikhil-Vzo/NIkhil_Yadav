import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MagneticElement = ({ children, strength = 0.5, className = '', tag = 'div', style = {} }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring config for smooth push/pull
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    // Get mouse coordinates
    let clientX = e.clientX;
    let clientY = e.clientY;
    
    // Fallback for touch
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Find center of element
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance to move (pull towards cursor based on strength)
    const moveX = (clientX - centerX) * strength;
    const moveY = (clientY - centerY) * strength;
    
    x.set(moveX);
    y.set(moveY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // We wrap the children in a Framer Motion component
  const MotionComponent = motion[tag] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      className={`magnetic-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        ...style,
        x: springX,
        y: springY,
        display: 'inline-block' // Ensures transforms happen cleanly
      }}
    >
      {React.cloneElement(children, {
        // Optionally pass hover state down if children need it
        'data-magnetic-hover': isHovered
      })}
    </MotionComponent>
  );
};

export default MagneticElement;
