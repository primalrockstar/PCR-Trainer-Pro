// PCR Trainer Pro - Core Types and Interfaces

// User Management Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  institutionId?: string;
  profileImage?: string;
  createdAt: Date;
  lastLoginAt?: Date;
  preferences: UserPreferences;
  stats: UserStats;
}

export type UserRole = 'student' | 'instructor' | 'administrator' | 'institution_admin';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  uiMode: 'standard' | 'glass' | 'high_contrast';
  notifications: {
    email: boolean;
    push: boolean;
    feedback: boolean;
    reminders: boolean;
  };
  privacy: {
    shareProgress: boolean;
    allowPeerReview: boolean;
  };
  studySettings: {
    dailyGoal: number; // minutes
    cardsPerSession: number;
    spacedRepetition: boolean;
  };
}

export interface UserStats {
  streakDays: number;
  totalStudyTime: number;
  cardsMastered: number;
  scenariosCompleted: number;
  averageAccuracy: number;
  lastStudySession: Date;
}

export interface Institution {
  id: string;
  name: string;
  type: 'university' | 'hospital' | 'ems_service' | 'training_center';
  address: string;
  adminUsers: string[];
  subscriptionTier: 'basic' | 'pro' | 'enterprise';
  features: InstitutionFeatures;
}

export interface InstitutionFeatures {
  maxUsers: number;
  customBranding: boolean;
  advancedAnalytics: boolean;
  apiAccess: boolean;
  customScenarios: boolean;
  singleSignOn: boolean;
}

// PCR Data Types
export interface PCRDocument {
  id: string;
  userId: string;
  scenarioId: string;
  createdAt: Date;
  lastModified: Date;
  status: 'draft' | 'submitted' | 'reviewed' | 'archived';
  version: number;
  
  // Basic PCR Information
  callNumber: string;
  date: Date;
  unit: string;
  crew: CrewMember[];
  
  // Patient Information
  patient: PatientInfo;
  
  // Incident Details
  incident: IncidentDetails;
  
  // Clinical Assessment
  assessment: ClinicalAssessment;
  
  // Treatment and Procedures
  treatment: TreatmentDetails;
  
  // Transport Information
  transport: TransportDetails;
  
  // Narrative
  narrative: NarrativeSection;
  
  // Scoring and Feedback
  scores: PCRScores;
  feedback: Feedback[];
  
  // Collaboration
  sharedWith: string[];
  comments: Comment[];
}

export interface CrewMember {
  id: string;
  name: string;
  role: 'emt' | 'paramedic' | 'supervisor' | 'student';
  certificationLevel: string;
}

export interface PatientInfo {
  lastName: string;
  firstName: string;
  middleInitial?: string;
  age: number;
  dateOfBirth?: Date;
  gender: 'male' | 'female' | 'other' | 'unknown';
  weight?: number;
  allergies: string[];
  medications: string[];
  medicalHistory: string[];
  chiefComplaint: string;
}

export interface IncidentDetails {
  address: string;
  city: string;
  state: string;
  zip: string;
  coordinates?: { lat: number; lng: number };
  dispatchTime: Date;
  enRouteTime: Date;
  onSceneTime: Date;
  patientContactTime: Date;
  departSceneTime?: Date;
  arrivalDestinationTime?: Date;
  inServiceTime?: Date;
  incidentType: IncidentType;
  mechanism: string;
  bodySystem: BodySystem;
  priority: 'emergency' | 'urgent' | 'non_urgent';
}

export type IncidentType = 
  | 'medical' 
  | 'trauma' 
  | 'cardiac' 
  | 'respiratory' 
  | 'neurological' 
  | 'psychiatric' 
  | 'overdose' 
  | 'other';

export type BodySystem = 
  | 'cardiovascular' 
  | 'respiratory' 
  | 'neurological' 
  | 'gastrointestinal' 
  | 'musculoskeletal' 
  | 'integumentary' 
  | 'genitourinary' 
  | 'endocrine' 
  | 'other';

export interface ClinicalAssessment {
  primaryAssessment: PrimaryAssessment;
  vitalSigns: VitalSigns[];
  secondaryAssessment: SecondaryAssessment;
  impressions: string[];
  protocols: string[];
}

