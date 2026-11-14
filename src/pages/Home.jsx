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
  const discoveredCategories = useMemo(() => getCategories(), []);

  // Filtered simulations based on category and search query
  const filteredSimulations = useMemo(() => {
    return allSimulations.filter((sim) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        sim.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        sim.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sim.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sim.tags && sim.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [allSimulations, selectedCategory, searchQuery]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <p className="hero-overline">Physics Simulation Laboratory</p>
          <h1 className="hero-title">Explore Physics Through Simulation</h1>
          <p className="hero-description">
            Experiment with physical systems, modify parameters, and observe how physical laws
            influence their behaviour in real time. All calculations run locally in your browser.
          </p>
        </div>
      </section>

      {/* Directory Controls & Simulation Cards */}
      <section className="directory-section" id="simulations">
        <div className="directory-container">
          {/* Filter Bar & Search */}
          <div className="directory-controls">
            <div className="category-nav" role="tablist" aria-label="Simulation categories">
              {discoveredCategories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="search-box">
              <Icon name="search" size={15} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search simulations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                aria-label="Search simulations"
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Simulations Grid */}
          {filteredSimulations.length > 0 ? (
            <div className="simulations-grid">
              {filteredSimulations.map((simulation) => (
                <SimulationCard key={simulation.slug} simulation={simulation} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-title">No simulations found</p>
              <p className="empty-desc">No simulation matches "{searchQuery}".</p>
              <button
                className="reset-filter-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Educational Foundations & Theory Overview */}
      <section className="theory-overview-section" id="theory">
        <div className="theory-overview-container">
          <div className="section-header">
            <h2 className="section-title">Physical Models & Educational Foundations</h2>
            <p className="section-subtitle">
              Computational principles and mathematical formulations used across our simulations.
            </p>
          </div>

          <div className="theory-topics-grid">
            <div className="theory-topic-card">
              <h3 className="theory-topic-title">Kinematics & Ballistics</h3>
              <p className="theory-topic-text">
                Parametric equations of motion with orthogonal vector decomposition. Analytical solutions
                for trajectory parabolic arcs, maximum apogee, time-of-flight quadratics, and impact velocities.
              </p>
            </div>

            <div className="theory-topic-card">
              <h3 className="theory-topic-title">Newtonian Gravitation</h3>
              <p className="theory-topic-text">
                Newton's universal law of gravitation (F = G · m₁m₂ / r²). Orbital velocity,
                Kepler's laws, elliptical trajectories, and symplectic Velocity Verlet integration for planetary systems.
              </p>
            </div>

            <div className="theory-topic-card">
              <h3 className="theory-topic-title">Harmonic Oscillations</h3>
              <p className="theory-topic-text">
                Simple harmonic motion, restoring forces, and damping. Exchange between kinetic and gravitational
                potential energy with numerical integration for large-angle non-linear pendulums.
              </p>
            </div>

            <div className="theory-topic-card">
              <h3 className="theory-topic-title">General Relativity & Spacetime Curvature</h3>
              <p className="theory-topic-text">
                Schwarzschild geometry, event horizons (r_s = 2GM/c²), and photon spheres (1.5 r_s).
                Gravitational time dilation, relativistic light deflection, and 3D Flamm embedding curvature.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
