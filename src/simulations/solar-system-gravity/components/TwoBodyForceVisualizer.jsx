import React, { useState } from 'react';
import { computeMutualGravitationalForce } from '../physics.js';

export default function TwoBodyForceVisualizer({
  bodies,
  gravityMultiplier = 1.0,
}) {
  const [bodyAId, setBodyAId] = useState('sun');
  const [bodyBId, setBodyBId] = useState('earth');

  const bodyA = bodies.find((b) => b.id === bodyAId) || bodies[0];
  const bodyB = bodies.find((b) => b.id === bodyBId) || bodies[3] || bodies[1];

  const forceData = computeMutualGravitationalForce(bodyA, bodyB, gravityMultiplier);

  return (
    <div className="two-body-force-card">
      <div className="card-header">
        <h3>Gravitational Force Pair Visualizer</h3>
        <span className="card-subtitle">
          Newton's Law of Universal Gravitation: F = G · (m₁ · m₂) / r²
        </span>
      </div>

      {/* Selectors for Body A and Body B */}
      <div className="force-selectors-row">
        <div className="selector-field">
          <label htmlFor="body-a-select">Body A (Source/Attractor):</label>
          <select
            id="body-a-select"
            value={bodyAId}
            onChange={(e) => setBodyAId(e.target.value)}
            className="body-dropdown"
          >
            {bodies.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.isSun ? 'Star' : b.type || 'Planet'})
              </option>
            ))}
          </select>
        </div>

        <div className="mutual-force-badge">
          <span>⇄ Equal & Opposite Forces (Newton's 3rd Law)</span>
        </div>

        <div className="selector-field">
          <label htmlFor="body-b-select">Body B (Interacting Object):</label>
          <select
            id="body-b-select"
            value={bodyBId}
            onChange={(e) => setBodyBId(e.target.value)}
            className="body-dropdown"
          >
            {bodies.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.isSun ? 'Star' : b.type || 'Planet'})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Numerical Force & Acceleration Breakdown */}
      <div className="force-metrics-grid">
        <div className="force-stat-box">
          <span className="stat-title">Separation Distance (r)</span>
          <strong className="stat-val mono">{forceData.distanceAU.toFixed(3)} AU</strong>
          <span className="stat-sub">({(forceData.distanceKm / 1e6).toFixed(2)} Million km)</span>
        </div>

        <div className="force-stat-box highlight">
          <span className="stat-title">Gravitational Force (F)</span>
          <strong className="stat-val mono">{forceData.forceNewtons.toExponential(4)} N</strong>
          <span className="stat-sub">Mutual attraction acting along center-line</span>
        </div>

        <div className="force-stat-box">
          <span className="stat-title">Acceleration on {bodyA.name}</span>
          <strong className="stat-val mono">{forceData.accelAMs2.toExponential(3)} m/s²</strong>
          <span className="stat-sub">Mass: {bodyA.mass.toExponential(2)} kg</span>
        </div>

        <div className="force-stat-box">
          <span className="stat-title">Acceleration on {bodyB.name}</span>
          <strong className="stat-val mono">{forceData.accelBMs2.toExponential(3)} m/s²</strong>
          <span className="stat-sub">Mass: {bodyB.mass.toExponential(2)} kg</span>
        </div>
      </div>

      <div className="force-explanation-note">
        <strong>Physics Principle:</strong> Even though the Sun and a planet exert identical gravitational force magnitudes on one another (|F_AB| = |F_BA|), the resulting acceleration of the Sun is tiny because a_Sun = F / M_Sun, whereas the planet experiences a vastly higher acceleration a_planet = F / m_planet.
      </div>
    </div>
  );
}
