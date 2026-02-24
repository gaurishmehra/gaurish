import React, { useEffect, useRef } from 'react';

const MouseTrail = () => {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const trailLength = 20;
    pointsRef.current = Array(trailLength).fill({ x: 0, y: 0 });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pointsRef.current.unshift({ ...mouseRef.current });
      pointsRef.current.pop();

      for (let i = 0; i < pointsRef.current.length - 1; i++) {
        const point = pointsRef.current[i];
        const nextPoint = pointsRef.current[i + 1];
        
        const opacity = (1 - i / pointsRef.current.length) * 0.5;
        const size = (1 - i / pointsRef.current.length) * 3;

        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 180, 200, ${opacity})`;
        ctx.fill();

        if (nextPoint.x !== 0 && nextPoint.y !== 0) {
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
          ctx.strokeStyle = `rgba(232, 180, 200, ${opacity * 0.3})`;
          ctx.lineWidth = size * 0.5;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-30 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default MouseTrail;
