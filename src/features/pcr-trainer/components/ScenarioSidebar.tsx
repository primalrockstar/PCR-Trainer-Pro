import React from 'react';
import { Scenario, TrainingMode } from '../types';

interface ScenarioSidebarProps {
  activeMode: TrainingMode;
  onSelectScenario: (scenario: Scenario) => void;
  onModeChange: (mode: TrainingMode) => void;
}

import { scenarios } from '../data/scenarios';

export const ScenarioSidebar: React.FC<ScenarioSidebarProps> = ({
  activeMode,
  onSelectScenario,
  onModeChange
}) => {
  const modes: { id: TrainingMode; label: string; icon: string; description: string }[] = [
    { 
      id: 'quick_drill', 
      label: 'Quick Drill', 
      icon: '⚡',
      description: 'Rapid fire scenarios. Focus on key findings.'
    },
    { 
      id: 'deep_session', 
      label: 'Deep Session', 
      icon: '📚',
      description: 'Full documentation practice. Detailed feedback.'
    },
    { 
      id: 'exam_mimic', 
      label: 'Exam Mimic', 
      icon: '📝',
      description: 'Test conditions. No hints or references.'
    },
    {
      id: 'scenario_chain',
      label: 'Scenario Chain',
      icon: '🔗',
      description: 'Handle multiple patients in sequence.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <div className="space-y-2">
        <h3 className="text-xs uppercase text-slate-400 font-semibold tracking-wider">Training Mode</h3>
        <div className="grid grid-cols-1 gap-2">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`flex flex-col items-start gap-1 px-4 py-3 rounded-lg transition-all text-left ${
                activeMode === mode.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{mode.icon}</span>
                <span className="font-medium">{mode.label}</span>
              </div>
              <span className={`text-xs ${activeMode === mode.id ? 'text-blue-100' : 'text-slate-500'}`}>
                {mode.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Scenario List */}
      <div className="space-y-2">
        <h3 className="text-xs uppercase text-slate-400 font-semibold tracking-wider">Available Scenarios</h3>
        <div className="space-y-2">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => onSelectScenario(scenario as Scenario)}
              className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full border ${
                  scenario.category === 'cardiac' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                  scenario.category === 'trauma' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                  'bg-blue-500/20 text-blue-300 border-blue-500/30'
                }`}>
                  {scenario.category}
                </span>
                <span className="text-xs text-slate-500 group-hover:text-slate-400">
                  {scenario.difficulty}
                </span>
              </div>
              <div className="font-medium text-slate-200 group-hover:text-white">
                {scenario.title}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
