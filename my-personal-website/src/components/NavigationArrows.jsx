import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const NavigationArrows = ({ currentSection, scrollToSection }) => {
  const sectionsOrder = ['home', 'about', 'projects', 'thoughts', 'contact'];
  const currentIndex = sectionsOrder.indexOf(currentSection);
  
  const handleUp = () => {
    if (currentIndex > 0) {
      scrollToSection(sectionsOrder[currentIndex - 1]);
    }
  };
  
  const handleDown = () => {
    if (currentIndex < sectionsOrder.length - 1) {
      scrollToSection(sectionsOrder[currentIndex + 1]);
    }
  };
  
  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 flex space-x-6">
      {currentIndex > 0 && (
        <motion.div onClick={handleUp} className="cursor-pointer">
          <ChevronUp size={32} className="text-pink-400 hover:text-purple-400" />
        </motion.div>
      )}
      {currentIndex < sectionsOrder.length - 1 && (
        <motion.div onClick={handleDown} className="cursor-pointer">
          <ChevronDown size={32} className="text-pink-400 hover:text-purple-400" />
        </motion.div>
      )}
    </div>
  );
};

export default NavigationArrows;