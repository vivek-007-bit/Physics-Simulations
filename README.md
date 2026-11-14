# Interactive Physics Simulation Laboratory

A modern, high-performance, browser-based physics simulation laboratory built with **React 18** and **Vite**.

## 1. Project Overview

The **Physics Simulation Laboratory** is an extensible educational technology platform that lets students, educators, and physics enthusiasts interact with real physical systems. Every simulation runs with true SI dimensional units, high-DPI Canvas rendering at 60 FPS, and instantaneous numerical calculations computed entirely on the client without any backend or external server requirements.

The laboratory includes:
- **Clean Educational Landing Directory**: Academic, minimal design displaying available simulation modules with category tabs, search filtering, and clean preview cards.
- **Slug-Based Independent Simulation Workspaces**: Dedicated simulation pages with coordinated parameters, high-DPI HTML5 canvas visualizers, live telemetry HUDs, and mathematical theory breakdowns.
- **Dual Theme System (Light Default & Dark Mode)**: Professional light theme as default for first-time visitors, with complete preservation of dark mode accessible via the navigation bar toggle and persisted in `localStorage`.
- **Zero Configuration Discovery**: Create a folder in `src/simulations/` with `metadata.js` and `index.jsx`, and it is immediately available across the whole application via Vite's `import.meta.glob()`.

---

## 2. Key Highlights & Technology Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Framework** | React 18 | Declarative component UI and reactive state management |
| **Bundler & Tooling** | Vite 6 | Lightning-fast HMR and ESM build pipeline |
| **Routing** | React Router v6 | Client-side slug-based routing (`/simulations/:slug`) |
| **Theme Management** | React Context + CSS Variables | Dual theme system with `localStorage` persistence (**default: Light Mode**) |
| **Visual Rendering** | HTML5 Canvas 2D | Sub-pixel, high-DPI coordinate transformed graphics with theme-aware palettes |
| **Timing Engine** | `requestAnimationFrame` | Jitter-free, 60 FPS delta-time physics integration |
| **Typography & Styling** | Modern Minimal CSS Architecture | Clean, academic educational platform aesthetic with restrained tokens |
| **Icons** | Custom Lightweight SVG | Zero external runtime dependencies |
| **Physics Calculations** | Pure SI Analytical & Numerical | Decoupled, testable mathematical engines |

---

## 3. Available Simulations

### 1. Solar System: Gravity and Planetary Motion
- **Slug**: `/simulations/solar-system-gravity`
- **Category**: Gravitation
- **Physics Concepts**: Newton's Law of Universal Gravitation ($F = G \frac{m_1 m_2}{r^2}$), orbital velocity ($v = \sqrt{G M / r}$), Kepler's third law ($T^2 \propto a^3$), orbital eccentricity, escape velocity, and symplectic Velocity Verlet numerical integration.
- **Features**:
  - **Full N-body Gravitational Physics**: Symplectic Velocity Verlet integration with adaptive sub-stepping for extreme orbital stability even at 730 days/second.
  - **Comprehensive Parameter Manipulation**:
    - Universal gravitational constant ($G$) multiplier (0.1× to 5.0×) with immediate physical response.
    - Individual planetary mass scaling (0.1× to 10×) and numerical input.
    - Individual planetary orbital velocity scaling with presets (50%, 75%, 100% circular, 125%, 150% escape).
  - **Interactive Predefined Experiments**:
    1. *Hyperbolic Escape Trajectory* ($v > \sqrt{2} v_c$).
    2. *Weak Gravity* ($0.35\times G$).
    3. *Strong Gravity* ($2.2\times G$).
    4. *Massive Earth Perturbation* ($500\times$ Earth mass).
    5. *Mars Velocity Reduction* (high eccentricity plunge).
    6. *Isolated Two-Body System* (Sun and Jupiter orbiting common barycenter).
    7. *Hypothetical Celestial Body Injection* (custom mass, distance, speed, angle, prograde/retrograde).
  - **Two-Body Mutual Force Visualizer**: Select any two celestial bodies to inspect mutual attraction, separation distance, acceleration ratios, and Newton's Third Law verification.
  - **Live Physics Graphs**: Time-series charts for orbital distance, orbital velocity, gravitational force, kinetic energy, gravitational potential energy, and total mechanical energy with energy conservation drift diagnostics.
  - **Advanced Visualization Controls**: Vector scaling slider, toggles for velocity ($\vec{v}$), acceleration ($\vec{a}$), gravitational force ($\vec{F}_g$), distance rays, gravity well rings, and coordinate grids.
  - **Camera Controls**: Free pan, mouse wheel zoom, view presets (Inner vs Full Solar System), and planet tracking mode (camera locks and follows selected planet).
  - **Live Telemetry & Orbital Mechanics Comparison**: Real-time comparison between ideal Keplerian two-body theory and simulated N-body quantities (virial theorem $2K + U \approx 0$, specific angular momentum, eccentricity, energy in Joules).

