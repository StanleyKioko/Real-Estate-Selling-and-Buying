import React from 'react';
import '../styles/about.css';

const About = () => {
    return (
        <div className="about-page">
            <div className="container mt-5">
                <h1>About Us</h1>
                <div className="row mt-4">
                    <div className="col-md-6">
                        <h2>Our Story</h2>
                        <p>We are committed to helping people find their perfect homes. With years of experience in real estate, we understand the importance of finding the right property that matches your needs and dreams.</p>
                        <p>Our team of experienced professionals is dedicated to providing exceptional service and ensuring a smooth property buying experience.</p>
                    </div>
                    <div className="col-md-6">
                        <img src="/about-img.jpg" alt="About Us" className="img-fluid rounded shadow" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
