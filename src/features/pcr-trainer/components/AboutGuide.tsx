import React from 'react';

interface AboutGuideProps {
  onClose: () => void;
}

export const AboutGuide: React.FC<AboutGuideProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-white/10 rounded-xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white z-10"
        >
          ✕
        </button>

        <div className="overflow-y-auto p-8 space-y-12 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {/* Hero Section */}
          <div className="text-center space-y-4 mt-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10 mb-4 border border-blue-500/20">
              <span className="text-4xl">🚑</span>
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
              Welcome to PCR Trainer Pro
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              The ultimate simulation platform for EMS documentation mastery. Bridge the gap between clinical care and professional reporting.
            </p>
          </div>

          {/* The Workflow */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">
                The Clinical Documentation Flow
              </h2>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              <div className="relative pl-8 border-l-2 border-blue-500/30 space-y-2 hover:border-blue-500 transition-colors group">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-800 border-2 border-blue-500 group-hover:bg-blue-500 transition-colors"></div>
                <h3 className="text-lg font-bold text-blue-400">1. Receive the Call</h3>
                <p className="text-slate-400 leading-relaxed">
                  Select a scenario from the sidebar. Review the <strong>Dispatch Information</strong> and <strong>Patient Presentation</strong> to understand the scene dynamics and initial impressions.
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-blue-500/30 space-y-2 hover:border-blue-500 transition-colors group">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-800 border-2 border-blue-500 group-hover:bg-blue-500 transition-colors"></div>
                <h3 className="text-lg font-bold text-blue-400">2. Assessment & Care</h3>
                <p className="text-slate-400 leading-relaxed">
                  Document your findings in the <strong>Assessment</strong> tab. Record vital signs and log your <strong>Treatments</strong> (medications & procedures) in real-time sequence.
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-blue-500/30 space-y-2 hover:border-blue-500 transition-colors group">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-800 border-2 border-blue-500 group-hover:bg-blue-500 transition-colors"></div>
                <h3 className="text-lg font-bold text-blue-400">3. The Narrative</h3>
                <p className="text-slate-400 leading-relaxed">
                  Synthesize your call into a professional narrative. Use the <strong>Reference Panel</strong> for mnemonics (SOAP/CHART) and terminology support to ensure clarity.
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-blue-500/30 space-y-2 hover:border-blue-500 transition-colors group">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-800 border-2 border-blue-500 group-hover:bg-blue-500 transition-colors"></div>
                <h3 className="text-lg font-bold text-blue-400">4. Verbal Hand-off</h3>
                <p className="text-slate-400 leading-relaxed">
                  Before submitting, use the <strong>Hand-off Trainer</strong> to practice your radio report. Use the voice recorder to time yourself and check for critical details.
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-3xl mb-4">🧠</div>
              <h3 className="font-bold text-white mb-2">AI Scoring Engine</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Get instant, objective feedback on your documentation quality, clinical accuracy, and completeness.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="font-bold text-white mb-2">Smart References</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Access built-in GCS calculators, medication dosages, and protocol references without leaving the app.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="font-bold text-white mb-2">Exam Mimic Mode</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Test your skills under pressure. Toggle "Exam Mimic" to disable hints and references for a realistic challenge.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-8 pb-8">
            <button 
              onClick={onClose}
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 text-lg transform hover:scale-105"
            >
              Start Training Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
