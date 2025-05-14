
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InteractiveElement = ({ children, type = 'bounce', className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Diferentes animaciones según el tipo
  const animations = {
    bounce: {
      initial: { y: 0 },
      hover: { y: -10, transition: { yoyo: Infinity, duration: 0.8 } }
    },
    pulse: {
      initial: { scale: 1 },
      hover: { scale: 1.05, transition: { yoyo: Infinity, duration: 0.8 } }
    },
    rotate: {
      initial: { rotate: 0 },
      hover: { rotate: 5, transition: { yoyo: Infinity, duration: 0.5 } }
    },
    shake: {
      initial: { x: 0 },
      hover: { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.6 } }
    }
  };
  
  const selectedAnimation = animations[type] || animations.bounce;
  
  return (
    <motion.div
      className={className}
      initial={selectedAnimation.initial}
      animate={isHovered ? selectedAnimation.hover : selectedAnimation.initial}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </motion.div>
  );
};

export default InteractiveElement;
