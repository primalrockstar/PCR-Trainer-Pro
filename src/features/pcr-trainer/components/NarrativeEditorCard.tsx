import React, { useState } from 'react';
import { PCRDocument } from '../types';

interface NarrativeEditorCardProps {
  document: PCRDocument | null;
  onChange: (doc: PCRDocument) => void;
  glassClass: string;
}

export const NarrativeEditorCard: React.FC<NarrativeEditorCardProps> = ({
  document,
  onChange,
  glassClass
}) => {
  const [activeTab, setActiveTab] = useState<'soap' | 'chart'>('soap');

  if (!document) {
    return (
      <div className={`${glassClass} p-12 flex flex-col items-center justify-center text-center`}>
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <span className="text-2xl">📝</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Ready to Document</h3>
        <p className="text-slate-400 max-w-md">
          Select a scenario from the sidebar to begin your patient care report. 
          Choose your preferred documentation format (SOAP or CHART) to start writing.
        </p>
      </div>
    );
  }

  return (
    <div className={`${glassClass} flex flex-col overflow-hidden`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
        <div className="flex bg-black/20 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('soap')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === 'soap' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            SOAP
          </button>
          <button
            onClick={() => setActiveTab('chart')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === 'chart' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            CHART
          </button>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Auto-saved 2m ago</span>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="p-6 space-y-6">
        {activeTab === 'soap' ? (
          <>
            <div className="space-y-2">
              <label className="text-xs uppercase text-blue-300 font-semibold tracking-wider">Subjective</label>
              <textarea 
                className="w-full h-32 bg-black/20 border border-white/10 rounded-lg p-4 text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                placeholder="Patient's chief complaint, history of present illness..."
                value={document.narrative.subjective}
                onChange={(e) => onChange({
                  ...document,
                  narrative: { ...document.narrative, subjective: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase text-blue-300 font-semibold tracking-wider">Objective</label>
              <textarea 
                className="w-full h-32 bg-black/20 border border-white/10 rounded-lg p-4 text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                placeholder="Physical exam findings, vital signs..."
                value={document.narrative.objective}
                onChange={(e) => onChange({
                  ...document,
                  narrative: { ...document.narrative, objective: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase text-blue-300 font-semibold tracking-wider">Assessment</label>
              <textarea 
                className="w-full h-24 bg-black/20 border border-white/10 rounded-lg p-4 text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                placeholder="Clinical impression, differential diagnosis..."
                value={document.narrative.assessment}
                onChange={(e) => onChange({
                  ...document,
                  narrative: { ...document.narrative, assessment: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase text-blue-300 font-semibold tracking-wider">Plan</label>
              <textarea 
                className="w-full h-24 bg-black/20 border border-white/10 rounded-lg p-4 text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                placeholder="Treatment provided, transport decision..."
                value={document.narrative.plan}
                onChange={(e) => onChange({
                  ...document,
                  narrative: { ...document.narrative, plan: e.target.value }
                })}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-slate-400">
            CHART format coming soon...
          </div>
        )}
      </div>
    </div>
  );
};
