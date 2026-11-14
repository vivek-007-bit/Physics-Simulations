import React, { useRef, useEffect, useState } from 'react';
import Icon from '../../../components/Icon.jsx';
import { flammParaboloidHeight } from '../physics.js';

export default function SpacetimeMesh({
  massSolar = 10,
  meshDensity = 24, // number of radial rings
}) {
  const canvasRef = useRef(null);

  // 3D Camera Angles and Zoom
  const [pitch, setPitch] = useState(55); // degrees (elevation)
  const [yaw, setYaw] = useState(30);    // degrees (azimuth)
  const [zoom, setZoom] = useState(1.1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });

  // View modes
  const [viewMode, setViewMode] = useState('3d'); // '3d' | '2d-slice'
  const [showFlatComparison, setShowFlatComparison] = useState(true);
  const [showColorHeatmap, setShowColorHeatmap] = useState(true);
  const [angularSpokes, setAngularSpokes] = useState(24);

  // Mouse drag handlers for 3D camera rotation
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragPos.x;
    const dy = e.clientY - dragPos.y;
    setDragPos({ x: e.clientX, y: e.clientY });

    setYaw((y) => (y + dx * 0.45) % 360);
    setPitch((p) => Math.min(Math.max(p - dy * 0.45, 10), 85));
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.08 : 0.92;
    setZoom((z) => Math.min(Math.max(z * factor, 0.5), 2.5));
  };

  const resetCamera = () => {
    setPitch(55);
    setYaw(30);
    setZoom(1.1);
  };

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

    // Background
    ctx.fillStyle = '#060913';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    const centerX = displayWidth / 2;
    const centerY = displayHeight / 2 + (viewMode === '3d' ? 40 : 0);

    if (viewMode === '2d-slice') {
      // -------------------------------------------------------------
      // 2D Potential and Curvature Slice View
      // -------------------------------------------------------------
      const padding = 60;
      const plotW = displayWidth - padding * 2;
      const plotH = displayHeight - padding * 2;

      // Coordinate axes
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
      ctx.lineWidth = 1;

      // Axis lines
      ctx.beginPath();
      // X axis (horizontal)
      ctx.moveTo(padding, padding + plotH * 0.4);
      ctx.lineTo(padding + plotW, padding + plotH * 0.4);
      // Y axis (vertical at r = 0)
      ctx.moveTo(padding + 60, padding);
      ctx.lineTo(padding + 60, padding + plotH);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText('Radial Distance r (units of r_s) →', padding + plotW - 180, padding + plotH * 0.4 - 10);
      ctx.fillText('Flamm Height z(r) & Effective Potential V_eff(r) ↓', padding + 70, padding + 15);

      // Event horizon line at r = 1.0
      const originX = padding + 60;
      const scaleX = (plotW - 80) / 10; // 10 r_s across plot
      const horizonX = originX + 1.0 * scaleX;
      const photonSphereX = originX + 1.5 * scaleX;

      // Event horizon vertical shade
      ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
      ctx.fillRect(originX, padding, horizonX - originX, plotH);

      ctx.strokeStyle = '#ef4444';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(horizonX, padding);
      ctx.lineTo(horizonX, padding + plotH);
      ctx.stroke();
      ctx.fillText('r_s = 2GM/c²', horizonX + 5, padding + 35);

      // Photon sphere marker
      ctx.strokeStyle = '#38bdf8';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(photonSphereX, padding);
      ctx.lineTo(photonSphereX, padding + plotH);
      ctx.stroke();
      ctx.fillText('Photon Sphere (1.5 r_s)', photonSphereX + 5, padding + 55);

      ctx.setLineDash([]);

      // 1. Plot Flamm's Paraboloid embedding profile: z(r) = -2 * sqrt(r_s * (r - r_s))
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      let started = false;
      const zeroY = padding + plotH * 0.4;
      const scaleZ = 22;

      for (let r = 1.0; r <= 10.0; r += 0.05) {
        const px = originX + r * scaleX;
        const zVal = flammParaboloidHeight(r, 1.0); // negative
        const py = zeroY - zVal * scaleZ; // down is negative

        if (!started) {
          ctx.moveTo(px, py);
          started = true;
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();

      // Flat spacetime comparison line (z = 0)
      if (showFlatComparison) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(originX, zeroY);
        ctx.lineTo(originX + 10 * scaleX, zeroY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('Flat Minkowski Spacetime (z = 0)', originX + 4.5 * scaleX, zeroY - 8);
      }

      // Legend
      ctx.fillStyle = '#ea580c';
      ctx.fillText('— Flamm Paraboloid Embedding Curve: z(r) = -2√(r_s(r - r_s))', originX + 20, padding + plotH - 20);
    } else {
      // -------------------------------------------------------------
      // 3D Perspective Wireframe & Surface Curvature Funnel
      // -------------------------------------------------------------
      const radPitch = (pitch * Math.PI) / 180;
      const radYaw = (yaw * Math.PI) / 180;

      const cosPitch = Math.cos(radPitch);
      const sinPitch = Math.sin(radPitch);
      const cosYaw = Math.cos(radYaw);
      const sinYaw = Math.sin(radYaw);

      // Camera focal distance
      const cameraDist = 800;
      const scaleUnits = 24 * zoom;

      // Project 3D (x, y, z) into 2D screen coordinate
      function project(x, y, z) {
        // Rotate yaw (around Z axis)
        const x1 = x * cosYaw - y * sinYaw;
        const y1 = x * sinYaw + y * cosYaw;
        const z1 = z;

        // Rotate pitch (around X axis)
        const x2 = x1;
        const y2 = y1 * cosPitch - z1 * sinPitch;
        const z2 = y1 * sinPitch + z1 * cosPitch;

        // Perspective scale
        const pFactor = cameraDist / (cameraDist + z2);
        return {
          px: centerX + x2 * scaleUnits * pFactor,
          py: centerY - y2 * scaleUnits * pFactor,
          depth: z2,
        };
      }

      // 1. Draw Flat Spacetime Reference Grid if enabled
      if (showFlatComparison) {
        ctx.save();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.lineWidth = 0.8;
        const flatExtent = 10;
        const flatStep = 1.0;

        for (let gx = -flatExtent; gx <= flatExtent; gx += flatStep) {
          ctx.beginPath();
          for (let gy = -flatExtent; gy <= flatExtent; gy += 0.5) {
            const p = project(gx, gy, 0);
            if (gy === -flatExtent) ctx.moveTo(p.px, p.py);
            else ctx.lineTo(p.px, p.py);
          }
          ctx.stroke();
        }
        for (let gy = -flatExtent; gy <= flatExtent; gy += flatStep) {
          ctx.beginPath();
          for (let gx = -flatExtent; gx <= flatExtent; gx += 0.5) {
            const p = project(gx, gy, 0);
            if (gx === -flatExtent) ctx.moveTo(p.px, p.py);
            else ctx.lineTo(p.px, p.py);
          }
          ctx.stroke();
        }
        ctx.restore();
      }

      // 2. Generate 3D Flamm's Paraboloid Curvature Mesh
      // Radial rings from r = 1.0 (event horizon) to r = 9.5
      const numRings = meshDensity;
      const rMin = 1.0;
      const rMax = 9.5;
      const numSpokes = angularSpokes;

      // Concentric Rings
      for (let rIdx = 0; rIdx < numRings; rIdx++) {
        const frac = rIdx / (numRings - 1);
        // Non-linear spacing to give more density near the high-curvature throat
        const r = rMin + Math.pow(frac, 1.4) * (rMax - rMin);
        const z = flammParaboloidHeight(r, 1.0); // negative depth

        // Color coding by depth / curvature intensity
        const depthFrac = Math.abs(z) / (2 * Math.sqrt(1.0 * (rMax - 1.0)));
        let ringColor;
        if (showColorHeatmap) {
          if (rIdx === 0) {
            ringColor = 'rgba(239, 68, 68, 0.95)'; // Horizon throat
          } else if (r <= 1.55) {
            ringColor = 'rgba(249, 115, 22, 0.85)'; // Photon sphere zone
          } else {
            const rVal = Math.floor(234 * (1 - depthFrac) + 56 * depthFrac);
            const gVal = Math.floor(88 * (1 - depthFrac) + 189 * depthFrac);
            const bVal = Math.floor(12 * (1 - depthFrac) + 248 * depthFrac);
            ringColor = `rgba(${rVal}, ${gVal}, ${bVal}, ${0.35 + (1 - depthFrac) * 0.45})`;
          }
        } else {
          ringColor = 'rgba(148, 163, 184, 0.6)';
        }

        ctx.strokeStyle = ringColor;
        ctx.lineWidth = rIdx === 0 ? 2.5 : r <= 1.55 ? 1.8 : 1.0;
        if (r <= 1.55 && r > 1.45) {
          ctx.setLineDash([4, 3]);
        } else {
          ctx.setLineDash([]);
        }

        ctx.beginPath();
        for (let s = 0; s <= numSpokes; s++) {
          const theta = (s / numSpokes) * Math.PI * 2;
          const x = r * Math.cos(theta);
          const y = r * Math.sin(theta);
          const proj = project(x, y, z);

          if (s === 0) ctx.moveTo(proj.px, proj.py);
          else ctx.lineTo(proj.px, proj.py);
        }
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Radial Spokes
      for (let s = 0; s < numSpokes; s++) {
        const theta = (s / numSpokes) * Math.PI * 2;
        ctx.strokeStyle = 'rgba(249, 115, 22, 0.35)';
        ctx.lineWidth = 0.9;
        ctx.beginPath();

        for (let rIdx = 0; rIdx < numRings; rIdx++) {
          const frac = rIdx / (numRings - 1);
          const r = rMin + Math.pow(frac, 1.4) * (rMax - rMin);
          const z = flammParaboloidHeight(r, 1.0);
          const x = r * Math.cos(theta);
          const y = r * Math.sin(theta);
          const proj = project(x, y, z);

          if (rIdx === 0) ctx.moveTo(proj.px, proj.py);
          else ctx.lineTo(proj.px, proj.py);
        }
        ctx.stroke();
      }

      // Event Horizon Throat Center Marker
      const throatProj = project(0, 0, flammParaboloidHeight(1.0, 1.0));
      ctx.fillStyle = '#000000';
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(throatProj.px, throatProj.py, 12 * zoom, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }, [
    pitch,
    yaw,
    zoom,
    viewMode,
    showFlatComparison,
    showColorHeatmap,
    meshDensity,
    angularSpokes,
    massSolar,
  ]);

  return (
    <div className="bh-canvas-card">
      <div className="bh-canvas-toolbar">
        <div className="bh-canvas-title-group">
          <Icon name="layers" size={18} color="#ea580c" />
          <h3 className="bh-canvas-title">3D Spacetime Curvature & Embedding Diagram</h3>
          <span className="bh-canvas-badge">Flamm Paraboloid</span>
        </div>

        <div className="bh-toolbar-actions">
          <button
            className={`bh-tool-btn ${viewMode === '3d' ? 'active' : ''}`}
            onClick={() => setViewMode('3d')}
          >
            <span>3D Mesh</span>
          </button>
          <button
            className={`bh-tool-btn ${viewMode === '2d-slice' ? 'active' : ''}`}
            onClick={() => setViewMode('2d-slice')}
          >
            <span>2D Profile Slice</span>
          </button>

          {viewMode === '3d' && (
            <>
              <button
                className={`bh-tool-btn ${showFlatComparison ? 'active' : ''}`}
                onClick={() => setShowFlatComparison(!showFlatComparison)}
                title="Toggle Flat Spacetime Overlay"
              >
                <span>Flat vs Curved</span>
              </button>
              <button
                className="bh-tool-btn"
                onClick={resetCamera}
                title="Reset Camera Angles"
              >
                <Icon name="reset" size={14} />
                <span>Reset View</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div
        className="bh-viewport-wrap"
        onMouseDown={viewMode === '3d' ? handleMouseDown : undefined}
        onMouseMove={viewMode === '3d' ? handleMouseMove : undefined}
        onMouseUp={viewMode === '3d' ? handleMouseUp : undefined}
        onWheel={handleWheel}
        style={{ cursor: viewMode === '3d' ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        <canvas ref={canvasRef} className="bh-canvas" />

        {/* HUD Info */}
        <div className="bh-hud-overlay">
          <div className="bh-hud-tag">
            {viewMode === '3d'
              ? `Elevation: ${pitch.toFixed(0)}° • Azimuth: ${yaw.toFixed(0)}° • Zoom: ${zoom.toFixed(2)}×`
              : '2D Cross-Sectional Geometry Slice: z(r) vs r'}
          </div>
          <div className="bh-hud-tag" style={{ color: '#38bdf8' }}>
            Embedding Metric: dl² = dr²/(1 - r_s/r) + r²dφ² = dr² + dz² + r²dφ²
          </div>
        </div>

        {viewMode === '3d' && (
          <div className="bh-hud-controls-hint">
            Drag to Rotate 3D Space • Mouse Wheel to Zoom
          </div>
        )}
      </div>

      {/* Scientific Disclaimer Note */}
      <div className="bh-disclaimer-box" style={{ margin: '1rem' }}>
        <Icon name="info" size={18} className="bh-disclaimer-icon" />
        <div>
          <strong>Educational Physics Note:</strong> Flamm&apos;s paraboloid is an isometric embedding of an
          equatorial spatial slice (t = const, θ = π/2) into 3D Euclidean space. It accurately represents
          how radial distances are stretched relative to flat space, but spacetime curvature in general relativity
          is four-dimensional and intrinsic, not a literal rubber sheet sinking in gravity.
        </div>
      </div>
    </div>
  );
}
