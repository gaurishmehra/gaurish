import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = ({ setRef, stack }) => (
  <section id="about" className="min-h-screen flex flex-col justify-center items-center px-4 py-16 bg-transparent relative z-10" ref={(el) => setRef('about', el)}>
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="max-w-3xl text-center">
      <motion.h2
        className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        About Me
      </motion.h2>
      <motion.p
        className="text-lg text-gray-300 mb-8 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        I am Gaurish, currently in 12th grade, studying in India.<br />
        I am a JEE aspirant and a self-taught full-stack developer.<br />
        I love to make open-source projects and contribute to them.<br />
        I am also a huge fan of Llm(s).<br />
        I currently am not looking for any job opportunities, hit me up for a cool project though.<br />
      </motion.p>
      <motion.h3
        className="text-2xl font-semibold mb-4 text-pink-400"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Celestial Tech Stack
      </motion.h3>
      <motion.div className="flex flex-wrap justify-center gap-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }}>
        {stack.map((tech, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="px-3 py-1 bg-purple-900 rounded-full text-sm font-medium text-pink-300 cursor-pointer"
            onClick={() => window.open(`https://www.google.com/search?q=${tech}`, "_blank")}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

export default AboutSection;