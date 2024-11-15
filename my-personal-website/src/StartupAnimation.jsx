import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Latex from 'react-latex';
import UniqueParticleBackground from './UniqueParticleBackground';

const matrixEffect = (text) => {
  const characters = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  let result = '';
  const textLength = text.length;
  for (let i = 0; i < textLength; i++) {
    if (Math.random() > 0.7) {
      result += characters[Math.floor(Math.random() * characters.length)];
    } else {
      result += text[i];
    }
  }
  return result;
};

const StartupAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showName, setShowName] = useState(false);
  const [decryptedText, setDecryptedText] = useState('');
  const [isExiting, setIsExiting] = useState(false);
  const [matrixText, setMatrixText] = useState('');

  const equations = useMemo(() => [
    '\\int_0^\\infty e^{-x^2} dx',
    'u = x^2, du = 2x dx',
    '\\frac{1}{2} \\int_0^\\infty e^{-u} \\frac{du}{\\sqrt{u}}',
    '\\frac{1}{2} \\Gamma(\\frac{1}{2})',
    '\\frac{1}{2} \\sqrt{\\pi}',
    '\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}',
    'Q.E.D. \\blacksquare'
  ], []);

  const crypticChars = useMemo(() => '!@#$%^&*()_+-=[]{}|;:,.<>?', []);

  useEffect(() => {
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
              onComplete();
            }, 500); // Show name for 1 second before starting exit
          }, 1); // Delay name reveal
          return prev;
        }
        return prev + 1;
      });
    }, 4000); // Time between steps

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [equations.length, onComplete]);

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

  useEffect(() => {
    let interval;
    if (progress < 100) {
      interval = setInterval(() => {
        setMatrixText(matrixEffect('INITIALIZING SYSTEM...'));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [progress]);

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

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 1,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
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
      className="fixed inset-0 z-50 bg-transparent flex flex-col justify-center items-center overflow-hidden"
    >
      <UniqueParticleBackground />
      <div className="z-10 text-white text-2xl mb-8 h-40 flex flex-col justify-center items-center">
        <motion.div
          className="text-green-500 font-mono text-sm mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {matrixText}
        </motion.div>
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