import React from 'react';
import { motion } from 'framer-motion';

const Journey = () => {

  const milestones = [
    {
      year: '2019',
      age: '11',
      title: 'Linux Begins',
      description: 'Laptop couldn\'t run Minecraft on Windows without freezing. Switched to Manjaro as a fix, and never really looked back.',
      highlight: 'Manjaro first install',
    },
    {
      year: '2020',
      age: '12',
      title: 'Arch + Dual Boot',
      description: 'Graduated from Manjaro to Arch Linux, running it alongside Windows. Started getting comfortable with the terminal and the Linux way of doing things.',
      highlight: 'I use Arch btw',
    },
{
      year: '2021',
      age: '13',
      title: 'Web Dev, Python & Full Linux',
      description: 'Removed Windows entirely no regrets. Dove into HTML, CSS, JavaScript, and Python while going full Arch, no dual boot.',
      highlight: 'Eww Windows? nah.',
    },
    {
      year: '2022',
      age: '14',
      title: 'Scripts, Dots & GPT2',
      description: 'Started mastering Bash, shell scripting, and the art of ricing. Discovered GPT2 and got genuinely intrigued by what language models could do.',
      highlight: 'First LLM rabbit hole',
    },
    {
      year: '2023',
      age: '15',
      title: 'React & Frontend',
      description: 'Dove deep into React and the modern frontend ecosystem. Fell in love with component based architecture and building real UIs.',
      highlight: 'React ecosystem',
    },
    {
      year: '2024',
      age: '16',
      title: 'Systems Programming',
      description: 'Picked up C, C++, and Java. Started thinking closer to the metal and understanding how software actually works under the hood.',
      highlight: 'C / C++ / Java',
    },
    {
      year: '2025',
      age: '17',
      title: 'Building for Myself',
      description: 'Started building projects I actually use day to day personal tools, scripts, and apps born out of genuine need.',
      highlight: 'Self driven projects',
    },
{
      year: '2026',
      age: '18',
      title: 'Reverse Engineering RGB',
      description: 'Took my Chinese laptop with RGB controls locked behind a Windows only app and zero documentation none. Reverse engineered how it all worked from scratch and got full control of the lights from within Linux.',
      highlight: 'Reverse engineered RGB',
      isCurrent: true,
    },
  ];

  return (
    <section id="journey" className="section-padding relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4 text-star-white">
            The Journey
          </h2>
          <p className="text-star-muted text-lg max-w-2xl mx-auto">
            Eight years of growth, learning, and building. Each chapter built on the last.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="pointer-events-none absolute left-4 top-0 bottom-0 z-[5] w-[2px] bg-gradient-to-b from-transparent via-rose-soft/40 to-transparent shadow-[0_0_10px_rgba(232,180,200,0.18)] md:left-1/2 md:-translate-x-1/2" />
          
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative z-10 mb-10 pl-12 md:mb-12 md:flex md:items-center md:pl-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                <div className={`glass-card rounded-xl p-5 md:p-6 ${milestone.isCurrent ? 'border-rose-soft/30 rose-glow' : ''}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-rose-soft text-sm">{milestone.year}</span>
                    <span className="text-star-muted text-xs">Age {milestone.age}</span>
                    {milestone.isCurrent && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-soft/20 text-rose-soft text-xs">
                        Now
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl text-star-white mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-star-muted text-sm mb-3">
                    {milestone.description}
                  </p>
                  <span className="text-xs font-mono text-nebula-light">
                    {milestone.highlight}
                  </span>
                </div>
              </div>

              <div className="absolute left-4 top-6 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-rose-soft/80 bg-cosmic-dark z-30 md:left-1/2 md:top-1/2 md:-translate-y-1/2" />

              <div className="hidden md:block md:w-5/12" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-star-muted font-mono text-sm">
            The story continues...
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Journey;
