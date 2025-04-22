import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addHouse } from '../services/houseService';
import '../styles/AddHouse.css';

const AddHouse = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        seller_name: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formattedData = {
                ...formData,
                price: parseFloat(formData.price)
            };
            console.log('Submitting data:', formattedData); // Debug log
            await addHouse(formattedData);
            setSuccess('House added successfully!');
            setFormData({
                title: '',
                description: '',
                price: '',
                location: '',
                seller_name: ''
            });
            setTimeout(() => {
                navigate('/properties');
            }, 2000);
        } catch (err) {
            console.error('Error details:', err);
            setError('Failed to add house. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container">
            <div className="add-house-container">
                <h2 className="form-heading">Add New Property</h2>
                <div className="form-container">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Seller Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="seller_name"
                                value={formData.seller_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Adding Property...' : 'Add Property'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddHouse;
