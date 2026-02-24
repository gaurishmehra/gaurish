import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Twitter } from 'lucide-react';
import BlackHoleVisual from '../components/BlackHoleVisual';

const Hero = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/gaurishmehra', label: 'GitHub' },
    { icon: Twitter, href: 'https://x.com/gaurishmehra', label: 'X' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden py-20 md:py-16">
      <div className="section-container relative z-10 w-full">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="text-left">
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-cosmic-dark/75 px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] text-rose-soft"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-rose-soft shadow-[0_0_10px_rgba(232,180,200,0.6)]" />
              Live in Orbit
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-6xl leading-[0.95] text-star-white sm:text-7xl lg:text-8xl"
            >
              <span className="block">Gaurish</span>
              <span className="block gradient-text">Mehra</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 max-w-xl text-lg text-star-dim md:text-xl"
            >
              Developer. Student. Builder.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-3 max-w-xl text-star-muted"
            >
              18, from India. I design and build thoughtful software, with a soft spot for open source and systems integration.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="rounded-full bg-rose-soft/15 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-rose-soft transition-colors hover:bg-rose-soft/25"
              >
                View Projects
              </button>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-cosmic-dark/70 p-3 text-star-dim transition-colors hover:text-rose-soft"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="mt-10 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-star-muted"
            >
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown size={14} />
              </motion.span>
              Scroll for the full story
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mx-auto h-[320px] w-full max-w-[560px] sm:h-[400px] lg:h-[500px]"
          >
            <BlackHoleVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
