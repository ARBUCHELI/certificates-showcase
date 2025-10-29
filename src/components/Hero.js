import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = ({ stats }) => {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      <div className="hero-content">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Professional <span className="gradient-text">Certifications</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            A comprehensive collection of technology certifications, continuous learning, and professional development
          </motion.p>

          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="hero-stat">
              <div className="stat-number">{stats.total}+</div>
              <div className="stat-label">Certificates</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">{stats.platforms}+</div>
              <div className="stat-label">Platforms</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">{stats.scholarships}</div>
              <div className="stat-label">Scholarships</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="scroll-arrow"></div>
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
