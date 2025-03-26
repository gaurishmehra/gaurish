import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useViewportScroll } from 'framer-motion';
import { motion } from 'framer-motion';
import StartupAnimation from './components/StartupAnimation';
import MouseTrail from './components/MouseTrail';
import Background from './components/Background';
import NavigationArrows from './components/NavigationArrows';
import Navigation from './components/Navigation';
import VSCodeButton from './components/VSCodeButton';
import VSCodeInterface from './components/VSCodeInterface';

// Import sections
import HomeSection from './components/sections/HomeSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ThoughtsSection from './components/sections/ThoughtsSection';
import ContactSection from './components/sections/ContactSection';

const Home = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const { scrollYProgress } = useViewportScroll();
  const sectionsRef = useRef({});
  const [startupParticles, setStartupParticles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVSCodeOpen, setIsVSCodeOpen] = useState(false);
  const [showMobilePopup, setShowMobilePopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleStartupComplete = (particleSystem) => {
    setStartupParticles(particleSystem);
    setIsLoading(false);
  };

  const stack = useMemo(() => [
    "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Python", "TensorFlow", "Transformers"
  ], []);

  const thoughts = useMemo(() => [
    "Open-source is the way of the future. Collaboration and transparency are key to unlocking the full potential of technology.",
    "Llm(s) are not 'AI', they are to put it simply, a bunch of math equations that are used to predict the next word in a sentence.",
    "The observable universe is about 93 billion light-years in diameter. We might never find life beyond Earth, but that doesn't mean it isn't out there.",
    "Among the 3 JEE subjects, the only one that sucks is Chemistry. Physics and Maths are fun.",
  ], []);

  const setRef = (id, el) => {
    sectionsRef.current[id] = el;
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const sectionEntries = Object.entries(sectionsRef.current);
      const currentSectionEntry = sectionEntries.find(([_, element]) =>
        element.offsetTop <= scrollPosition &&
        element.offsetTop + element.offsetHeight > scrollPosition
      );
      if (currentSectionEntry) {
        setCurrentSection(currentSectionEntry[0]);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = sectionsRef.current[sectionId];
    if (section) {
      const offset = window.innerHeight / 100;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Detect mobile devices and update isMobile state
  useEffect(() => {
    if (typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)) {
      setIsMobile(true);
      setShowMobilePopup(true);
    }
  }, []);

  const toggleVSCode = () => {
    setIsVSCodeOpen(!isVSCodeOpen);
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white overflow-x-hidden font-mono relative">
      <Background startupParticles={startupParticles} />

      {/* Render MouseTrail always when VSCode is closed */}
      {!isVSCodeOpen && <MouseTrail />}

      {/* Only render VS Code related components if not on mobile */}
      {!isMobile && (
        <>
          <VSCodeButton onClick={toggleVSCode} />
          <VSCodeInterface isOpen={isVSCodeOpen} onClose={() => setIsVSCodeOpen(false)} />
        </>
      )}
      
      {isLoading ? (
        <StartupAnimation onComplete={handleStartupComplete} />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="relative z-10">
          <HomeSection setRef={setRef} />
          <AboutSection setRef={setRef} stack={stack} />
          <ProjectsSection setRef={setRef} />
          <ThoughtsSection setRef={setRef} thoughts={thoughts} />
          <ContactSection setRef={setRef} />
          
          <NavigationArrows currentSection={currentSection} scrollToSection={scrollToSection} />
          <Navigation currentSection={currentSection} scrollToSection={scrollToSection} />
        </motion.div>
      )}

      {/* Mobile popup overlay */}
      {showMobilePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
          <div className="bg-gray-800 p-4 rounded">
            <p className="text-white mb-2">
              This website is more fun on desktop. The mobile version is like a lil demo.
            </p>
            <button 
              onClick={() => setShowMobilePopup(false)} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
