import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">🐄 PashuVision</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                <Link to="/predict" className={location.pathname === '/predict' ? 'active' : ''}>Predict</Link>
                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                <Link to="/developer" className={location.pathname === '/developer' ? 'active' : ''}>Developer</Link>
            </div>
        </nav>
    );
};

export default Navbar;
