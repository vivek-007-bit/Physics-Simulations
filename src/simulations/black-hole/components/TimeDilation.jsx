import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/Icon.jsx';
import {
  calculateSchwarzschildRadius,
  calculateTimeDilation,
  calculateGravitationalRedshift,
  calculateHoveringAcceleration,
  calculateTidalAcceleration,
  calculateFreeFallProperTime,
  formatMetricDistance,
} from '../physics.js';
import { SOLAR_MASS_KG } from '../constants.js';

export default function TimeDilation({
  massSolar = 10,
}) {
  const [observerRadiusRs, setObserverRadiusRs] = useState(1.5); // units of r_s
  const [isTicking, setIsTicking] = useState(true);

  // Time accumulation in seconds
  const [coordinateTimeSec, setCoordinateTimeSec] = useState(0);
  const [properTimeSec, setProperTimeSec] = useState(0);
  const lastTimeRef = useRef(performance.now());
  const animFrameRef = useRef(null);

  const massKg = massSolar * SOLAR_MASS_KG;
  const rsMeters = calculateSchwarzschildRadius(massKg);
  const rMeters = observerRadiusRs * rsMeters;

  // Relativistic factors
  const dilationRatio = calculateTimeDilation(rMeters, rsMeters); // dτ / dt = sqrt(1 - rs/r)
  const redshiftZ = calculateGravitationalRedshift(rMeters, rsMeters);
  const hoveringAccel = calculateHoveringAcceleration(rMeters, rsMeters);
  const tidalAccel = calculateTidalAcceleration(rMeters, massKg, 2.0); // 2 meter body
  const tidalG = tidalAccel / 9.80665;
  const freeFallTime = calculateFreeFallProperTime(rMeters, massKg);

  // Spectral wavelength shift for a 500nm (cyan) source emitted at radius r
  const restWavelengthNm = 500.0;
  const observedWavelengthNm = dilationRatio > 0 ? restWavelengthNm / dilationRatio : Infinity;

  // Real-time ticking simulation loop
  useEffect(() => {
    lastTimeRef.current = performance.now();

    const tick = (now) => {
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (isTicking) {
        setCoordinateTimeSec((t) => t + dt);
        setProperTimeSec((tau) => tau + dt * dilationRatio);
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isTicking, dilationRatio]);

  const resetClocks = () => {
    setCoordinateTimeSec(0);
    setProperTimeSec(0);
  };

  // Convert seconds to MM:SS.sss
  function formatClockTime(totalSec) {
    const mins = Math.floor(totalSec / 60);
    const secs = (totalSec % 60).toFixed(2);
    const padM = String(mins).padStart(2, '0');
    const padS = String(secs).padStart(5, '0');
    return `${padM}:${padS}`;
  }

  // Clock hand angle (seconds hand: 360 deg per 60 seconds)
  const coordHandDeg = (coordinateTimeSec % 60) * 6;
  const properHandDeg = (properTimeSec % 60) * 6;

  // Color mapping for redshifted photon
  let photonColor = '#38bdf8';
  if (observedWavelengthNm > 750) photonColor = '#991b1b'; // Infrared
  else if (observedWavelengthNm > 640) photonColor = '#ef4444'; // Red
  else if (observedWavelengthNm > 590) photonColor = '#f97316'; // Orange
  else if (observedWavelengthNm > 560) photonColor = '#eab308'; // Yellow
  else if (observedWavelengthNm > 500) photonColor = '#22c55e'; // Green

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Dual Synchronized Clocks */}
      <div className="bh-card">
        <div className="bh-card-header">
          <h3 className="bh-card-title">
            <Icon name="gauge" size={18} color="#ea580c" />
            <span>Gravitational Time Dilation: Dual Relativistic Clocks</span>
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="bh-tool-btn"
              onClick={() => setIsTicking(!isTicking)}
            >
              <Icon name={isTicking ? 'pause' : 'play'} size={14} />
              <span>{isTicking ? 'Pause' : 'Resume'}</span>
            </button>
            <button className="bh-tool-btn" onClick={resetClocks}>
              <Icon name="reset" size={14} />
              <span>Reset Clocks</span>
            </button>
          </div>
        </div>

        <div className="bh-clocks-container">
          {/* Clock 1: Distant Coordinate Observer */}
          <div className="bh-clock-card">
            <div className="bh-clock-face infinity-clock">
              <div
                className="bh-clock-hand"
                style={{ transform: `rotate(${coordHandDeg}deg)` }}
              />
              <div className="bh-clock-center-dot" />
            </div>
            <div className="bh-clock-name">Distant Observer (r → ∞)</div>
            <div className="bh-clock-readout" style={{ color: '#0284c7' }}>
              {formatClockTime(coordinateTimeSec)}
            </div>
            <div className="bh-clock-sub">
              Coordinate Time (dt) • Rate: 1.0000×
            </div>
          </div>

          {/* Clock 2: Stationary Hovering Observer */}
          <div className="bh-clock-card">
            <div className="bh-clock-face">
              <div
                className="bh-clock-hand"
                style={{ transform: `rotate(${properHandDeg}deg)` }}
              />
              <div className="bh-clock-center-dot" />
            </div>
            <div className="bh-clock-name">
              Hovering Observer at {observerRadiusRs.toFixed(2)} r_s
            </div>
            <div className="bh-clock-readout" style={{ color: '#ea580c' }}>
              {formatClockTime(properTimeSec)}
            </div>
            <div className="bh-clock-sub">
              Proper Time (dτ) • Rate: {(dilationRatio * 100).toFixed(2)}% of infinity
            </div>
          </div>
        </div>

        {/* Radius Slider */}
        <div style={{ padding: '0 0.5rem' }}>
          <div className="bh-control-group">
            <div className="bh-label-row">
              <span className="bh-label">Stationary Hovering Radius (r):</span>
              <span className="bh-value-badge">
                {observerRadiusRs.toFixed(2)} r_s ({formatMetricDistance(rMeters)})
              </span>
            </div>
            <input
              type="range"
              min="1.01"
              max="15.0"
              step="0.01"
              value={observerRadiusRs}
              onChange={(e) => setObserverRadiusRs(parseFloat(e.target.value))}
              className="bh-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>r_s (Horizon: 1.00)</span>
              <span>Photon Sphere (1.50)</span>
              <span>ISCO (3.00)</span>
              <span>Distant Space (15.00)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Relativistic Physical Quantities Grid */}
      <div className="bh-card">
        <h4 className="bh-card-title">
          <Icon name="zap" size={16} color="#ea580c" />
          <span>Local Physical Conditions at r = {observerRadiusRs.toFixed(2)} r_s</span>
        </h4>

        <div className="bh-metric-grid">
          {/* Time dilation factor */}
          <div className="bh-metric-box">
            <span className="bh-metric-label">Time Dilation Ratio (dτ / dt)</span>
            <span className="bh-metric-val">{dilationRatio.toFixed(5)}</span>
            <span className="bh-metric-sub">
              dτ/dt = √(1 - r_s/r) • 1 second at r = {(1 / (dilationRatio || 1e-9)).toFixed(2)}s at ∞
            </span>
          </div>

          {/* Gravitational Redshift */}
          <div className="bh-metric-box">
            <span className="bh-metric-label">Gravitational Redshift (z)</span>
            <span className="bh-metric-val">
              {redshiftZ === Infinity ? '∞' : redshiftZ.toFixed(4)}
            </span>
            <span className="bh-metric-sub">
              λ_obs = λ_emit · (1 + z) • Wavelength stretched by {(1 + redshiftZ).toFixed(2)}×
            </span>
          </div>

          {/* Hovering Rocket Thrust */}
          <div className="bh-metric-box">
            <span className="bh-metric-label">Required Hovering Acceleration</span>
            <span className="bh-metric-val">
              {hoveringAccel === Infinity
                ? '∞ (Cannot Hover)'
                : `${(hoveringAccel / 9.80665).toExponential(2)} g`}
            </span>
            <span className="bh-metric-sub">
              Diverges to infinity as r → r_s (no engine can hover at horizon)
            </span>
          </div>

          {/* Tidal Spaghettification */}
          <div className="bh-metric-box">
            <span className="bh-metric-label">Tidal Force (2m Human Body)</span>
            <span className="bh-metric-val" style={{ color: tidalG > 100 ? '#ef4444' : '#22c55e' }}>
              {tidalG > 1e4 ? `${tidalG.toExponential(2)} g` : `${tidalG.toFixed(1)} g`}
            </span>
            <span className="bh-metric-sub">
              {tidalG > 10
                ? 'Lethal spaghettification (head/feet differential)'
                : 'Survivable human tidal gradient'}
            </span>
          </div>

          {/* Wavelength Color Shift Indicator */}
          <div className="bh-metric-box wide">
            <span className="bh-metric-label">Gravitational Spectral Shift (500 nm Cyan Source)</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.35rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: photonColor,
                  border: '1px solid var(--border-medium)',
                  boxShadow: `0 0 12px ${photonColor}66`,
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Observed Wavelength: {observedWavelengthNm > 1e4 ? '> 10,000 nm (Far IR)' : `${observedWavelengthNm.toFixed(1)} nm`}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Rest emitted: 500.0 nm (Cyan) → Shifted to {observedWavelengthNm > 750 ? 'Invisible Infrared' : 'Deep Red'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Free Fall Proper Time Paradox Callout */}
      <div className="bh-disclaimer-box">
        <Icon name="info" size={18} className="bh-disclaimer-icon" />
        <div>
          <strong>The Infalling Observer Paradox:</strong> If an astronaut drops freely from rest at r = {observerRadiusRs.toFixed(2)} r_s,
          their proper wristwatch time to cross the horizon into the singularity is only <strong>{freeFallTime < 1 ? `${(freeFallTime * 1000).toFixed(1)} ms` : `${freeFallTime.toFixed(2)} seconds`}</strong>.
          However, to a distant telescope observer at infinity, gravitational time dilation makes the astronaut take <strong>infinite coordinate time (t → ∞)</strong> to reach the horizon,
          redshifting exponentially into blackness.
        </div>
      </div>
    </div>
  );
}
