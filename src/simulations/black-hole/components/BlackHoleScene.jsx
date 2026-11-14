import React, { useRef, useEffect, useState, useCallback } from 'react';
import Icon from '../../../components/Icon.jsx';
import {
  calculateSchwarzschildRadius,
  calculatePhotonSphereRadius,
  calculateCriticalImpactParameter,
  calculateTimeDilation,
  calculateGravitationalRedshift,
  calculateHoveringAcceleration,
  flammParaboloidHeight,
  traceRelativisticPhotonGeodesic,
  formatMetricDistance,
} from '../physics.js';
import { SOLAR_MASS_KG } from '../constants.js';

export default function BlackHoleScene({
  massSolar = 10,
  showPhotonSphere = true,
  showAccretionDisk = true,
  showLensing = true,
  showShadowBoundary = true,
  showSpacetimeMesh = true,
  showFlatComparison = false,
  meshDensity = 22,
  diskInclination = 65,
  setDiskInclination,
  diskIntensity = 1.0,
  observerRadiusRs = 1.5,
  isPlaying = true,
  setIsPlaying,
  playbackSpeed = 1.0,
  setPlaybackSpeed,
  autoOrbit = true,
  setAutoOrbit,
  cameraSpeed = 1.0,
  onRestartAnimation,
  onResetSimulation,
}) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // High-frequency animation time refs (avoids 60fps React re-renders)
  const timeRef = useRef(0);
  const lastTimestampRef = useRef(null);

  // Time-dilation clock refs for direct DOM update
  const clockARef = useRef(null);
  const clockBRef = useRef(null);
  const dialAHandRef = useRef(null);
  const dialBHandRef = useRef(null);
  const rateBRef = useRef(null);

  // Camera 3D angles
  const [pitch, setPitch] = useState(55); // elevation degrees
  const [yaw, setYaw] = useState(25);     // azimuth degrees
  const [zoom, setZoom] = useState(1.05);

  const pitchRef = useRef(55);
  const yawRef = useRef(25);
  const zoomRef = useRef(1.05);
  pitchRef.current = pitch;
  yawRef.current = yaw;
  zoomRef.current = zoom;

  // Interaction tracking for auto-orbit pause/resume
  const isInteractingRef = useRef(false);
  const resumeAutoOrbitTimerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, startPitch: 55, startYaw: 25 });

  // Camera Target for smooth interpolation (Focus presets)
  const cameraTargetRef = useRef(null);

  // Hover diagnostic
  const [hoveredRegion, setHoveredRegion] = useState(null);

  // Precomputed background stars with lensing coordinates
  const starsRef = useRef([]);
  useEffect(() => {
    const stars = [];
    let seed = 1337;
    function rand() {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    }
    for (let i = 0; i < 450; i++) {
      stars.push({
        x: (rand() - 0.5) * 2600,
        y: (rand() - 0.5) * 1600,
        zDepth: rand() * 0.5 + 0.5,
        radius: rand() * 1.6 + 0.5,
        baseAlpha: rand() * 0.75 + 0.25,
        color: rand() > 0.85 ? '#93c5fd' : rand() > 0.65 ? '#fef08a' : '#ffffff',
      });
    }
    starsRef.current = stars;
  }, []);

  // Precomputed Accretion Disk Gas Clumps for Keplerian differential rotation
  const gasClumpsRef = useRef([]);
  useEffect(() => {
    const clumps = [];
    let seed = 98765;
    function rand() {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    }
    for (let i = 0; i < 70; i++) {
      const rRs = 3.0 + rand() * 5.8; // between ISCO (3.0) and outer disk (8.8)
      clumps.push({
        rRs,
        baseAngle: rand() * Math.PI * 2,
        size: rand() * 3.5 + 1.8,
        // Keplerian angular velocity omega ~ r^-1.5
        omega: 2.8 / Math.pow(rRs / 3.0, 1.5),
        brightness: rand() * 0.5 + 0.5,
        isHot: rand() > 0.6,
      });
    }
    gasClumpsRef.current = clumps;
  }, []);

  // Precomputed Relativistic Photon Geodesic Streams
  const photonStreamsRef = useRef([]);
  useEffect(() => {
    // 7 Distinct photon streams representing key relativistic trajectories
    const impactParams = [
      { b: 1.8,  speed: 0.38, offset: 0.05, label: 'Captured Plunge' },
      { b: 2.35, speed: 0.35, offset: 0.50, label: 'Grazing Plunge' },
      { b: 2.63, speed: 0.32, offset: 0.25, label: 'Near-Critical Orbit' },
      { b: 3.4,  speed: 0.40, offset: 0.70, label: 'Strong Deflection' },
      { b: 5.2,  speed: 0.44, offset: 0.15, label: 'Moderate Deflection' },
      { b: -2.1, speed: 0.36, offset: 0.40, label: 'Lower Plunge' },
      { b: -3.6, speed: 0.42, offset: 0.85, label: 'Lower Deflection' },
    ];

    photonStreamsRef.current = impactParams.map((p) => {
      const geo = traceRelativisticPhotonGeodesic(Math.abs(p.b), 650);
      return {
        ...p,
        geodesic: geo,
        isNegative: p.b < 0,
      };
    });
  }, []);

  // Mouse camera drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    isInteractingRef.current = true;
    if (resumeAutoOrbitTimerRef.current) {
      clearTimeout(resumeAutoOrbitTimerRef.current);
    }
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startPitch: pitchRef.current,
      startYaw: yawRef.current,
    };
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      const newYaw = (dragStartRef.current.startYaw + dx * 0.4) % 360;
      const newPitch = Math.min(Math.max(dragStartRef.current.startPitch - dy * 0.35, 10), 85);
      setYaw(newYaw);
      setPitch(newPitch);
    } else {
      // Hover detection
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const centerX = canvas.clientWidth / 2;
      const centerY = canvas.clientHeight / 2;
      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const distPx = Math.sqrt(dx * dx + dy * dy);

      const baseRsPx = 42 * zoomRef.current;
      const distRs = distPx / baseRsPx;

      if (distRs <= 1.05) {
        setHoveredRegion({ name: 'Event Horizon (r ≤ r_s)', desc: 'Surface of infinite redshift. Escape velocity exceeds c.' });
      } else if (distRs <= 1.6) {
        setHoveredRegion({ name: 'Photon Sphere (r = 1.5 r_s)', desc: 'Circular null geodesic orbit at 3GM/c².' });
      } else if (distRs <= 2.65) {
        setHoveredRegion({ name: 'Black Hole Shadow (b_crit ≈ 2.6 r_s)', desc: 'Apparent optical shadow boundary for captured photons.' });
      } else if (distRs >= 3.0 && distRs <= 9.0) {
        setHoveredRegion({ name: 'Accretion Disk (r ≥ 3.0 r_s)', desc: 'Differential Keplerian plasma with Doppler beaming.' });
      } else if (distRs > 9.0 && distRs <= 16.0) {
        setHoveredRegion({ name: 'Spacetime Curvature Funnel', desc: "Flamm's paraboloid spatial slice geometry z(r)." });
      } else {
        setHoveredRegion(null);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (resumeAutoOrbitTimerRef.current) clearTimeout(resumeAutoOrbitTimerRef.current);
    resumeAutoOrbitTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 2500);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    isInteractingRef.current = true;
    if (resumeAutoOrbitTimerRef.current) clearTimeout(resumeAutoOrbitTimerRef.current);
    resumeAutoOrbitTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 2500);

    const factor = e.deltaY < 0 ? 1.08 : 0.92;
    setZoom((z) => Math.min(Math.max(z * factor, 0.4), 3.0));
  };

  // Camera presets
  const focusOnBlackHole = () => {
    cameraTargetRef.current = { pitch: 68, yaw: 20, zoom: 1.35 };
  };

  const focusOnSpacetimeMesh = () => {
    cameraTargetRef.current = { pitch: 36, yaw: 40, zoom: 1.05 };
  };

  const focusOnOverview = () => {
    cameraTargetRef.current = { pitch: 80, yaw: 0, zoom: 0.9 };
  };

  const resetCamera = () => {
    cameraTargetRef.current = { pitch: 55, yaw: 25, zoom: 1.05 };
  };

  // Format time MM:SS.cc
  function formatClockTime(sec) {
    const mins = Math.floor(sec / 60);
    const secs = (sec % 60).toFixed(2);
    const m = String(mins).padStart(2, '0');
    const s = String(secs).padStart(5, '0');
    return `${m}:${s}`;
  }

  // Restart handler
  const handleRestart = () => {
    timeRef.current = 0;
    if (onRestartAnimation) onRestartAnimation();
  };

  // -----------------------------------------------------------------
  // MAIN ANIMATION LOOP (SINGLE WELL-MANAGED requestAnimationFrame)
  // -----------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = (timestamp) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
      const deltaSec = Math.min((timestamp - lastTimestampRef.current) / 1000, 0.1);
      lastTimestampRef.current = timestamp;

      // Time advance if playing
      if (isPlaying) {
        timeRef.current += deltaSec * playbackSpeed;
      }

      // Smooth camera interpolation toward target
      if (cameraTargetRef.current) {
        const target = cameraTargetRef.current;
        const lerpFactor = 0.08;
        const newPitch = pitchRef.current + (target.pitch - pitchRef.current) * lerpFactor;
        const newYaw = yawRef.current + (target.yaw - yawRef.current) * lerpFactor;
        const newZoom = zoomRef.current + (target.zoom - zoomRef.current) * lerpFactor;

        setPitch(newPitch);
        setYaw(newYaw);
        setZoom(newZoom);

        if (
          Math.abs(newPitch - target.pitch) < 0.2 &&
          Math.abs(newYaw - target.yaw) < 0.2 &&
          Math.abs(newZoom - target.zoom) < 0.01
        ) {
          cameraTargetRef.current = null;
        }
      } else if (autoOrbit && !isInteractingRef.current && isPlaying) {
        // Subtle autonomous camera rotation
        const orbitRate = 0.045 * cameraSpeed * playbackSpeed;
        setYaw((y) => (y + orbitRate) % 360);
      }

      // Update Dual Time-Dilation Clocks directly in DOM (zero React state overhead)
      const massKg = massSolar * SOLAR_MASS_KG;
      const rsMeters = calculateSchwarzschildRadius(massKg);
      const rMeters = observerRadiusRs * rsMeters;
      const dilationRatio = calculateTimeDilation(rMeters, rsMeters);

      const tCoord = timeRef.current;
      const tProper = tCoord * dilationRatio;

      if (clockARef.current) clockARef.current.textContent = formatClockTime(tCoord);
      if (clockBRef.current) clockBRef.current.textContent = formatClockTime(tProper);
      if (dialAHandRef.current) {
        dialAHandRef.current.style.transform = `rotate(${(tCoord % 60) * 6}deg)`;
      }
      if (dialBHandRef.current) {
        dialBHandRef.current.style.transform = `rotate(${(tProper % 60) * 6}deg)`;
      }
      if (rateBRef.current) {
        rateBRef.current.textContent = `${(dilationRatio * 100).toFixed(1)}% of coordinate rate`;
      }

      // Handle high-DPI canvas resolution
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Deep space cosmic backdrop
      const bgGrad = ctx.createRadialGradient(
        displayWidth / 2,
        displayHeight / 2,
        20,
        displayWidth / 2,
        displayHeight / 2,
        displayWidth * 0.85
      );
      bgGrad.addColorStop(0, '#03050c');
      bgGrad.addColorStop(0.55, '#050814');
      bgGrad.addColorStop(1, '#010207');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      const centerX = displayWidth / 2;
      const centerY = displayHeight / 2;

      // Visual scale: base size of event horizon in pixels
      const baseRsPx = 42 * zoomRef.current;
      const rsPx = baseRsPx;
      const rPhPx = 1.5 * rsPx;
      const rShadowPx = 2.598 * rsPx;
      const rIscoPx = 3.0 * rsPx;
      const rOuterPx = 8.8 * rsPx;

      const t = timeRef.current;

      // 3D Camera Math
      const radPitch = (pitchRef.current * Math.PI) / 180;
      const radYaw = (yawRef.current * Math.PI) / 180;
      const cosPitch = Math.cos(radPitch);
      const sinPitch = Math.sin(radPitch);
      const cosYaw = Math.cos(radYaw);
      const sinYaw = Math.sin(radYaw);

      const cameraDist = 850;

      // 3D projection function: (x, y, z) in rs units -> screen pixels
      function project3D(xRs, yRs, zRs) {
        // Yaw rotation around Z axis
        const x1 = xRs * cosYaw - yRs * sinYaw;
        const y1 = xRs * sinYaw + yRs * cosYaw;
        const z1 = zRs;

        // Pitch rotation around X axis
        const x2 = x1;
        const y2 = y1 * cosPitch - z1 * sinPitch;
        const z2 = y1 * sinPitch + z1 * cosPitch;

        // Perspective scale factor
        const pFactor = cameraDist / (cameraDist + z2 * rsPx * 0.45);
        return {
          px: centerX + x2 * rsPx * pFactor,
          py: centerY - y2 * rsPx * pFactor,
          depth: z2,
          pFactor,
        };
      }

      // -------------------------------------------------------------
      // 1. BACKGROUND STARS (WITH GRAVITATIONAL LENSING DEFLECTION & PARALLAX)
      // -------------------------------------------------------------
      const stars = starsRef.current;
      const einsteinRadiusPx = rShadowPx;

      ctx.save();
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Star parallax from camera rotation
        const parallaxX = (star.x + (yawRef.current * 2.2 * star.zDepth)) % (displayWidth * 2) - displayWidth / 2;
        const parallaxY = star.y + (pitchRef.current - 55) * 1.5 * star.zDepth;

        let sx = centerX + parallaxX;
        let sy = centerY + parallaxY;

        if (sx < -20 || sx > displayWidth + 20 || sy < -20 || sy > displayHeight + 20) {
          continue;
        }

        const dx = sx - centerX;
        const dy = sy - centerY;
        const distFromCenter = Math.sqrt(dx * dx + dy * dy);

        if (showLensing && distFromCenter > 1) {
          // Inside apparent shadow boundary: eclipsed
          if (distFromCenter < rShadowPx * 0.96) {
            continue;
          }

          // Einstein lens outward radial deflection
          const deflection = (einsteinRadiusPx * einsteinRadiusPx) / distFromCenter;
          const factor = (distFromCenter + deflection) / distFromCenter;
          sx = centerX + dx * factor;
          sy = centerY + dy * factor;
        }

        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.baseAlpha;
        ctx.beginPath();
        ctx.arc(sx, sy, star.radius * Math.min(zoomRef.current, 1.4), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // -------------------------------------------------------------
      // 2. 3D SPACETIME CURVATURE MESH (FLAMM'S PARABOLOID)
      // -------------------------------------------------------------
      if (showSpacetimeMesh) {
        ctx.save();

        // Optional Flat Spacetime Reference Grid
        if (showFlatComparison) {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.14)';
          ctx.lineWidth = 0.8;
          const flatExtent = 12;
          const flatStep = 1.5;

          for (let gx = -flatExtent; gx <= flatExtent; gx += flatStep) {
            ctx.beginPath();
            for (let gy = -flatExtent; gy <= flatExtent; gy += 0.8) {
              const p = project3D(gx, gy, 0);
              if (gy === -flatExtent) ctx.moveTo(p.px, p.py);
              else ctx.lineTo(p.px, p.py);
            }
            ctx.stroke();
          }
          for (let gy = -flatExtent; gy <= flatExtent; gy += flatStep) {
            ctx.beginPath();
            for (let gx = -flatExtent; gx <= flatExtent; gx += 0.8) {
              const p = project3D(gx, gy, 0);
              if (gx === -flatExtent) ctx.moveTo(p.px, p.py);
              else ctx.lineTo(p.px, p.py);
            }
            ctx.stroke();
          }
        }

        // Curved Funnel Mesh
        const numRings = meshDensity;
        const numSpokes = 24;
        const rMin = 1.0;
        const rMax = 12.0;

        // Concentric Curvature Rings
        for (let rIdx = 0; rIdx < numRings; rIdx++) {
          const frac = rIdx / (numRings - 1);
          // Power curve for dense throat rings
          const r = rMin + Math.pow(frac, 1.35) * (rMax - rMin);
          const z = flammParaboloidHeight(r, 1.0); // negative depth

          const depthFrac = Math.abs(z) / (2 * Math.sqrt(1.0 * (rMax - 1.0)));

          // Gradient color by curvature depth
          let ringColor;
          if (rIdx === 0) {
            ringColor = 'rgba(239, 68, 68, 0.85)'; // Horizon throat
          } else if (r <= 1.55) {
            ringColor = 'rgba(249, 115, 22, 0.75)'; // Photon sphere zone
          } else {
            const rVal = Math.floor(234 * (1 - depthFrac) + 56 * depthFrac);
            const gVal = Math.floor(88 * (1 - depthFrac) + 189 * depthFrac);
            const bVal = Math.floor(12 * (1 - depthFrac) + 248 * depthFrac);
            ringColor = `rgba(${rVal}, ${gVal}, ${bVal}, ${0.25 + (1 - depthFrac) * 0.45})`;
          }

          ctx.strokeStyle = ringColor;
          ctx.lineWidth = rIdx === 0 ? 2.0 : r <= 1.55 ? 1.6 : 0.9;
          if (r <= 1.55 && r > 1.45) ctx.setLineDash([4, 3]);
          else ctx.setLineDash([]);

          ctx.beginPath();
          for (let s = 0; s <= numSpokes; s++) {
            const theta = (s / numSpokes) * Math.PI * 2;
            const px3 = r * Math.cos(theta);
            const py3 = r * Math.sin(theta);
            const proj = project3D(px3, py3, z);

            if (s === 0) ctx.moveTo(proj.px, proj.py);
            else ctx.lineTo(proj.px, proj.py);
          }
          ctx.stroke();
        }
        ctx.setLineDash([]);

        // Radial Curvature Spokes with subtle animated coordinate inflow
        for (let s = 0; s < numSpokes; s++) {
          const theta = (s / numSpokes) * Math.PI * 2;
          ctx.strokeStyle = 'rgba(249, 115, 22, 0.3)';
          ctx.lineWidth = 0.85;
          ctx.beginPath();

          for (let rIdx = 0; rIdx < numRings; rIdx++) {
            const frac = rIdx / (numRings - 1);
            const r = rMin + Math.pow(frac, 1.35) * (rMax - rMin);
            const z = flammParaboloidHeight(r, 1.0);
            const px3 = r * Math.cos(theta);
            const py3 = r * Math.sin(theta);
            const proj = project3D(px3, py3, z);

            if (rIdx === 0) ctx.moveTo(proj.px, proj.py);
            else ctx.lineTo(proj.px, proj.py);
          }
          ctx.stroke();
        }
        ctx.restore();
      }

      // -------------------------------------------------------------
      // 3. RELATIVISTIC ACCRETION DISK (BACKGROUND HALF / UPPER LENSED ARC)
      // -------------------------------------------------------------
      const incRad = (diskInclination * Math.PI) / 180;
      const cosInc = Math.cos(incRad);
      const diskAspect = Math.max(cosInc, 0.16);

      if (showAccretionDisk) {
        ctx.save();
        ctx.globalAlpha = diskIntensity;

        // Upper Lensed Arc (warped over the top of the event horizon shadow)
        if (diskInclination < 85) {
          const lensedArcHeight = rsPx * 2.45 * (1 - cosInc * 0.45);
          const arcWidth = rOuterPx * 1.35;

          const topArcGrad = ctx.createLinearGradient(
            centerX - arcWidth,
            centerY - lensedArcHeight,
            centerX + arcWidth,
            centerY - lensedArcHeight
          );
          // Doppler beaming: approaching side (left) is brighter and bluer
          topArcGrad.addColorStop(0.0, 'rgba(254, 215, 170, 0.95)');
          topArcGrad.addColorStop(0.2, 'rgba(251, 146, 60, 0.9)');
          topArcGrad.addColorStop(0.5, 'rgba(234, 88, 12, 0.65)');
          topArcGrad.addColorStop(0.85, 'rgba(180, 83, 9, 0.35)');
          topArcGrad.addColorStop(1.0, 'rgba(120, 53, 15, 0.1)');

          ctx.strokeStyle = topArcGrad;
          ctx.lineWidth = rsPx * 0.75;
          ctx.beginPath();
          ctx.ellipse(
            centerX,
            centerY - rsPx * 0.45,
            arcWidth,
            lensedArcHeight,
            0,
            Math.PI * 1.05,
            Math.PI * 1.95,
            false
          );
          ctx.stroke();

          // Subtle secondary inner ring
          ctx.strokeStyle = 'rgba(253, 186, 116, 0.8)';
          ctx.lineWidth = rsPx * 0.25;
          ctx.beginPath();
          ctx.ellipse(
            centerX,
            centerY - rsPx * 0.35,
            rIscoPx * 1.25,
            lensedArcHeight * 0.68,
            0,
            Math.PI * 1.1,
            Math.PI * 1.9,
            false
          );
          ctx.stroke();
        }

        // Background Half of Equatorial Disk (pi to 2*pi)
        const ringSteps = 16;
        for (let i = 0; i < ringSteps; i++) {
          const frac = i / ringSteps;
          const rRing = rIscoPx + frac * (rOuterPx - rIscoPx);
          const ringWidth = (rOuterPx - rIscoPx) / ringSteps * 1.3;

          const rNorm = (rRing - rIscoPx) / (rOuterPx - rIscoPx);
          const alphaBase = (1 - rNorm * 0.65) * 0.85;

          ctx.lineWidth = ringWidth;
          const diskGrad = ctx.createLinearGradient(
            centerX - rRing, centerY,
            centerX + rRing, centerY
          );
          // Approaching side (left) is Doppler beamed
          diskGrad.addColorStop(0.0, `rgba(255, 237, 213, ${alphaBase * 1.1})`);
          diskGrad.addColorStop(0.3, `rgba(251, 146, 60, ${alphaBase})`);
          diskGrad.addColorStop(0.65, `rgba(234, 88, 12, ${alphaBase * 0.7})`);
          diskGrad.addColorStop(1.0, `rgba(154, 52, 18, ${alphaBase * 0.25})`);

          ctx.strokeStyle = diskGrad;
          ctx.beginPath();
          ctx.ellipse(centerX, centerY, rRing, rRing * diskAspect, 0, Math.PI, 2 * Math.PI);
          ctx.stroke();
        }
        ctx.restore();
      }

      // -------------------------------------------------------------
      // 4. ANIMATED GRAVITATIONAL LENSING LIGHT RAYS
      // -------------------------------------------------------------
      if (showLensing && photonStreamsRef.current.length > 0) {
        ctx.save();
        const streams = photonStreamsRef.current;

        for (let sIdx = 0; sIdx < streams.length; sIdx++) {
          const stream = streams[sIdx];
          const geo = stream.geodesic;
          if (!geo || !geo.points || geo.points.length < 2) continue;

          const isCap = geo.captured;
          const streamSpeed = stream.speed * playbackSpeed;
          // Progress parameter in [0, 1]
          const progress = (t * streamSpeed + stream.offset) % 1.0;

          // Trace continuous geodesic trail
          ctx.strokeStyle = isCap ? 'rgba(239, 68, 68, 0.45)' : 'rgba(56, 189, 248, 0.55)';
          ctx.lineWidth = isCap ? 1.2 : 1.6;
          ctx.beginPath();

          for (let pIdx = 0; pIdx < geo.points.length; pIdx++) {
            const pt = geo.points[pIdx];
            const ySign = stream.isNegative ? -1 : 1;
            const scrX = centerX + pt.x * rsPx;
            const scrY = centerY - pt.y * rsPx * ySign;

            if (pIdx === 0) ctx.moveTo(scrX, scrY);
            else ctx.lineTo(scrX, scrY);
          }
          ctx.stroke();

          // Traveling glowing photon packet
          const ptCount = geo.points.length;
          const idxFloat = progress * (ptCount - 1);
          const idxLow = Math.floor(idxFloat);
          const idxHigh = Math.min(idxLow + 1, ptCount - 1);
          const lerp = idxFloat - idxLow;

          const p1 = geo.points[idxLow];
          const p2 = geo.points[idxHigh];
          const ySign = stream.isNegative ? -1 : 1;

          const curX = p1.x + (p2.x - p1.x) * lerp;
          const curY = (p1.y + (p2.y - p1.y) * lerp) * ySign;

          const photonScrX = centerX + curX * rsPx;
          const photonScrY = centerY - curY * rsPx;

          // Glowing photon wave packet
          const pGrad = ctx.createRadialGradient(
            photonScrX, photonScrY, 1,
            photonScrX, photonScrY, 9
          );
          pGrad.addColorStop(0, '#ffffff');
          pGrad.addColorStop(0.4, isCap ? '#f87171' : '#38bdf8');
          pGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

          ctx.fillStyle = pGrad;
          ctx.beginPath();
          ctx.arc(photonScrX, photonScrY, 9, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(photonScrX, photonScrY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // -------------------------------------------------------------
      // 5. CRITICAL SHADOW BOUNDARY (b_crit ≈ 2.598 r_s)
      // -------------------------------------------------------------
      if (showShadowBoundary) {
        ctx.save();
        ctx.strokeStyle = 'rgba(100, 116, 139, 0.45)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, rShadowPx, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // -------------------------------------------------------------
      // 6. PHOTON SPHERE GLOW RING (r = 1.5 r_s)
      // -------------------------------------------------------------
      if (showPhotonSphere) {
        ctx.save();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.9)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, rPhPx, 0, Math.PI * 2);
        ctx.stroke();

        const haloGrad = ctx.createRadialGradient(
          centerX, centerY, rPhPx * 0.85,
          centerX, centerY, rPhPx * 1.35
        );
        haloGrad.addColorStop(0, 'rgba(56, 189, 248, 0.28)');
        haloGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, rPhPx * 1.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // -------------------------------------------------------------
      // 7. CENTRAL EVENT HORIZON (ABSOLUTE BLACK SILHOUETTE)
      // -------------------------------------------------------------
      ctx.save();
      // Outer redshifted horizon border
      const horizonGlow = ctx.createRadialGradient(
        centerX, centerY, rsPx * 0.82,
        centerX, centerY, rsPx * 1.1
      );
      horizonGlow.addColorStop(0, '#000000');
      horizonGlow.addColorStop(0.85, '#05070e');
      horizonGlow.addColorStop(0.98, 'rgba(249, 115, 22, 0.65)');
      horizonGlow.addColorStop(1.0, 'rgba(249, 115, 22, 0)');

      ctx.fillStyle = horizonGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, rsPx * 1.1, 0, Math.PI * 2);
      ctx.fill();

      // Absolute dark event horizon core
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(centerX, centerY, rsPx, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // -------------------------------------------------------------
      // 8. FOREGROUND ACCRETION DISK WITH KEPLERIAN DIFFERENTIAL CLUMPS
      // -------------------------------------------------------------
      if (showAccretionDisk) {
        ctx.save();
        ctx.globalAlpha = diskIntensity;

        // Foreground continuous equatorial disk (0 to pi)
        const ringSteps = 16;
        for (let i = 0; i < ringSteps; i++) {
          const frac = i / ringSteps;
          const rRing = rIscoPx + frac * (rOuterPx - rIscoPx);
          const ringWidth = (rOuterPx - rIscoPx) / ringSteps * 1.3;

          const rNorm = (rRing - rIscoPx) / (rOuterPx - rIscoPx);
          const alphaBase = (1 - rNorm * 0.6) * 0.95;

          ctx.lineWidth = ringWidth;
          const diskGrad = ctx.createLinearGradient(
            centerX - rRing, centerY,
            centerX + rRing, centerY
          );
          diskGrad.addColorStop(0.0, `rgba(255, 247, 237, ${alphaBase * 1.15})`);
          diskGrad.addColorStop(0.35, `rgba(251, 146, 60, ${alphaBase})`);
          diskGrad.addColorStop(0.7, `rgba(234, 88, 12, ${alphaBase * 0.8})`);
          diskGrad.addColorStop(1.0, `rgba(154, 52, 18, ${alphaBase * 0.3})`);

          ctx.strokeStyle = diskGrad;
          ctx.beginPath();
          ctx.ellipse(centerX, centerY, rRing, rRing * diskAspect, 0, 0, Math.PI);
          ctx.stroke();
        }

        // Keplerian Differential Clumps / Plasma Streaks
        const clumps = gasClumpsRef.current;
        for (let cIdx = 0; cIdx < clumps.length; cIdx++) {
          const clump = clumps[cIdx];
          // Angle with differential Keplerian angular velocity omega(r)
          const angle = (clump.baseAngle + clump.omega * t * playbackSpeed) % (Math.PI * 2);

          const rRingPx = clump.rRs * rsPx;
          const clumpX = centerX + rRingPx * Math.cos(angle);
          const clumpY = centerY + rRingPx * Math.sin(angle) * diskAspect;

          // Relativistic Doppler beaming factor: approaching (cos(angle) < 0) is boosted
          const beta = Math.sqrt(0.5 / clump.rRs);
          const dopplerFactor = 1.0 - beta * Math.sin(angle);
          const beamingBoost = Math.max(0.3, Math.min(2.2, 1.0 / Math.pow(dopplerFactor, 3)));

          const isForeground = Math.sin(angle) >= 0;
          ctx.globalAlpha = (isForeground ? 0.9 : 0.45) * diskIntensity;

          ctx.fillStyle = clump.isHot
            ? `rgba(254, 240, 138, ${Math.min(1.0, clump.brightness * beamingBoost)})`
            : `rgba(249, 115, 22, ${Math.min(1.0, clump.brightness * beamingBoost)})`;

          ctx.beginPath();
          ctx.arc(clumpX, clumpY, clump.size * zoomRef.current * (isForeground ? 1.0 : 0.75), 0, Math.PI * 2);
          ctx.fill();
        }

        // Lower Lensed Arc
        if (diskInclination < 75) {
          const lowerLensedHeight = rsPx * 0.95 * (1 - cosInc * 0.4);
          ctx.strokeStyle = 'rgba(234, 88, 12, 0.48)';
          ctx.lineWidth = rsPx * 0.35;
          ctx.beginPath();
          ctx.ellipse(
            centerX,
            centerY + rsPx * 0.4,
            rOuterPx * 0.85,
            lowerLensedHeight,
            0,
            0.15 * Math.PI,
            0.85 * Math.PI,
            false
          );
          ctx.stroke();
        }
        ctx.restore();
      }

      ctx.restore(); // restore dpr transform

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (resumeAutoOrbitTimerRef.current) clearTimeout(resumeAutoOrbitTimerRef.current);
    };
  }, [
    massSolar,
    showPhotonSphere,
    showAccretionDisk,
    showLensing,
    showShadowBoundary,
    showSpacetimeMesh,
    showFlatComparison,
    meshDensity,
    diskInclination,
    diskIntensity,
    observerRadiusRs,
    isPlaying,
    playbackSpeed,
    autoOrbit,
    cameraSpeed,
  ]);

  return (
    <div className="bh-canvas-card">
      {/* Top Stage Toolbar */}
      <div className="bh-canvas-toolbar">
        <div className="bh-canvas-title-group">
          <Icon name="black-hole" size={18} color="#ea580c" />
          <h3 className="bh-canvas-title">Astrophysics Visual Laboratory</h3>
          <span className="bh-canvas-badge">Schwarzschild Spacetime</span>
          <span className={`bh-live-badge ${isPlaying ? 'live' : 'paused'}`}>
            <span className="bh-live-dot" />
            {isPlaying ? 'RUNNING' : 'PAUSED'}
          </span>
        </div>

        {/* Playback & Camera Toolbar Actions */}
        <div className="bh-toolbar-actions">
          {/* Play / Pause Toggle */}
          <button
            className={`bh-tool-btn ${!isPlaying ? 'paused-btn' : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause Simulation' : 'Resume Simulation'}
          >
            <Icon name={isPlaying ? 'pause' : 'play'} size={14} />
            <span>{isPlaying ? 'Pause' : 'Resume'}</span>
          </button>

          {/* Restart Animation */}
          <button
            className="bh-tool-btn"
            onClick={handleRestart}
            title="Restart Animation (t = 0)"
          >
            <Icon name="replay" size={14} />
            <span>Restart</span>
          </button>

          {/* Speed Presets */}
          <div className="bh-speed-pill-group">
            {[0.25, 0.5, 1.0, 2.0].map((spd) => (
              <button
                key={spd}
                className={`bh-speed-pill ${playbackSpeed === spd ? 'active' : ''}`}
                onClick={() => setPlaybackSpeed(spd)}
              >
                {spd}×
              </button>
            ))}
          </div>

          {/* Auto-Orbit Toggle */}
          <button
            className={`bh-tool-btn ${autoOrbit ? 'active' : ''}`}
            onClick={() => setAutoOrbit(!autoOrbit)}
            title="Toggle Subtle Autonomous Camera Orbit"
          >
            <Icon name="rotate-ccw" size={14} />
            <span>Auto Orbit</span>
          </button>

          {/* Camera Focus Presets */}
          <button className="bh-tool-btn" onClick={focusOnBlackHole} title="Focus Camera on Black Hole">
            <span>Black Hole</span>
          </button>
          <button className="bh-tool-btn" onClick={focusOnSpacetimeMesh} title="Focus Camera on Spacetime Mesh">
            <span>Mesh</span>
          </button>
          <button className="bh-tool-btn" onClick={focusOnOverview} title="Wide Overview">
            <span>Overview</span>
          </button>

          {/* Zoom Buttons */}
          <button
            className="bh-tool-btn icon-only"
            onClick={() => setZoom((z) => Math.min(z * 1.2, 3.0))}
            title="Zoom In"
          >
            <span>+</span>
          </button>
          <button
            className="bh-tool-btn icon-only"
            onClick={() => setZoom((z) => Math.max(z / 1.2, 0.4))}
            title="Zoom Out"
          >
            <span>−</span>
          </button>
          <button
            className="bh-tool-btn"
            onClick={resetCamera}
            title="Reset Camera Angles and Zoom"
          >
            <Icon name="reset" size={14} />
            <span>Reset View</span>
          </button>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div
        className="bh-viewport-wrap"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <canvas ref={canvasRef} className="bh-canvas" />

        {/* Top-Left Telemetry Badge */}
        <div className="bh-hud-overlay">
          <div className="bh-hud-tag">
            Elev: {pitch.toFixed(0)}° • Azim: {yaw.toFixed(0)}° • Zoom: {zoom.toFixed(2)}×
          </div>
          {hoveredRegion && (
            <div className="bh-hud-tag" style={{ borderColor: '#ea580c', color: '#fbbf24' }}>
              <strong>{hoveredRegion.name}</strong> — {hoveredRegion.desc}
            </div>
          )}
        </div>

        {/* Top-Right DUAL TIME-DILATION RELATIVISTIC CLOCKS HUD */}
        <div className="bh-clocks-hud">
          {/* Clock A: Distant Observer */}
          <div className="bh-mini-clock">
            <div className="bh-mini-dial">
              <div ref={dialAHandRef} className="bh-mini-hand infinity-hand" />
              <div className="bh-mini-dot" />
            </div>
            <div className="bh-mini-details">
              <span className="bh-mini-title">Clock A (Distant Observer r → ∞)</span>
              <span ref={clockARef} className="bh-mini-time coord-time">00:00.00</span>
              <span className="bh-mini-sub">Coordinate Time (dt) • 1.000×</span>
            </div>
          </div>

          {/* Clock B: Hovering Observer */}
          <div className="bh-mini-clock">
            <div className="bh-mini-dial">
              <div ref={dialBHandRef} className="bh-mini-hand proper-hand" />
              <div className="bh-mini-dot" />
            </div>
            <div className="bh-mini-details">
              <span className="bh-mini-title">Clock B (Stationary at {observerRadiusRs.toFixed(2)} r_s)</span>
              <span ref={clockBRef} className="bh-mini-time proper-time">00:00.00</span>
              <span ref={rateBRef} className="bh-mini-sub">Proper Time (dτ)</span>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Navigation Hint */}
        <div className="bh-hud-controls-hint">
          Drag to Orbit Camera • Mouse Wheel to Zoom • Hover over structures to inspect
        </div>
      </div>

      {/* Region Legend Ribbon */}
      <div className="bh-regions-legend">
        <div className="bh-legend-item">
          <div className="bh-legend-dot horizon" />
          <span>Event Horizon (r = r_s)</span>
        </div>
        <div className="bh-legend-item">
          <div className="bh-legend-dot photon" />
          <span>Photon Sphere (r = 1.5 r_s)</span>
        </div>
        <div className="bh-legend-item">
          <div className="bh-legend-dot shadow" />
          <span>Shadow (b_crit ≈ 2.6 r_s)</span>
        </div>
        <div className="bh-legend-item">
          <div className="bh-legend-dot isco" />
          <span>Accretion Disk (Keplerian)</span>
        </div>
        <div className="bh-legend-item">
          <div className="bh-legend-dot mesh" />
          <span>Spacetime Curvature Funnel</span>
        </div>
        <div className="bh-legend-item">
          <div className="bh-legend-dot ray" />
          <span>Light Geodesics (Animated)</span>
        </div>
      </div>
    </div>
  );
}
