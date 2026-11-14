import { calculateAnalyticalTrajectory, calculateInstantaneousState } from '../src/simulations/projectile-motion/physics.js';
import {
  initializeSolarSystem,
  stepVelocityVerlet,
  getPlanetRealTimeMetrics,
  getPlanetDetailedMetrics,
  computeMutualGravitationalForce,
} from '../src/simulations/solar-system-gravity/physics.js';
import { AU_METERS, DAY_SECONDS, G_CONSTANT, SUN_MASS } from '../src/simulations/solar-system-gravity/constants.js';
import {
  mapPhysicalToVisual,
  getVisualRadius,
  getReferenceRings,
} from '../src/simulations/solar-system-gravity/scaleUtils.js';
import {
  calculateSchwarzschildRadius,
  calculatePhotonSphereRadius,
  calculateIscoRadius,
  calculateCriticalImpactParameter,
  calculateTimeDilation,
  calculateGravitationalRedshift,
  calculateHoveringAcceleration,
  calculateTidalAcceleration,
  calculateFreeFallProperTime,
  flammParaboloidHeight,
  calculateWeakFieldDeflection,
  traceRelativisticPhotonGeodesic,
} from '../src/simulations/black-hole/physics.js';
import { SOLAR_MASS_KG } from '../src/simulations/black-hole/constants.js';
import {
  calculateTheoreticalPeriod,
  calculateTheoreticalFrequency,
  calculateNonlinearPeriod,
  calculateEnergy,
  stepEulerCromer,
  calculateMaxVelocity,
} from '../src/simulations/simple-pendulum/physics.js';

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASSED: ${message}`);
}

console.log('--- Testing Projectile Motion Physics ---');

// Test 1: Ground launch at 45 deg, v0 = 50 m/s, g = 9.81
const t1 = calculateAnalyticalTrajectory({ v0: 50, angle: 45, g: 9.81, h0: 0 });
assert(Math.abs(t1.range - 254.842) < 0.1, `Flat ground 45° range is ${t1.range.toFixed(2)}m (expected ~254.84m)`);
assert(Math.abs(t1.yMax - 63.71) < 0.1, `Flat ground max height is ${t1.yMax.toFixed(2)}m (expected ~63.71m)`);
assert(Math.abs(t1.vImpact - 50) < 0.01, `Ground impact velocity is ${t1.vImpact.toFixed(2)}m/s (expected 50m/s)`);

// Test 2: Elevated launch (cliff) h0 = 40m, v0 = 30 m/s, angle = 30 deg, g = 9.81
const t2 = calculateAnalyticalTrajectory({ v0: 30, angle: 30, g: 9.81, h0: 40 });
assert(Math.abs(t2.tFlight - 4.768) < 0.05, `Cliff launch flight time is ${t2.tFlight.toFixed(2)}s (expected ~4.77s)`);
assert(Math.abs(t2.vImpact - 41.046) < 0.05, `Cliff impact velocity is ${t2.vImpact.toFixed(2)}m/s (expected ~41.05m/s)`);

// Test 3: Horizontal launch angle = 0, h0 = 50m, v0 = 40 m/s, g = 9.81
const t3 = calculateAnalyticalTrajectory({ v0: 40, angle: 0, g: 9.81, h0: 50 });
assert(Math.abs(t3.tFlight - 3.193) < 0.05, `Horizontal launch flight time is ${t3.tFlight.toFixed(2)}s (expected ~3.19s)`);
assert(Math.abs(t3.yMax - 50) < 0.001, `Horizontal launch max height equals initial height h0 = 50m`);

// Test 4: Instantaneous state at apex
const stateApex = calculateInstantaneousState(t1.tApex, { v0: 50, angle: 45, g: 9.81, h0: 0 }, t1);
assert(Math.abs(stateApex.vy) < 0.001, `Vertical velocity at apex is zero (got ${stateApex.vy.toFixed(4)})`);
assert(Math.abs(stateApex.y - t1.yMax) < 0.001, `Instantaneous height at tApex matches yMax (${stateApex.y.toFixed(2)}m)`);

console.log('\n--- Testing Solar System Planetary Mechanics & Gravitation ---');

// Test 5: Solar System initialization contains Sun + 8 planets
const bodies = initializeSolarSystem(1.0, 1.0);
assert(bodies.length === 9, `Solar system initializes exactly 9 celestial bodies (Sun + 8 planets, got ${bodies.length})`);
assert(bodies[0].isSun === true && bodies[0].name === 'Sun', 'Body 0 is the central Sun');

// Test 6: Earth orbital velocity & Kepler's 3rd Law period
const sun = bodies[0];
const earth = bodies.find((b) => b.id === 'earth');
const earthMetrics = getPlanetDetailedMetrics(earth, bodies, 1.0, sun);

assert(
  Math.abs(earthMetrics.theoreticalPeriodDays - 365.25) < 1.0,
  `Earth theoretical orbital period matches 365.25 days (got ${earthMetrics.theoreticalPeriodDays.toFixed(2)} days)`
);

assert(
  Math.abs(earthMetrics.speedKmS - 29.78) < 1.0,
  `Earth orbital speed is ~29.78 km/s (got ${earthMetrics.speedKmS.toFixed(2)} km/s)`
);

// Test 7: Kinetic, Potential, and Bound Total Mechanical Energy
assert(earthMetrics.kineticEnergyJoules > 0, `Earth kinetic energy is positive (got ${earthMetrics.kineticEnergyJoules.toExponential(2)} J)`);
assert(earthMetrics.potentialEnergyJoules < 0, `Earth potential energy is negative (got ${earthMetrics.potentialEnergyJoules.toExponential(2)} J)`);
assert(earthMetrics.totalEnergyJoules < 0, `Earth total mechanical energy is negative (bound state, got ${earthMetrics.totalEnergyJoules.toExponential(2)} J)`);
assert(
  Math.abs(earthMetrics.kineticEnergyJoules * 2 + earthMetrics.potentialEnergyJoules) / Math.abs(earthMetrics.potentialEnergyJoules) < 0.05,
  'Virial Theorem holds for circular orbit: 2K + U ~ 0'
);

// Test 8: Mutual Gravitational Force Calculation
const forceSunEarth = computeMutualGravitationalForce(sun, earth, 1.0);
assert(
  Math.abs(forceSunEarth.forceNewtons - 3.54e22) / 3.54e22 < 0.05,
  `Mutual Sun-Earth gravitational force is ~3.54e22 N (got ${forceSunEarth.forceNewtons.toExponential(3)} N)`
);
assert(
  forceSunEarth.accelBMs2 > forceSunEarth.accelAMs2 * 1e5,
  'Earth acceleration is orders of magnitude larger than Sun acceleration under equal mutual force'
);

// Test 9: Escape velocity relationship v_esc = sqrt(2) * v_circ
assert(
  Math.abs(earthMetrics.escapeVelocityKmS / earthMetrics.circularSpeedKmS - Math.SQRT2) < 0.0001,
  `Escape velocity is exactly sqrt(2) * circular speed (got ratio ${(earthMetrics.escapeVelocityKmS / earthMetrics.circularSpeedKmS).toFixed(5)})`
);

// Test 10: Neptune distance and orbital period
const neptune = bodies.find((b) => b.id === 'neptune');
const neptuneMetrics = getPlanetDetailedMetrics(neptune, bodies, 1.0, sun);
assert(
  Math.abs(neptuneMetrics.distanceAU - 30.07) < 0.5,
  `Neptune orbital radius is ~30.07 AU (got ${neptuneMetrics.distanceAU.toFixed(2)} AU)`
);
const neptunePeriodYears = neptuneMetrics.theoreticalPeriodDays / 365.25;
assert(
  Math.abs(neptunePeriodYears - 164.8) < 1.0,
  `Neptune orbital period is ~164.8 Earth years (got ${neptunePeriodYears.toFixed(2)} yr)`
);

// Test 11: Hypothetical Custom Body Injection & Integration
const customBodiesInit = [
  {
    id: 'planet_nine',
    name: 'Planet Nine',
    mass: 3.0e25,
    distanceAU: 20.0,
    speedKmS: 6.6,
    angleDeg: 90,
    isRetrograde: false,
  },
];
const bodiesWithCustom = initializeSolarSystem(1.0, 1.0, { customBodies: customBodiesInit });
assert(bodiesWithCustom.length === 10, 'Solar system with custom body has 10 celestial bodies');
const p9 = bodiesWithCustom.find((b) => b.id === 'planet_nine');
assert(p9 && p9.isCustom === true, 'Custom body is successfully created and flagged');

// Test 12: Velocity Verlet numerical integration step stability over 30 simulation days
const initialDistAU = earthMetrics.distanceAU;
const subDt = 0.15 * DAY_SECONDS;
const totalSteps = (30 * DAY_SECONDS) / subDt;

for (let i = 0; i < totalSteps; i++) {
  stepVelocityVerlet(bodies, subDt, 1.0);
}

const postSimMetrics = getPlanetDetailedMetrics(earth, bodies, 1.0, sun);
assert(
  Math.abs(postSimMetrics.distanceAU - initialDistAU) < 0.05,
  `Earth orbit remains stable over 30 days of numerical integration (drift < 0.05 AU, got ${postSimMetrics.distanceAU.toFixed(3)} AU)`
);

// Test 13: 3D Visual Scaling & Perceptual Coordinate Mapping
const originVis = mapPhysicalToVisual(0, 0, 'full');
assert(originVis.x === 0 && originVis.z === 0 && originVis.rVis === 0, 'Origin physical position maps to 3D origin (0, 0, 0)');

const earthPhysicalX = 1.0 * AU_METERS;
const earthVisFull = mapPhysicalToVisual(earthPhysicalX, 0, 'full');
assert(
  Math.abs(earthVisFull.rVis - 14.0) < 0.01,
  `Earth (1 AU) maps to base visual radius 14.0 in full scale mode (got ${earthVisFull.rVis.toFixed(2)})`
);
assert(
  Math.abs(earthVisFull.x - 14.0) < 0.01 && Math.abs(earthVisFull.z) < 1e-10,
  'Earth along physical +X maps to visual +X coordinate'
);

const earthVisInner = mapPhysicalToVisual(earthPhysicalX, 0, 'inner');
assert(
  Math.abs(earthVisInner.rVis - 26.0) < 0.01,
  `Earth (1 AU) maps to linear 26.0 in inner scale mode (got ${earthVisInner.rVis.toFixed(2)})`
);

const neptunePhysicalX = 30.07 * AU_METERS;
const neptuneVisFull = mapPhysicalToVisual(neptunePhysicalX, 0, 'full');
assert(
  neptuneVisFull.rVis > earthVisFull.rVis && neptuneVisFull.rVis < 120.0,
  `Neptune (30 AU) power-law scales smoothly into navigable scene radius (got ${neptuneVisFull.rVis.toFixed(2)})`
);

// Test 14: Planetary Radius Hierarchy Scaling
const rMercury = getVisualRadius({ id: 'mercury', radiusKm: 2439.7 });
const rEarth = getVisualRadius({ id: 'earth', radiusKm: 6371.0 });
const rJupiter = getVisualRadius({ id: 'jupiter', radiusKm: 69911 });
const rSaturn = getVisualRadius({ id: 'saturn', radiusKm: 58232 });

assert(rJupiter > rSaturn && rSaturn > rEarth && rEarth > rMercury, 'Visual radii maintain physical size hierarchy: Jupiter > Saturn > Earth > Mercury');
assert(rJupiter > 2.0 * rEarth, 'Gas giant Jupiter is more than 2x larger visually than terrestrial Earth');

const refRingsFull = getReferenceRings('full');
assert(refRingsFull.length >= 6, 'Full mode reference rings include all outer milestones');
assert(refRingsFull.some((r) => r.rAU === 1.0), 'Reference rings include 1.0 AU milestone');

console.log('\n--- Testing General Relativity & Black Hole Physics ---');

// Test 13: 1 Solar Mass Schwarzschild Radius r_s = 2GM / c^2 ≈ 2953.4 m
const rs1Solar = calculateSchwarzschildRadius(SOLAR_MASS_KG);
assert(Math.abs(rs1Solar - 2953.4) < 1.0, `1 M☉ Schwarzschild radius is ~2953.4m (got ${rs1Solar.toFixed(1)}m)`);

// Test 14: Sagittarius A* (4.15 × 10^6 M☉) Schwarzschild Radius
const rsSgrA = calculateSchwarzschildRadius(4.15e6 * SOLAR_MASS_KG);
const rsSgrAKm = rsSgrA / 1000;
assert(Math.abs(rsSgrAKm - 1.226e7) < 0.05e7, `Sgr A* Schwarzschild radius is ~1.23 × 10^7 km (got ${rsSgrAKm.toExponential(3)} km)`);

// Test 15: Photon Sphere Radius r_ph = 1.5 * r_s = 3GM / c^2
const rPh = calculatePhotonSphereRadius(10 * SOLAR_MASS_KG);
const rs10 = calculateSchwarzschildRadius(10 * SOLAR_MASS_KG);
assert(Math.abs(rPh - 1.5 * rs10) < 0.001, `Photon sphere is exactly 1.5 * r_s (${rPh.toFixed(1)}m vs 1.5 * ${rs10.toFixed(1)}m)`);

// Test 16: ISCO (Innermost Stable Circular Orbit) r_isco = 3.0 * r_s = 6GM / c^2
const rIsco = calculateIscoRadius(10 * SOLAR_MASS_KG);
assert(Math.abs(rIsco - 3.0 * rs10) < 0.001, `ISCO radius is exactly 3.0 * r_s (${rIsco.toFixed(1)}m)`);

// Test 17: Critical Impact Parameter for photon capture b_crit = (3√3 / 2) * r_s ≈ 2.598076 * r_s
const bCrit = calculateCriticalImpactParameter(rs10);
const expectedBCrit = ((3 * Math.sqrt(3)) / 2) * rs10;
assert(Math.abs(bCrit - expectedBCrit) < 0.01, `Critical impact parameter b_crit is exactly 3√3/2 * r_s (got ratio ${(bCrit / rs10).toFixed(6)})`);

// Test 18: Gravitational Time Dilation dτ / dt = sqrt(1 - r_s / r)
const tdAt2Rs = calculateTimeDilation(2 * rs10, rs10);
assert(Math.abs(tdAt2Rs - (1 / Math.SQRT2)) < 0.0001, `Time dilation at r = 2 r_s is 1/√2 ≈ 0.7071 (got ${tdAt2Rs.toFixed(5)})`);
const tdAtHorizon = calculateTimeDilation(rs10, rs10);
assert(tdAtHorizon === 0, 'Time dilation at the event horizon r = r_s drops to 0 (time freezes)');

// Test 19: Gravitational Redshift z = 1/sqrt(1 - r_s/r) - 1
const zAt1_25Rs = calculateGravitationalRedshift(1.25 * rs10, rs10);
assert(Math.abs(zAt1_25Rs - 1.236) < 0.01, `Redshift at r = 1.25 r_s is ~1.236 (got ${zAt1_25Rs.toFixed(3)})`);

// Test 20: Flamm's Paraboloid Embedding Height z(r) = -2 * sqrt(r_s * (r - r_s))
const zAtRs = flammParaboloidHeight(1.0, 1.0);
assert(Math.abs(zAtRs) < 0.001, `Flamm paraboloid height at horizon r = r_s is 0 (throat boundary)`);
const zAt2Rs = flammParaboloidHeight(2.0, 1.0);
assert(Math.abs(zAt2Rs - (-2.0)) < 0.001, `Flamm paraboloid height at r = 2 r_s is -2 r_s (got ${zAt2Rs.toFixed(3)})`);

// Test 21: Weak-Field Einstein Deflection Angle α = 4GM / (bc^2) = 2 r_s / b
const weakAlpha = calculateWeakFieldDeflection(100 * rs10, rs10);
assert(Math.abs(weakAlpha - 0.02) < 0.0001, `Weak field deflection at b = 100 r_s is 0.02 radians (got ${weakAlpha.toFixed(5)} rad)`);

// Test 22: Relativistic Geodesic Ray-Tracing (Capture vs Deflection)
const subCritRay = traceRelativisticPhotonGeodesic(2.0); // b = 2.0 < b_crit (2.598)
assert(subCritRay.captured === true, 'Photon with impact parameter b = 2.0 r_s is captured inside horizon');

const superCritRay = traceRelativisticPhotonGeodesic(4.0); // b = 4.0 > b_crit (2.598)
assert(superCritRay.captured === false, 'Photon with impact parameter b = 4.0 r_s escapes to infinity (deflected)');
assert(superCritRay.deflectionRad > 0, `Deflection angle is positive (got ${superCritRay.deflectionDeg.toFixed(2)}°)`);

console.log('\n--- Testing Simple Pendulum Harmonic & Nonlinear Physics ---');

// Test 23: Small-angle theoretical period T = 2π√(L/g)
const tPendulum1m = calculateTheoreticalPeriod(1.0, 9.81);
assert(Math.abs(tPendulum1m - 2.006) < 0.005, `1.0m pendulum theoretical period is ~2.006s (got ${tPendulum1m.toFixed(3)}s)`);

const tPendulum4m = calculateTheoreticalPeriod(4.0, 9.81);
assert(Math.abs(tPendulum4m - 4.012) < 0.005, `Quadrupling length to 4.0m doubles period to ~4.012s (got ${tPendulum4m.toFixed(3)}s)`);

// Test 24: Theoretical frequency f = 1/T
const fPendulum1m = calculateTheoreticalFrequency(1.0, 9.81);
assert(Math.abs(fPendulum1m - 0.4985) < 0.002, `Natural frequency is ~0.499 Hz (got ${fPendulum1m.toFixed(4)} Hz)`);

// Test 25: Nonlinear finite-angle period expansion
// Small angle θ = 5° (0.087 rad): correction is negligible (< 0.05%)
const tNonlinear5Deg = calculateNonlinearPeriod(1.0, 9.81, (5 * Math.PI) / 180);
assert(Math.abs(tNonlinear5Deg - tPendulum1m) / tPendulum1m < 0.0005, `At 5°, nonlinear period is within 0.05% of linear T0`);

// Large angle θ = 60° (π/3 rad): T ≈ T0 * (1 + 1/16 * (π/3)^2) ≈ 1.0685 * T0
const tNonlinear60Deg = calculateNonlinearPeriod(1.0, 9.81, (60 * Math.PI) / 180);
assert(tNonlinear60Deg > tPendulum1m * 1.06, `At 60°, nonlinear period is > 6% longer than small-angle T0 (got ${(tNonlinear60Deg / tPendulum1m).toFixed(3)}x)`);

// Test 26: Mechanical energy calculation
// At release apex: θ = 45°, ω = 0
const eApex = calculateEnergy((45 * Math.PI) / 180, 0, 2.0, 1.5, 9.81);
assert(eApex.Ek === 0, 'Kinetic energy at release apex is 0 J');
const expectedEp = 1.5 * 9.81 * (2.0 * (1 - Math.cos((45 * Math.PI) / 180)));
assert(Math.abs(eApex.Ep - expectedEp) < 0.001, `Potential energy matches m*g*h (${eApex.Ep.toFixed(2)} J vs ${expectedEp.toFixed(2)} J)`);
assert(Math.abs(eApex.Etot - expectedEp) < 0.001, 'Total mechanical energy equals potential energy at apex');

// Test 27: Maximum velocity at bottom equilibrium (θ = 0)
const vMax = calculateMaxVelocity(2.0, 9.81, (45 * Math.PI) / 180);
const expectedVMax = Math.sqrt(2 * 9.81 * 2.0 * (1 - Math.cos((45 * Math.PI) / 180)));
assert(Math.abs(vMax - expectedVMax) < 0.001, `Max speed at bottom matches √(2gL(1-cos(θ0))) (${vMax.toFixed(3)} m/s)`);

// Test 28: Symplectic Euler-Cromer integration stability and energy conservation
let simTheta = (30 * Math.PI) / 180;
let simOmega = 0;
const eInit = calculateEnergy(simTheta, simOmega, 2.0, 1.0, 9.81).Etot;

// Step through one complete full period oscillation with zero damping
const period = calculateTheoreticalPeriod(2.0, 9.81);
const stepDt = 0.01;
const stepsTotal = Math.round(period / stepDt);

for (let s = 0; s < stepsTotal; s++) {
  const next = stepEulerCromer(simTheta, simOmega, 2.0, 9.81, 0, stepDt, 8);
  simTheta = next.theta;
  simOmega = next.omega;
}

const eFinal = calculateEnergy(simTheta, simOmega, 2.0, 1.0, 9.81).Etot;
const energyDrift = Math.abs(eFinal - eInit) / eInit;
assert(energyDrift < 0.005, `Euler-Cromer integration conserves energy after full cycle (drift < 0.5%, got ${(energyDrift * 100).toFixed(3)}%)`);

console.log('--- ALL PHYSICS TESTS PASSED! ---');
