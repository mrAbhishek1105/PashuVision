import React from 'react';
import PropTypes from 'prop-types';
import './BreedCard.css';

const BreedCard = ({ result, loading }) => {

    if (loading) {
        return (
            <div className="breed-card loading">
                <div className="spinner"></div>
                <p>Analyzing image...</p>
            </div>
        );
    }

    if (!result) return null;

    const { breed, confidence, category, info = {} } = result;

    return (
        <div className="breed-card fade-in">

            <div className="breed-header">
                <h2>{breed}</h2>
                <span className={`badge ${category.toLowerCase()}`}>{category}</span>
                <span className="confidence">
                    {(confidence * 100).toFixed(1)}% Match
                </span>
            </div>

            <div className="breed-info">

                {/* Core Description */}
                {info.description && (
                    <p><strong>Description:</strong> {info.description}</p>
                )}

                {/* Environment & Behaviour */}
                {info.habitat && (
                    <p><strong>Habitat:</strong> {info.habitat}</p>
                )}
                {info.food_habits && (
                    <p><strong>Food Habits:</strong> {info.food_habits}</p>
                )}
                {info.characteristics && (
                    <p><strong>Characteristics:</strong> {info.characteristics}</p>
                )}
                {info.temperament && (
                    <p><strong>Temperament:</strong> {info.temperament}</p>
                )}
                {info.adaptability && (
                    <p><strong>Adaptability:</strong> {info.adaptability}</p>
                )}

                {/* Structured Details Section */}
                <div className="info-grid">

                    {info.origin && (
                        <p><strong>Origin:</strong> {info.origin}</p>
                    )}

                    {info.lifespan && (
                        <p><strong>Lifespan:</strong> {info.lifespan}</p>
                    )}

                    {info.weight && (
                        <p><strong>Weight:</strong> {info.weight}</p>
                    )}

                    {info.milk_yield && (
                        <p><strong>Milk Yield:</strong> {info.milk_yield}</p>
                    )}

                    {info.utility && (
                        <p><strong>Utility:</strong> {info.utility}</p>
                    )}

                    {info.climate_resistance && (
                        <p><strong>Climate Resistance:</strong> {info.climate_resistance}</p>
                    )}

                </div>
            </div>
        </div>
    );
};

BreedCard.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool,
};

export default BreedCard;
