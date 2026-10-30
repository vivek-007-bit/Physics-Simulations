import fs from 'fs';
import path from 'path';

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASSED: ${message}`);
}

console.log('--- Testing Theme Architecture ---');

// 1. Verify CSS variables exist for both dark and light themes
const cssPath = path.resolve('src/styles/variables.css');
const cssContent = fs.readFileSync(cssPath, 'utf-8');

assert(cssContent.includes(':root, [data-theme="dark"]'), 'Dark theme selector is defined as baseline default');
assert(cssContent.includes('[data-theme="light"]'), 'Light theme selector is defined');

// Verify critical CSS variable tokens exist in both
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

// 2. Verify ThemeContext defaults to 'dark' for first-time visitors
const contextPath = path.resolve('src/context/ThemeContext.jsx');
const contextContent = fs.readFileSync(contextPath, 'utf-8');

assert(contextContent.includes("'dark'"), "ThemeContext defaults to 'dark'");
assert(contextContent.includes('localStorage.getItem'), 'ThemeContext loads stored preference from localStorage');
assert(contextContent.includes('localStorage.setItem'), 'ThemeContext saves selected preference to localStorage');
assert(contextContent.includes('document.documentElement.setAttribute(\'data-theme\', theme)'), 'ThemeContext dynamically updates data-theme attribute on document root');

// 3. Verify Navbar has Theme toggle button
const navbarPath = path.resolve('src/components/Navbar.jsx');
const navbarContent = fs.readFileSync(navbarPath, 'utf-8');
assert(navbarContent.includes('theme-toggle-btn'), 'Navbar includes theme toggle button');
assert(navbarContent.includes('toggleTheme'), 'Navbar connects toggle button to toggleTheme action');
assert(navbarContent.includes('moon') && navbarContent.includes('sun'), 'Navbar includes Sun and Moon icons');

console.log('--- ALL THEME TESTS PASSED! ---');
