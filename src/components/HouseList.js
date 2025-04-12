import React, { useState, useEffect } from 'react';
import { fetchHouses } from '../services/houseService';

const HouseList = ({ sortOption, filters }) => {
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getHouses = async () => {
            try {
                setLoading(true);
                const data = await fetchHouses();
                setHouses(data);
            } catch (error) {
                console.error('Failed to fetch houses:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getHouses();
    }, []);

    const sortHouses = (houses) => {
        return [...houses].sort((a, b) => {
            if (sortOption === 'price-low') return a.price - b.price;
            if (sortOption === 'price-high') return b.price - a.price;
            if (sortOption === 'date') return new Date(b.date_posted) - new Date(a.date_posted);
            return 0;
        });
    };

    if (loading) return <div className="loading-spinner">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    const sortedHouses = sortHouses(houses);

    return (
        <div className="container mt-4">
            <div className="row g-4">
                {sortedHouses.length === 0 ? (
                    <div className="no-results">No houses available</div>
                ) : (
                    sortedHouses.map((house, index) => (
                        <div className="col-md-4 mb-4" key={house.id}
                             style={{ animation: `slideIn 0.5s ease-out forwards ${index * 0.1}s` }}>
                            <div className="card h-100 house-card">
                                <div className="card-img-overlay">
                                    <span className="badge bg-primary">{house.propertyType}</span>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{house.title}</h5>
                                    <p className="card-text description">{house.description}</p>
                                    <div className="property-features">
                                        <span><i className="fas fa-map-marker-alt"></i> {house.location}</span>
                                        <span><i className="fas fa-bed"></i> {house.bedrooms} beds</span>
                                    </div>
                                    <div className="price-tag">
                                        ${house.price.toLocaleString()}
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">Listed by {house.seller_name}</small>
                                    <button className="btn btn-primary float-end">View Details</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HouseList;