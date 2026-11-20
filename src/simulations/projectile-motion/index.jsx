import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  calculateAnalyticalTrajectory,
  calculateInstantaneousState,
  sampleTrajectoryPath,
} from './physics';
import Icon from '../../components/Icon';
import './styles.css';

const PRESETS = [
  {
    name: 'Classic 45° (Max Range)',
    v0: 50,
    angle: 45,
    g: 9.81,
    h0: 0,
    desc: 'Optimal 45° angle maximizing horizontal distance on flat ground.',
  },
  {
    name: 'High Angle Arc (70°)',
    v0: 55,
    angle: 70,
    g: 9.81,
    h0: 0,
    desc: 'High apogee, long hang time, steep landing impact angle.',
  },
  {
    name: 'Cliff Launch',
    v0: 35,
    angle: 25,
    g: 9.81,
    h0: 35,
    desc: 'Launched from an elevated 35m cliff requiring quadratic landing time.',
  },
  {
    name: 'Horizontal Fire',
    v0: 45,
    angle: 0,
    g: 9.81,
    h0: 50,
    desc: 'Zero initial vertical velocity launched from a 50m tower.',
  },
  {
    name: 'Moon Gravity',
    v0: 30,
    angle: 45,
    g: 1.62,
    h0: 0,
    desc: 'Lunar exploration with 1/6th Earth gravity yielding massive range.',
  },
];

const PLANETS = [
  { name: 'Earth', g: 9.81 },
  { name: 'Moon', g: 1.62 },
  { name: 'Mars', g: 3.71 },
  { name: 'Jupiter', g: 24.79 },
];

