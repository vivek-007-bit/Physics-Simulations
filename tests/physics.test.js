import { calculateAnalyticalTrajectory, calculateInstantaneousState } from '../src/simulations/projectile-motion/physics.js';

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
// Theoretical range: v0^2 * sin(90) / g = 2500 / 9.81 = 254.84 m
assert(Math.abs(t1.range - 254.842) < 0.1, `Flat ground 45° range is ${t1.range.toFixed(2)}m (expected ~254.84m)`);
// Theoretical max height: (v0 * sin(45))^2 / (2*g) = 1250 / 19.62 = 63.71 m
assert(Math.abs(t1.yMax - 63.71) < 0.1, `Flat ground max height is ${t1.yMax.toFixed(2)}m (expected ~63.71m)`);
// Theoretical impact velocity equals initial velocity: 50 m/s
assert(Math.abs(t1.vImpact - 50) < 0.01, `Ground impact velocity is ${t1.vImpact.toFixed(2)}m/s (expected 50m/s)`);

// Test 2: Elevated launch (cliff) h0 = 40m, v0 = 30 m/s, angle = 30 deg, g = 9.81
const t2 = calculateAnalyticalTrajectory({ v0: 30, angle: 30, g: 9.81, h0: 40 });
// v0y = 15 m/s, v0x = 30 * cos(30) = 25.98 m/s
// Flight time via quadratic: y(t) = 40 + 15t - 0.5*9.81*t^2 = 0
// tFlight = (15 + sqrt(225 + 2 * 9.81 * 40)) / 9.81 = (15 + sqrt(225 + 784.8)) / 9.81 = (15 + 31.777) / 9.81 = 4.768 s
assert(Math.abs(t2.tFlight - 4.768) < 0.05, `Cliff launch flight time is ${t2.tFlight.toFixed(2)}s (expected ~4.77s)`);
// Impact velocity by energy conservation: sqrt(v0^2 + 2*g*h0) = sqrt(900 + 784.8) = sqrt(1684.8) = 41.046 m/s
assert(Math.abs(t2.vImpact - 41.046) < 0.05, `Cliff impact velocity is ${t2.vImpact.toFixed(2)}m/s (expected ~41.05m/s)`);

// Test 3: Horizontal launch angle = 0, h0 = 50m, v0 = 40 m/s, g = 9.81
const t3 = calculateAnalyticalTrajectory({ v0: 40, angle: 0, g: 9.81, h0: 50 });
// tFlight = sqrt(2 * 50 / 9.81) = 3.193 s
assert(Math.abs(t3.tFlight - 3.193) < 0.05, `Horizontal launch flight time is ${t3.tFlight.toFixed(2)}s (expected ~3.19s)`);
assert(Math.abs(t3.yMax - 50) < 0.001, `Horizontal launch max height equals initial height h0 = 50m`);

// Test 4: Instantaneous state at apex
const stateApex = calculateInstantaneousState(t1.tApex, { v0: 50, angle: 45, g: 9.81, h0: 0 }, t1);
assert(Math.abs(stateApex.vy) < 0.001, `Vertical velocity at apex is zero (got ${stateApex.vy.toFixed(4)})`);
assert(Math.abs(stateApex.y - t1.yMax) < 0.001, `Instantaneous height at tApex matches yMax (${stateApex.y.toFixed(2)}m)`);

console.log('--- ALL PHYSICS TESTS PASSED! ---');
