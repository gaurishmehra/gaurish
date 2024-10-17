// MouseGalaxy.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MouseGalaxy = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 blur-xl mix-blend-screen z-10"
      style={{
        left: mousePosition.x - 12, // Adjust offset for centering
        top: mousePosition.y - 12,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

export default MouseGalaxy;