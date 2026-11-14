import React, { useState } from 'react';
import Icon from '../../../components/Icon.jsx';
import { BLACK_HOLE_PRESETS, SOLAR_MASS_KG } from '../constants.js';
import {
  calculateSchwarzschildRadius,
  calculatePhotonSphereRadius,
  calculateIscoRadius,
  calculateCriticalImpactParameter,
  calculateTimeDilation,
  calculateGravitationalRedshift,
  calculateHoveringAcceleration,
  calculateTidalAcceleration,
  formatMetricDistance,
  formatSolarMass,
} from '../physics.js';

export default function BlackHoleControls({
  massSolar,
  setMassSolar,
  selectedPreset,
  setSelectedPreset,
  showPhotonSphere,
  setShowPhotonSphere,
  showAccretionDisk,
  setShowAccretionDisk,
  showLensing,
  setShowLensing,
  showShadowBoundary,
  setShowShadowBoundary,
  showSpacetimeMesh,
  setShowSpacetimeMesh,
  showFlatComparison,
  setShowFlatComparison,
  meshDensity,
  setMeshDensity,
  diskInclination,
  setDiskInclination,
  diskIntensity,
  setDiskIntensity,
  observerRadiusRs,
  setObserverRadiusRs,
  cameraSpeed,
  setCameraSpeed,
  autoOrbit,
  setAutoOrbit,
}) {
  // Collapsible section open/close states
  const [openSections, setOpenSections] = useState({
    mass: true,
    optics: true,
    time: true,
    camera: false,
  });

  const toggleSection = (sectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const massKg = massSolar * SOLAR_MASS_KG;
  const rsMeters = calculateSchwarzschildRadius(massKg);
  const rPhMeters = calculatePhotonSphereRadius(massKg);
  const rIscoMeters = calculateIscoRadius(massKg);
  const bCritMeters = calculateCriticalImpactParameter(rsMeters);

  // Mean Schwarzschild sphere density rho = M / (4/3 * pi * rs^3)
  const volumeM3 = (4 / 3) * Math.PI * Math.pow(rsMeters, 3);
  const avgDensityKgM3 = massKg / volumeM3;

  // Local Time Dilation Metrics for stationary observer at observerRadiusRs
  const rObserverMeters = observerRadiusRs * rsMeters;
  const dilationRatio = calculateTimeDilation(rObserverMeters, rsMeters);
  const redshiftZ = calculateGravitationalRedshift(rObserverMeters, rsMeters);
  const hoveringAccel = calculateHoveringAcceleration(rObserverMeters, rsMeters);
  const tidalAccel = calculateTidalAcceleration(rObserverMeters, massKg, 2.0);
  const tidalG = tidalAccel / 9.80665;

  const handlePresetChange = (e) => {
    const presetId = e.target.value;
    setSelectedPreset(presetId);
    if (presetId !== 'custom') {
      const p = BLACK_HOLE_PRESETS.find((item) => item.id === presetId);
      if (p) setMassSolar(p.massSolar);
    }
  };

  const handleCustomMassChange = (newVal) => {
    setSelectedPreset('custom');
    setMassSolar(newVal);
  };

  return (
    <aside className="bh-sidebar">
      {/* 1. Black Hole Parameters & Mass Presets */}
      <div className="bh-card bh-accordion-card">
        <button
          className="bh-accordion-header"
          onClick={() => toggleSection('mass')}
          type="button"
        >
          <div className="bh-card-title">
            <Icon name="sliders" size={16} color="#ea580c" />
            <span>Black Hole Parameters</span>
          </div>
          <Icon name={openSections.mass ? 'arrow-up' : 'arrow-down'} size={14} />
        </button>

        {openSections.mass && (
          <div className="bh-accordion-content">
            <div className="bh-control-group">
              <label className="bh-label" htmlFor="bh-preset-select">
                Astrophysical Object Preset:
              </label>
              <select
                id="bh-preset-select"
                className="bh-select"
                value={selectedPreset}
                onChange={handlePresetChange}
              >
                {BLACK_HOLE_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.name} ({preset.category})
                  </option>
                ))}
                <option value="custom">Custom Mass Input...</option>
              </select>
            </div>

            <div className="bh-control-group">
              <div className="bh-label-row">
                <span className="bh-label">Mass (M):</span>
                <span className="bh-value-badge">{formatSolarMass(massSolar)}</span>
              </div>
              <input
                type="range"
                min="0.477"
                max="10.0"
                step="0.05"
                value={Math.log10(massSolar)}
                onChange={(e) => handleCustomMassChange(Math.pow(10, parseFloat(e.target.value)))}
                className="bh-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span>3 M☉</span>
                <span>4.15M M☉ (Sgr A*)</span>
                <span>10¹⁰ M☉</span>
              </div>
            </div>

            <div className="bh-metric-grid compact">
              <div className="bh-metric-box">
                <span className="bh-metric-label">Horizon (r_s)</span>
                <span className="bh-metric-val">{formatMetricDistance(rsMeters)}</span>
              </div>
              <div className="bh-metric-box">
                <span className="bh-metric-label">Photon Sphere</span>
                <span className="bh-metric-val">{formatMetricDistance(rPhMeters)}</span>
              </div>
              <div className="bh-metric-box">
                <span className="bh-metric-label">ISCO Orbit</span>
                <span className="bh-metric-val">{formatMetricDistance(rIscoMeters)}</span>
              </div>
              <div className="bh-metric-box">
                <span className="bh-metric-label">Shadow Boundary</span>
                <span className="bh-metric-val">{formatMetricDistance(bCritMeters)}</span>
              </div>
              <div className="bh-metric-box wide">
                <span className="bh-metric-label">Mean Density (ρ_rs)</span>
                <span className="bh-metric-val">
                  {avgDensityKgM3 >= 1e3
                    ? `${(avgDensityKgM3 / 1e3).toExponential(2)} g/cm³`
                    : `${avgDensityKgM3.toFixed(2)} kg/m³`}
                </span>
                <span className="bh-metric-sub">
                  {avgDensityKgM3 < 1000
                    ? 'Less dense than liquid water! (ρ ∝ 1/M²)'
                    : 'Extreme nuclear-scale density'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Optics, Accretion Disk & Spacetime Mesh */}
      <div className="bh-card bh-accordion-card">
        <button
          className="bh-accordion-header"
          onClick={() => toggleSection('optics')}
          type="button"
        >
          <div className="bh-card-title">
            <Icon name="layers" size={16} color="#ea580c" />
            <span>Optics & Curvature Mesh</span>
          </div>
          <Icon name={openSections.optics ? 'arrow-up' : 'arrow-down'} size={14} />
        </button>

        {openSections.optics && (
          <div className="bh-accordion-content">
            <div className="bh-toggle-row">
              <span>Spacetime Curvature Mesh</span>
              <label className="bh-switch">
                <input
                  type="checkbox"
                  checked={showSpacetimeMesh}
                  onChange={(e) => setShowSpacetimeMesh(e.target.checked)}
                />
                <span className="bh-switch-slider" />
              </label>
            </div>

            {showSpacetimeMesh && (
              <>
                <div className="bh-toggle-row" style={{ paddingLeft: '0.75rem', fontSize: '0.775rem' }}>
                  <span>Flat Minkowski Comparison</span>
                  <label className="bh-switch">
                    <input
                      type="checkbox"
                      checked={showFlatComparison}
                      onChange={(e) => setShowFlatComparison(e.target.checked)}
                    />
                    <span className="bh-switch-slider" />
                  </label>
                </div>
                <div className="bh-control-group" style={{ paddingLeft: '0.75rem' }}>
                  <div className="bh-label-row">
                    <span className="bh-label" style={{ fontSize: '0.775rem' }}>Mesh Density:</span>
                    <span className="bh-value-badge">{meshDensity} rings</span>
                  </div>
                  <input
                    type="range"
                    min="14"
                    max="32"
                    step="2"
                    value={meshDensity}
                    onChange={(e) => setMeshDensity(parseInt(e.target.value, 10))}
                    className="bh-slider"
                  />
                </div>
              </>
            )}

            <div className="bh-toggle-row">
              <span>Rotating Accretion Disk</span>
              <label className="bh-switch">
                <input
                  type="checkbox"
                  checked={showAccretionDisk}
                  onChange={(e) => setShowAccretionDisk(e.target.checked)}
                />
                <span className="bh-switch-slider" />
              </label>
            </div>

            {showAccretionDisk && (
              <>
                <div className="bh-control-group" style={{ paddingLeft: '0.75rem' }}>
                  <div className="bh-label-row">
                    <span className="bh-label" style={{ fontSize: '0.775rem' }}>Disk Tilt:</span>
                    <span className="bh-value-badge">{diskInclination}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    step="1"
                    value={diskInclination}
                    onChange={(e) => setDiskInclination(parseInt(e.target.value, 10))}
                    className="bh-slider"
                  />
                </div>
                <div className="bh-control-group" style={{ paddingLeft: '0.75rem' }}>
                  <div className="bh-label-row">
                    <span className="bh-label" style={{ fontSize: '0.775rem' }}>Intensity:</span>
                    <span className="bh-value-badge">{(diskIntensity * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="1.5"
                    step="0.05"
                    value={diskIntensity}
                    onChange={(e) => setDiskIntensity(parseFloat(e.target.value))}
                    className="bh-slider"
                  />
                </div>
              </>
            )}

            <div className="bh-toggle-row">
              <span>Gravitational Light Deflection</span>
              <label className="bh-switch">
                <input
                  type="checkbox"
                  checked={showLensing}
                  onChange={(e) => setShowLensing(e.target.checked)}
                />
                <span className="bh-switch-slider" />
              </label>
            </div>

            <div className="bh-toggle-row">
              <span>Photon Sphere Ring (1.5 r_s)</span>
              <label className="bh-switch">
                <input
                  type="checkbox"
                  checked={showPhotonSphere}
                  onChange={(e) => setShowPhotonSphere(e.target.checked)}
                />
                <span className="bh-switch-slider" />
              </label>
            </div>

            <div className="bh-toggle-row">
              <span>Shadow Boundary (2.6 r_s)</span>
              <label className="bh-switch">
                <input
                  type="checkbox"
                  checked={showShadowBoundary}
                  onChange={(e) => setShowShadowBoundary(e.target.checked)}
                />
                <span className="bh-switch-slider" />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* 3. Time Dilation & Physical Telemetry */}
      <div className="bh-card bh-accordion-card">
        <button
          className="bh-accordion-header"
          onClick={() => toggleSection('time')}
          type="button"
        >
          <div className="bh-card-title">
            <Icon name="gauge" size={16} color="#ea580c" />
            <span>Time Dilation & Redshift</span>
          </div>
          <Icon name={openSections.time ? 'arrow-up' : 'arrow-down'} size={14} />
        </button>

        {openSections.time && (
          <div className="bh-accordion-content">
            <div className="bh-control-group">
              <div className="bh-label-row">
                <span className="bh-label">Observer Radius (r):</span>
                <span className="bh-value-badge">{observerRadiusRs.toFixed(2)} r_s</span>
              </div>
              <input
                type="range"
                min="1.01"
                max="12.0"
                step="0.02"
                value={observerRadiusRs}
                onChange={(e) => setObserverRadiusRs(parseFloat(e.target.value))}
                className="bh-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span>1.01 r_s</span>
                <span>1.5 r_s</span>
                <span>12.0 r_s</span>
              </div>
            </div>

            <div className="bh-metric-grid compact">
              <div className="bh-metric-box">
                <span className="bh-metric-label">Rate (dτ / dt)</span>
                <span className="bh-metric-val">{(dilationRatio * 100).toFixed(2)}%</span>
              </div>
              <div className="bh-metric-box">
                <span className="bh-metric-label">Redshift (z)</span>
                <span className="bh-metric-val">{redshiftZ === Infinity ? '∞' : redshiftZ.toFixed(3)}</span>
              </div>
              <div className="bh-metric-box wide">
                <span className="bh-metric-label">Hovering Acceleration</span>
                <span className="bh-metric-val">
                  {hoveringAccel === Infinity ? '∞' : `${(hoveringAccel / 9.80665).toExponential(2)} g`}
                </span>
              </div>
              <div className="bh-metric-box wide">
                <span className="bh-metric-label">Human Body Tidal Force</span>
                <span className="bh-metric-val" style={{ color: tidalG > 100 ? '#ef4444' : '#22c55e' }}>
                  {tidalG > 1e4 ? `${tidalG.toExponential(2)} g` : `${tidalG.toFixed(1)} g`}
                </span>
                <span className="bh-metric-sub">
                  {tidalG > 10 ? 'Lethal spaghettification gradient' : 'Survivable gradient across 2m'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Camera & Auto-Orbit Settings */}
      <div className="bh-card bh-accordion-card">
        <button
          className="bh-accordion-header"
          onClick={() => toggleSection('camera')}
          type="button"
        >
          <div className="bh-card-title">
            <Icon name="rotate-ccw" size={16} color="#ea580c" />
            <span>Camera Dynamics</span>
          </div>
          <Icon name={openSections.camera ? 'arrow-up' : 'arrow-down'} size={14} />
        </button>

        {openSections.camera && (
          <div className="bh-accordion-content">
            <div className="bh-toggle-row">
              <span>Autonomous Orbit</span>
              <label className="bh-switch">
                <input
                  type="checkbox"
                  checked={autoOrbit}
                  onChange={(e) => setAutoOrbit(e.target.checked)}
                />
                <span className="bh-switch-slider" />
              </label>
            </div>

            <div className="bh-control-group">
              <div className="bh-label-row">
                <span className="bh-label">Camera Orbit Speed:</span>
                <span className="bh-value-badge">{cameraSpeed.toFixed(1)}×</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.5"
                step="0.1"
                value={cameraSpeed}
                onChange={(e) => setCameraSpeed(parseFloat(e.target.value))}
                className="bh-slider"
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
