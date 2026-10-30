/**
 * Pure physics calculations for 2D Projectile Motion under constant gravity.
 * All units are standard SI (meters, seconds, m/s, m/s², radians/degrees).
 */

export function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

export function radToDeg(radians) {
  return (radians * 180) / Math.PI;
}

/**
 * Calculates pre-flight analytical metrics for a projectile.
 *
 * @param {Object} params
 * @param {number} params.v0 - Initial velocity (m/s)
 * @param {number} params.angle - Launch angle (degrees)
 * @param {number} params.g - Acceleration due to gravity (m/s²)
 * @param {number} params.h0 - Initial launch height (m)
 * @returns {Object} Analytical trajectory metrics
 */
export function calculateAnalyticalTrajectory({ v0, angle, g, h0 = 0 }) {
  const theta = degToRad(angle);
  const v0x = v0 * Math.cos(theta);
  const v0y = v0 * Math.sin(theta);

  // Time to reach maximum height (apex)
  // If v0y < 0 (launched downwards), apex is reached at t=0
  const tApex = v0y > 0 ? v0y / g : 0;

  // Maximum vertical height
  const yMax = h0 + (v0y > 0 ? (v0y * v0y) / (2 * g) : 0);

  // Flight time using quadratic formula: y(t) = h0 + v0y*t - 0.5*g*t^2 = 0
  // 0.5*g*t^2 - v0y*t - h0 = 0
  // Discriminant: D = v0y^2 + 2*g*h0
  const discriminant = v0y * v0y + 2 * g * h0;
  const tFlight = (v0y + Math.sqrt(Math.max(0, discriminant))) / g;

  // Horizontal range at touchdown
  const range = v0x * tFlight;

  // Position at apex
  const xApex = v0x * tApex;

  // Impact velocity and angle at landing time
  const vyImpact = v0y - g * tFlight; // will be negative
  const vImpact = Math.sqrt(v0x * v0x + vyImpact * vyImpact);
  const impactAngleDeg = Math.abs(radToDeg(Math.atan2(Math.abs(vyImpact), v0x)));

  return {
    theta,
    v0x,
    v0y,
    tApex,
    yMax,
    tFlight,
    range,
    xApex,
    vyImpact,
    vImpact,
    impactAngleDeg,
  };
}

/**
 * Computes instantaneous state of projectile at elapsed time t.
 *
 * @param {number} t - Elapsed time in seconds
 * @param {Object} params
 * @param {Object} analytical - Pre-calculated analytical values
 * @returns {Object} Instantaneous position and velocity
 */
export function calculateInstantaneousState(t, { v0, angle, g, h0 = 0 }, analytical) {
  const { v0x, v0y, tFlight } = analytical;

  // Clamp time to flight duration
  const clampedT = Math.min(Math.max(0, t), tFlight);

  const x = v0x * clampedT;
  const y = Math.max(0, h0 + v0y * clampedT - 0.5 * g * clampedT * clampedT);

  const vx = v0x;
  const vy = v0y - g * clampedT;
  const v = Math.sqrt(vx * vx + vy * vy);

  return {
    t: clampedT,
    x,
    y,
    vx,
    vy,
    v,
    isLanded: clampedT >= tFlight,
  };
}

/**
 * Generates an array of sampled points along the theoretical trajectory.
 * Used for drawing the parabolic reference path.
 */
export function sampleTrajectoryPath({ v0, angle, g, h0 = 0 }, analytical, numSamples = 120) {
  const { tFlight, v0x, v0y } = analytical;
  if (tFlight <= 0) return [];

  const points = [];
  const dt = tFlight / numSamples;

  for (let i = 0; i <= numSamples; i++) {
    const t = Math.min(i * dt, tFlight);
    const x = v0x * t;
    const y = Math.max(0, h0 + v0y * t - 0.5 * g * t * t);
    points.push({ x, y, t });
  }

  return points;
}
