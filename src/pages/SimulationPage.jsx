import React, { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getSimulationBySlug } from '../utils/simulationDiscovery';
import SimulationLayout from '../components/SimulationLayout';
import Icon from '../components/Icon';
import './SimulationPage.css';

function SimulationLoader() {
  return (
    <div className="sim-loading-container">
      <div className="sim-loading-spinner">
        <Icon name="atom" size={36} color="var(--accent-cyan)" />
      </div>
      <p className="sim-loading-text">Initializing physics computational engine...</p>
    </div>
  );
}

export default function SimulationPage() {
  const { slug } = useParams();

  const simulation = useMemo(() => {
    return getSimulationBySlug(slug);
  }, [slug]);

  if (!simulation) {
    return <Navigate to="/404" replace />;
  }

  const { Component } = simulation;

  return (
    <SimulationLayout simulation={simulation}>
      <React.Suspense fallback={<SimulationLoader />}>
        <Component />
      </React.Suspense>
    </SimulationLayout>
  );
}
