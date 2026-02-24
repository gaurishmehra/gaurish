import React from 'react';
import { motion } from 'framer-motion';

const VSCodeButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed bottom-6 right-6 z-40 glass-card rounded-full p-4 group hover-lift"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-star-dim group-hover:text-rose-soft transition-colors"
        >
          <path
            d="M17.583 2.28a.883.883 0 0 0-.96.21L9.53 9.05 5.206 5.817a.883.883 0 0 0-1.13.03l-1.55 1.32a.883.883 0 0 0 0 1.35l3.54 3.48-3.54 3.48a.883.883 0 0 0 0 1.35l1.55 1.32a.883.883 0 0 0 1.13.03l4.324-3.233 7.093 6.56a.883.883 0 0 0 .96.21l2.73-1.05a.883.883 0 0 0 .56-.82V4.15a.883.883 0 0 0-.56-.82l-2.73-1.05zm-.21 4.98v9.48l-5.65-4.74 5.65-4.74z"
            fill="currentColor"
          />
        </svg>
        
        <motion.div
          className="absolute inset-0 rounded-full bg-rose-soft/20 blur-xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </div>
      
      <span className="absolute -top-8 right-0 text-xs font-mono text-star-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        View Source
      </span>
    </motion.button>
  );
};

export default VSCodeButton;
