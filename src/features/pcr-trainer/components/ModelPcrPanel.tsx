import React from 'react';
import { Scenario } from '../types';

interface ModelPcrPanelProps {
  scenario: Scenario | null;
  onClose: () => void;
}

export const ModelPcrPanel: React.FC<ModelPcrPanelProps> = ({
  scenario,
  onClose
}) => {
  if (!scenario) return null;

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
        <h3 className="font-semibold text-white">Model PCR</h3>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="text-green-400 text-sm font-semibold mb-2">Key Documentation Points</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Documented onset time of symptoms</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Recorded initial and repeat vitals</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Noted response to medication</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-xs uppercase text-slate-500 font-semibold tracking-wider mb-2">Subjective</h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
              Patient states chest pain began approximately 30 minutes prior to arrival while mowing the lawn. Describes pain as "crushing" pressure, 8/10 severity, radiating to left arm. Denies nausea or vomiting. Reports history of hypertension and high cholesterol.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase text-slate-500 font-semibold tracking-wider mb-2">Objective</h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
              Patient found sitting in chair, alert and oriented x4. Skin pale, cool, diaphoretic. 
              <br/><br/>
              Vitals: BP 150/90, HR 110 irregular, RR 22, SpO2 94% RA.
              <br/><br/>
              Lung sounds clear bilaterally. No JVD or pedal edema. 12-lead ECG shows ST elevation in II, III, aVF.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase text-slate-500 font-semibold tracking-wider mb-2">Assessment</h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
              Acute Inferior MI. Stable but symptomatic.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase text-slate-500 font-semibold tracking-wider mb-2">Plan</h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
              - Oxygen 2L NC
              <br/>- Aspirin 324mg PO
              <br/>- Nitroglycerin 0.4mg SL x1 (Pain reduced to 4/10)
              <br/>- IV access established 18g LAC
              <br/>- Transport to Cardiac Center (St. Mary's)
              <br/>- Radio report given
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
