import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ImageUpload from '../components/ImageUpload';
import BreedCard from '../components/BreedCard';
import './Predict.css';

const Predict = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        ownerName: '',
        tagId: '',
        location: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpload = async (file) => {
        // Validation removed as per user request


        setLoading(true);
        setResult(null);
        setError(null);

        const data = new FormData();
        data.append('file', file);
        data.append('owner_name', formData.ownerName);
        data.append('tag_id', formData.tagId);

        try {
            const response = await axios.post('http://localhost:5000/predict', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to get prediction. Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="predict-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="predict-header">
                <h1>🐄 PashuVision Classifier</h1>
                <p>Enter details and upload an image for instant analysis.</p>
            </div>

            <div className="form-section">
                <div className="input-group">
                    <label>Owner Name *</label>
                    <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        placeholder="e.g. Ramesh Kumar"
                    />
                </div>
                <div className="input-group">
                    <label>Tag ID (Optional)</label>
                    <input
                        type="text"
                        name="tagId"
                        value={formData.tagId}
                        onChange={handleInputChange}
                        placeholder="e.g. IN-12345"
                    />
                </div>
            </div>

            <ImageUpload onUpload={handleUpload} />

            {error && <div className="error-message">{error}</div>}

            {(loading || result) && (
                <BreedCard result={result} loading={loading} />
            )}
        </motion.div>
    );
};

export default Predict;
