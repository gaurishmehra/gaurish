import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: "redacted",
      description: "redacted",
      category: "web",
      image: "redacted.jpg",
      technologies: ["redacted", "redacted", "redacted", "redacted"],
      status: "closed-source"
    },
    {
      id: 2,
      title: "redacted",
      description: "redacted",
      category: "web",
      image: "redacted.jpg",
      technologies: ["redacted", "redacted", "redacted", "redacted"],
      status: "closed-source"
    },
    {
      id: 3,
      title: "redacted",
      description: "redacted",
      category: "design",
      image: "redacted.jpg",
      technologies: ["redacted", "redacted", "redacted", "redacted"],
      status: "closed-source"
    },
    {
      id: 4,
      title: "redacted",
      description: "redacted",
      category: "mobile",
      image: "redacted.jpg",
      technologies: ["redacted", "redacted", "redacted", "redacted"],
      status: "closed-source"
    },
    {
      id: 5,
      title: "redacted",
      description: "redacted",
      category: "web",
      image: "redacted.jpg",
      technologies: ["redacted", "redacted", "redacted", "redacted"],
      status: "closed-source"
    },
    {
      id: 6,
      title: "redacted",
      description: "redacted",
      category: "design",
      image: "redacted.jpg",
      technologies: ["redacted", "redacted", "redacted", "redacted"],
      status: "closed-source"
    }
  ];
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  
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
            Explore my cosmic collection of web development and design projects. 
            Each one represents a unique journey into the digital universe.
          </p>
        </motion.div>
        
        <motion.div 
          className="closed-source-message"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="message-card">
            <div className="message-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <div className="message-content">
              <h3>Projects Currently Closed Source</h3>
              <p>I'm currently focusing on my examinations, so all my projects are temporarily closed source to help me avoid distractions. Most likely, I will open source everything by the end of May!</p>
              <p>Thanks for your understanding and check back soon!</p>
            </div>
          </div>
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
            className={`filter-button ${activeFilter === 'mobile' ? 'active' : ''}`}
            onClick={() => setActiveFilter('mobile')}
          >
            Mobile
          </button>
          <button 
            className={`filter-button ${activeFilter === 'design' ? 'active' : ''}`}
            onClick={() => setActiveFilter('design')}
          >
            Design
          </button>
        </motion.div>
        
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <motion.div 
              className="project-card"
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} className="project-img" />
                <div className="project-overlay">
                  <div className="closed-source-label">Soon</div>
                </div>
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-status">
                  <span className="status-indicator"></span>
                  <span className="status-text">Temporarily Closed Source</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;