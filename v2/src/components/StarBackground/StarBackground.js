import React, { useEffect, useState } from 'react';
import './StarBackground.css';

const StarBackground = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check initially
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    // Adjust star count based on device type
    const starCount = isMobile ? 200 : 500;
    const starContainer = document.querySelector('.star-container');
    
    // Clear any existing stars
    while (starContainer.firstChild) {
      starContainer.removeChild(starContainer.firstChild);
    }
    
    // Create stars with optimized performance for mobile
    for (let i = 0; i < starCount; i++) {
      createStar(starContainer, isMobile);
    }
    
    // Function to create a star with proper animation
    function createStar(container, isMobile) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random angle for star trajectory
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 50 + 50; // How far the star will travel
      
      // Starting position - all stars start near center
      const startX = 50 + (Math.random() * 10 - 5);
      const startY = 50 + (Math.random() * 10 - 5);
      
      // Set start position
      star.style.left = `${startX}%`;
      star.style.top = `${startY}%`;
      
      // Calculate end position based on angle
      const endX = 50 + Math.cos(angle) * distance;
      const endY = 50 + Math.sin(angle) * distance;
      
      // Set direction attributes as custom properties
      star.style.setProperty('--end-x', `${endX}%`);
      star.style.setProperty('--end-y', `${endY}%`);
      
      // Speed varies based on device (faster on mobile for better effect)
      const speed = isMobile ? 
        (Math.random() * 3 + 2) : // Mobile: faster but in a smaller range
        (Math.random() * 4 + 2);  // Desktop: more varied
      star.style.setProperty('--speed', `${speed}s`);
      
      // Random delay - shorter on mobile for instant gratification
      const delay = isMobile ? 
        (Math.random() * 2) :     // Mobile: shorter delays
        (Math.random() * 5);      // Desktop: longer varied delays
      star.style.setProperty('--delay', `${delay}s`);
      
      // Random size - smaller on mobile for better performance
      const initialSize = isMobile ? 
        (Math.random() * 0.8 + 0.1) : // Mobile: smaller sizes
        (Math.random() * 1 + 0.1);    // Desktop: regular sizes
      star.style.setProperty('--initial-size', `${initialSize}px`);
      
      // Final size - also adjusted for mobile
      const finalSize = initialSize * (isMobile ? 
        (Math.random() * 2 + 1.5) :   // Mobile: less growth
        (Math.random() * 3 + 2));     // Desktop: more growth
      star.style.setProperty('--final-size', `${finalSize}px`);
      
      // Random brightness
      const opacity = Math.random() * 0.7 + 0.3;
      star.style.setProperty('--opacity', opacity);
      
      // Add streaking effect to some stars (reduced on mobile)
      if (!isMobile && Math.random() > 0.7) {
        const streakLength = Math.random() * 15 + 5;
        star.style.setProperty('--streak-length', `${streakLength}px`);
        star.classList.add('streaking');
      } else if (isMobile && Math.random() > 0.85) {
        // Fewer streaking stars on mobile, but with shorter streaks
        const streakLength = Math.random() * 8 + 3;
        star.style.setProperty('--streak-length', `${streakLength}px`);
        star.classList.add('streaking');
      }
      
      // Add pink tint to some stars (consistent across devices)
      if (Math.random() > 0.85) {
        star.classList.add('pink-tint');
      }
      
      // Set animation
      star.style.animation = `warpStarEffect var(--speed) linear var(--delay) infinite`;
      
      // Add will-change hint for better performance on mobile
      if (isMobile) {
        star.style.willChange = 'transform, opacity';
      }
      
      container.appendChild(star);
    }
    
    // Cleanup function
    return () => {
      while (starContainer.firstChild) {
        starContainer.removeChild(starContainer.firstChild);
      }
    };
  }, [isMobile]);

  return (
    <div className="stars-wrapper">
      <div className="star-container"></div>
    </div>
  );
};

export default StarBackground;