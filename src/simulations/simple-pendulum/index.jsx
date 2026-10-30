import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../../components/Icon';
import './styles.css';

export default function SimplePendulumSimulation() {
  const { isDark } = useTheme();

  // Parameters
  const [length, setLength] = useState(2.0); // cord length (m)
  const [initialAngleDeg, setInitialAngleDeg] = useState(35); // degrees
  const [gravity, setGravity] = useState(9.81); // m/s^2
  const [damping, setDamping] = useState(0.05); // damping factor
  const [mass, setMass] = useState(1.0); // kg

  // Playback state
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // References
  const canvasRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const lastTimestampRef = useRef(null);

  // Physical State (Euler-Cromer integration for energy stability)
  const angleRef = useRef((initialAngleDeg * Math.PI) / 180);
  const omegaRef = useRef(0); // angular velocity (rad/s)
  const timeElapsedRef = useRef(0);

  // Live HUD references for zero re-render 60fps telemetry
  const hudTimeRef = useRef(null);
  const hudAngleRef = useRef(null);
  const hudOmegaRef = useRef(null);
  const hudEkRef = useRef(null);
  const hudEpRef = useRef(null);
  const hudEtotRef = useRef(null);

  // Small angle theoretical period T = 2 * pi * sqrt(L / g)
  const theoreticalPeriod = useMemo(() => {
    return 2 * Math.PI * Math.sqrt(Math.max(0.01, length) / Math.max(0.1, gravity));
  }, [length, gravity]);

  // Small angle frequency f = 1 / T
  const frequency = useMemo(() => {
    return 1 / theoreticalPeriod;
  }, [theoreticalPeriod]);

  // Canvas renderer
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const dpr = window.devicePixelRatio || 1;

    ctx.clearRect(0, 0, width, height);

    // Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    if (isDark) {
      bgGrad.addColorStop(0, '#0c111d');
      bgGrad.addColorStop(1, '#090d16');
    } else {
      bgGrad.addColorStop(0, '#ffffff');
      bgGrad.addColorStop(1, '#f8fafc');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Pivot Origin (top center)
    const pivotX = width / 2;
    const pivotY = 50 * dpr;

    // Visual scale factor (pixels per meter)
    const maxPixelLength = height - 120 * dpr;
    const scale = (maxPixelLength / 4.0); // max 4m length fit
    const cordPixelLength = length * scale;

    const currentTheta = angleRef.current;
    const bobX = pivotX + cordPixelLength * Math.sin(currentTheta);
    const bobY = pivotY + cordPixelLength * Math.cos(currentTheta);

    // Ceiling Mount
    ctx.save();
    ctx.strokeStyle = isDark ? '#334155' : '#64748b';
    ctx.lineWidth = 4 * dpr;
    ctx.beginPath();
    ctx.moveTo(pivotX - 60 * dpr, pivotY - 10 * dpr);
    ctx.lineTo(pivotX + 60 * dpr, pivotY - 10 * dpr);
    ctx.stroke();

    // Mount cross-hatching
    ctx.lineWidth = 1.5 * dpr;
    for (let x = -50; x <= 50; x += 15) {
      ctx.beginPath();
      ctx.moveTo(pivotX + x * dpr, pivotY - 10 * dpr);
      ctx.lineTo(pivotX + (x - 8) * dpr, pivotY - 20 * dpr);
      ctx.stroke();
    }

    // Pivot Bearing
    ctx.fillStyle = isDark ? '#06b6d4' : '#0284c7';
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, 6 * dpr, 0, Math.PI * 2);
    ctx.fill();

    // Equilibrium Vertical Reference Line
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.12)';
    ctx.lineWidth = 1 * dpr;
    ctx.setLineDash([4 * dpr, 4 * dpr]);
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(pivotX, pivotY + cordPixelLength + 30 * dpr);
    ctx.stroke();
    ctx.setLineDash([]);

    // Angle Arc indicator
    if (Math.abs(currentTheta) > 0.02) {
      const arcRadius = 40 * dpr;
      ctx.strokeStyle = isDark ? 'rgba(16, 185, 129, 0.6)' : 'rgba(5, 150, 105, 0.7)';
      ctx.lineWidth = 1.5 * dpr;
      ctx.beginPath();
      if (currentTheta > 0) {
        ctx.arc(pivotX, pivotY, arcRadius, Math.PI / 2, Math.PI / 2 - currentTheta, true);
      } else {
        ctx.arc(pivotX, pivotY, arcRadius, Math.PI / 2, Math.PI / 2 - currentTheta, false);
      }
      ctx.stroke();

      // Angle degrees text
      const degText = `${((currentTheta * 180) / Math.PI).toFixed(1)}°`;
      ctx.fillStyle = isDark ? '#34d399' : '#059669';
      ctx.font = `600 ${10 * dpr}px 'Fira Code', monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(degText, pivotX + (currentTheta > 0 ? 30 * dpr : -30 * dpr), pivotY + arcRadius + 12 * dpr);
    }

    // Cord Wire
    ctx.strokeStyle = isDark ? '#94a3b8' : '#475569';
    ctx.lineWidth = 2 * dpr;
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(bobX, bobY);
    ctx.stroke();

    // Pendulum Bob Sphere
    const bobRadius = (12 + mass * 3) * dpr;

    // Bob Glow
    const bobGlow = ctx.createRadialGradient(bobX, bobY, 0, bobX, bobY, bobRadius * 2.5);
    bobGlow.addColorStop(0, isDark ? 'rgba(16, 185, 129, 0.5)' : 'rgba(5, 150, 105, 0.35)');
    bobGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = bobGlow;
    ctx.beginPath();
    ctx.arc(bobX, bobY, bobRadius * 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Bob Body
    const bobGrad = ctx.createRadialGradient(
      bobX - bobRadius * 0.3,
      bobY - bobRadius * 0.3,
      0,
      bobX,
      bobY,
      bobRadius
    );
    if (isDark) {
      bobGrad.addColorStop(0, '#a7f3d0');
      bobGrad.addColorStop(0.5, '#10b981');
      bobGrad.addColorStop(1, '#047857');
    } else {
      bobGrad.addColorStop(0, '#6ee7b7');
      bobGrad.addColorStop(0.5, '#059669');
      bobGrad.addColorStop(1, '#065f46');
    }
    ctx.fillStyle = bobGrad;
    ctx.beginPath();
    ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1 * dpr;
    ctx.stroke();

    ctx.restore();

    // Energy Metrics Calculation
    const omega = omegaRef.current;
    const vLinear = length * omega;
    const Ek = 0.5 * mass * vLinear * vLinear;
    // Potential Energy with datum at lowest equilibrium point
    const hRel = length * (1 - Math.cos(currentTheta));
    const Ep = mass * gravity * hRel;
    const Etot = Ek + Ep;

    // Update DOM Telemetry smoothly
    if (hudTimeRef.current) hudTimeRef.current.textContent = `${timeElapsedRef.current.toFixed(2)} s`;
    if (hudAngleRef.current) hudAngleRef.current.textContent = `${((currentTheta * 180) / Math.PI).toFixed(1)}°`;
    if (hudOmegaRef.current) hudOmegaRef.current.textContent = `${omega.toFixed(2)} rad/s`;
    if (hudEkRef.current) hudEkRef.current.textContent = `${Ek.toFixed(2)} J`;
    if (hudEpRef.current) hudEpRef.current.textContent = `${Ep.toFixed(2)} J`;
    if (hudEtotRef.current) hudEtotRef.current.textContent = `${Etot.toFixed(2)} J`;
  }, [length, mass, gravity, isDark]);

  // Handle Resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    renderCanvas();
  }, [renderCanvas]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Parameter Change Reset
  const resetToAngle = useCallback(
    (deg) => {
      angleRef.current = (deg * Math.PI) / 180;
      omegaRef.current = 0;
      timeElapsedRef.current = 0;
      renderCanvas();
    },
    [renderCanvas]
  );

  useEffect(() => {
    resetToAngle(initialAngleDeg);
  }, [initialAngleDeg, resetToAngle]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Physical Integration Loop (Euler-Cromer Algorithm)
  useEffect(() => {
    if (!isRunning || isPaused) {
      lastTimestampRef.current = null;
      return;
    }

    let isCancelled = false;

    const animate = (timestamp) => {
      if (isCancelled) return;

      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }

      const deltaMs = Math.min(timestamp - lastTimestampRef.current, 50); // cap substepping
      lastTimestampRef.current = timestamp;
      const dt = deltaMs / 1000;

      // Numerical sub-stepping for extreme energy stability
      const subSteps = 8;
      const subDt = dt / subSteps;

      for (let s = 0; s < subSteps; s++) {
        // alpha = - (g / L) * sin(theta) - damping * omega
        const alpha = -(gravity / length) * Math.sin(angleRef.current) - damping * omegaRef.current;
        omegaRef.current += alpha * subDt;
        angleRef.current += omegaRef.current * subDt;
      }

      timeElapsedRef.current += dt;
      renderCanvas();

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      isCancelled = true;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isRunning, isPaused, length, gravity, damping, renderCanvas]);

  return (
    <div className="pendulum-sim-root">
      <div className="sim-grid">
        {/* Canvas Visualizer */}
        <div className="canvas-wrapper">
          <div className="canvas-container pendulum-canvas-box">
            <canvas ref={canvasRef} className="physics-canvas" />
          </div>

          {/* Telemetry Bar */}
          <div className="telemetry-bar">
            <div className="telemetry-item">
              <span className="tel-label">Time</span>
              <span ref={hudTimeRef} className="tel-val mono">0.00 s</span>
            </div>
            <div className="telemetry-item">
              <span className="tel-label">Angle (θ)</span>
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
              <span className="tel-label">Total Energy</span>
              <span ref={hudEtotRef} className="tel-val mono">0.00 J</span>
            </div>
          </div>

          {/* Theoretical Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card">
              <span className="sum-title">Theoretical Period (T)</span>
              <span className="sum-val mono">{theoreticalPeriod.toFixed(3)} s</span>
              <span className="sum-sub">Small-angle harmonic: 2π√(L/g)</span>
            </div>
            <div className="summary-card">
              <span className="sum-title">Frequency (f)</span>
              <span className="sum-val mono">{frequency.toFixed(3)} Hz</span>
              <span className="sum-sub">Cycles per second</span>
            </div>
            <div className="summary-card">
              <span className="sum-title">Cord Length (L)</span>
              <span className="sum-val mono">{length.toFixed(2)} m</span>
              <span className="sum-sub">Pivot to bob center</span>
            </div>
            <div className="summary-card">
              <span className="sum-title">Gravity Field (g)</span>
              <span className="sum-val mono">{gravity.toFixed(2)} m/s²</span>
              <span className="sum-sub">Gravitational field strength</span>
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <aside className="controls-panel">
          <div className="panel-header">
            <Icon name="sliders" size={18} color="var(--accent-emerald)" />
            <h3>Pendulum Parameters</h3>
          </div>

          <div className="action-buttons">
            <button
              className="primary-action-btn"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
              onClick={() => setIsPaused((prev) => !prev)}
            >
              <Icon name={isPaused ? 'play' : 'pause'} size={16} />
              <span>{isPaused ? 'Resume Oscillation' : 'Pause Oscillation'}</span>
            </button>
            <button
              className="secondary-action-btn reset"
              onClick={() => resetToAngle(initialAngleDeg)}
              title="Reset to release angle"
            >
              <Icon name="reset" size={16} />
              <span>Reset</span>
            </button>
          </div>

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

          <div className="control-group">
            <div className="control-label-row">
              <label htmlFor="pendulum-angle">Initial Release Angle (θ₀)</label>
              <div className="input-with-unit">
                <input
                  id="pendulum-angle"
                  type="number"
                  min="5"
                  max="80"
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
              max="75"
              step="1"
              value={initialAngleDeg}
              onChange={(e) => setInitialAngleDeg(Number(e.target.value))}
              className="range-slider"
            />
          </div>

          <div className="control-group">
            <div className="control-label-row">
              <label htmlFor="pendulum-damping">Damping / Air Resistance</label>
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
