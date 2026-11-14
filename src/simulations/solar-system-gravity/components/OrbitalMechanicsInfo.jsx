import React from 'react';

export default function OrbitalMechanicsInfo({
  selectedPlanet,
  detailedMetrics,
}) {
  if (!selectedPlanet || !detailedMetrics) return null;

  const isBound = detailedMetrics.totalEnergyJoules < 0;
  const isEscape = detailedMetrics.speedKmS >= detailedMetrics.escapeVelocityKmS;

  return (
    <div className="mechanics-info-card">
      <div className="card-header">
        <h3>Orbital Mechanics Analysis & Analytical Comparison</h3>
        <span className="card-subtitle">
          Comparing ideal Keplerian two-body theory with instantaneous N-body numerical state for{' '}
          <strong>{selectedPlanet.name}</strong>
        </span>
      </div>

      {/* Comparison Table */}
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Physical Quantity</th>
            <th>Governing Formula</th>
            <th>Theoretical Keplerian Value</th>
            <th>Live Simulated Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Circular Velocity (v_c)</strong></td>
            <td className="mono">v_c = √(G·M / r)</td>
            <td className="mono">{detailedMetrics.circularSpeedKmS.toFixed(2)} km/s</td>
            <td className="mono highlight">{detailedMetrics.speedKmS.toFixed(2)} km/s</td>
          </tr>
          <tr>
            <td><strong>Escape Velocity (v_esc)</strong></td>
            <td className="mono">v_esc = √2 · v_c</td>
            <td className="mono">{detailedMetrics.escapeVelocityKmS.toFixed(2)} km/s</td>
            <td>
              <span className={`status-badge ${isEscape ? 'escape' : 'bound'}`}>
                {isEscape ? 'Trajectory Escaping' : 'Gravitationally Bound'}
              </span>
            </td>
          </tr>
          <tr>
            <td><strong>Orbital Period (T)</strong></td>
            <td className="mono">T² = (4π² / GM) · a³</td>
            <td className="mono">
              {selectedPlanet.orbitalPeriodYears ? `${selectedPlanet.orbitalPeriodYears.toFixed(3)} yr` : '—'}
            </td>
            <td className="mono">
              {detailedMetrics.theoreticalPeriodYears !== Infinity
                ? `${detailedMetrics.theoreticalPeriodYears.toFixed(3)} yr (${detailedMetrics.theoreticalPeriodDays.toFixed(1)} d)`
                : 'Parabolic / Infinite'}
            </td>
          </tr>
          <tr>
            <td><strong>Specific Energy (ε)</strong></td>
            <td className="mono">ε = v²/2 − GM/r</td>
            <td className="mono">
              {isBound ? 'Negative (Bound Ellipse)' : 'Non-Negative (Unbound / Hyperbolic)'}
            </td>
            <td className="mono">
              {(detailedMetrics.specificEnergy / 1e6).toFixed(2)} MJ/kg
            </td>
          </tr>
          <tr>
            <td><strong>Orbital Eccentricity (e)</strong></td>
            <td className="mono">e = √(1 + 2εh² / (GM)²)</td>
            <td className="mono">
              {selectedPlanet.eccentricity !== undefined ? selectedPlanet.eccentricity.toFixed(4) : '—'}
            </td>
            <td className="mono highlight">
              {detailedMetrics.eccentricity.toFixed(4)}
              {detailedMetrics.eccentricity < 0.05
                ? ' (Nearly Circular)'
                : detailedMetrics.eccentricity < 1.0
                ? ' (Elliptical)'
                : ' (Hyperbolic Escape)'}
            </td>
          </tr>
          <tr>
            <td><strong>Specific Angular Momentum (h)</strong></td>
            <td className="mono">h = |r × v|</td>
            <td className="mono">Conserved (Kepler\'s 2nd Law)</td>
            <td className="mono">
              {(Math.abs(detailedMetrics.specificAngularMomentum) / 1e15).toFixed(3)} × 10¹⁵ m²/s
            </td>
          </tr>
        </tbody>
      </table>

      {/* Two-body vs N-body distinction note */}
      <div className="mechanics-notes">
        <p>
          <strong>Scientific Note on Multi-Body Gravitation:</strong> In ideal two-body problem (Keplerian orbits),
          energy ε and angular momentum h are strictly constant, and orbits trace closed ellipses. In full N-body
          simulations, gravitational tugs from massive planets (especially Jupiter and Saturn) introduce small
          oscillations in eccentricity, semi-major axis, and orbital inclination (orbital resonance and precession).
        </p>
      </div>
    </div>
  );
}
