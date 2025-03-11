import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import UniqueParticleBackground from './UniqueParticleBackground';

const Background = ({ startupParticles }) => {
  useEffect(() => {
    if (startupParticles) {
      const mergeParticles = () => {};
      mergeParticles();
    }
  }, [startupParticles]);

  const generateShootingStars = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 1}s`,
      animationDelay: `${Math.random() * 5}s`,
      size: `${Math.random() * 3 + 1}px`,
      angle: Math.random() * 360
    }));
  };

  const galaxies = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 400 + 100}px`,
    color: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100}, ${Math.random() * 255}, 0.3)`,
    pulseDuration: `${Math.random() * 20 + 10}s`,
    rotationDuration: `${Math.random() * 200 + 100}s`,
  }));

  return (
    <>
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        {galaxies.map((galaxy) => (
          <motion.div
            key={galaxy.id}
            className="absolute rounded-full mix-blend-screen filter blur-sm"
            style={{
              top: galaxy.top,
              left: galaxy.left,
              width: galaxy.size,
              height: galaxy.size,
              backgroundColor: galaxy.color,
            }}
            initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
            animate={{ 
              opacity: [0.5, 0.8, 0.5], 
              scale: [1, 1.2, 1],
              rotate: 360
            }}
            transition={{ 
              opacity: { duration: parseFloat(galaxy.pulseDuration), repeat: Infinity },
              scale: { duration: parseFloat(galaxy.pulseDuration), repeat: Infinity },
              rotate: { duration: parseFloat(galaxy.rotationDuration), repeat: Infinity, ease: "linear" }
            }}
          />
        ))}
        {generateShootingStars(5).map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              transform: `rotate(${star.angle}deg)`
            }}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              x: `-${Math.cos(star.angle * Math.PI / 180) * 100}vw`,
              y: `${Math.sin(star.angle * Math.PI / 180) * 100}vh`
            }}
            transition={{ 
              duration: parseFloat(star.animationDuration),
              delay: parseFloat(star.animationDelay),
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      <UniqueParticleBackground />
    </>
  );
};

export default Background;