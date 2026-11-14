import React, { useRef, useEffect, useState } from 'react';
import Icon from '../../../components/Icon.jsx';
import {
  calculateSchwarzschildRadius,
  calculateCriticalImpactParameter,
  calculateWeakFieldDeflection,
  traceRelativisticPhotonGeodesic,
  formatMetricDistance,
} from '../physics.js';
import { SOLAR_MASS_KG } from '../constants.js';

export default function GravitationalLensing({
  massSolar = 10,
}) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // Impact parameter state (units of r_s)
  const [impactParamRs, setImpactParamRs] = useState(3.4);
  const [mode, setMode] = useState('single'); // 'single' | 'bundle'
  const [bundleCount, setBundleCount] = useState(11);
  const [photonProgress, setPhotonProgress] = useState(0); // 0 to 1 for animated photon
  const [isFiring, setIsFiring] = useState(true);

  const massKg = massSolar * SOLAR_MASS_KG;
  const rsMeters = calculateSchwarzschildRadius(massKg);
  const bCritRs = 2.598076;
  const bCritMeters = calculateCriticalImpactParameter(rsMeters);

  // Trace geodesic for current single ray
  const singleGeodesic = traceRelativisticPhotonGeodesic(impactParamRs);

  // Continuous animation loop for traveling photon pulse
  useEffect(() => {
    let lastTime = performance.now();
    const animate = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (isFiring) {
        setPhotonProgress((prev) => {
          const next = prev + dt * 0.45;
          return next > 1.0 ? 0 : next;
        });
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isFiring]);

  // Main Canvas Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Dark space background
    ctx.fillStyle = '#060913';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    const centerX = displayWidth * 0.45;
    const centerY = displayHeight * 0.5;

    // Coordinate scale: 1 r_s = scalePx
    const scalePx = Math.min(displayWidth, displayHeight) / 22;

    const rsPx = 1.0 * scalePx;
    const rPhPx = 1.5 * scalePx;
    const bCritPx = bCritRs * scalePx;

    // 1. Draw subtle background coordinate grid
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
    ctx.lineWidth = 0.75;
    const gridStep = 2.0 * scalePx;

    for (let x = centerX % gridStep; x < displayWidth; x += gridStep) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, displayHeight);
      ctx.stroke();
    }
    for (let y = centerY % gridStep; y < displayHeight; y += gridStep) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(displayWidth, y);
      ctx.stroke();
    }

    // 2. Critical Capture Cylinder Guides (y = ± b_crit)
    ctx.save();
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 4]);

    ctx.beginPath();
    ctx.moveTo(0, centerY - bCritPx);
    ctx.lineTo(displayWidth, centerY - bCritPx);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, centerY + bCritPx);
    ctx.lineTo(displayWidth, centerY + bCritPx);
    ctx.stroke();

    ctx.fillStyle = 'rgba(239, 68, 68, 0.7)';
    ctx.font = '10px sans-serif';
    ctx.fillText('+b_crit = 2.598 r_s (Capture Boundary)', 15, centerY - bCritPx - 6);
    ctx.fillText('-b_crit = -2.598 r_s', 15, centerY + bCritPx + 14);
    ctx.restore();

    // 3. Render Black Hole Structures (Event Horizon & Photon Sphere)
    // Critical shadow disk
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, bCritPx, 0, Math.PI * 2);
    ctx.fill();

    // Photon Sphere (1.5 r_s)
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.arc(centerX, centerY, rPhPx, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Event Horizon (1.0 r_s)
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, rsPx, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Singularity center point
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // 4. Render Geodesic Trajectories
    if (mode === 'bundle') {
      // Multi-Ray Bundle Mode
      const bMin = 1.0;
      const bMax = 6.0;
      const stepB = (bMax - bMin) / (bundleCount - 1);

      for (let i = 0; i < bundleCount; i++) {
        const bVal = bMin + i * stepB;
        const res = traceRelativisticPhotonGeodesic(bVal);

        const isCap = res.captured;
        ctx.strokeStyle = isCap ? 'rgba(239, 68, 68, 0.75)' : 'rgba(56, 189, 248, 0.85)';
        ctx.lineWidth = isCap ? 1.2 : 1.6;

        ctx.beginPath();
        for (let pIdx = 0; pIdx < res.points.length; pIdx++) {
          const pt = res.points[pIdx];
          const scrX = centerX + pt.x * scalePx;
          const scrY = centerY - pt.y * scalePx; // invert Y for screen coords

          if (pIdx === 0) ctx.moveTo(scrX, scrY);
          else ctx.lineTo(scrX, scrY);
        }
        ctx.stroke();
      }
    } else {
      // Single Ray Mode with Animated Traveling Photon
      const res = singleGeodesic;
      const isCap = res.captured;

      // Full trajectory line
      ctx.strokeStyle = isCap ? '#ef4444' : '#38bdf8';
      ctx.lineWidth = 2.2;
      ctx.beginPath();

      for (let pIdx = 0; pIdx < res.points.length; pIdx++) {
        const pt = res.points[pIdx];
        const scrX = centerX + pt.x * scalePx;
        const scrY = centerY - pt.y * scalePx;

        if (pIdx === 0) ctx.moveTo(scrX, scrY);
        else ctx.lineTo(scrX, scrY);
      }
      ctx.stroke();

      // Closest approach radius marker if not captured
      if (!isCap && res.points.length > 5) {
        let minPt = res.points[0];
        let minD = minPt.r;
        for (const p of res.points) {
          if (p.r < minD) {
            minD = p.r;
            minPt = p;
          }
        }

        const scrMinX = centerX + minPt.x * scalePx;
        const scrMinY = centerY - minPt.y * scalePx;

        // Line from center to closest approach
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.6)';
        ctx.setLineDash([3, 2]);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(scrMinX, scrMinY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(scrMinX, scrMinY, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = '10px sans-serif';
        ctx.fillText(`r_min = ${res.minRadiusRs.toFixed(2)} r_s`, scrMinX + 8, scrMinY - 6);
      }

      // Traveling animated photon wavepacket
      if (res.points.length > 2) {
        const ptIndexFloat = photonProgress * (res.points.length - 1);
        const idxLow = Math.floor(ptIndexFloat);
        const idxHigh = Math.min(idxLow + 1, res.points.length - 1);
        const lerp = ptIndexFloat - idxLow;

        const p1 = res.points[idxLow];
        const p2 = res.points[idxHigh];

        const curX = p1.x + (p2.x - p1.x) * lerp;
        const curY = p1.y + (p2.y - p1.y) * lerp;
        const scrX = centerX + curX * scalePx;
        const scrY = centerY - curY * scalePx;

        // Glowing photon packet
        const photonGrad = ctx.createRadialGradient(scrX, scrY, 1, scrX, scrY, 10);
        photonGrad.addColorStop(0, '#ffffff');
        photonGrad.addColorStop(0.4, isCap ? '#fca5a5' : '#7dd3fc');
        photonGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.fillStyle = photonGrad;
        ctx.beginPath();
        ctx.arc(scrX, scrY, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(scrX, scrY, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }, [
    impactParamRs,
    mode,
    bundleCount,
    photonProgress,
    singleGeodesic,
    massSolar,
  ]);

  // Weak field deflection comparison
  const weakAlphaRad = calculateWeakFieldDeflection(impactParamRs * rsMeters, rsMeters);
  const weakAlphaDeg = (weakAlphaRad * 180) / Math.PI;

  return (
    <div className="bh-canvas-card">
      <div className="bh-canvas-toolbar">
        <div className="bh-canvas-title-group">
          <Icon name="sparkles" size={18} color="#ea580c" />
          <h3 className="bh-canvas-title">Gravitational Lensing & Geodesic Ray-Tracing</h3>
          <span className="bh-canvas-badge">Null Geodesic ODE</span>
        </div>

        <div className="bh-toolbar-actions">
          <button
            className={`bh-tool-btn ${mode === 'single' ? 'active' : ''}`}
            onClick={() => setMode('single')}
          >
            <span>Single Ray Pulse</span>
          </button>
          <button
            className={`bh-tool-btn ${mode === 'bundle' ? 'active' : ''}`}
            onClick={() => setMode('bundle')}
          >
            <span>Parallel Bundle</span>
          </button>
          {mode === 'single' && (
            <button
              className="bh-tool-btn"
              onClick={() => setIsFiring(!isFiring)}
            >
              <Icon name={isFiring ? 'pause' : 'play'} size={14} />
              <span>{isFiring ? 'Pause' : 'Resume'}</span>
            </button>
          )}
        </div>
      </div>

      <div className="bh-viewport-wrap">
        <canvas ref={canvasRef} className="bh-canvas" />

        <div className="bh-hud-overlay">
          <div className="bh-hud-tag">
            Impact Parameter b: {impactParamRs.toFixed(2)} r_s ({formatMetricDistance(impactParamRs * rsMeters)})
          </div>
          <div
            className="bh-hud-tag"
            style={{
              color: singleGeodesic.captured ? '#ef4444' : '#38bdf8',
              borderColor: singleGeodesic.captured ? '#ef4444' : '#38bdf8',
              fontWeight: 700,
            }}
          >
            {singleGeodesic.captured ? 'STATUS: CAPTURED INTO EVENT HORIZON (b < b_crit)' : 'STATUS: DEFLECTED TO INFINITY (b ≥ b_crit)'}
          </div>
        </div>

        <div className="bh-hud-controls-hint">
          b_crit = (3√3 / 2) r_s ≈ 2.598 r_s • Photons inside b_crit plunge into horizon
        </div>
      </div>

      {/* Interactive Sliders & Telemetry */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-secondary)' }}>
        {mode === 'single' ? (
          <div className="bh-control-group">
            <div className="bh-label-row">
              <span className="bh-label">Adjust Impact Parameter (b):</span>
              <span className="bh-value-badge">{impactParamRs.toFixed(2)} r_s</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="8.0"
              step="0.05"
              value={impactParamRs}
              onChange={(e) => setImpactParamRs(parseFloat(e.target.value))}
              className="bh-slider"
            />
          </div>
        ) : (
          <div className="bh-control-group">
            <div className="bh-label-row">
              <span className="bh-label">Ray Bundle Density:</span>
              <span className="bh-value-badge">{bundleCount} rays</span>
            </div>
            <input
              type="range"
              min="5"
              max="21"
              step="2"
              value={bundleCount}
              onChange={(e) => setBundleCount(parseInt(e.target.value, 10))}
              className="bh-slider"
            />
          </div>
        )}

        <div className="bh-metric-grid">
          <div className="bh-metric-box">
            <span className="bh-metric-label">Relativistic Deflection (α)</span>
            <span className="bh-metric-val">
              {singleGeodesic.captured ? 'N/A (Captured)' : `${singleGeodesic.deflectionDeg.toFixed(2)}°`}
            </span>
            <span className="bh-metric-sub">
              {singleGeodesic.captured ? 'Trajectory plunges into horizon' : `${singleGeodesic.deflectionRad.toFixed(4)} radians`}
            </span>
          </div>

          <div className="bh-metric-box">
            <span className="bh-metric-label">Weak-Field Einstein α</span>
            <span className="bh-metric-val">{weakAlphaDeg.toFixed(2)}°</span>
            <span className="bh-metric-sub">α ≈ 4GM / (b·c²) = 2 r_s / b</span>
          </div>

          <div className="bh-metric-box">
            <span className="bh-metric-label">Closest Approach (r_min)</span>
            <span className="bh-metric-val">
              {singleGeodesic.captured ? 'r ≤ 1.00 r_s' : `${singleGeodesic.minRadiusRs.toFixed(2)} r_s`}
            </span>
            <span className="bh-metric-sub">
              {singleGeodesic.captured
                ? 'Crosses event horizon'
                : formatMetricDistance(singleGeodesic.minRadiusRs * rsMeters)}
            </span>
          </div>

          <div className="bh-metric-box">
            <span className="bh-metric-label">Critical Boundary (b_crit)</span>
            <span className="bh-metric-val">{bCritRs.toFixed(3)} r_s</span>
            <span className="bh-metric-sub">{formatMetricDistance(bCritMeters)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
