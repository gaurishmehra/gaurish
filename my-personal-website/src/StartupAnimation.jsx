import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UniqueParticleBackground from './UniqueParticleBackground';

const StartupAnimation = ({ onComplete }) => {
  // Timeline stages: "expand" → galaxy expands from nothing,
  // "explode" → galaxy explodes and stars burst out,
  // "done" → animation complete.
  const [stage, setStage] = useState('expand');
  const [stars, setStars] = useState([]);

  // Transition from "expand" to "explode" after expansion is complete.
  useEffect(() => {
    if (stage === 'expand') {
      const timer = setTimeout(() => {
        setStage('explode');
      }, 1500); // 1.5s expansion duration
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // When the explosion begins, generate 400 stars with random trajectories.
  useEffect(() => {
    if (stage === 'explode') {
      const starCount = 400;
      const newStars = [];
      // Use the screen diagonal to determine an off-screen endpoint.
      const diagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
      const minDistance = diagonal / 2;
      const maxDistance = diagonal;
      for (let i = 0; i < starCount; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const distance = minDistance + Math.random() * (maxDistance - minDistance);
        newStars.push({ id: i, angle, distance });
      }
      setStars(newStars);

      // After the explosion animation completes, mark the animation as done.
      const finishTimer = setTimeout(() => {
        setStage('done');
        if (onComplete) onComplete();
      }, 2000); // Explosion duration
      return () => clearTimeout(finishTimer);
    }
  }, [stage, onComplete]);

  // Galaxy variants for the central element.
  const galaxyVariants = {
    expand: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: 'easeOut' }
    },
    explode: {
      scale: 6,
      opacity: 0,
      transition: { duration: 2, ease: 'easeOut' }
    }
  };

  // Each star starts at the center (x: 0, y: 0) and animates outward.
  const starVariants = (finalX, finalY) => ({
    initial: { x: 0, y: 0, opacity: 1 },
    animate: { 
      x: finalX, 
      y: finalY, 
      opacity: 0, 
      transition: { duration: 2, ease: 'easeOut' } 
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center overflow-hidden bg-black">
      {/* Dynamic background for added depth */}
      <UniqueParticleBackground />

      <AnimatePresence>
        {/* Render the galaxy element until stage becomes "done" */}
        {stage !== 'done' && (
          <motion.div
            className="absolute"
            variants={galaxyVariants}
            initial={{ scale: 0, opacity: 0 }}
            animate={stage === 'explode' ? 'explode' : 'expand'}
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: `radial-gradient(
                circle at 50% 50%, 
                #ff66cc 0%, 
                #a044ff 40%, 
                #1d2b64 70%, 
                transparent 100%
              )`,
              boxShadow: '0 0 40px rgba(255, 200, 255, 0.8)',
              filter: 'blur(1px)',
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* Render stars only during the explosion phase */}
        {stage === 'explode' &&
          stars.map((star) => {
            // Calculate each star's final position.
            const finalX = star.distance * Math.cos(star.angle);
            const finalY = star.distance * Math.sin(star.angle);
            return (
              <motion.div
                key={star.id}
                className="absolute rounded-full bg-white"
                style={{ width: 2, height: 2 }}
                variants={starVariants(finalX, finalY)}
                initial="initial"
                animate="animate"
              />
            );
          })}
      </AnimatePresence>
    </div>
  );
};

export default StartupAnimation;
