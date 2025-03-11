import React from 'react';
import { motion } from 'framer-motion';

const ThoughtsSection = ({ setRef, thoughts }) => (
  <section id="thoughts" className="min-h-screen flex flex-col justify-center items-center px-4 py-16 bg-transparent relative z-10" ref={(el) => setRef('thoughts', el)}>
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="max-w-4xl w-full">
      <motion.h2
        className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400/90 to-purple-600/90 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Thoughts / Opinions
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {thoughts.map((thought, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="backdrop-blur-sm bg-gray-900/10 rounded-lg p-6 shadow-lg border border-pink-500/20 relative cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-gray-300">{thought}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default ThoughtsSection;