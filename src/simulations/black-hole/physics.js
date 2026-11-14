import {
  G_CONSTANT,
  SPEED_OF_LIGHT,
  SOLAR_MASS_KG,
  ASTRONOMICAL_UNIT_M,
} from './constants.js';

/**
 * Calculates the Schwarzschild radius (r_s = 2GM / c^2)
 * @param {number} massKg - Mass in kilograms
 * @returns {number} Schwarzschild radius in meters
 */
export function calculateSchwarzschildRadius(massKg) {
  if (massKg <= 0) return 0;
  return (2 * G_CONSTANT * massKg) / (SPEED_OF_LIGHT * SPEED_OF_LIGHT);
}

/**
 * Calculates the Photon Sphere radius (r_ph = 3GM / c^2 = 1.5 * r_s)
 * @param {number} massKg - Mass in kilograms
 * @returns {number} Photon sphere radius in meters
 */
export function calculatePhotonSphereRadius(massKg) {
  return 1.5 * calculateSchwarzschildRadius(massKg);
}

/**
 * Calculates the Innermost Stable Circular Orbit (ISCO) for a Schwarzschild black hole (r_isco = 6GM / c^2 = 3 * r_s)
 * @param {number} massKg - Mass in kilograms
 * @returns {number} ISCO radius in meters
 */
export function calculateIscoRadius(massKg) {
  return 3.0 * calculateSchwarzschildRadius(massKg);
}

/**
 * Calculates the Critical Impact Parameter (b_crit) for photon capture
 * b_crit = (3 * sqrt(3) / 2) * r_s ≈ 2.598076 * r_s
 * @param {number} rs - Schwarzschild radius in meters
 * @returns {number} Critical impact parameter in meters
 */
export function calculateCriticalImpactParameter(rs) {
  return ((3 * Math.sqrt(3)) / 2) * rs;
}

/**
 * Calculates gravitational time dilation ratio (dτ / dt) for a stationary observer at radius r
 * dτ / dt = sqrt(1 - r_s / r)
 * @param {number} r - Distance from center of mass (meters)
 * @param {number} rs - Schwarzschild radius (meters)
 * @returns {number} Proper time rate relative to coordinate time at infinity (0 to 1)
 */
export function calculateTimeDilation(r, rs) {
  if (r <= rs) return 0;
  return Math.sqrt(1 - rs / r);
}

/**
 * Calculates gravitational redshift z = (1 / sqrt(1 - r_s / r)) - 1
 * @param {number} r - Distance from center of mass (meters)
 * @param {number} rs - Schwarzschild radius (meters)
 * @returns {number} Redshift factor z (z -> infinity at r -> r_s)
 */
export function calculateGravitationalRedshift(r, rs) {
  if (r <= rs) return Infinity;
  const factor = Math.sqrt(1 - rs / r);
  return (1 / factor) - 1;
}

/**
 * Calculates the proper acceleration required for a stationary observer to hover at radius r
 * a = (c^2 * r_s) / (2 * r^2 * sqrt(1 - r_s / r))
 * Diverges to infinity as r -> r_s
 * @param {number} r - Distance from center (meters)
 * @param {number} rs - Schwarzschild radius (meters)
 * @returns {number} Proper acceleration in m/s^2
 */
export function calculateHoveringAcceleration(r, rs) {
  if (r <= rs) return Infinity;
  const factor = Math.sqrt(1 - rs / r);
  const numerator = SPEED_OF_LIGHT * SPEED_OF_LIGHT * rs;
  const denominator = 2 * r * r * factor;
  return numerator / denominator;
}

/**
 * Calculates tidal acceleration across a radial height deltaR (e.g. 2m human)
 * Δa_tidal ≈ 2 * G * M * Δr / r^3
 * @param {number} r - Distance from center (meters)
 * @param {number} massKg - Mass in kg
 * @param {number} deltaR - Body height in meters (default 2.0m)
 * @returns {number} Differential tidal acceleration in m/s^2
 */
