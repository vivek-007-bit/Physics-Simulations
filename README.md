# Interactive Physics Simulation Laboratory

A modern, high-performance, browser-based physics simulation laboratory built strictly with **React 18** and **Vite** on the frontend—**zero backend, zero database, zero server-side dependencies**.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Key Highlights & Technology Stack](#key-highlights--technology-stack)
3. [Global Dark & Light Theme Architecture](#global-dark--light-theme-architecture)
4. [Project Architecture](#project-architecture)
5. [Automatic Simulation Discovery Engine](#automatic-simulation-discovery-engine)
6. [How to Add a New Simulation](#how-to-add-a-new-simulation)
7. [Flagship Simulation: Projectile Motion](#flagship-simulation-projectile-motion)
8. [Extensibility Verification: Simple Pendulum](#extensibility-verification-simple-pendulum)
9. [Installation & Setup](#installation--setup)
10. [Running the Application](#running-the-application)
11. [Building for Production & Deployment](#building-for-production--deployment)

---

## 1. Project Overview

The **Physics Simulation Laboratory** is an extensible educational technology platform that lets students, educators, and physics enthusiasts interact with real physical systems. Every simulation runs with true SI dimensional units, high-DPI Canvas rendering at 60 FPS, and instantaneous numerical calculations computed entirely on the client.

The laboratory includes:
- **Central Landing Directory**: Dynamic showcase of all discovered simulation modules with category filters, difficulty tags, live preview cards, and search capabilities.
- **Slug-Based Independent Simulation Workspaces**: Dedicated simulation pages with coordinated parameters, high-DPI HTML5 canvas visualizers, live telemetry HUDs, and mathematical theory breakdowns.
- **Dual Theme System (Dark & Light)**: Strict preservation of the baseline dark aesthetic with an intentional, high-contrast light mode that updates both CSS UI and HTML5 Canvas renderers in real time.
- **Zero Configuration Discovery**: Create a folder in `src/simulations/` with `metadata.js` and `index.jsx`, and it is immediately available across the whole application.

---

## 2. Key Highlights & Technology Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Framework** | React 18 | Declarative component UI and reactive state management |
| **Bundler & Tooling** | Vite 6 | Lightning-fast HMR and ESM build pipeline |
| **Routing** | React Router v6 | Client-side slug-based routing (`/simulations/:slug`) |
| **Theme Management** | React Context + CSS Variables | Dual theme system with `localStorage` persistence (default: Dark) |
| **Visual Rendering** | HTML5 Canvas 2D | Sub-pixel, high-DPI coordinate transformed graphics with theme-aware palettes |
| **Timing Engine** | `requestAnimationFrame` | Jitter-free, 60 FPS delta-time physics integration |
| **Typography & Styling** | Modern CSS Architecture | Glassmorphic laboratory UI with custom design tokens |
| **Icons** | Custom Lightweight SVG | Zero external runtime dependencies |
| **Physics Calculations** | Pure SI Analytical & Numerical | Decoupled, testable mathematical engines |

---

## 3. Global Dark & Light Theme Architecture

The laboratory features a centralized theme engine in [`src/context/ThemeContext.jsx`](file:///C:/Users/Acer/Documents/Vivek/Physics%20Simulations/src/context/ThemeContext.jsx) combined with comprehensive CSS design tokens in [`src/styles/variables.css`](file:///C:/Users/Acer/Documents/Vivek/Physics%20Simulations/src/styles/variables.css):

### Key Specifications:
1. **Dark Mode Baseline (Default)**: First-time visitors are strictly served the original dark theme. The layout, deep slate backgrounds, glassmorphic cards, telemetry glows, and canvas visuals remain 100% faithful to the original design.
2. **Light Mode**: Engineered specifically for educational clarity—using clean off-white backgrounds (`#f8fafc`), crisp white cards with soft elevation shadows, and adjusted accent contrasts (`#0284c7`, `#4f46e5`, `#059669`).
3. **Instant Toggle Without Refresh**: The top navigation bar includes an accessible Sun/Moon toggle button that seamlessly transitions the theme across all components and canvas visualizers.
4. **Persistent Preference**: The user's selection is saved under `'physics_lab_theme'` in browser `localStorage`, surviving page refreshes, internal route transitions, and visits back to the home directory.
5. **Theme-Aware Simulation Canvas**: HTML5 Canvas render routines directly listen to the active theme. When switching between light and dark modes, grid lines, ground planes, launcher hardware, vector arrows, markers, and particle glows adapt immediately without stopping or disrupting active animations.

---

## 3. Project Architecture

The directory structure is organized into modular, decoupled layers:

```
Physics Simulations/
├── public/
│   └── favicon.png                   # Application laboratory favicon
├── reference/
│   └── projectile-motion/            # Untouched original reference files (HTML, JS, CSS)
├── src/
│   ├── assets/                       # Static branding & assets
│   ├── components/                   # Reusable UI components
│   │   ├── Footer.jsx & .css         # Responsive lab footer
│   │   ├── Icon.jsx                  # Custom SVG icon set
│   │   ├── Navbar.jsx & .css         # Top glassmorphic navigation bar
│   │   ├── SimulationCard.jsx & .css # Dynamic simulation directory card
│   │   └── SimulationLayout.jsx &.css# Standardized simulation page container
│   ├── pages/
│   │   ├── Home.jsx & .css           # Central directory & landing experience
│   │   ├── NotFound.jsx & .css       # 404 handler for invalid slugs
│   │   └── SimulationPage.jsx & .css # Dynamic slug resolver & Suspense loader
│   ├── simulations/                  # Independent Physics Modules
│   │   ├── projectile-motion/        # Flagship Ballistics & 2D Kinematics
│   │   │   ├── index.jsx             # Interactive canvas & UI workspace
│   │   │   ├── metadata.js           # Module configuration & catalog info
│   │   │   ├── physics.js            # Analytical calculations & equations
│   │   │   └── styles.css            # Module-specific styling
│   │   └── simple-pendulum/          # Harmonic Motion & Energy Conservation
│   │       ├── index.jsx             # Interactive pendulum canvas & controls
│   │       ├── metadata.js           # Module configuration
│   │       └── styles.css            # Pendulum styles
│   ├── styles/
│   │   ├── index.css                 # Base resets, typography, and utility classes
│   │   └── variables.css             # Theme color tokens, spacing, and shadows
│   ├── utils/
│   │   └── simulationDiscovery.js    # Vite import.meta.glob automated scanner
│   ├── App.jsx                       # Root routing declaration (zero hardcoded sims)
│   └── main.jsx                      # React entrypoint
├── tests/
│   └── physics.test.js               # Physics accuracy & validation test suite
├── index.html                        # Application HTML shell
├── package.json                      # Project dependencies & scripts
├── vite.config.js                    # Vite configuration
└── README.md                         # Documentation
```

---

## 4. Automatic Simulation Discovery Engine

The platform eliminates the need for manual simulation registries or router edits by leveraging Vite's **`import.meta.glob()`** pattern matching in [`src/utils/simulationDiscovery.js`](file:///C:/Users/Acer/Documents/Vivek/Physics%20Simulations/src/utils/simulationDiscovery.js):

```javascript
// 1. Eagerly scans and parses all metadata.js files for instant catalog listing
const metadataModules = import.meta.glob('../simulations/*/metadata.js', { eager: true });

// 2. Lazily scans all index.jsx files for on-demand code splitting
const componentModules = import.meta.glob('../simulations/*/index.jsx');
```

### How It Works:
1. **Catalog Generation**: When the application loads, `discoverSimulations()` scans the modules and builds the list of available simulations containing their title, slug, description, category, difficulty, and icons.
2. **Code Splitting (Lazy Loading)**: Heavy simulation components and canvas render loops are wrapped in `React.lazy()` and only downloaded over the wire when the user opens that specific simulation.
3. **Resilience**: Malformed or incomplete simulation directories are caught gracefully with descriptive console warnings, preventing a broken module from crashing the rest of the application.

---

## 5. How to Add a New Simulation

Adding a future simulation requires **zero modifications** to `App.jsx`, `Home.jsx`, or any router or registry file.

### Step-by-Step Procedure:

1. **Create a dedicated folder** inside `src/simulations/`:
   ```bash
   mkdir src/simulations/newtons-second-law
   ```

2. **Define `metadata.js`**:
   Create `src/simulations/newtons-second-law/metadata.js`:
   ```javascript
   export default {
     slug: 'newtons-second-law',
     title: "Newton's Second Law",
     description: 'Explore the relationship between net force, mass, and acceleration with variable friction.',
     category: 'Classical Mechanics',
     difficulty: 'Beginner',
     tags: ['dynamics', 'force', 'mass', 'acceleration', 'friction'],
     icon: 'gauge',
     accentColor: '#f59e0b',
     secondaryColor: '#ef4444',
     formulaPreview: 'F_net = m · a',
     order: 3,
   };
   ```

3. **Create the simulation component in `index.jsx`**:
   Create `src/simulations/newtons-second-law/index.jsx`:
   ```jsx
   import React from 'react';
   import './styles.css';

   export default function NewtonsSecondLawSimulation() {
     return (
       <div className="newtons-law-root">
         {/* Your canvas visualizer, sliders, and telemetry */}
       </div>
     );
   }
   ```

4. **Add module styles in `styles.css`** (optional):
   Scope your styles within your simulation root class.

5. **Done!**
   - The landing page immediately shows the new simulation card with your tags, difficulty badge, and preview.
   - The route `/simulations/newtons-second-law` immediately loads your new component.

---

## 6. Flagship Simulation: Projectile Motion

Located in `src/simulations/projectile-motion/`, this module completely replaces and elevates the original reference implementation.

### Features & Physics Rigor:
- **Real-Time 2D Parabolic Motion**:
  - Horizontal position: $x(t) = v_{0x} t$
  - Vertical position: $y(t) = h_0 + v_{0y} t - \frac{1}{2} g t^2$
  - Analytical landing time calculated via the quadratic equation for non-zero launch heights ($h_0 \ge 0$):
    $$t_{\text{flight}} = \frac{v_{0y} + \sqrt{v_{0y}^2 + 2 g h_0}}{g}$$
  - Impact velocity and angle strictly matching conservation of mechanical energy:
    $$v_{\text{impact}} = \sqrt{v_0^2 + 2 g h_0}$$
- **Interactive Visualizer**:
  - High-DPI canvas coordinate projection with dynamic world-to-screen auto-scaling.
  - Animated glowing projectile with real-time motion trail.
  - Dynamic launcher barrel showing launch angle arc ($\theta$).
  - Elevated cliff / platform rendering for $h_0 > 0$.
  - Toggable velocity vector $\vec{v}$ and component vectors $\vec{v}_x$ and $\vec{v}_y$.
  - Theoretical trajectory guide, apex height indicator, and ground range dimension line.
- **Controls & Telemetry**:
  - Sliders and synchronized numerical inputs for velocity ($v_0$), angle ($\theta$), gravity ($g$), and height ($h_0$).
  - One-click planetary presets: **Earth (9.81 m/s²)**, **Moon (1.62 m/s²)**, **Mars (3.71 m/s²)**, and **Jupiter (24.79 m/s²)**.
  - Scenario presets (Classic 45°, High Angle 70°, Cliff Launch, Horizontal Fire, Lunar Gravity).
  - Play, Pause, Resume, Reset, and variable speed multipliers ($0.25\times, 0.5\times, 1\times, 2\times$).
  - Live 60 FPS HUD telemetry for $t$, $x$, $y$, $|v|$, $v_x$, and $v_y$ without causing React re-renders.

---

## 7. Extensibility Verification: Simple Pendulum

To demonstrate that the automatic discovery system functions without manual registration, the project includes `src/simulations/simple-pendulum/`:
- **Harmonic Oscillation & Non-Linear Mechanics**:
  - Integrated via the energy-conserving Euler-Cromer algorithm with sub-stepping:
    $$\alpha = -\frac{g}{L} \sin(\theta) - b \omega$$
  - Real-time decomposition of Kinetic Energy ($E_k = \frac{1}{2} m v^2$), Gravitational Potential Energy ($E_p = m g h$), and Total Mechanical Energy ($E_{\text{total}}$).
  - Interactive adjustment of cord length ($L$), initial angle ($\theta_0$), damping coefficient ($b$), mass ($m$), and gravity ($g$).

---

## 8. Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended; tested on v24.21.0)
- npm (v9.0.0 or higher; tested on v11.19.0)

### Installation
Clone or navigate to the project directory:
```bash
cd "c:\Users\Acer\Documents\Vivek\Physics Simulations"
```

Install dependencies:
```bash
npm install
```

---

## 9. Running the Application

### Development Server
Start the local development server with Vite Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000
```

### Running Automated Physics Tests
To verify all analytical physics equations, quadratic derivations, and vector math:
```bash
npm test
```

---

## 10. Building for Production & Deployment

### Compile Static Distribution
Build the optimized static assets into the `dist/` directory:
```bash
npm run build
```

### Preview Production Build Locally
```bash
npm run preview
```

### Static Platform Deployment
Because this application is 100% client-side with zero backend dependencies, the output `dist/` folder can be deployed instantly to:
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy --dir=dist --prod`
- **GitHub Pages**: Upload `dist/` to your `gh-pages` branch.
