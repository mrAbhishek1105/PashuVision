import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

import HeroBackground from '../components/HeroBackground';

const Home = () => {
    return (
        <div className="home-container">
            <HeroBackground />
            <motion.div
                className="hero-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1>Identify Indian Cattle Breeds with PashuVision</h1>
                <p>State-of-the-art Deep Learning tailored for India's Livestock.</p>
                <div className="hero-buttons">
                    <Link to="/predict" className="btn btn-primary">Try Prediction</Link>
                    <Link to="/about" className="btn btn-secondary">Learn More</Link>
                </div>
            </motion.div>

            <motion.div
                className="features-grid"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                <div className="feature-card">
                    <h3>⚡ Fast & Accurate</h3>
                    <p>Powered by MobileNetV2 for real-time mobile-ready inference.</p>
                </div>
                <div className="feature-card">
                    <h3>🐄 5+ Native Breeds</h3>
                    <p>Specific support for Gir, Sahiwal, Red Sindhi, Murrah, and Jaffarabadi.</p>
                </div>
                <div className="feature-card">
                    <h3>🔍 Detailed Insights</h3>
                    <p>Get habitat, diet, and milk yield info instantly.</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Home;
