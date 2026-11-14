import { AU_METERS } from './constants.js';

/**
 * Intelligent Visual Scaling System for the 3D Solar System.
 * 
 * Physics Engine:
 * - Computes exact physical trajectories in standard SI units (meters, kg, seconds)
 *   via symplectic Velocity Verlet numerical integration.
 * 
 * Visualization Mapping:
 * - Direct true-to-scale mapping would render planets invisible (sub-pixel dots separated by kilometers).
 * - This module maps true instantaneous SI positions (x, y in meters) onto 3D visual coordinates (x, z in 3D scene),
 *   strictly conserving the exact instantaneous orbital angle θ and physical distance changes (eccentricity,
 *   perihelion/aphelion variation), while applying a documented perceptual scale.
 */

export const INNER_SCALE_FACTOR = 26.0; // Visual radius for 1 AU in inner mode
export const FULL_SCALE_FACTOR = 14.0;  // Base visual radius for 1 AU in full mode
export const FULL_EXPONENT = 0.58;      // Power-law compression exponent for outer solar system

/**
 * Maps physical position (meters) to 3D visual coordinates (x, z in visual units; y is 0).
 */
export function mapPhysicalToVisual(xMeters, yMeters, scaleMode = 'full') {
  if (xMeters === 0 && yMeters === 0) {
    return { x: 0, y: 0, z: 0, rVis: 0, rAU: 0 };
  }

  const rMeters = Math.hypot(xMeters, yMeters);
  const rAU = rMeters / AU_METERS;
  const angle = Math.atan2(yMeters, xMeters);

  let rVis = 0;
  if (scaleMode === 'inner') {
    // Linear scaling up to ~2.5 AU
    rVis = rAU * INNER_SCALE_FACTOR;
  } else {
    // Perceptually balanced power-law scaling
    rVis = Math.pow(rAU, FULL_EXPONENT) * FULL_SCALE_FACTOR;
  }

  // In Three.js: X is horizontal, Z is forward/backward (orbital plane), Y is vertical
  const x = rVis * Math.cos(angle);
  const z = -rVis * Math.sin(angle);

  return { x, y: 0, z, rVis, rAU, angle };
}

/**
 * Returns visually scaled planetary radius based on physical radius (km).
 */
export function getVisualRadius(planet, scaleMode = 'full') {
  if (planet.isSun) {
    return scaleMode === 'inner' ? 3.6 : 3.0;
  }

  const baseRadii = {
    mercury: 0.72,
    venus: 1.05,
    earth: 1.15,
    mars: 0.85,
    jupiter: 2.35,
    saturn: 1.95,
    uranus: 1.50,
    neptune: 1.45,
  };

  let r = baseRadii[planet.id];
  if (!r) {
    // Custom body fallback
    const rKm = planet.radiusKm || 6000;
    r = Math.max(0.65, Math.min(2.8, Math.pow(rKm / 6371, 0.45) * 1.15));
  }

  if (scaleMode === 'inner') {
    r *= 1.25;
  }

  return r;
}

/**
 * Standard AU scale ring distances for reference grid.
 */
export function getReferenceRings(scaleMode = 'full') {
  if (scaleMode === 'inner') {
    return [
      { rAU: 0.387, label: '0.39 AU (Mercury)' },
      { rAU: 0.723, label: '0.72 AU (Venus)' },
      { rAU: 1.000, label: '1.00 AU (Earth)' },
      { rAU: 1.524, label: '1.52 AU (Mars)' },
      { rAU: 2.000, label: '2.00 AU' },
    ];
  }

  return [
    { rAU: 1.000, label: '1 AU (Earth)' },
    { rAU: 1.524, label: '1.5 AU (Mars)' },
    { rAU: 5.204, label: '5.2 AU (Jupiter)' },
    { rAU: 9.583, label: '9.6 AU (Saturn)' },
    { rAU: 19.22, label: '19.2 AU (Uranus)' },
    { rAU: 30.07, label: '30.1 AU (Neptune)' },
  ];
}
