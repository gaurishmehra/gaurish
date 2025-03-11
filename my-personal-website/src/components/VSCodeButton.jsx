import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

const VSCodeButton = ({ onClick }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <motion.button
      className={`fixed top-6 left-6 z-40 p-2 rounded-full shadow-lg backdrop-blur-sm ${
        isMobile 
          ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50" 
          : "bg-transparent hover:bg-[#FFFFFF]/50 text-white hover:text-black/80"
      }`}
      whileHover={isMobile ? {} : { scale: 1.1 }}
      whileTap={isMobile ? {} : { scale: 0.9 }}
      onClick={isMobile ? undefined : onClick}
      disabled={isMobile}
      aria-hidden={isMobile}
    >
      <Code size={24} />
    </motion.button>
  );
};

export default VSCodeButton;