import React, { useState } from 'react';
import Icon from '../../components/Icon.jsx';
import BlackHoleScene from './components/BlackHoleScene.jsx';
import BlackHoleControls from './components/BlackHoleControls.jsx';
import ExperimentPanel from './components/ExperimentPanel.jsx';
import { EXPERIMENT_SCENARIOS, BLACK_HOLE_PRESETS } from './constants.js';
import metadata from './metadata.js';
import './styles.css';

export default function BlackHoleSimulation() {
  // Physical parameters
  const [selectedPreset, setSelectedPreset] = useState('stellar_standard');
  const [massSolar, setMassSolar] = useState(10); // Solar masses (default 10 M☉)

  // Visual toggles - all enabled by default for immediate active visual lab
  const [showPhotonSphere, setShowPhotonSphere] = useState(true);
  const [showAccretionDisk, setShowAccretionDisk] = useState(true);
  const [showLensing, setShowLensing] = useState(true);
  const [showShadowBoundary, setShowShadowBoundary] = useState(true);
  const [showSpacetimeMesh, setShowSpacetimeMesh] = useState(true); // Spacetime mesh visible by default!
  const [showFlatComparison, setShowFlatComparison] = useState(false);
  const [meshDensity, setMeshDensity] = useState(22);
  const [diskInclination, setDiskInclination] = useState(65); // degrees
  const [diskIntensity, setDiskIntensity] = useState(1.0);

  // Time dilation observer position
  const [observerRadiusRs, setObserverRadiusRs] = useState(1.5);

  // Playback state - starts animating automatically on page load
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  // Camera dynamics
  const [autoOrbit, setAutoOrbit] = useState(true);
  const [cameraSpeed, setCameraSpeed] = useState(1.0);

  // Active scenario tracker
  const [activeScenarioId, setActiveScenarioId] = useState('event_horizon_crossing');

  // Trigger key to force re-initialization on restart
  const [restartKey, setRestartKey] = useState(0);

  const handleRestartAnimation = () => {
    setRestartKey((k) => k + 1);
  };

  const handleResetSimulation = () => {
    setMassSolar(10);
    setSelectedPreset('stellar_standard');
    setShowPhotonSphere(true);
    setShowAccretionDisk(true);
    setShowLensing(true);
    setShowShadowBoundary(true);
    setShowSpacetimeMesh(true);
    setShowFlatComparison(false);
    setMeshDensity(22);
    setDiskInclination(65);
    setDiskIntensity(1.0);
    setObserverRadiusRs(1.5);
    setIsPlaying(true);
    setPlaybackSpeed(1.0);
    setAutoOrbit(true);
    setCameraSpeed(1.0);
    setRestartKey((k) => k + 1);
  };

  const handleSelectScenario = (scenario) => {
    setActiveScenarioId(scenario.id);
    const s = scenario.settings;
    if (s.massPreset) {
      setSelectedPreset(s.massPreset);
      const p = BLACK_HOLE_PRESETS.find((item) => item.id === s.massPreset);
      if (p) setMassSolar(p.massSolar);
    }
    if (typeof s.customMass === 'number') setMassSolar(s.customMass);
    if (typeof s.showPhotonSphere === 'boolean') setShowPhotonSphere(s.showPhotonSphere);
    if (typeof s.showAccretionDisk === 'boolean') setShowAccretionDisk(s.showAccretionDisk);
    if (typeof s.showLensing === 'boolean') setShowLensing(s.showLensing);
    if (typeof s.showFlatComparison === 'boolean') setShowFlatComparison(s.showFlatComparison);
    if (typeof s.meshDensity === 'number') setMeshDensity(s.meshDensity);
    if (typeof s.observerDistanceRs === 'number') setObserverRadiusRs(s.observerDistanceRs);
  };

  return (
    <div className="black-hole-lab">
      {/* Compact Header Banner */}
      <header className="bh-header compact">
        <div className="bh-title-row">
          <div className="bh-title-group">
            <div className="bh-icon-badge">
              <Icon name="black-hole" size={22} color="#ea580c" />
            </div>
            <div>
              <h1 className="bh-main-title">{metadata.title}</h1>
              <span className="bh-category-badge">{metadata.category} • General Relativity</span>
            </div>
          </div>

          <div className="bh-header-controls">
            <button
              className="bh-tool-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? 'Pause Simulation' : 'Resume Simulation'}
            >
              <Icon name={isPlaying ? 'pause' : 'play'} size={14} />
              <span>{isPlaying ? 'Pause' : 'Resume'}</span>
            </button>
            <button
              className="bh-tool-btn"
              onClick={handleRestartAnimation}
              title="Restart Animation"
            >
              <Icon name="replay" size={14} />
              <span>Restart</span>
            </button>
            <button
              className="bh-tool-btn"
              onClick={handleResetSimulation}
              title="Reset Simulation to Default"
            >
              <Icon name="reset" size={14} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Interactive Stage & Side Controls */}
      <div className="bh-workspace-grid">
        {/* Main Stage (70-75% width, 750-850px height) */}
        <main className="bh-main-stage">
          <BlackHoleScene
            key={restartKey}
            massSolar={massSolar}
            showPhotonSphere={showPhotonSphere}
            showAccretionDisk={showAccretionDisk}
            showLensing={showLensing}
            showShadowBoundary={showShadowBoundary}
            showSpacetimeMesh={showSpacetimeMesh}
            showFlatComparison={showFlatComparison}
            meshDensity={meshDensity}
            diskInclination={diskInclination}
            setDiskInclination={setDiskInclination}
            diskIntensity={diskIntensity}
            observerRadiusRs={observerRadiusRs}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            playbackSpeed={playbackSpeed}
            setPlaybackSpeed={setPlaybackSpeed}
            autoOrbit={autoOrbit}
            setAutoOrbit={setAutoOrbit}
            cameraSpeed={cameraSpeed}
            onRestartAnimation={handleRestartAnimation}
            onResetSimulation={handleResetSimulation}
          />
        </main>

        {/* Compact Collapsible Sidebar (25-30% width) */}
        <BlackHoleControls
          massSolar={massSolar}
          setMassSolar={setMassSolar}
          selectedPreset={selectedPreset}
          setSelectedPreset={setSelectedPreset}
          showPhotonSphere={showPhotonSphere}
          setShowPhotonSphere={setShowPhotonSphere}
          showAccretionDisk={showAccretionDisk}
          setShowAccretionDisk={setShowAccretionDisk}
          showLensing={showLensing}
          setShowLensing={setShowLensing}
          showShadowBoundary={showShadowBoundary}
          setShowShadowBoundary={setShowShadowBoundary}
          showSpacetimeMesh={showSpacetimeMesh}
          setShowSpacetimeMesh={setShowSpacetimeMesh}
          showFlatComparison={showFlatComparison}
          setShowFlatComparison={setShowFlatComparison}
          meshDensity={meshDensity}
          setMeshDensity={setMeshDensity}
          diskInclination={diskInclination}
          setDiskInclination={setDiskInclination}
          diskIntensity={diskIntensity}
          setDiskIntensity={setDiskIntensity}
          observerRadiusRs={observerRadiusRs}
          setObserverRadiusRs={setObserverRadiusRs}
          cameraSpeed={cameraSpeed}
          setCameraSpeed={setCameraSpeed}
          autoOrbit={autoOrbit}
          setAutoOrbit={setAutoOrbit}
        />
      </div>

      {/* Predefined Educational Scenarios Ribbon */}
      <ExperimentPanel
        activeScenarioId={activeScenarioId}
        onSelectScenario={handleSelectScenario}
      />

      {/* Educational Foundations & Relativistic Theory */}
      <section className="bh-theory-section">
        <div className="section-header">
          <h2 className="section-title">General Relativistic Foundations</h2>
          <p className="section-subtitle">
            Theoretical formulations governing Schwarzschild geometry, photon geodesics, and time dilation.
          </p>
        </div>

        <div className="bh-theory-grid">
          <div className="bh-theory-card">
            <h3 className="bh-theory-card-title">
              <Icon name="book" size={18} color="#ea580c" />
              <span>The Schwarzschild Metric (1916)</span>
            </h3>
            <div className="bh-formula-block">
              ds² = -(1 - r_s/r) c² dt² + (1 - r_s/r)⁻¹ dr² + r² dΩ²
            </div>
            <p className="bh-theory-text">
              The exact vacuum solution to Einstein&apos;s Field Equations (G_μν = 0) outside a static mass M.
              It establishes the Schwarzschild radius r_s = 2GM/c², the threshold where radial escape velocity equals c.
            </p>
            <ul className="bh-key-points">
              <li><strong>Event Horizon (r = r_s):</strong> Coordinate singularity where escape velocity reaches the speed of light.</li>
              <li><strong>Physical Singularity (r = 0):</strong> Region of infinite spacetime curvature where classical relativity breaks down.</li>
            </ul>
          </div>

          <div className="bh-theory-card">
            <h3 className="bh-theory-card-title">
              <Icon name="sparkles" size={18} color="#ea580c" />
              <span>Photon Sphere & Critical Capture</span>
            </h3>
            <div className="bh-formula-block">
              r_ph = 1.5 r_s • b_crit = (3√3 / 2) r_s ≈ 2.598 r_s
            </div>
            <p className="bh-theory-text">
              Photons follow null geodesics (ds² = 0). At r = 1.5 r_s, gravity bends light into circular orbits.
              Photons entering with impact parameter b &lt; b_crit plunge into the horizon, creating the apparent optical shadow of radius 2.6 r_s.
            </p>
            <ul className="bh-key-points">
              <li><strong>Critical Capture Boundary:</strong> Photons with b &lt; b_crit are inevitably captured by the black hole.</li>
              <li><strong>Einstein Ring & Lensing:</strong> Light rays at b &gt; b_crit bend gracefully and escape to infinity.</li>
            </ul>
          </div>

          <div className="bh-theory-card">
            <h3 className="bh-theory-card-title">
              <Icon name="layers" size={18} color="#ea580c" />
              <span>Flamm&apos;s Paraboloid Spatial Embedding</span>
            </h3>
            <div className="bh-formula-block">
              dl² = dr² / (1 - r_s/r) + r² dφ² = dr² + dz² + r² dφ²
            </div>
            <p className="bh-theory-text">
              Ludwig Flamm proved in 1916 that embedding an equatorial spatial slice into 3D Euclidean space
              yields a paraboloid of revolution: z(r) = -2√(r_s(r - r_s)), illustrating how general relativity stretches radial distances.
            </p>
            <ul className="bh-key-points">
              <li><strong>Radial Metric Distortion:</strong> Proper distance between radial circles exceeds Euclidean Δr.</li>
              <li><strong>Funnel Throat:</strong> The spatial curvature becomes vertical at the event horizon r = r_s.</li>
            </ul>
          </div>

          <div className="bh-theory-card">
            <h3 className="bh-theory-card-title">
              <Icon name="gauge" size={18} color="#ea580c" />
              <span>Gravitational Time Dilation & Redshift</span>
            </h3>
            <div className="bh-formula-block">
              dτ = dt √(1 - r_s/r) • 1 + z = (1 - r_s/r)⁻¹/²
            </div>
            <p className="bh-theory-text">
              Clocks in stronger gravitational fields tick slower relative to infinity. As r → r_s, proper time dτ/dt → 0.
              Light climbing out shifts toward infinite wavelength (gravitational redshift).
            </p>
            <ul className="bh-key-points">
              <li><strong>Hovering Force:</strong> a = (c² r_s) / (2 r² √(1 - r_s/r)), diverging to infinity at r_s.</li>
              <li><strong>Tidal Gradient:</strong> Δa_tidal ≈ 2GM Δr / r³. Stellar black holes spaghettify outside r_s, while supermassive horizons have survivable tidal gradients.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
