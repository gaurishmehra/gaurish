import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MouseTrail = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const numSegments = 10;
  const [trail, setTrail] = useState(Array(numSegments).fill({ x: -100, y: -100 }));
  const positionsRef = useRef(Array(numSegments).fill({ x: -100, y: -100 }));

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const handleMouseMove = (e) => {
      positionsRef.current[0] = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    let animationFrameId;
    const updateTrail = () => {
      for (let i = 1; i < numSegments; i++) {
        const prev = positionsRef.current[i - 1];
        const curr = positionsRef.current[i];
        positionsRef.current[i] = {
          x: curr.x + (prev.x - curr.x) * 0.2,
          y: curr.y + (prev.y - curr.y) * 0.2,
        };
      }
      setTrail([...positionsRef.current]);
      animationFrameId = requestAnimationFrame(updateTrail);
    };
    animationFrameId = requestAnimationFrame(updateTrail);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDesktop, numSegments]);

  if (!isDesktop) return null;

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-0">
      {trail.map((pos, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: pos.x,
            top: pos.y,
            width: `${20 - index * 1.5}px`,
            height: `${20 - index * 1.5}px`,
            background: 'radial-gradient(circle, rgba(255,0,150,1) 0%, rgba(0,0,255,1) 100%)',
            filter: 'blur(2px)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />
      ))}
    </div>
  );
};

export default MouseTrail;