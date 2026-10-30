import React, { useState, useMemo } from 'react';
import { getAllSimulations, getCategories } from '../utils/simulationDiscovery';
import SimulationCard from '../components/SimulationCard';
import Icon from '../components/Icon';
import './Home.css';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamically discovered simulations
  const allSimulations = useMemo(() => getAllSimulations(), []);
  const categories = useMemo(() => getCategories(), []);

  // Filtered simulations based on category and search
  const filteredSimulations = useMemo(() => {
    return allSimulations.filter((sim) => {
      const matchesCategory =
        selectedCategory === 'All' || sim.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        sim.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sim.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sim.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [allSimulations, selectedCategory, searchQuery]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow"></div>
        <div className="hero-container">
          <div className="hero-pill animate-fade-in">
            <Icon name="sparkles" size={14} color="#06b6d4" />
            <span>Interactive Virtual Laboratory</span>
          </div>

          <h1 className="hero-title animate-fade-in">
            Explore Physics Concepts with <br />
            <span className="hero-gradient-text">Real-Time Interactive Simulations</span>
          </h1>

          <p className="hero-description animate-fade-in">
            Experiment with kinematics, gravitational dynamics, and Newtonian mechanics directly in your browser.
            Adjust real physical parameters, visualize vector decomposition, and observe mathematical formulas come to life.
          </p>

          <div className="hero-stats animate-fade-in">
            <div className="stat-card">
              <span className="stat-value mono">{allSimulations.length}</span>
              <span className="stat-label">Active Modules</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <span className="stat-value mono">60 FPS</span>
              <span className="stat-label">Canvas Precision</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <span className="stat-value mono">100%</span>
              <span className="stat-label">Client-Side Physics</span>
            </div>
          </div>
        </div>
      </section>

      {/* Directory & Simulation Controls */}
      <section className="directory-section" id="simulations-directory">
        <div className="directory-container">
          <div className="directory-header">
            <div>
              <h2 className="section-title">Available Simulations</h2>
              <p className="section-subtitle">
                Select any module below to launch the dedicated physics workspace.
              </p>
            </div>

            {/* Search Input */}
            <div className="search-box">
              <Icon name="search" size={16} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search simulations, concepts, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
                {cat === 'All' && (
                  <span className="tab-count mono">{allSimulations.length}</span>
                )}
              </button>
            ))}
          </div>

          {/* Dynamic Simulation Cards Grid */}
          {filteredSimulations.length > 0 ? (
            <div className="simulations-grid">
              {filteredSimulations.map((simulation) => (
                <SimulationCard key={simulation.slug} simulation={simulation} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <Icon name="info" size={32} color="var(--accent-cyan)" />
              </div>
              <h3>No simulations found</h3>
              <p>No module matched your search query "{searchQuery}".</p>
              <button
                className="reset-filter-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Laboratory Features / Architecture Section */}
      <section className="features-section" id="theory">
        <div className="features-container">
          <div className="features-header">
            <h2 className="section-title">Built for Discovery & Accuracy</h2>
            <p className="section-subtitle">
              Engineered with SI dimensional accuracy, coordinate projection, and an extensible module architecture.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4' }}>
                <Icon name="gauge" size={24} />
              </div>
              <h3 className="feature-title">SI Unit Precision</h3>
              <p className="feature-desc">
                Calculations are executed strictly in physical dimensions (meters, seconds, m/s²) and dynamically projected onto canvas coordinates with automatic zoom and aspect scaling.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
                <Icon name="zap" size={24} />
              </div>
              <h3 className="feature-title">Zero-Backend Architecture</h3>
              <p className="feature-desc">
                Runs 100% locally in the browser with high-efficiency requestAnimationFrame timing. No network latency, no server dependencies, completely static deployment.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <Icon name="layers" size={24} />
              </div>
              <h3 className="feature-title">Automatic Module Discovery</h3>
              <p className="feature-desc">
                New simulations are discovered automatically via Vite's dynamic import scanner. Adding a new physics module requires zero edits to the central router or landing page.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
