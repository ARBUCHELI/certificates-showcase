import React from 'react';
import { motion } from 'framer-motion';
import './CertificateCard.css';

const CertificateCard = ({ certificate, index }) => {
  const imagePath = `/images-certificates/${certificate.image}`;
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className={`certificate-card ${certificate.featured ? 'featured' : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-inner">
        <div className="card-image">
          <img 
            src={imagePath} 
            alt={certificate.title}
            loading="lazy"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23667eea" width="300" height="200"/%3E%3Ctext fill="white" font-size="18" font-family="Arial" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ECertificate%3C/text%3E%3C/svg%3E';
            }}
          />
          {certificate.featured && (
            <div className="featured-badge">⭐ Featured</div>
          )}
          <div className="card-overlay">
            <a 
              href={certificate.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="view-btn"
            >
              View Certificate
            </a>
          </div>
        </div>
        
        <div className="card-content">
          <div className="card-type">{certificate.type}</div>
          <h3 className="card-title">{certificate.title}</h3>
          <div className="card-organization">{certificate.organization}</div>
          
          <div className="card-tags">
            {certificate.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;
