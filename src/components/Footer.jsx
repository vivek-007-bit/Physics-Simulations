import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div>
            <span className="footer-brand">PhysicsLab</span>
            <p className="footer-desc">
              An open educational resource for interactive physics simulations and computational scientific models.
            </p>
          </div>
          <div className="footer-tech">
            <span>Client-side HTML5 Canvas & React</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Physics Simulation Laboratory. Built for educational exploration.</p>
        </div>
      </div>
    </footer>
  );
}
