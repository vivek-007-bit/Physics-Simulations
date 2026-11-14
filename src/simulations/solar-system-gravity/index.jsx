import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { AU_METERS, DAY_SECONDS, SOLAR_SYSTEM_DATA } from './constants.js';
import {
  initializeSolarSystem,
  stepVelocityVerlet,
  getPlanetDetailedMetrics,
} from './physics.js';
import Icon from '../../components/Icon';
import SolarPhysicsGraphs from './components/SolarPhysicsGraphs.jsx';
import TwoBodyForceVisualizer from './components/TwoBodyForceVisualizer.jsx';
import SolarExperiments from './components/SolarExperiments.jsx';
import OrbitalMechanicsInfo from './components/OrbitalMechanicsInfo.jsx';
import SolarSystem3D from './SolarSystem3D.jsx';
import './styles.css';

export default function SolarSystemSimulation() {
  const { isDark } = useTheme();

  // Active View Tabs
  // 'workspace' | 'experiments' | 'twobody' | 'graphs' | 'theory'
  const [activeTab, setActiveTab] = useState('workspace');

  // Visualization Engine: '3d' (Three.js WebGL centerpiece) | '2d' (Schematic Canvas)
  const [viewEngine, setViewEngine] = useState('3d');

  // Simulation Parameters
  const [gravityMultiplier, setGravityMultiplier] = useState(1.0);
  const [simDaysPerSecond, setSimDaysPerSecond] = useState(30);
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Selected planet & Overrides
  const [selectedPlanetId, setSelectedPlanetId] = useState('earth');
  const [planetOverrides, setPlanetOverrides] = useState({}); // { [id]: { massMultiplier, velocityMultiplier } }
  const [customBodies, setCustomBodies] = useState([]);
  const [activeExperimentId, setActiveExperimentId] = useState(null);
  const [allowSunMotion, setAllowSunMotion] = useState(false);
  const [isolatePlanetId, setIsolatePlanetId] = useState(null);

  // Visualization Toggles
  const [showOrbits, setShowOrbits] = useState(true);
  const [showTrails, setShowTrails] = useState(true);
  const [showVelocityVectors, setShowVelocityVectors] = useState(false);
  const [showAccelVectors, setShowAccelVectors] = useState(false);
  const [showForceVectors, setShowForceVectors] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [showDistIndicators, setShowDistIndicators] = useState(false);
  const [showGravWell, setShowGravWell] = useState(false);
  const [showCoordGrid, setShowCoordGrid] = useState(true);
  const [vectorScale, setVectorScale] = useState(1.0);

  // Camera & View
  const [scaleMode, setScaleMode] = useState('full'); // 'inner' | 'full'
  const [cameraFocus, setCameraFocus] = useState('sun'); // 'sun' | 'planet'
  const [zoom, setZoom] = useState(1.0);
  const panOffsetRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Canvas & Physics References
  const canvasRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const lastTimeRef = useRef(null);
  const elapsedSimDaysRef = useRef(0);
  const bodiesRef = useRef(initializeSolarSystem(1.0, 1.0));

  // Graph Telemetry Buffer
  const [graphHistory, setGraphHistory] = useState([]);
  const lastGraphSampleTimeRef = useRef(0);

  // Live Metrics for HUD
  const [realTimeMetrics, setRealTimeMetrics] = useState(null);
  const lastMetricsSampleTimeRef = useRef(0);

  // Live Telemetry DOM refs for 60 FPS update without re-render
  const hudDaysRef = useRef(null);
  const hudYearsRef = useRef(null);
  const hudMonthsRef = useRef(null);
  const hudDistAURef = useRef(null);
  const hudDistKmRef = useRef(null);
  const hudSpeedRef = useRef(null);
  const hudVxRef = useRef(null);
  const hudVyRef = useRef(null);
  const hudAccelRef = useRef(null);
  const hudForceRef = useRef(null);
  const hudKineticRef = useRef(null);
  const hudPotentialRef = useRef(null);
  const hudTotalEnergyRef = useRef(null);
  const hudEccentricityRef = useRef(null);

  // Current selected planet data
  const selectedBody = useMemo(() => {
    const bodies = bodiesRef.current || [];
    return (
      bodies.find((b) => b.id === selectedPlanetId) ||
      bodies.find((b) => b.id === 'earth') ||
      bodies[1] ||
      bodies[0]
    );
  }, [selectedPlanetId, bodiesRef.current]);

  // Current selected planet overrides
  const currentOverride = planetOverrides[selectedPlanetId] || {
    massMultiplier: 1.0,
    velocityMultiplier: 1.0,
  };

  // 2D Canvas Render Routine (available when toggled to 2D view)
  const renderCanvas = useCallback(() => {
    if (viewEngine !== '2d') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const width = Math.floor(rect.width * dpr);
    const height = Math.floor(rect.height * dpr);

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    ctx.save();
    ctx.clearRect(0, 0, width, height);

    // Theme Background
    ctx.fillStyle = isDark ? '#0b0f19' : '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // Base View & Scale
    const baseViewRadiusAU = scaleMode === 'inner' ? 2.2 : 36.0;
    const minDim = Math.min(width, height) / 2 - 30 * dpr;
    const pixelsPerAU = (minDim / baseViewRadiusAU) * zoom;
    const pixelsPerMeter = pixelsPerAU / AU_METERS;

    // Camera Center
    const bodies = bodiesRef.current || [];
    const sun = bodies.find((b) => b.isSun) || bodies[0] || { x: 0, y: 0 };
    const trackingBody = cameraFocus === 'planet'
      ? bodies.find((b) => b.id === selectedPlanetId) || sun
      : sun;

    const focusOffsetX = trackingBody.x * pixelsPerMeter;
    const focusOffsetY = -trackingBody.y * pixelsPerMeter;

    const centerX = width / 2 + panOffsetRef.current.x * dpr - (cameraFocus === 'planet' ? focusOffsetX : 0);
    const centerY = height / 2 + panOffsetRef.current.y * dpr - (cameraFocus === 'planet' ? focusOffsetY : 0);

    // Coordinate Grid
    if (showCoordGrid) {
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
      ctx.lineWidth = 1 * dpr;
      const gridSpacingAU = scaleMode === 'inner' ? 0.5 : 5.0;
      const gridSpacingPx = gridSpacingAU * pixelsPerAU;

      for (let x = centerX % gridSpacingPx; x < width; x += gridSpacingPx) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = centerY % gridSpacingPx; y < height; y += gridSpacingPx) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    // Reference AU Rings
    if (showOrbits) {
      const ringAUs = scaleMode === 'inner'
        ? [0.387, 0.723, 1.0, 1.524, 2.0]
        : [1.0, 1.524, 5.2, 9.58, 19.2, 30.07];

      for (const rAU of ringAUs) {
        const ringPx = rAU * pixelsPerAU;
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringPx, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
        ctx.lineWidth = 1 * dpr;
        ctx.setLineDash([4 * dpr, 4 * dpr]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // Orbital Trails
    if (showTrails) {
      for (const b of bodies) {
        if (!b.trail || b.trail.length < 2) continue;
        const trailColor = b.isSun
          ? isDark ? 'rgba(245, 158, 11, 0.4)' : 'rgba(217, 119, 6, 0.4)'
          : isDark ? b.color : b.colorLight || b.color;

        ctx.strokeStyle = trailColor;
        ctx.lineWidth = (b.id === selectedPlanetId ? 2 : 1) * dpr;
        ctx.beginPath();
        for (let i = 0; i < b.trail.length; i++) {
          const pt = b.trail[i];
          const tx = centerX + pt.x * pixelsPerMeter;
          const ty = centerY - pt.y * pixelsPerMeter;
          if (i === 0) ctx.moveTo(tx, ty);
          else ctx.lineTo(tx, ty);
        }
        ctx.stroke();
      }
    }

    // Draw Celestial Bodies
    for (const b of bodies) {
      const screenX = centerX + b.x * pixelsPerMeter;
      const screenY = centerY - b.y * pixelsPerMeter;
      const isSelected = b.id === selectedPlanetId;

      if (b.isSun) {
        const sunRadius = (scaleMode === 'inner' ? 18 : 12) * dpr;
        ctx.beginPath();
        ctx.arc(screenX, screenY, sunRadius * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(217, 119, 6, 0.15)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(screenX, screenY, sunRadius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#f59e0b' : '#d97706';
        ctx.fill();

        if (showLabels) {
          ctx.font = `bold ${Math.max(10, Math.round(11 * dpr))}px system-ui, sans-serif`;
          ctx.fillStyle = isDark ? '#fde047' : '#b45309';
          ctx.textAlign = 'center';
          ctx.fillText('Sun', screenX, screenY + sunRadius + 14 * dpr);
        }
      } else {
        const planetColor = isDark ? b.color : b.colorLight || b.color;
        let planetRadius = (b.displayRadius || 5) * dpr;
        if (scaleMode === 'inner') planetRadius *= 1.35;

        if (isSelected) {
          ctx.beginPath();
          ctx.arc(screenX, screenY, planetRadius + 5 * dpr, 0, Math.PI * 2);
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2 * dpr;
          ctx.stroke();
        }

        if (b.hasRings) {
          ctx.save();
          ctx.translate(screenX, screenY);
          ctx.rotate(0.35);
          ctx.beginPath();
          ctx.ellipse(0, 0, planetRadius * 2.2, planetRadius * 0.75, 0, 0, Math.PI * 2);
          ctx.strokeStyle = isDark ? 'rgba(202, 138, 4, 0.7)' : 'rgba(161, 98, 7, 0.7)';
          ctx.lineWidth = 2 * dpr;
          ctx.stroke();
          ctx.restore();
        }

        ctx.fillStyle = planetColor;
        ctx.beginPath();
        ctx.arc(screenX, screenY, planetRadius, 0, Math.PI * 2);
        ctx.fill();

        if (showLabels) {
          ctx.font = `${Math.max(10, Math.round(10.5 * dpr))}px system-ui, sans-serif`;
          ctx.fillStyle = isSelected ? (isDark ? '#38bdf8' : '#0284c7') : isDark ? '#cbd5e1' : '#334155';
          ctx.textAlign = 'center';
          ctx.fillText(b.name, screenX, screenY - planetRadius - 6 * dpr);
        }

        // Vectors
        const vScale = 0.6 * vectorScale;
        if (showVelocityVectors) {
          const speed = Math.hypot(b.vx, b.vy);
          if (speed > 0) {
            const vxNorm = (b.vx / speed) * Math.min(speed * 0.0007 * vScale, 50 * dpr);
            const vyNorm = (-b.vy / speed) * Math.min(speed * 0.0007 * vScale, 50 * dpr);
            drawVector(ctx, screenX, screenY, vxNorm, vyNorm, '#10b981', dpr);
          }
        }
        if (showAccelVectors) {
          const acc = Math.hypot(b.ax, b.ay);
          if (acc > 0) {
            const axNorm = (b.ax / acc) * 28 * dpr * vScale;
            const ayNorm = (-b.ay / acc) * 28 * dpr * vScale;
            drawVector(ctx, screenX, screenY, axNorm, ayNorm, '#f97316', dpr);
          }
        }
        if (showForceVectors && sun) {
          const dx = sun.x - b.x;
          const dy = -(sun.y - b.y);
          const dist = Math.hypot(dx, dy);
          if (dist > 0) {
            const fx = (dx / dist) * 32 * dpr * vScale;
            const fy = (dy / dist) * 32 * dpr * vScale;
            drawVector(ctx, screenX, screenY, fx, fy, '#ec4899', dpr);
          }
        }
      }
    }

    ctx.restore();
  }, [
    viewEngine,
    scaleMode,
    zoom,
    cameraFocus,
    selectedPlanetId,
    showOrbits,
    showTrails,
    showVelocityVectors,
    showAccelVectors,
    showForceVectors,
    showLabels,
    showCoordGrid,
    vectorScale,
    isDark,
  ]);

  // Update Telemetry Panel HUD
  const updateHUD = useCallback(() => {
    const bodies = bodiesRef.current;
    if (!bodies || bodies.length === 0) return;

    const sun = bodies.find((b) => b.isSun) || bodies[0];
    const planet = bodies.find((b) => b.id === selectedPlanetId);

    const elapsedDays = elapsedSimDaysRef.current;
    if (hudDaysRef.current) hudDaysRef.current.textContent = `${elapsedDays.toFixed(1)} d`;
    if (hudMonthsRef.current) hudMonthsRef.current.textContent = `${(elapsedDays / 30.4375).toFixed(1)} mo`;
    if (hudYearsRef.current) hudYearsRef.current.textContent = `${(elapsedDays / 365.256).toFixed(2)} yr`;

    if (planet) {
      const m = getPlanetDetailedMetrics(planet, bodies, gravityMultiplier, sun);
      if (hudDistAURef.current) hudDistAURef.current.textContent = `${m.distanceAU.toFixed(3)} AU`;
      if (hudDistKmRef.current) hudDistKmRef.current.textContent = `${(m.distanceKm / 1e6).toFixed(2)} M km`;
      if (hudSpeedRef.current) hudSpeedRef.current.textContent = `${m.speedKmS.toFixed(2)} km/s`;
      if (hudVxRef.current) hudVxRef.current.textContent = `${m.vxKmS.toFixed(2)} km/s`;
      if (hudVyRef.current) hudVyRef.current.textContent = `${m.vyKmS.toFixed(2)} km/s`;
      if (hudAccelRef.current) hudAccelRef.current.textContent = `${m.accelMs2.toExponential(3)} m/s²`;
      if (hudForceRef.current) hudForceRef.current.textContent = `${m.solarForceNewtons.toExponential(2)} N`;
      if (hudKineticRef.current) hudKineticRef.current.textContent = `${m.kineticEnergyJoules.toExponential(2)} J`;
      if (hudPotentialRef.current) hudPotentialRef.current.textContent = `${m.potentialEnergyJoules.toExponential(2)} J`;
      if (hudTotalEnergyRef.current) hudTotalEnergyRef.current.textContent = `${m.totalEnergyJoules.toExponential(2)} J`;
      if (hudEccentricityRef.current) hudEccentricityRef.current.textContent = `${m.eccentricity.toFixed(4)}`;

      // Periodically update React state metrics for 3D overlay (every ~0.1 sim days)
      if (elapsedDays - lastMetricsSampleTimeRef.current >= 0.1) {
        lastMetricsSampleTimeRef.current = elapsedDays;
        setRealTimeMetrics(m);
      }

      // Sample data point for Live Graph periodically (every ~0.5 sim days)
      if (elapsedDays - lastGraphSampleTimeRef.current >= 0.5) {
        lastGraphSampleTimeRef.current = elapsedDays;
        setGraphHistory((prev) => {
          const newPt = {
            timeDays: elapsedDays,
            distanceAU: m.distanceAU,
            speedKmS: m.speedKmS,
            forceN: m.solarForceNewtons,
            kineticJ: m.kineticEnergyJoules,
            potentialJ: m.potentialEnergyJoules,
            totalEnergyJ: m.totalEnergyJoules,
          };
          const nextArr = [...prev, newPt];
          return nextArr.length > 220 ? nextArr.slice(nextArr.length - 220) : nextArr;
        });
      }
    }
  }, [selectedPlanetId, gravityMultiplier]);

  // Re-initialize physics engine
  const rebuildSimulation = useCallback(
    (opts = {}) => {
      const gMult = opts.gravityMultiplier !== undefined ? opts.gravityMultiplier : gravityMultiplier;
      const overrides = opts.planetOverrides !== undefined ? opts.planetOverrides : planetOverrides;
      const customs = opts.customBodies !== undefined ? opts.customBodies : customBodies;
      const sunMotion = opts.allowSunMotion !== undefined ? opts.allowSunMotion : allowSunMotion;
      const isolated = opts.isolatePlanetId !== undefined ? opts.isolatePlanetId : isolatePlanetId;

      bodiesRef.current = initializeSolarSystem(gMult, 1.0, {
        planetOverrides: overrides,
        customBodies: customs,
        allowSunMotion: sunMotion,
        isolatePlanetId: isolated,
      });

      elapsedSimDaysRef.current = 0;
      lastTimeRef.current = null;
      lastGraphSampleTimeRef.current = 0;
      lastMetricsSampleTimeRef.current = 0;
      setGraphHistory([]);
      updateHUD();
      if (viewEngine === '2d') renderCanvas();
    },
    [gravityMultiplier, planetOverrides, customBodies, allowSunMotion, isolatePlanetId, viewEngine, renderCanvas, updateHUD]
  );

  // Full Reset to default initial solar system
  const handleFullReset = useCallback(() => {
    setGravityMultiplier(1.0);
    setPlanetOverrides({});
    setCustomBodies([]);
    setActiveExperimentId(null);
    setAllowSunMotion(false);
    setIsolatePlanetId(null);
    setZoom(1.0);
    panOffsetRef.current = { x: 0, y: 0 };
    setCameraFocus('sun');

    bodiesRef.current = initializeSolarSystem(1.0, 1.0, {
      planetOverrides: {},
      customBodies: [],
      allowSunMotion: false,
      isolatePlanetId: null,
    });

    elapsedSimDaysRef.current = 0;
    lastTimeRef.current = null;
    lastGraphSampleTimeRef.current = 0;
    lastMetricsSampleTimeRef.current = 0;
    setGraphHistory([]);
    updateHUD();
    if (viewEngine === '2d') renderCanvas();
  }, [viewEngine, renderCanvas, updateHUD]);

  // Main Symplectic Velocity Verlet Integration Loop (60 FPS)
  useEffect(() => {
    if (!isRunning || isPaused) {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      return;
    }

    let isCancelled = false;

    const animate = (timestamp) => {
      if (isCancelled) return;

      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaMs = Math.min(timestamp - lastTimeRef.current, 64);
      lastTimeRef.current = timestamp;

      // Real time to simulation time conversion
      const simSecondsPerRealSecond = simDaysPerSecond * DAY_SECONDS;
      const totalDtSeconds = (deltaMs / 1000) * simSecondsPerRealSecond;

      // Adaptive sub-stepping for extreme orbital conservation
      const maxSubDt = 0.15 * DAY_SECONDS;
      const numSteps = Math.ceil(totalDtSeconds / maxSubDt);
      const subDt = totalDtSeconds / numSteps;

      const bodies = bodiesRef.current;
      for (let s = 0; s < numSteps; s++) {
        stepVelocityVerlet(bodies, subDt, gravityMultiplier);
      }

      elapsedSimDaysRef.current += totalDtSeconds / DAY_SECONDS;

      // Store true historical orbital trail points
      for (const b of bodies) {
        if (b.isSun && !b.allowMotion) continue;
        if (!b.trail) b.trail = [];
        b.trail.push({ x: b.x, y: b.y });
        if (b.trail.length > 350) b.trail.shift();
      }

      updateHUD();
      if (viewEngine === '2d') renderCanvas();

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      isCancelled = true;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isRunning, isPaused, simDaysPerSecond, gravityMultiplier, viewEngine, renderCanvas, updateHUD]);

  // Single-Step Simulation (advances by 1.0 day)
  const handleSingleStep = () => {
    const bodies = bodiesRef.current;
    const stepSeconds = 1.0 * DAY_SECONDS;
    const subSteps = 6;
    const subDt = stepSeconds / subSteps;

    for (let s = 0; s < subSteps; s++) {
      stepVelocityVerlet(bodies, subDt, gravityMultiplier);
    }
    elapsedSimDaysRef.current += 1.0;

    for (const b of bodies) {
      if (b.isSun && !b.allowMotion) continue;
      if (!b.trail) b.trail = [];
      b.trail.push({ x: b.x, y: b.y });
      if (b.trail.length > 350) b.trail.shift();
    }

    updateHUD();
    if (viewEngine === '2d') renderCanvas();
  };

  // Modify Planet Mass
  const handleUpdatePlanetMass = (planetId, newMassMultiplier) => {
    const nextOverrides = {
      ...planetOverrides,
      [planetId]: {
        ...(planetOverrides[planetId] || {}),
        massMultiplier: newMassMultiplier,
      },
    };
    setPlanetOverrides(nextOverrides);

    const target = bodiesRef.current.find((b) => b.id === planetId);
    if (target) {
      target.mass = target.baseMass * newMassMultiplier;
      target.massMultiplier = newMassMultiplier;
    }
  };

  // Modify Planet Velocity
  const handleUpdatePlanetVelocity = (planetId, newVelocityMultiplier) => {
    const nextOverrides = {
      ...planetOverrides,
      [planetId]: {
        ...(planetOverrides[planetId] || {}),
        velocityMultiplier: newVelocityMultiplier,
      },
    };
    setPlanetOverrides(nextOverrides);
    rebuildSimulation({ planetOverrides: nextOverrides });
  };

  // Apply Pre-configured Experiment
  const handleApplyExperiment = (exp) => {
    setActiveExperimentId(exp.id);
    const { setup } = exp;

    if (setup.gravityMultiplier !== undefined) setGravityMultiplier(setup.gravityMultiplier);
    if (setup.selectedPlanetId) setSelectedPlanetId(setup.selectedPlanetId);
    if (setup.allowSunMotion !== undefined) setAllowSunMotion(setup.allowSunMotion);
    if (setup.isolatePlanetId !== undefined) setIsolatePlanetId(setup.isolatePlanetId);

    const nextOverrides = setup.planetOverrides || {};
    setPlanetOverrides(nextOverrides);

    rebuildSimulation({
      gravityMultiplier: setup.gravityMultiplier,
      planetOverrides: nextOverrides,
      allowSunMotion: setup.allowSunMotion,
      isolatePlanetId: setup.isolatePlanetId,
    });
    setActiveTab('workspace');
  };

  // Add Custom Body
  const handleAddCustomBody = (newBody) => {
    const nextList = [...customBodies, newBody];
    setCustomBodies(nextList);
    setSelectedPlanetId(newBody.id);
    rebuildSimulation({ customBodies: nextList });
    setActiveTab('workspace');
  };

  // Remove Custom Body
  const handleRemoveCustomBody = (idToRemove) => {
    const nextList = customBodies.filter((b) => b.id !== idToRemove);
    setCustomBodies(nextList);
    if (selectedPlanetId === idToRemove) setSelectedPlanetId('earth');
    rebuildSimulation({ customBodies: nextList });
  };

  // Clear Trails
  const handleClearTrails = () => {
    const bodies = bodiesRef.current;
    for (const b of bodies) b.trail = [];
    if (viewEngine === '2d') renderCanvas();
  };

  // Detailed metrics for currently selected planet
  const selectedMetrics = useMemo(() => {
    if (realTimeMetrics) return realTimeMetrics;
    const bodies = bodiesRef.current || [];
    const sun = bodies.find((b) => b.isSun) || bodies[0];
    const planet = bodies.find((b) => b.id === selectedPlanetId);
    if (!planet) return null;
    return getPlanetDetailedMetrics(planet, bodies, gravityMultiplier, sun);
  }, [selectedPlanetId, gravityMultiplier, realTimeMetrics]);

  return (
    <div className="solar-system-root">
      {/* Workspace Tabs */}
      <div className="workspace-tabs">
        <button
          className={`tab-btn ${activeTab === 'workspace' ? 'active' : ''}`}
          onClick={() => setActiveTab('workspace')}
        >
          <Icon name="atom" size={15} />
          <span>Gravitational Workspace</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'experiments' ? 'active' : ''}`}
          onClick={() => setActiveTab('experiments')}
        >
          <Icon name="compass" size={15} />
          <span>Interactive Experiments</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'twobody' ? 'active' : ''}`}
          onClick={() => setActiveTab('twobody')}
        >
          <Icon name="atom" size={15} />
          <span>Two-Body Force Visualizer</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'graphs' ? 'active' : ''}`}
          onClick={() => setActiveTab('graphs')}
        >
          <Icon name="compass" size={15} />
          <span>Live Physics Graphs</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'theory' ? 'active' : ''}`}
          onClick={() => setActiveTab('theory')}
        >
          <Icon name="book" size={15} />
          <span>Orbital Mechanics Theory</span>
        </button>
      </div>

      {activeTab === 'workspace' && (
        <div className="solar-grid">
          {/* Main Visualizer Area */}
          <div className="solar-canvas-wrapper">
            {/* Top Toolbar */}
            <div className="solar-toolbar">
              {/* Scale Selection */}
              <div className="toolbar-group">
                <span className="toolbar-label">Scale:</span>
                <button
                  className={`chip-btn ${scaleMode === 'inner' ? 'active' : ''}`}
                  onClick={() => {
                    setScaleMode('inner');
                    setZoom(1.0);
                    panOffsetRef.current = { x: 0, y: 0 };
                  }}
                  title="Inner Solar System (Mercury to Mars, 0–2.2 AU)"
                >
                  Inner (0–2 AU)
                </button>
                <button
                  className={`chip-btn ${scaleMode === 'full' ? 'active' : ''}`}
                  onClick={() => {
                    setScaleMode('full');
                    setZoom(1.0);
                    panOffsetRef.current = { x: 0, y: 0 };
                  }}
                  title="Full Solar System (All 8 Planets up to Neptune, 30 AU)"
                >
                  Full (All 8)
                </button>
              </div>

              {/* Camera Focus */}
              <div className="toolbar-group">
                <span className="toolbar-label">Camera:</span>
                <button
                  className={`chip-btn ${cameraFocus === 'sun' ? 'active' : ''}`}
                  onClick={() => setCameraFocus('sun')}
                >
                  Center: Sun
                </button>
                <button
                  className={`chip-btn ${cameraFocus === 'planet' ? 'active' : ''}`}
                  onClick={() => setCameraFocus('planet')}
                >
                  Track: {selectedBody?.name || 'Planet'}
                </button>
              </div>

              {/* Visualization Toggles */}
              <div className="toolbar-group">
                <label className="toggle-label" title="Toggle orbital trails">
                  <input
                    type="checkbox"
                    checked={showTrails}
                    onChange={(e) => setShowTrails(e.target.checked)}
                  />
                  <span>Trails</span>
                </label>
                <label className="toggle-label" title="Toggle velocity vectors">
                  <input
                    type="checkbox"
                    checked={showVelocityVectors}
                    onChange={(e) => setShowVelocityVectors(e.target.checked)}
                  />
                  <span>v (Velocity)</span>
                </label>
                <label className="toggle-label" title="Toggle gravitational attraction vectors">
                  <input
                    type="checkbox"
                    checked={showForceVectors}
                    onChange={(e) => setShowForceVectors(e.target.checked)}
                  />
                  <span>Fg (Gravity)</span>
                </label>
                <label className="toggle-label" title="Toggle acceleration vectors">
                  <input
                    type="checkbox"
                    checked={showAccelVectors}
                    onChange={(e) => setShowAccelVectors(e.target.checked)}
                  />
                  <span>a (Accel)</span>
                </label>
                <label className="toggle-label" title="Toggle planet name labels">
                  <input
                    type="checkbox"
                    checked={showLabels}
                    onChange={(e) => setShowLabels(e.target.checked)}
                  />
                  <span>Labels</span>
                </label>
                <label className="toggle-label" title="Toggle AU distance reference rings">
                  <input
                    type="checkbox"
                    checked={showCoordGrid}
                    onChange={(e) => setShowCoordGrid(e.target.checked)}
                  />
                  <span>AU Rings</span>
                </label>
              </div>

              {/* View Engine Toggle (3D WebGL vs 2D Schematic) */}
              <div className="toolbar-group engine-toggle-group">
                <span className="toolbar-label">Engine:</span>
                <button
                  className={`chip-btn ${viewEngine === '3d' ? 'active' : ''}`}
                  onClick={() => setViewEngine('3d')}
                  title="Photorealistic 3D WebGL Simulation"
                >
                  3D WebGL
                </button>
                <button
                  className={`chip-btn ${viewEngine === '2d' ? 'active' : ''}`}
                  onClick={() => setViewEngine('2d')}
                  title="2D Schematic Canvas"
                >
                  2D Canvas
                </button>
              </div>
            </div>

            {/* Main Interactive Visualizer Viewport */}
            {viewEngine === '3d' ? (
              <SolarSystem3D
                bodies={bodiesRef.current}
                bodiesRef={bodiesRef}
                selectedPlanetId={selectedPlanetId}
                onSelectPlanet={setSelectedPlanetId}
                scaleMode={scaleMode}
                cameraFocus={cameraFocus}
                onToggleCameraFocus={() =>
                  setCameraFocus((f) => (f === 'sun' ? 'planet' : 'sun'))
                }
                showOrbits={showOrbits}
                showTrails={showTrails}
                showVelocityVectors={showVelocityVectors}
                showForceVectors={showForceVectors}
                showAccelVectors={showAccelVectors}
                showLabels={showLabels}
                showGrid={showCoordGrid}
                vectorScale={vectorScale}
                isDark={isDark}
                metrics={selectedMetrics}
              />
            ) : (
              <div className="solar-canvas-box">
                <canvas ref={canvasRef} className="physics-canvas" />
                <div className="canvas-hint">
                  Scroll to zoom • Click & drag to pan • Click any planet to inspect
                </div>
              </div>
            )}

            {/* Secondary Controls Bar */}
            <div className="secondary-toggles-bar">
              <div className="vector-scale-group">
                <span className="scale-label">Vector Scale:</span>
                <input
                  type="range"
                  min="0.3"
                  max="2.5"
                  step="0.1"
                  value={vectorScale}
                  onChange={(e) => setVectorScale(Number(e.target.value))}
                  className="range-slider mini"
                />
                <span className="mono scale-val">{vectorScale.toFixed(1)}x</span>
              </div>

              <div className="scale-legend-info">
                <span className="legend-tag">Scale Mode:</span>
                <span className="legend-desc">
                  {scaleMode === 'inner'
                    ? 'Inner System: Linear 0–2.2 AU (Mercury, Venus, Earth, Mars)'
                    : 'Full System: Perceptual Power-Law 0–30.1 AU (All 8 Planets)'}
                </span>
              </div>

              <button
                className="chip-btn"
                onClick={handleClearTrails}
                title="Clear orbital trail history"
              >
                Clear Trails
              </button>
            </div>

            {/* Live Telemetry Bar */}
            <div className="solar-telemetry-bar">
              <div className="tel-stat">
                <span className="tel-stat-label">Elapsed Time</span>
                <span ref={hudDaysRef} className="tel-stat-val mono">0.0 d</span>
              </div>
              <div className="tel-stat">
                <span className="tel-stat-label">Months / Years</span>
                <span ref={hudYearsRef} className="tel-stat-val mono">0.00 yr</span>
              </div>
              <div className="tel-stat">
                <span className="tel-stat-label">Selected Distance</span>
                <span ref={hudDistAURef} className="tel-stat-val mono">1.000 AU</span>
              </div>
              <div className="tel-stat">
                <span className="tel-stat-label">Distance (km)</span>
                <span ref={hudDistKmRef} className="tel-stat-val mono">149.6 M km</span>
              </div>
              <div className="tel-stat">
                <span className="tel-stat-label">Orbital Velocity</span>
                <span ref={hudSpeedRef} className="tel-stat-val mono">29.78 km/s</span>
              </div>
              <div className="tel-stat">
                <span className="tel-stat-label">Total Energy</span>
                <span ref={hudTotalEnergyRef} className="tel-stat-val mono">— J</span>
              </div>
            </div>

            {/* Planet Selection Strip */}
            <div className="planet-selector-strip">
              <span className="strip-title">Select Celestial Body:</span>
              <div className="strip-pills">
                {(bodiesRef.current || []).map((p) => (
                  <button
                    key={p.id}
                    className={`planet-pill ${selectedPlanetId === p.id ? 'active' : ''}`}
                    onClick={() => setSelectedPlanetId(p.id)}
                  >
                    <span className="pill-dot" style={{ backgroundColor: p.color }}></span>
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Controls & Planet Inspection Sidebar */}
          <aside className="solar-sidebar">
            {/* Playback & Time Controls */}
            <div className="sidebar-card">
              <div className="card-header">
                <h3>Simulation Controls</h3>
              </div>

              <div className="action-button-row">
                <button
                  className="primary-btn"
                  onClick={() => setIsPaused((p) => !p)}
                >
                  <Icon name={isPaused ? 'play' : 'pause'} size={15} />
                  <span>{isPaused ? 'Resume' : 'Pause'}</span>
                </button>
                <button
                  className="secondary-btn"
                  onClick={handleSingleStep}
                  title="Advance simulation by 1 day"
                >
                  <span>Step (+1d)</span>
                </button>
                <button
                  className="secondary-btn"
                  onClick={handleFullReset}
                  title="Reset to default initial solar system"
                >
                  <Icon name="reset" size={15} />
                  <span>Reset All</span>
                </button>
              </div>

              <div className="control-field">
                <label>Simulation Rate: <strong>{simDaysPerSecond} days/sec</strong></label>
                <div className="speed-pills">
                  {[5, 15, 30, 90, 365, 730].map((s) => (
                    <button
                      key={s}
                      className={`chip-btn ${simDaysPerSecond === s ? 'active' : ''}`}
                      onClick={() => setSimDaysPerSecond(s)}
                    >
                      {s >= 365 ? `${(s / 365.25).toFixed(0)} yr/s` : `${s} d/s`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Gravitational Strength (G Multiplier) */}
            <div className="sidebar-card">
              <div className="card-header">
                <h3>Gravitational Strength (G)</h3>
              </div>

              <div className="control-field">
                <div className="field-label-row">
                  <label htmlFor="gravity-multiplier">Gravitational Constant Multiplier</label>
                  <span className="field-value mono">{gravityMultiplier.toFixed(2)}x</span>
                </div>
                <input
                  id="gravity-multiplier"
                  type="range"
                  min="0.1"
                  max="5.0"
                  step="0.05"
                  value={gravityMultiplier}
                  onChange={(e) => setGravityMultiplier(Number(e.target.value))}
                  className="range-slider"
                />
                <div className="gravity-presets-row">
                  {[0.25, 0.5, 1.0, 1.5, 2.5, 4.0].map((g) => (
                    <button
                      key={g}
                      className={`chip-btn ${gravityMultiplier === g ? 'active' : ''}`}
                      onClick={() => setGravityMultiplier(g)}
                    >
                      {g}x
                    </button>
                  ))}
                </div>
                <span className="field-hint">
                  Alters universal gravity F = G·m₁m₂/r². Higher G contracts orbits into tighter ellipses; lower G expands them.
                </span>
              </div>
            </div>

            {/* Individual Planet Parameters (Mass & Velocity) */}
            <div className="sidebar-card">
              <div className="card-header">
                <h3>Modify {selectedBody?.name || 'Planet'} Parameters</h3>
              </div>

              {/* Mass Control */}
              <div className="control-field">
                <div className="field-label-row">
                  <label>Mass Multiplier:</label>
                  <span className="field-value mono">
                    {(currentOverride.massMultiplier || 1.0).toFixed(2)}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="10.0"
                  step="0.1"
                  value={currentOverride.massMultiplier || 1.0}
                  onChange={(e) => handleUpdatePlanetMass(selectedPlanetId, Number(e.target.value))}
                  className="range-slider"
                />
                <div className="param-pills-row">
                  {[0.2, 0.5, 1.0, 2.0, 5.0, 10.0].map((m) => (
                    <button
                      key={m}
                      className={`chip-btn ${(currentOverride.massMultiplier || 1.0) === m ? 'active' : ''}`}
                      onClick={() => handleUpdatePlanetMass(selectedPlanetId, m)}
                    >
                      {m}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Velocity Multiplier */}
              <div className="control-field">
                <div className="field-label-row">
                  <label>Initial Velocity Scale:</label>
                  <span className="field-value mono">
                    {(currentOverride.velocityMultiplier || 1.0).toFixed(2)}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.0"
                  step="0.05"
                  value={currentOverride.velocityMultiplier || 1.0}
                  onChange={(e) => handleUpdatePlanetVelocity(selectedPlanetId, Number(e.target.value))}
                  className="range-slider"
                />
                {/* Orbital Presets */}
                <div className="orbital-velocity-presets">
                  <span className="preset-title">Orbital Speed Presets:</span>
                  <div className="preset-buttons-grid">
                    {[
                      { label: '50%', val: 0.5 },
                      { label: '75%', val: 0.75 },
                      { label: '100% (Circular)', val: 1.0 },
                      { label: '125%', val: 1.25 },
                      { label: '150% (Escape)', val: 1.5 },
                    ].map((p) => (
                      <button
                        key={p.val}
                        className={`chip-btn ${(currentOverride.velocityMultiplier || 1.0) === p.val ? 'active' : ''}`}
                        onClick={() => handleUpdatePlanetVelocity(selectedPlanetId, p.val)}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                className="reset-params-btn"
                onClick={() => {
                  handleUpdatePlanetMass(selectedPlanetId, 1.0);
                  handleUpdatePlanetVelocity(selectedPlanetId, 1.0);
                }}
              >
                Restore Natural Planetary Mass & Velocity
              </button>
            </div>

            {/* Selected Planet Comprehensive Physics Inspector */}
            <div className="sidebar-card planet-info-card">
              <div className="card-header planet-card-header">
                <div className="planet-title-badge">
                  <span className="planet-color-dot" style={{ backgroundColor: selectedBody?.color }}></span>
                  <h3>{selectedBody?.name} Telemetry</h3>
                </div>
                <span className="planet-type-tag">{selectedBody?.type || 'Celestial Body'}</span>
              </div>

              <div className="planet-metrics-list">
                <div className="metric-row">
                  <span>Current Mass:</span>
                  <strong className="mono">{selectedBody?.mass ? selectedBody.mass.toExponential(3) : '—'} kg</strong>
                </div>
                <div className="metric-row">
                  <span>Distance from Sun:</span>
                  <strong ref={hudDistAURef} className="mono">1.000 AU</strong>
                </div>
                <div className="metric-row">
                  <span>Orbital Velocity (v):</span>
                  <strong ref={hudSpeedRef} className="mono">29.78 km/s</strong>
                </div>
                <div className="metric-row">
                  <span>Velocity (vx, vy):</span>
                  <strong className="mono">
                    <span ref={hudVxRef}>0.00</span>, <span ref={hudVyRef}>0.00</span>
                  </strong>
                </div>
                <div className="metric-row">
                  <span>Gravitational Force:</span>
                  <strong ref={hudForceRef} className="mono">— N</strong>
                </div>
                <div className="metric-row">
                  <span>Current Acceleration:</span>
                  <strong ref={hudAccelRef} className="mono">— m/s²</strong>
                </div>
                <div className="metric-row">
                  <span>Kinetic Energy (K):</span>
                  <strong ref={hudKineticRef} className="mono">— J</strong>
                </div>
                <div className="metric-row">
                  <span>Potential Energy (U):</span>
                  <strong ref={hudPotentialRef} className="mono">— J</strong>
                </div>
                <div className="metric-row">
                  <span>Total Mechanical Energy:</span>
                  <strong ref={hudTotalEnergyRef} className="mono highlight">— J</strong>
                </div>
                <div className="metric-row">
                  <span>Eccentricity (e):</span>
                  <strong ref={hudEccentricityRef} className="mono">—</strong>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Experiments Tab */}
      {activeTab === 'experiments' && (
        <SolarExperiments
          onApplyExperiment={handleApplyExperiment}
          onAddCustomBody={handleAddCustomBody}
          onRemoveCustomBody={handleRemoveCustomBody}
          customBodies={customBodies}
          activeExperimentId={activeExperimentId}
        />
      )}

      {/* Two-Body Mutual Force Tab */}
      {activeTab === 'twobody' && (
        <TwoBodyForceVisualizer
          bodies={bodiesRef.current || []}
          gravityMultiplier={gravityMultiplier}
        />
      )}

      {/* Live Physics Graphs Tab */}
      {activeTab === 'graphs' && (
        <div className="graphs-tab-view">
          <div className="graphs-top-controls">
            <span className="graphs-select-label">Select Planet to Graph:</span>
            <select
              value={selectedPlanetId}
              onChange={(e) => {
                setSelectedPlanetId(e.target.value);
                setGraphHistory([]);
              }}
              className="level-dropdown"
            >
              {(bodiesRef.current || []).map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.isSun ? 'Sun' : b.type || 'Planet'})
                </option>
              ))}
            </select>
            <span className="graphs-hint-text">
              Advance the simulation to populate graph data points in real time.
            </span>
          </div>

          <SolarPhysicsGraphs
            graphHistory={graphHistory}
            selectedPlanetName={selectedBody?.name || 'Selected Body'}
            isIsolatedTwoBody={isolatePlanetId !== null}
          />

          <OrbitalMechanicsInfo
            selectedPlanet={selectedBody}
            detailedMetrics={selectedMetrics}
          />
        </div>
      )}

      {/* Orbital Mechanics Theory Tab */}
      {activeTab === 'theory' && (
        <div className="solar-theory-view">
          <div className="theory-header">
            <h2>Newtonian Celestial Mechanics & Gravitation</h2>
            <p>
              In classical mechanics, the orbital paths of planetary bodies result from the balance between
              gravitational attraction and inertia according to Newton's universal laws.
            </p>
          </div>

          <div className="theory-cards-grid">
            <div className="theory-box">
              <span className="box-badge">Fundamental Law</span>
              <h3>Newton's Law of Universal Gravitation</h3>
              <p>
                Every point mass attracts every other point mass by a force acting along the line intersecting their centers:
              </p>
              <div className="formula-card mono">
                F = G · (m₁ · m₂) / r²
              </div>
              <p className="box-subtext">
                Where <strong>G = 6.67430 × 10⁻¹¹ m³ kg⁻¹ s⁻²</strong>, m₁ and m₂ are the interacting masses,
                and r is the separation distance.
              </p>
            </div>

            <div className="theory-box">
              <span className="box-badge">Centripetal Equilibrium</span>
              <h3>Orbital Velocity</h3>
              <p>
                For a stable circular orbit, the gravitational pull supplies the requisite centripetal force:
                (m · v²) / r = G · (M · m) / r².
              </p>
              <div className="formula-card mono">
                v_orbit = √( G · M_sun / r )
              </div>
              <p className="box-subtext">
                Because orbital speed is inversely proportional to √r, inner planets like Mercury (47.4 km/s) move much faster than outer planets like Neptune (5.4 km/s).
              </p>
            </div>

            <div className="theory-box">
              <span className="box-badge">Keplerian Law</span>
              <h3>Kepler's Third Law (Harmonic Law)</h3>
              <p>
                The square of the orbital period of a planet is directly proportional to the cube of the semi-major axis of its orbit:
              </p>
              <div className="formula-card mono">
                T² = ( 4π² / (G · M_sun) ) · a³
              </div>
              <p className="box-subtext">
                This dictates why Earth's year is 365.25 days, while Neptune's year is nearly 165 Earth years.
              </p>
            </div>

            <div className="theory-box">
              <span className="box-badge">Elliptical Geometry</span>
              <h3>Circular vs. Elliptical Orbits</h3>
              <p>
                Real orbits have non-zero eccentricity (e). Speed varies throughout the orbit according to the Vis-Viva equation:
              </p>
              <div className="formula-card mono">
                v² = G · M_sun · ( 2 / r − 1 / a )
              </div>
              <p className="box-subtext">
                Planets travel fastest at perihelion (closest approach) and slowest at aphelion (farthest distance), conserving angular momentum.
              </p>
            </div>

            <div className="theory-box">
              <span className="box-badge">Computational Method</span>
              <h3>Velocity Verlet Numerical Integration</h3>
              <p>
                Standard Euler integration suffers from severe artificial energy gain over long orbits. Our simulation uses the symplectic Velocity Verlet integrator:
              </p>
              <div className="formula-card mono">
                r(t + Δt) = r(t) + v(t)Δt + ½ a(t)Δt²<br />
                v(t + Δt) = v(t) + ½ [a(t) + a(t + Δt)]Δt
              </div>
              <p className="box-subtext">
                This guarantees conservation of total mechanical energy and stable multi-year closed orbits.
              </p>
            </div>

            <div className="theory-box">
              <span className="box-badge">Escape Boundary</span>
              <h3>Escape Velocity (v_esc)</h3>
              <p>
                The minimum speed required for an object to overcome a celestial body's gravitational field without further propulsion:
              </p>
              <div className="formula-card mono">
                v_esc = √( 2 · G · M_sun / r ) = √2 · v_circular
              </div>
              <p className="box-subtext">
                If an orbit's speed exceeds √2 times its circular speed, the eccentricity exceeds 1.0 and the orbit transitions into a hyperbolic escape trajectory.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Draws an oriented vector arrow on 2D canvas
 */
function drawVector(ctx, startX, startY, vx, vy, color, dpr) {
  const endX = startX + vx;
  const endY = startY + vy;
  const headLen = 6 * dpr;
  const angle = Math.atan2(vy, vx);

  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8 * dpr;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(endX - headLen * Math.cos(angle - Math.PI / 6), endY - headLen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(endX - headLen * Math.cos(angle + Math.PI / 6), endY - headLen * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
}
