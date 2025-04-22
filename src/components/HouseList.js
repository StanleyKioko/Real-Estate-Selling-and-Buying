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
                console.log('Fetched houses:', data); // Debug log
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
                        <div className="col-md-4 mb-4" key={house.id}>
                            <div className="card h-100 house-card">
                                <div className="card-body">
                                    <h5 className="card-title">{house.title}</h5>
                                    <p className="card-text">{house.description}</p>
                                    <p className="card-text">
                                        <strong>Price:</strong> ${Number(house.price).toLocaleString()}
                                    </p>
                                    <p className="card-text">
                                        <strong>Location:</strong> {house.location}
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">Listed by {house.seller_name}</small>
                                    </p>
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