import React from 'react';
import { motion } from 'framer-motion';
import './Thoughts.css';

const Thoughts = () => {
  const thoughts = [
    {
      id: 1,
      title: "Open-Source Collaboration",
      excerpt: "Open-source is great for learning and helping others grow—collaboration drives progress in ways closed systems can’t.",
      date: "March 20, 2025",
      category: "Technology"
    },
    {
      id: 2,
      title: "What LLMs Really Are",
      excerpt: "LLMs aren’t 'AI'—they’re stacks of math equations predicting the next word, yet they’re transforming how we interact with tech.",
      date: "March 10, 2025",
      category: "Technology"
    },
    {
      id: 3,
      title: "The Scale of the Cosmos",
      excerpt: "The observable universe spans 93 billion light-years. We might never find life out there, but that doesn’t mean it’s not waiting.",
      date: "February 25, 2025",
      category: "Space"
    },
    {
      id: 4,
      title: "The Endless Wonder of Pi",
      excerpt: "Pi fascinates me—an irrational constant weaving through math and the cosmos, defying our need for tidy conclusions.",
      date: "February 15, 2025",
      category: "Mathematics"
    },
    {
      id: 5,
      title: "Limits of the Universe",
      excerpt: "Even light has a cap at 299,792 km/s. It’s the universe’s speed limit, a reminder that not everything stretches to infinity.",
      date: "January 30, 2025",
      category: "Space"
    },
    {
      id: 6,
      title: "The Mind-Blowing Scale of 52!",
      excerpt: "52! is roughly 8.065 × 10⁶⁷—a number so vast it outstrips the atoms in the universe, showing how fast factorials explode.",
      date: "January 10, 2025",
      category: "Mathematics"
    }
  ];

  return (
    <section id="thoughts" className="section thoughts-section">
      <div className="thoughts-container">
        <motion.div 
          className="section-title-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">My Thoughts</h2>
          <div className="cosmos-divider">
            <div className="planet-small"></div>
            <div className="line"></div>
            <div className="planet-medium"></div>
            <div className="line"></div>
            <div className="planet-small"></div>
          </div>
          <p className="thoughts-intro">
            Here are some of my recent reflections on technology, space, and the patterns of the universe.
          </p>
        </motion.div>

        <div className="thoughts-grid">
          {thoughts.map((thought, index) => (
            <motion.div 
              className="thought-card"
              key={thought.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="thought-content">
                <div className="thought-category">{thought.category}</div>
                <h3 className="thought-title">{thought.title}</h3>
                <p className="thought-excerpt">{thought.excerpt}</p>
                <div className="thought-date">{thought.date}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Thoughts;