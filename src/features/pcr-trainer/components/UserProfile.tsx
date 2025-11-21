import React from 'react';
import { useUser } from '../context/UserContext';
import { UserRole } from '../types';

interface UserProfileProps {
  onClose: () => void;
  onViewAnalytics: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onClose, onViewAnalytics }) => {
  const { user, logout, updatePreferences } = useUser();

  if (!user) return null;

  const glassPanelClass = "bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className={`${glassPanelClass} w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]`}>
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <h2 className="text-xl font-bold text-white">User Profile</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-purple-500/20">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{user.firstName} {user.lastName}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-xs font-medium border border-blue-500/30 uppercase">
                  {user.role}
                </span>
                <span className="text-slate-400 text-sm">{user.email}</span>
              </div>
              <div className="mt-3 flex gap-3">
                <div className="text-center px-3 py-1 rounded bg-white/5 border border-white/10">
                  <div className="text-xs text-slate-400">Streak</div>
                  <div className="font-bold text-white">{user.stats.streakDays} days</div>
                </div>
                <div className="text-center px-3 py-1 rounded bg-white/5 border border-white/10">
                  <div className="text-xs text-slate-400">Accuracy</div>
                  <div className="font-bold text-green-400">{user.stats.averageAccuracy}%</div>
                </div>
                <button 
                  onClick={onViewAnalytics}
                  className="text-center px-3 py-1 rounded bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30 transition-colors cursor-pointer"
                >
                  <div className="text-xs text-blue-300">Analytics</div>
                  <div className="font-bold text-blue-200">View All →</div>
                </button>
              </div>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="space-y-8">
            {/* Preferences */}
            <section>
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Preferences</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-slate-200">Dark Mode</span>
                    <div className={`w-10 h-6 rounded-full p-1 transition-colors ${user.preferences.theme === 'dark' ? 'bg-blue-600' : 'bg-slate-600'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${user.preferences.theme === 'dark' ? 'translate-x-4' : ''}`} />
                    </div>
                  </label>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-slate-200">Glass UI</span>
                    <div className={`w-10 h-6 rounded-full p-1 transition-colors ${user.preferences.uiMode === 'glass' ? 'bg-blue-600' : 'bg-slate-600'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${user.preferences.uiMode === 'glass' ? 'translate-x-4' : ''}`} />
                    </div>
                  </label>
                </div>
              </div>
            </section>

            {/* Notifications */}
            <section>
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Notifications</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-slate-300 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={user.preferences.notifications.email}
                    onChange={(e) => updatePreferences({ notifications: { ...user.preferences.notifications, email: e.target.checked } })}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
                  />
                  Email Notifications
                </label>
                <label className="flex items-center gap-3 text-slate-300 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={user.preferences.notifications.feedback}
                    onChange={(e) => updatePreferences({ notifications: { ...user.preferences.notifications, feedback: e.target.checked } })}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
                  />
                  Feedback Alerts
                </label>
                <label className="flex items-center gap-3 text-slate-300 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={user.preferences.notifications.reminders}
                    onChange={(e) => updatePreferences({ notifications: { ...user.preferences.notifications, reminders: e.target.checked } })}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
                  />
                  Study Reminders
                </label>
              </div>
            </section>

            {/* Account Actions */}
            <section className="pt-4 border-t border-white/10">
              <button 
                onClick={logout}
                className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors text-sm font-medium"
              >
                Sign Out
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
