import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { Github, Twitter, ChevronDown, ChevronUp, ExternalLink, Send } from 'lucide-react';
import TerminalChat from './TerminalChat';
import StartupAnimation from './StartupAnimation';
import UniqueParticleBackground from './UniqueParticleBackground';

// Example galaxies data for cosmic background elements
const galaxies = [
  { id: 1, top: '10%', left: '20%', size: '80px', color: 'rgba(255,0,150,0.6)', pulseDuration: '3', rotationDuration: '5' },
  { id: 2, top: '40%', left: '60%', size: '100px', color: 'rgba(0,0,255,0.6)', pulseDuration: '4', rotationDuration: '6' },
  { id: 3, top: '70%', left: '30%', size: '90px', color: 'rgba(0,255,150,0.6)', pulseDuration: '3.5', rotationDuration: '5.5' },
];

// MouseTrail component: iterative, curvy & cosmos themed
const MouseTrail = () => {
  const numSegments = 10;
  // Initialize the trail positions off-screen
  const [trail, setTrail] = useState(Array(numSegments).fill({ x: -100, y: -100 }));
  const positionsRef = useRef(Array(numSegments).fill({ x: -100, y: -100 }));

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Update the first segment with the mouse position
      positionsRef.current[0] = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;

    const updateTrail = () => {
      // Each subsequent segment smoothly follows the previous one
      for (let i = 1; i < numSegments; i++) {
        const prev = positionsRef.current[i - 1];
        const curr = positionsRef.current[i];
        positionsRef.current[i] = {
          x: curr.x + (prev.x - curr.x) * 0.2,
          y: curr.y + (prev.y - curr.y) * 0.2,
        };
      }
      setTrail([...positionsRef.current]);
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [numSegments]);

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-50">
      {trail.map((pos, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: pos.x,
            top: pos.y,
            // Each segment gets slightly smaller to create a tapering effect
            width: `${20 - index * 1.5}px`,
            height: `${20 - index * 1.5}px`,
            // Cosmic gradient for a nebula-like look
            background: 'radial-gradient(circle, rgba(255,0,150,1) 0%, rgba(0,0,255,1) 100%)',
            filter: 'blur(2px)',
            transform: 'translate(-50%, -50%)',
          }}
          // A subtle rotation to add to the cosmic vibe
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />
      ))}
    </div>
  );
};

