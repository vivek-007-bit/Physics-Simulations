import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-container">
        <div className="notfound-code mono">404</div>
        <h1 className="notfound-title">Simulation Not Found</h1>
        <p className="notfound-desc">
          The requested physics module either does not exist or has not been deployed to the laboratory directory.
        </p>
        <Link to="/" className="notfound-btn">
          <Icon name="arrow-left" size={16} />
          <span>Return to Laboratory Directory</span>
        </Link>
      </div>
    </div>
  );
}
