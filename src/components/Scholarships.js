import React from 'react';
import { motion } from 'framer-motion';
import './Scholarships.css';

const Scholarships = ({ scholarships }) => {
  return (
    <section className="scholarships-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">🏆 Major Scholarships</h2>
          <p className="section-subtitle">
            Selected for competitive technology scholarship programs
          </p>
        </motion.div>

        <div className="scholarships-grid">
          {scholarships.map((scholarship, index) => (
            <motion.div
              key={scholarship.id}
              className="scholarship-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <div className="scholarship-logo">
                <img
                  src={`/scholarships/${scholarship.image}`}
                  alt={scholarship.organization}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="scholarship-logo-fallback" style={{ display: 'none' }}>
                  {scholarship.organization}
                </div>
              </div>
              
              <div className="scholarship-content">
                <h3 className="scholarship-title">{scholarship.title}</h3>
                <div className="scholarship-org">{scholarship.organization}</div>
                <div className="scholarship-period">{scholarship.period}</div>
              </div>

              <div className="scholarship-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Scholarships;
