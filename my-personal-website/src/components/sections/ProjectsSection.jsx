import React from 'react';
import { motion } from 'framer-motion';

const ProjectsSection = ({ setRef }) => (
  <section id="projects" className="min-h-screen flex flex-col justify-center items-center px-4 py-16 bg-transparent relative z-10" ref={(el) => setRef('projects', el)}>
    <motion.div className="max-w-4xl w-full text-center">
      <motion.h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600">
        Projects & Research
      </motion.h2>
      <motion.div className="backdrop-blur-sm bg-gray-900/10 rounded-lg p-8 border border-pink-500/20">
        <p className="text-gray-300 text-lg mb-6">
          All projects and research work are currently private as I focus on JEE preparations. 
          Previously open-sourced projects have been temporarily made private and will be 
          accessible again after completing my exams.
        </p>
        <motion.p>
          Stay tuned for updates post-JEE!
        </motion.p>
      </motion.div>
    </motion.div>
  </section>
);

export default ProjectsSection;