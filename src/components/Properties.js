import React, { useState } from "react";
import HouseList from "./HouseList";
import "../styles/Properties.css";

const Properties = () => {
    const [sortOption, setSortOption] = useState("price-low");
    const [viewMode, setViewMode] = useState("grid");

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    return (
        <div className="properties-container">
            <header className="properties-header">
                <div className="container">
                    <h1>Discover Your Dream Home</h1>
                    <p>Explore our handpicked selection of premium properties</p>
                </div>
            </header>

            <div className="container">
                <div className="sorting-section">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="view-toggles">
                            <button 
                                className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
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
                            <select 
                                className="form-select"
                                value={sortOption}
                                onChange={handleSortChange}
                            >
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="date">Latest</option>
                            </select>
                        </div>
                    </div>
                </div>

                <HouseList sortOption={sortOption} viewMode={viewMode} />
            </div>
        </div>
    );
};

export default Properties;