export interface PrimaryAssessment {
  consciousness: 'alert' | 'voice' | 'pain' | 'unresponsive';
  airway: 'open' | 'obstructed' | 'artificial';
  breathing: 'adequate' | 'inadequate' | 'absent';
  circulation: 'adequate' | 'inadequate' | 'absent';
  mentalStatus: string;
}

export interface VitalSigns {
  timestamp: Date;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  heartRate?: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;
  temperature?: number;
  bloodGlucose?: number;
  painScale?: number;
  glasgowComaScale?: {
    eye: number;
    verbal: number;
    motor: number;
    total: number;
  };
}

export interface SecondaryAssessment {
  headToToe: BodyRegionAssessment[];
  neurologicalExam?: NeurologicalExam;
  cardiacExam?: CardiacExam;
  respiratoryExam?: RespiratoryExam;
}

export interface BodyRegionAssessment {
  region: string;
  findings: string;
  abnormalities?: string[];
}

export interface NeurologicalExam {
  pupils: 'equal' | 'unequal' | 'fixed' | 'sluggish';
  motorFunction: string;
  sensoryFunction: string;
  reflexes: string;
}

export interface CardiacExam {
  rhythm: string;
  sounds: string;
  murmurs?: string;
  edema?: string;
}

export interface RespiratoryExam {
  sounds: string;
  effort: string;
  symmetry: string;
  accessoryMuscles: boolean;
}

export interface TreatmentDetails {
  medications: MedicationAdministration[];
  procedures: ProcedurePerformed[];
  monitoring: MonitoringDevice[];
  oxygenTherapy?: OxygenTherapy;
  ivAccess?: IVAccess[];
}

export interface MedicationAdministration {
  medication: string;
  dose: string;
  route: 'oral' | 'iv' | 'im' | 'sq' | 'inhaled' | 'topical' | 'rectal';
  time: Date;
  indication: string;
  effect: string;
}

export interface ProcedurePerformed {
  procedure: string;
  time: Date;
  operator: string;
  successful: boolean;
  complications?: string;
  notes?: string;
}

export interface MonitoringDevice {
  device: string;
  settings?: string;
  duration?: number;
}

export interface OxygenTherapy {
  method: 'nasal_cannula' | 'non_rebreather' | 'bag_mask' | 'cpap' | 'intubation';
  flowRate?: number;
  fiO2?: number;
  duration?: number;
}

export interface IVAccess {
  location: string;
  gauge: number;
  fluid: string;
  rate: string;
  totalVolume: number;
}

export interface TransportDetails {
  destination: string;
  transportMode: 'ground' | 'air' | 'water';
  position: 'fowlers' | 'supine' | 'lateral' | 'trendelenburg';
  monitoring: string[];
  condition: 'stable' | 'unstable' | 'critical';
  continuedCare: string;
}

export interface NarrativeSection {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  additionalNotes?: string;
  format: 'soap' | 'chart' | 'chronological';
}

// Scenario Types
export interface Scenario {
  id: string;
  title: string;
  description: string;
  category: ScenarioCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // minutes
  learningObjectives: string[];
  tags: string[];
  
  // Scenario Content
  background: string;
  patientPresentation: PatientPresentation;
  environmentalFactors: EnvironmentalFactors;
  availableResources: AvailableResources;
  
  // Assessment Criteria
  requiredElements: RequiredElement[];
  scoringCriteria: ScoringCriteria;
  
  // Metadata
  createdBy: string;
  createdAt: Date;
  lastModified: Date;
  isPublic: boolean;
  institutionId?: string;
  usage: ScenarioUsage;
  
  // FlashLearn-style Adaptive Features
  module: string; // e.g., "Airway", "Trauma"
  chapter: string;
  cardType: 'scenario' | 'mini_case' | 'decision_tree' | 'documentation_drill';
  adaptiveDifficulty: boolean;
}

export type TrainingMode = 'quick_drill' | 'deep_session' | 'exam_mimic' | 'scenario_chain';

export type ScenarioCategory = 
  | 'medical' 
  | 'trauma' 
  | 'pediatric' 
  | 'geriatric' 
  | 'cardiac' 
  | 'respiratory' 
  | 'neurological' 
  | 'psychiatric' 
  | 'obstetric' 
  | 'toxicological';

export interface PatientPresentation {
  demographics: PatientDemographics;
  chiefComplaint: string;
  historyOfPresentIllness: string;
  pastMedicalHistory: string[];
  medications: string[];
  allergies: string[];
  socialHistory: string;
  initialVitalSigns: VitalSigns;
  physicalFindings: string;
}

