import fs from 'fs';
import path from 'path';

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASSED: ${message}`);
}

console.log('--- Testing Light Mode Single Standard Architecture ---');

// 1. Verify CSS variables exist for light theme only and dark theme is completely removed
const cssPath = path.resolve('src/styles/variables.css');
const cssContent = fs.readFileSync(cssPath, 'utf-8');

assert(cssContent.includes(':root, [data-theme="light"]'), 'Light theme selector is defined as baseline standard');
assert(!cssContent.includes('[data-theme="dark"]'), 'Dark theme selector is completely removed from variables.css');

// Verify critical CSS variable tokens exist
const requiredTokens = [
  '--bg-primary',
  '--bg-secondary',
  '--bg-tertiary',
  '--bg-elevated',
  '--bg-glass',
  '--bg-glass-card',
  '--text-primary',
  '--text-secondary',
  '--text-muted',
  '--border-subtle',
  '--border-medium',
  '--accent-cyan',
  '--accent-indigo',
  '--canvas-bg-start',
  '--canvas-bg-end',
  '--canvas-grid',
  '--canvas-ground-line',
  '--canvas-ground-fill',
  '--canvas-trajectory',
];

for (const token of requiredTokens) {
  assert(cssContent.includes(token), `Design token ${token} is defined`);
}

// 2. Verify Navbar does NOT have Theme toggle button, and has responsive navigation
const navbarPath = path.resolve('src/components/Navbar.jsx');
const navbarContent = fs.readFileSync(navbarPath, 'utf-8');
assert(!navbarContent.includes('theme-toggle-btn'), 'Navbar has completely removed theme toggle button');
assert(!navbarContent.includes('toggleTheme'), 'Navbar does not have toggleTheme logic');
assert(!navbarContent.includes('useTheme'), 'Navbar does not depend on ThemeContext');
assert(navbarContent.includes('mobile-menu-toggle'), 'Navbar includes mobile navigation toggle');

// 3. Verify App does NOT wrap in ThemeProvider
const appPath = path.resolve('src/App.jsx');
const appContent = fs.readFileSync(appPath, 'utf-8');
assert(!appContent.includes('ThemeProvider'), 'App does not wrap in obsolete ThemeProvider');

console.log('--- ALL LIGHT MODE TESTS PASSED! ---');
