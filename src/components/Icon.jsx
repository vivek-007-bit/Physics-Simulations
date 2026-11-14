import React from 'react';

/**
 * Lightweight, high-performance SVG icon collection.
 * Avoids heavy icon package dependencies while maintaining pixel-perfect clarity.
 */
export default function Icon({ name, size = 18, color = 'currentColor', className = '', ...props }) {
  const iconProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: `physics-icon ${className}`,
    ...props,
  };

  switch (name) {
    case 'sun':
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      );
    case 'moon':
      return (
        <svg {...iconProps}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      );
    case 'atom':
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="1.5" fill={color} />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
        </svg>
      );
    case 'black-hole':
      return (
        <svg {...iconProps}>
          {/* Lensed accretion disk ring */}
          <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke={color} strokeWidth="1.5" transform="rotate(-15 12 12)" />
          {/* Event horizon dark interior */}
          <circle cx="12" cy="12" r="5" fill="#0f172a" stroke={color} strokeWidth="1.75" />
          {/* Photon sphere glow ring */}
          <circle cx="12" cy="12" r="7.5" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" opacity="0.75" />
        </svg>
      );
    case 'play':
      return (
        <svg {...iconProps} fill={color}>
          <polygon points="5 3 19 12 5 21 5 3" stroke="none" />
        </svg>
      );
    case 'pause':
      return (
        <svg {...iconProps}>
          <rect x="6" y="4" width="4" height="16" fill={color} />
          <rect x="14" y="4" width="4" height="16" fill={color} />
        </svg>
      );
    case 'reset':
    case 'rotate-ccw':
      return (
        <svg {...iconProps}>
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      );
    case 'replay':
      return (
        <svg {...iconProps}>
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
      );
    case 'arrow-left':
      return (
        <svg {...iconProps}>
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg {...iconProps}>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      );
    case 'arrow-up':
      return (
        <svg {...iconProps}>
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      );
    case 'arrow-down':
      return (
        <svg {...iconProps}>
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      );
    case 'x':
    case 'close':
      return (
        <svg {...iconProps}>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      );
    case 'sliders':
      return (
        <svg {...iconProps}>
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
      );
    case 'info':
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
    case 'book':
      return (
        <svg {...iconProps}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg {...iconProps}>
          <path d="M12 3l1.912 5.885L20 10.8l-4.544 3.765L17.368 21 12 16.885 6.632 21l1.912-6.435L4 10.8l6.088-1.915L12 3z" />
        </svg>
      );
    case 'gauge':
      return (
        <svg {...iconProps}>
          <path d="m12 14 4-4" />
          <path d="M3.34 19a10 10 0 1 1 17.32 0" />
        </svg>
      );
    case 'layers':
      return (
        <svg {...iconProps}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case 'search':
      return (
        <svg {...iconProps}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case 'check':
      return (
        <svg {...iconProps}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    case 'zap':
      return (
        <svg {...iconProps}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'compass':
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case 'maximize':
      return (
        <svg {...iconProps}>
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}
