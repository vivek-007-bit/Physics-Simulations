import * as THREE from 'three';

/**
 * Procedural Texture Generator for Solar System Celestial Bodies.
 * Renders scientifically styled textures using 2D canvas in memory,
 * ensuring high fidelity, zero external network requests, and instant loading.
 */

const textureCache = new Map();

/**
 * Sun Texture with solar granulation and glowing chromosphere.
 */
export function createSunTexture() {
  if (textureCache.has('sun')) return textureCache.get('sun');

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base fiery gradient
  const baseGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  baseGrad.addColorStop(0, '#fef08a');
  baseGrad.addColorStop(0.3, '#f59e0b');
  baseGrad.addColorStop(0.7, '#d97706');
  baseGrad.addColorStop(1, '#ea580c');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Solar granulation noise & convective cells
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const idx = (y * canvas.width + x) * 4;
      // Granulation frequencies
      const s1 = Math.sin(x * 0.08) * Math.cos(y * 0.08);
      const s2 = Math.sin(x * 0.03 + y * 0.02) * 0.5;
      const s3 = Math.cos(x * 0.15 - y * 0.1) * 0.25;
      const noise = (s1 + s2 + s3) * 35;

      data[idx] = Math.min(255, Math.max(200, data[idx] + noise));
      data[idx + 1] = Math.min(235, Math.max(120, data[idx + 1] + noise * 0.8));
      data[idx + 2] = Math.min(100, Math.max(10, data[idx + 2] + noise * 0.3));
    }
  }
  ctx.putImageData(imgData, 0, 0);

  // Add subtle convective flares
  for (let i = 0; i < 24; i++) {
    const fx = Math.random() * canvas.width;
    const fy = Math.random() * canvas.height;
    const fr = 20 + Math.random() * 45;
    const flareGrad = ctx.createRadialGradient(fx, fy, 0, fx, fy, fr);
    flareGrad.addColorStop(0, 'rgba(255, 255, 220, 0.45)');
    flareGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.2)');
    flareGrad.addColorStop(1, 'rgba(234, 88, 12, 0)');
    ctx.fillStyle = flareGrad;
    ctx.beginPath();
    ctx.arc(fx, fy, fr, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set('sun', texture);
  return texture;
}

/**
 * Mercury: Rocky, cratered grey-brown surface.
 */