const Home = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const { scrollYProgress } = useViewportScroll();
  const sectionsRef = useRef({});
  const [startupParticles, setStartupParticles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const generateShootingStars = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 1}s`,
      animationDelay: `${Math.random() * 5}s`,
      size: `${Math.random() * 3 + 1}px`,
      angle: Math.random() * 360
    }));
  };

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

  const Background = () => {
    useEffect(() => {
      if (startupParticles) {
        const mergeParticles = () => {
          // Merge animation logic
        };
        mergeParticles();
      }
    }, [startupParticles]);

    return (
      <>
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          {galaxies.map((galaxy) => (
            <motion.div
              key={galaxy.id}
              className="absolute rounded-full mix-blend-screen filter blur-sm"
              style={{
                top: galaxy.top,
                left: galaxy.left,
                width: galaxy.size,
                height: galaxy.size,
                backgroundColor: galaxy.color,
              }}
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{ 
                opacity: [0.5, 0.8, 0.5], 
                scale: [1, 1.2, 1],
                rotate: 360
              }}
              transition={{ 
                opacity: { duration: parseFloat(galaxy.pulseDuration), repeat: Infinity },
                scale: { duration: parseFloat(galaxy.pulseDuration), repeat: Infinity },
                rotate: { duration: parseFloat(galaxy.rotationDuration), repeat: Infinity, ease: "linear" }
              }}
            />
          ))}
          {generateShootingStars(5).map((star) => (
            <motion.div
              key={star.id}
              className="absolute bg-white rounded-full"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                transform: `rotate(${star.angle}deg)`
              }}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                x: `-${Math.cos(star.angle * Math.PI / 180) * 100}vw`,
                y: `${Math.sin(star.angle * Math.PI / 180) * 100}vh`
              }}
              transition={{ 
                duration: parseFloat(star.animationDuration),
                delay: parseFloat(star.animationDelay),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        <UniqueParticleBackground />
      </>
    );
  };

  const ProjectsSection = () => (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center items-center px-4 py-16 bg-transparent relative z-10"
      ref={(el) => (sectionsRef.current['projects'] = el)}
    >
      <motion.div className="max-w-4xl w-full text-center">
        <motion.h2
          className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600"
        >
          Projects & Research
        </motion.h2>
        
        <motion.div
          className="backdrop-blur-sm bg-gray-900/10 rounded-lg p-8 border border-pink-500/20"
        >
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

  // NavigationArrows component: always rendered with Up and Down buttons
  const NavigationArrows = () => {
    const sectionsOrder = ['home', 'about', 'terminal', 'projects', 'thoughts', 'contact'];
    const currentIndex = sectionsOrder.indexOf(currentSection);

    const handleUp = () => {
      if (currentIndex > 0) {
        scrollToSection(sectionsOrder[currentIndex - 1]);
      }
    };

    const handleDown = () => {
      if (currentIndex < sectionsOrder.length - 1) {
        scrollToSection(sectionsOrder[currentIndex + 1]);
      }
    };

    return (
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 flex space-x-6">
        {currentIndex > 0 && (
          <motion.div onClick={handleUp} className="cursor-pointer">
            <ChevronUp size={32} className="text-pink-400 hover:text-purple-400" />
          </motion.div>
        )}
        {currentIndex < sectionsOrder.length - 1 && (
          <motion.div onClick={handleDown} className="cursor-pointer">
            <ChevronDown size={32} className="text-pink-400 hover:text-purple-400" />
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white overflow-x-hidden font-mono relative">
      <UniqueParticleBackground />
      {isLoading ? (
        <StartupAnimation onComplete={handleStartupComplete} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          {/* Hero Section */}
          <section
            id="home"
            className="min-h-screen flex flex-col justify-center items-center px-4 py-16 bg-transparent relative z-10"
            ref={(el) => (sectionsRef.current['home'] = el)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Gaurish Mehra
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Full Stack Dev | From India | 17yr old
              </motion.p>
              <motion.div
                className="flex justify-center space-x-6 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {['github','twitter'].map((platform, index) => (
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

          {/* About Section */}
          <section
            id="about"
            className="min-h-screen flex flex-col justify-center items-center px-4 py-16 bg-transparent relative z-10"
            ref={(el) => (sectionsRef.current['about'] = el)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-3xl text-center"
            >
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
                I am JEE aspirant and a self-taught full-stack developer.<br />
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
              <motion.div
                className="flex flex-wrap justify-center gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
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

          {/* Terminal Section */}
          <section
            id="terminal"
            className="min-h-screen flex flex-col justify-center items-center px-4 py-16 bg-transparent relative z-10"
            ref={(el) => (sectionsRef.current['terminal'] = el)}
          >
            <TerminalChat />
          </section>

          <ProjectsSection />

          {/* Thoughts Section */}
          <section
            id="thoughts"
            className="min-h-screen flex flex-col justify-center items-center px-4 py-16 bg-transparent relative z-10"
            ref={(el) => (sectionsRef.current['thoughts'] = el)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-4xl w-full"
            >
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

          {/* Contact Section */}
          <section
            id="contact"
            className="min-h-screen flex flex-col justify-center items-center px-4 py-16 bg-transparent relative z-10"
            ref={(el) => (sectionsRef.current['contact'] = el)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-3xl w-full text-center"
            >
              <motion.h2
                className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Initiate Contact
              </motion.h2>
              <motion.p
                className="text-lg text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Ready to embark on a cosmic coding journey together? Let's connect and explore new digital frontiers!
              </motion.p>
              <motion.a
                href="https://x.com/GaurishMehra"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500/40 to-purple-600/40 backdrop-blur-sm text-white font-semibold rounded-full transition-all duration-200 hover:from-pink-600/50 hover:to-purple-700/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Send size={20} className="mr-2" />
                Let's Chat
              </motion.a>
            </motion.div>
          </section>

          {/* Navigation Arrows (Up & Down) always visible */}
          <NavigationArrows />

          {/* Mouse Trail */}
          <MouseTrail />

        </motion.div>
      )}
      
      {/* Navigation Dots */}
      <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-50 backdrop-blur-sm bg-gray-900/10 rounded-full p-2">
        <div className="flex flex-col md:space-y-4 space-y-2">
          {['home', 'about', 'terminal', 'projects', 'thoughts', 'contact'].map((section) => (
            <motion.div
              key={section}
              className={`w-2 md:w-3 h-2 md:h-3 rounded-full cursor-pointer ${
                currentSection === section ? 'bg-pink-500' : 'bg-gray-600'
              }`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToSection(section)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
