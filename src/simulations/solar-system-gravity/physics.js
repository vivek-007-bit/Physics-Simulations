import { G_CONSTANT, SUN_MASS, AU_METERS, DAY_SECONDS, SOLAR_SYSTEM_DATA } from './constants.js';

/**
 * Initializes physical bodies in SI units (meters, kg, m/s).
 * Positions and velocities are placed on valid Keplerian elliptical orbits around the Sun.
 */
export function initializeSolarSystem(
  gravityMultiplier = 1.0,
  velocityMultiplier = 1.0,
  options = {}
) {
  const G = G_CONSTANT * gravityMultiplier;
  const sunData = SOLAR_SYSTEM_DATA.sun;

  const {
    isolatePlanetId = null, // for two-body experiment
    allowSunMotion = false, // Sun moves around barycenter
    customBodies = [], // user-defined hypothetical bodies
    planetOverrides = {}, // { earth: { massMult: 2, velMult: 1.2 } }
  } = options;

  // Sun
  const sunBody = {
    ...sunData,
    isSun: true,
    baseMass: sunData.mass,
    mass: sunData.mass,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 0,
    trail: [],
    allowMotion: allowSunMotion,
  };

  // Filter planets if isolating a specific planet (e.g. Two-Body experiment)
  let planetsData = SOLAR_SYSTEM_DATA.planets;
  if (isolatePlanetId) {
    planetsData = planetsData.filter((p) => p.id === isolatePlanetId);
  }

  const planetBodies = planetsData.map((planet) => {
    const override = planetOverrides[planet.id] || {};
    const massMult = override.massMultiplier !== undefined ? override.massMultiplier : 1.0;
    const velMult = (override.velocityMultiplier !== undefined ? override.velocityMultiplier : 1.0) * velocityMultiplier;

    const mass = planet.mass * massMult;
    const aMeters = planet.semiMajorAxisAU * AU_METERS;
    const e = planet.eccentricity;

    // Perihelion distance: r_p = a * (1 - e)
    const rPerihelion = aMeters * (1 - e);

    // Initial orientation angle (radians)
    const theta = (planet.initialAngleDeg * Math.PI) / 180;

    // Position at perihelion rotated by theta
    const x = rPerihelion * Math.cos(theta);
    const y = rPerihelion * Math.sin(theta);

    // Vis-Viva velocity at perihelion: v_p = sqrt( G * M_sun * (1 + e) / (a * (1 - e)) )
    const baseSpeed = Math.sqrt((G * SUN_MASS * (1 + e)) / (aMeters * (1 - e)));
    const speed = baseSpeed * velMult;

    // Velocity vector perpendicular to position vector (counter-clockwise orbit)
    const vx = -speed * Math.sin(theta);
    const vy = speed * Math.cos(theta);

    return {
      ...planet,
      isSun: false,
      isCustom: false,
      baseMass: planet.mass,
      massMultiplier: massMult,
      velocityMultiplier: velMult,
      baseSpeed,
      mass,
      aMeters,
      x,
      y,
      vx,
      vy,
      ax: 0,
      ay: 0,
      trail: [],
      allowMotion: true,
    };
  });

  // If two-body mode with moving Sun, set initial Sun velocity to balance momentum
  if (allowSunMotion && planetBodies.length === 1) {
    const p = planetBodies[0];
    sunBody.vx = -(p.mass * p.vx) / sunBody.mass;
    sunBody.vy = -(p.mass * p.vy) / sunBody.mass;
  }

  // Add custom bodies if any
  const customPlanetBodies = customBodies.map((cb) => {
    const distMeters = cb.distanceAU * AU_METERS;
    const theta = (cb.angleDeg * Math.PI) / 180;
    const x = distMeters * Math.cos(theta);
    const y = distMeters * Math.sin(theta);

    const speedMs = cb.speedKmS * 1000;
    const sign = cb.isRetrograde ? 1 : -1;
    const vx = sign * speedMs * Math.sin(theta);
    const vy = -sign * speedMs * Math.cos(theta);

    return {
      id: cb.id,
      name: cb.name,
      mass: cb.mass,
      baseMass: cb.mass,
      massMultiplier: 1.0,
      velocityMultiplier: 1.0,
      radiusKm: cb.radiusKm || 5000,
      displayRadius: cb.displayRadius || 6,
      color: cb.color || '#ec4899',
      colorLight: cb.color || '#db2777',
      type: 'Hypothetical (Custom)',
      isSun: false,
      isCustom: true,
      aMeters: distMeters,
      x,
      y,
      vx,
      vy,
      ax: 0,
      ay: 0,
      trail: [],
      allowMotion: true,
    };
  });

  const allBodies = [sunBody, ...planetBodies, ...customPlanetBodies];

  // Compute initial accelerations
  computeAccelerations(allBodies, gravityMultiplier);

  return allBodies;
}

