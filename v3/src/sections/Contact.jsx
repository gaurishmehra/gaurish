import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, MapPin, Clock3, Sparkles } from 'lucide-react';

const Contact = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/gaurishmehra', label: 'GitHub' },
    { icon: Twitter, href: 'https://x.com/gaurishmehra', label: 'X' },
  ];

  return (
    <section id="contact" className="section-padding relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-14"
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4 text-star-white">
            Let&apos;s Connect
          </h2>
          <p className="text-star-muted text-lg max-w-xl mx-auto">
            Open to internships, collaborations, and building meaningful products.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-6 md:p-8"
          >
            <h3 className="font-display text-2xl text-star-white mb-5">Current Status</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-rose-soft animate-pulse" />
                <p className="text-star-dim text-base">Available for internships and project collaborations.</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-cosmic-muted text-rose-soft">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-star-muted text-sm">Location</p>
                  <p className="text-star-white">India</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-cosmic-muted text-rose-soft">
                  <Clock3 size={18} />
                </div>
                <div>
                  <p className="text-star-muted text-sm">Timezone</p>
                  <p className="text-star-white">IST (UTC+5:30)</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-5">
              <Sparkles size={16} className="text-rose-soft" />
              <p className="font-mono text-sm uppercase tracking-[0.16em] text-rose-soft">Say Hi!</p>
            </div>

            <p className="text-star-dim mb-6">
              Drop a DM anywhere :)
            </p>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-rose-soft/20 bg-cosmic-muted px-4 py-2 text-sm text-star-dim transition-colors hover:text-rose-soft hover:border-rose-soft/40"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label={label}
                >
                  <Icon size={16} />
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
