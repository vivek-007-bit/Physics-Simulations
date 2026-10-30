import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import './SimulationLayout.css';

export default function SimulationLayout({ simulation, children }) {
  const { title, description, category, difficulty, slug } = simulation || {};

  return (
    <div className="sim-layout">
      {/* Simulation Page Top Bar */}
      <div className="sim-topbar">
        <div className="sim-topbar-container">
          <Link to="/" className="back-link">
            <Icon name="arrow-left" size={16} />
            <span>All Simulations</span>
          </Link>

          <div className="sim-breadcrumbs">
            <span className="crumb-root">Simulations</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-category">{category || 'Physics'}</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">{title || slug}</span>
          </div>

          <div className="sim-topbar-meta">
            {difficulty && (
              <span className="sim-meta-pill difficulty">
                {difficulty}
              </span>
            )}
            <span className="sim-meta-pill engine">
              <span className="dot"></span>
              Real-time SI
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="sim-main-container">
        <header className="sim-header">
          <div className="sim-header-info">
            <h1 className="sim-page-title">{title}</h1>
            {description && <p className="sim-page-desc">{description}</p>}
          </div>
        </header>

        {/* Children simulation component */}
        <div className="sim-content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
}
