import React from 'react';
import { motion } from 'framer-motion';
import './Intro.css';

const Intro = () => {
  return (
    <section id="intro" className="section intro-section">
      <div className="intro-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="intro-text"
        >
          <h2>Hello, I'm</h2>
          <h1>
            <span className="typing-text">Gaurish Mehra</span>
          </h1>
          <h3>
            <span className="text-gradient"> Developer</span> | 
            <span className="text-gradient"> Student</span> | 
            <span className="text-gradient"> Space Enthusiast</span>
          </h3>
          <p>
            Welcome to my cosmic corner of the internet.<br></br> 
            17yr old, self taught "Full Stack" developer, with a huge passion for llms
          </p>
          <div className="intro-buttons">
            <a href="#projects" className="intro-button primary-button">View My Projects</a>
            <a href="#contact" className="intro-button secondary-button">Contact Me</a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="intro-image"
        >
          <div className="planet-container">
            <div className="planet"></div>
            <div className="orbit">
              <div className="satellite"></div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="mouse-wheel"></div>
        </div>
        <div className="scroll-text">Scroll Down</div>
      </div>
    </section>
  );
};

export default Intro;