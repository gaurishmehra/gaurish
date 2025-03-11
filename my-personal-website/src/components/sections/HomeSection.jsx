import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter } from 'lucide-react';

const HomeSection = ({ setRef }) => (
  <section id="home" className="min-h-screen flex flex-col justify-center items-center px-4 py-16 bg-transparent relative z-10" ref={(el) => setRef('home', el)}>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center">
      <motion.h1
        className="text-4xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Gaurish Mehra
      </motion.h1>
      <motion.p
        className="text-lg md:text-2xl text-gray-300 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Full Stack Dev | From India | 17yr old
      </motion.p>
      <motion.div className="flex justify-center space-x-6 mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
        {['github', 'twitter'].map((platform, index) => (
          <motion.a
            key={platform}
            href={`https://${platform}.com/gaurishmehra`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            className="text-pink-400 hover:text-purple-400 transition-colors duration-200"
          >
            {platform === 'github' && <Github size={28} />}
            {platform === 'twitter' && <Twitter size={28} />}
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

export default HomeSection;