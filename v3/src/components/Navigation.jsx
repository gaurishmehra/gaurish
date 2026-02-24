import React from 'react';
import { motion } from 'framer-motion';

const Navigation = ({ activeSection }) => {
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'now', label: 'Now' },
    { id: 'journey', label: 'Journey' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="fixed top-0 left-0 right-0 z-40 px-4 pt-4 md:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="rounded-2xl border border-rose-soft/15 bg-cosmic-darker/70 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <motion.button
              onClick={() => scrollToSection('hero')}
              className="text-lg font-display text-rose-soft hover:text-rose-muted transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              GM
            </motion.button>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-star-white bg-nebula-deep/70'
                      : 'text-star-dim hover:text-star-white hover:bg-nebula-deep/40'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <motion.a
              href="https://github.com/gaurishmehra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-star-dim hover:text-rose-soft transition-colors"
              whileHover={{ scale: 1.08, rotate: 4 }}
              whileTap={{ scale: 0.92 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.a>
          </div>

          <div className="border-t border-rose-soft/10 px-3 py-2 md:hidden">
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeSection === item.id
                      ? 'bg-rose-soft/15 text-rose-soft'
                      : 'bg-cosmic-dark text-star-muted'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