export interface PatientDemographics {
  age: number;
  gender: 'male' | 'female' | 'other';
  weight?: number;
  height?: number;
}

export interface EnvironmentalFactors {
  location: string;
  weather?: string;
  timeOfDay: string;
  crowdControl?: boolean;
  safetyHazards?: string[];
  accessDifficulties?: string;
}

export interface AvailableResources {
  personnel: string[];
  equipment: string[];
  medications: string[];
  transportOptions: string[];
  receivingFacilities: string[];
}

export interface RequiredElement {
  category: 'assessment' | 'treatment' | 'documentation' | 'communication';
  element: string;
  weight: number;
  required: boolean;
}

export interface ScoringCriteria {
  maxPoints: number;
  passingScore: number;
  categories: ScoringCategory[];
}

export interface ScoringCategory {
  name: string;
  weight: number;
  criteria: ScoringCriterion[];
}

export interface ScoringCriterion {
  description: string;
  points: number;
  keywords?: string[];
  requiredFor?: 'pass' | 'competent' | 'proficient';
}

export interface ScenarioUsage {
  timesUsed: number;
  averageScore: number;
  averageCompletionTime: number;
  lastUsed?: Date;
}

// Scoring and Feedback Types
export interface PCRScores {
  overall: number;
  categories: CategoryScore[];
  aiAnalysis: AIAnalysis;
  completionTime: number;
  timestamp: Date;
  masteryUpdate?: MasteryUpdate;
}

export interface MasteryUpdate {
  previousLevel: number;
  newLevel: number;
  nextReviewDate: Date;
  interval: number; // days
  easeFactor: number;
}

export interface CategoryScore {
  category: string;
  score: number;
  maxScore: number;
  feedback: string;
  suggestions: string[];
}

export interface AIAnalysis {
  narrativeQuality: NarrativeAnalysis;
  clinicalAccuracy: ClinicalAnalysis;
  completeness: CompletenessAnalysis;
  professionalismScore: number;
  suggestions: AISuggestion[];
}

export interface NarrativeAnalysis {
  clarity: number;
  objectivity: number;
  thoroughness: number;
  organization: number;
  grammarScore: number;
  medicalTerminologyUsage: number;
}

export interface ClinicalAnalysis {
  assessmentAccuracy: number;
  treatmentAppropriateness: number;
  protocolCompliance: number;
  criticalThinkingScore: number;
}

export interface CompletenessAnalysis {
  requiredFieldsCompleted: number;
  missingElements: string[];
  excessiveElements: string[];
  timelinessScore: number;
}

export interface AISuggestion {
  type: 'improvement' | 'correction' | 'enhancement';
  priority: 'high' | 'medium' | 'low';
  category: string;
  suggestion: string;
  example?: string;
}

export interface Feedback {
  id: string;
  fromUserId: string;
  fromUserName: string;
  fromUserRole: UserRole;
  timestamp: Date;
  type: 'instructor' | 'peer' | 'ai' | 'self';
  category: string;
  rating?: number;
  comment: string;
  suggestions: string[];
  isPublic: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  timestamp: Date;
  content: string;
  parentId?: string; // for replies
  reactions: Reaction[];
}

export interface Reaction {
  userId: string;
  type: 'like' | 'helpful' | 'question' | 'concern';
}

// Analytics Types
export interface UserAnalytics {
  userId: string;
  period: AnalyticsPeriod;
  performance: PerformanceMetrics;
  progress: ProgressMetrics;
  engagement: EngagementMetrics;
  strengths: string[];
  improvementAreas: string[];
  recommendations: string[];
}

export type AnalyticsPeriod = 'week' | 'month' | 'quarter' | 'year' | 'all_time';

export interface PerformanceMetrics {
  averageScore: number;
  scoreImprovement: number;
  completionRate: number;
  averageCompletionTime: number;
  accuracyTrend: DataPoint[];
  categoryPerformance: CategoryPerformance[];
}

export interface ProgressMetrics {
  scenariosCompleted: number;
  skillsAcquired: string[];
  certificationsEarned: string[];
  studyTime: number; // minutes
  streakDays: number;
  milestones: Milestone[];
}

export interface EngagementMetrics {
  loginFrequency: number;
  sessionDuration: number;
  featuresUsed: string[];
  collaborationLevel: number;
  feedbackGiven: number;
  feedbackReceived: number;
}

