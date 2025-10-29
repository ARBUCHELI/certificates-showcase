import React from 'react';
import { motion } from 'framer-motion';
import './Stats.css';

const Stats = ({ stats }) => {
  const statItems = [
    { label: 'Total Certificates', value: stats.total, icon: '📜', color: '#667eea' },
    { label: 'Learning Platforms', value: stats.platforms, icon: '🎓', color: '#764ba2' },
    { label: 'Major Scholarships', value: stats.scholarships, icon: '🏆', color: '#f093fb' },
    { label: 'Featured', value: stats.featured || 0, icon: '⭐', color: '#4facfe' }
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <motion.div 
          className="stats-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {statItems.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
                {stat.icon}
              </div>
              <div className="stat-value">{stat.value}+</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
