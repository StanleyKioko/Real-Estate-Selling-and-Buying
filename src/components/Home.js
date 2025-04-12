import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
    return (
        <div className="home">
            <div className="hero-section">
                <div className="container">
                    <h1>Find Your Dream Home</h1>
                    <p>Discover the perfect property for you and your family</p>
                    <Link to="/properties" className="btn btn-primary btn-lg">View Properties</Link>
                </div>
            </div>
            
            <div className="container mt-5">
                <div className="row features-section">
                    <div className="col-md-4">
                        <div className="feature-card">
                            <i className="fas fa-home"></i>
                            <h3>Wide Selection</h3>
                            <p>Browse through our extensive collection of properties</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature-card">
                            <i className="fas fa-dollar-sign"></i>
                            <h3>Best Prices</h3>
                            <p>Find properties that fit your budget</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature-card">
                            <i className="fas fa-star"></i>
                            <h3>Top Rated</h3>
                            <p>Trusted by thousands of satisfied customers</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
