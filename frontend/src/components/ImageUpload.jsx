import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ImageUpload.css';

const ImageUpload = ({ onUpload }) => {
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            onUpload(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            onUpload(file);
        }
    };

    return (
        <div
            className="upload-container"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <input
                type="file"
                id="fileInput"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                hidden
            />
            <label htmlFor="fileInput" className="upload-label">
                {preview ? (
                    <img src={preview} alt="Preview" className="image-preview" />
                ) : (
                    <div className="upload-placeholder">
                        <span className="icon">📷</span>
                        <p>Click or Drag Image Here</p>
                    </div>
                )}
            </label>
        </div>
    );
};

ImageUpload.propTypes = {
    onUpload: PropTypes.func.isRequired,
};

export default ImageUpload;