export interface DataPoint {
  date: Date;
  value: number;
}

export interface CategoryPerformance {
  category: string;
  score: number;
  trend: 'improving' | 'declining' | 'stable';
  attempts: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  achievedAt: Date;
  points: number;
}

// Collaboration Types
export interface CollaborationSession {
  id: string;
  title: string;
  type: 'peer_review' | 'instructor_review' | 'group_study' | 'case_discussion';
  hostId: string;
  participants: SessionParticipant[];
  scenarioId?: string;
  pcrDocumentId?: string;
  startTime: Date;
  endTime?: Date;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  settings: SessionSettings;
}

export interface SessionParticipant {
  userId: string;
  role: 'host' | 'reviewer' | 'participant' | 'observer';
  joinedAt?: Date;
  permissions: ParticipantPermissions;
}

export interface ParticipantPermissions {
  canEdit: boolean;
  canComment: boolean;
  canScore: boolean;
  canViewScores: boolean;
}

export interface SessionSettings {
  isPublic: boolean;
  allowAnonymous: boolean;
  recordSession: boolean;
  maxParticipants: number;
  timeLimit?: number;
}

// Export and Integration Types
export interface ExportOptions {
  format: ExportFormat;
  includeScores: boolean;
  includeFeedback: boolean;
  includeAnalytics: boolean;
  dateRange?: DateRange;
  userFilter?: string[];
  scenarioFilter?: string[];
}

export type ExportFormat = 'pdf' | 'csv' | 'excel' | 'json' | 'hl7' | 'fhir';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface APIIntegration {
  id: string;
  name: string;
  type: 'emr' | 'lms' | 'sso' | 'analytics' | 'notification';
  endpoint: string;
  authentication: AuthenticationConfig;
  isActive: boolean;
  lastSync?: Date;
}

export interface AuthenticationConfig {
  type: 'api_key' | 'oauth2' | 'basic_auth' | 'certificate';
  credentials: Record<string, string>;
}

// Configuration Types
export interface AppConfig {
  version: string;
  environment: 'development' | 'staging' | 'production';
  features: FeatureFlags;
  limits: SystemLimits;
  integrations: IntegrationConfig;
}

export interface FeatureFlags {
  aiScoring: boolean;
  collaboration: boolean;
  advancedAnalytics: boolean;
  customScenarios: boolean;
  apiAccess: boolean;
  mobileApp: boolean;
  offlineMode: boolean;
}

export interface SystemLimits {
  maxFileSize: number;
  maxUsersPerInstitution: number;
  maxScenariosPerUser: number;
  sessionTimeout: number;
  rateLimits: RateLimit[];
}

export interface RateLimit {
  endpoint: string;
  requestsPerMinute: number;
  requestsPerHour: number;
}

export interface IntegrationConfig {
  database: DatabaseConfig;
  storage: StorageConfig;
  ai: AIConfig;
  notifications: NotificationConfig;
}

export interface DatabaseConfig {
  provider: 'postgresql' | 'mysql' | 'mongodb';
  connectionString: string;
  poolSize: number;
}

export interface StorageConfig {
  provider: 'aws_s3' | 'azure_blob' | 'google_cloud' | 'local';
  bucket: string;
  region: string;
}

export interface AIConfig {
  provider: 'openai' | 'anthropic' | 'google' | 'azure';
  model: string;
  endpoint: string;
  features: AIFeatures;
}

export interface AIFeatures {
  narrativeAnalysis: boolean;
  scoringAssistance: boolean;
  feedbackGeneration: boolean;
  scenarioSuggestions: boolean;
  plagiarismDetection: boolean;
}

export interface NotificationConfig {
  email: EmailConfig;
  push: PushConfig;
  sms: SMSConfig;
}

export interface EmailConfig {
  provider: 'sendgrid' | 'mailgun' | 'ses' | 'smtp';
  apiKey: string;
  fromAddress: string;
  templates: EmailTemplate[];
}

export interface EmailTemplate {
  name: string;
  subject: string;
  templateId: string;
}

export interface PushConfig {
  provider: 'firebase' | 'apns' | 'pusher';
  apiKey: string;
  projectId: string;
}

export interface SMSConfig {
  provider: 'twilio' | 'nexmo' | 'aws_sns';
  apiKey: string;
  fromNumber: string;
}