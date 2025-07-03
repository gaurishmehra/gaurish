import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: "Local Image Sorter and Organizer",
      description: "A simple image sorting and organizing tool (uses qwen2.5-vl-7b)",
      category: "local",
      image: "/images/sorter.png",
      technologies: ["GTK4", "Python", "Llama.cpp"],
      status: "closed-source",
      isOpenSource: false,
      githubUrl: null
    },
    {
      id: 2,
      title: "The Gaurika Project",
      description: "Basically any and all features of chatgpt/claude etc, but with local models and a ui more to my liking.",
      category: "web",
      image: "/images/gaurika.png",
      technologies: ["React", "Ionic"],
      status: "closed-source",
      isOpenSource: false,
      githubUrl: null
    },
    {
      id: 3,
      title: "Linux Dashboard",
      description: "A simple Dashboard for Linux, with music controls, weather, notification history, bluetooth manager and much more!",
      category: "local",
      image: "/images/dash.png",
      technologies: ["GTK4", "Python", "Bash", "Linux"],
      status: "open-source",
      isOpenSource: true,
      githubUrl: "https://github.com/gaurishmehra/dashboard"
    }
  ];
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const handleProjectClick = (project) => {
    if (project.isOpenSource && project.githubUrl) {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleImageError = (e) => {
    // Hide the image and show placeholder if image fails to load
    e.target.style.display = 'none';
    e.target.parentElement.classList.remove('has-image');
  };
  
  return (
    <section id="projects" className="section projects-section">
      <div className="projects-container">
        <motion.div 
          className="section-title-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">My Projects</h2>
          <div className="cosmos-divider">
            <div className="planet-small"></div>
            <div className="line"></div>
            <div className="planet-medium"></div>
            <div className="line"></div>
            <div className="planet-small"></div>
          </div>
          <p className="projects-intro">
            Explore my cosmic collection of projects spanning web development, AI, and system utilities. 
            Each one represents a unique journey into the digital universe.
          </p>
        </motion.div>
        
        <motion.div 
          className="project-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <button 
            className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-button ${activeFilter === 'web' ? 'active' : ''}`}
            onClick={() => setActiveFilter('web')}
          >
            Web
          </button>
          <button 
            className={`filter-button ${activeFilter === 'local' ? 'active' : ''}`}
            onClick={() => setActiveFilter('local')}
          >
            Local
          </button>
        </motion.div>
        
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <motion.div 
              className={`project-card ${project.isOpenSource ? 'clickable' : ''}`}
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              onClick={() => handleProjectClick(project)}
              style={{ cursor: project.isOpenSource ? 'pointer' : 'default' }}
            >
              <div className={`project-image ${project.image ? 'has-image' : ''}`}>
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    onError={handleImageError}
                  />
                ) : null}
                <div className="project-placeholder-image">
                  <div className="placeholder-content">
                    <div className="placeholder-icon">
                      {project.category === 'web' ? '🌐' : '⚙️'}
                    </div>
                    <span>Project Preview</span>
                  </div>
                </div>
                <div className="project-overlay">
                  <div className={`source-label ${project.isOpenSource ? 'open-source' : 'closed-source'}`}>
                    {project.isOpenSource ? (
                      <span className="source-label-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Open Source
                      </span>
                    ) : (
                      'Closed Source (Temporarily)'
                    )}
                  </div>
                </div>
              </div>
              <div className="project-info">
                <h3 className="project-title">
                  {project.title}
                  {project.isOpenSource && (
                    <span className="external-link-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15,3 21,3 21,9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </span>
                  )}
                </h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-status">
                  <span className={`status-indicator ${project.isOpenSource ? 'open' : 'closed'}`}></span>
                  <span className="status-text">
                    {project.isOpenSource 
                      ? 'Click to view on GitHub' 
                      : 'Will be open-sourced in a month or so'
                    }
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="more-projects-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="more-projects-card">
            <div className="more-projects-content">
              <h3>Explore More Projects</h3>
              <p>
                These are just a few highlights from my development journey. 
                For a complete view of my work, including experiments, contributions, 
                and ongoing projects, check out my GitHub profile.
              </p>
              <motion.a 
                href="https://github.com/gaurishmehra" 
                target="_blank" 
                rel="noopener noreferrer"
                className="github-projects-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="github-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </span>
                View All Projects on GitHub
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;