import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const skills = [
    'Python', 'Rust', 'JavaScript', 'TypeScript', 'Java',
    'React', 'Vue', 'Svelte', 'Ionic', 'Lynx',
    'Linux', 'TensorFlow', 'Transformers', 'PyTorch', 'Rocket', 'Flask', 'FastAPI',
    'Tailwind CSS', 'Django', 'Node.js', 'Express',
    'MySQL',
  ];

  return (
    <section id="about" className="section about-section">
      <div className="about-container">
        <motion.div 
          className="section-title-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">About Me</h2>
          <div className="cosmos-divider">
            <div className="planet-small"></div>
            <div className="line"></div>
            <div className="planet-medium"></div>
            <div className="line"></div>
            <div className="planet-small"></div>
          </div>
        </motion.div>
        
        <div className="about-content">
          <motion.div 
            className="about-image-container"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="about-image">
              <div className="image-border"></div>
              <div className="profile-placeholder">
                <div className="astronaut-helmet"></div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p>
              I’m Gaurish Mehra, a 17-year-old developer navigating the vast expanse of code and technology. 
              My orbit includes a deep fascination with large language models—sparked back in the GPT-2 era—and 
              a passion for space that fuels my curiosity. I’ve been running Arch Linux since I was 12 or 13, 
              tweaking systems and exploring the digital universe one command at a time.
            </p>
            <p>
              Currently, I’m charting my trajectory toward the JEE and other Indian entrance exams to secure 
              a launchpad at a top college. Beyond that, I spend my time coding, experimenting with frameworks, 
              and diving into the mechanics of machine learning. Space exploration—its tech and its mysteries—keeps 
              me grounded while I aim for the stars.
            </p>
            
            <div className="skills-section">
              <h3>My Toolkit</h3>
              <ul className="skills-list">
                {skills.map((skill, index) => (
                  <motion.li 
                    key={index}
                    className="skill-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;