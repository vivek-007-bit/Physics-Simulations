import React from 'react';

/**
 * AUTOMATIC SIMULATION DISCOVERY ENGINE
 * 
 * Uses Vite's import.meta.glob to dynamically discover all simulation modules
 * located inside `src/simulations/` without requiring any manual registry entries.
 * 
 * To add a new simulation:
 * 1. Create a folder: `src/simulations/<your-simulation-name>/`
 * 2. Add `metadata.js` exporting simulation details (slug, title, category, etc.)
 * 3. Add `index.jsx` exporting the React simulation component as default export.
 * 
 * That's it! The landing page, directory, and slug-based routing will automatically
 * discover and render your new simulation.
 */

// Eagerly load all metadata files so landing page and navigation have metadata instantly
const metadataModules = import.meta.glob('../simulations/*/metadata.js', { eager: true });

// Lazily load simulation components for code-splitting and fast page load
const componentModules = import.meta.glob('../simulations/*/index.jsx');

/**
 * Parses and validates all discovered simulation modules.
 * Gracefully handles incomplete or malformed modules.
 */
function discoverSimulations() {
  const simulations = [];

  for (const [metaPath, metaExports] of Object.entries(metadataModules)) {
    try {
      // Extract directory name: ../simulations/<folderName>/metadata.js
      const folderMatch = metaPath.match(/\/simulations\/([^/]+)\/metadata\.js$/);
      if (!folderMatch) continue;
      const folderName = folderMatch[1];

      // Metadata can be default export or named export
      const metadata = metaExports.default || metaExports.metadata || metaExports;

      if (!metadata || typeof metadata !== 'object') {
        console.warn(`[SimulationDiscovery] Invalid metadata export in ${metaPath}`);
        continue;
      }

      // Expected matching component path
      const componentPath = `../simulations/${folderName}/index.jsx`;
      const componentLoader = componentModules[componentPath];

      if (!componentLoader) {
        console.warn(`[SimulationDiscovery] Missing index.jsx for simulation: ${folderName}`);
        continue;
      }

      const slug = metadata.slug || folderName;

      // Lazy loaded component
      const LazyComponent = React.lazy(() =>
        componentLoader().catch((err) => {
          console.error(`Failed to load simulation component for "${slug}":`, err);
          return {
            default: () =>
              React.createElement(
                'div',
                { style: { padding: '2rem', textAlign: 'center', color: '#f87171' } },
                React.createElement('h3', null, 'Simulation Component Failed to Load'),
                React.createElement('p', null, 'Check console for error details.')
              ),
          };
        })
      );

      simulations.push({
        folderName,
        slug,
        title: metadata.title || folderName.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        description: metadata.description || 'Interactive browser-based physics simulation.',
        category: metadata.category || 'Classical Mechanics',
        difficulty: metadata.difficulty || 'Intermediate',
        tags: Array.isArray(metadata.tags) ? metadata.tags : [],
        icon: metadata.icon || 'atom',
        accentColor: metadata.accentColor || '#6366f1',
        secondaryColor: metadata.secondaryColor || '#06b6d4',
        formulaPreview: metadata.formulaPreview || '',
        order: typeof metadata.order === 'number' ? metadata.order : 100,
        Component: LazyComponent,
      });
    } catch (err) {
      console.error(`[SimulationDiscovery] Error parsing simulation at ${metaPath}:`, err);
    }
  }

  // Sort simulations by order, then alphabetically by title
  return simulations.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });
}

// Cached discovery list
let cachedSimulations = null;

export function getAllSimulations() {
  if (!cachedSimulations) {
    cachedSimulations = discoverSimulations();
  }
  return cachedSimulations;
}

export function getSimulationBySlug(slug) {
  const sims = getAllSimulations();
  return sims.find((s) => s.slug === slug) || null;
}

export function getCategories() {
  const sims = getAllSimulations();
  const set = new Set(sims.map((s) => s.category));
  return ['All', ...Array.from(set)];
}
