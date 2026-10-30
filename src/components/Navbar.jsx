import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Icon from './Icon';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-logo">
            <Icon name="atom" size={24} color={isDark ? '#06b6d4' : '#0284c7'} />
          </div>
          <div className="brand-info">
            <span className="brand-title">Physics<span className="brand-highlight">Lab</span></span>
            <span className="brand-subtitle">Interactive Simulations</span>
          </div>
        </Link>

        <nav className="navbar-nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <Icon name="layers" size={16} />
            <span>Simulations</span>
          </Link>
          <a
            href="#theory"
            className="nav-link"
          >
            <Icon name="book" size={16} />
            <span>Theory</span>
          </a>
          <div className="nav-badge">
            <span className="badge-dot"></span>
            <span>Client Physics Engine</span>
          </div>

          {/* Theme Toggle Button - visible on desktop, tablet, and mobile */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            <div className="theme-toggle-icon-wrap">
              <Icon
                name={isDark ? 'moon' : 'sun'}
                size={16}
                color={isDark ? '#38bdf8' : '#f59e0b'}
              />
            </div>
            <span className="theme-toggle-text">{isDark ? 'Dark' : 'Light'}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
