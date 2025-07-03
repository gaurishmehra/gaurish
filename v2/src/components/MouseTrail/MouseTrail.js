import React, { useEffect, useState, useCallback, useRef } from 'react';
import './MouseTrail.css';

const MouseTrailEnhanced = () => {
  const [particles, setParticles] = useState([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef();
  
  const maxParticles = 30;
  const particleTypes = ['dot', 'sparkle', 'comet'];

  const createParticle = useCallback((x, y) => {
    const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
    return {
      id: Date.now() + Math.random(),
      x,
      y,
      createdAt: Date.now(),
      size: type === 'sparkle' ? Math.random() * 4 + 3 : Math.random() * 6 + 2,
      opacity: 1,
      hue: Math.random() * 60 + 300, // Purple to pink range
      type,
      vx: (Math.random() - 0.5) * 2, // Small random velocity
      vy: (Math.random() - 0.5) * 2,
    };
  }, []);

  const updateMousePosition = useCallback((e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    
    // Only create particles when mouse is moving significantly
    const distance = Math.sqrt(
      Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2)
    );
    
    if (distance > 2) { // Only create particle if mouse moved more than 2px
      const newParticle = createParticle(e.clientX, e.clientY);
      
      setParticles(prevParticles => {
        const updatedParticles = [...prevParticles, newParticle];
        return updatedParticles.slice(-maxParticles);
      });
    }
  }, [createParticle]);

  const animate = useCallback(() => {
    const now = Date.now();
    
    setParticles(prevParticles => 
      prevParticles
        .map(particle => {
          const age = now - particle.createdAt;
          const lifeRatio = age / 1000; // 1 second lifetime
          
          return {
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            opacity: Math.max(0, 1 - lifeRatio),
            size: particle.size * (1 - lifeRatio * 0.3),
          };
        })
        .filter(particle => particle.opacity > 0.01)
    );
    
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => updateMousePosition(e);
    
    window.addEventListener('mousemove', handleMouseMove);
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updateMousePosition, animate]);

  return (
    <div className="mouse-trail-container">
      {particles.map(particle => (
        <div
          key={particle.id}
          className={`trail-particle ${particle.type}`}
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            background: `hsl(${particle.hue}, 80%, 65%)`,
            boxShadow: `0 0 ${particle.size * 2}px hsl(${particle.hue}, 80%, 65%)`,
          }}
        />
      ))}
    </div>
  );
};

export default MouseTrailEnhanced;