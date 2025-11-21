import React from 'react';
import { useUser } from '../context/UserContext';
import { UserAnalytics } from '../types';

interface AnalyticsDashboardProps {
  onClose: () => void;
}

// Mock data generator since we don't have a real backend yet
const generateMockAnalytics = (): UserAnalytics => {
  return {
    userId: 'user-123',
    period: 'month',
    performance: {
      averageScore: 88.5,
      scoreImprovement: 12.3,
      completionRate: 95,
      averageCompletionTime: 14.5,
      accuracyTrend: [
        { date: new Date('2023-01-01'), value: 75 },
        { date: new Date('2023-01-05'), value: 78 },
        { date: new Date('2023-01-10'), value: 82 },
        { date: new Date('2023-01-15'), value: 80 },
        { date: new Date('2023-01-20'), value: 88 },
        { date: new Date('2023-01-25'), value: 92 },
        { date: new Date('2023-01-30'), value: 95 },
      ],
      categoryPerformance: [
        { category: 'Trauma', score: 92, trend: 'improving', attempts: 15 },
        { category: 'Cardiac', score: 85, trend: 'stable', attempts: 12 },
        { category: 'Respiratory', score: 78, trend: 'improving', attempts: 8 },
        { category: 'Pediatric', score: 72, trend: 'declining', attempts: 5 },
        { category: 'Medical', score: 88, trend: 'stable', attempts: 20 },
      ]
    },
    progress: {
      scenariosCompleted: 45,
      skillsAcquired: ['Primary Assessment', 'IV Access', 'Airway Management'],
      certificationsEarned: ['BLS Pro', 'Trauma Level 1'],
      studyTime: 1240,
      streakDays: 5,
      milestones: []
    },
    engagement: {
      loginFrequency: 0.8,
      sessionDuration: 25,
      featuresUsed: [],
      collaborationLevel: 0,
      feedbackGiven: 0,
      feedbackReceived: 0
    },
    strengths: ['Trauma Assessment', 'Patient History', 'Vitals Monitoring'],
    improvementAreas: ['Pediatric Dosing', 'ECG Interpretation'],
    recommendations: ['Review Pediatric ALS protocols', 'Practice Cardiac Arrest scenarios']
  };
};

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ onClose }) => {
  const { user } = useUser();
  const analytics = generateMockAnalytics();

  const glassPanelClass = "bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className={`${glassPanelClass} w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden`}>
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="bg-blue-500/20 text-blue-300 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                </svg>
              </span>
              Performance Analytics
            </h2>
            <p className="text-slate-400 text-sm mt-1">Tracking progress for {user?.firstName} {user?.lastName}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="text-slate-400 text-sm mb-1">Average Score</div>
              <div className="text-3xl font-bold text-white">{analytics.performance.averageScore}%</div>
              <div className="text-green-400 text-xs mt-2 flex items-center gap-1">
                <span>↑ {analytics.performance.scoreImprovement}%</span>
                <span className="text-slate-500">vs last month</span>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="text-slate-400 text-sm mb-1">Scenarios Completed</div>
              <div className="text-3xl font-bold text-white">{analytics.progress.scenariosCompleted}</div>
              <div className="text-blue-400 text-xs mt-2 flex items-center gap-1">
                <span>Top 10%</span>
                <span className="text-slate-500">of students</span>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="text-slate-400 text-sm mb-1">Study Streak</div>
              <div className="text-3xl font-bold text-white">{analytics.progress.streakDays} <span className="text-sm font-normal text-slate-400">days</span></div>
              <div className="text-orange-400 text-xs mt-2 flex items-center gap-1">
                <span>Keep it up!</span>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="text-slate-400 text-sm mb-1">Total Study Time</div>
              <div className="text-3xl font-bold text-white">{Math.floor(analytics.progress.studyTime / 60)}h {analytics.progress.studyTime % 60}m</div>
              <div className="text-slate-500 text-xs mt-2">
                Last session: Today
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chart Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Performance Trend */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-6">Performance Trend</h3>
                <div className="h-64 flex items-end justify-between gap-2 px-2">
                  {analytics.performance.accuracyTrend.map((point, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-600 to-teal-400 rounded-t-sm transition-all duration-500 hover:opacity-80 relative"
                        style={{ height: `${point.value}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {point.value}%
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 rotate-45 origin-left mt-2">
                        {point.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity Table */}
              <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-lg font-semibold text-white">Recent Scenarios</h3>
                </div>
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-slate-400">
                    <tr>
                      <th className="p-4 font-medium">Scenario</th>
                      <th className="p-4 font-medium">Category</th>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Score</th>
                      <th className="p-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 text-white font-medium">Chest Pain - Male 54y</td>
                        <td className="p-4 text-slate-300">Cardiac</td>
                        <td className="p-4 text-slate-400">Today, 10:23 AM</td>
                        <td className="p-4 font-bold text-green-400">92%</td>
                        <td className="p-4">
                          <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-300 text-xs border border-green-500/30">
                            Passed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              {/* Category Breakdown */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Category Mastery</h3>
                <div className="space-y-4">
                  {analytics.performance.categoryPerformance.map((cat, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">{cat.category}</span>
                        <span className={`font-bold ${cat.score >= 80 ? 'text-green-400' : cat.score >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {cat.score}%
                        </span>
                      </div>
                      <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            cat.score >= 80 ? 'bg-green-500' : cat.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${cat.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-xl p-6 border border-blue-500/30">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-blue-400">✨</span> AI Insights
                </h3>
                <div className="space-y-4">
                  <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                    <div className="text-xs text-blue-300 font-semibold uppercase mb-1">Strength</div>
                    <p className="text-sm text-slate-300">Your <span className="text-white">Trauma Assessment</span> is excellent. You consistently identify life threats within 60 seconds.</p>
                  </div>
                  <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                    <div className="text-xs text-orange-300 font-semibold uppercase mb-1">Focus Area</div>
                    <p className="text-sm text-slate-300">Consider reviewing <span className="text-white">Pediatric Dosing</span>. Accuracy in recent scenarios was 72%.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
