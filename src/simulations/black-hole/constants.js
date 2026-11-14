/**
 * Fundamental Physical and Relativistic Constants (SI Units)
 */
export const G_CONSTANT = 6.67430e-11;          // m^3 kg^-1 s^-2
export const SPEED_OF_LIGHT = 2.99792458e8;     // m s^-1
export const SOLAR_MASS_KG = 1.98847e30;        // kg
export const ASTRONOMICAL_UNIT_M = 1.495978707e11; // meters

/**
 * Standard Astrophysical Black Hole Presets
 */
export const BLACK_HOLE_PRESETS = [
  {
    id: 'stellar_standard',
    name: 'Stellar Black Hole (10 M☉)',
    category: 'Stellar-Mass',
    massSolar: 10,
    description: 'Direct core-collapse remnant of a massive star (O/B type) that went supernova.',
    realObject: 'Typical Milky Way stellar-mass remnant',
  },
  {
    id: 'stellar_cygnus',
    name: 'Cygnus X-1 (14.8 M☉)',
    category: 'Stellar-Mass',
    massSolar: 14.8,
    description: 'The first widely accepted stellar-mass black hole candidate, in a high-mass X-ray binary.',
    realObject: 'Cygnus X-1 (Cyg X-1)',
  },
  {
    id: 'stellar_ligo',
    name: 'GW150914 Remnant (62 M☉)',
    category: 'Stellar-Mass',
    massSolar: 62.0,
    description: 'Final merged black hole produced by the historic first gravitational wave detection in 2015.',
    realObject: 'GW150914 Coalescence Remnant',
  },
  {
    id: 'intermediate_1k',
    name: 'Intermediate Black Hole (1,000 M☉)',
    category: 'Intermediate-Mass (IMBH)',
    massSolar: 1000,
    description: 'Hypothesized intermediate-mass black hole, likely located in globular cluster cores.',
    realObject: 'Globular Cluster Candidate',
  },
  {
    id: 'supermassive_sgra',
    name: 'Sagittarius A* (4.15 × 10⁶ M☉)',
    category: 'Supermassive (SMBH)',
    massSolar: 4.15e6,
    description: 'The supermassive black hole at the dynamical center of our Milky Way Galaxy, imaged by the EHT.',
    realObject: 'Galactic Center (Sgr A*)',
  },
  {
    id: 'supermassive_m87',
    name: 'M87* (6.5 × 10⁹ M☉)',
    category: 'Supermassive (SMBH)',
    massSolar: 6.5e9,
    description: 'The giant supermassive black hole in the Messier 87 galaxy, first ever directly imaged in 2019.',
    realObject: 'M87 Core (EHT Target)',
  },
];

/**
 * Predefined Educational Experiments / Scenarios
 */
export const EXPERIMENT_SCENARIOS = [
  {
    id: 'event_horizon_crossing',
    title: 'Crossing the Event Horizon',
    subtitle: 'Coordinate Time Freezing vs Finite Proper Time',
    tab: 'simulation',
    description: 'Observe a probe falling into the black hole. From a distant observer perspective, time dilation makes the probe freeze asymptotically at r = r_s and redshift into invisibility. Yet the falling probe crosses in finite proper time.',
    settings: {
      massPreset: 'stellar_standard',
      customMass: 10,
      showPhotonSphere: true,
      showAccretionDisk: true,
      showLensing: true,
      observerDistanceRs: 1.05,
    },
  },
  {
    id: 'light_bending',
    title: 'Bending of Light & Gravitational Lensing',
    subtitle: 'Geodesic Deflection, Photon Sphere & Shadow Boundary',
    tab: 'lensing',
    description: 'Fire photon rays at various impact parameters. See weak deflection at large distances, multi-orbit looping near the critical parameter b_crit = 2.598 r_s, and photon capture inside the horizon.',
    settings: {
      massPreset: 'stellar_standard',
      customMass: 10,
      impactParameter: 3.2,
      rayCount: 9,
    },
  },
  {
    id: 'time_dilation',
    title: 'Gravitational Time Dilation Near Horizon',
    subtitle: 'Dual Clocks, Extreme Redshift & Infinite Hovering Force',
    tab: 'time-dilation',
    description: 'Compare the ticking rate of a stationary hovering clock against coordinate time at infinity. Observe time freezing and astronomical redshift as r approaches r_s.',
    settings: {
      massPreset: 'stellar_standard',
      customMass: 10,
      observerDistanceRs: 1.25,
    },
  },
  {
    id: 'changing_mass',
    title: 'Mass Scaling & Tidal Spaghettification',
    subtitle: 'Stellar vs Supermassive Black Holes',
    tab: 'time-dilation',
    description: 'Compare a 10 M☉ stellar black hole against Sagittarius A* (4.15M M☉). Stellar black holes rip a human apart with tidal forces far outside r_s, whereas supermassive horizons have survivable tidal forces at r_s.',
    settings: {
      massPreset: 'supermassive_sgra',
      customMass: 4.15e6,
      observerDistanceRs: 1.5,
    },
  },
  {
    id: 'spacetime_curvature',
    title: '3D Spacetime Curvature & Embedding',
    subtitle: "Flamm's Paraboloid Spatial Curvature Funnel",
    tab: 'spacetime-mesh',
    description: "Rotate and zoom an interactive 3D spatial curvature mesh based on Flamm's paraboloid z(r) = -2√(r_s(r - r_s)). Contrast curved general relativity against flat Minkowski spacetime.",
    settings: {
      massPreset: 'stellar_standard',
      customMass: 10,
      meshDensity: 24,
      showFlatComparison: true,
    },
  },
  {
    id: 'photon_sphere',
    title: 'The Photon Sphere (r = 1.5 r_s)',
    subtitle: 'Unstable Circular Orbit for Photons at 3GM/c²',
    tab: 'simulation',
    description: 'Explore the relativistic photon sphere at r = 3GM/c² (1.5 r_s). Light emitted tangentially here can theoretically circle the black hole indefinitely, forming an unstable boundary.',
    settings: {
      massPreset: 'stellar_standard',
      customMass: 10,
      showPhotonSphere: true,
      showAccretionDisk: true,
      showLensing: true,
    },
  },
];