### 2. Projectile Motion
- **Slug**: `/simulations/projectile-motion`
- **Category**: Mechanics
- **Physics Concepts**: 2D kinematics, trajectory equations, gravitational acceleration, air resistance, launch angle, and muzzle velocity.
- **Features**: Real-time trajectory plotting, apex marker, range and time-of-flight metrics, angle presets, velocity vector visualization, and educational theory tab.

### 3. Black Hole: Event Horizon, Spacetime Curvature and Gravitational Lensing
- **Slug**: `/simulations/black-hole`
- **Category**: Astrophysics
- **Physics Concepts**: Einstein's General Relativity, Schwarzschild metric ($ds^2 = -(1 - r_s/r)c^2dt^2 + (1 - r_s/r)^{-1}dr^2 + r^2 d\Omega^2$), event horizon radius ($r_s = \frac{2GM}{c^2}$), photon sphere ($r_{ph} = \frac{3GM}{c^2} = 1.5 r_s$), innermost stable circular orbit ($r_{ISCO} = 3 r_s$), critical impact parameter ($b_{crit} = \frac{3\sqrt{3}}{2} r_s \approx 2.598 r_s$), null geodesic light deflection, gravitational time dilation ($d\tau = dt \sqrt{1 - r_s/r}$), gravitational redshift, hovering rocket thrust, tidal spaghettification forces ($\Delta a_{tidal} \approx \frac{2GM\Delta r}{r^3}$), and Flamm's paraboloid spatial embedding ($z(r) = -2\sqrt{r_s(r - r_s)}$).
- **Features**:
  - **Relativistic Black Hole Visualization**:
    - Central pure black event horizon shadow ($r \le r_s$).
    - Glowing photon sphere boundary at $r_{ph} = 1.5 r_s$.
    - Lensed relativistic accretion disk showing upper and lower lensed arcs bent over the horizon by strong gravitational warping.
    - Relativistic Doppler beaming asymmetry (approaching side blue-shifted and boosted brighter; receding side red-shifted and dimmer).
    - Gravitational lensing distortion of background starfield and Einstein ring effect.
    - Interactive 3D camera pan, zoom, and accretion disk tilt inclination controls ($0^\circ$ to $90^\circ$).
  - **3D Spacetime Curvature & Embedding Mesh**:
    - Interactive 3D wireframe and surface mesh implementing Flamm's paraboloid spatial slice geometry.
    - Real-time 3D camera orbit: pitch/elevation, yaw/azimuth rotation, and zoom.
    - Flat Minkowski vs Curved Schwarzschild toggle comparing curved geometry against Euclidean flat space.
    - 2D Cross-Sectional Geometry slice displaying $z(r)$ depth profile.
    - Educational physics disclaimer detailing embedding diagram analogies.
  - **Gravitational Lensing & Geodesic Ray-Tracing Lab**:
    - Interactive single ray pulse and parallel ray bundle experiments.
    - Adjustable impact parameter slider ($b$) in units of $r_s$ and physical SI distance.
    - Numerical integration of Schwarzschild null geodesic second-order differential equation ($u'' + u = \frac{3}{2}r_s u^2$).
    - Clear detection of photon capture ($b < b_{crit}$) vs relativistic deflection to infinity ($b \ge b_{crit}$).
    - Real-time deflection angle ($\alpha$) comparison between Einstein General Relativity and Newtonian corpuscular predictions.
  - **Time Dilation & Tidal Forces Lab**:
    - Dual synchronized ticking clocks: Coordinate Clock at infinity ($t$) vs Hovering Clock at radius $r$ ($\tau$).
    - Demonstrating asymptotic time freezing ($d\tau/dt \to 0$) as $r \to r_s$.
    - Gravitational redshift visualizer shifting rest 500 nm cyan light into deep red and infrared.
    - Required hovering rocket thrust showing acceleration divergence $a \to \infty$ at $r = r_s$.
    - 2-meter human body tidal force meter demonstrating spaghettification differences between stellar and supermassive black holes.
    - Infalling probe proper time comparison ($\tau_{fall} = \frac{\pi}{2}\sqrt{r_0^3 / (2GM)}$).
  - **6 Predefined Astrophysical Experiments**:
    1. *Crossing the Event Horizon*
    2. *Bending of Light & Gravitational Lensing*
    3. *Gravitational Time Dilation Near Horizon*
    4. *Mass Scaling & Tidal Spaghettification*
    5. *3D Spacetime Curvature & Embedding*
    6. *The Photon Sphere*
  - **Astrophysical Presets & Real Objects**: Cygnus X-1 ($14.8 M_\odot$), GW150914 merger remnant ($62 M_\odot$), Sagittarius A* ($4.15 \times 10^6 M_\odot$), and M87* ($6.5 \times 10^9 M_\odot$).