export function calculateTidalAcceleration(r, massKg, deltaR = 2.0) {
  if (r <= 0) return Infinity;
  return (2 * G_CONSTANT * massKg * deltaR) / (r * r * r);
}

/**
 * Calculates proper time to fall from rest at r_0 to the event horizon r_s
 * τ_fall = (π / 2) * sqrt(r_0^3 / (2 * G * M))
 * @param {number} r0 - Initial radial distance (meters)
 * @param {number} massKg - Mass in kg
 * @returns {number} Proper time in seconds
 */
export function calculateFreeFallProperTime(r0, massKg) {
  if (r0 <= 0 || massKg <= 0) return 0;
  return (Math.PI / 2) * Math.sqrt((r0 * r0 * r0) / (2 * G_CONSTANT * massKg));
}

/**
 * Flamm's Paraboloid spatial embedding height z(r)
 * Represents the spatial metric dl^2 = dr^2 / (1 - r_s / r) + r^2 dφ^2
 * embedded in 3D Euclidean space: dl^2 = dr^2 + dz^2 + r^2 dφ^2
 * where dz/dr = sqrt(r_s / (r - r_s))  ==>  z(r) = -2 * sqrt(r_s * (r - r_s))
 * @param {number} r - Radial distance (in units of r_s)
 * @param {number} rs - Schwarzschild radius
 * @returns {number} Height z in same unit (negative for downward curvature funnel)
 */
export function flammParaboloidHeight(r, rs = 1.0) {
  if (r < rs) return -2 * rs; // Horizon throat
  return -2 * Math.sqrt(rs * (r - rs));
}

/**
 * Evaluates the weak-field Einstein light deflection angle
 * α_weak ≈ 4GM / (b * c^2) = 2 * r_s / b (in radians)
 * @param {number} impactParameterB - Impact parameter b (meters)
 * @param {number} rs - Schwarzschild radius (meters)
 * @returns {number} Deflection angle in radians
 */
export function calculateWeakFieldDeflection(impactParameterB, rs) {
  if (impactParameterB <= 0) return 0;
  return (2 * rs) / impactParameterB;
}

/**
 * Solves the full relativistic Schwarzschild null geodesic for a photon
 * Equation in terms of u = 1 / r:
 *   d^2u / dφ^2 + u = (3/2) * r_s * u^2
 * 
 * @param {number} bRs - Impact parameter in units of r_s (e.g. 3.2 means b = 3.2 * r_s)
 * @param {number} maxSteps - Maximum integration steps
 * @returns {object} Trajectory points [{x, y, r, phi}], whether captured, minRadius, deflectionAngleRad
 */
