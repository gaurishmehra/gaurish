import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Cpu, Coffee, MapPin, Calendar } from 'lucide-react';

const Now = () => {
  const currentItems = [
    {
      icon: MapPin,
      label: 'Location',
      value: 'India',
      color: 'text-rose-soft',
    },
    {
      icon: Calendar,
      label: 'Age',
      value: '18',
      color: 'text-nebula-light',
    },
    {
      icon: BookOpen,
      label: 'Studying',
      value: 'Computer Science',
      color: 'text-rose-soft',
    },
    {
      icon: Code,
      label: 'Building',
      value: 'Personal tools, Llm finetunes, Cool dotfiles',
      color: 'text-nebula-light',
    },
    {
      icon: Cpu,
      label: 'Learning',
      value: 'A little bit of everything',
      color: 'text-rose-soft',
    },
    {
      icon: Coffee,
      label: 'Current mood',
      value: 'Ready to build',
      color: 'text-nebula-light',
    },
  ];

  return (
    <section id="now" className="section-padding relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4 text-star-white">
            Right Now
          </h2>
          <p className="text-star-muted text-lg max-w-2xl">
            A snapshot of what I'm currently focused on. Updated as life evolves.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-xl p-6 hover-lift group"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-cosmic-muted ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="text-star-muted text-sm mb-1 font-mono uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="text-star-white font-medium">
                    {item.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-star-muted text-sm font-mono">
            Last updated: February 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Now;
