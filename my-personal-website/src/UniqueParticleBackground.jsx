import React, { useRef, useEffect } from 'react';

const UniqueParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1500;
        this.size = Math.random() * 3 + 0.5;
        this.speed = Math.random() * 0.5 + 0.2;
        this.brightness = Math.random() * 0.5 + 0.5;
 thisla200 + Math.random() * 40}, 90%, 85%, ${this.brightness})`;
      }

      update() {
        this.z -= this.speed * 2;
        this.brightness += Math.sin(Date.now() * 0.001) * 0.008;

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

    const starCount = isMobile ? 50 : 150;
    const shootingStarCount = isMobile ? 1 : 2;

    const stars = Array(starCount).fill().map(() => new Star());
    const shootingStars = Array(shootingStarCount).fill().map(() => new ShootingStar());
    let time = 0;

    const animate = () => {
      time += 0.016;
      ctx.fillStyle = 'rgb(10, 10, 10)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        const pos = star.update();
        if (pos.x >= 0 && pos.x <= canvas.width && pos.y >= 0 && pos.y <= canvas.height) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, pos.size, 0, Math.PI * 2);
          ctx.fillStyle = pos.color;
          ctx.shadowBlur = pos.size * 3;
          ctx.shadowColor = pos.color;
          ctx.globalAlpha = pos.alpha;
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 0;
        }
      });

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
          ctx.lineWidth = 2;
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