export function traceRelativisticPhotonGeodesic(bRs, maxSteps = 800) {
  const rs = 1.0; // Normalized units where r_s = 1.0
  const bCrit = calculateCriticalImpactParameter(rs); // ~2.598076
  const isCaptured = bRs < bCrit;

  // Start photon far to the left
  const xStart = -20.0;
  const yStart = bRs;
  const r0 = Math.sqrt(xStart * xStart + yStart * yStart);
  let phi = Math.atan2(yStart, xStart);
  if (phi < 0) phi += 2 * Math.PI;

  let u = 1.0 / r0;
  // du / dφ = - (1/r^2) * (dr/dφ).
  // For incoming photon along +x: x = r * cos(φ), y = r * sin(φ) = b
  // r = b / sin(φ) => u = sin(φ) / b => du/dφ = cos(φ) / b
  let duDphi = Math.cos(phi) / bRs;

  const points = [];
  points.push({
    x: xStart,
    y: yStart,
    r: r0,
    phi,
    u,
  });

  const dPhi = 0.015; // integration step in phi
  let minR = r0;
  let captured = false;

  // Second-order ODE solver: u'' = -u + 1.5 * rs * u^2
  function d2u(currentU) {
    return -currentU + 1.5 * rs * currentU * currentU;
  }

  for (let step = 0; step < maxSteps; step++) {
    // Verlet / RK2 integration step for u(φ)
    // Photons counter-rotate or rotate in direction determined by initial phi
    // Since photon moves from left (phi ~ pi) toward center, phi decreases
    const h = -dPhi;

    const k1_u = duDphi;
    const k1_v = d2u(u);

    const k2_u = duDphi + 0.5 * h * k1_v;
    const k2_v = d2u(u + 0.5 * h * k1_u);

    const k3_u = duDphi + 0.5 * h * k2_v;
    const k3_v = d2u(u + 0.5 * h * k2_u);

    const k4_u = duDphi + h * k3_v;
    const k4_v = d2u(u + h * k3_u);

    u += (h / 6) * (k1_u + 2 * k2_u + 2 * k3_u + k4_u);
    duDphi += (h / 6) * (k1_v + 2 * k2_v + 2 * k3_v + k4_v);
    phi += h;

    if (u <= 0) {
      // Photon has escaped to infinity
      break;
    }

    const currentR = 1.0 / u;
    if (currentR < minR) {
      minR = currentR;
    }

    // Check if entered the event horizon (r <= 1.0)
    if (currentR <= 1.005) {
      captured = true;
      const x = currentR * Math.cos(phi);
      const y = currentR * Math.sin(phi);
      points.push({ x, y, r: currentR, phi, u });
      break;
    }

    const x = currentR * Math.cos(phi);
    const y = currentR * Math.sin(phi);
    points.push({ x, y, r: currentR, phi, u });

    // Stop if photon has reached distance past exit threshold (> 22 rs)
    if (currentR > 22.0 && points.length > 20) {
      break;
    }
  }

  // Calculate deflection angle
  let deflectionRad = 0;
  if (!captured && points.length > 2) {
    const pFirst = points[0];
    const pLast = points[points.length - 1];
    const inAngle = Math.atan2(points[1].y - pFirst.y, points[1].x - pFirst.x);
    const outAngle = Math.atan2(pLast.y - points[points.length - 2].y, pLast.x - points[points.length - 2].x);
    deflectionRad = Math.abs(outAngle - inAngle);
    // Normalize to [0, 2pi]
    while (deflectionRad > Math.PI * 2) deflectionRad -= Math.PI * 2;
  }

  return {
    points,
    captured: captured || isCaptured,
    minRadiusRs: minR,
    deflectionRad,
    deflectionDeg: (deflectionRad * 180) / Math.PI,
    bRs,
    bCrit,
  };
}

/**
 * Formats a distance in meters into human-readable km, AU, or light-years
 * @param {number} meters - Distance in meters
 * @returns {string} Formatted string
 */
export function formatMetricDistance(meters) {
  if (meters < 1e3) {
    return `${meters.toFixed(1)} m`;
  }
  const km = meters / 1000;
  if (km < 1e6) {
    return `${km.toLocaleString(undefined, { maximumFractionDigits: 1 })} km`;
  }
  const au = meters / ASTRONOMICAL_UNIT_M;
  if (au < 0.1) {
    return `${(km / 1e6).toFixed(2)} million km`;
  }
  if (au < 1000) {
    return `${au.toFixed(3)} AU`;
  }
  const ly = meters / 9.461e15;
  return `${ly.toFixed(4)} ly`;
}

/**
 * Formats mass in solar masses or kg
 * @param {number} massSolar - Solar mass multiplier
 * @returns {string} Formatted string
 */
export function formatSolarMass(massSolar) {
  if (massSolar >= 1e9) {
    return `${(massSolar / 1e9).toFixed(2)} Billion M☉`;
  }
  if (massSolar >= 1e6) {
    return `${(massSolar / 1e6).toFixed(2)} Million M☉`;
  }
  if (massSolar >= 1e3) {
    return `${massSolar.toLocaleString(undefined, { maximumFractionDigits: 1 })} M☉`;
  }
  return `${massSolar.toFixed(1)} M☉`;
}
