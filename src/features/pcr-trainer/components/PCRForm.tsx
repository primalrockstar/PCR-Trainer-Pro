import React, { useState } from 'react';
import { PCRDocument } from '../types';

interface PCRFormProps {
  document: PCRDocument | null;
  onChange: (doc: PCRDocument) => void;
  glassClass: string;
}

type FormSection = 'patient' | 'incident' | 'history' | 'vitals' | 'assessment' | 'treatment' | 'narrative' | 'disposition';

export const PCRForm: React.FC<PCRFormProps> = ({
  document,
  onChange,
  glassClass
}) => {
  const [activeSection, setActiveSection] = useState<FormSection>('patient');

  if (!document) {
    return (
      <div className={`${glassClass} p-12 flex flex-col items-center justify-center text-center`}>
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <span className="text-2xl">📝</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Ready to Document</h3>
        <p className="text-slate-400 max-w-md">
          Select a scenario from the sidebar to begin your patient care report.
        </p>
      </div>
    );
  }

  const sections: { id: FormSection; label: string; icon: string }[] = [
    { id: 'patient', label: 'Patient', icon: '👤' },
    { id: 'incident', label: 'Incident', icon: '🚑' },
    { id: 'history', label: 'History', icon: '📋' },
    { id: 'vitals', label: 'Vitals', icon: '💓' },
    { id: 'assessment', label: 'Assessment', icon: '🔍' },
    { id: 'treatment', label: 'Treatment', icon: '💊' },
    { id: 'narrative', label: 'Narrative', icon: '📝' },
    { id: 'disposition', label: 'Disposition', icon: '🏥' },
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'patient':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase text-slate-400 font-semibold">First Name</label>
                <input 
                  type="text" 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                  value={document.patient.firstName}
                  onChange={(e) => onChange({ ...document, patient: { ...document.patient, firstName: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase text-slate-400 font-semibold">Last Name</label>
                <input 
                  type="text" 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                  value={document.patient.lastName}
                  onChange={(e) => onChange({ ...document, patient: { ...document.patient, lastName: e.target.value } })}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase text-slate-400 font-semibold">Age</label>
                <input 
                  type="number" 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                  value={document.patient.age}
                  onChange={(e) => onChange({ ...document, patient: { ...document.patient, age: parseInt(e.target.value) || 0 } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase text-slate-400 font-semibold">Gender</label>
                <select 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                  value={document.patient.gender}
                  onChange={(e) => onChange({ ...document, patient: { ...document.patient, gender: e.target.value as any } })}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase text-slate-400 font-semibold">Weight (kg)</label>
                <input 
                  type="number" 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                  value={document.patient.weight}
                  onChange={(e) => onChange({ ...document, patient: { ...document.patient, weight: parseInt(e.target.value) || 0 } })}
                />
              </div>
            </div>
          </div>
        );
      
      case 'incident':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase text-slate-400 font-semibold">Location</label>
              <input 
                type="text" 
                className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                value={document.incident.address}
                onChange={(e) => onChange({ ...document, incident: { ...document.incident, address: e.target.value } })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase text-slate-400 font-semibold">Dispatch Time</label>
                <input 
                  type="time" 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                  // Simplified time handling for demo
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase text-slate-400 font-semibold">Incident Type</label>
                <select 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                  value={document.incident.incidentType}
                  onChange={(e) => onChange({ ...document, incident: { ...document.incident, incidentType: e.target.value as any } })}
                >
                  <option value="medical">Medical</option>
                  <option value="trauma">Trauma</option>
                  <option value="cardiac">Cardiac</option>
                  <option value="respiratory">Respiratory</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase text-slate-400 font-semibold">Chief Complaint</label>
              <input 
                type="text" 
                className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                value={document.patient.chiefComplaint}
                onChange={(e) => onChange({ ...document, patient: { ...document.patient, chiefComplaint: e.target.value } })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase text-slate-400 font-semibold">History of Present Illness (OPQRST)</label>
              <textarea 
                className="w-full h-32 bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none resize-none"
                placeholder="Onset, Provocation, Quality, Radiation, Severity, Time..."
                value={document.narrative.subjective} // Using subjective for HPI in this simplified view
                onChange={(e) => onChange({ ...document, narrative: { ...document.narrative, subjective: e.target.value } })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase text-slate-400 font-semibold">Past Medical History (SAMPLE)</label>
              <textarea 
                className="w-full h-24 bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none resize-none"
                placeholder="Signs/Symptoms, Allergies, Medications, Past History, Last Oral Intake, Events..."
                value={document.patient.medicalHistory.join('\n')}
                onChange={(e) => onChange({ ...document, patient: { ...document.patient, medicalHistory: e.target.value.split('\n') } })}
              />
            </div>
          </div>
        );

      case 'vitals':
        return (
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-sm font-semibold text-slate-300 mb-3">Initial Vitals</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase text-slate-400 font-semibold">Blood Pressure</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      placeholder="Sys"
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                    />
                    <span className="text-slate-400">/</span>
                    <input 
                      type="number" 
                      placeholder="Dia"
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase text-slate-400 font-semibold">Heart Rate</label>
                  <input 
                    type="number" 
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase text-slate-400 font-semibold">Resp Rate</label>
                  <input 
                    type="number" 
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase text-slate-400 font-semibold">SpO2 (%)</label>
                  <input 
                    type="number" 
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <button className="w-full py-2 rounded-lg border border-dashed border-white/20 text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
              + Add Vital Set
            </button>
          </div>
        );

      case 'narrative':
        return (
          <div className="space-y-4">
            <div className="flex bg-black/20 p-1 rounded-lg w-fit">
              <button className="px-4 py-1.5 rounded-md text-sm font-medium bg-blue-600 text-white shadow-lg">SOAP</button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-slate-400 hover:text-white">CHART</button>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase text-blue-300 font-semibold tracking-wider">Subjective</label>
              <textarea 
                className="w-full h-24 bg-black/20 border border-white/10 rounded-lg p-4 text-slate-200 focus:outline-none focus:border-blue-500/50 resize-none"
                value={document.narrative.subjective}
                onChange={(e) => onChange({ ...document, narrative: { ...document.narrative, subjective: e.target.value } })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase text-blue-300 font-semibold tracking-wider">Objective</label>
              <textarea 
                className="w-full h-24 bg-black/20 border border-white/10 rounded-lg p-4 text-slate-200 focus:outline-none focus:border-blue-500/50 resize-none"
                value={document.narrative.objective}
                onChange={(e) => onChange({ ...document, narrative: { ...document.narrative, objective: e.target.value } })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase text-blue-300 font-semibold tracking-wider">Assessment</label>
              <textarea 
                className="w-full h-20 bg-black/20 border border-white/10 rounded-lg p-4 text-slate-200 focus:outline-none focus:border-blue-500/50 resize-none"
                value={document.narrative.assessment}
                onChange={(e) => onChange({ ...document, narrative: { ...document.narrative, assessment: e.target.value } })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase text-blue-300 font-semibold tracking-wider">Plan</label>
              <textarea 
                className="w-full h-20 bg-black/20 border border-white/10 rounded-lg p-4 text-slate-200 focus:outline-none focus:border-blue-500/50 resize-none"
                value={document.narrative.plan}
                onChange={(e) => onChange({ ...document, narrative: { ...document.narrative, plan: e.target.value } })}
              />
            </div>
          </div>
        );

      case 'assessment':
        return (
          <div className="space-y-6">
            {/* Primary Assessment */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-blue-300 uppercase tracking-wider border-b border-white/10 pb-2">Primary Assessment</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase text-slate-400 font-semibold">Airway</label>
                  <select 
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                    value={document.assessment.primaryAssessment.airway}
                    onChange={(e) => onChange({ 
                      ...document, 
                      assessment: { 
                        ...document.assessment, 
                        primaryAssessment: { ...document.assessment.primaryAssessment, airway: e.target.value as any } 
                      } 
                    })}
                  >
                    <option value="open">Open & Patent</option>
                    <option value="obstructed">Obstructed</option>
                    <option value="artificial">Artificial Airway</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase text-slate-400 font-semibold">Breathing</label>
                  <select 
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                    value={document.assessment.primaryAssessment.breathing}
                    onChange={(e) => onChange({ 
                      ...document, 
                      assessment: { 
                        ...document.assessment, 
                        primaryAssessment: { ...document.assessment.primaryAssessment, breathing: e.target.value as any } 
                      } 
                    })}
                  >
                    <option value="adequate">Adequate</option>
                    <option value="inadequate">Inadequate</option>
                    <option value="absent">Absent/Apneic</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase text-slate-400 font-semibold">Circulation</label>
                  <select 
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                    value={document.assessment.primaryAssessment.circulation}
                    onChange={(e) => onChange({ 
                      ...document, 
                      assessment: { 
                        ...document.assessment, 
                        primaryAssessment: { ...document.assessment.primaryAssessment, circulation: e.target.value as any } 
                      } 
                    })}
                  >
                    <option value="adequate">Adequate Perfusion</option>
                    <option value="inadequate">Inadequate/Shock</option>
                    <option value="absent">Absent Pulses</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase text-slate-400 font-semibold">Consciousness (AVPU)</label>
                  <select 
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                    value={document.assessment.primaryAssessment.consciousness}
                    onChange={(e) => onChange({ 
                      ...document, 
                      assessment: { 
                        ...document.assessment, 
                        primaryAssessment: { ...document.assessment.primaryAssessment, consciousness: e.target.value as any } 
                      } 
                    })}
                  >
                    <option value="alert">Alert</option>
                    <option value="voice">Voice</option>
                    <option value="pain">Pain</option>
                    <option value="unresponsive">Unresponsive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Secondary Assessment */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-blue-300 uppercase tracking-wider border-b border-white/10 pb-2">Secondary Assessment</h4>
              <div className="space-y-2">
                <label className="text-xs uppercase text-slate-400 font-semibold">Clinical Impressions</label>
                <input 
                  type="text" 
                  placeholder="e.g., Acute Coronary Syndrome, Hypoglycemia"
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                  value={document.assessment.impressions.join(', ')}
                  onChange={(e) => onChange({ 
                    ...document, 
                    assessment: { 
                      ...document.assessment, 
                      impressions: e.target.value.split(',').map(s => s.trim()) 
                    } 
                  })}
                />
              </div>
            </div>
          </div>
        );

      case 'treatment':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 className="text-sm font-semibold text-blue-300 uppercase tracking-wider">Medications Administered</h4>
                <button 
                  className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded hover:bg-blue-500/30 transition-colors"
                  onClick={() => {
                    const newMed = { medication: '', dose: '', route: 'iv', time: new Date(), indication: '', effect: '' };
                    onChange({
                      ...document,
                      treatment: {
                        ...document.treatment,
                        medications: [...document.treatment.medications, newMed as any]
                      }
                    });
                  }}
                >
                  + Add Med
                </button>
              </div>
              
              {document.treatment.medications.length === 0 ? (
                <div className="text-center py-8 text-slate-500 italic bg-black/10 rounded-lg">
                  No medications recorded
                </div>
              ) : (
                <div className="space-y-3">
                  {document.treatment.medications.map((med, idx) => (
                    <div key={idx} className="bg-white/5 p-3 rounded-lg border border-white/10 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input 
                          type="text" 
                          placeholder="Medication Name"
                          className="bg-black/20 border border-white/10 rounded p-2 text-sm text-white"
                          value={med.medication}
                          onChange={(e) => {
                            const newMeds = [...document.treatment.medications];
                            newMeds[idx].medication = e.target.value;
                            onChange({ ...document, treatment: { ...document.treatment, medications: newMeds } });
                          }}
                        />
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Dose"
                            className="w-1/2 bg-black/20 border border-white/10 rounded p-2 text-sm text-white"
                            value={med.dose}
                            onChange={(e) => {
                              const newMeds = [...document.treatment.medications];
                              newMeds[idx].dose = e.target.value;
                              onChange({ ...document, treatment: { ...document.treatment, medications: newMeds } });
                            }}
                          />
                          <select 
                            className="w-1/2 bg-black/20 border border-white/10 rounded p-2 text-sm text-white"
                            value={med.route}
                            onChange={(e) => {
                              const newMeds = [...document.treatment.medications];
                              newMeds[idx].route = e.target.value as any;
                              onChange({ ...document, treatment: { ...document.treatment, medications: newMeds } });
                            }}
                          >
                            <option value="iv">IV</option>
                            <option value="im">IM</option>
                            <option value="oral">PO</option>
                            <option value="inhaled">Inhaled</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 className="text-sm font-semibold text-blue-300 uppercase tracking-wider">Procedures</h4>
                <button 
                  className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded hover:bg-blue-500/30 transition-colors"
                  onClick={() => {
                    const newProc = { procedure: '', time: new Date(), operator: 'Self', successful: true };
                    onChange({
                      ...document,
                      treatment: {
                        ...document.treatment,
                        procedures: [...document.treatment.procedures, newProc as any]
                      }
                    });
                  }}
                >
                  + Add Procedure
                </button>
              </div>
              
              {document.treatment.procedures.length === 0 ? (
                <div className="text-center py-8 text-slate-500 italic bg-black/10 rounded-lg">
                  No procedures recorded
                </div>
              ) : (
                <div className="space-y-3">
                  {document.treatment.procedures.map((proc, idx) => (
                    <div key={idx} className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <input 
                        type="text" 
                        placeholder="Procedure (e.g., IV Access, Intubation)"
                        className="w-full bg-black/20 border border-white/10 rounded p-2 text-sm text-white"
                        value={proc.procedure}
                        onChange={(e) => {
                          const newProcs = [...document.treatment.procedures];
                          newProcs[idx].procedure = e.target.value;
                          onChange({ ...document, treatment: { ...document.treatment, procedures: newProcs } });
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'disposition':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase text-slate-400 font-semibold">Destination Facility</label>
              <input 
                type="text" 
                className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                value={document.transport.destination}
                onChange={(e) => onChange({ ...document, transport: { ...document.transport, destination: e.target.value } })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase text-slate-400 font-semibold">Transport Mode</label>
                <select 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                  value={document.transport.transportMode}
                  onChange={(e) => onChange({ ...document, transport: { ...document.transport, transportMode: e.target.value as any } })}
                >
                  <option value="ground">Ground Ambulance</option>
                  <option value="air">Air Medical</option>
                  <option value="water">Water Rescue</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase text-slate-400 font-semibold">Patient Condition</label>
                <select 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                  value={document.transport.condition}
                  onChange={(e) => onChange({ ...document, transport: { ...document.transport, condition: e.target.value as any } })}
                >
                  <option value="stable">Stable</option>
                  <option value="unstable">Unstable</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase text-slate-400 font-semibold">Patient Position</label>
              <select 
                className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-blue-500/50 focus:outline-none"
                value={document.transport.position}
                onChange={(e) => onChange({ ...document, transport: { ...document.transport, position: e.target.value as any } })}
              >
                <option value="fowlers">Fowler's</option>
                <option value="supine">Supine</option>
                <option value="lateral">Lateral Recumbent</option>
                <option value="trendelenburg">Trendelenburg</option>
              </select>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`${glassClass} flex flex-col overflow-hidden h-full`}>
      {/* Section Tabs */}
      <div className="flex overflow-x-auto border-b border-white/10 bg-white/5 scrollbar-hide">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
              activeSection === section.id
                ? 'border-blue-500 text-blue-400 bg-white/5'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{section.icon}</span>
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {renderSectionContent()}
      </div>
    </div>
  );
};
