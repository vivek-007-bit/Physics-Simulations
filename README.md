# Interactive Physics Simulation Laboratory

A modern, high-performance, browser-based physics simulation laboratory built with **React 18** and **Vite**.


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


