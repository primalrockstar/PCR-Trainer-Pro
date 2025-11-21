// PCR Trainer Pro - Analytics Types

export interface AnalyticsDashboard {
  userId: string;
  role: 'student' | 'instructor' | 'administrator';
  widgets: DashboardWidget[];
  layout: DashboardLayout;
  dateRange: DateRange;
  refreshInterval: number;
}

export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  config: WidgetConfig;
  position: WidgetPosition;
  isVisible: boolean;
}

export type WidgetType = 
  | 'performance_overview'
  | 'score_trends'
  | 'completion_rate'
  | 'time_analytics'
  | 'category_breakdown'
  | 'peer_comparison'
  | 'skill_progression'
  | 'engagement_metrics'
  | 'feedback_summary'
  | 'ai_insights'
  | 'institution_overview'
  | 'scenario_analytics';

export interface WidgetConfig {
  size: 'small' | 'medium' | 'large';
  chartType?: 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'scatter';
  timeframe?: 'week' | 'month' | 'quarter' | 'year';
  filters?: AnalyticsFilters;
  showGoals?: boolean;
  showComparison?: boolean;
}

export interface WidgetPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DashboardLayout {
  columns: number;
  rowHeight: number;
  margin: [number, number];
  containerPadding: [number, number];
}

export interface AnalyticsFilters {
  scenarios?: string[];
  categories?: string[];
  users?: string[];
  institutions?: string[];
  dateRange?: DateRange;
  difficulty?: ('beginner' | 'intermediate' | 'advanced')[];
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

// Performance Analytics
export interface PerformanceReport {
  id: string;
  title: string;
  type: ReportType;
  generatedBy: string;
  generatedAt: Date;
  period: AnalyticsPeriod;
  filters: AnalyticsFilters;
  data: ReportData;
  insights: AnalyticsInsight[];
  recommendations: Recommendation[];
}

export type ReportType = 
  | 'individual_performance'
  | 'class_performance'
  | 'institution_performance'
  | 'scenario_effectiveness'
  | 'skill_assessment'
  | 'engagement_analysis';

export type AnalyticsPeriod = 'week' | 'month' | 'quarter' | 'semester' | 'year' | 'custom';

export interface ReportData {
  summary: ReportSummary;
  details: ReportDetail[];
  charts: ChartData[];
  tables: TableData[];
}

export interface ReportSummary {
  totalUsers: number;
  totalScenarios: number;
  averageScore: number;
  completionRate: number;
  improvementRate: number;
  engagementScore: number;
}

export interface ReportDetail {
  category: string;
  metrics: Metric[];
  trends: TrendData[];
  comparisons: ComparisonData[];
}

export interface Metric {
  name: string;
  value: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  benchmark?: number;
}

export interface TrendData {
  date: Date;
  value: number;
  category?: string;
}

export interface ComparisonData {
  label: string;
  current: number;
  previous: number;
  benchmark?: number;
}

export interface ChartData {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'scatter' | 'area' | 'heatmap';
  title: string;
  data: any;
  options: ChartOptions;
}

export interface ChartOptions {
  responsive: boolean;
  maintainAspectRatio: boolean;
  plugins?: any;
  scales?: any;
  interaction?: any;
}

export interface TableData {
  id: string;
  title: string;
  headers: string[];
  rows: any[][];
  sortable: boolean;
  filterable: boolean;
}

export interface AnalyticsInsight {
  id: string;
  type: 'positive' | 'negative' | 'neutral' | 'warning';
  category: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  data: any;
}

export interface Recommendation {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  actions: RecommendedAction[];
  timeline: string;
}

export interface RecommendedAction {
  id: string;
  description: string;
  type: 'practice' | 'review' | 'study' | 'feedback' | 'collaboration';
  resources?: string[];
  estimatedTime?: number;
}

// Learning Analytics
export interface LearningPath {
  id: string;
  userId: string;
  title: string;
  description: string;
  scenarios: string[];
  currentStep: number;
  progress: number;
  estimatedCompletion: Date;
  adaptiveAdjustments: PathAdjustment[];
}

export interface PathAdjustment {
  date: Date;
  reason: string;
  changes: string[];
  aiGenerated: boolean;
}

export interface SkillAssessment {
  id: string;
  userId: string;
  skill: string;
  level: SkillLevel;
  assessedAt: Date;
  evidence: Evidence[];
  nextMilestone: string;
  recommendations: string[];
}

export type SkillLevel = 'novice' | 'advanced_beginner' | 'competent' | 'proficient' | 'expert';

export interface Evidence {
  type: 'scenario_performance' | 'peer_review' | 'instructor_feedback' | 'self_assessment';
  source: string;
  score: number;
  weight: number;
  notes?: string;
}

// Predictive Analytics
export interface PredictiveModel {
  id: string;
  name: string;
  type: 'performance_prediction' | 'risk_identification' | 'recommendation_engine';
  version: string;
  accuracy: number;
  lastTrained: Date;
  features: ModelFeature[];
}

export interface ModelFeature {
  name: string;
  importance: number;
  type: 'numerical' | 'categorical' | 'text' | 'datetime';
}

export interface Prediction {
  id: string;
  modelId: string;
  userId: string;
  type: 'success_probability' | 'completion_time' | 'skill_level' | 'risk_score';
  value: number;
  confidence: number;
  factors: PredictionFactor[];
  generatedAt: Date;
  expiresAt: Date;
}

export interface PredictionFactor {
  factor: string;
  impact: number;
  direction: 'positive' | 'negative';
}

// Real-time Analytics
export interface RealTimeMetrics {
  activeUsers: number;
  currentSessions: Session[];
  systemLoad: SystemLoad;
  errorRate: number;
  responseTime: number;
  alerts: Alert[];
}

export interface Session {
  userId: string;
  sessionId: string;
  startTime: Date;
  activity: string;
  score?: number;
  progress: number;
}

export interface SystemLoad {
  cpu: number;
  memory: number;
  storage: number;
  network: number;
}

export interface Alert {
  id: string;
  type: 'performance' | 'system' | 'security' | 'user_behavior';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  resolved: boolean;
  resolvedAt?: Date;
}

// Comparative Analytics
export interface BenchmarkData {
  id: string;
  name: string;
  category: string;
  value: number;
  source: 'internal' | 'industry' | 'academic';
  lastUpdated: Date;
  confidence: number;
}

export interface CompetitiveAnalysis {
  institution: string;
  metrics: CompetitiveMetric[];
  ranking: number;
  totalInstitutions: number;
  strengths: string[];
  improvements: string[];
}

export interface CompetitiveMetric {
  name: string;
  value: number;
  rank: number;
  percentile: number;
  industryAverage: number;
}

// Export and Sharing
export interface AnalyticsExport {
  id: string;
  requestedBy: string;
  requestedAt: Date;
  format: 'pdf' | 'excel' | 'csv' | 'json' | 'powerpoint';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  downloadUrl?: string;
  expiresAt?: Date;
  config: ExportConfig;
}

export interface ExportConfig {
  includeCharts: boolean;
  includeRawData: boolean;
  includeInsights: boolean;
  includeRecommendations: boolean;
  dateRange: DateRange;
  filters: AnalyticsFilters;
  customization: ExportCustomization;
}

export interface ExportCustomization {
  logo?: string;
  branding?: string;
  title?: string;
  description?: string;
  footer?: string;
  colorScheme?: string;
}