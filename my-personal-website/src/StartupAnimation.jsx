import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Latex from 'react-latex';

const StartupAnimation = () => {
  const canvasRef = useRef(null);
  const controls = useAnimation();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showName, setShowName] = useState(false);
  const [decryptedText, setDecryptedText] = useState('');
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = this.getRandomColor();
      }

      getRandomColor() {
        const colors = [
          'rgba(255, 105, 180, 0.8)', // Hot pink
          'rgba(147, 112, 219, 0.8)', // Medium purple
          'rgba(138, 43, 226, 0.8)',  // Blue violet
          'rgba(75, 0, 130, 0.8)',    // Indigo
          'rgba(123, 104, 238, 0.8)'  // Medium slate blue
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.1) this.size -= 0.01;

        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.size <= 0.1) {
          particles.splice(index, 1);
          particles.push(new Particle());
        }
      });

      requestAnimationFrame(animate);
    };

    init();
    animate();

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10; // Slowed down progress even more
      });
    }, 100);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= equations.length - 1) {
          clearInterval(stepInterval);
          setTimeout(() => {
            setShowName(true);
            setTimeout(() => {
              setIsExiting(true);
              setTimeout(() => {
                controls.start('exit');
              }, 1000); // Wait 1 second after setting isExiting before starting exit animation
            }, 500); // Show name for 1 second before starting exit
          }, 1); // Delay name reveal
          return prev;
        }
        return prev + 1;
      });
    }, 4000); // Time between steps

    return () => {
      cancelAnimationFrame(animate);
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [controls]);

  const equations = [
    '\\int_0^\\infty e^{-x^2} dx',
    'u = x^2, du = 2x dx',
    '\\frac{1}{2} \\int_0^\\infty e^{-u} \\frac{du}{\\sqrt{u}}',
    '\\frac{1}{2} \\Gamma(\\frac{1}{2})',
    '\\frac{1}{2} \\sqrt{\\pi}',
    '\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}',
    'Q.E.D. \\blacksquare' // Added one more equation/step
  ];

  const crypticChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  const decryptText = (text, progress) => {
    const decrypted = text.split('').map((char, index) => {
      if (index < text.length * progress) {
        return char;
      } else {
        return crypticChars[Math.floor(Math.random() * crypticChars.length)];
      }
    }).join('');
    return decrypted;
  };

  useEffect(() => {
    let animationFrame;
    let startTime;
    const duration = 3000; // 3 seconds for decryption

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      setDecryptedText(decryptText(equations[currentStep], progress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [currentStep]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const equationVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const nameVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      } 
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-50 bg-black flex flex-col justify-center items-center overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="z-10 text-white text-2xl mb-8 h-40 flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          {!isExiting && (
            <motion.div
              key={currentStep}
              variants={equationVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center"
            >
              <Latex>{decryptedText}</Latex>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <AnimatePresence>
        {showName && (
          <motion.h1
            variants={nameVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-5xl font-bold mt-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500"
          >
            Gaurish Mehra
          </motion.h1>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StartupAnimation;