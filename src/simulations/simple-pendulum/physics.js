/**
 * Simple Pendulum Physical Formulas and Symplectic Numerical Integrator
 */

/**
 * Calculates small-angle theoretical period T = 2π √(L / g)
 * @param {number} length - Cord length in meters
 * @param {number} gravity - Gravitational acceleration in m/s^2
 * @returns {number} Period in seconds
 */
export function calculateTheoreticalPeriod(length, gravity) {
  if (length <= 0 || gravity <= 0) return 0;
  return 2 * Math.PI * Math.sqrt(length / gravity);
}

/**
 * Calculates theoretical frequency f = 1 / T
 * @param {number} length - Cord length in meters
 * @param {number} gravity - Gravitational acceleration in m/s^2
 * @returns {number} Frequency in Hz
 */
export function calculateTheoreticalFrequency(length, gravity) {
  const T = calculateTheoreticalPeriod(length, gravity);
  return T > 0 ? 1 / T : 0;
}

/**
 * Calculates non-linear period for arbitrary release angle θ₀ using Borda's series expansion:
 * T ≈ T₀ [ 1 + (1/16) θ₀² + (11/3072) θ₀⁴ ]
 * @param {number} length - Cord length in meters
 * @param {number} gravity - Gravitational acceleration in m/s^2
 * @param {number} angleRad - Initial release angle in radians
 * @returns {number} Corrected period in seconds
 */
export function calculateNonlinearPeriod(length, gravity, angleRad) {
  const T0 = calculateTheoreticalPeriod(length, gravity);
  const theta = Math.abs(angleRad);
  const correction = 1 + (1 / 16) * Math.pow(theta, 2) + (11 / 3072) * Math.pow(theta, 4);
  return T0 * correction;
}

/**
 * Calculates instantaneous Kinetic, Potential, and Total Mechanical Energy
 * Datum for potential energy is at the lowest equilibrium point (θ = 0).
 * @param {number} theta - Angular displacement in radians
 * @param {number} omega - Angular velocity in rad/s
 * @param {number} length - Cord length in meters
 * @param {number} mass - Bob mass in kg
 * @param {number} gravity - Gravitational acceleration in m/s^2
 * @returns {object} { Ek, Ep, Etot, vLinear, hRel } in SI units
 */
export function calculateEnergy(theta, omega, length, mass, gravity) {
  const vLinear = length * omega;
  const Ek = 0.5 * mass * vLinear * vLinear;
  const hRel = length * (1 - Math.cos(theta));
  const Ep = mass * gravity * hRel;
  const Etot = Ek + Ep;

  return {
    Ek,
    Ep,
    Etot,
    vLinear,
    hRel,
  };
}

/**
 * Performs symplectic Euler-Cromer integration step for the nonlinear pendulum ODE:
 *   θ'' = - (g / L) sin(θ) - γ ω
 * 
 * Euler-Cromer is area-preserving and conserves phase-space Hamiltonian volume,
 * guaranteeing zero artificial energy drift over indefinite integration.
 * 
 * @param {number} theta - Current angle (rad)
 * @param {number} omega - Current angular velocity (rad/s)
 * @param {number} length - Cord length (m)
 * @param {number} gravity - Gravity (m/s^2)
 * @param {number} damping - Damping coefficient γ (s^-1)
 * @param {number} dt - Time step (seconds)
 * @param {number} subSteps - Number of sub-steps for stability
 * @returns {object} { theta, omega } updated values
 */
export function stepEulerCromer(theta, omega, length, gravity, damping = 0, dt, subSteps = 8) {
  if (length <= 0) return { theta, omega };
  const subDt = dt / subSteps;

  let currentTheta = theta;
  let currentOmega = omega;

  for (let s = 0; s < subSteps; s++) {
    // Angular acceleration: alpha = - (g / L) * sin(theta) - damping * omega
    const alpha = -(gravity / length) * Math.sin(currentTheta) - damping * currentOmega;
    currentOmega += alpha * subDt;
    currentTheta += currentOmega * subDt;
  }

  return {
    theta: currentTheta,
    omega: currentOmega,
  };
}

/**
 * Calculates theoretical maximum speed at lowest equilibrium point (θ = 0)
 * from energy conservation: v_max = √(2 g L (1 - cos(θ₀)))
 * @param {number} length - Cord length in meters
 * @param {number} gravity - Gravity in m/s^2
 * @param {number} initialAngleRad - Initial release angle in radians
 * @returns {number} Maximum speed in m/s
 */
export function calculateMaxVelocity(length, gravity, initialAngleRad) {
  if (length <= 0 || gravity <= 0) return 0;
  return Math.sqrt(2 * gravity * length * (1 - Math.cos(initialAngleRad)));
}
