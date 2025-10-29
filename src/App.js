import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { allCertificates, certificatesByCategory, stats as certStats } from './data/allCertificates';
import { platformLogos, scholarships } from './data/certificateData';
import CertificateCard from './components/CertificateCard';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import PlatformLogos from './components/PlatformLogos';
import Scholarships from './components/Scholarships';
import Stats from './components/Stats';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOrganization, setSelectedOrganization] = useState('all');

  // Use auto-generated certificates
  const certificates = useMemo(() => allCertificates, []);

  // Get unique organizations
  const organizations = useMemo(() => {
    const orgs = new Set();
    certificates.forEach(cert => orgs.add(cert.organization));
    return ['all', ...Array.from(orgs).sort()];
  }, [certificates]);

  // Filter certificates
  const filteredCertificates = useMemo(() => {
    return certificates.filter(cert => {
      const matchesSearch = 
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
      const matchesOrg = selectedOrganization === 'all' || cert.organization === selectedOrganization;
      
      return matchesSearch && matchesCategory && matchesOrg;
    });
  }, [certificates, searchQuery, selectedCategory, selectedOrganization]);

  // Category labels
  const categoryLabels = {
    all: 'All Certificates',
    hackerrank: 'HackerRank Assessments',
    bigTech: 'Big Tech Badges',
    programming: 'Programming & Computer Science',
    teaching: 'Computer Science Teaching',
    webDevelopment: 'Web Development',
    mobileDevelopment: 'Mobile Development',
    aiMachineLearning: 'AI & Machine Learning',
    cloudDevOps: 'Cloud & DevOps',
    dataScience: 'Data Science',
    cybersecurity: 'Cybersecurity',
    projectManagement: 'Project Management & Agile',
    leadership: 'Leadership & Soft Skills',
    design: 'UX/UI Design',
    other: 'Other Certifications'
  };

  // Stats calculation
  const stats = useMemo(() => ({
    total: certificates.length,
    platforms: new Set(certificates.map(c => c.organization)).size,
    scholarships: scholarships.length,
    featured: certificates.filter(c => c.featured).length
  }), [certificates]);

  return (
    <div className="app">
      <Hero stats={stats} />
      
      <main className="main-content">
        {/* Stats Section */}
        <Stats stats={stats} />

        {/* Platform Logos */}
        <PlatformLogos logos={platformLogos} />

        {/* Search and Filters */}
        <section className="search-section">
          <div className="container">
            <SearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
            />
            
            <FilterChips
              categories={Object.keys(categoryLabels)}
              categoryLabels={categoryLabels}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              organizations={organizations}
              selectedOrganization={selectedOrganization}
              setSelectedOrganization={setSelectedOrganization}
            />
          </div>
        </section>

        {/* Certificates Grid */}
        <section className="certificates-section">
          <div className="container">
            <div className="section-header">
              <h2>
                {filteredCertificates.length} {categoryLabels[selectedCategory]}
              </h2>
              <p className="subtitle">
                {searchQuery && `Showing results for "${searchQuery}"`}
                {selectedOrganization !== 'all' && ` from ${selectedOrganization}`}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {filteredCertificates.length > 0 ? (
                <motion.div 
                  className="certificates-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={`${selectedCategory}-${selectedOrganization}-${searchQuery}`}
                >
                  {filteredCertificates.map((cert, index) => (
                    <CertificateCard 
                      key={cert.id} 
                      certificate={cert}
                      index={index}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  className="no-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="no-results-icon">🔍</div>
                  <h3>No certificates found</h3>
                  <p>Try adjusting your search or filters</p>
                  <button 
                    className="reset-btn"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedOrganization('all');
                    }}
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Scholarships Section */}
        {selectedCategory === 'all' && !searchQuery && (
          <Scholarships scholarships={scholarships} />
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>About</h3>
              <p>A comprehensive showcase of professional certifications and continuous learning journey in software engineering and technology.</p>
            </div>
            <div className="footer-section">
              <h3>Quick Stats</h3>
              <ul>
                <li>{stats.total}+ Certificates</li>
                <li>{stats.platforms}+ Learning Platforms</li>
                <li>{stats.scholarships} Major Scholarships</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Connect</h3>
              <div className="social-links">
                <a href="https://github.com/ARBUCHELI" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/andres-r-bucheli/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Andres R. Bucheli. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
