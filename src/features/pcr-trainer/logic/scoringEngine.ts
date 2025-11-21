import { PCRDocument, Scenario, PCRScores, CategoryScore, AISuggestion } from '../types';

// List of common medical terms to check for "Medical Terminology Usage" score
const MEDICAL_TERMS = [
  'normocephalic', 'atraumatic', 'tachycardia', 'bradycardia', 'hypertension', 'hypotension',
  'tachypnea', 'bradypnea', 'hypoxia', 'cyanosis', 'diaphoretic', 'auscultation', 'palpation',
  'crepitus', 'edema', 'erythema', 'laceration', 'abrasion', 'contusion', 'hemorrhage',
  'epistaxis', 'rhinorrhea', 'otorrhea', 'pupils', 'perrl', 'distension', 'guarding',
  'rebound', 'tenderness', 'deformity', 'angulation', 'crepitation', 'pulse', 'motor',
  'sensory', 'gcs', 'alert', 'oriented', 'unresponsive', 'syncope', 'seizure', 'postictal'
];

export const calculateScore = (document: PCRDocument, scenario: Scenario): PCRScores => {
  const categories: CategoryScore[] = [];
  const suggestions: AISuggestion[] = [];
  
  let totalScore = 0;
  let totalMaxScore = 0;

  // 1. Score Narrative (Subjective/Objective/Assessment/Plan)
  const narrativeScore = scoreNarrative(document.narrative, scenario);
  categories.push(narrativeScore);
  totalScore += narrativeScore.score;
  totalMaxScore += narrativeScore.maxScore;
  suggestions.push(...narrativeScore.suggestions.map(s => ({
    type: 'improvement' as const,
    priority: 'medium' as const,
    category: 'Narrative',
    suggestion: s
  })));

  // 2. Score Vitals Documentation
  const vitalsScore = scoreVitals(document.assessment.vitalSigns);
  categories.push(vitalsScore);
  totalScore += vitalsScore.score;
  totalMaxScore += vitalsScore.maxScore;
  suggestions.push(...vitalsScore.suggestions.map(s => ({
    type: 'correction' as const,
    priority: 'high' as const,
    category: 'Vitals',
    suggestion: s
  })));

  // 3. Score Treatment & Interventions
  const treatmentScore = scoreTreatment(document, scenario);
  categories.push(treatmentScore);
  totalScore += treatmentScore.score;
  totalMaxScore += treatmentScore.maxScore;
  suggestions.push(...treatmentScore.suggestions.map(s => ({
    type: 'improvement' as const,
    priority: 'high' as const,
    category: 'Treatment',
    suggestion: s
  })));

  // 4. Score Completeness (Required Fields)
  const completenessScore = scoreCompleteness(document);
  categories.push(completenessScore);
  totalScore += completenessScore.score;
  totalMaxScore += completenessScore.maxScore;

  // Calculate Overall Score
  const overall = Math.round((totalScore / totalMaxScore) * 100);

  // Generate AI Analysis
  const aiAnalysis = generateAIAnalysis(document, overall, suggestions);

  return {
    overall,
    categories,
    aiAnalysis,
    completionTime: 0, // In a real app, calculate this
    timestamp: new Date()
  };
};

const scoreNarrative = (narrative: any, scenario: Scenario): CategoryScore => {
  let score = 0;
  const maxScore = 100;
  const suggestions: string[] = [];

  // Check for SOAP structure content
  const hasSubjective = narrative.subjective && narrative.subjective.length > 20;
  const hasObjective = narrative.objective && narrative.objective.length > 20;
  const hasAssessment = narrative.assessment && narrative.assessment.length > 10;
  const hasPlan = narrative.plan && narrative.plan.length > 10;

  if (hasSubjective) score += 25; else suggestions.push('Subjective section is too brief or missing.');
  if (hasObjective) score += 25; else suggestions.push('Objective section is too brief or missing.');
  if (hasAssessment) score += 25; else suggestions.push('Assessment section is too brief or missing.');
  if (hasPlan) score += 25; else suggestions.push('Plan section is too brief or missing.');

  // Check for keywords from scenario description (simple NLP simulation)
  if (scenario.patientPresentation.chiefComplaint) {
    const ccKeywords = scenario.patientPresentation.chiefComplaint.toLowerCase().split(' ');
    const narrativeText = JSON.stringify(narrative).toLowerCase();
    const foundKeywords = ccKeywords.filter(kw => kw.length > 3 && narrativeText.includes(kw));
    
    if (foundKeywords.length < ccKeywords.length / 2) {
      suggestions.push(`Consider mentioning key terms from the chief complaint: ${scenario.patientPresentation.chiefComplaint}`);
    }
  }

  return {
    category: 'Narrative Quality',
    score,
    maxScore,
    feedback: score > 80 ? 'Excellent narrative structure.' : 'Narrative needs more detail.',
    suggestions
  };
};

