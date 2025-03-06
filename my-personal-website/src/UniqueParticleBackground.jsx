import React, { useRef, useEffect } from 'react';

const UniqueParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Device detection for performance
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Star class simulating a 3D star field without trails
    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1500 + 1; // avoid zero for perspective math
        this.size = Math.random() * 2 + 1;
        this.speed = Math.random() * 0.5 + 0.5; // faster base speed for more intensity
        this.brightness = Math.random() * 0.5 + 0.5;
        this.color = `hsla(${200 + Math.random() * 40}, 90%, 85%, ${this.brightness})`;
      }

      update() {
        const perspective = canvas.width / 2;
        this.z -= this.speed * 10;
        if (this.z < 1) {
          this.reset();
          this.z = 1500;
          return null;
        }
        const newX =
          (this.x - canvas.width / 2) * (perspective / this.z) +
          canvas.width / 2;
        const newY =
          (this.y - canvas.height / 2) * (perspective / this.z) +
          canvas.height / 2;
        const newSize = this.size * (1 - this.z / 1500);
        const newAlpha = this.brightness * (1 - this.z / 1500);
        return { x: newX, y: newY, size: newSize, alpha: newAlpha, color: this.color };
      }
    }

    // Shooting star class remains unchanged for an extra burst of motion
    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.length = Math.random() * 80 + 20;
        this.speed = Math.random() * 10 + 5;
        this.angle = Math.random() * 45 + 20;
        this.opacity = 0;
        this.fadeInTime = 50;
        this.fadeOutTime = 100;
        this.life = 0;
        this.totalLife = Math.random() * 200 + 200;
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
        this.x += Math.cos((this.angle * Math.PI) / 180) * this.speed;
        this.y += Math.sin((this.angle * Math.PI) / 180) * this.speed;
        if (this.life >= this.totalLife) {
          this.reset();
        }
        return {
          x: this.x,
          y: this.y,
          length: this.length,
          opacity: this.opacity,
          angle: this.angle,
        };
      }
    }

    // Increase the number of stars and shooting stars for an immersive tunnel
    const starCount = isMobile ? 50 : 500;
    const shootingStarCount = isMobile ? 3 : 8;

    const stars = Array(starCount).fill().map(() => new Star());
    const shootingStars = Array(shootingStarCount).fill().map(() => new ShootingStar());

    const animate = () => {
      // Fully clear the canvas each frame so no trails persist
      ctx.fillStyle = 'rgb(10, 10, 10)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars as dots
      stars.forEach((star) => {
        const pos = star.update();
        if (pos) {
          ctx.globalAlpha = pos.alpha;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, pos.size, 0, Math.PI * 2);
          ctx.fillStyle = pos.color;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });

      // Draw shooting stars as bright, dynamic streaks
      shootingStars.forEach((star) => {
        const pos = star.update();
        if (pos.opacity > 0) {
          ctx.beginPath();
          const gradient = ctx.createLinearGradient(
            pos.x,
            pos.y,
            pos.x - pos.length * Math.cos((pos.angle * Math.PI) / 180),
            pos.y - pos.length * Math.sin((pos.angle * Math.PI) / 180)
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${pos.opacity})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          ctx.moveTo(pos.x, pos.y);
          ctx.lineTo(
            pos.x - pos.length * Math.cos((pos.angle * Math.PI) / 180),
            pos.y - pos.length * Math.sin((pos.angle * Math.PI) / 180)
          );
          ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

export default UniqueParticleBackground;
