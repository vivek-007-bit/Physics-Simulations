import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Icon from './Icon';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const { toggleTheme, isDark } = useTheme();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-logo">
            <Icon name="atom" size={20} color="var(--accent-indigo)" />
          </div>
          <span className="brand-title">
            Physics<span className="brand-suffix">Lab</span>
          </span>
        </Link>

        <nav className="navbar-nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Simulations
          </Link>
          <a
            href="/#theory"
            className="nav-link"
          >
            Theory
          </a>

          {/* Theme Toggle Button */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            <Icon
              name={isDark ? 'moon' : 'sun'}
              size={15}
              color="currentColor"
            />
            <span className="theme-toggle-text">{isDark ? 'Dark' : 'Light'}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
