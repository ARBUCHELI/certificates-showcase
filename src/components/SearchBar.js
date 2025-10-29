import React from 'react';
import { motion } from 'framer-motion';
import './SearchBar.css';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <motion.div 
      className="search-bar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="search-icon">🔍</div>
      <input
        type="text"
        placeholder="Search certificates, technologies, or organizations..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      {searchQuery && (
        <button 
          className="clear-search"
          onClick={() => setSearchQuery('')}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </motion.div>
  );
};

export default SearchBar;
