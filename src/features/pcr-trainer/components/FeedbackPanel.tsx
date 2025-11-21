import React from 'react';
import { PCRScores } from '../types';

interface FeedbackPanelProps {
  scores: PCRScores | undefined;
  onClose: () => void;
}

export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
  scores,
  onClose
}) => {
  // Mock scores if undefined
  const displayScores = scores || {
    overall: 85,
    categories: [
      { category: 'Subjective', score: 90, maxScore: 100, feedback: 'Good detail on history.', suggestions: [] },
      { category: 'Objective', score: 80, maxScore: 100, feedback: 'Missed skin signs.', suggestions: ['Include skin color/temp/moisture'] },
      { category: 'Assessment', score: 95, maxScore: 100, feedback: 'Accurate impression.', suggestions: [] },
      { category: 'Plan', score: 75, maxScore: 100, feedback: 'Missing transport mode.', suggestions: ['Specify transport priority'] },
    ],
    aiAnalysis: {
      narrativeQuality: { clarity: 8, objectivity: 9, thoroughness: 7, organization: 8, grammarScore: 9, medicalTerminologyUsage: 8 },
      clinicalAccuracy: { assessmentAccuracy: 9, treatmentAppropriateness: 8, protocolCompliance: 9, criticalThinkingScore: 8 },
      completeness: { requiredFieldsCompleted: 95, missingElements: [], excessiveElements: [], timelinessScore: 10 },
      professionalismScore: 90,
      suggestions: []
    },
    completionTime: 15,
    timestamp: new Date()
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
        <h3 className="font-semibold text-white">Performance Report</h3>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Overall Score */}
        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-500/20 to-transparent rounded-xl border border-blue-500/30">
          <div className="text-5xl font-bold text-white mb-2">{displayScores.overall}%</div>
          <div className="text-sm text-blue-300 uppercase tracking-wider font-semibold">Overall Score</div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase text-slate-500 font-semibold tracking-wider">Category Breakdown</h4>
          {displayScores.categories.map((cat) => (
            <div key={cat.category} className="bg-white/5 rounded-lg p-4 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-200">{cat.category}</span>
                <span className={`font-bold ${
                  cat.score >= 90 ? 'text-green-400' :
                  cat.score >= 75 ? 'text-yellow-400' :
                  'text-red-400'
                }`}>{cat.score}%</span>
              </div>
              <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden mb-3">
                <div 
                  className={`h-full rounded-full ${
                    cat.score >= 90 ? 'bg-green-500' :
                    cat.score >= 75 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${cat.score}%` }}
                ></div>
              </div>
              <p className="text-sm text-slate-400">{cat.feedback}</p>
              {cat.suggestions.length > 0 && (
                <div className="mt-2 pt-2 border-t border-white/5">
                  <p className="text-xs text-blue-300 mb-1">Suggestions:</p>
                  <ul className="list-disc list-inside text-xs text-slate-400">
                    {cat.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* AI Insights */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🤖</span>
            <h4 className="text-purple-300 text-sm font-semibold">AI Insights</h4>
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex justify-between">
              <span>Clarity</span>
              <span className="text-white">{displayScores.aiAnalysis.narrativeQuality.clarity}/10</span>
            </div>
            <div className="flex justify-between">
              <span>Medical Terminology</span>
              <span className="text-white">{displayScores.aiAnalysis.narrativeQuality.medicalTerminologyUsage}/10</span>
            </div>
            <div className="flex justify-between">
              <span>Objectivity</span>
              <span className="text-white">{displayScores.aiAnalysis.narrativeQuality.objectivity}/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