const scoreVitals = (vitals: any[]): CategoryScore => {
  let score = 0;
  const maxScore = 100;
  const suggestions: string[] = [];

  if (!vitals || vitals.length === 0) {
    return {
      category: 'Vitals Documentation',
      score: 0,
      maxScore,
      feedback: 'No vital signs recorded.',
      suggestions: ['You must record at least one set of vital signs.']
    };
  }

  // Score based on completeness of the first set
  const firstSet = vitals[0];
  let fieldsPresent = 0;
  if (firstSet.bloodPressure?.systolic) fieldsPresent++;
  if (firstSet.heartRate) fieldsPresent++;
  if (firstSet.respiratoryRate) fieldsPresent++;
  if (firstSet.oxygenSaturation) fieldsPresent++;
  if (firstSet.glasgowComaScale?.total) fieldsPresent++;

  score = (fieldsPresent / 5) * 50; // First 50 points for completeness of first set

  // Score based on trending (more than 1 set)
  if (vitals.length > 1) {
    score += 50;
  } else {
    suggestions.push('Record a second set of vitals to show trending.');
  }

  if (fieldsPresent < 5) {
    suggestions.push('Ensure all vital signs (BP, HR, RR, SpO2, GCS) are recorded.');
  }

  return {
    category: 'Vitals Documentation',
    score,
    maxScore,
    feedback: score === 100 ? 'Excellent vitals documentation.' : 'Vitals documentation incomplete.',
    suggestions
  };
};

const scoreTreatment = (document: PCRDocument, scenario: Scenario): CategoryScore => {
  let score = 100;
  const maxScore = 100;
  const suggestions: string[] = [];

  // Check required elements from scenario
  if (scenario.requiredElements) {
    const treatmentRequirements = scenario.requiredElements.filter(e => e.category === 'treatment' && e.required);
    
    treatmentRequirements.forEach(req => {
      // Simple check: does the requirement string appear in medications or procedures?
      const meds = document.treatment.medications.map(m => m.medication.toLowerCase()).join(' ');
      const procs = document.treatment.procedures.map(p => p.procedure.toLowerCase()).join(' ');
      const narrative = JSON.stringify(document.narrative).toLowerCase();
      
      const reqLower = req.element.toLowerCase();
      const found = meds.includes(reqLower) || procs.includes(reqLower) || narrative.includes(reqLower);

      if (!found) {
        score -= req.weight || 10;
        suggestions.push(`Missed required treatment: ${req.element}`);
      }
    });
  }

  return {
    category: 'Clinical Management',
    score: Math.max(0, score),
    maxScore,
    feedback: score === 100 ? 'Appropriate treatment plan.' : 'Missed key clinical interventions.',
    suggestions
  };
};

const scoreCompleteness = (document: PCRDocument): CategoryScore => {
  let score = 100;
  const maxScore = 100;
  const suggestions: string[] = [];

  if (!document.incident.address) { score -= 5; suggestions.push('Incident address missing.'); }
  if (!document.patient.age) { score -= 5; suggestions.push('Patient age missing.'); }
  if (!document.patient.gender) { score -= 5; suggestions.push('Patient gender missing.'); }
  if (!document.transport.destination) { score -= 10; suggestions.push('Transport destination missing.'); }
  if (!document.unit) { score -= 5; suggestions.push('Unit number missing.'); }

  return {
    category: 'PCR Completeness',
    score: Math.max(0, score),
    maxScore,
    feedback: score === 100 ? 'All required fields completed.' : 'Some administrative fields are missing.',
    suggestions
  };
};

const generateAIAnalysis = (document: PCRDocument, overallScore: number, suggestions: AISuggestion[]) => {
  // Simulate AI analysis based on text content
  const narrativeText = [
    document.narrative.subjective,
    document.narrative.objective,
    document.narrative.assessment,
    document.narrative.plan
  ].join(' ');

  const wordCount = narrativeText.split(/\s+/).length;
  const medicalTermCount = MEDICAL_TERMS.filter(term => narrativeText.toLowerCase().includes(term)).length;
  
  // Calculate sub-scores
  const thoroughness = Math.min(10, Math.floor(wordCount / 20)); // 200 words = 10/10
  const terminology = Math.min(10, Math.floor(medicalTermCount / 2)); // 20 terms = 10/10
  const clarity = Math.min(10, 5 + (overallScore / 20)); // Base 5 + up to 5 based on overall score

  return {
    narrativeQuality: {
      clarity,
      objectivity: 8, // Placeholder
      thoroughness,
      organization: 9, // Placeholder
      grammarScore: 8, // Placeholder
      medicalTerminologyUsage: terminology
    },
    clinicalAccuracy: {
      assessmentAccuracy: Math.min(10, Math.floor(overallScore / 10)),
      treatmentAppropriateness: 8,
      protocolCompliance: 9,
      criticalThinkingScore: 7
    },
    completeness: {
      requiredFieldsCompleted: overallScore,
      missingElements: [],
      excessiveElements: [],
      timelinessScore: 10
    },
    professionalismScore: Math.round((thoroughness + terminology + clarity) / 3 * 10),
    suggestions
  };
};

