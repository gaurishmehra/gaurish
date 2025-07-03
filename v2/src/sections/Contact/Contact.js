import React from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="section contact-section">
      <div className="contact-container">
        <motion.div 
          className="section-title-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Contact Me</h2>
          <div className="cosmos-divider">
            <div className="planet-small"></div>
            <div className="line"></div>
            <div className="planet-medium"></div>
            <div className="line"></div>
            <div className="planet-small"></div>
          </div>
          {/* <p className="contact-intro">
            I’m currently charting my course through examinations, but I’ll be open for new missions soon.
          </p> */}
        </motion.div>

        <div className="simplified-contact">
          <motion.div 
            className="contact-message"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="message-content">
              <h3>Say hello!</h3>
              <p>Hit me up for a cool project or just a casual conversation about space or tech!</p>
              
              <div className="contact-alternative">
                <h4>Socials</h4>
                <p>Track my progress on GitHub or shoot a DM on X</p>
                <div className="social-links">
                  <motion.a 
                    href="https://github.com/gaurishmehra" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="github-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="github-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </span>
                    GitHub Profile
                  </motion.a>
                  <motion.a 
                    href="https://x.com/gaurishmehra" // Replace with your actual X handle
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="x-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="x-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </span>
                    X Profile
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="footer">
        <p>© {new Date().getFullYear()} Gaurish Mehra. All rights reserved.</p>
        <p>Built with React and a passion for the cosmos 🚀</p>
        <p>Last updated: 3rd July, 2025</p>
      </div>
    </section>
  );
};

export default Contact;