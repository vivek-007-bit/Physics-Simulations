import React from 'react';
import Icon from '../../../components/Icon.jsx';
import { EXPERIMENT_SCENARIOS } from '../constants.js';

export default function ExperimentPanel({
  activeScenarioId,
  onSelectScenario,
}) {
  return (
    <section className="bh-scenarios-strip">
      <div className="bh-scenarios-title">
        <Icon name="sparkles" size={16} color="#ea580c" />
        <span>Predefined Relativistic Experiments & Astrophysical Scenarios</span>
      </div>

      <div className="bh-scenarios-grid">
        {EXPERIMENT_SCENARIOS.map((scenario) => {
          const isActive = activeScenarioId === scenario.id;
          return (
            <button
              key={scenario.id}
              className={`bh-scenario-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectScenario(scenario)}
            >
              <span className="bh-scenario-name">{scenario.title}</span>
              <span className="bh-scenario-sub">{scenario.subtitle}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
