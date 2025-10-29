import React from 'react';
import { motion } from 'framer-motion';
import './FilterChips.css';

const FilterChips = ({ 
  categories, 
  categoryLabels, 
  selectedCategory, 
  setSelectedCategory,
  organizations,
  selectedOrganization,
  setSelectedOrganization
}) => {
  return (
    <div className="filters-container">
      {/* Category Filters */}
      <div className="filter-group">
        <h4 className="filter-label">Categories</h4>
        <div className="filter-chips">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`filter-chip ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {categoryLabels[category]}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Organization Filter */}
      <div className="filter-group">
        <h4 className="filter-label">Organizations</h4>
        <div className="organization-select">
          <select
            value={selectedOrganization}
            onChange={(e) => setSelectedOrganization(e.target.value)}
            className="org-dropdown"
          >
            {organizations.map(org => (
              <option key={org} value={org}>
                {org === 'all' ? 'All Organizations' : org}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterChips;
