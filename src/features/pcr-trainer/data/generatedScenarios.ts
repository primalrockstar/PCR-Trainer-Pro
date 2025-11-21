import { Scenario } from '../types';

const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'] as const;

const TEMPLATES = [
  {
    title: 'Abdominal Pain',
    category: 'medical',
    complaints: ['severe stomach ache', 'pain in lower right side', 'upper abdominal burning'],
    histories: ['Appendicitis history', 'GERD', 'Ulcers', 'Gallstones'],
    vitals: { bp: [110, 150], hr: [70, 110], rr: [14, 22], spo2: [95, 100] }
  },
  {
    title: 'Syncope',
    category: 'neurological',
    complaints: ['passed out', 'felt dizzy and fell', 'blacked out'],
    histories: ['Dehydration', 'Cardiac arrhythmia', 'Orthostatic hypotension'],
    vitals: { bp: [90, 120], hr: [50, 100], rr: [12, 18], spo2: [94, 99] }
  },
  {
    title: 'Allergic Reaction',
    category: 'medical',
    complaints: ['trouble breathing after eating', 'swelling of lips', 'hives all over'],
    histories: ['Peanut allergy', 'Bee sting allergy', 'Shellfish allergy'],
    vitals: { bp: [100, 140], hr: [90, 130], rr: [20, 30], spo2: [90, 98] }
  },
  {
    title: 'Stroke Suspected',
    category: 'neurological',
    complaints: ['slurred speech', 'weakness on one side', 'facial droop'],
    histories: ['Hypertension', 'Atrial Fibrillation', 'Previous TIA'],
    vitals: { bp: [160, 220], hr: [60, 100], rr: [14, 20], spo2: [94, 99] }
  },
  {
    title: 'Overdose',
    category: 'medical',
    complaints: ['found unresponsive', 'took too many pills', 'slow breathing'],
    histories: ['Depression', 'Chronic pain', 'Substance abuse'],
    vitals: { bp: [90, 130], hr: [50, 110], rr: [6, 14], spo2: [85, 95] }
  },
  {
    title: 'Laceration',
    category: 'trauma',
    complaints: ['cut hand with knife', 'fell on glass', 'bleeding from leg'],
    histories: ['None', 'Blood thinners'],
    vitals: { bp: [110, 140], hr: [70, 110], rr: [14, 20], spo2: [96, 100] }
  },
  {
    title: 'Heat Exhaustion',
    category: 'medical',
    complaints: ['feeling faint', 'nausea and vomiting', 'cramps'],
    histories: ['Working outside', 'Sports practice'],
    vitals: { bp: [100, 130], hr: [100, 140], rr: [18, 24], spo2: [96, 100] }
  },
  {
    title: 'Psychiatric Emergency',
    category: 'psychiatric',
    complaints: ['hearing voices', 'feeling suicidal', 'aggressive behavior'],
    histories: ['Schizophrenia', 'Bipolar disorder', 'Anxiety'],
    vitals: { bp: [120, 150], hr: [80, 120], rr: [16, 24], spo2: [97, 100] }
  }
];

const generateRandomVitals = (range: any) => {
  const systolic = Math.floor(Math.random() * (range.bp[1] - range.bp[0])) + range.bp[0];
  return {
    timestamp: new Date(),
    bloodPressure: { systolic, diastolic: systolic - 40 },
    heartRate: Math.floor(Math.random() * (range.hr[1] - range.hr[0])) + range.hr[0],
    respiratoryRate: Math.floor(Math.random() * (range.rr[1] - range.rr[0])) + range.rr[0],
    oxygenSaturation: Math.floor(Math.random() * (range.spo2[1] - range.spo2[0])) + range.spo2[0],
    temperature: 37,
    glasgowComaScale: { eye: 4, verbal: 5, motor: 6, total: 15 }
  };
};

export const generateAdditionalScenarios = (count: number): Scenario[] => {
  const scenarios: Scenario[] = [];
  
  for (let i = 0; i < count; i++) {
    const template = TEMPLATES[i % TEMPLATES.length];
    const age = Math.floor(Math.random() * 60) + 18;
    const gender = Math.random() > 0.5 ? 'male' : 'female';
    const id = `gen-${template.category}-${i}`;
    
    scenarios.push({
      id,
      title: `${template.title} - ${age}${gender === 'male' ? 'M' : 'F'}`,
      description: `${age}-year-old ${gender} presenting with ${template.complaints[i % template.complaints.length]}.`,
      category: template.category as any,
      difficulty: DIFFICULTIES[i % DIFFICULTIES.length],
      estimatedTime: 15,
      learningObjectives: ['Assessment', 'Treatment', 'Transport'],
      tags: [template.category, 'generated'],
      module: 'General',
      chapter: 'Practice Scenarios',
      cardType: 'scenario',
      adaptiveDifficulty: false,
      
      background: `Dispatched to a scene for a ${template.title.toLowerCase()}.`,
      patientPresentation: {
        demographics: { age, gender, weight: 70 },
        chiefComplaint: template.complaints[i % template.complaints.length],
        historyOfPresentIllness: `Patient reports ${template.complaints[i % template.complaints.length]} starting ${Math.floor(Math.random() * 4) + 1} hours ago.`,
        pastMedicalHistory: [template.histories[i % template.histories.length]],
        medications: ['None'],
        allergies: ['NKDA'],
        socialHistory: 'Unremarkable',
        initialVitalSigns: generateRandomVitals(template.vitals),
        physicalFindings: 'Patient appears in mild distress.'
      },
      environmentalFactors: {
        location: 'Residence',
        timeOfDay: '12:00',
        safetyHazards: [],
        accessDifficulties: 'None'
      },
      availableResources: {
        personnel: ['Paramedic', 'EMT'],
        equipment: ['Standard ALS'],
        medications: ['Standard ALS'],
        transportOptions: ['Ambulance'],
        receivingFacilities: ['Hospital']
      },
      requiredElements: [
        { category: 'assessment', element: 'Vitals', weight: 10, required: true },
        { category: 'documentation', element: 'Narrative', weight: 10, required: true }
      ],
      scoringCriteria: {
        maxPoints: 100,
        passingScore: 80,
        categories: []
      },
      createdBy: 'System Generator',
      createdAt: new Date(),
      lastModified: new Date(),
      isPublic: true,
      usage: { timesUsed: 0, averageScore: 0, averageCompletionTime: 0 }
    });
  }
  
  return scenarios;
};
