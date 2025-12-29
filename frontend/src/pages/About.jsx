import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
    return (
        <motion.div
            className="page-container"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
        >
            <h1>About PashuVision</h1>
            <p className="intro-text">
                **PashuVision** is an AI-powered livestock identification platform tailored for the unique biodiversity of India.
                We combine state-of-the-art Computer Vision with a deep understanding of indigenous breeds to solve real-world agricultural challenges.
            </p>

            <div className="about-content">
                <section>
                    <h2>The Problem 📉</h2>
                    <p>
                        India is home to the world's largest livestock population, yet <strong>breed dilution</strong> and lack of formal records pose major threats.
                        Farmers often struggle to distinguish between genetically similar breeds (e.g., *Sahiwal* vs *Red Sindhi*), leading to poor breeding decisions and economic loss.
                    </p>
                </section>

                <section>
                    <h2>Our Vision 🚀</h2>
                    <p>
                        To democratize access to veterinary-grade identification tools.
                        We envision a future where every farmer has an "expert in their pocket"—a smartphone app that can instantly verify breed purity, estimate milk yield potential, and suggest optimal care.
                    </p>
                </section>

                <section>
                    <h2>Under the Hood: The Tech 🧠</h2>
                    <p>
                        PashuVision isn't just a database; it's a thinking engine. We utilize **Transfer Learning** on the **MobileNetV2** architecture.
                    </p>
                    <ul>
                        <li><strong>Convolutional Neural Networks (CNNs)</strong>: Specifically tuned to recognize texture patterns of cattle skin and horn geometry.</li>
                        <li><strong>Edge Efficiency</strong>: Optimized for low-latency inference (&lt;200ms), making it viable for rural areas with poor connectivity.</li>
                        <li><strong>Scalable Backend</strong>: Built on Flask to handle concurrent requests seamlessly.</li>
                    </ul>
                </section>

                <section>
                    <h2>Disclaimer ⚠️</h2>
                    <p>
                        While PashuVision uses high-accuracy models (&gt;90%), it is currently a research prototype.
                        It intends to assist, not replace, certified **Veterinary Officers**. For medical diagnoses, always consult a professional.
                    </p>
                </section>

                <section>
                    <h2>Technical Report</h2>
                    <p>
                        Interested in the code? Read our detailed technical report:
                        <br />
                        <div className="report-links">
                            <a href="/PROJECT_REPORT.md" target="_blank" rel="noopener noreferrer" className="report-link">📄 Project Report</a>
                            <a href="/MODEL_DOCUMENTATION.md" target="_blank" rel="noopener noreferrer" className="report-link secondary">🧠 Model Deep Dive</a>
                        </div>
                    </p>
                </section>
            </div>
        </motion.div>
    );
};

export default About;
