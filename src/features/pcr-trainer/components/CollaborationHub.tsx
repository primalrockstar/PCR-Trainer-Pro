import React from 'react';
import { useUser } from '../context/UserContext';
import { CollaborationSession, SessionParticipant } from '../types';

interface CollaborationHubProps {
  onClose: () => void;
  onJoinSession: (sessionId: string) => void;
}

// Mock data
const mockSessions: CollaborationSession[] = [
  {
    id: 'sess-001',
    title: 'Trauma Case Review - Group A',
    type: 'case_discussion',
    hostId: 'inst-001',
    participants: [
      { userId: 'user-1', role: 'host', permissions: { canEdit: true, canComment: true, canScore: true, canViewScores: true } },
      { userId: 'user-2', role: 'participant', permissions: { canEdit: false, canComment: true, canScore: false, canViewScores: false } },
      { userId: 'user-3', role: 'participant', permissions: { canEdit: false, canComment: true, canScore: false, canViewScores: false } },
    ],
    startTime: new Date(),
    status: 'active',
    settings: { isPublic: true, allowAnonymous: false, recordSession: true, maxParticipants: 10 }
  },
  {
    id: 'sess-002',
    title: 'Peer Review: Cardiac Arrest',
    type: 'peer_review',
    hostId: 'user-4',
    participants: [
      { userId: 'user-4', role: 'host', permissions: { canEdit: true, canComment: true, canScore: true, canViewScores: true } },
    ],
    startTime: new Date(Date.now() + 3600000), // 1 hour later
    status: 'scheduled',
    settings: { isPublic: false, allowAnonymous: false, recordSession: false, maxParticipants: 2 }
  }
];

export const CollaborationHub: React.FC<CollaborationHubProps> = ({ onClose, onJoinSession }) => {
  const { user } = useUser();
  const glassPanelClass = "bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className={`${glassPanelClass} w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden`}>
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="bg-purple-500/20 text-purple-300 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
              Collaboration Hub
            </h2>
            <p className="text-slate-400 text-sm mt-1">Connect, review, and learn with peers</p>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Active Sessions */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Active & Upcoming Sessions</h3>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
                  + New Session
                </button>
              </div>

              <div className="space-y-4">
                {mockSessions.map(session => (
                  <div key={session.id} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors group">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase border ${
                            session.status === 'active' 
                              ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                              : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                          }`}>
                            {session.status}
                          </span>
                          <span className="text-slate-400 text-xs">•</span>
                          <span className="text-slate-400 text-xs capitalize">{session.type.replace('_', ' ')}</span>
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-1">{session.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            {session.participants.length} / {session.settings.maxParticipants}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {session.status === 'active' ? 'Started now' : 'Starts in 1h'}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => onJoinSession(session.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          session.status === 'active'
                            ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        {session.status === 'active' ? 'Join Now' : 'Register'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar - Requests & Friends */}
            <div className="space-y-6">
              {/* Pending Reviews */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Pending Reviews</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-black/20 rounded-lg border border-white/5">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-medium text-white">Trauma Assessment #42</div>
                      <span className="text-xs text-orange-400">Due Today</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">Requested by Sarah J.</p>
                    <button className="w-full py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-medium rounded border border-blue-600/30 transition-colors">
                      Start Review
                    </button>
                  </div>
                  <div className="p-3 bg-black/20 rounded-lg border border-white/5">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-medium text-white">Medical Scenario #15</div>
                      <span className="text-xs text-slate-400">2 days left</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">Requested by Mike T.</p>
                    <button className="w-full py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-medium rounded border border-blue-600/30 transition-colors">
                      Start Review
                    </button>
                  </div>
                </div>
              </div>

              {/* Online Peers */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Online Peers</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
                          {['SJ', 'MT', 'RK'][i]}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{['Sarah Jenkins', 'Mike Thompson', 'Rachel Kim'][i]}</div>
                        <div className="text-xs text-slate-400">Working on Trauma...</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
