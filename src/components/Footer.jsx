import React from 'react';
import Icon from './Icon';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="brand-logo-small">
              <Icon name="atom" size={20} color="#06b6d4" />
            </div>
            <div>
              <h4 className="footer-title">Physics Simulation Laboratory</h4>
              <p className="footer-desc">
                High-precision, interactive computational physics simulations running entirely in your browser.
              </p>
            </div>
          </div>

          <div className="footer-badges">
            <span className="tech-tag">React 18</span>
            <span className="tech-tag">Vite</span>
            <span className="tech-tag">HTML5 Canvas</span>
            <span className="tech-tag">SI Physics Engine</span>
            <span className="tech-tag">Zero Backend</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} PhysicsLab. Designed for science education & exploratory learning.</p>
          <div className="footer-links">
            <span className="status-indicator">
              <span className="status-ping"></span>
              All systems online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
