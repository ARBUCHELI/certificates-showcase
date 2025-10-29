import React from 'react';
import { motion } from 'framer-motion';
import './FeaturedEducation.css';

const FeaturedEducation = () => {
  const diplomas = [
    {
      id: 1,
      level: "Bachelor's Degree",
      title: "Electronics Engineer",
      institution: "Pontifical Xavierian University",
      founded: "Founded in 1623",
      logo: "/images-education/javeriana.svg.png",
      diploma: "/images-education/diploma.jpg",
      link: "https://www.youtube.com/watch?v=GX1kfHUGp-k"
    },
    {
      id: 2,
      level: "Specialization - Industrial Master's Degree",
      title: "Specialist in Project Management of Telecommunications Engineering",
      institution: "Saint Thomas Aquinas University",
      founded: "Founded in 1580",
      logo: "/images-education/santo-tomas.png",
      diploma: "/images-education/especializacion.jpg",
      link: "https://www.youtube.com/watch?v=muIv2Koppu4"
    },
    {
      id: 3,
      level: "Master's Degree",
      title: "Master in Management of Business and Financial Institutions",
      institution: "Lobachevsky State University Of Nizhny Novgorod UNN",
      founded: "Established in 1916",
      logo: "/images-education/lobachevsky.png",
      diploma: "/images-education/russian-master.jpg",
      link: "https://www.youtube.com/watch?v=XPKybGveEq4"
    },
    {
      id: 4,
      level: "Nanodegree - Front End Developer",
      title: "Front End Developer",
      institution: "Udacity - Bertelsmann",
      founded: "",
      logo: "/images-education/udacity-logo.png",
      diploma: "/images-education/front-end-developer-nanodegree.jpg",
      link: "https://graduation.udacity.com/confirm/e/6df43132-c38c-11ed-a594-4bdd575da368",
      isNanodegree: true
    },
    {
      id: 5,
      level: "Nanodegree - Artificial Intelligence",
      title: "Edge AI For IoT Developers",
      institution: "Udacity - Intel",
      founded: "",
      logo: "/images-education/udacity-logo.png",
      diploma: "/images-education/edgeainanodegree.jpg",
      link: "https://graduation.udacity.com/api/graduation/certificate/GDA3RGZK/download",
      isNanodegree: true
    },
    {
      id: 6,
      level: "Nanodegree - Cloud Computing",
      title: "Hybrid Cloud Engineer",
      institution: "Udacity - Nutanix",
      founded: "",
      logo: "/images-education/udacity-logo.png",
      diploma: "/images-education/nutanixnanodegree.jpg",
      link: "https://graduation.udacity.com/api/graduation/certificate/RMPKKDA6/download",
      isNanodegree: true
    }
  ];

  return (
    <section className="featured-education">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2>🎓 Formal Education</h2>
          <p className="subtitle">Academic Degrees & Professional Nanodegrees</p>
        </motion.div>

        <div className="education-grid">
          {diplomas.map((diploma, index) => (
            <motion.div
              key={diploma.id}
              className="education-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="education-level">{diploma.level}</div>
              
              <div className="education-content">
                <h3 className="education-title">{diploma.title}</h3>
                
                <a 
                  href={diploma.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="education-institution"
                >
                  {diploma.institution}
                  {diploma.founded && <span className="founded"> - {diploma.founded}</span>}
                </a>

                <div className="diploma-images">
                  {diploma.logo && (
                    <img 
                      src={diploma.logo} 
                      alt={`${diploma.institution} logo`}
                      className="institution-logo"
                      loading="lazy"
                    />
                  )}
                  <img 
                    src={diploma.diploma} 
                    alt={`${diploma.title} diploma`}
                    className="diploma-image"
                    loading="lazy"
                  />
                </div>

                {diploma.isNanodegree && (
                  <a 
                    href={diploma.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="verify-link"
                  >
                    ✓ Verified Certificate
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEducation;
