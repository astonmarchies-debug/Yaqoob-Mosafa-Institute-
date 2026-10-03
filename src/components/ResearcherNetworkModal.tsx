import React, { useState, useEffect } from 'react';
import { ResearcherUser } from '../types/dossier';
import { Users, UserPlus, UserCheck, Search, X, Award, Shield, Sparkles, BookOpen, MessageSquare } from 'lucide-react';

interface ResearcherProfile {
  id: string;
  name: string;
  roleTitle: string;
  affiliation: string;
  clearanceLevel: number;
  isArchitect?: boolean;
  dossiersCount: number;
  commentsCount: number;
  followersCount: number;
}

const DEFAULT_RESEARCHERS: ResearcherProfile[] = [
  {
    id: 'res-aston',
    name: 'Aston Marchies',
    roleTitle: 'Principal Architect & Grand Curator',
    affiliation: 'System Architect & YMI Council',
    clearanceLevel: 5,
    isArchitect: true,
    dossiersCount: 14,
    commentsCount: 38,
    followersCount: 124,
  },
  {
    id: 'res-tariq',
    name: 'Dr. Tariq Al-Mansoor',
    roleTitle: 'Non-Linear Dynamics Specialist',
    affiliation: 'Middle East Research Division',
    clearanceLevel: 4,
    dossiersCount: 6,
    commentsCount: 19,
    followersCount: 88,
  },
  {
    id: 'res-aris',
    name: 'Dr. Aris Thorne',
    roleTitle: 'Stochastic Quantum Researcher',
    affiliation: 'North America Physics Core',
    clearanceLevel: 3,
    dossiersCount: 4,
    commentsCount: 12,
    followersCount: 64,
  },
  {
    id: 'res-vane',
    name: 'Dr. Vane',
    roleTitle: 'Virtuo-Cybernetics Theorist',
    affiliation: 'Department of Semiotic Memetics',
    clearanceLevel: 4,
    dossiersCount: 5,
    commentsCount: 22,
    followersCount: 95,
  },
  {
    id: 'res-hilal',
    name: 'Mr. Hilal',
    roleTitle: 'Curatorial Editor & Scholar',
    affiliation: 'Independent Researcher',
    clearanceLevel: 2,
    dossiersCount: 2,
    commentsCount: 8,
    followersCount: 31,
  },
];

interface ResearcherNetworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: ResearcherUser;
}

export const ResearcherNetworkModal: React.FC<ResearcherNetworkModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [followingIds, setFollowingIds] = useState<string[]>([]);

  // Load follows from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`ymi_follows_${currentUser.id || 'guest'}`);
      if (stored) {
        setFollowingIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser.id]);

  const toggleFollow = (profileId: string) => {
    let updated: string[];
    if (followingIds.includes(profileId)) {
      updated = followingIds.filter((id) => id !== profileId);
    } else {
      updated = [...followingIds, profileId];
    }
    setFollowingIds(updated);
    try {
      localStorage.setItem(`ymi_follows_${currentUser.id || 'guest'}`, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const filteredResearchers = DEFAULT_RESEARCHERS.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.affiliation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md no-print font-sans">
      <div className="w-full max-w-2xl bg-[#080d0a] border border-[#23382c] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-5 py-4 bg-[#0d1612] border-b border-[#1b2b22] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-[#c5a059]" />
            <div>
              <h2 className="text-base sm:text-lg font-display font-bold text-[#f5eedf]">
                Institute Researcher Network
              </h2>
              <div className="text-[11px] font-mono text-[#7a8c82]">
                Interact, follow scholars, and discover peer research contributions
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-[#7e8f85] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Following Stat Bar */}
        <div className="p-4 bg-[#050907] border-b border-[#16251d] space-y-3 font-mono text-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-[#6c8073] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search researchers by name, role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#030604] border border-[#1b2b22] focus:border-[#c5a059] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#f0ece1] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 text-[#87998d] text-[11px]">
              <span>Following: <strong className="text-[#c5a059]">{followingIds.length}</strong> scholars</span>
            </div>
          </div>
        </div>

        {/* Researchers List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
          {filteredResearchers.map((res) => {
            const isFollowing = followingIds.includes(res.id);
            const displayFollowers = res.followersCount + (isFollowing ? 1 : 0);

            return (
              <div
                key={res.id}
                className="p-4 rounded-xl bg-[#060b08] border border-[#192b20] hover:border-[#274438] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold text-sm shrink-0 ${
                    res.isArchitect
                      ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#e6c679]'
                      : 'bg-emerald-950/40 border-emerald-700/60 text-emerald-300'
                  }`}>
                    {res.name.substring(0, 2).toUpperCase()}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[#f5eedf] text-sm font-display">
                        {res.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#101c16] border border-[#23382c] text-[#c5a059]">
                        Level-{res.clearanceLevel}
                      </span>
                    </div>

                    <p className="text-xs text-[#8e9f94] font-sans">
                      {res.roleTitle} · <span className="text-[#6d8276]">{res.affiliation}</span>
                    </p>

                    <div className="flex items-center gap-4 text-[10px] font-mono text-[#6c8074] pt-1">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-[#c5a059]" /> {res.dossiersCount} Papers
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" /> {res.commentsCount} Reviews
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-sky-400" /> {displayFollowers} Followers
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleFollow(res.id)}
                  className={`px-4 py-2 rounded-lg font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 ${
                    isFollowing
                      ? 'bg-emerald-950/80 border border-emerald-600 text-emerald-300 hover:bg-rose-950/60 hover:border-rose-700 hover:text-rose-300'
                      : 'bg-[#c5a059] hover:bg-[#d6b068] text-black shadow-md'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Follow</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
