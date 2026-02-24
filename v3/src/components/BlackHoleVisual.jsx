import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const BlackHoleVisual = () => {
  const reduceMotion = useReducedMotion();
  const outerStarRef = useRef(null);
  const innerStarRef = useRef(null);

  useEffect(() => {
    const outerStar = outerStarRef.current;
    const innerStar = innerStarRef.current;
    if (!outerStar || !innerStar) return;

    const centerX = 50;
    const centerY = 50;
    const outerRadius = 34;
    const innerRadius = 22;

    const setStarPosition = (node, radius, angle) => {
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      node.setAttribute('cx', x.toFixed(3));
      node.setAttribute('cy', y.toFixed(3));
    };

    if (reduceMotion) {
      setStarPosition(outerStar, outerRadius, -Math.PI / 2);
      setStarPosition(innerStar, innerRadius, -Math.PI / 2);
      return;
    }

    let rafId = null;
    const start = performance.now();

    const animate = (now) => {
      const elapsed = (now - start) / 1000;
      const outerAngle = elapsed * ((Math.PI * 2) / 12) - Math.PI / 2;
      const innerAngle = elapsed * (-(Math.PI * 2) / 8) - Math.PI / 2;

      setStarPosition(outerStar, outerRadius, outerAngle);
      setStarPosition(innerStar, innerRadius, innerAngle);

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reduceMotion]);

  return (
    <div className="relative flex h-full w-full items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-[72%] w-auto max-h-full aspect-square overflow-visible" fill="none">
        <circle cx="50" cy="50" r="34" stroke="rgba(232,180,200,0.82)" strokeWidth="0.85" />
        <circle cx="50" cy="50" r="22" stroke="rgba(201,196,208,0.86)" strokeWidth="0.85" />

        <circle ref={outerStarRef} cx="50" cy="16" r="1.45" fill="#f5f0f8" />
        <circle ref={innerStarRef} cx="50" cy="28" r="1.25" fill="#e8b4c8" />
      </svg>
    </div>
  );
};

export default BlackHoleVisual;
