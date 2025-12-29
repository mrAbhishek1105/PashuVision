import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Developer from './pages/Developer';
import Predict from './pages/Predict'; // Moved App content here essentially
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/developer" element={<Developer />} />
            <Route path="/predict" element={<Predict />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>© 2026 PashuVision - Innovating for Indian Livestock</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
