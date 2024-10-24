import React, { useState, useEffect, useRef } from 'react';
import { motion, useViewportScroll, useTransform, useAnimation } from 'framer-motion';
import { Github, Twitter, ExternalLink, Send, ChevronDown } from 'lucide-react';
import TerminalChat from './TerminalChat';
import StartupAnimation from './StartupAnimation';

const Home = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const { scrollYProgress } = useViewportScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const sectionsRef = useRef({});
  const controls = useAnimation();

  const projects = [
    {
      title: "Gaurika",
      description: "Because i hate chatgpt.",
      link: "https://chat.gaurish.xyz/",
      codeLink: "https://github.com/gaurishmehra/Gaurika",
      image: "/Gaurika.png",
    },
    {
      title: "LLm BenchMark",
      description: "personal benchmark for popular Llm(s).[Inactive atm]",
      link: "https://llm.gaurish.xyz/",
      codeLink: "https://github.com/gaurishmehra/Llm_BenchMark",
      image: "/LLm.png",
    }
  ];

  const stack = [
    "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Python", "TensorFlow", "Transformers"
  ];

  const thoughts = [
    "Open-source is the way of the future. Collaboration and transparency are key to unlocking the full potential of technology.",
    "Llm(s) are not 'AI', they are to put it simply, a bunch of math equations that are used to predict the next word in a sentence.",
    "The observable universe is about 93 billion light-years in diameter. We might never find life beyond Earth, but that doesn't mean it isn't out there.",
    "Among the 3 JEE subjects, the only one that sucks is Chemistry. Physics and Maths are fun.",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 6;
      
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
    handleScroll(); // Initial call to set the current section on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generateGalaxies = (count) => {
    const galaxies = [];
    const colors = ['#FF1493', '#FF69B4', '#FF00FF', '#8A2BE2', '#9400D3'];
    const minDistance = 100;

    for (let i = 0; i < count; i++) {
      let top, left, overlapping;
      do {
        top = Math.random() * 100;
        left = Math.random() * 100;
        overlapping = galaxies.some(g => 
          Math.hypot(g.top - top, g.left - left) < minDistance
        );
      } while (overlapping);

      galaxies.push({
        id: i,
        top: `${top}%`,
        left: `${left}%`,
        size: `${Math.random() * 150 + 50}px`,
        rotationDuration: `${Math.random() * 100 + 50}s`,
        pulseDuration: `${Math.random() * 3 + 2}s`,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    return galaxies;
  };

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

  const [galaxies, setGalaxies] = useState(generateGalaxies(3));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGalaxies(generateGalaxies(3));
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // New handleScroll function to auto-scroll to the next section when a small scroll is detected
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 6;
      
      const sectionEntries = Object.entries(sectionsRef.current);
      const currentSectionEntry = sectionEntries.find(([_, element]) => 
        element.offsetTop <= scrollPosition && 
        element.offsetTop + element.offsetHeight > scrollPosition
      );

      if (currentSectionEntry) {
        setCurrentSection(currentSectionEntry[0]);
      }

      // Auto-scroll to the next section when a small scroll is detected
      const nextSectionIndex = sectionEntries.findIndex(([key]) => key === currentSectionEntry[0]) + 1;
      if (nextSectionIndex < sectionEntries.length) {
        const nextSection = sectionEntries[nextSectionIndex][1];
        if (nextSection) {
          const offset = window.innerHeight / 100;
          const elementPosition = nextSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set the current section on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white overflow-x-hidden font-mono relative">
      {/* Space Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        {galaxies.map((galaxy) => (
          <motion.div
            key={galaxy.id}
            className="absolute rounded-full mix-blend-screen filter blur-3xl"
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

      {/* Content */}
      <div className="relative z-10">
        {/* Startup Animation */}
        {isLoading && <StartupAnimation />}

        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center items-center px-4 py-16"
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
              Full Stack Dev | From India | 16yr old
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
          <motion.div
            style={{ opacity }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown size={32} className="animate-bounce text-pink-400 cursor-pointer" onClick={() => scrollToSection('about')} />
          </motion.div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="min-h-screen flex flex-col justify-center items-center px-4 py-16"
          ref={(el) => (sectionsRef.current['about'] = el)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-3xl text-center"
          >
            <motion.h2
              className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About Me
            </motion.h2>
            <motion.p
              className="text-lg text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
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
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Celestial Tech Stack
            </motion.h3>
            <motion.div
              className="flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {stack.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
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
          className="min-h-screen flex flex-col justify-center items-center px-4 py-16"
          ref={(el) => (sectionsRef.current['terminal'] = el)}
        >
          <TerminalChat />
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="min-h-screen flex flex-col justify-center items-center px-4 py-16"
          ref={(el) => (sectionsRef.current['projects'] = el)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-6xl w-full"
          >
            <motion.h2
              className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Stellar Projects
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-pink-500 cursor-pointer"
                >
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-pink-400">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex justify-between">
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-pink-300 flex items-center transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={16} className="mr-1" /> Launch
                      </motion.a>
                      <motion.a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-pink-300 flex items-center transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={16} className="mr-1" /> Code
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Thoughts Section */}
        <section
          id="thoughts"
          className="min-h-screen flex flex-col justify-center items-center px-4 py-16"
          ref={(el) => (sectionsRef.current['thoughts'] = el)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-4xl w-full"
          >
            <motion.h2
              className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
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
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-gray-900 rounded-lg p-6 shadow-lg border border-pink-500 relative cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-gray-300">{thought}</p>
                  <div className="absolute bottom-4 right-4 text-pink-400 opacity-50">
                    {/* Add a subtle icon or element here if desired */}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen flex flex-col justify-center items-center px-4 py-16"
          ref={(el) => (sectionsRef.current['contact'] = el)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-3xl w-full text-center"
          >
            <motion.h2
              className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Initiate Contact
            </motion.h2>
            <motion.p
              className="text-lg text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
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
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full transition-all duration-200 hover:from-pink-600 hover:to-purple-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Send size={20} className="mr-2" />
              Let's Chat
            </motion.a>
          </motion.div>
        </section>
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-50">
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
