import React from 'react';
import { motion } from 'framer-motion';
import './Developer.css';

const Developer = () => {
    // Staggered Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3 // Delay between cards
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            className="page-container"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <h1>Meet the Creators</h1>

            <div className="dev-stack">
                {/* Developer 1: Abhishek */}
                <motion.div className="dev-card" variants={cardVariants}>
                    <div className="dev-avatar">👨‍💻</div>
                    <h2>Abhishek</h2>
                    <p className="dev-role">Full Stack AI Engineer</p>

                    <p className="dev-bio">
                        Architected the entire PashuVision ecosystem.
                        Specializes in Machine Learning models, Backend API development, and System Integration.
                    </p>

                    <div className="skills-container">
                        <span className="skill-tag">Python & Flask</span>
                        <span className="skill-tag">TensorFlow</span>
                        <span className="skill-tag">React.js</span>
                        <span className="skill-tag">System Design</span>
                        <span className="skill-tag">OpenCV</span>
                        <span className="skill-tag">Docker</span>
                        <span className="skill-tag">MongoDB</span>
                        <span className="skill-tag">Git</span>
                    </div>

                    <div className="social-links">
                        <a href="https://github.com/mrAbhishek1105" target="_blank" rel="noopener noreferrer" className="social-btn github">GitHub</a>
                        <a href="https://www.linkedin.com/in/abhishek1105/" target="_blank" rel="noopener noreferrer" className="social-btn linkedin">LinkedIn</a>
                        <a href="mailto:abhi115200@gmail.com" className="social-btn email">Email</a>
                        <a href="https://mrabhishek1105.github.io/portfolio/" className="social-btn portfolio">Portfolio</a>
                    </div>
                </motion.div>

                {/* Developer 2: Soni Kumari */}
                <motion.div className="dev-card" variants={cardVariants}>
                    <div className="dev-avatar">👩‍💻</div>
                    <h2>Soni Kumari</h2>
                    <p className="dev-role">Data & Frontend Specialist</p>

                    <p className="dev-bio">
                        Lead the data collection initiative for indigenous breeds.
                        Designed the UI/UX aesthetics and conducted extensive field research for accuracy.
                    </p>

                    <div className="skills-container">
                        <span className="skill-tag">Data Collection</span>
                        <span className="skill-tag">UI/UX Design</span>
                        <span className="skill-tag">Field Research</span>
                        <span className="skill-tag">Frontend</span>
                        <span className="skill-tag">Figma</span>
                        <span className="skill-tag">HTML/CSS</span>
                        <span className="skill-tag">User Testing</span>
                        <span className="skill-tag">Responsive Design</span>
                    </div>

                    <div className="social-links">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-btn github">GitHub</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn linkedin">LinkedIn</a>
                        <a href="mailto:soni@example.com" className="social-btn email">Email</a>
                        <a href="#" className="social-btn instagram">Instagram</a>
                    </div>
                </motion.div>
            </div>

            <motion.div className="mentions text-center mt-4" variants={cardVariants}>
                <p>Guided by our shared passion for technology and agriculture.</p>
            </motion.div>

        </motion.div>
    );
};

export default Developer;
