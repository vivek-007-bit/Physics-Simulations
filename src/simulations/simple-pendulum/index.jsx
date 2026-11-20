import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Icon from '../../components/Icon';
import {
  calculateTheoreticalPeriod,
  calculateTheoreticalFrequency,
  calculateNonlinearPeriod,
  calculateEnergy,
  stepEulerCromer,
  calculateMaxVelocity,
} from './physics';
import './styles.css';

export default function SimplePendulumSimulation() {
  // Physical Parameters
  const [length, setLength] = useState(2.0); // cord length (m)
  const [initialAngleDeg, setInitialAngleDeg] = useState(35); // degrees
  const [gravity, setGravity] = useState(9.81); // m/s^2
  const [damping, setDamping] = useState(0.05); // damping coefficient
  const [mass, setMass] = useState(1.0); // kg
  const [simSpeed, setSimSpeed] = useState(1.0); // 0.5x, 1x, 2x

  // Playback State
  const [isPaused, setIsPaused] = useState(false);

  // Canvas and Animation Refs
  const canvasRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const lastTimestampRef = useRef(null);

  // Live Physical State (Euler-Cromer integration)
  const angleRef = useRef((initialAngleDeg * Math.PI) / 180);
  const omegaRef = useRef(0); // angular velocity (rad/s)
  const timeElapsedRef = useRef(0);

  // Ref to hold current physical parameters for the animation loop
  // This prevents recreating the requestAnimationFrame loop when sliders are dragged
  const paramsRef = useRef({
    length: 2.0,
    gravity: 9.81,
    damping: 0.05,
    mass: 1.0,
    simSpeed: 1.0,
  });

  // Sync parameters to ref immediately on change
  useEffect(() => {
    paramsRef.current = {
      length: Math.max(0.1, length),
      gravity: Math.max(0.1, gravity),
      damping: Math.max(0, damping),
      mass: Math.max(0.05, mass),
      simSpeed,
    };
  }, [length, gravity, damping, mass, simSpeed]);

  // Live HUD references for zero re-render 60fps telemetry
  const hudTimeRef = useRef(null);
  const hudAngleRef = useRef(null);
  const hudOmegaRef = useRef(null);
  const hudEkRef = useRef(null);
  const hudEpRef = useRef(null);
  const hudEtotRef = useRef(null);

  // Small-angle theoretical period T0 = 2π √(L/g)
  const theoreticalPeriod = useMemo(() => {
    return calculateTheoreticalPeriod(length, gravity);
  }, [length, gravity]);

  // Small-angle frequency f = 1 / T0
  const frequency = useMemo(() => {
    return calculateTheoreticalFrequency(length, gravity);
  }, [length, gravity]);

  // Non-linear corrected period for initial angle θ0
  const nonlinearPeriod = useMemo(() => {
    const angleRad = (initialAngleDeg * Math.PI) / 180;
    return calculateNonlinearPeriod(length, gravity, angleRad);
  }, [length, gravity, initialAngleDeg]);

  // Max speed at lowest equilibrium point (θ = 0)
  const maxVelocity = useMemo(() => {
    const angleRad = (initialAngleDeg * Math.PI) / 180;
    return calculateMaxVelocity(length, gravity, angleRad);
  }, [length, gravity, initialAngleDeg]);

  // Canvas Drawing Routine
  const drawScene = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const dpr = window.devicePixelRatio || 1;

    ctx.clearRect(0, 0, width, height);

    // Background Fill
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#ffffff');
    bgGrad.addColorStop(1, '#f8fafc');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Pivot Origin (top center)
    const pivotX = width / 2;
    const pivotY = 55 * dpr;

    // Visual scale factor (pixels per meter): cord fits comfortably in view
    const safeHeight = Math.max(height - 130 * dpr, 100 * dpr);
    const scale = safeHeight / 4.2; // supports up to 4m cord
    const currentLength = paramsRef.current.length;
    const cordPixelLength = currentLength * scale;

    const currentTheta = angleRef.current;
    const currentOmega = omegaRef.current;

    // Bob Coordinates
    const bobX = pivotX + cordPixelLength * Math.sin(currentTheta);
    const bobY = pivotY + cordPixelLength * Math.cos(currentTheta);

    ctx.save();

    // 1. Circular Arc Trajectory Boundary Guide
    const initRad = (initialAngleDeg * Math.PI) / 180;
    ctx.strokeStyle = 'rgba(5, 150, 105, 0.18)';
    ctx.lineWidth = 1.5 * dpr;
    ctx.setLineDash([3 * dpr, 3 * dpr]);
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, cordPixelLength, Math.PI / 2 - initRad, Math.PI / 2 + initRad);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Ceiling Mount Structure
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 4 * dpr;
    ctx.beginPath();
    ctx.moveTo(pivotX - 70 * dpr, pivotY - 12 * dpr);
    ctx.lineTo(pivotX + 70 * dpr, pivotY - 12 * dpr);
    ctx.stroke();

    // Mount cross-hatching
    ctx.lineWidth = 1.5 * dpr;
    for (let x = -60; x <= 60; x += 15) {
      ctx.beginPath();
      ctx.moveTo(pivotX + x * dpr, pivotY - 12 * dpr);
      ctx.lineTo(pivotX + (x - 10) * dpr, pivotY - 22 * dpr);
      ctx.stroke();
    }

    // 3. Equilibrium Vertical Reference Line
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.lineWidth = 1 * dpr;
    ctx.setLineDash([4 * dpr, 4 * dpr]);
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(pivotX, pivotY + cordPixelLength + 35 * dpr);
    ctx.stroke();
    ctx.setLineDash([]);

    // 4. Angle Arc Indicator
    if (Math.abs(currentTheta) > 0.02) {
      const arcRadius = Math.min(50 * dpr, cordPixelLength * 0.45);
      ctx.strokeStyle = 'rgba(5, 150, 105, 0.8)';
      ctx.lineWidth = 1.75 * dpr;
      ctx.beginPath();
      if (currentTheta > 0) {
        ctx.arc(pivotX, pivotY, arcRadius, Math.PI / 2, Math.PI / 2 - currentTheta, true);
      } else {
        ctx.arc(pivotX, pivotY, arcRadius, Math.PI / 2, Math.PI / 2 - currentTheta, false);
      }
      ctx.stroke();

      // Angle readout badge near arc
      const degVal = ((currentTheta * 180) / Math.PI).toFixed(1);
      ctx.fillStyle = '#059669';
      ctx.font = `600 ${11 * dpr}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      ctx.textAlign = 'center';
      const labelX = pivotX + (currentTheta > 0 ? (arcRadius + 16 * dpr) : -(arcRadius + 16 * dpr));
      const labelY = pivotY + arcRadius * 0.7 + 10 * dpr;
      ctx.fillText(`${degVal}°`, labelX, labelY);
    }

    // 5. Cord / String (Constant physical length maintained)
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2 * dpr;
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(bobX, bobY);
    ctx.stroke();

    // 6. Velocity Vector Arrow at Bob
    if (Math.abs(currentOmega) > 0.05) {
      const vScale = 14 * dpr;
      // Linear velocity direction is perpendicular to cord: (-cos(theta), sin(theta)) * v
      const vLinear = currentLength * currentOmega;
      const vNormX = -Math.cos(currentTheta) * vLinear;
      const vNormY = Math.sin(currentTheta) * vLinear;

      const arrowEndX = bobX + vNormX * vScale;
      const arrowEndY = bobY + vNormY * vScale;

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2 * dpr;
      ctx.beginPath();
      ctx.moveTo(bobX, bobY);
      ctx.lineTo(arrowEndX, arrowEndY);
      ctx.stroke();

      // Arrowhead
      const headAngle = Math.atan2(arrowEndY - bobY, arrowEndX - bobX);
      const headLen = 6 * dpr;
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(arrowEndX, arrowEndY);
      ctx.lineTo(
        arrowEndX - headLen * Math.cos(headAngle - Math.PI / 6),
        arrowEndY - headLen * Math.sin(headAngle - Math.PI / 6)
      );
      ctx.lineTo(
        arrowEndX - headLen * Math.cos(headAngle + Math.PI / 6),
        arrowEndY - headLen * Math.sin(headAngle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();
    }

    // 7. Pendulum Bob (Spherical mass with glow)
    const currentMass = paramsRef.current.mass;
    const bobRadius = (12 + currentMass * 3.5) * dpr;

    // Bob outer radial glow
    const bobGlow = ctx.createRadialGradient(bobX, bobY, 0, bobX, bobY, bobRadius * 2.2);
    bobGlow.addColorStop(0, 'rgba(5, 150, 105, 0.3)');
    bobGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = bobGlow;
    ctx.beginPath();
    ctx.arc(bobX, bobY, bobRadius * 2.2, 0, Math.PI * 2);
    ctx.fill();

    // Bob 3D shaded body
    const bobGrad = ctx.createRadialGradient(
      bobX - bobRadius * 0.3,
      bobY - bobRadius * 0.3,
      0,
      bobX,
      bobY,
      bobRadius
    );
    bobGrad.addColorStop(0, '#6ee7b7');
    bobGrad.addColorStop(0.5, '#059669');
    bobGrad.addColorStop(1, '#065f46');
    ctx.fillStyle = bobGrad;
    ctx.beginPath();
    ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1 * dpr;
    ctx.stroke();

    // 8. Pivot Bearing Mount
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, 6.5 * dpr, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, 2 * dpr, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // 9. Update Live DOM Telemetry
    const energy = calculateEnergy(
      currentTheta,
      currentOmega,
      currentLength,
      currentMass,
      paramsRef.current.gravity
    );

    if (hudTimeRef.current) hudTimeRef.current.textContent = `${timeElapsedRef.current.toFixed(2)} s`;
    if (hudAngleRef.current) hudAngleRef.current.textContent = `${((currentTheta * 180) / Math.PI).toFixed(1)}°`;
    if (hudOmegaRef.current) hudOmegaRef.current.textContent = `${currentOmega.toFixed(2)} rad/s`;
    if (hudEkRef.current) hudEkRef.current.textContent = `${energy.Ek.toFixed(2)} J`;
    if (hudEpRef.current) hudEpRef.current.textContent = `${energy.Ep.toFixed(2)} J`;
    if (hudEtotRef.current) hudEtotRef.current.textContent = `${energy.Etot.toFixed(2)} J`;
  }, [initialAngleDeg]);

  // Handle Resize using ResizeObserver or Window Resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const targetW = Math.max(Math.round(rect.width * dpr), 300);
    const targetH = Math.max(Math.round(rect.height * dpr), 300);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    drawScene();
  }, [drawScene]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Reset to Release Angle (Explicit User Action)
  const resetToReleaseAngle = useCallback(() => {
    angleRef.current = (initialAngleDeg * Math.PI) / 180;
    omegaRef.current = 0;
    timeElapsedRef.current = 0;
    drawScene();
  }, [initialAngleDeg, drawScene]);

  // Update initial angle without resetting if user just drags slider
  useEffect(() => {
    // When initialAngleDeg changes, reset pendulum to preview the angle
    resetToReleaseAngle();
  }, [initialAngleDeg, resetToReleaseAngle]);

  // Continuous Physical Integration Loop (Euler-Cromer Algorithm)
  useEffect(() => {
    if (isPaused) {
      lastTimestampRef.current = null;
      return;
    }

    let isCancelled = false;

    const animate = (timestamp) => {
      if (isCancelled) return;

      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }

      // Delta time capped at 50ms to prevent spiral on background tab switch
      const rawDeltaSec = (timestamp - lastTimestampRef.current) / 1000;
      const deltaSec = Math.min(rawDeltaSec, 0.05);
      lastTimestampRef.current = timestamp;

      const p = paramsRef.current;
      const scaledDt = deltaSec * p.simSpeed;

      // Numerical symplectic integration step
      const step = stepEulerCromer(
        angleRef.current,
        omegaRef.current,
        p.length,
        p.gravity,
        p.damping,
        scaledDt,
        8 // 8 sub-steps for extreme energy stability
      );

      angleRef.current = step.theta;
      omegaRef.current = step.omega;
      timeElapsedRef.current += scaledDt;

      drawScene();

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      isCancelled = true;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isPaused, drawScene]);

  return (
    <div className="pendulum-sim-root">
      <div className="sim-grid">
        {/* Canvas Visualizer Stage */}
        <div className="canvas-wrapper">
          <div className="canvas-container pendulum-canvas-box">
            <canvas ref={canvasRef} className="physics-canvas" />

            {/* Status Live Badge */}
            <div className={`canvas-status-badge ${isPaused ? 'paused' : 'running'}`}>
              <span className="pulse-dot" />
              <span>{isPaused ? 'OSCILLATION PAUSED' : 'OSCILLATING (REAL-TIME SI)'}</span>
            </div>
          </div>

          {/* Telemetry Bar */}
          <div className="telemetry-bar">
            <div className="telemetry-item">
              <span className="tel-label">Time (t)</span>
              <span ref={hudTimeRef} className="tel-val mono">0.00 s</span>
            </div>
            <div className="telemetry-item">
              <span className="tel-label">Displacement (θ)</span>
              <span ref={hudAngleRef} className="tel-val mono">0.0°</span>
            </div>
            <div className="telemetry-item">
              <span className="tel-label">Angular Vel (ω)</span>
              <span ref={hudOmegaRef} className="tel-val mono">0.00 rad/s</span>
            </div>
            <div className="telemetry-item">
              <span className="tel-label">Kinetic (Ek)</span>
              <span ref={hudEkRef} className="tel-val mono">0.00 J</span>
            </div>
            <div className="telemetry-item">
              <span className="tel-label">Potential (Ep)</span>
              <span ref={hudEpRef} className="tel-val mono">0.00 J</span>
            </div>
            <div className="telemetry-item">
              <span className="tel-label">Mechanical (Etot)</span>
              <span ref={hudEtotRef} className="tel-val mono">0.00 J</span>
            </div>
          </div>

          {/* Theoretical Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card">
              <span className="sum-title">Theoretical Period (T₀)</span>
              <span className="sum-val mono">{theoreticalPeriod.toFixed(3)} s</span>
              <span className="sum-sub">Small-angle harmonic: 2π√(L/g)</span>
            </div>
            <div className="summary-card">
              <span className="sum-title">Nonlinear Period (T)</span>
              <span className="sum-val mono">{nonlinearPeriod.toFixed(3)} s</span>
              <span className="sum-sub">Corrected for θ₀ = {initialAngleDeg}°</span>
            </div>
            <div className="summary-card">
              <span className="sum-title">Natural Frequency (f)</span>
              <span className="sum-val mono">{frequency.toFixed(3)} Hz</span>
              <span className="sum-sub">Oscillations per second (1/T₀)</span>
            </div>
            <div className="summary-card">
              <span className="sum-title">Peak Velocity (v_max)</span>
              <span className="sum-val mono">{maxVelocity.toFixed(2)} m/s</span>
              <span className="sum-sub">Speed at equilibrium (θ = 0)</span>
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <aside className="controls-panel">
          <div className="panel-header">
            <Icon name="sliders" size={18} color="#10b981" />
            <h3>Pendulum Parameters</h3>
          </div>

          {/* Playback Action Buttons */}
          <div className="action-buttons">
            <button
              className={`primary-action-btn ${isPaused ? 'paused' : ''}`}
              onClick={() => setIsPaused((prev) => !prev)}
            >
              <Icon name={isPaused ? 'play' : 'pause'} size={16} />
              <span>{isPaused ? 'Resume Oscillation' : 'Pause Oscillation'}</span>
            </button>
            <button
              className="secondary-action-btn"
              onClick={resetToReleaseAngle}
              title="Reset to release angle"
            >
              <Icon name="reset" size={16} />
              <span>Reset</span>
            </button>
          </div>

          {/* Simulation Speed Pill Selector */}
          <div className="control-group">
            <div className="control-label-row">
              <label>Simulation Speed</label>
            </div>
            <div className="speed-pill-group">
              {[0.5, 1.0, 2.0].map((spd) => (
                <button
                  key={spd}
                  className={`speed-pill ${simSpeed === spd ? 'active' : ''}`}
                  onClick={() => setSimSpeed(spd)}
                >
                  {spd}×
                </button>
              ))}
            </div>
          </div>

          {/* Cord Length Slider */}
          <div className="control-group">
            <div className="control-label-row">
              <label htmlFor="pendulum-length">Cord Length (L)</label>
              <div className="input-with-unit">
                <input
                  id="pendulum-length"
                  type="number"
                  min="0.3"
                  max="4.0"
                  step="0.1"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="num-input mono"
                />
                <span className="unit">meters</span>
              </div>
            </div>
            <input
              type="range"
              min="0.5"
              max="3.5"
              step="0.05"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="range-slider"
            />
          </div>

          {/* Initial Release Angle Slider */}
          <div className="control-group">
            <div className="control-label-row">
              <label htmlFor="pendulum-angle">Initial Release Angle (θ₀)</label>
              <div className="input-with-unit">
                <input
                  id="pendulum-angle"
                  type="number"
                  min="5"
                  max="85"
                  step="1"
                  value={initialAngleDeg}
                  onChange={(e) => setInitialAngleDeg(Number(e.target.value))}
                  className="num-input mono"
                />
                <span className="unit">deg (°)</span>
              </div>
            </div>
            <input
              type="range"
              min="5"
              max="85"
              step="1"
              value={initialAngleDeg}
              onChange={(e) => setInitialAngleDeg(Number(e.target.value))}
              className="range-slider"
            />
          </div>

          {/* Bob Mass Slider */}
          <div className="control-group">
            <div className="control-label-row">
              <label htmlFor="pendulum-mass">Bob Mass (m)</label>
              <div className="input-with-unit">
                <input
                  id="pendulum-mass"
                  type="number"
                  min="0.2"
                  max="5.0"
                  step="0.1"
                  value={mass}
                  onChange={(e) => setMass(Number(e.target.value))}
                  className="num-input mono"
                />
                <span className="unit">kg</span>
              </div>
            </div>
            <input
              type="range"
              min="0.2"
              max="5.0"
              step="0.1"
              value={mass}
              onChange={(e) => setMass(Number(e.target.value))}
              className="range-slider"
            />
          </div>

          {/* Damping / Air Resistance Slider */}
          <div className="control-group">
            <div className="control-label-row">
              <label htmlFor="pendulum-damping">Damping / Resistance (γ)</label>
              <div className="input-with-unit">
                <input
                  id="pendulum-damping"
                  type="number"
                  min="0"
                  max="0.5"
                  step="0.01"
                  value={damping}
                  onChange={(e) => setDamping(Number(e.target.value))}
                  className="num-input mono"
                />
                <span className="unit">s⁻¹</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="0.3"
              step="0.005"
              value={damping}
              onChange={(e) => setDamping(Number(e.target.value))}
              className="range-slider"
            />
          </div>

          {/* Gravity Slider & Celestial Chips */}
          <div className="control-group">
            <div className="control-label-row">
              <label htmlFor="pendulum-gravity">Gravity (g)</label>
              <div className="input-with-unit">
                <input
                  id="pendulum-gravity"
                  type="number"
                  min="1"
                  max="25"
                  step="0.1"
                  value={gravity}
                  onChange={(e) => setGravity(Number(e.target.value))}
                  className="num-input mono"
                />
                <span className="unit">m/s²</span>
              </div>
            </div>
            <input
              type="range"
              min="1.0"
              max="25.0"
              step="0.1"
              value={gravity}
              onChange={(e) => setGravity(Number(e.target.value))}
              className="range-slider"
            />
            <div className="planet-chips">
              {[
                { name: 'Earth', g: 9.81 },
                { name: 'Moon', g: 1.62 },
                { name: 'Mars', g: 3.71 },
                { name: 'Jupiter', g: 24.79 },
              ].map((p) => (
                <button
                  key={p.name}
                  className={`planet-btn ${Math.abs(gravity - p.g) < 0.05 ? 'active' : ''}`}
                  onClick={() => setGravity(p.g)}
                >
                  <span>{p.name}</span>
                  <span className="mono">{p.g}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