/**
 * Calculates gravitational acceleration on each body from all other bodies.
 * Uses Newton's law: a_i = sum_j (G * m_j * r_ij / |r_ij|^3)
 */
export function computeAccelerations(bodies, gravityMultiplier = 1.0) {
  const G = G_CONSTANT * gravityMultiplier;
  const n = bodies.length;

  // Reset accelerations
  for (let i = 0; i < n; i++) {
    bodies[i].ax = 0;
    bodies[i].ay = 0;
  }

  // Softening parameter to prevent singularity on close encounters
  const softeningSq = 1e12; // (1000 km)^2

  for (let i = 0; i < n; i++) {
    const bi = bodies[i];
    for (let j = i + 1; j < n; j++) {
      const bj = bodies[j];

      const dx = bj.x - bi.x;
      const dy = bj.y - bi.y;
      const distSq = dx * dx + dy * dy + softeningSq;
      const dist = Math.sqrt(distSq);
      const invDistCube = 1 / (distSq * dist);

      // Force magnitude / mass: a_i = G * m_j / r^2 in direction of r_ij
      const fOverMi = G * bj.mass * invDistCube;
      const fOverMj = G * bi.mass * invDistCube;

      bi.ax += dx * fOverMi;
      bi.ay += dy * fOverMi;

      // Newton's third law: equal and opposite force
      bj.ax -= dx * fOverMj;
      bj.ay -= dy * fOverMj;
    }
  }
}

/**
 * Velocity Verlet symplectic integration step.
 * Highly stable, time-reversible, and conserves orbital energy.
 */
export function stepVelocityVerlet(bodies, dt, gravityMultiplier = 1.0) {
  const n = bodies.length;

  // 1. Half-step velocity update & full-step position update
  for (let i = 0; i < n; i++) {
    const b = bodies[i];
    if (b.isSun && !b.allowMotion) continue;

    b.vx += 0.5 * b.ax * dt;
    b.vy += 0.5 * b.ay * dt;

    b.x += b.vx * dt;
    b.y += b.vy * dt;
  }

  // 2. Recompute accelerations with new positions
  computeAccelerations(bodies, gravityMultiplier);

  // 3. Second half-step velocity update
  for (let i = 0; i < n; i++) {
    const b = bodies[i];
    if (b.isSun && !b.allowMotion) continue;

    b.vx += 0.5 * b.ax * dt;
    b.vy += 0.5 * b.ay * dt;
  }
}

/**
 * Computes instantaneous analytical and physical metrics for a given planet,
 * including kinetic, potential, and total energy, velocity components,
 * angular momentum, and eccentricity.
 */
