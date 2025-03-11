import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const ContactSection = ({ setRef }) => (
  <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-4 py-16 bg-transparent relative z-10" ref={(el) => setRef('contact', el)}>
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="max-w-3xl w-full text-center">
      <motion.h2
        className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Initiate Contact
      </motion.h2>
      <motion.p
        className="text-lg text-gray-300 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Ready to embark on a cosmic coding journey together? Let's connect and explore new digital frontiers!
      </motion.p>
      <motion.a
        href="https://x.com/GaurishMehra"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500/40 to-purple-600/40 backdrop-blur-sm text-white font-semibold rounded-full transition-all duration-200 hover:from-pink-600/50 hover:to-purple-700/50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Send size={20} className="mr-2" />
        Let's Chat
      </motion.a>
    </motion.div>
  </section>
);

export default ContactSection;