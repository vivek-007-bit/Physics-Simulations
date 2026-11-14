import React, { useState } from 'react';
import Icon from '../../../components/Icon';

export default function SolarExperiments({
  onApplyExperiment,
  onAddCustomBody,
  onRemoveCustomBody,
  customBodies = [],
  activeExperimentId,
}) {
  // Form state for adding a hypothetical planet
  const [customName, setCustomName] = useState('Planet X');
  const [customMass, setCustomMass] = useState(5.97e24); // Earth mass
  const [customDistAU, setCustomDistAU] = useState(2.7); // Asteroid belt distance
  const [customSpeedKmS, setCustomSpeedKmS] = useState(18.0);
  const [customAngleDeg, setCustomAngleDeg] = useState(45);
  const [isRetrograde, setIsRetrograde] = useState(false);
  const [customColor, setCustomColor] = useState('#ec4899');

  const experimentsList = [
    {
      id: 'escape_velocity',
      title: 'Experiment 1: Hyperbolic Escape Trajectory',
      tag: 'Kinematics & Escape Velocity',
      description:
        'Increase Earth\'s orbital velocity to 1.45× circular speed (exceeding √2 ≈ 1.414). Observe the eccentricity exceed 1.0 as Earth breaks free of the Sun\'s gravitational well and escapes into interstellar space.',
      actionLabel: 'Launch Escape Trajectory',
      setup: {
        gravityMultiplier: 1.0,
        selectedPlanetId: 'earth',
        planetOverrides: { earth: { velocityMultiplier: 1.45, massMultiplier: 1.0 } },
        allowSunMotion: false,
        isolatePlanetId: null,
      },
    },
    {
      id: 'weak_gravity',
      title: 'Experiment 2: Weakened Gravitational Constant',
      tag: 'Universal Gravitation',
      description:
        'Reduce the universal gravitational constant G to 0.35×. Observe how weakening the central attraction causes all planetary orbits to expand dramatically into wider, slower elliptical paths.',
      actionLabel: 'Apply Weak Gravity (0.35x)',
      setup: {
        gravityMultiplier: 0.35,
        planetOverrides: {},
        allowSunMotion: false,
        isolatePlanetId: null,
      },
    },
    {
      id: 'strong_gravity',
      title: 'Experiment 3: Supercharged Gravitational Attraction',
      tag: 'Universal Gravitation',
      description:
        'Increase gravitational strength G to 2.2×. Observe the planets plunge inward towards the Sun, accelerating to extreme orbital velocities to supply the immense required centripetal force.',
      actionLabel: 'Apply Strong Gravity (2.2x)',
      setup: {
        gravityMultiplier: 2.2,
        planetOverrides: {},
        allowSunMotion: false,
        isolatePlanetId: null,
      },
    },
    {
      id: 'massive_earth',
      title: 'Experiment 4: Super-Earth Gravitational Perturbation',
      tag: 'Multi-Body Perturbations',
      description:
        'Scale Earth\'s mass to 500× actual mass (approaching Jupiter\'s scale). Observe how mutual multi-body gravitational forces perturb the orbital paths of nearby Venus and Mars over time.',
      actionLabel: 'Set Earth to 500x Mass',
      setup: {
        gravityMultiplier: 1.0,
        selectedPlanetId: 'earth',
        planetOverrides: { earth: { massMultiplier: 500.0, velocityMultiplier: 1.0 } },
        allowSunMotion: false,
        isolatePlanetId: null,
      },
    },
    {
      id: 'slow_mars',
      title: 'Experiment 5: Orbital Velocity Reduction on Mars',
      tag: 'Orbital Eccentricity',
      description:
        'Cut Mars\'s orbital velocity to 0.65× normal. Because velocity is insufficient for circular equilibrium, Mars drops into a highly eccentric orbit whose perihelion dives inside Earth\'s orbit close to the Sun.',
      actionLabel: 'Decelerate Mars to 0.65x',
      setup: {
        gravityMultiplier: 1.0,
        selectedPlanetId: 'mars',
        planetOverrides: { mars: { velocityMultiplier: 0.65, massMultiplier: 1.0 } },
        allowSunMotion: false,
        isolatePlanetId: null,
      },
    },
    {
      id: 'two_body_barycenter',
      title: 'Experiment 6: Two-Body Binary Barycenter (Sun + Jupiter)',
      tag: 'Two-Body Problem',
      description:
        'Isolate the Sun and Jupiter. Rather than holding the Sun stationary, both massive bodies orbit their mutual center of mass (barycenter), which lies just outside the Sun\'s physical radius.',
      actionLabel: 'Run Isolated Two-Body System',
      setup: {
        gravityMultiplier: 1.0,
        selectedPlanetId: 'jupiter',
        isolatePlanetId: 'jupiter',
        allowSunMotion: true,
        planetOverrides: {},
      },
    },
  ];

  const handleCreateCustom = (e) => {
    e.preventDefault();
    const newBody = {
      id: `custom_${Date.now()}`,
      name: customName || 'Custom Planet',
      mass: Number(customMass) || 5.97e24,
      distanceAU: Number(customDistAU) || 2.5,
      speedKmS: Number(customSpeedKmS) || 20.0,
      angleDeg: Number(customAngleDeg) || 0,
      isRetrograde: Boolean(isRetrograde),
      color: customColor,
      radiusKm: 6000,
      displayRadius: 6,
    };
    onAddCustomBody(newBody);
  };

  return (
    <div className="solar-experiments-container">
      <div className="experiments-intro">
        <h2>Gravitational Physics Laboratory Experiments</h2>
        <p>
          Select a pre-configured physical experiment to observe how altering fundamental constants, initial
          velocities, or celestial masses impacts the orbital stability of the solar system.
        </p>
      </div>

      {/* Predefined Experiments Grid */}
      <div className="experiments-cards-grid">
        {experimentsList.map((exp) => (
          <div
            key={exp.id}
            className={`experiment-card ${activeExperimentId === exp.id ? 'active' : ''}`}
          >
            <div className="exp-card-header">
              <span className="exp-tag">{exp.tag}</span>
              <h3>{exp.title}</h3>
            </div>
            <p className="exp-desc">{exp.description}</p>
            <button
              className="primary-btn exp-btn"
              onClick={() => onApplyExperiment(exp)}
            >
              <Icon name="atom" size={15} />
              <span>{exp.actionLabel}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Experiment 7: Add a Hypothetical Celestial Body */}
      <div className="custom-body-section">
        <div className="section-head">
          <span className="exp-tag">Experiment 7: Custom Body Simulation</span>
          <h3>Add a Hypothetical Celestial Body</h3>
          <p>
            Inject a custom planet or asteroid with arbitrary mass, initial distance, speed, and inclination.
            The new body will fully participate in all N-body gravitational equations.
          </p>
        </div>

        <form className="custom-body-form" onSubmit={handleCreateCustom}>
          <div className="form-grid">
            <div className="form-group">
              <label>Body Name:</label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="input-text"
                placeholder="e.g. Planet Nine"
                required
              />
            </div>

            <div className="form-group">
              <label>Mass (kg):</label>
              <input
                type="number"
                value={customMass}
                onChange={(e) => setCustomMass(e.target.value)}
                step="any"
                className="input-text mono"
                required
              />
              <span className="input-hint">Earth = 5.97e24 kg</span>
            </div>

            <div className="form-group">
              <label>Initial Distance (AU):</label>
              <input
                type="number"
                value={customDistAU}
                onChange={(e) => setCustomDistAU(e.target.value)}
                step="0.1"
                min="0.2"
                max="40"
                className="input-text mono"
                required
              />
            </div>

            <div className="form-group">
              <label>Orbital Speed (km/s):</label>
              <input
                type="number"
                value={customSpeedKmS}
                onChange={(e) => setCustomSpeedKmS(e.target.value)}
                step="0.5"
                min="1"
                max="80"
                className="input-text mono"
                required
              />
              <span className="input-hint">Circular ~29.8 / √r km/s</span>
            </div>

            <div className="form-group">
              <label>Position Angle (°):</label>
              <input
                type="number"
                value={customAngleDeg}
                onChange={(e) => setCustomAngleDeg(e.target.value)}
                min="0"
                max="360"
                className="input-text mono"
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={isRetrograde}
                  onChange={(e) => setIsRetrograde(e.target.checked)}
                />
                <span>Retrograde Orbit (Clockwise)</span>
              </label>
            </div>
          </div>

          <div className="form-actions-row">
            <button type="submit" className="primary-btn">
              <span>+ Inject Celestial Body into System</span>
            </button>
          </div>
        </form>

        {/* List of active custom bodies */}
        {customBodies.length > 0 && (
          <div className="custom-bodies-list">
            <h4>Active Hypothetical Bodies ({customBodies.length}):</h4>
            <div className="custom-pills-row">
              {customBodies.map((cb) => (
                <div key={cb.id} className="custom-body-pill">
                  <span className="color-dot" style={{ backgroundColor: cb.color }}></span>
                  <strong>{cb.name}</strong>
                  <span className="mono">({cb.distanceAU} AU, {cb.speedKmS} km/s)</span>
                  <button
                    className="remove-pill-btn"
                    onClick={() => onRemoveCustomBody(cb.id)}
                    title="Remove this custom body"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
