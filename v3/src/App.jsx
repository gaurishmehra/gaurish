import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Background from './components/Background';
import MouseTrail from './components/MouseTrail';
import Navigation from './components/Navigation';
import VSCodeButton from './components/VSCodeButton';
import VSCodeExplorer from './components/VSCodeExplorer';

import Hero from './sections/Hero';
import Now from './sections/Now';
import Journey from './sections/Journey';
import Projects from './sections/Projects';
import About from './sections/About';
import Contact from './sections/Contact';

const App = () => {
  const [isVSCodeOpen, setIsVSCodeOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'now', 'journey', 'projects', 'about', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cosmic-black text-star-white noise-overlay">
      <Background />
      
      {!isMobile && !isVSCodeOpen && <MouseTrail />}
      
      {!isMobile && (
        <>
          <VSCodeButton onClick={() => setIsVSCodeOpen(true)} />
          <AnimatePresence>
            {isVSCodeOpen && (
              <VSCodeExplorer onClose={() => setIsVSCodeOpen(false)} />
            )}
          </AnimatePresence>
        </>
      )}
      
      <Navigation activeSection={activeSection} />
      
      <main className="relative z-10">
        <Hero />
        <Now />
        <Journey />
        <Projects />
        <About />
        <Contact />
      </main>
      
      <footer className="relative z-10 pt-10 pb-24 text-center md:pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-star-dim text-sm font-mono"
        >
          <p className="mb-2">Built with care in 2026</p>
          <p className="text-xs">
            <span className="text-rose-soft">v3</span>  The Constellation Era
          </p>
        </motion.div>
      </footer>
    </div>
  );
};

export default App;
