import React, { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';

export default function SolarPhysicsGraphs({
  graphHistory, // array of { timeDays, distanceAU, speedKmS, forceN, kineticJ, potentialJ, totalEnergyJ }
  selectedPlanetName,
  isIsolatedTwoBody = false,
}) {
  const { isDark } = useTheme();
  const [selectedMetric, setSelectedMetric] = useState('distance'); // 'distance' | 'speed' | 'force' | 'energy'

  const metricsConfig = {
    distance: {
      label: 'Orbital Distance',
      unit: 'AU',
      color: '#0284c7',
      getValue: (d) => d.distanceAU,
      formatY: (v) => `${v.toFixed(3)} AU`,
    },
    speed: {
      label: 'Orbital Velocity',
      unit: 'km/s',
      color: '#10b981',
      getValue: (d) => d.speedKmS,
      formatY: (v) => `${v.toFixed(2)} km/s`,
    },
    force: {
      label: 'Solar Gravitational Force',
      unit: 'N',
      color: '#f59e0b',
      getValue: (d) => d.forceN,
      formatY: (v) => `${v.toExponential(2)} N`,
    },
    energy: {
      label: 'Kinetic, Potential & Total Energy',
      unit: 'Joules',
      color: '#8b5cf6',
      isMulti: true,
      formatY: (v) => `${v.toExponential(2)} J`,
    },
  };

  const currentConfig = metricsConfig[selectedMetric];

  // If not enough data
  if (!graphHistory || graphHistory.length < 2) {
    return (
      <div className="graph-container-card empty">
        <p className="graph-empty-msg">
          Collecting telemetry data for <strong>{selectedPlanetName}</strong>... (Press Play or advance simulation)
        </p>
      </div>
    );
  }

  // Energy drift diagnostic for isolated / closed systems
  const firstPoint = graphHistory[0];
  const lastPoint = graphHistory[graphHistory.length - 1];
  let energyDriftPercent = 0;
  if (firstPoint && lastPoint && Math.abs(firstPoint.totalEnergyJ) > 0) {
    energyDriftPercent =
      ((lastPoint.totalEnergyJ - firstPoint.totalEnergyJ) / Math.abs(firstPoint.totalEnergyJ)) * 100;
  }

  // Calculate X & Y min/max for scaling
  const minTime = graphHistory[0].timeDays;
  const maxTime = Math.max(graphHistory[graphHistory.length - 1].timeDays, minTime + 0.1);

  let minY = Infinity;
  let maxY = -Infinity;

  if (selectedMetric === 'energy') {
    for (const pt of graphHistory) {
      minY = Math.min(minY, pt.kineticJ, pt.potentialJ, pt.totalEnergyJ);
      maxY = Math.max(maxY, pt.kineticJ, pt.potentialJ, pt.totalEnergyJ);
    }
  } else {
    for (const pt of graphHistory) {
      const val = currentConfig.getValue(pt);
      minY = Math.min(minY, val);
      maxY = Math.max(maxY, val);
    }
  }

  // Add 10% padding to Y range
  const ySpan = maxY - minY || 1;
  const plotMinY = minY - ySpan * 0.1;
  const plotMaxY = maxY + ySpan * 0.1;

  // SVG coordinate transformation
  const svgWidth = 600;
  const svgHeight = 220;
  const padLeft = 75;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 35;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const mapX = (t) => padLeft + ((t - minTime) / (maxTime - minTime)) * plotW;
  const mapY = (v) => padTop + plotH - ((v - plotMinY) / (plotMaxY - plotMinY)) * plotH;

  // Build SVG path strings
  const buildPath = (valAccessor) => {
    return graphHistory.reduce((acc, pt, i) => {
      const x = mapX(pt.timeDays);
      const y = mapY(valAccessor(pt));
      return i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : `${acc} L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }, '');
  };

  const axisColor = isDark ? '#475569' : '#cbd5e1';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  return (
    <div className="graph-container-card">
      <div className="graph-card-header">
        <div className="graph-title-group">
          <h3 className="graph-title">
            Live Telemetry Graphs — {selectedPlanetName}
          </h3>
          <span className="graph-subtitle">
            Time series sampled directly from symplectic Velocity Verlet integration
          </span>
        </div>

        {/* Metric Selector Pills */}
        <div className="graph-metric-tabs">
          <button
            className={`metric-tab-btn ${selectedMetric === 'distance' ? 'active' : ''}`}
            onClick={() => setSelectedMetric('distance')}
          >
            Distance (r)
          </button>
          <button
            className={`metric-tab-btn ${selectedMetric === 'speed' ? 'active' : ''}`}
            onClick={() => setSelectedMetric('speed')}
          >
            Velocity (v)
          </button>
          <button
            className={`metric-tab-btn ${selectedMetric === 'force' ? 'active' : ''}`}
            onClick={() => setSelectedMetric('force')}
          >
            Force (Fg)
          </button>
          <button
            className={`metric-tab-btn ${selectedMetric === 'energy' ? 'active' : ''}`}
            onClick={() => setSelectedMetric('energy')}
          >
            Energy (K, U, E)
          </button>
        </div>
      </div>

      {/* SVG Time Series Plot */}
      <div className="graph-svg-wrapper">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="telemetry-chart-svg">
          {/* Horizontal Gridlines */}
          {[0, 0.25, 0.5, 0.75, 1.0].map((frac, idx) => {
            const y = padTop + plotH * (1 - frac);
            const val = plotMinY + frac * (plotMaxY - plotMinY);
            return (
              <g key={idx}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={padLeft + plotW}
                  y2={y}
                  stroke={gridColor}
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="9.5"
                  fill={textColor}
                  fontFamily="monospace"
                >
                  {currentConfig.formatY(val)}
                </text>
              </g>
            );
          })}

          {/* Vertical Gridlines (Time) */}
          {[0, 0.33, 0.66, 1.0].map((frac, idx) => {
            const x = padLeft + plotW * frac;
            const t = minTime + frac * (maxTime - minTime);
            return (
              <g key={idx}>
                <line
                  x1={x}
                  y1={padTop}
                  x2={x}
                  y2={padTop + plotH}
                  stroke={gridColor}
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={padTop + plotH + 16}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill={textColor}
                  fontFamily="monospace"
                >
                  {t.toFixed(1)} d
                </text>
              </g>
            );
          })}

          {/* Axes Lines */}
          <line
            x1={padLeft}
            y1={padTop}
            x2={padLeft}
            y2={padTop + plotH}
            stroke={axisColor}
            strokeWidth="1.5"
          />
          <line
            x1={padLeft}
            y1={padTop + plotH}
            x2={padLeft + plotW}
            y2={padTop + plotH}
            stroke={axisColor}
            strokeWidth="1.5"
          />

          {/* Data Lines */}
          {selectedMetric === 'energy' ? (
            <>
              {/* Kinetic Energy (Green) */}
              <path
                d={buildPath((d) => d.kineticJ)}
                fill="none"
                stroke="#10b981"
                strokeWidth="1.8"
              />
              {/* Potential Energy (Red) */}
              <path
                d={buildPath((d) => d.potentialJ)}
                fill="none"
                stroke="#ef4444"
                strokeWidth="1.8"
              />
              {/* Total Mechanical Energy (Purple/Cyan) */}
              <path
                d={buildPath((d) => d.totalEnergyJ)}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.2"
                strokeDasharray="4 2"
              />
            </>
          ) : (
            <path
              d={buildPath(currentConfig.getValue)}
              fill="none"
              stroke={currentConfig.color}
              strokeWidth="2"
            />
          )}
        </svg>
      </div>

      {/* Legend & Energy Conservation Diagnostics */}
      <div className="graph-footer-info">
        {selectedMetric === 'energy' ? (
          <div className="energy-legend-row">
            <div className="legend-item">
              <span className="legend-line" style={{ background: '#10b981' }}></span>
              <span>Kinetic Energy (K = ½mv²)</span>
            </div>
            <div className="legend-item">
              <span className="legend-line" style={{ background: '#ef4444' }}></span>
              <span>Potential Energy (U = -GMm/r)</span>
            </div>
            <div className="legend-item">
              <span className="legend-line dashed" style={{ background: '#06b6d4' }}></span>
              <span>Total Energy (E = K + U)</span>
            </div>
            <div className="energy-drift-badge">
              <span>Energy Drift: </span>
              <strong className="mono">{energyDriftPercent.toFixed(4)}%</strong>
              <span className="drift-note"> (Diagnostic accuracy check)</span>
            </div>
          </div>
        ) : (
          <div className="single-legend-row">
            <span className="current-val-pill">
              Latest: <strong className="mono">{currentConfig.formatY(currentConfig.getValue(lastPoint))}</strong>
            </span>
            <span className="graph-time-span">
              Time Window: {(maxTime - minTime).toFixed(1)} days ({((maxTime - minTime) / 365.25).toFixed(2)} yr)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
