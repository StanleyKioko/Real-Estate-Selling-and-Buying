import React, { useState } from "react";
import HouseList from "./HouseList";
import "../styles/Properties.css"; // Import the styles

const Properties = () => {
  const [sortOption, setSortOption] = useState("price-low");
  const [viewMode, setViewMode] = useState("grid");

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="properties-container">
      <header className="properties-header">
        <h1>Find Your Perfect Home</h1>
        <p>Browse through our exclusive collection of premium properties</p>
      </header>

      <main className="properties-main">
        <div className="sorting-section">
          <div className="view-toggles">
            <button 
              className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setViewMode('grid')}
            >
              <i className="fas fa-th"></i>
            </button>
            <button 
              className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setViewMode('list')}
            >
              <i className="fas fa-list"></i>
            </button>
          </div>
          
          <div className="sort-options">
            <label htmlFor="sort">Sort by:</label>
            <select 
              id="sort" 
              value={sortOption} 
              onChange={handleSortChange}
              className="form-select"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="date">Latest</option>
            </select>
          </div>
        </div>

        <HouseList sortOption={sortOption} viewMode={viewMode} />
      </main>
    </div>
  );
};

export default Properties;
