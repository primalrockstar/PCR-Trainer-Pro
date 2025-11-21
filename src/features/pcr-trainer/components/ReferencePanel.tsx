import React, { useState } from 'react';

interface ReferencePanelProps {
  onClose: () => void;
}

export const ReferencePanel: React.FC<ReferencePanelProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'mnemonics' | 'guide' | 'gcs' | 'meds'>('mnemonics');
  const [gcsSelection, setGcsSelection] = useState({ eye: 0, verbal: 0, motor: 0 });

  const gcsTotal = gcsSelection.eye + gcsSelection.verbal + gcsSelection.motor;

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Documentation Reference</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="flex p-1 bg-black/20 rounded-lg overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab('mnemonics')}
            className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === 'mnemonics' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Mnemonics
          </button>
          <button
            onClick={() => setActiveTab('gcs')}
            className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === 'gcs' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            GCS Trainer
          </button>
          <button
            onClick={() => setActiveTab('meds')}
            className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === 'meds' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Medications
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === 'guide' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Best Practices
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'meds' ? (
          <div className="space-y-8">
            {/* EMT-Basic */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-green-400 uppercase tracking-wider border-b border-green-500/30 pb-2">EMT-Basic Medications</h4>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="text-white font-semibold mb-2">Aspirin (ASA)</h5>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p><strong className="text-slate-400">Indication:</strong> Chest pain suggestive of ACS.</p>
                    <p><strong className="text-slate-400">Dose:</strong> 162-325mg (Chewable).</p>
                    <p><strong className="text-slate-400">Contra:</strong> Allergy, GI bleed.</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="text-white font-semibold mb-2">Oral Glucose</h5>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p><strong className="text-slate-400">Indication:</strong> Hypoglycemia in conscious patient.</p>
                    <p><strong className="text-slate-400">Dose:</strong> 15-25g (1 tube).</p>
                    <p><strong className="text-slate-400">Contra:</strong> Unconscious, unable to swallow.</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="text-white font-semibold mb-2">Nitroglycerin (Assist)</h5>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p><strong className="text-slate-400">Indication:</strong> Cardiac chest pain (Rx required).</p>
                    <p><strong className="text-slate-400">Dose:</strong> 0.4mg SL (Spray/Tablet).</p>
                    <p><strong className="text-slate-400">Contra:</strong> SBP &lt; 100, ED meds within 24-48h.</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="text-white font-semibold mb-2">Naloxone (Narcan)</h5>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p><strong className="text-slate-400">Indication:</strong> Opioid overdose with respiratory depression.</p>
                    <p><strong className="text-slate-400">Dose:</strong> 2-4mg IN/IM.</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="text-white font-semibold mb-2">Epinephrine</h5>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p><strong className="text-slate-400">Indication:</strong> Anaphylaxis.</p>
                    <p><strong className="text-slate-400">Dose:</strong> 0.3mg (Adult), 0.15mg (Peds) IM.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AEMT */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider border-b border-blue-500/30 pb-2">Advanced EMT Medications</h4>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="text-white font-semibold mb-2">Albuterol / Ipratropium</h5>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p><strong className="text-slate-400">Indication:</strong> Bronchospasm (Asthma/COPD).</p>
                    <p><strong className="text-slate-400">Dose:</strong> 2.5mg / 0.5mg Nebulized.</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="text-white font-semibold mb-2">Dextrose (D50/D10)</h5>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p><strong className="text-slate-400">Indication:</strong> Hypoglycemia.</p>
                    <p><strong className="text-slate-400">Dose:</strong> 25g IV.</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="text-white font-semibold mb-2">Glucagon</h5>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p><strong className="text-slate-400">Indication:</strong> Hypoglycemia (No IV access).</p>
                    <p><strong className="text-slate-400">Dose:</strong> 1mg IM/IN.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Paramedic */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider border-b border-red-500/30 pb-2">Paramedic Medications</h4>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="text-white font-semibold mb-2">Adenosine</h5>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p><strong className="text-slate-400">Indication:</strong> Stable SVT.</p>
                    <p><strong className="text-slate-400">Dose:</strong> 6mg rapid IVP, then 12mg.</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="text-white font-semibold mb-2">Amiodarone</h5>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p><strong className="text-slate-400">Indication:</strong> VF/VT Arrest, Stable VT.</p>
                    <p><strong className="text-slate-400">Dose:</strong> 300mg IVP (Arrest), 150mg Infusion (Stable).</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="text-white font-semibold mb-2">Fentanyl</h5>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p><strong className="text-slate-400">Indication:</strong> Pain management.</p>
                    <p><strong className="text-slate-400">Dose:</strong> 1mcg/kg IV/IN/IM.</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="text-white font-semibold mb-2">Ketamine</h5>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p><strong className="text-slate-400">Indication:</strong> Pain, Sedation, RSI.</p>
                    <p><strong className="text-slate-400">Dose:</strong> 0.1-0.3mg/kg (Pain), 1-2mg/kg (Sedation).</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="text-white font-semibold mb-2">Midazolam (Versed)</h5>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p><strong className="text-slate-400">Indication:</strong> Seizures, Sedation.</p>
                    <p><strong className="text-slate-400">Dose:</strong> 2-5mg IV/IM/IN.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'gcs' ? (
          <div className="space-y-6">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
              <h4 className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Total GCS Score</h4>
              <div className="text-4xl font-bold text-white mb-1">{gcsTotal || '-'} <span className="text-lg text-slate-500 font-normal">/ 15</span></div>
              <p className="text-xs text-blue-300">
                {gcsTotal === 0 ? 'Select responses below' : 
                 gcsTotal <= 8 ? 'Severe Brain Injury (Coma)' :
                 gcsTotal <= 12 ? 'Moderate Brain Injury' : 'Minor Brain Injury'}
              </p>
            </div>

            <div className="space-y-4">
              {/* Eye Opening */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-teal-400 flex justify-between">
                  <span>Eye Opening (E)</span>
                  <span className="bg-teal-500/20 px-2 rounded text-teal-300">{gcsSelection.eye || '-'}</span>
                </h4>
                <div className="grid gap-2">
                  {[
                    { val: 4, label: 'Spontaneous', desc: 'Eyes open without stimulation' },
                    { val: 3, label: 'To Sound', desc: 'Eyes open to verbal command' },
                    { val: 2, label: 'To Pressure', desc: 'Eyes open to pain/pressure' },
                    { val: 1, label: 'None', desc: 'No eye opening' }
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => setGcsSelection(s => ({ ...s, eye: item.val }))}
                      className={`text-left p-3 rounded-lg border transition-all ${
                        gcsSelection.eye === item.val
                          ? 'bg-teal-500/20 border-teal-500/50 text-white'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{item.label}</span>
                        <span className="text-xs font-bold opacity-50">{item.val}</span>
                      </div>
                      <div className="text-xs opacity-70 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Verbal Response */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-blue-400 flex justify-between">
                  <span>Verbal Response (V)</span>
                  <span className="bg-blue-500/20 px-2 rounded text-blue-300">{gcsSelection.verbal || '-'}</span>
                </h4>
                <div className="grid gap-2">
                  {[
                    { val: 5, label: 'Oriented', desc: 'Converses, knows time/place/person' },
                    { val: 4, label: 'Confused', desc: 'Converses but disoriented' },
                    { val: 3, label: 'Words', desc: 'Inappropriate words' },
                    { val: 2, label: 'Sounds', desc: 'Incomprehensible sounds' },
                    { val: 1, label: 'None', desc: 'No verbal response' }
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => setGcsSelection(s => ({ ...s, verbal: item.val }))}
                      className={`text-left p-3 rounded-lg border transition-all ${
                        gcsSelection.verbal === item.val
                          ? 'bg-blue-500/20 border-blue-500/50 text-white'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{item.label}</span>
                        <span className="text-xs font-bold opacity-50">{item.val}</span>
                      </div>
                      <div className="text-xs opacity-70 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Motor Response */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-purple-400 flex justify-between">
                  <span>Motor Response (M)</span>
                  <span className="bg-purple-500/20 px-2 rounded text-purple-300">{gcsSelection.motor || '-'}</span>
                </h4>
                <div className="grid gap-2">
                  {[
                    { val: 6, label: 'Obeys Commands', desc: 'Follows simple instructions' },
                    { val: 5, label: 'Localizing', desc: 'Moves hand towards stimulus' },
                    { val: 4, label: 'Normal Flexion', desc: 'Withdraws from pain' },
                    { val: 3, label: 'Abnormal Flexion', desc: 'Decorticate posturing' },
                    { val: 2, label: 'Extension', desc: 'Decerebrate posturing' },
                    { val: 1, label: 'None', desc: 'No motor response' }
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => setGcsSelection(s => ({ ...s, motor: item.val }))}
                      className={`text-left p-3 rounded-lg border transition-all ${
                        gcsSelection.motor === item.val
                          ? 'bg-purple-500/20 border-purple-500/50 text-white'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{item.label}</span>
                        <span className="text-xs font-bold opacity-50">{item.val}</span>
                      </div>
                      <div className="text-xs opacity-70 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'mnemonics' ? (
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-blue-400 font-semibold mb-2">CHART Method</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><strong className="text-white">C</strong>hief Complaint: Why EMS was called</li>
                <li><strong className="text-white">H</strong>istory: HPI (OPQRST) and SAMPLE</li>
                <li><strong className="text-white">A</strong>ssessment: Physical exam findings</li>
                <li><strong className="text-white">R</strong>x (Treatment): Interventions performed</li>
                <li><strong className="text-white">T</strong>ransport: Destination and changes en route</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-blue-400 font-semibold mb-2">OPQRST (Pain/Symptom)</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><strong className="text-white">O</strong>nset: What were you doing?</li>
                <li><strong className="text-white">P</strong>rovocation: What makes it better/worse?</li>
                <li><strong className="text-white">Q</strong>uality: Describe the feeling</li>
                <li><strong className="text-white">R</strong>adiation: Does it move anywhere?</li>
                <li><strong className="text-white">S</strong>everity: 0-10 scale</li>
                <li><strong className="text-white">T</strong>ime: How long has it been going on?</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-blue-400 font-semibold mb-2">SAMPLE History</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><strong className="text-white">S</strong>igns/Symptoms</li>
                <li><strong className="text-white">A</strong>llergies</li>
                <li><strong className="text-white">M</strong>edications</li>
                <li><strong className="text-white">P</strong>ast Medical History</li>
                <li><strong className="text-white">L</strong>ast Oral Intake</li>
                <li><strong className="text-white">E</strong>vents leading up to illness/injury</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-blue-400 font-semibold mb-2">DCAP-BTLS (Trauma)</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><strong className="text-white">D</strong>eformities</li>
                <li><strong className="text-white">C</strong>ontusions</li>
                <li><strong className="text-white">A</strong>brasions</li>
                <li><strong className="text-white">P</strong>unctures/Penetrations</li>
                <li><strong className="text-white">B</strong>urns</li>
                <li><strong className="text-white">T</strong>enderness</li>
                <li><strong className="text-white">L</strong>acerations</li>
                <li><strong className="text-white">S</strong>welling</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-sm">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-teal-400 font-semibold mb-3">Why Documentation Matters</h4>
              <p className="text-slate-300 mb-3 leading-relaxed">
                A Prehospital Care Report (PCR) is more than just paperwork; it is the permanent medical record of your patient's emergency event. It serves five critical functions:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-300">
                <li><strong className="text-white">Continuity of Care:</strong> Ensures hospital staff understand what happened before arrival.</li>
                <li><strong className="text-white">Legal Protection:</strong> "If it isn't written down, it didn't happen." A complete report is your best defense.</li>
                <li><strong className="text-white">Billing & Reimbursement:</strong> Accurate details ensure your service is paid for resources used.</li>
                <li><strong className="text-white">Quality Improvement:</strong> Helps agencies track performance and improve protocols.</li>
                <li><strong className="text-white">Research:</strong> Contributes to national databases (NEMSIS) to improve EMS science.</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-teal-400 font-semibold mb-3">Critical Elements to Record</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="text-white font-medium text-xs uppercase tracking-wider mb-1">Initial Impression</h5>
                  <p className="text-slate-400">Document scene safety first. Describe the mechanism of injury (MOI) or nature of illness (NOI) and your "from the door" view of the patient.</p>
                </div>
                <div>
                  <h5 className="text-white font-medium text-xs uppercase tracking-wider mb-1">Vitals & Trending</h5>
                  <p className="text-slate-400">A single set of vitals is a snapshot; multiple sets tell a story. Document changes to show if your patient is improving or deteriorating.</p>
                </div>
                <div>
                  <h5 className="text-white font-medium text-xs uppercase tracking-wider mb-1">Interventions</h5>
                  <p className="text-slate-400">Every treatment requires a rationale. Explain <em>why</em> you did it and <em>how</em> the patient responded.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-teal-400 font-semibold mb-3">Writing Tips</h4>
              <ul className="space-y-2 text-slate-300">
                <li className="flex gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Use standard medical terminology.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Be objective (record facts, not opinions).</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Avoid slang and non-standard abbreviations.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Paint a picture: "Patient was found lying supine..." is better than "Patient on floor."</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <p className="text-[10px] text-slate-500 leading-tight text-justify">
                <strong className="text-slate-400">LEGAL & MEDICAL DISCLAIMER:</strong> This application and the information provided herein are for educational and training purposes only. It is intended to simulate EMS documentation scenarios for practice and does not constitute real medical advice, diagnosis, or treatment. The scenarios, patients, and data are entirely fictional. Users should always follow their local protocols, standing orders, and state regulations when performing actual patient care and documentation. The developers assume no liability for actions taken based on this training tool.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
