import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Lock, Sparkles, Image as ImageIcon } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'System Shell',
      description: 'A minimalist system shell designed for speed and efficiency. Currently in early development, focused on core features and performance optimizations.',
      tech: ['Python', 'Quickshell', 'Linux'],
      status: 'active',
      highlight: 'Main Focus',
      image: '/shell.png',
      cover: 'from-rose-soft/25 via-nebula-light/20 to-cosmic-muted',
      link: null,
    },
    {
      title: 'Linux Dashboard',
      description: 'A GTK4-based dashboard for Linux with system monitoring, music controls, weather, and custom widgets.',
      tech: ['Python', 'GTK4', 'Linux', 'DBus'],
      status: 'open',
      image: '/dash.png',
      cover: 'from-nebula-light/30 via-cosmic-muted to-nebula-deep/70',
      link: 'https://github.com/gaurishmehra/dashboard',
    },
    {
      title: 'Image Organizer',
      description: 'Smart image sorting tool using local vision models (qwen2.5-vl) to automatically categorize and organize photo collections.',
      tech: ['Python', 'Electron', 'Llama.cpp'],
      status: 'private',
      image: '/wallsort.png',
      cover: 'from-cosmic-muted via-nebula-purple/40 to-rose-deep/30',
      link: null,
    },
    {
      title: 'This Website',
      description: 'My personal corner of the internet. v3 of my portfolio, built with React, Tailwind, and cosmic aesthetics.',
      tech: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
      status: 'open',
      image: '/web.png',
      cover: 'from-nebula-deep/60 via-rose-soft/25 to-cosmic-muted',
      link: 'https://github.com/gaurishmehra/gaurish',
    },
  ];

  const getStatusInfo = (status) => {
    const statusMap = {
      active: { label: 'In Progress', color: 'text-rose-soft', bg: 'bg-rose-soft/10', icon: Sparkles },
      open: { label: 'Open Source', color: 'text-green-400', bg: 'bg-green-400/10', icon: Github },
      private: { label: 'Private', color: 'text-star-muted', bg: 'bg-star-muted/10', icon: Lock },
    };
    return statusMap[status] || statusMap.private;
  };

  const ProjectCover = ({ project }) => {
    if (project.image) {
      return (
        <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl border border-rose-soft/15 bg-cosmic-dark">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
      );
    }

    return (
      <div className={`relative mb-4 aspect-[16/10] overflow-hidden rounded-xl border border-rose-soft/15 bg-gradient-to-br ${project.cover}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,240,248,0.2),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(45,36,56,0.45),transparent_45%)]" />
        <div className="absolute inset-0 flex items-center justify-center text-star-white/85">
          <ImageIcon size={28} />
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="section-padding relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-14"
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4 text-star-white">
            Projects
          </h2>
          <p className="text-star-muted text-lg max-w-2xl">
            Things I&apos;ve built. Designed for utility, crafted for real workflows.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {projects.map((project, index) => {
            const statusInfo = getStatusInfo(project.status);

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group glass-card rounded-2xl p-4 sm:p-5 md:p-6 ${
                  project.highlight ? 'border-rose-soft/25' : ''
                }`}
              >
                <ProjectCover project={project} />

                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-mono ${statusInfo.bg} ${statusInfo.color}`}>
                    <statusInfo.icon size={12} />
                    {statusInfo.label}
                  </span>
                  {project.highlight && (
                    <span className="text-rose-soft text-xs font-mono uppercase tracking-wider">
                      {project.highlight}
                    </span>
                  )}
                  {project.link && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-star-muted hover:text-rose-soft transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`${project.title} external link`}
                    >
                      <ExternalLink size={18} />
                    </motion.a>
                  )}
                </div>

                <h3 className="font-display text-xl text-star-white mb-2 group-hover:text-rose-soft transition-colors">
                  {project.title}
                </h3>

                <p className="text-star-muted text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-nebula-light/25 bg-cosmic-muted px-2.5 py-1 text-xs font-mono text-star-dim"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/gaurishmehra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-star-muted hover:text-rose-soft transition-colors font-mono text-sm"
          >
            <Github size={16} />
            View more on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