export function getPlanetDetailedMetrics(planet, allBodies, gravityMultiplier = 1.0, sunBody = null) {
  const G = G_CONSTANT * gravityMultiplier;
  const sun = sunBody || allBodies.find((b) => b.isSun) || { x: 0, y: 0, vx: 0, vy: 0, mass: SUN_MASS };

  // Position relative to Sun
  const dx = planet.x - sun.x;
  const dy = planet.y - sun.y;
  const distanceMeters = Math.sqrt(dx * dx + dy * dy);
  const distanceAU = distanceMeters / AU_METERS;
  const distanceKm = distanceMeters / 1000;

  // Velocity relative to Sun
  const vxRel = planet.vx - sun.vx;
  const vyRel = planet.vy - sun.vy;
  const speedMs = Math.sqrt(vxRel * vxRel + vyRel * vyRel);
  const speedKmS = speedMs / 1000;
  const vxKmS = vxRel / 1000;
  const vyKmS = vyRel / 1000;

  // Acceleration magnitude
  const accelMs2 = Math.sqrt(planet.ax * planet.ax + planet.ay * planet.ay);

  // Gravitational force from Sun (N)
  const solarForceNewtons = (G * sun.mass * planet.mass) / (distanceMeters * distanceMeters);

  // Kinetic Energy: K = 0.5 * m * v^2
  const kineticEnergyJoules = 0.5 * planet.mass * (speedMs * speedMs);

  // Gravitational Potential Energy: U = - sum_j (G * m * m_j / r_j)
  // Standard zero reference at infinity (U(inf) = 0)
  let potentialEnergyJoules = 0;
  for (const other of allBodies) {
    if (other === planet) continue;
    const ox = other.x - planet.x;
    const oy = other.y - planet.y;
    const oDist = Math.max(Math.sqrt(ox * ox + oy * oy), 1e6);
    potentialEnergyJoules -= (G * planet.mass * other.mass) / oDist;
  }

  // Total Mechanical Energy: E = K + U
  const totalEnergyJoules = kineticEnergyJoules + potentialEnergyJoules;

  // Specific Mechanical Energy: eps = E / m = v^2/2 - GM/r
  const specificEnergy = totalEnergyJoules / planet.mass;

  // Specific Angular Momentum: h = x*vy - y*vx
  const specificAngularMomentum = dx * vyRel - dy * vxRel;

  // Theoretical semi-major axis from vis-viva: 1/a = 2/r - v^2/(GM)
  const GM = G * sun.mass;
  const invA = 2 / distanceMeters - (speedMs * speedMs) / GM;
  const semiMajorAxisEstMeters = invA > 1e-18 ? 1 / invA : Infinity;
  const semiMajorAxisEstAU = semiMajorAxisEstMeters !== Infinity ? semiMajorAxisEstMeters / AU_METERS : Infinity;

  // Instantaneous orbital eccentricity: e = sqrt(1 + 2*eps*h^2 / (GM)^2)
  const eccTerm = 1 + (2 * specificEnergy * (specificAngularMomentum * specificAngularMomentum)) / (GM * GM);
  const eccentricity = eccTerm > 0 ? Math.sqrt(eccTerm) : 0;

  // Ideal circular speed at current distance: v_c = sqrt(GM / r)
  const circularSpeedKmS = Math.sqrt(GM / distanceMeters) / 1000;

  // Escape velocity at current distance: v_esc = sqrt(2 * GM / r)
  const escapeVelocityKmS = circularSpeedKmS * Math.SQRT2;

  // Keplerian period: T = 2 * pi * sqrt(a^3 / GM)
  let theoreticalPeriodDays = 0;
  if (semiMajorAxisEstMeters > 0 && semiMajorAxisEstMeters !== Infinity) {
    const theoreticalPeriodSec = 2 * Math.PI * Math.sqrt(Math.pow(semiMajorAxisEstMeters, 3) / GM);
    theoreticalPeriodDays = theoreticalPeriodSec / DAY_SECONDS;
  } else {
    theoreticalPeriodDays = Infinity;
  }

  return {
    distanceAU,
    distanceKm,
    distanceMeters,
    speedKmS,
    vxKmS,
    vyKmS,
    accelMs2,
    solarForceNewtons,
    kineticEnergyJoules,
    potentialEnergyJoules,
    totalEnergyJoules,
    specificEnergy,
    specificAngularMomentum,
    eccentricity,
    semiMajorAxisEstAU,
    circularSpeedKmS,
    escapeVelocityKmS,
    theoreticalPeriodDays,
    theoreticalPeriodYears: theoreticalPeriodDays !== Infinity ? theoreticalPeriodDays / 365.256 : Infinity,
  };
}

/**
 * Backward-compatible real-time metrics helper.
 */
export function getPlanetRealTimeMetrics(planet, sun, gravityMultiplier = 1.0) {
  const allBodies = [sun, planet];
  return getPlanetDetailedMetrics(planet, allBodies, gravityMultiplier, sun);
}

/**
 * Computes mutual gravitational interaction between any two selected bodies.
 */
export function computeMutualGravitationalForce(bodyA, bodyB, gravityMultiplier = 1.0) {
  const G = G_CONSTANT * gravityMultiplier;
  const dx = bodyB.x - bodyA.x;
  const dy = bodyB.y - bodyA.y;
  const distanceMeters = Math.max(Math.sqrt(dx * dx + dy * dy), 1000);
  const distanceAU = distanceMeters / AU_METERS;
  const distanceKm = distanceMeters / 1000;

  // Force magnitude: F = G * m1 * m2 / r^2
  const forceNewtons = (G * bodyA.mass * bodyB.mass) / (distanceMeters * distanceMeters);

  // Accelerations: a = F / m
  const accelAMs2 = forceNewtons / bodyA.mass;
  const accelBMs2 = forceNewtons / bodyB.mass;

  // Unit vector from A to B
  const unitX = dx / distanceMeters;
  const unitY = dy / distanceMeters;

  return {
    distanceMeters,
    distanceKm,
    distanceAU,
    forceNewtons,
    accelAMs2,
    accelBMs2,
    unitX,
    unitY,
  };
}
