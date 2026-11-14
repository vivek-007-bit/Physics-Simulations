/**
 * Physical and Astronomical Constants for the Solar System Simulation.
 * All units are standard SI (meters, kilograms, seconds) unless noted otherwise.
 */

export const G_CONSTANT = 6.67430e-11; // Gravitational constant (m^3 kg^-1 s^-2)
export const SUN_MASS = 1.98847e30; // Mass of the Sun (kg)
export const AU_METERS = 1.495978707e11; // 1 Astronomical Unit in meters
export const DAY_SECONDS = 86400; // 1 Day in seconds
export const YEAR_SECONDS = 365.256 * DAY_SECONDS; // 1 Sidereal Year in seconds

/**
 * Scientifically verified orbital parameters and physical dimensions
 * of the Sun and the eight major planets.
 */
export const SOLAR_SYSTEM_DATA = {
  sun: {
    id: 'sun',
    name: 'Sun',
    mass: SUN_MASS,
    radiusKm: 696340,
    color: '#f59e0b',
    colorLight: '#d97706',
    displayRadius: 16,
  },
  planets: [
    {
      id: 'mercury',
      name: 'Mercury',
      mass: 3.3011e23, // kg
      semiMajorAxisAU: 0.387098, // AU
      eccentricity: 0.20563,
      orbitalPeriodYears: 0.240846, // ~87.97 days
      meanVelocityKmS: 47.36, // km/s
      radiusKm: 2439.7,
      color: '#64748b',
      colorLight: '#475569',
      displayRadius: 4,
      initialAngleDeg: 45,
      type: 'Terrestrial (Inner)',
    },
    {
      id: 'venus',
      name: 'Venus',
      mass: 4.8675e24,
      semiMajorAxisAU: 0.723332,
      eccentricity: 0.00677,
      orbitalPeriodYears: 0.615197, // ~224.7 days
      meanVelocityKmS: 35.02,
      radiusKm: 6051.8,
      color: '#eab308',
      colorLight: '#b45309',
      displayRadius: 5.5,
      initialAngleDeg: 120,
      type: 'Terrestrial (Inner)',
    },
    {
      id: 'earth',
      name: 'Earth',
      mass: 5.9724e24,
      semiMajorAxisAU: 1.000000,
      eccentricity: 0.01671,
      orbitalPeriodYears: 1.000000, // 365.25 days
      meanVelocityKmS: 29.78,
      radiusKm: 6371.0,
      color: '#0284c7',
      colorLight: '#0369a1',
      displayRadius: 6,
      initialAngleDeg: 210,
      type: 'Terrestrial (Inner)',
    },
    {
      id: 'mars',
      name: 'Mars',
      mass: 6.4171e23,
      semiMajorAxisAU: 1.523679,
      eccentricity: 0.09341,
      orbitalPeriodYears: 1.880816, // ~687 days
      meanVelocityKmS: 24.07,
      radiusKm: 3389.5,
      color: '#ef4444',
      colorLight: '#dc2626',
      displayRadius: 4.8,
      initialAngleDeg: 315,
      type: 'Terrestrial (Inner)',
    },
    {
      id: 'jupiter',
      name: 'Jupiter',
      mass: 1.8982e27,
      semiMajorAxisAU: 5.204400,
      eccentricity: 0.04849,
      orbitalPeriodYears: 11.8626, // ~4332.6 days
      meanVelocityKmS: 13.07,
      radiusKm: 69911,
      color: '#d97706',
      colorLight: '#92400e',
      displayRadius: 10,
      initialAngleDeg: 75,
      type: 'Gas Giant (Outer)',
    },
    {
      id: 'saturn',
      name: 'Saturn',
      mass: 5.6834e26,
      semiMajorAxisAU: 9.582600,
      eccentricity: 0.05551,
      orbitalPeriodYears: 29.4571, // ~10759 days
      meanVelocityKmS: 9.69,
      radiusKm: 58232,
      color: '#ca8a04',
      colorLight: '#854d0e',
      displayRadius: 8.5,
      hasRings: true,
      initialAngleDeg: 190,
      type: 'Gas Giant (Outer)',
    },
    {
      id: 'uranus',
      name: 'Uranus',
      mass: 8.6810e25,
      semiMajorAxisAU: 19.21840,
      eccentricity: 0.04630,
      orbitalPeriodYears: 84.011, // ~30685 days
      meanVelocityKmS: 6.81,
      radiusKm: 25362,
      color: '#06b6d4',
      colorLight: '#0e7490',
      displayRadius: 7,
      initialAngleDeg: 280,
      type: 'Ice Giant (Outer)',
    },
    {
      id: 'neptune',
      name: 'Neptune',
      mass: 1.0241e26,
      semiMajorAxisAU: 30.07000,
      eccentricity: 0.00946,
      orbitalPeriodYears: 164.79, // ~60189 days
      meanVelocityKmS: 5.43,
      radiusKm: 24622,
      color: '#2563eb',
      colorLight: '#1d4ed8',
      displayRadius: 7,
      initialAngleDeg: 350,
      type: 'Ice Giant (Outer)',
    },
  ],
};
