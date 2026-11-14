import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import './SimulationCard.css';

function SimulationThumbnail({ slug, icon }) {
  if (slug === 'solar-system-gravity') {
    return (
      <svg viewBox="0 0 200 120" className="sim-thumbnail-svg" fill="none">
        {/* Sun */}
        <circle cx="100" cy="60" r="10" fill="#f59e0b" />
        {/* Orbits */}
        <ellipse cx="100" cy="60" rx="30" ry="18" stroke="var(--border-medium)" strokeWidth="1" strokeDasharray="3 3" />
        <ellipse cx="100" cy="60" rx="55" ry="32" stroke="var(--border-medium)" strokeWidth="1" strokeDasharray="3 3" />
        <ellipse cx="100" cy="60" rx="80" ry="46" stroke="var(--border-medium)" strokeWidth="1" strokeDasharray="3 3" />
        {/* Planets */}
        <circle cx="128" cy="54" r="3.5" fill="#0284c7" />
        <circle cx="55" cy="48" r="4" fill="#ef4444" />
        <circle cx="160" cy="80" r="6" fill="#d97706" />
      </svg>
    );
  }

  if (slug === 'projectile-motion') {
    return (
      <svg viewBox="0 0 200 120" className="sim-thumbnail-svg" fill="none">
        {/* Ground */}
        <line x1="15" y1="100" x2="185" y2="100" stroke="var(--border-medium)" strokeWidth="1.5" />
        {/* Trajectory */}
        <path d="M 30 100 Q 100 20, 170 100" stroke="var(--accent-indigo)" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* Launch marker & vector */}
        <circle cx="30" cy="100" r="3" fill="var(--text-muted)" />
        <line x1="30" y1="100" x2="60" y2="70" stroke="var(--accent-cyan)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        {/* Projectile at apex */}
        <circle cx="100" cy="60" r="4.5" fill="var(--accent-cyan)" />
        {/* Landing marker */}
        <circle cx="170" cy="100" r="3" fill="var(--accent-emerald)" />
      </svg>
    );
  }

  if (slug === 'black-hole') {
    return (
      <svg viewBox="0 0 200 120" className="sim-thumbnail-svg" fill="none">
        {/* Curvature grid lines bending toward center */}
        <ellipse cx="100" cy="60" rx="90" ry="48" stroke="var(--border-subtle)" strokeWidth="0.75" strokeDasharray="3 3" />
        <ellipse cx="100" cy="60" rx="65" ry="32" stroke="var(--border-subtle)" strokeWidth="0.75" strokeDasharray="3 3" />
        
        {/* Lensed accretion disk - upper lobe behind black hole */}
        <path d="M 40 60 C 50 18, 150 18, 160 60" stroke="#f59e0b" strokeWidth="3" opacity="0.85" />
        <path d="M 52 60 C 62 26, 138 26, 148 60" stroke="#fbbf24" strokeWidth="2" opacity="0.9" />

        {/* Accretion disk - main equatorial plane */}
        <ellipse cx="100" cy="60" rx="68" ry="16" fill="none" stroke="#ea580c" strokeWidth="2.5" opacity="0.65" />
        <ellipse cx="100" cy="60" rx="55" ry="12" fill="none" stroke="#f59e0b" strokeWidth="2.5" opacity="0.8" />
        
        {/* Photon sphere at 1.5 rs */}
        <circle cx="100" cy="60" r="28" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.9" />

        {/* Event horizon dark silhouette / shadow */}
        <circle cx="100" cy="60" r="19" fill="#090d16" stroke="#f97316" strokeWidth="1.5" />

        {/* Lensed accretion disk - lower foreground arc */}
        <path d="M 46 62 C 60 76, 140 76, 154 62" stroke="#fb923c" strokeWidth="2.5" opacity="0.95" />

        {/* Deflected light ray */}
        <path d="M 15 28 Q 75 32, 100 35 T 185 10" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.85" />

        {/* Metric labels */}
        <text x="100" y="112" fontSize="7" fill="var(--text-muted)" textAnchor="middle" fontWeight="500">r_s = 2GM/c² • r_ph = 1.5 r_s</text>
      </svg>
    );
  }

  if (slug === 'simple-pendulum') {
    return (
      <svg viewBox="0 0 200 120" className="sim-thumbnail-svg" fill="none">
        {/* Pivot mount */}
        <line x1="80" y1="20" x2="120" y2="20" stroke="var(--border-medium)" strokeWidth="2" />
        {/* Reference equilibrium line */}
        <line x1="100" y1="20" x2="100" y2="105" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="3 3" />
        {/* String */}
        <line x1="100" y1="20" x2="135" y2="85" stroke="var(--text-muted)" strokeWidth="1.5" />
        {/* Bob */}
        <circle cx="135" cy="85" r="7" fill="var(--accent-emerald)" />
        {/* Arc */}
        <path d="M 80 92 A 75 75 0 0 0 135 85" stroke="var(--border-medium)" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    );
  }

  return (
    <div className="sim-thumbnail-default">
      <Icon name={icon || 'atom'} size={32} color="var(--accent-indigo)" />
    </div>
  );
}

export default function SimulationCard({ simulation }) {
  const {
    slug,
    title,
    description,
    category,
    icon = 'atom',
  } = simulation;

  return (
    <article className="sim-card">
      <Link to={`/simulations/${slug}`} className="sim-card-link" aria-label={`Open ${title} simulation`}>
        {/* Visual Preview Graphic */}
        <div className="sim-card-preview">
          <SimulationThumbnail slug={slug} icon={icon} />
        </div>

        {/* Content */}
        <div className="sim-card-body">
          <div className="sim-card-category">{category}</div>
          <h3 className="sim-card-title">{title}</h3>
          <p className="sim-card-desc">{description}</p>
          <div className="sim-card-action">
            <span>Open simulation</span>
            <span className="sim-card-arrow">→</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
