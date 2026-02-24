import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const skills = [
    { category: 'Languages', items: ['Python', 'TypeScript', 'C/C++', 'Bash', 'Java'] },
    { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind', 'Framer Motion'] },
    { category: 'Backend', items: ['Node.js', 'FastAPI', 'Flask'] },
    { category: 'AI/ML', items: ['PyTorch', 'Transformers', 'Llama.cpp'] },
    { category: 'Tools', items: ['Git', 'Linux', 'Docker', 'Neovim', 'Opencode'] },
  ];

  return (
    <section id="about" className="section-padding relative">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-cosmic-dark/70 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-soft" />
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-rose-soft">About</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl text-star-white leading-tight mb-6">
              I build software with intent.
            </h2>

            <div className="space-y-4 max-w-2xl text-star-dim">
              <p>
                I&apos;m <span className="text-rose-soft">Gaurish</span>, an 18yr old developer from India.
                I started coding at 12 and kept moving from scripts to full products that solve real problems.
              </p>

              <p>
                I gravitate toward systems, developer tooling, and privacy centric solutions. My north star is simple:
                build things that are useful, fast, and feel deliberate.
              </p>

              <p>
                I enjoy turning rough ideas into polished builds with strong architecture and thoughtful interaction design.
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-cosmic-dark/60 px-5 py-4">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-star-muted">Build Philosophy</p>
              <p className="mt-2 text-star-white">Macos polish, linux power.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="rounded-3xl bg-cosmic-dark/55 p-6 md:p-8"
          >
            <h3 className="font-display text-2xl text-star-white mb-6">Tech Stack</h3>

            <div className="space-y-5">
              {skills.map((skill) => (
                <div key={skill.category}>
                  <p className="text-star-muted text-xs font-mono mb-2 uppercase tracking-[0.16em]">
                    {skill.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-cosmic-muted px-3 py-1.5 text-sm text-star-dim transition-colors hover:text-rose-soft"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
