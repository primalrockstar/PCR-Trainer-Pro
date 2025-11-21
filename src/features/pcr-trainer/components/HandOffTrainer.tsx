import React, { useState, useEffect } from 'react';
import { PCRDocument, Scenario } from '../types';

interface HandOffTrainerProps {
  document: PCRDocument | null;
  scenario: Scenario | null;
  onClose: () => void;
}

export const HandOffTrainer: React.FC<HandOffTrainerProps> = ({ document, scenario, onClose }) => {
  const [reportText, setReportText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [activeFormat, setActiveFormat] = useState<'mist' | 'sbar'>('mist');
  const [recognition, setRecognition] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
            setReportText(prev => {
                const prefix = prev && !prev.endsWith(' ') ? ' ' : '';
                return prev + prefix + finalTranscript;
            });
        }
        setInterimText(interimTranscript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'not-allowed') {
            setError('Microphone access denied. Please check your browser settings.');
        } else {
            setError(`Error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    } else {
        setError('Speech recognition not supported in this browser.');
    }
  }, []);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      
      if (recognition && !isListening) {
        try {
          recognition.start();
          setIsListening(true);
        } catch (e) {
          console.error("Error starting recognition:", e);
        }
      }
    } else {
      if (recognition && isListening) {
        recognition.stop();
        setIsListening(false);
      }
    }
    return () => clearInterval(interval);
  }, [isRecording, recognition]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getFeedback = () => {
    if (!document || !scenario) return [];
    
    const feedback = [];
    const text = reportText.toLowerCase();

    // Check Demographics
    if (text.includes(document.patient.age.toString()) || text.includes('year old')) {
      feedback.push({ item: 'Patient Age', status: 'pass' });
    } else {
      feedback.push({ item: 'Patient Age', status: 'miss' });
    }

    if (text.includes(document.patient.gender) || text.includes('male') || text.includes('female')) {
      feedback.push({ item: 'Patient Gender', status: 'pass' });
    } else {
      feedback.push({ item: 'Patient Gender', status: 'miss' });
    }

    // Check Chief Complaint
    const ccWords = document.patient.chiefComplaint.toLowerCase().split(' ');
    const hasCC = ccWords.some(w => w.length > 3 && text.includes(w));
    feedback.push({ item: 'Chief Complaint', status: hasCC ? 'pass' : 'miss' });

    // Check Vitals
    const hasVitals = text.includes('bp') || text.includes('pressure') || text.includes('heart rate') || text.includes('pulse');
    feedback.push({ item: 'Vital Signs', status: hasVitals ? 'pass' : 'miss' });

    // Check Treatment
    const hasTreatment = document.treatment.medications.some(m => text.includes(m.medication.toLowerCase()));
    feedback.push({ item: 'Interventions', status: hasTreatment ? 'pass' : 'miss' });

    return feedback;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <div className="bg-slate-900 border border-white/10 rounded-xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">🗣️</span> Verbal Hand-off Trainer
            </h2>
            <p className="text-slate-400 mt-1">Practice your radio reports and hospital hand-offs</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel: Reference Info */}
          <div className="w-1/3 border-r border-white/10 bg-black/20 p-6 overflow-y-auto">
            {scenario && (
              <div className="mb-8 border-b border-white/10 pb-6">
                <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-4">Scenario Context</h3>
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                    <div className="text-xs text-purple-300 uppercase mb-1">Dispatch</div>
                    <div className="text-white font-medium">{scenario.title}</div>
                    <div className="text-sm text-slate-300 mt-1">{scenario.description}</div>
                  </div>
                  <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                    <div className="text-xs text-purple-300 uppercase mb-1">HPI</div>
                    <div className="text-sm text-slate-300">{scenario.patientPresentation.historyOfPresentIllness}</div>
                  </div>
                </div>
              </div>
            )}

            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-4">PCR Documentation</h3>
            
            {document ? (
              <div className="space-y-6">
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="text-xs text-slate-500 uppercase mb-1">Demographics</div>
                  <div className="text-lg font-medium text-white">
                    {document.patient.age}-year-old {document.patient.gender}
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="text-xs text-slate-500 uppercase mb-1">Chief Complaint</div>
                  <div className="text-white">{document.patient.chiefComplaint}</div>
                </div>

                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="text-xs text-slate-500 uppercase mb-1">Latest Vitals</div>
                  {document.assessment.vitalSigns.length > 0 ? (
                    <div className="space-y-1 text-sm text-slate-300">
                      <div className="flex justify-between">
                        <span>BP:</span>
                        <span className="text-white font-mono">
                          {document.assessment.vitalSigns[0].bloodPressure?.systolic}/{document.assessment.vitalSigns[0].bloodPressure?.diastolic}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>HR:</span>
                        <span className="text-white font-mono">{document.assessment.vitalSigns[0].heartRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>RR:</span>
                        <span className="text-white font-mono">{document.assessment.vitalSigns[0].respiratoryRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SpO2:</span>
                        <span className="text-white font-mono">{document.assessment.vitalSigns[0].oxygenSaturation}%</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-500 italic">No vitals recorded</div>
                  )}
                </div>

                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="text-xs text-slate-500 uppercase mb-1">Interventions</div>
                  {document.treatment.medications.length > 0 || document.treatment.procedures.length > 0 ? (
                    <ul className="list-disc pl-4 text-sm text-slate-300 space-y-1">
                      {document.treatment.medications.map((m, i) => (
                        <li key={`med-${i}`}>{m.medication} {m.dose}</li>
                      ))}
                      {document.treatment.procedures.map((p, i) => (
                        <li key={`proc-${i}`}>{p.procedure}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-slate-500 italic">No interventions</div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-slate-500 italic">No patient data available. Start a scenario first.</div>
            )}
          </div>

          {/* Right Panel: Practice Area */}
          <div className="flex-1 flex flex-col bg-slate-900">
            {/* Format Tabs */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveFormat('mist')}
                className={`flex-1 py-4 text-sm font-medium transition-colors ${
                  activeFormat === 'mist' 
                    ? 'bg-slate-800 text-blue-400 border-b-2 border-blue-400' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                MIST Report
              </button>
              <button
                onClick={() => setActiveFormat('sbar')}
                className={`flex-1 py-4 text-sm font-medium transition-colors ${
                  activeFormat === 'sbar' 
                    ? 'bg-slate-800 text-blue-400 border-b-2 border-blue-400' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                SBAR Report
              </button>
            </div>

            {/* Guide */}
            <div className="p-4 bg-blue-500/10 border-b border-blue-500/20">
              {activeFormat === 'mist' ? (
                <div className="flex justify-between text-sm text-blue-200">
                  <div><strong className="text-white">M</strong>echanism/Medical</div>
                  <div><strong className="text-white">I</strong>njuries/Illness</div>
                  <div><strong className="text-white">S</strong>igns/Symptoms</div>
                  <div><strong className="text-white">T</strong>reatment</div>
                </div>
              ) : (
                <div className="flex justify-between text-sm text-blue-200">
                  <div><strong className="text-white">S</strong>ituation</div>
                  <div><strong className="text-white">B</strong>ackground</div>
                  <div><strong className="text-white">A</strong>ssessment</div>
                  <div><strong className="text-white">R</strong>ecommendation</div>
                </div>
              )}
            </div>

            {/* Editor */}
            <div className="flex-1 p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`text-4xl font-mono font-bold ${timer > 60 ? 'text-red-400' : 'text-white'}`}>
                    {formatTime(timer)}
                  </div>
                  <div className="text-xs text-slate-400">
                    Target: &lt; 60s
                  </div>
                </div>
                <div className="flex gap-3">
                  {!isRecording ? (
                    <button
                      onClick={() => {
                        setIsRecording(true);
                        setReportText('');
                        setTimer(0);
                        setShowFeedback(false);
                      }}
                      className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-colors flex items-center gap-2"
                    >
                      <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                      Start Recording
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsRecording(false);
                        setShowFeedback(true);
                      }}
                      className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-full font-medium transition-colors"
                    >
                      Stop & Analyze
                    </button>
                  )}
                </div>
              </div>

              <div className="relative flex-1 flex flex-col">
                <textarea
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder={isRecording ? "Listening... (Speak clearly into your microphone)" : "Press 'Start Recording' to begin..."}
                  className="flex-1 bg-black/20 border border-white/10 rounded-xl p-6 text-lg text-white focus:outline-none focus:border-blue-500/50 resize-none leading-relaxed"
                />
                {isRecording && interimText && (
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-blue-500/20 text-blue-200 backdrop-blur-sm rounded-lg pointer-events-none border border-blue-500/30 animate-pulse">
                    <span className="text-xs uppercase font-bold mr-2 text-blue-400">Listening:</span>
                    {interimText}
                  </div>
                )}
                {error && (
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-red-500/20 text-red-200 backdrop-blur-sm rounded-lg border border-red-500/30">
                    <span className="text-xs uppercase font-bold mr-2 text-red-400">Error:</span>
                    {error}
                  </div>
                )}
              </div>

              {/* Feedback Area */}
              {showFeedback && (
                <div className="bg-slate-800 rounded-xl p-4 border border-white/10 animate-in fade-in slide-in-from-bottom-4">
                  <h4 className="text-sm font-bold text-white mb-3">Report Analysis</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {getFeedback().map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-black/20 p-2 rounded">
                        <span className="text-slate-300 text-sm">{item.item}</span>
                        {item.status === 'pass' ? (
                          <span className="text-green-400 text-xs font-bold px-2 py-1 bg-green-500/10 rounded">INCLUDED</span>
                        ) : (
                          <span className="text-red-400 text-xs font-bold px-2 py-1 bg-red-500/10 rounded">MISSED</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10 text-xs text-slate-400">
                    <strong className="text-white">Tip:</strong> Keep your report concise. Focus on what the receiving facility needs to prepare for the patient.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