export default function ProjectileMotionSimulation() {
  // Primary Physics Parameters
  const [v0, setV0] = useState(50);
  const [angle, setAngle] = useState(45);
  const [g, setG] = useState(9.81);
  const [h0, setH0] = useState(0);

  // Visualization Options
  const [showVectors, setShowVectors] = useState(true);
  const [showComponents, setShowComponents] = useState(true);
  const [showTrajectory, setShowTrajectory] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Animation State
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Active tab: 'simulation' or 'theory'
  const [activeTab, setActiveTab] = useState('simulation');

  // Canvas & Animation References
  const canvasRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const lastTimeRef = useRef(null);
  const simTimeRef = useRef(0);
  const trailRef = useRef([]);

  // Telemetry DOM references for zero React re-render 60fps telemetry
  const hudTimeRef = useRef(null);
  const hudXRef = useRef(null);
  const hudYRef = useRef(null);
  const hudVRef = useRef(null);
  const hudVxRef = useRef(null);
  const hudVyRef = useRef(null);

  // Analytical Trajectory calculation
  const analytical = useMemo(() => {
    return calculateAnalyticalTrajectory({ v0, angle, g, h0 });
  }, [v0, angle, g, h0]);

  // Sampled theoretical trajectory path
  const trajectoryPoints = useMemo(() => {
    return sampleTrajectoryPath({ v0, angle, g, h0 }, analytical, 180);
  }, [v0, angle, g, h0, analytical]);

  // Update HUD elements without triggering React re-renders
  const updateHUD = useCallback((state) => {
    if (hudTimeRef.current) hudTimeRef.current.textContent = `${state.t.toFixed(2)} s`;
    if (hudXRef.current) hudXRef.current.textContent = `${state.x.toFixed(1)} m`;
    if (hudYRef.current) hudYRef.current.textContent = `${state.y.toFixed(1)} m`;
    if (hudVRef.current) hudVRef.current.textContent = `${state.v.toFixed(1)} m/s`;
    if (hudVxRef.current) hudVxRef.current.textContent = `${state.vx.toFixed(1)} m/s`;
    if (hudVyRef.current) hudVyRef.current.textContent = `${state.vy.toFixed(1)} m/s`;
  }, []);

  // Main Canvas Rendering Routine
  const renderCanvas = useCallback(
    (currentSimTime) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      const dpr = window.devicePixelRatio || 1;

      // Coordinate Scaling & Bounds
      // Determine world view window
      const worldMaxX = Math.max(analytical.range, 30);
      const worldMaxY = Math.max(analytical.yMax, h0, 20);

      // Canvas Margins in physical canvas pixels
      const padLeft = 70 * dpr;
      const padBottom = 55 * dpr;
      const padTop = 45 * dpr;
      const padRight = 60 * dpr;

      const availWidth = width - padLeft - padRight;
      const availHeight = height - padBottom - padTop;

      // Calculate uniform scale (pixels per meter)
      const scaleX = availWidth / (worldMaxX * 1.12);
      const scaleY = availHeight / (worldMaxY * 1.25);
      const scale = Math.min(scaleX, scaleY);

      // Coordinate mapping helpers
      const toScreenX = (x) => padLeft + x * scale;
      const toScreenY = (y) => height - padBottom - y * scale;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Background Gradient
      // Background Gradient (Permanent Light Theme)
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#ffffff');
      bgGrad.addColorStop(1, '#f8fafc');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Grid Lines & Markings
      if (showGrid) {
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
        ctx.lineWidth = 1 * dpr;
        ctx.fillStyle = '#64748b';
        ctx.font = `${10 * dpr}px 'Fira Code', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        // Select sensible tick interval based on range
        let step = 10;
        if (worldMaxX > 200) step = 50;
        else if (worldMaxX > 100) step = 20;
        else if (worldMaxX < 40) step = 5;

        // Vertical Grid Lines (X-axis ticks)
        for (let x = 0; x <= worldMaxX * 1.2; x += step) {
          const sx = toScreenX(x);
          if (sx > width - 10 * dpr) break;

          ctx.beginPath();
          ctx.moveTo(sx, toScreenY(0));
          ctx.lineTo(sx, padTop);
          ctx.stroke();

          // Tick Label
          ctx.fillText(`${x}m`, sx, toScreenY(0) + 8 * dpr);
        }

        // Horizontal Grid Lines (Y-axis ticks)
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let y = step; y <= worldMaxY * 1.3; y += step) {
          const sy = toScreenY(y);
          if (sy < padTop - 10 * dpr) break;

          ctx.beginPath();
          ctx.moveTo(padLeft, sy);
          ctx.lineTo(width - padRight, sy);
          ctx.stroke();

          // Tick Label
          ctx.fillText(`${y}m`, padLeft - 8 * dpr, sy);
        }
        ctx.restore();
      }

      // 2. Draw Ground & Launch Cliff
      ctx.save();
      // Ground plane
      const groundY = toScreenY(0);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2 * dpr;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.stroke();

      // Ground Fill
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(0, groundY, width, height - groundY);

      // Ground Surface Glow Line
      ctx.strokeStyle = 'rgba(2, 132, 199, 0.35)';
      ctx.lineWidth = 1 * dpr;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.stroke();

      // Launch Platform / Cliff if h0 > 0
      if (h0 > 0) {
        const cliffWidth = Math.max(30 * dpr, 15 * scale);
        const cliffTop = toScreenY(h0);
        const cliffLeft = padLeft - cliffWidth;

        // Cliff body
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(cliffLeft, cliffTop, cliffWidth, groundY - cliffTop);

        // Cliff border
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5 * dpr;
        ctx.strokeRect(cliffLeft, cliffTop, cliffWidth, groundY - cliffTop);

        // Platform top glow
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 2 * dpr;
        ctx.beginPath();
        ctx.moveTo(cliffLeft, cliffTop);
        ctx.lineTo(padLeft, cliffTop);
        ctx.stroke();

        // Elevation dimension line
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.7)';
        ctx.lineWidth = 1 * dpr;
        ctx.setLineDash([3 * dpr, 3 * dpr]);
        ctx.beginPath();
        ctx.moveTo(cliffLeft - 8 * dpr, groundY);
        ctx.lineTo(cliffLeft - 8 * dpr, cliffTop);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#d97706';
        ctx.font = `${10 * dpr}px 'Fira Code', monospace`;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(`h₀ = ${h0}m`, cliffLeft - 12 * dpr, (groundY + cliffTop) / 2);
      }
      ctx.restore();

      // 3. Draw Launcher Barrel at (0, h0)
      ctx.save();
      const originX = toScreenX(0);
      const originY = toScreenY(h0);
      const barrelLen = 28 * dpr;
      const barrelAngleRad = -analytical.theta; // inverted Y

      ctx.translate(originX, originY);
      ctx.rotate(barrelAngleRad);

      // Barrel tube
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.5 * dpr;
      ctx.beginPath();
      ctx.roundRect(0, -5 * dpr, barrelLen, 10 * dpr, 2 * dpr);
      ctx.fill();
      ctx.stroke();

      // Barrel muzzle ring
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(barrelLen - 3 * dpr, -6 * dpr, 3 * dpr, 12 * dpr);
      ctx.restore();

      // Launcher Pivot Base
      ctx.save();
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(originX, originY, 8 * dpr, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2 * dpr;
      ctx.stroke();

      // Angle indicator arc
      if (angle > 0) {
        ctx.strokeStyle = 'rgba(2, 132, 199, 0.6)';
        ctx.lineWidth = 1.5 * dpr;
        ctx.setLineDash([2 * dpr, 2 * dpr]);
        ctx.beginPath();
        ctx.arc(originX, originY, 32 * dpr, 0, -analytical.theta, true);
        ctx.stroke();
        ctx.setLineDash([]);

        // Angle text
        const midAngle = -analytical.theta / 2;
        const textX = originX + Math.cos(midAngle) * 44 * dpr;
        const textY = originY + Math.sin(midAngle) * 44 * dpr;
        ctx.fillStyle = '#0284c7';
        ctx.font = `bold ${10 * dpr}px 'Fira Code', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${angle}°`, textX, textY);
      }
      ctx.restore();

      // 4. Draw Full Theoretical Parabolic Path
      if (showTrajectory && trajectoryPoints.length > 1) {
        ctx.save();
        ctx.strokeStyle = 'rgba(79, 70, 229, 0.55)';
        ctx.lineWidth = 2 * dpr;
        ctx.setLineDash([4 * dpr, 4 * dpr]);
        ctx.beginPath();

        trajectoryPoints.forEach((pt, idx) => {
          const sx = toScreenX(pt.x);
          const sy = toScreenY(pt.y);
          if (idx === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        });
        ctx.stroke();
        ctx.restore();
      }

      // 5. Draw Key Analytical Markers (Max Height & Range)
      ctx.save();
      // Apex / Max Height
      const apexScreenX = toScreenX(analytical.xApex);
      const apexScreenY = toScreenY(analytical.yMax);

      // Apex vertical dashed line
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.45)';
      ctx.lineWidth = 1 * dpr;
      ctx.setLineDash([3 * dpr, 3 * dpr]);
      ctx.beginPath();
      ctx.moveTo(apexScreenX, groundY);
      ctx.lineTo(apexScreenX, apexScreenY);
      ctx.stroke();

      // Apex horizontal dashed line to Y-axis
      ctx.beginPath();
      ctx.moveTo(padLeft, apexScreenY);
      ctx.lineTo(apexScreenX, apexScreenY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Apex marker node
      ctx.fillStyle = '#7c3aed';
      ctx.beginPath();
      ctx.arc(apexScreenX, apexScreenY, 4 * dpr, 0, Math.PI * 2);
      ctx.fill();

      // Apex Badge
      ctx.font = `600 ${10 * dpr}px 'Inter', sans-serif`;
      ctx.fillStyle = '#7c3aed';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`H_max: ${analytical.yMax.toFixed(1)}m`, apexScreenX, apexScreenY - 6 * dpr);

      // Range Marker at landing point
      const landScreenX = toScreenX(analytical.range);
      ctx.fillStyle = '#059669';
      ctx.beginPath();
      ctx.arc(landScreenX, groundY, 4 * dpr, 0, Math.PI * 2);
      ctx.fill();

      // Range measurement bracket along ground
      ctx.strokeStyle = 'rgba(5, 150, 105, 0.7)';
      ctx.lineWidth = 1.5 * dpr;
      ctx.beginPath();
      ctx.moveTo(originX, groundY + 18 * dpr);
      ctx.lineTo(landScreenX, groundY + 18 * dpr);
      ctx.moveTo(originX, groundY + 12 * dpr);
      ctx.lineTo(originX, groundY + 24 * dpr);
      ctx.moveTo(landScreenX, groundY + 12 * dpr);
      ctx.lineTo(landScreenX, groundY + 24 * dpr);
      ctx.stroke();

      ctx.fillStyle = '#059669';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(`Range: ${analytical.range.toFixed(1)}m`, (originX + landScreenX) / 2, groundY + 26 * dpr);
      ctx.restore();

      // 6. Draw Particle Trail Behind Active Projectile
      const state = calculateInstantaneousState(currentSimTime, { v0, angle, g, h0 }, analytical);
      updateHUD(state);

      if (trailRef.current.length > 1) {
        ctx.save();
        ctx.lineWidth = 3 * dpr;
        for (let i = 1; i < trailRef.current.length; i++) {
          const p1 = trailRef.current[i - 1];
          const p2 = trailRef.current[i];
          const alpha = (i / trailRef.current.length) * 0.7;

          const trailColor = 'rgba(2, 132, 199,';
          ctx.strokeStyle = `${trailColor} ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(toScreenX(p1.x), toScreenY(p1.y));
          ctx.lineTo(toScreenX(p2.x), toScreenY(p2.y));
          ctx.stroke();
        }
        ctx.restore();
      }

      // 7. Draw Active Projectile Ball
      const projX = toScreenX(state.x);
      const projY = toScreenY(state.y);
      const ballRadius = 7 * dpr;

      ctx.save();
      // Outer Glow
      const glowGrad = ctx.createRadialGradient(projX, projY, 0, projX, projY, ballRadius * 2.5);
      glowGrad.addColorStop(0, 'rgba(2, 132, 199, 0.35)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(projX, projY, ballRadius * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Ball Body
      const ballGrad = ctx.createRadialGradient(
        projX - ballRadius * 0.3,
        projY - ballRadius * 0.3,
        0,
        projX,
        projY,
        ballRadius
      );
      ballGrad.addColorStop(0, '#7dd3fc');
      ballGrad.addColorStop(0.5, '#0284c7');
      ballGrad.addColorStop(1, '#0369a1');
      ctx.fillStyle = ballGrad;
      ctx.beginPath();
      ctx.arc(projX, projY, ballRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1 * dpr;
      ctx.stroke();
      ctx.restore();

      // 8. Draw Velocity Vectors
      if (showVectors && !state.isLanded) {
        const vScale = 0.8 * dpr; // pixels per m/s

        // Resultant Velocity Vector
        const vxPx = state.vx * vScale;
        const vyPx = -state.vy * vScale; // invert Y for screen coords

        ctx.save();
        const vColor = '#0284c7';
        const vxColor = '#059669';
        const vyColor = '#d97706';
        const boxColor = 'rgba(0, 0, 0, 0.15)';

        // Draw arrow function
        const drawArrow = (fromX, fromY, toX, toY, color, label) => {
          const headlen = 8 * dpr;
          const dx = toX - fromX;
          const dy = toY - fromY;
          const ang = Math.atan2(dy, dx);

          ctx.strokeStyle = color;
          ctx.fillStyle = color;

          ctx.beginPath();
          ctx.moveTo(fromX, fromY);
          ctx.lineTo(toX, toY);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(toX, toY);
          ctx.lineTo(toX - headlen * Math.cos(ang - Math.PI / 6), toY - headlen * Math.sin(ang - Math.PI / 6));
          ctx.lineTo(toX - headlen * Math.cos(ang + Math.PI / 6), toY - headlen * Math.sin(ang + Math.PI / 6));
          ctx.closePath();
          ctx.fill();

          if (label) {
            ctx.font = `600 ${9 * dpr}px 'Fira Code', monospace`;
            ctx.fillText(label, toX + 5 * dpr, toY - 5 * dpr);
          }
        };

        // Main Velocity Vector
        drawArrow(projX, projY, projX + vxPx, projY + vyPx, vColor, `v = ${state.v.toFixed(1)}`);

        // Component Vectors
        if (showComponents) {
          // Horizontal component Vx
          drawArrow(projX, projY, projX + vxPx, projY, vxColor, `Vx = ${state.vx.toFixed(1)}`);

          // Vertical component Vy
          drawArrow(projX, projY, projX, projY + vyPx, vyColor, `Vy = ${state.vy.toFixed(1)}`);

          // Dashed box projection
          ctx.strokeStyle = boxColor;
          ctx.lineWidth = 1 * dpr;
          ctx.setLineDash([2 * dpr, 2 * dpr]);
          ctx.beginPath();
          ctx.moveTo(projX + vxPx, projY);
          ctx.lineTo(projX + vxPx, projY + vyPx);
          ctx.lineTo(projX, projY + vyPx);
          ctx.stroke();
        }
        ctx.restore();
      }
    },
    [
      analytical,
      h0,
      angle,
      v0,
      g,
      showGrid,
      showTrajectory,
      trajectoryPoints,
      showVectors,
      showComponents,
      updateHUD,
    ]
  );

  // Resize canvas according to display resolution & DPI
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    renderCanvas(simTimeRef.current);
  }, [renderCanvas]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Initial and param change render
  useEffect(() => {
    // If not running, reset time to 0 and render initial frame
    if (!isRunning) {
      simTimeRef.current = 0;
      trailRef.current = [{ x: 0, y: h0 }];
      renderCanvas(0);
    } else {
      renderCanvas(simTimeRef.current);
    }
  }, [v0, angle, g, h0, isRunning, renderCanvas]);

  // Animation Loop using requestAnimationFrame
  useEffect(() => {
    if (!isRunning || isPaused) {
      lastTimeRef.current = null;
      return;
    }

    let isCancelled = false;

    const animate = (timestamp) => {
      if (isCancelled) return;

      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const deltaMs = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Advance physics time according to playback speed
      const dtSeconds = (deltaMs / 1000) * playbackSpeed;
      simTimeRef.current += dtSeconds;

      // Add to projectile trail
      const currentState = calculateInstantaneousState(
        simTimeRef.current,
        { v0, angle, g, h0 },
        analytical
      );

      // Add point to trail periodically
      if (trailRef.current.length === 0 || simTimeRef.current - (trailRef.current[trailRef.current.length - 1].t || 0) > 0.03) {
        trailRef.current.push({ x: currentState.x, y: currentState.y, t: simTimeRef.current });
        if (trailRef.current.length > 200) trailRef.current.shift();
      }

      renderCanvas(simTimeRef.current);

      if (currentState.isLanded) {
        setIsRunning(false);
        setIsCompleted(true);
        lastTimeRef.current = null;
      } else {
        animFrameIdRef.current = requestAnimationFrame(animate);
      }
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      isCancelled = true;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isRunning, isPaused, playbackSpeed, v0, angle, g, h0, analytical, renderCanvas]);

  // Control Actions
  const handleLaunch = () => {
    simTimeRef.current = 0;
    trailRef.current = [{ x: 0, y: h0 }];
    setIsCompleted(false);
    setIsPaused(false);
    setIsRunning(true);
  };

  const handlePauseResume = () => {
    setIsPaused((prev) => !prev);
  };

  const handleReset = () => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
    }
    setIsRunning(false);
    setIsPaused(false);
    setIsCompleted(false);
    simTimeRef.current = 0;
    trailRef.current = [{ x: 0, y: h0 }];
    renderCanvas(0);
  };

  const handleApplyPreset = (p) => {
    handleReset();
    setV0(p.v0);
    setAngle(p.angle);
    setG(p.g);
    setH0(p.h0);
  };

  return (
    <div className="projectile-simulation-root">
      {/* Simulation Workspace Header Tabs */}
      <div className="workspace-tabs">
        <button
          className={`tab-btn ${activeTab === 'simulation' ? 'active' : ''}`}
          onClick={() => setActiveTab('simulation')}
        >
          <Icon name="atom" size={16} />
          <span>Interactive Canvas & Controls</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'theory' ? 'active' : ''}`}
          onClick={() => setActiveTab('theory')}
        >
          <Icon name="book" size={16} />
          <span>Physics Derivations & Formulas</span>
        </button>
      </div>

      {activeTab === 'simulation' ? (
        <div className="sim-grid">
          {/* Main Visualizer Area */}
          <div className="canvas-wrapper">
            {/* Top Canvas Bar with quick vector options */}
            <div className="canvas-overlay-bar">
              <div className="overlay-group">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={showVectors}
                    onChange={(e) => setShowVectors(e.target.checked)}
                  />
                  <span>Velocity Vector (v)</span>
                </label>
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={showComponents}
                    onChange={(e) => setShowComponents(e.target.checked)}
                  />
                  <span>Components (Vx, Vy)</span>
                </label>
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={showTrajectory}
                    onChange={(e) => setShowTrajectory(e.target.checked)}
                  />
                  <span>Trajectory Arc</span>
                </label>
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={showGrid}
                    onChange={(e) => setShowGrid(e.target.checked)}
                  />
                  <span>Grid & Scale</span>
                </label>
              </div>

              <div className="speed-selector">
                <span className="speed-title">Speed:</span>
                {[0.25, 0.5, 1, 2].map((spd) => (
                  <button
                    key={spd}
                    className={`speed-chip ${playbackSpeed === spd ? 'active' : ''}`}
                    onClick={() => setPlaybackSpeed(spd)}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Canvas */}
            <div className="canvas-container">
              <canvas ref={canvasRef} className="physics-canvas" />

              {/* Status Overlay */}
              {isCompleted && (
                <div className="canvas-badge completed">
                  <Icon name="check" size={14} color="#10b981" />
                  <span>Target Landed</span>
                </div>
              )}
              {isPaused && (
                <div className="canvas-badge paused">
                  <Icon name="pause" size={14} color="#f59e0b" />
                  <span>Simulation Paused</span>
                </div>
              )}
            </div>

            {/* Live Telemetry HUD Bar */}
            <div className="telemetry-bar">
              <div className="telemetry-item">
                <span className="tel-label">Time (t)</span>
                <span ref={hudTimeRef} className="tel-val mono">0.00 s</span>
              </div>
              <div className="telemetry-item">
                <span className="tel-label">Position X</span>
                <span ref={hudXRef} className="tel-val mono">0.0 m</span>
              </div>
              <div className="telemetry-item">
                <span className="tel-label">Position Y</span>
                <span ref={hudYRef} className="tel-val mono">{h0.toFixed(1)} m</span>
              </div>
              <div className="telemetry-item">
                <span className="tel-label">Velocity |v|</span>
                <span ref={hudVRef} className="tel-val mono">{v0.toFixed(1)} m/s</span>
              </div>
              <div className="telemetry-item">
                <span className="tel-label">Vx</span>
                <span ref={hudVxRef} className="tel-val mono">{(v0 * Math.cos(analytical.theta)).toFixed(1)} m/s</span>
              </div>
              <div className="telemetry-item">
                <span className="tel-label">Vy</span>
                <span ref={hudVyRef} className="tel-val mono">{(v0 * Math.sin(analytical.theta)).toFixed(1)} m/s</span>
              </div>
            </div>

            {/* Pre-calculated Analytical Summary Cards */}
            <div className="summary-cards">
              <div className="summary-card">
                <span className="sum-title">Max Height (H_max)</span>
                <span className="sum-val mono">{analytical.yMax.toFixed(2)} m</span>
                <span className="sum-sub">Apex at t = {analytical.tApex.toFixed(2)}s</span>
              </div>
              <div className="summary-card">
                <span className="sum-title">Total Range (R)</span>
                <span className="sum-val mono">{analytical.range.toFixed(2)} m</span>
                <span className="sum-sub">Touchdown distance</span>
              </div>
              <div className="summary-card">
                <span className="sum-title">Flight Time (t_flight)</span>
                <span className="sum-val mono">{analytical.tFlight.toFixed(2)} s</span>
                <span className="sum-sub">Quadratic solution</span>
              </div>
              <div className="summary-card">
                <span className="sum-title">Impact Velocity</span>
                <span className="sum-val mono">{analytical.vImpact.toFixed(2)} m/s</span>
                <span className="sum-sub">Angle: {analytical.impactAngleDeg.toFixed(1)}°</span>
              </div>
            </div>
          </div>

          {/* Interactive Controls Panel */}
          <aside className="controls-panel">
            <div className="panel-header">
              <Icon name="sliders" size={18} color="var(--accent-cyan)" />
              <h3>Physics Parameters</h3>
            </div>

            {/* Launch Action Controls */}
            <div className="action-buttons">
              {!isRunning ? (
                <button className="primary-action-btn launch" onClick={handleLaunch}>
                  <Icon name="play" size={16} />
                  <span>{isCompleted ? 'Re-Launch Projectile' : 'Launch Projectile'}</span>
                </button>
              ) : (
                <button className="primary-action-btn pause" onClick={handlePauseResume}>
                  <Icon name={isPaused ? 'play' : 'pause'} size={16} />
                  <span>{isPaused ? 'Resume' : 'Pause'}</span>
                </button>
              )}

              <button className="secondary-action-btn reset" onClick={handleReset} title="Reset simulation">
                <Icon name="reset" size={16} />
                <span>Reset</span>
              </button>
            </div>

            {/* Sliders & Numerical Inputs */}
            <div className="control-group">
              <div className="control-label-row">
                <label htmlFor="input-v0">Initial Velocity (V₀)</label>
                <div className="input-with-unit">
                  <input
                    id="input-v0"
                    type="number"
                    min="1"
                    max="150"
                    step="1"
                    value={v0}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= 0) setV0(val);
                    }}
                    className="num-input mono"
                  />
                  <span className="unit">m/s</span>
                </div>
              </div>
              <input
                type="range"
                min="5"
                max="120"
                step="1"
                value={v0}
                onChange={(e) => setV0(Number(e.target.value))}
                className="range-slider"
              />
            </div>

            <div className="control-group">
              <div className="control-label-row">
                <label htmlFor="input-angle">Launch Angle (θ)</label>
                <div className="input-with-unit">
                  <input
                    id="input-angle"
                    type="number"
                    min="0"
                    max="90"
                    step="1"
                    value={angle}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= 0 && val <= 90) setAngle(val);
                    }}
                    className="num-input mono"
                  />
                  <span className="unit">deg (°)</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="1"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="range-slider"
              />
              <div className="angle-quick-chips">
                {[15, 30, 45, 60, 75].map((a) => (
                  <button
                    key={a}
                    className={`chip ${angle === a ? 'active' : ''}`}
                    onClick={() => setAngle(a)}
                  >
                    {a}°
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <div className="control-label-row">
                <label htmlFor="input-h0">Launch Height (h₀)</label>
                <div className="input-with-unit">
                  <input
                    id="input-h0"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={h0}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= 0) setH0(val);
                    }}
                    className="num-input mono"
                  />
                  <span className="unit">meters</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                step="1"
                value={h0}
                onChange={(e) => setH0(Number(e.target.value))}
                className="range-slider"
              />
            </div>

            <div className="control-group">
              <div className="control-label-row">
                <label htmlFor="input-g">Gravity Acceleration (g)</label>
                <div className="input-with-unit">
                  <input
                    id="input-g"
                    type="number"
                    min="0.5"
                    max="30"
                    step="0.01"
                    value={g}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val > 0) setG(val);
                    }}
                    className="num-input mono"
                  />
                  <span className="unit">m/s²</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="0.1"
                value={g}
                onChange={(e) => setG(Number(e.target.value))}
                className="range-slider"
              />
              {/* Planetary Presets */}
              <div className="planet-chips">
                {PLANETS.map((p) => (
                  <button
                    key={p.name}
                    className={`planet-btn ${Math.abs(g - p.g) < 0.05 ? 'active' : ''}`}
                    onClick={() => setG(p.g)}
                  >
                    <span>{p.name}</span>
                    <span className="mono">{p.g}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scenario Presets Section */}
            <div className="presets-box">
              <h4 className="presets-heading">
                <Icon name="sparkles" size={14} color="var(--accent-amber)" />
                <span>Exploratory Presets</span>
              </h4>
              <div className="presets-list">
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    className="preset-item-btn"
                    onClick={() => handleApplyPreset(p)}
                  >
                    <div className="preset-item-header">
                      <strong>{p.name}</strong>
                      <span className="mono">{p.v0}m/s @ {p.angle}°</span>
                    </div>
                    <p className="preset-item-desc">{p.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      ) : (
        /* Physics Theory & Mathematical Foundations Tab */
        <div className="theory-container animate-fade-in">
          <div className="theory-header">
            <h2>Mathematical Model of Projectile Motion</h2>
            <p>
              In classical Newtonian kinematics, projectile motion represents two-dimensional motion under the
              influence of a uniform gravitational force in the absence of aerodynamic drag.
            </p>
          </div>

          <div className="theory-grid">
            <div className="theory-card">
              <span className="theory-badge">Equations of Motion</span>
              <h3>Parametric Trajectory</h3>
              <p>Because gravity acts solely downwards, horizontal velocity remains invariant over time:</p>
              <div className="formula-block mono">
                <div className="formula-line">
                  <span>Horizontal Position:</span>
                  <strong>x(t) = V₀ · cos(θ) · t</strong>
                </div>
                <div className="formula-line">
                  <span>Vertical Position:</span>
                  <strong>y(t) = h₀ + V₀ · sin(θ) · t − ½ g t²</strong>
                </div>
              </div>
              <p className="theory-note">
                Notice that horizontal acceleration a_x = 0, while vertical acceleration a_y = -g.
              </p>
            </div>

            <div className="theory-card">
              <span className="theory-badge">Vector Decomposition</span>
              <h3>Instantaneous Velocity</h3>
              <p>Velocity components at any time instant t:</p>
              <div className="formula-block mono">
                <div className="formula-line">
                  <span>Vx(t):</span>
                  <strong>V₀x = V₀ · cos(θ)</strong>
                </div>
                <div className="formula-line">
                  <span>Vy(t):</span>
                  <strong>V₀ · sin(θ) − g · t</strong>
                </div>
                <div className="formula-line">
                  <span>Speed |v|:</span>
                  <strong>√(Vx² + Vy²)</strong>
                </div>
              </div>
            </div>

            <div className="theory-card">
              <span className="theory-badge">Quadratic Solution</span>
              <h3>Flight Duration (t_flight)</h3>
              <p>For an arbitrary launch height h₀ ≥ 0, landing occurs when y(t) = 0:</p>
              <div className="formula-block mono">
                <div className="formula-line">
                  <strong>½ g t² − (V₀ sin θ) t − h₀ = 0</strong>
                </div>
                <div className="formula-line">
                  <strong>t_flight = [ V₀ sin(θ) + √(V₀² sin²(θ) + 2gh₀) ] / g</strong>
                </div>
              </div>
              <p className="theory-note">
                When launched from ground level (h₀ = 0), this simplifies to the textbook formula: <strong>t = 2 V₀ sin(θ) / g</strong>.
              </p>
            </div>

            <div className="theory-card">
              <span className="theory-badge">Peak & Range</span>
              <h3>Apex & Total Range</h3>
              <p>Vertical velocity reaches zero at the trajectory apex:</p>
              <div className="formula-block mono">
                <div className="formula-line">
                  <span>Time to Apex:</span>
                  <strong>t_apex = (V₀ sin θ) / g</strong>
                </div>
                <div className="formula-line">
                  <span>Maximum Height:</span>
                  <strong>H_max = h₀ + (V₀² sin² θ) / (2g)</strong>
                </div>
                <div className="formula-line">
                  <span>Horizontal Range:</span>
                  <strong>R = V₀ cos(θ) · t_flight</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