### 4. Simple Pendulum
- **Slug**: `/simulations/simple-pendulum`
- **Category**: Waves and Oscillations
- **Physics Concepts**: Harmonic motion, restoring force, damping coefficient, period vs length, and energy exchange.
- **Features**: Interactive pendulum with angle release, length/mass/gravity adjustments, phase space plots, and energy bar charts.

---

## 4. Dual Theme Architecture (Light Mode Default)

The application features a centralized CSS variable-driven theme system:
1. **Light Mode (Default)**: First-time visitors experience an intentional, high-contrast, clean academic theme with off-white backgrounds, slate typography, and subtle borders.
2. **Dark Mode**: Fully preserved original dark aesthetic with rich deep backgrounds and neon accents when toggled.
3. **Persistence**: The user's active theme is automatically remembered in browser `localStorage` under `'physics_lab_theme'`.
4. **Theme Toggle**: Accessible in the top navigation bar across all screen sizes with smooth transitions and Sun/Moon SVG icons.
5. **Canvas Synchronization**: HTML5 Canvas rendering routines read the active theme state and seamlessly switch canvas background fills, orbital trail opacities, and vector colors.

---

## 5. Automatic Simulation Discovery Engine

The platform eliminates the need for manual simulation registries or router edits by leveraging Vite's **`import.meta.glob()`** pattern matching in [`src/utils/simulationDiscovery.js`](file:///C:/Users/Acer/Documents/Vivek/Physics%20Simulations/src/utils/simulationDiscovery.js):

```javascript
// 1. Eagerly scans and parses all metadata.js files for instant catalog listing
const metadataModules = import.meta.glob('../simulations/*/metadata.js', { eager: true });

// 2. Lazily scans all index.jsx files for on-demand code splitting
const componentModules = import.meta.glob('../simulations/*/index.jsx');
```

To add a new simulation in the future:
1. Create a new directory under `src/simulations/<slug>/`.
2. Provide `metadata.js` exporting the simulation metadata (id, title, slug, category, difficulty, etc.).
3. Provide `index.jsx` exporting the default React component.
4. The system automatically registers the route and renders it in the directory.

---

## 6. Build and Verification

### Run Development Server
```bash
npm run dev
```

### Run Unit Tests
```bash
npm test
```
Runs both analytical physics tests (Keplerian orbital periods, velocities, trajectory solutions, energy conservation) and theme architecture tests.

### Build Production Bundle
```bash
npm run build
```
Generates an optimized static build in `dist/` deployable on any static host (Vercel, Netlify, GitHub Pages, Firebase Hosting).
