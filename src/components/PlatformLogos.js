import React from 'react';
import { motion } from 'framer-motion';
import './PlatformLogos.css';

const PlatformLogos = ({ logos }) => {
  return (
    <section className="platforms-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Learning Platforms</h2>
          <p className="section-subtitle">
            Certifications from leading educational technology platforms
          </p>
        </motion.div>

        <div className="platforms-grid">
          {logos.map((platform, index) => (
            <motion.div
              key={platform.name}
              className="platform-logo-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1, rotate: 2 }}
            >
              <img
                src={`/platforms/${platform.image}`}
                alt={platform.name}
                className="platform-logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="platform-fallback" style={{ display: 'none' }}>
                {platform.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformLogos;
