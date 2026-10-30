import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import './SimulationCard.css';

export default function SimulationCard({ simulation }) {
  const {
    slug,
    title,
    description,
    category,
    difficulty,
    tags = [],
    formulaPreview,
    accentColor = '#6366f1',
    icon = 'atom',
  } = simulation;

  const difficultyColors = {
    Beginner: { bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)', text: '#10b981' },
    Intermediate: { bg: 'rgba(6, 182, 212, 0.12)', border: 'rgba(6, 182, 212, 0.3)', text: '#06b6d4' },
    Advanced: { bg: 'rgba(244, 63, 94, 0.12)', border: 'rgba(244, 63, 94, 0.3)', text: '#f43f5e' },
  };

  const diffStyle = difficultyColors[difficulty] || difficultyColors.Intermediate;

  return (
    <div className="sim-card animate-fade-in" style={{ '--card-accent': accentColor }}>
      {/* Card Header & Preview Graphic */}
      <div className="sim-card-preview">
        <div className="preview-mesh"></div>
        <div className="preview-icon-wrapper" style={{ borderColor: `${accentColor}40` }}>
          <Icon name={icon} size={36} color={accentColor} />
        </div>

        {formulaPreview && (
          <div className="preview-formula-badge mono">
            {formulaPreview}
          </div>
        )}

        <div className="preview-live-badge">
          <span className="live-pulse"></span>
          <span>Interactive 2D</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="sim-card-body">
        <div className="sim-card-meta">
          <span className="category-pill">{category}</span>
          <span
            className="difficulty-pill"
            style={{
              backgroundColor: diffStyle.bg,
              borderColor: diffStyle.border,
              color: diffStyle.text,
            }}
          >
            {difficulty}
          </span>
        </div>

        <h3 className="sim-card-title">{title}</h3>
        <p className="sim-card-desc">{description}</p>

        {tags.length > 0 && (
          <div className="sim-card-tags">
            {tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="tag-pill mono">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="sim-card-footer">
          <Link to={`/simulations/${slug}`} className="launch-btn">
            <span>Launch Simulation</span>
            <Icon name="play" size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
