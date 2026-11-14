import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { AU_METERS, SOLAR_SYSTEM_DATA } from './constants.js';
import {
  mapPhysicalToVisual,
  getVisualRadius,
  getReferenceRings,
} from './scaleUtils.js';
import {
  createSunTexture,
  createMercuryTexture,
  createVenusTexture,
  createEarthTexture,
  createMarsTexture,
  createJupiterTexture,
  createSaturnTexture,
  createSaturnRingTexture,
  createUranusTexture,
  createNeptuneTexture,
  createCustomBodyTexture,
} from './textures.js';
import Icon from '../../components/Icon';

/**
 * High-Performance Interactive 3D Solar System Visualizer using Three.js.
 * Connects directly to the symplectic Velocity Verlet N-body gravitational physics engine.
 */
export default function SolarSystem3D({
  bodies,
  bodiesRef,
  selectedPlanetId,
  onSelectPlanet,
  scaleMode = 'full',
  cameraFocus = 'sun',
  onToggleCameraFocus,
  showOrbits = true,
  showTrails = true,
  showVelocityVectors = false,
  showForceVectors = false,
  showAccelVectors = false,
  showLabels = true,
  showGrid = true,
  vectorScale = 1.0,
  isDark = true,
  metrics = null,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Helper to get latest bodies from ref or prop
  const getBodies = useCallback(() => {
    if (bodiesRef && bodiesRef.current && bodiesRef.current.length > 0) {
      return bodiesRef.current;
    }
    return bodies || [];
  }, [bodies, bodiesRef]);

  // Three.js Scene References
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const animFrameRef = useRef(null);
  const bodiesMeshesRef = useRef(new Map());
  const trailsLinesRef = useRef(new Map());
  const vectorHelpersRef = useRef(new Map());
  const referenceRingsGroupRef = useRef(null);
  const sunCoronaMeshRef = useRef(null);
  const sunPointLightRef = useRef(null);
  const selectionIndicatorRef = useRef(null);

  // Camera Spherical Coordinates & Interaction State
  const sphericalRef = useRef({
    radius: scaleMode === 'inner' ? 65 : 155,
    theta: Math.PI / 4,
    phi: Math.PI / 3.2,
  });
  const cameraTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  const isPointerDownRef = useRef(false);
  const pointerButtonRef = useRef(0);
  const prevPointerPosRef = useRef({ x: 0, y: 0 });
  const pointerDownPosRef = useRef({ x: 0, y: 0 });

  // Projected Screen Positions for 2D Labels & Overlays
  const [projectedLabels, setProjectedLabels] = useState([]);
  const [hudCollapsed, setHudCollapsed] = useState(false);
  const [viewPreset, setViewPreset] = useState('perspective'); // 'perspective' | 'topdown'

  // Texture mapping helper
  const getTextureForBody = useCallback((body) => {
    switch (body.id) {
      case 'sun': return createSunTexture();
      case 'mercury': return createMercuryTexture();
      case 'venus': return createVenusTexture();
      case 'earth': return createEarthTexture();
      case 'mars': return createMarsTexture();
      case 'jupiter': return createJupiterTexture();
      case 'saturn': return createSaturnTexture();
      case 'uranus': return createUranusTexture();
      case 'neptune': return createNeptuneTexture();
      default: return createCustomBodyTexture(body.color || '#ec4899');
    }
  }, []);

  // 1. Initialize Three.js Scene, Camera, Renderer, Starfield, Lights
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 750;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(isDark ? 0x030712 : 0x0a1128);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 3500);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // Lighting: Dynamic Central Sun PointLight
    const sunLight = new THREE.PointLight(0xfffae8, 3.4, 900, 0.4);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);
    sunPointLightRef.current = sunLight;

    // Soft Ambient Light for shadows
    const ambientLight = new THREE.AmbientLight(0x273549, 0.42);
    scene.add(ambientLight);

    // Starfield Background (Deep Space Particles)
    const starCount = 2400;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 700 + Math.random() * 600;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      starPositions[i * 3] = x;
      starPositions[i * 3 + 1] = y;
      starPositions[i * 3 + 2] = z;

      // Color variation (warm yellow, cool blue, crisp white)
      const colorType = Math.random();
      if (colorType > 0.8) {
        starColors[i * 3] = 0.98; starColors[i * 3 + 1] = 0.92; starColors[i * 3 + 2] = 0.78;
      } else if (colorType > 0.6) {
        starColors[i * 3] = 0.78; starColors[i * 3 + 1] = 0.90; starColors[i * 3 + 2] = 1.0;
      } else {
        starColors[i * 3] = 0.96; starColors[i * 3 + 1] = 0.96; starColors[i * 3 + 2] = 0.98;
      }
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.92 : 0.75,
      sizeAttenuation: false,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // AU Reference Rings Group
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);
    referenceRingsGroupRef.current = ringsGroup;

    // Selection Indicator Ring
    const selectRingGeo = new THREE.RingGeometry(1.6, 1.85, 48);
    const selectRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const selectionRing = new THREE.Mesh(selectRingGeo, selectRingMat);
    selectionRing.rotation.x = Math.PI / 2;
    selectionRing.visible = false;
    scene.add(selectionRing);
    selectionIndicatorRef.current = selectionRing;

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width: newWidth, height: newHeight } = entries[0].contentRect;
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      selectRingGeo.dispose();
      selectRingMat.dispose();
    };
  }, [isDark]);

  // 2. Reference AU Orbit Rings
  useEffect(() => {
    const ringsGroup = referenceRingsGroupRef.current;
    if (!ringsGroup) return;

    while (ringsGroup.children.length > 0) {
      const child = ringsGroup.children[0];
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
      ringsGroup.remove(child);
    }

    if (!showGrid) return;

    const ringData = getReferenceRings(scaleMode);
    ringData.forEach((ring) => {
      const { rVis } = mapPhysicalToVisual(ring.rAU * AU_METERS, 0, scaleMode);
      const points = [];
      const segments = 128;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(rVis * Math.cos(theta), 0, rVis * Math.sin(theta)));
      }

      const ringGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const ringMaterial = new THREE.LineBasicMaterial({
        color: isDark ? 0x334155 : 0x475569,
        transparent: true,
        opacity: isDark ? 0.3 : 0.4,
        linewidth: 1,
      });

      const line = new THREE.Line(ringGeometry, ringMaterial);
      ringsGroup.add(line);
    });
  }, [scaleMode, showGrid, isDark]);

  // 3. Create or Update 3D Meshes for Celestial Bodies
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const meshesMap = bodiesMeshesRef.current;
    const currentBodies = getBodies();
    const currentBodyIds = new Set(currentBodies.map((b) => b.id));

    // Remove obsolete meshes
    for (const [id, meshObj] of meshesMap.entries()) {
      if (!currentBodyIds.has(id)) {
        scene.remove(meshObj.group);
        if (meshObj.sphereMesh.geometry) meshObj.sphereMesh.geometry.dispose();
        if (meshObj.sphereMesh.material) meshObj.sphereMesh.material.dispose();
        if (meshObj.ringMesh) {
          if (meshObj.ringMesh.geometry) meshObj.ringMesh.geometry.dispose();
          if (meshObj.ringMesh.material) meshObj.ringMesh.material.dispose();
        }
        meshesMap.delete(id);
      }
    }

    // Build or update meshes
    currentBodies.forEach((body) => {
      let meshObj = meshesMap.get(body.id);
      const radius = getVisualRadius(body, scaleMode);

      if (!meshObj) {
        const group = new THREE.Group();
        const sphereGeo = new THREE.SphereGeometry(radius, 40, 40);
        const texture = getTextureForBody(body);

        let sphereMat;
        if (body.isSun) {
          sphereMat = new THREE.MeshBasicMaterial({
            map: texture,
            color: 0xffffff,
          });
        } else {
          sphereMat = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: body.id === 'venus' ? 0.35 : 0.72,
            metalness: 0.1,
          });
        }

        const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
        sphereMesh.userData = { bodyId: body.id, bodyName: body.name };
        group.add(sphereMesh);

        // Sun Corona Flare Mesh
        let coronaMesh = null;
        if (body.isSun) {
          const coronaGeo = new THREE.SphereGeometry(radius * 1.28, 32, 32);
          const coronaMat = new THREE.MeshBasicMaterial({
            color: 0xf59e0b,
            transparent: true,
            opacity: 0.24,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
          });
          coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
          group.add(coronaMesh);
          sunCoronaMeshRef.current = coronaMesh;
        }

        // Saturn's Ring System
        let ringMesh = null;
        if (body.hasRings) {
          const ringInner = radius * 1.35;
          const ringOuter = radius * 2.55;
          const ringGeo = new THREE.RingGeometry(ringInner, ringOuter, 64);
          const ringTex = createSaturnRingTexture();
          const ringMat = new THREE.MeshStandardMaterial({
            map: ringTex,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.92,
            roughness: 0.6,
          });
          ringMesh = new THREE.Mesh(ringGeo, ringMat);
          ringMesh.rotation.x = Math.PI / 2 + 0.46; // 26.7 degree axial tilt
          group.add(ringMesh);
        }

        scene.add(group);
        meshObj = { group, sphereMesh, coronaMesh, ringMesh, currentRadius: radius };
        meshesMap.set(body.id, meshObj);
      } else {
        // Adjust geometry if scale mode changed radius
        if (Math.abs(meshObj.currentRadius - radius) > 0.05) {
          meshObj.sphereMesh.geometry.dispose();
          meshObj.sphereMesh.geometry = new THREE.SphereGeometry(radius, 40, 40);
          meshObj.currentRadius = radius;

          if (meshObj.ringMesh) {
            meshObj.ringMesh.geometry.dispose();
            meshObj.ringMesh.geometry = new THREE.RingGeometry(radius * 1.35, radius * 2.55, 64);
          }
          if (meshObj.coronaMesh) {
            meshObj.coronaMesh.geometry.dispose();
            meshObj.coronaMesh.geometry = new THREE.SphereGeometry(radius * 1.28, 32, 32);
          }
        }
      }
    });
  }, [bodies, scaleMode, getTextureForBody, getBodies]);

  // 4. Trail Lines Initialization & Removal
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const trailsMap = trailsLinesRef.current;
    const currentBodies = getBodies();
    const currentBodyIds = new Set(currentBodies.map((b) => b.id));

    // Remove obsolete trails
    for (const [id, line] of trailsMap.entries()) {
      if (!currentBodyIds.has(id)) {
        scene.remove(line);
        line.geometry.dispose();
        line.material.dispose();
        trailsMap.delete(id);
      }
    }

    if (!showTrails) {
      trailsMap.forEach((line) => { line.visible = false; });
      return;
    }

    // Initialize line objects for each body
    currentBodies.forEach((body) => {
      let line = trailsMap.get(body.id);
      if (!line) {
        const geometry = new THREE.BufferGeometry();
        const color = new THREE.Color(body.color || '#38bdf8');
        const material = new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: body.id === selectedPlanetId ? 0.85 : 0.45,
          linewidth: body.id === selectedPlanetId ? 2 : 1,
        });
        line = new THREE.Line(geometry, material);
        scene.add(line);
        trailsMap.set(body.id, line);
      } else {
        line.visible = true;
        line.material.opacity = body.id === selectedPlanetId ? 0.85 : 0.45;
      }
    });
  }, [bodies, showTrails, selectedPlanetId, getBodies]);

  // 5. Vector Helpers Creation (Velocity, Force, Accel)
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const vHelpers = vectorHelpersRef.current;
    vHelpers.forEach((arrow) => { scene.remove(arrow); });
    vHelpers.clear();

    if (!showVelocityVectors && !showForceVectors && !showAccelVectors) return;

    const currentBodies = getBodies();
    const defaultDir = new THREE.Vector3(1, 0, 0);
    const defaultOrigin = new THREE.Vector3(0, 0, 0);

    currentBodies.forEach((body) => {
      if (body.isSun) return;

      if (showVelocityVectors) {
        const velArrow = new THREE.ArrowHelper(defaultDir, defaultOrigin, 5, 0x10b981, 1.2, 0.8);
        scene.add(velArrow);
        vHelpers.set(`vel_${body.id}`, velArrow);
      }

      if (showForceVectors) {
        const forceArrow = new THREE.ArrowHelper(defaultDir, defaultOrigin, 5, 0xec4899, 1.4, 0.9);
        scene.add(forceArrow);
        vHelpers.set(`force_${body.id}`, forceArrow);
      }

      if (showAccelVectors) {
        const accArrow = new THREE.ArrowHelper(defaultDir, defaultOrigin, 5, 0xf97316, 1.2, 0.8);
        scene.add(accArrow);
        vHelpers.set(`acc_${body.id}`, accArrow);
      }
    });
  }, [bodies, showVelocityVectors, showForceVectors, showAccelVectors, getBodies]);

  // 6. High-Performance 60 FPS Render Loop
  useEffect(() => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    if (!scene || !camera || !renderer) return;

    let isCancelled = false;

    const renderLoop = (timestamp) => {
      if (isCancelled) return;

      const currentBodies = getBodies();
      const sph = sphericalRef.current;
      const target = cameraTargetRef.current;
      const meshesMap = bodiesMeshesRef.current;
      const trailsMap = trailsLinesRef.current;
      const vHelpers = vectorHelpersRef.current;

      const container = containerRef.current;
      const width = container ? container.clientWidth : 800;
      const height = container ? container.clientHeight : 750;

      const screenLabels = [];
      let selectedVisualPos = null;
      const sun = currentBodies.find((b) => b.isSun) || currentBodies[0];

      // A. Update Position of each body mesh
      currentBodies.forEach((body) => {
        const meshObj = meshesMap.get(body.id);
        const { x, z } = mapPhysicalToVisual(body.x, body.y, scaleMode);

        if (meshObj) {
          meshObj.group.position.set(x, 0, z);

          // Planetary axial spin
          if (!body.isSun) {
            meshObj.sphereMesh.rotation.y += 0.015;
          }
        }

        // Selected planet visual position
        if (body.id === selectedPlanetId) {
          selectedVisualPos = new THREE.Vector3(x, 0, z);
        }

        // B. Dynamic Orbital Trails Update
        if (showTrails && trailsMap) {
          const line = trailsMap.get(body.id);
          const trailPoints = body.trail || [];
          if (line && trailPoints.length >= 2) {
            const positions = new Float32Array(trailPoints.length * 3);
            for (let i = 0; i < trailPoints.length; i++) {
              const pt = trailPoints[i];
              const tPos = mapPhysicalToVisual(pt.x, pt.y, scaleMode);
              positions[i * 3] = tPos.x;
              positions[i * 3 + 1] = 0;
              positions[i * 3 + 2] = tPos.z;
            }
            line.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            line.visible = true;
          } else if (line) {
            line.visible = false;
          }
        }

        // C. Dynamic Physical Vectors Update
        if (!body.isSun) {
          const bodyOrigin = new THREE.Vector3(x, 0, z);

          // Velocity Vector
          if (showVelocityVectors) {
            const velArrow = vHelpers.get(`vel_${body.id}`);
            if (velArrow) {
              const speed = Math.hypot(body.vx, body.vy);
              if (speed > 0) {
                velArrow.position.copy(bodyOrigin);
                velArrow.setDirection(new THREE.Vector3(body.vx / speed, 0, -body.vy / speed));
                velArrow.setLength(Math.min(speed * 0.12 * vectorScale, 22), 1.2, 0.8);
                velArrow.visible = true;
              } else {
                velArrow.visible = false;
              }
            }
          }

          // Gravitational Force Vector (Pointing toward Sun)
          if (showForceVectors && sun) {
            const forceArrow = vHelpers.get(`force_${body.id}`);
            if (forceArrow) {
              const dx = sun.x - body.x;
              const dy = -(sun.y - body.y);
              const dist = Math.hypot(dx, dy);
              if (dist > 0) {
                forceArrow.position.copy(bodyOrigin);
                forceArrow.setDirection(new THREE.Vector3(dx / dist, 0, dy / dist));
                forceArrow.setLength(7.5 * vectorScale, 1.4, 0.9);
                forceArrow.visible = true;
              } else {
                forceArrow.visible = false;
              }
            }
          }

          // Acceleration Vector
          if (showAccelVectors) {
            const accArrow = vHelpers.get(`acc_${body.id}`);
            if (accArrow) {
              const acc = Math.hypot(body.ax, body.ay);
              if (acc > 0) {
                accArrow.position.copy(bodyOrigin);
                accArrow.setDirection(new THREE.Vector3(body.ax / acc, 0, -body.ay / acc));
                accArrow.setLength(6.0 * vectorScale, 1.2, 0.8);
                accArrow.visible = true;
              } else {
                accArrow.visible = false;
              }
            }
          }
        }

        // D. Project 3D Coordinates to 2D Screen for Planet Name Labels
        if (showLabels && container) {
          const vRadius = getVisualRadius(body, scaleMode);
          const pos3D = new THREE.Vector3(x, vRadius + 1.2, z);
          pos3D.project(camera);

          if (pos3D.z < 1) {
            const screenX = ((pos3D.x + 1) * width) / 2;
            const screenY = ((-pos3D.y + 1) * height) / 2;
            screenLabels.push({
              id: body.id,
              name: body.name,
              color: body.color,
              x: screenX,
              y: screenY,
              isSelected: body.id === selectedPlanetId,
            });
          }
        }
      });

      // Update projected labels state
      setProjectedLabels(screenLabels);

      // E. Animate Sun Corona Flare Pulsation
      const corona = sunCoronaMeshRef.current;
      if (corona) {
        const pulse = 1.0 + Math.sin(timestamp * 0.0025) * 0.06;
        corona.scale.set(pulse, pulse, pulse);
        corona.rotation.y += 0.003;
      }

      // F. Selection Indicator Ring
      const selectionRing = selectionIndicatorRef.current;
      if (selectionRing && selectedVisualPos) {
        selectionRing.visible = true;
        selectionRing.position.copy(selectedVisualPos);
        const selBody = currentBodies.find((b) => b.id === selectedPlanetId);
        const radius = selBody ? getVisualRadius(selBody, scaleMode) : 2;
        const ringScale = (radius * 1.6) / 1.7;
        selectionRing.scale.set(ringScale, ringScale, ringScale);
        selectionRing.rotation.z += 0.02;
      } else if (selectionRing) {
        selectionRing.visible = false;
      }

      // G. Smooth Camera Lerp for Tracking Mode
      if (cameraFocus === 'planet' && selectedVisualPos) {
        target.lerp(selectedVisualPos, 0.06);
      } else {
        target.lerp(new THREE.Vector3(0, 0, 0), 0.06);
      }

      // H. Compute Camera Position from Spherical Coordinates
      const cx = target.x + sph.radius * Math.sin(sph.phi) * Math.sin(sph.theta);
      const cy = target.y + sph.radius * Math.cos(sph.phi);
      const cz = target.z + sph.radius * Math.sin(sph.phi) * Math.cos(sph.theta);

      camera.position.set(cx, cy, cz);
      camera.lookAt(target);

      // I. Render Three.js Scene
      renderer.render(scene, camera);

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isCancelled = true;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [
    scaleMode,
    cameraFocus,
    selectedPlanetId,
    showLabels,
    showTrails,
    showVelocityVectors,
    showForceVectors,
    showAccelVectors,
    vectorScale,
    getBodies,
  ]);

  // Pointer Handlers for Orbit, Pan, and Raycasting Click-to-Select
  const handlePointerDown = (e) => {
    isPointerDownRef.current = true;
    pointerButtonRef.current = e.button;
    prevPointerPosRef.current = { x: e.clientX, y: e.clientY };
    pointerDownPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isPointerDownRef.current) return;

    const dx = e.clientX - prevPointerPosRef.current.x;
    const dy = e.clientY - prevPointerPosRef.current.y;
    prevPointerPosRef.current = { x: e.clientX, y: e.clientY };

    const sph = sphericalRef.current;
    const target = cameraTargetRef.current;

    if (pointerButtonRef.current === 0 && !e.shiftKey) {
      // Orbit (Rotate around target)
      sph.theta -= dx * 0.007;
      sph.phi = Math.max(0.01, Math.min(Math.PI / 2 - 0.02, sph.phi - dy * 0.007));
    } else {
      // Pan (Translate target)
      const panSpeed = sph.radius * 0.0015;
      const cam = cameraRef.current;
      if (cam) {
        const right = new THREE.Vector3();
        const up = new THREE.Vector3();
        cam.matrix.extractBasis(right, up, new THREE.Vector3());

        target.addScaledVector(right, -dx * panSpeed);
        target.addScaledVector(up, dy * panSpeed);
      }
    }
  };

  const handlePointerUp = (e) => {
    isPointerDownRef.current = false;

    // Detect click (not a drag)
    const moveDist = Math.hypot(
      e.clientX - pointerDownPosRef.current.x,
      e.clientY - pointerDownPosRef.current.y
    );

    if (moveDist < 6 && e.button === 0) {
      const container = containerRef.current;
      const camera = cameraRef.current;
      const scene = sceneRef.current;
      if (!container || !camera || !scene) return;

      const rect = container.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const interactiveMeshes = [];
      bodiesMeshesRef.current.forEach((meshObj) => {
        interactiveMeshes.push(meshObj.sphereMesh);
        if (meshObj.ringMesh) interactiveMeshes.push(meshObj.ringMesh);
      });

      const intersects = raycaster.intersectObjects(interactiveMeshes, false);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const bodyId = hit.userData?.bodyId;
        if (bodyId && onSelectPlanet) {
          onSelectPlanet(bodyId);
        }
      }
    }
  };

  // Zoom Handler (Wheel)
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 1.1 : 0.91;
    const sph = sphericalRef.current;
    const minZoom = scaleMode === 'inner' ? 12 : 25;
    const maxZoom = scaleMode === 'inner' ? 240 : 550;
    sph.radius = Math.max(minZoom, Math.min(maxZoom, sph.radius * zoomFactor));
  };

  // Preset View Transitions
  const handleSetTopDownView = () => {
    setViewPreset('topdown');
    sphericalRef.current.phi = 0.02; // top-down along vertical axis
  };

  const handleSetPerspectiveView = () => {
    setViewPreset('perspective');
    sphericalRef.current.phi = Math.PI / 3.2; // 45-60 degree perspective
    sphericalRef.current.theta = Math.PI / 4;
  };

  const handleResetCamera = () => {
    cameraTargetRef.current.set(0, 0, 0);
    sphericalRef.current = {
      radius: scaleMode === 'inner' ? 65 : 155,
      theta: Math.PI / 4,
      phi: Math.PI / 3.2,
    };
    setViewPreset('perspective');
  };

  // Currently selected body for HUD
  const selectedBody = useMemo(() => {
    const list = getBodies();
    return list.find((b) => b.id === selectedPlanetId) || list[3] || list[0];
  }, [getBodies, selectedPlanetId]);

  return (
    <div
      ref={containerRef}
      className="solar-3d-viewport"
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onWheel={handleWheel}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Three.js WebGL Canvas */}
      <canvas ref={canvasRef} className="solar-3d-canvas" />

      {/* Floating 3D Projected Planet Name Labels */}
      {showLabels && (
        <div className="projected-labels-overlay">
          {projectedLabels.map((label) => (
            <button
              key={label.id}
              className={`projected-planet-label ${label.isSelected ? 'selected' : ''}`}
              style={{
                transform: `translate3d(${label.x}px, ${label.y}px, 0)`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectPlanet) onSelectPlanet(label.id);
              }}
            >
              <span className="label-dot" style={{ backgroundColor: label.color }}></span>
              <span className="label-text">{label.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Viewport Floating Top Controls */}
      <div className="viewport-overlay-controls">
        <div className="view-mode-group">
          <button
            className={`view-btn ${viewPreset === 'perspective' ? 'active' : ''}`}
            onClick={handleSetPerspectiveView}
            title="3D Perspective Isometric Angle"
          >
            <Icon name="compass" size={14} />
            <span>3D Perspective</span>
          </button>
          <button
            className={`view-btn ${viewPreset === 'topdown' ? 'active' : ''}`}
            onClick={handleSetTopDownView}
            title="Top-Down 2D Ecliptic Projection"
          >
            <Icon name="atom" size={14} />
            <span>Top-Down (2D)</span>
          </button>
        </div>

        <div className="camera-tracking-group">
          <button
            className={`view-btn ${cameraFocus === 'planet' ? 'active tracking' : ''}`}
            onClick={onToggleCameraFocus}
            title={cameraFocus === 'planet' ? 'Unlock Camera from Planet' : 'Track Selected Planet'}
          >
            <Icon name="compass" size={14} />
            <span>
              {cameraFocus === 'planet' ? `Tracking: ${selectedBody?.name}` : 'Follow Planet'}
            </span>
          </button>
          <button
            className="view-btn icon-only"
            onClick={handleResetCamera}
            title="Reset Camera Framing"
          >
            <Icon name="reset" size={14} />
          </button>
        </div>
      </div>

      {/* Real-Time Planet Information Overlay (HUD) */}
      {selectedBody && (
        <div className={`planet-hud-card ${hudCollapsed ? 'collapsed' : ''}`}>
          <div className="hud-card-header">
            <div className="hud-title-group">
              <span
                className="hud-color-indicator"
                style={{ backgroundColor: selectedBody.color }}
              ></span>
              <div className="hud-title-text">
                <h4 className="hud-planet-name">{selectedBody.name}</h4>
                <span className="hud-planet-type">{selectedBody.type || 'Celestial Body'}</span>
              </div>
            </div>
            <button
              className="hud-collapse-btn"
              onClick={() => setHudCollapsed((c) => !c)}
              title={hudCollapsed ? 'Expand Telemetry' : 'Minimize Telemetry'}
            >
              <Icon name={hudCollapsed ? 'chevron-down' : 'chevron-up'} size={14} />
            </button>
          </div>

          {!hudCollapsed && (
            <div className="hud-metrics-grid">
              <div className="hud-metric-item">
                <span className="hud-metric-label">Mass</span>
                <span className="hud-metric-val mono">
                  {selectedBody.mass.toExponential(3)} kg
                  <span className="hud-subval">
                    ({(selectedBody.mass / 5.9724e24).toFixed(2)} M⊕)
                  </span>
                </span>
              </div>

              <div className="hud-metric-item">
                <span className="hud-metric-label">Equatorial Radius</span>
                <span className="hud-metric-val mono">
                  {(selectedBody.radiusKm || 6000).toLocaleString()} km
                </span>
              </div>

              <div className="hud-metric-item">
                <span className="hud-metric-label">Distance from Sun</span>
                <span className="hud-metric-val mono highlight">
                  {metrics ? `${metrics.distanceAU.toFixed(3)} AU` : '—'}
                  <span className="hud-subval">
                    {metrics ? `${(metrics.distanceKm / 1e6).toFixed(1)}M km` : ''}
                  </span>
                </span>
              </div>

              <div className="hud-metric-item">
                <span className="hud-metric-label">Orbital Speed</span>
                <span className="hud-metric-val mono">
                  {metrics ? `${metrics.speedKmS.toFixed(2)} km/s` : '—'}
                </span>
              </div>

              <div className="hud-metric-item">
                <span className="hud-metric-label">Orbital Period</span>
                <span className="hud-metric-val mono">
                  {metrics && metrics.theoreticalPeriodDays !== Infinity
                    ? `${metrics.theoreticalPeriodDays.toFixed(1)} d`
                    : '—'}
                  <span className="hud-subval">
                    {metrics && metrics.theoreticalPeriodYears !== Infinity
                      ? `(${metrics.theoreticalPeriodYears.toFixed(2)} yr)`
                      : ''}
                  </span>
                </span>
              </div>

              <div className="hud-metric-item">
                <span className="hud-metric-label">Solar Gravitational Force</span>
                <span className="hud-metric-val mono">
                  {metrics ? `${metrics.solarForceNewtons.toExponential(2)} N` : '—'}
                </span>
              </div>

              <div className="hud-metric-item">
                <span className="hud-metric-label">Acceleration (a)</span>
                <span className="hud-metric-val mono">
                  {metrics ? `${metrics.accelMs2.toExponential(3)} m/s²` : '—'}
                </span>
              </div>

              <div className="hud-metric-item">
                <span className="hud-metric-label">Coordinates (x, y)</span>
                <span className="hud-metric-val mono">
                  {(selectedBody.x / AU_METERS).toFixed(2)}, {(selectedBody.y / AU_METERS).toFixed(2)} AU
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Hint Banner */}
      <div className="viewport-hint-pill">
        <span>Left Drag: 3D Orbit • Right/Shift Drag: Pan • Scroll: Zoom • Click Planet to Inspect</span>
      </div>
    </div>
  );
}
