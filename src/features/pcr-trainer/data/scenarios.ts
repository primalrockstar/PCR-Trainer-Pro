import { Scenario } from '../types';
import { generateAdditionalScenarios } from './generatedScenarios';

const baseScenarios: Scenario[] = [
  {
    id: 'chest-pain',
    title: 'Chest Pain - 62M',
    description: '62-year-old male complaining of crushing chest pain while mowing the lawn.',
    category: 'cardiac',
    difficulty: 'intermediate',
    estimatedTime: 15,
    learningObjectives: ['Identify ACS symptoms', 'Perform 12-lead ECG', 'Administer Aspirin/Nitro', 'Transport decision'],
    tags: ['chest pain', 'cardiac', 'ACS'],
    module: 'Cardiology',
    chapter: 'Acute Coronary Syndromes',
    cardType: 'scenario',
    adaptiveDifficulty: true,
    
    background: 'Called to a residence for a 62-year-old male with chest pain.',
    patientPresentation: {
      demographics: {
        age: 62,
        gender: 'male',
        weight: 95
      },
      chiefComplaint: 'Patient states "I have crushing chest pain"',
      historyOfPresentIllness: 'Onset: Started 30 minutes ago while mowing lawn. Provocation: Worse with exertion. Quality: Crushing, pressure-like. Radiation: Radiates to left arm and jaw. Severity: 8/10. Time: Continuous for 30 minutes.',
      pastMedicalHistory: ['Hypertension', 'High Cholesterol'],
      medications: ['Lisinopril', 'Metoprolol'],
      allergies: ['Aspirin (denies upon further questioning)'],
      socialHistory: 'Not specified',
      initialVitalSigns: {
        timestamp: new Date(),
        bloodPressure: { systolic: 156, diastolic: 94 },
        heartRate: 102,
        respiratoryRate: 20,
        oxygenSaturation: 94,
        temperature: 37.2,
        glasgowComaScale: { eye: 4, verbal: 5, motor: 6, total: 15 }
      },
      physicalFindings: 'General: Alert, oriented, in obvious distress. Skin: Pale, cool, diaphoretic. Chest: Clear bilaterally. Cardiovascular: Regular rhythm, no murmurs. Abdomen: Soft, non-tender.'
    },
    environmentalFactors: {
      location: 'Residence',
      timeOfDay: '14:30',
      safetyHazards: [],
      accessDifficulties: 'None'
    },
    availableResources: {
      personnel: ['Paramedic', 'EMT'],
      equipment: ['Monitor', 'Stretcher', 'ALS Bag'],
      medications: ['Aspirin', 'Nitroglycerin', 'Oxygen'],
      transportOptions: ['Ground Ambulance'],
      receivingFacilities: ['Regional Medical Center']
    },
    requiredElements: [
      { category: 'assessment', element: '12-lead ECG', weight: 10, required: true },
      { category: 'treatment', element: 'Aspirin administration', weight: 10, required: true },
      { category: 'treatment', element: 'Nitroglycerin administration', weight: 10, required: true },
      { category: 'documentation', element: 'Pain score before/after', weight: 5, required: true }
    ],
    scoringCriteria: {
      maxPoints: 100,
      passingScore: 80,
      categories: [
        { name: 'Assessment', weight: 30, criteria: [] },
        { name: 'Treatment', weight: 30, criteria: [] },
        { name: 'Documentation', weight: 40, criteria: [] }
      ]
    },
    createdBy: 'System',
    createdAt: new Date(),
    lastModified: new Date(),
    isPublic: true,
    usage: {
      timesUsed: 0,
      averageScore: 0,
      averageCompletionTime: 0
    }
  },
  {
    id: 'fall',
    title: 'Fall - 78F',
    description: '78-year-old female fell at home, complaining of hip pain.',
    category: 'trauma',
    difficulty: 'beginner',
    estimatedTime: 15,
    learningObjectives: ['Assess for hip fracture', 'Immobilization', 'Pain management'],
    tags: ['fall', 'trauma', 'geriatric', 'hip fracture'],
    module: 'Trauma',
    chapter: 'Musculoskeletal Trauma',
    cardType: 'scenario',
    adaptiveDifficulty: true,

    background: 'Called to a residence for a 78-year-old female who fell.',
    patientPresentation: {
      demographics: {
        age: 78,
        gender: 'female',
        weight: 68
      },
      chiefComplaint: 'Patient states "I fell and hurt my hip"',
      historyOfPresentIllness: 'Onset: Approximately 1 hour ago. Provocation: Pain worse with movement. Quality: Sharp pain in right hip. Radiation: Localized to hip. Severity: 7/10. Time: Since fall.',
      pastMedicalHistory: ['Osteoporosis', 'AFib', 'Hypertension'],
      medications: ['Warfarin', 'Alendronate', 'Lisinopril'],
      allergies: ['NKDA'],
      socialHistory: 'Not specified',
      initialVitalSigns: {
        timestamp: new Date(),
        bloodPressure: { systolic: 142, diastolic: 86 },
        heartRate: 88,
        respiratoryRate: 18,
        oxygenSaturation: 96,
        temperature: 36.8,
        glasgowComaScale: { eye: 4, verbal: 5, motor: 6, total: 15 }
      },
      physicalFindings: 'General: Alert, oriented x3. Right hip: Shortened and externally rotated right leg, tenderness to palpation over right hip, limited ROM due to pain. No open wounds. Pelvis stable. Distal neurovascular intact.'
    },
    environmentalFactors: {
      location: 'Residence (Bathroom)',
      timeOfDay: '09:15',
      safetyHazards: [],
      accessDifficulties: 'None'
    },
    availableResources: {
      personnel: ['Paramedic', 'EMT'],
      equipment: ['Scoop stretcher', 'Splinting supplies'],
      medications: ['Pain medication'],
      transportOptions: ['Ground Ambulance'],
      receivingFacilities: ['City Hospital']
    },
    requiredElements: [
      { category: 'assessment', element: 'Hip assessment', weight: 10, required: true },
      { category: 'assessment', element: 'CMS check', weight: 10, required: true },
      { category: 'treatment', element: 'Immobilization', weight: 10, required: true }
    ],
    scoringCriteria: {
      maxPoints: 100,
      passingScore: 80,
      categories: []
    },
    createdBy: 'System',
    createdAt: new Date(),
    lastModified: new Date(),
    isPublic: true,
    usage: {
      timesUsed: 0,
      averageScore: 0,
      averageCompletionTime: 0
    }
  },
  {
    id: 'respiratory',
    title: 'Respiratory Distress - 45M',
    description: '45-year-old male with history of asthma/COPD in severe distress.',
    category: 'respiratory',
    difficulty: 'advanced',
    estimatedTime: 20,
    learningObjectives: ['Manage acute asthma/COPD', 'Nebulizer administration', 'CPAP consideration'],
    tags: ['respiratory', 'asthma', 'COPD'],
    module: 'Respiratory',
    chapter: 'Respiratory Emergencies',
    cardType: 'scenario',
    adaptiveDifficulty: true,

    background: 'Called to an apartment for a 45-year-old male with difficulty breathing.',
    patientPresentation: {
      demographics: {
        age: 45,
        gender: 'male',
        weight: 88
      },
      chiefComplaint: 'Patient states "I can\'t breathe"',
      historyOfPresentIllness: 'Onset: Progressive over past 2 hours. Provocation: Worse when lying down. Quality: Shortness of breath with wheezing. Radiation: N/A. Severity: Severe difficulty breathing. Time: 2 hours, getting worse.',
      pastMedicalHistory: ['Asthma', 'COPD'],
      medications: ['Albuterol inhaler', 'Advair'],
      allergies: ['Penicillin'],
      socialHistory: 'Not specified',
      initialVitalSigns: {
        timestamp: new Date(),
        bloodPressure: { systolic: 138, diastolic: 82 },
        heartRate: 118,
        respiratoryRate: 32,
        oxygenSaturation: 88,
        temperature: 37.4,
        glasgowComaScale: { eye: 4, verbal: 5, motor: 6, total: 15 }
      },
      physicalFindings: 'General: Alert, sitting upright, tripod position, severe respiratory distress. Respiratory: Diffuse expiratory wheezing bilaterally, decreased air movement, use of accessory muscles, speaking in 2-3 word sentences. Skin: Slightly cyanotic lips.'
    },
    environmentalFactors: {
      location: 'Apartment',
      timeOfDay: '22:15',
      safetyHazards: [],
      accessDifficulties: 'None'
    },
    availableResources: {
      personnel: ['Paramedic', 'EMT'],
      equipment: ['Nebulizer', 'CPAP', 'Oxygen'],
      medications: ['Albuterol', 'Atrovent', 'Steroids'],
      transportOptions: ['Ground Ambulance'],
      receivingFacilities: ['Regional Medical Center']
    },
    requiredElements: [
      { category: 'assessment', element: 'Lung sounds', weight: 10, required: true },
      { category: 'treatment', element: 'Oxygen administration', weight: 10, required: true },
      { category: 'treatment', element: 'Nebulizer treatment', weight: 10, required: true }
    ],
    scoringCriteria: {
      maxPoints: 100,
      passingScore: 80,
      categories: []
    },
    createdBy: 'System',
    createdAt: new Date(),
    lastModified: new Date(),
    isPublic: true,
    usage: {
      timesUsed: 0,
      averageScore: 0,
      averageCompletionTime: 0
    }
  },
  {
    id: 'diabetic',
    title: 'Hypoglycemia - 35F',
    description: '35-year-old female found confused at a park.',
    category: 'medical',
    difficulty: 'intermediate',
    estimatedTime: 15,
    learningObjectives: ['Identify hypoglycemia', 'Administer Dextrose/Glucagon', 'Reassessment'],
    tags: ['diabetic', 'hypoglycemia', 'altered mental status'],
    module: 'Endocrine',
    chapter: 'Diabetic Emergencies',
    cardType: 'scenario',
    adaptiveDifficulty: true,

    background: 'Called to a public park for a female with altered mental status.',
    patientPresentation: {
      demographics: {
        age: 35,
        gender: 'female',
        weight: 72
      },
      chiefComplaint: 'Bystander states "She seems confused and is acting strange"',
      historyOfPresentIllness: 'Onset: Unknown, found by bystanders appearing confused. Provocation: N/A. Quality: Altered mental status, diaphoretic. Radiation: N/A. Severity: Unable to answer questions appropriately. Time: Unknown duration.',
      pastMedicalHistory: ['Type 1 Diabetes'],
      medications: ['Insulin'],
      allergies: ['NKDA'],
      socialHistory: 'Not specified',
      initialVitalSigns: {
        timestamp: new Date(),
        bloodPressure: { systolic: 124, diastolic: 78 },
        heartRate: 96,
        respiratoryRate: 16,
        oxygenSaturation: 98,
        temperature: 36.9,
        glasgowComaScale: { eye: 4, verbal: 4, motor: 5, total: 13 },
        bloodGlucose: 42
      },
      physicalFindings: 'General: Confused, disoriented to time and place, diaphoretic, pale. Neuro: GCS 13 (E4, V4, M5), follows simple commands inconsistently. Skin: Cool, pale, diaphoretic. Blood glucose: 42 mg/dL.'
    },
    environmentalFactors: {
      location: 'Public Park',
      timeOfDay: '16:45',
      safetyHazards: [],
      accessDifficulties: 'None'
    },
    availableResources: {
      personnel: ['Paramedic', 'EMT'],
      equipment: ['Glucometer', 'IV supplies'],
      medications: ['Dextrose', 'Glucagon', 'Oral Glucose'],
      transportOptions: ['Ground Ambulance'],
      receivingFacilities: ['City Hospital']
    },
    requiredElements: [
      { category: 'assessment', element: 'Blood glucose check', weight: 10, required: true },
      { category: 'treatment', element: 'Dextrose administration', weight: 10, required: true },
      { category: 'assessment', element: 'Reassessment of mental status', weight: 10, required: true }
    ],
    scoringCriteria: {
      maxPoints: 100,
      passingScore: 80,
      categories: []
    },
    createdBy: 'System',
    createdAt: new Date(),
    lastModified: new Date(),
    isPublic: true,
    usage: {
      timesUsed: 0,
      averageScore: 0,
      averageCompletionTime: 0
    }
  },
  {
    id: 'pediatric-seizure',
    title: 'Pediatric Seizure - 4M',
    description: '4-year-old male actively seizing at home. Febrile history.',
    category: 'pediatric',
    difficulty: 'advanced',
    estimatedTime: 20,
    learningObjectives: ['Pediatric assessment', 'Seizure management', 'Midazolam dosing'],
    tags: ['pediatric', 'seizure', 'febrile'],
    module: 'Pediatrics',
    chapter: 'Neurologic Emergencies',
    cardType: 'scenario',
    adaptiveDifficulty: true,

    background: 'Called to a residence for a 4-year-old male who is seizing.',
    patientPresentation: {
      demographics: {
        age: 4,
        gender: 'male',
        weight: 18 // kg
      },
      chiefComplaint: 'Mother states "He won\'t stop shaking!"',
      historyOfPresentIllness: 'Onset: 5 minutes ago. Provocation: N/A. Quality: Generalized tonic-clonic activity. Radiation: N/A. Severity: Unresponsive. Time: Continuous for 5 minutes. Prior illness: Had a fever of 103F earlier today.',
      pastMedicalHistory: ['None'],
      medications: ['Tylenol'],
      allergies: ['NKDA'],
      socialHistory: 'Lives with parents',
      initialVitalSigns: {
        timestamp: new Date(),
        bloodPressure: { systolic: 90, diastolic: 60 }, // Estimated
        heartRate: 140,
        respiratoryRate: 28,
        oxygenSaturation: 92,
        temperature: 39.4,
        glasgowComaScale: { eye: 1, verbal: 1, motor: 4, total: 6 }
      },
      physicalFindings: 'General: Actively seizing, generalized tonic-clonic movements. Skin: Hot to touch, flushed. Neuro: Unresponsive. Airway: Secretions present, snoring respirations.'
    },
    environmentalFactors: {
      location: 'Residence (Living Room)',
      timeOfDay: '19:30',
      safetyHazards: [],
      accessDifficulties: 'None'
    },
    availableResources: {
      personnel: ['Paramedic', 'EMT'],
      equipment: ['Pediatric bag', 'Broselow tape', 'Monitor'],
      medications: ['Midazolam', 'Diazepam', 'Oxygen'],
      transportOptions: ['Ground Ambulance'],
      receivingFacilities: ['Children\'s Hospital']
    },
    requiredElements: [
      { category: 'assessment', element: 'Airway assessment', weight: 10, required: true },
      { category: 'assessment', element: 'Temperature check', weight: 5, required: true },
      { category: 'treatment', element: 'Midazolam administration', weight: 15, required: true },
      { category: 'treatment', element: 'Oxygen administration', weight: 10, required: true },
      { category: 'treatment', element: 'Cooling measures', weight: 5, required: false }
    ],
    scoringCriteria: {
      maxPoints: 100,
      passingScore: 80,
      categories: []
    },
    createdBy: 'System',
    createdAt: new Date(),
    lastModified: new Date(),
    isPublic: true,
    usage: {
      timesUsed: 0,
      averageScore: 0,
      averageCompletionTime: 0
    }
  },
  {
    id: 'trauma-mva',
    title: 'Multi-System Trauma - MVA',
    description: '25-year-old female driver in high-speed rollover MVA.',
    category: 'trauma',
    difficulty: 'advanced',
    estimatedTime: 25,
    learningObjectives: ['Rapid trauma assessment', 'Spinal immobilization', 'Fluid resuscitation', 'Needle decompression'],
    tags: ['trauma', 'MVA', 'shock', 'pneumothorax'],
    module: 'Trauma',
    chapter: 'Multi-System Trauma',
    cardType: 'scenario',
    adaptiveDifficulty: true,

    background: 'Dispatched to a highway for a single-vehicle rollover MVA.',
    patientPresentation: {
      demographics: {
        age: 25,
        gender: 'female',
        weight: 60
      },
      chiefComplaint: 'Patient is moaning, unable to speak clearly.',
      historyOfPresentIllness: 'Mechanism: High-speed rollover, ejected from vehicle. Found 20 feet from car. Severity: Critical.',
      pastMedicalHistory: ['Unknown'],
      medications: ['Unknown'],
      allergies: ['Unknown'],
      socialHistory: 'Unknown',
      initialVitalSigns: {
        timestamp: new Date(),
        bloodPressure: { systolic: 80, diastolic: 40 },
        heartRate: 130,
        respiratoryRate: 36,
        oxygenSaturation: 85,
        temperature: 36.0,
        glasgowComaScale: { eye: 2, verbal: 2, motor: 4, total: 8 }
      },
      physicalFindings: 'General: Critical condition, pale, cool, clammy. Head: Laceration to forehead. Chest: Diminished breath sounds on right side, bruising. Abdomen: Rigid, distended. Pelvis: Unstable. Extremities: Deformity to left femur.'
    },
    environmentalFactors: {
      location: 'Highway',
      timeOfDay: '02:00',
      safetyHazards: ['Traffic', 'Glass', 'Fuel leak'],
      accessDifficulties: 'Embankment'
    },
    availableResources: {
      personnel: ['Paramedic', 'EMT', 'Fire Dept', 'Police'],
      equipment: ['Backboard', 'Collar', 'IV supplies', 'Decompression needle'],
      medications: ['TXA', 'Fluids', 'Pain management'],
      transportOptions: ['Helicopter', 'Ground Ambulance'],
      receivingFacilities: ['Level 1 Trauma Center']
    },
    requiredElements: [
      { category: 'assessment', element: 'Rapid trauma assessment', weight: 10, required: true },
      { category: 'treatment', element: 'Spinal immobilization', weight: 10, required: true },
      { category: 'treatment', element: 'Needle decompression', weight: 15, required: true },
      { category: 'treatment', element: 'Fluid resuscitation', weight: 10, required: true },
      { category: 'treatment', element: 'Transport to Trauma Center', weight: 10, required: true }
    ],
    scoringCriteria: {
      maxPoints: 100,
      passingScore: 80,
      categories: []
    },
    createdBy: 'System',
    createdAt: new Date(),
    lastModified: new Date(),
    isPublic: true,
    usage: {
      timesUsed: 0,
      averageScore: 0,
      averageCompletionTime: 0
    }
  }
];

export const scenarios: Scenario[] = [...baseScenarios, ...generateAdditionalScenarios(44)];
