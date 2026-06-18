import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Lock, Sparkles, Image as ImageIcon, Archive } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'System Shell',
      description: 'A minimalist system shell designed for speed and efficiency. Currently in early development, focused on core features and performance optimizations.',
      tech: ['Python', 'Quickshell', 'Linux'],
      status: 'active',
      highlight: 'Main Focus',
      image: '/shell.png',
      link: null,
    },
    {
      title: 'Infinix GT Book Reverse Engineered',
      description: 'Linux tool for controlling RGB lighting, performance modes, and fan control on Infinix GT Book laptops. Reverse engineered the USB and ACPI protocols because Infinix provides zero Linux support. Full CLI with one-command install.',
      tech: ['Python', 'USB', 'ACPI', 'Linux'],
      status: 'open',
      image: null,
      link: 'https://github.com/gaurishmehra/infinix-gt-book-reverse-engineered',
    },
    {
      title: 'Screen OCR',
      description: 'Linux script that takes a screenshot of any selected area and runs it through small local VLMs to extract text. No internet, no API, just select and OCR.',
      tech: ['Python', 'VLM', 'wlroots', 'Tesseract'],
      status: 'private',
      image: null,
      link: null,
    },
    {
      title: 'Linux Dashboard',
      description: 'A GTK4 based dashboard for Linux with system monitoring, music controls, weather, and custom widgets. 19 stars, the most starred project in the collection.',
      tech: ['Python', 'GTK4', 'Linux', 'DBus'],
      status: 'open',
      image: '/dash.png',
      link: 'https://github.com/gaurishmehra/dashboard',
    },
    {
      title: 'Gaurika',
      description: 'My take on a mobile LLM chat UI, built with Ionic and TypeScript. Had multiple iterations, web, Linux desktop, and mobile. Left it because the official LLM providers shipped better versions of exactly what I was building.',
      tech: ['TypeScript', 'Ionic', 'LLM API'],
      status: 'archived',
      image: '/gaurika.png',
      link: 'https://github.com/gaurishmehra/Gaurika',
    },
    {
      title: 'MCP Linux',
      description: 'LLM interface with Model Context Protocol tools for Linux: filesystem access, browser control via a Firefox extension, URL scraping, and more. A personal AI toolkit that actually talks to your machine.',
      tech: ['Python', 'MCP', 'Firefox Extension', 'LLM'],
      status: 'open',
      image: null,
      link: 'https://github.com/gaurishmehra/Mcp-Linux',
    },
    {
      title: 'Screen Recall',
      description: 'Inspired by Microsoft Recall. Built a local screen capture and search tool that continuously took screenshots and indexed them with vision models so you could search what was on your screen. Worked, but was not useful enough to keep using.',
      tech: ['Python', 'VLM', 'SQLite', 'Screen Capture'],
      status: 'archived',
      image: null,
      link: null,
    },
    {
      title: 'Image Organizer',
      description: 'Smart image sorting tool using local vision models (qwen2.5-vl) to automatically categorize and organize photo collections. Runs entirely offline, no cloud, no API calls.',
      tech: ['Python', 'Electron', 'Llama.cpp'],
      status: 'private',
      image: '/wallsort.png',
      link: null,
    },
    {
      title: 'Homelab',
      description: 'Self-hosted infrastructure running Nextcloud, Bitwarden, code tunnels, and SSH, all exposed securely through Cloudflare Zero Trust tunnels. No port forwarding, no VPN, just zero-trust access to everything.',
      tech: ['Docker', 'Cloudflare', 'Nextcloud', 'Bitwarden'],
      status: 'private',
      image: '/lab.png',
      link: null,
    },
    {
      title: 'Groq Web Search',
      description: 'Gave LLMs real time web search using Groq and Google Search API, before every lab shipped it natively. Pulled live information and fed it back into the model for grounded answers.',
      tech: ['Python', 'Groq', 'Google API', 'Flask'],
      status: 'archived',
      image: null,
      link: null,
    },
    {
      title: 'Voaid',
      description: 'Voice AI assistant web app built with React. Explored real time voice interaction with LLMs before the major labs made it mainstream.',
      tech: ['React', 'Voice API', 'LLM'],
      status: 'archived',
      image: null,
      link: null,
    },
    {
      title: 'This Website',
      description: 'My personal corner of the internet. v3 of my portfolio, built with React, Tailwind, and cosmic aesthetics.',
      tech: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
      status: 'open',
      image: '/web.png',
      link: 'https://github.com/gaurishmehra/gaurish',
    },
    {
      title: 'DisTwit',
      description: 'Discord bot that tracks and relays tweets from any account in real time. Built for communities that live on Discord but follow people on Twitter.',
      tech: ['Python', 'Discord.py', 'Twitter API'],
      status: 'archived',
      image: null,
      link: null,
    },
    {
      title: 'Ez-It',
      description: 'Virtual assistant for automating daily tasks across Linux, Windows, Mac, and Android. Early experiment in cross platform voice driven automation.',
      tech: ['Python', 'Automation', 'Cross platform'],
      status: 'archived',
      image: null,
      link: null,
    },
  ];

  const getStatusInfo = (status) => {
    const statusMap = {
      active: { label: 'In Progress', color: 'text-rose-soft', bg: 'bg-rose-soft/10', icon: Sparkles },
      open: { label: 'Open Source', color: 'text-green-400', bg: 'bg-green-400/10', icon: Github },
      private: { label: 'Private', color: 'text-star-muted', bg: 'bg-star-muted/10', icon: Lock },
      archived: { label: 'Archived', color: 'text-star-muted', bg: 'bg-star-muted/10', icon: Archive },
    };
    return statusMap[status] || statusMap.private;
  };

  const ProjectCover = ({ project }) => {
    if (!project.image) return null;

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
                className={`group glass-card rounded-2xl p-4 sm:p-5 md:p-6 self-center ${
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
