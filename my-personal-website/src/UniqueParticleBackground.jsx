import React, { useRef, useEffect } from 'react';

const UniqueParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Device detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
      || window.innerWidth < 768;
    
    // Adjust parameters based on device
    const particleCount = isMobile ? 75 : 150;  // 50% reduction for mobile
    const shootingStarCount = isMobile ? 1 : 2;
    const baseParticleSize = isMobile ? 2 : 3;
    const particleSpeed = isMobile ? 0.15 : 0.2; // Slower on mobile

    const setCanvasSize = () => {
      // Use device pixel ratio for sharper rendering
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // Scale canvas CSS size
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      // Scale context to match device pixel ratio
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();

    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1500;
        this.size = Math.random() * baseParticleSize + 0.5;
        this.speed = Math.random() * 0.3 + particleSpeed;
        this.brightness = Math.random() * 0.5 + 0.5;
        this.color = `hsla(${200 + Math.random() * 40}, 90%, 85%, ${this.brightness})`;
      }

      update() {
        this.z -= this.speed * 2;
        // Reduce pulsing intensity on mobile
        this.brightness += Math.sin(Date.now() * 0.001) * (isMobile ? 0.004 : 0.008);

        if (this.z <= 0) {
          this.reset();
          this.z = 1500;
        }

        const k = 100;
        const px = (this.x - canvas.width / 2) * (k / this.z) + canvas.width / 2;
        const py = (this.y - canvas.height / 2) * (k / this.z) + canvas.height / 2;
        const pz = this.size * (1 - this.z / 1500);

        return {
          x: px,
          y: py,
          size: Math.max(0.1, pz),
          alpha: this.brightness * (1 - this.z / 1500),
          color: this.color
        };
      }
    }

    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        // Shorter trails on mobile
        this.length = Math.random() * (isMobile ? 40 : 80) + 20;
        this.speed = Math.random() * (isMobile ? 7 : 10) + 5;
        this.angle = Math.random() * 45 + 20;
        this.opacity = 0;
        this.fadeInTime = 50;
        this.fadeOutTime = 100;
        this.life = 0;
        // Shorter life span on mobile
        this.totalLife = Math.random() * (isMobile ? 150 : 200) + 150;
      }

      update() {
        this.life++;
        
        if (this.life < this.fadeInTime) {
          this.opacity = this.life / this.fadeInTime;
        } else if (this.life > this.totalLife - this.fadeOutTime) {
          this.opacity = (this.totalLife - this.life) / this.fadeOutTime;
        } else {
          this.opacity = 1;
        }

        this.x += Math.cos(this.angle * Math.PI / 180) * this.speed;
        this.y += Math.sin(this.angle * Math.PI / 180) * this.speed;

        if (this.life >= this.totalLife) {
          this.reset();
        }

        return {
          x: this.x,
          y: this.y,
          length: this.length,
          opacity: this.opacity,
          angle: this.angle
        };
      }
    }

    const stars = Array(particleCount).fill().map(() => new Star());
    const shootingStars = Array(shootingStarCount).fill().map(() => new ShootingStar());
    
    // Use requestAnimationFrame timestamp for smoother animation
    let lastTime = 0;
    const animate = (timestamp) => {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      // Skip frame if too soon (throttle to ~60fps)
      if (deltaTime < 16) {
        requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = 'rgb(10, 10, 10)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Batch similar operations to reduce state changes
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // Regular stars
      stars.forEach(star => {
        const pos = star.update();
        if (pos.x >= 0 && pos.x <= canvas.width && pos.y >= 0 && pos.y <= canvas.height) {
          ctx.beginPath();
          ctx.fillStyle = pos.color;
          ctx.shadowBlur = isMobile ? pos.size * 2 : pos.size * 3;
          ctx.shadowColor = pos.color;
          ctx.globalAlpha = pos.alpha;
          ctx.arc(pos.x, pos.y, pos.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Reset shadow effects for better performance
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // Shooting stars
      shootingStars.forEach(star => {
        const pos = star.update();
        if (pos.opacity > 0) {
          ctx.beginPath();
          const gradient = ctx.createLinearGradient(
            pos.x, pos.y,
            pos.x - pos.length * Math.cos(pos.angle * Math.PI / 180),
            pos.y - pos.length * Math.sin(pos.angle * Math.PI / 180)
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${pos.opacity})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = isMobile ? 1 : 2;
          ctx.moveTo(pos.x, pos.y);
          ctx.lineTo(
            pos.x - pos.length * Math.cos(pos.angle * Math.PI / 180),
            pos.y - pos.length * Math.sin(pos.angle * Math.PI / 180)
          );
          ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    };

    animate(0);

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0"
      style={{ touchAction: 'none' }} // Prevents unwanted touch behaviors
    />
  );
};

export default UniqueParticleBackground;