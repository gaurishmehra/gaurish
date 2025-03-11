import React from 'react';
import { motion } from 'framer-motion';

const Navigation = ({ currentSection, scrollToSection }) => {
  return (
    <div className="hidden md:block fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-50 backdrop-blur-sm bg-gray-900/10 rounded-full p-2">
      <div className="flex flex-col md:space-y-4 space-y-2">
        {['home', 'about', 'projects', 'thoughts', 'contact'].map((section) => (
          <motion.div
            key={section}
            className={`w-2 md:w-3 h-2 md:h-3 rounded-full cursor-pointer ${currentSection === section ? 'bg-pink-500' : 'bg-gray-600'}`}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollToSection(section)}
          />
        ))}
      </div>
    </div>
  );
};

export default Navigation;