export function createMercuryTexture() {
  if (textureCache.has('mercury')) return textureCache.get('mercury');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Base rocky tone
  ctx.fillStyle = '#64748b';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Mottled surface variations
  for (let i = 0; i < 800; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = 2 + Math.random() * 8;
    const shade = Math.random() > 0.5 ? 'rgba(30, 41, 59, 0.35)' : 'rgba(148, 163, 184, 0.3)';
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Impact Craters with bright rims and dark interiors
  for (let i = 0; i < 90; i++) {
    const cx = Math.random() * canvas.width;
    const cy = Math.random() * canvas.height;
    const cr = 3 + Math.random() * 14;

    // Rim
    ctx.strokeStyle = 'rgba(226, 232, 240, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, Math.PI * 2);
    ctx.stroke();

    // Shadow floor
    ctx.fillStyle = 'rgba(15, 23, 42, 0.5)';
    ctx.beginPath();
    ctx.arc(cx + 1, cy + 1, cr * 0.75, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('mercury', texture);
  return texture;
}

/**
 * Venus: Dense sulfurous yellowish-cream clouds with aerodynamic atmospheric bands.
 */
export function createVenusTexture() {
  if (textureCache.has('venus')) return textureCache.get('venus');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Base creamy ochre
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, '#fef08a');
  grad.addColorStop(0.3, '#eab308');
  grad.addColorStop(0.5, '#d97706');
  grad.addColorStop(0.7, '#ca8a04');
  grad.addColorStop(1, '#fde047');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Wavy cloud swirls
  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
  for (let y = 10; y < canvas.height; y += 12) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x < canvas.width; x += 20) {
      const wave = Math.sin(x * 0.05 + y * 0.1) * 6;
      ctx.lineTo(x, y + wave);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fill();
  }

  // Darker atmospheric absorption streaks
  ctx.fillStyle = 'rgba(161, 98, 7, 0.15)';
  for (let i = 0; i < 20; i++) {
    const y = Math.random() * canvas.height;
    ctx.fillRect(0, y, canvas.width, 3 + Math.random() * 8);
  }

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('venus', texture);
  return texture;
}

/**
 * Earth: Blue oceans, continents (green/brown), and swirling white cloud cover.
 */
export function createEarthTexture() {
  if (textureCache.has('earth')) return textureCache.get('earth');

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // 1. Deep Ocean Base
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  oceanGrad.addColorStop(0, '#0284c7');
  oceanGrad.addColorStop(0.2, '#0369a1');
  oceanGrad.addColorStop(0.5, '#075985');
  oceanGrad.addColorStop(0.8, '#0369a1');
  oceanGrad.addColorStop(1, '#0284c7');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Continents & Landmasses (Stylized procedural continents)
  const drawContinent = (cx, cy, rw, rh, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    const points = 16;
    for (let p = 0; p <= points; p++) {
      const angle = (p / points) * Math.PI * 2;
      const noise = 0.75 + Math.sin(angle * 4) * 0.2 + Math.cos(angle * 7) * 0.15;
      const px = cx + Math.cos(angle) * rw * noise;
      const py = cy + Math.sin(angle) * rh * noise;
      if (p === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  };

  // Eurasia & Africa
  drawContinent(520, 180, 160, 90, '#15803d');
  drawContinent(550, 310, 110, 110, '#854d0e'); // Africa
  drawContinent(680, 220, 130, 80, '#16a34a'); // East Asia

  // Americas
  drawContinent(240, 170, 90, 80, '#15803d'); // North America
  drawContinent(290, 340, 75, 110, '#166534'); // South America

  // Australia
  drawContinent(760, 370, 60, 45, '#a16207');

  // Polar Ice Caps
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, canvas.width, 30);
  ctx.fillRect(0, canvas.height - 35, canvas.width, 35);

  // 3. Clouds Layer (Swirls, fronts, tropical bands)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
  for (let i = 0; i < 40; i++) {
    const cx = Math.random() * canvas.width;
    const cy = 60 + Math.random() * (canvas.height - 120);
    const cw = 40 + Math.random() * 120;
    const ch = 15 + Math.random() * 35;
    ctx.beginPath();
    ctx.ellipse(cx, cy, cw, ch, Math.random() * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('earth', texture);
  return texture;
}

/**
 * Mars: Rusty red-orange terrain, volcanic basalt dark regions, and polar ice caps.
 */
export function createMarsTexture() {
  if (textureCache.has('mars')) return textureCache.get('mars');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Base rusty red
  const redGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  redGrad.addColorStop(0, '#c2410c');
  redGrad.addColorStop(0.5, '#ea580c');
  redGrad.addColorStop(1, '#9a3412');
  ctx.fillStyle = redGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dark Basaltic Features (Syrtis Major, Acidalia Planitia)
  ctx.fillStyle = 'rgba(67, 20, 7, 0.45)';
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * canvas.width;
    const y = 80 + Math.random() * (canvas.height - 160);
    const rx = 30 + Math.random() * 70;
    const ry = 15 + Math.random() * 40;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Northern & Southern Polar Ice Caps
  ctx.fillStyle = '#f1f5f9';
  ctx.beginPath();
  ctx.ellipse(canvas.width / 2, 8, canvas.width / 3, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(canvas.width / 2, canvas.height - 8, canvas.width / 3.5, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('mars', texture);
  return texture;
}

/**
 * Jupiter: Prominent alternating cloud bands, atmospheric turbulence, and the Great Red Spot.
 */
export function createJupiterTexture() {
  if (textureCache.has('jupiter')) return textureCache.get('jupiter');

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Alternating gas giant bands
  const bandColors = [
    '#78350f', '#fef3c7', '#b45309', '#fed7aa', '#9a3412',
    '#fef08a', '#ca8a04', '#fed7aa', '#78350f', '#fde68a',
    '#92400e', '#fef3c7', '#7c2d12', '#fed7aa', '#78350f',
  ];

  const bandHeight = canvas.height / bandColors.length;
  for (let i = 0; i < bandColors.length; i++) {
    ctx.fillStyle = bandColors[i];
    ctx.fillRect(0, i * bandHeight, canvas.width, bandHeight);
  }

  // Zonal shear ripples & turbulent vortices
  for (let y = 0; y < canvas.height; y += 4) {
    ctx.fillStyle = (y % 8 === 0) ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x < canvas.width; x += 16) {
      const dy = Math.sin(x * 0.04 + y * 0.05) * 4;
      ctx.lineTo(x, y + dy);
    }
    ctx.lineTo(canvas.width, y + 4);
    ctx.lineTo(0, y + 4);
    ctx.fill();
  }

  // The Great Red Spot (Anticyclonic storm oval in southern hemisphere)
  const grsX = canvas.width * 0.62;
  const grsY = canvas.height * 0.64;
  const grsW = 65;
  const grsH = 38;

  // GRS Outer rim swirl
  const grsGrad = ctx.createRadialGradient(grsX, grsY, 0, grsX, grsY, grsW);
  grsGrad.addColorStop(0, '#dc2626');
  grsGrad.addColorStop(0.6, '#b91c1c');
  grsGrad.addColorStop(0.85, '#991b1b');
  grsGrad.addColorStop(1, 'rgba(153, 27, 27, 0)');
  ctx.fillStyle = grsGrad;
  ctx.beginPath();
  ctx.ellipse(grsX, grsY, grsW, grsH, -0.05, 0, Math.PI * 2);
  ctx.fill();

  // GRS Inner white core streak
  ctx.fillStyle = 'rgba(254, 242, 242, 0.4)';
  ctx.beginPath();
  ctx.ellipse(grsX, grsY, grsW * 0.45, grsH * 0.35, -0.05, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('jupiter', texture);
  return texture;
}

/**
 * Saturn: Warm golden pastel bands.
 */
export function createSaturnTexture() {
  if (textureCache.has('saturn')) return textureCache.get('saturn');

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const saturnBands = [
    '#a16207', '#fef08a', '#ca8a04', '#fef9c3', '#b45309',
    '#fde047', '#eab308', '#fef08a', '#ca8a04', '#d97706',
    '#fef9c3', '#a16207',
  ];

  const bh = canvas.height / saturnBands.length;
  for (let i = 0; i < saturnBands.length; i++) {
    ctx.fillStyle = saturnBands[i];
    ctx.fillRect(0, i * bh, canvas.width, bh);
  }

  // Subtle cloud blend
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  for (let i = 0; i < canvas.height; i += 8) {
    ctx.fillRect(0, i, canvas.width, 3);
  }

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('saturn', texture);
  return texture;
}

/**
 * Saturn's Rings: Realistic concentric rings with Cassini Division and opacity gradient.
 */
export function createSaturnRingTexture() {
  if (textureCache.has('saturn-ring')) return textureCache.get('saturn-ring');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  // Radial linear gradient across the ring width
  const ringGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);

  // Inner transparent edge (D Ring boundary)
  ringGrad.addColorStop(0.0, 'rgba(161, 98, 7, 0)');
  // C Ring (Crepe ring, faint)
  ringGrad.addColorStop(0.12, 'rgba(180, 120, 40, 0.25)');
  ringGrad.addColorStop(0.28, 'rgba(217, 150, 50, 0.5)');
  // B Ring (Dense, bright golden)
  ringGrad.addColorStop(0.32, 'rgba(245, 190, 80, 0.85)');
  ringGrad.addColorStop(0.55, 'rgba(254, 230, 130, 0.95)');
  ringGrad.addColorStop(0.68, 'rgba(240, 180, 70, 0.8)');
  // Cassini Division (Dark gap!)
  ringGrad.addColorStop(0.70, 'rgba(30, 20, 10, 0.05)');
  ringGrad.addColorStop(0.74, 'rgba(20, 15, 5, 0.02)');
  // A Ring (Outer ring)
  ringGrad.addColorStop(0.76, 'rgba(230, 170, 70, 0.75)');
  ringGrad.addColorStop(0.88, 'rgba(210, 150, 60, 0.65)');
  ringGrad.addColorStop(0.96, 'rgba(180, 120, 40, 0.4)');
  // Outer edge transparent
  ringGrad.addColorStop(1.0, 'rgba(160, 100, 30, 0)');

  ctx.fillStyle = ringGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('saturn-ring', texture);
  return texture;
}

/**
 * Uranus: Soft aquamarine/cyan with subtle pale banding and atmospheric haze.
 */
export function createUranusTexture() {
  if (textureCache.has('uranus')) return textureCache.get('uranus');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, '#67e8f9');
  grad.addColorStop(0.3, '#38bdf8');
  grad.addColorStop(0.5, '#06b6d4');
  grad.addColorStop(0.7, '#38bdf8');
  grad.addColorStop(1, '#a5f3fc');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Very delicate faint cloud streaks
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  for (let i = 20; i < canvas.height; i += 24) {
    ctx.fillRect(0, i, canvas.width, 4);
  }

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('uranus', texture);
  return texture;
}

/**
 * Neptune: Deep royal azure blue with dark storm spot and high-altitude cirrus clouds.
 */
export function createNeptuneTexture() {
  if (textureCache.has('neptune')) return textureCache.get('neptune');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Deep azure blue gradient
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, '#1e40af');
  grad.addColorStop(0.3, '#2563eb');
  grad.addColorStop(0.5, '#1d4ed8');
  grad.addColorStop(0.7, '#1e3a8a');
  grad.addColorStop(1, '#1d4ed8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Great Dark Spot (oval storm)
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(canvas.width * 0.45, canvas.height * 0.4, 45, 24, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // White wispy methane cirrus streaks ("Scooter" storm)
  ctx.fillStyle = 'rgba(240, 249, 255, 0.6)';
  ctx.beginPath();
  ctx.ellipse(canvas.width * 0.52, canvas.height * 0.46, 25, 6, -0.05, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(canvas.width * 0.28, canvas.height * 0.68, 55, 5, 0.05, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('neptune', texture);
  return texture;
}

/**
 * Custom Body Texture for user-created hypothetical planets.
 */
export function createCustomBodyTexture(colorHex = '#ec4899') {
  const cacheKey = `custom_${colorHex}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = colorHex;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Mottling & Craters
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = 2 + Math.random() * 6;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(cacheKey, texture);
  return texture;
}
