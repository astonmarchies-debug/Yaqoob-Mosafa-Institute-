import React, { useState, useEffect, useRef } from 'react';
import { 
  Crown, User, Upload, Settings, ShieldCheck, Lock, LogIn, 
  Sparkles, BookOpen, FolderKanban, Bot, Users, Search, FileText, X,
  Bell, AlertCircle
} from 'lucide-react';
import { ResearcherUser, Dossier } from '../types/dossier';
import { SupportedLanguage, TRANSLATIONS } from '../services/i18n';
import { storageService } from '../services/storage';

interface NavbarProps {
  activeTab: 'home' | 'archive' | 'studio' | 'myworks' | 'lab' | 'manifesto' | 'terminal' | 'security' | 'narration';
  setActiveTab: (tab: 'home' | 'archive' | 'studio' | 'myworks' | 'lab' | 'manifesto' | 'terminal' | 'security' | 'narration') => void;
  onOpenUploadStudio: () => void;
  onOpenAuthModal: () => void;
  onOpenSettingsModal: () => void;
  onOpenNetworkModal?: () => void;
  onToggleChatbot?: () => void;
  currentUser: ResearcherUser;
  currentLanguage: SupportedLanguage;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectDossier: (d: Dossier) => void;
  onSelectNarrativeId: (id: string) => void;
}

// Preset topics copy for internal lookup
const SEARCH_NARRATIVE_PRESETS = [
  { id: 'ibn_hamza', title: 'Ibn Hamza: The Al-Mizan Codex and the Trajectory of Equilibrium', author: 'Ibn Hamza Al-Mu\'addil', style: 'ancient' },
  { id: 'dr_jamestock', title: 'Dr. Jamestock: The Great London Convergence and Electromagnetic Chaos', author: 'Dr. Jamestock', style: 'victorian' },
  { id: 'franz_hamp', title: 'Franz Hamp: The Jena Experiments and the Psycho-Hermeneutics Mainframe', author: 'Franz Hamp', style: 'academic' },
  { id: 'abdul_khan', title: 'Abdul Khan: Mughal Astrometry and the Forbidden Theta Coordinates', author: 'Abdul Khan', style: 'ancient' },
  { id: 'suleiman_altamrin', title: 'Süleiman Al-Tamrin: The Alchemical Matrix and Molecular Harmony', author: 'Süleiman Al-Tamrin', style: 'academic' }
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenUploadStudio,
  onOpenAuthModal,
  onOpenSettingsModal,
  onOpenNetworkModal,
  onToggleChatbot,
  currentUser,
  currentLanguage,
  searchQuery,
  setSearchQuery,
  onSelectDossier,
  onSelectNarrativeId,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  // Search states
  const [localQuery, setLocalQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Load dossiers & custom narratives for active searching
  const dossiers = storageService.getDossiers();
  const [narratives, setNarratives] = useState(SEARCH_NARRATIVE_PRESETS);

  // Notifications State
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Sync user-specific notifications in real-time on login/logout
  useEffect(() => {
    if (!currentUser.isLoggedIn) {
      setNotifications([]);
      return;
    }

    try {
      const userNotifKey = `ymi_notifications_${currentUser.id || 'guest'}`;
      const saved = localStorage.getItem(userNotifKey);
      if (saved) {
        setNotifications(JSON.parse(saved));
      } else {
        const defaults = [
          { 
            id: 'notif-welcome', 
            title: `Credential Authentication Successful`, 
            body: `Welcome, ${currentUser.name}! Your Level-${currentUser.clearanceLevel} clearance has been synchronised in real-time.`, 
            type: 'system', 
            timestamp: 'Just now', 
            read: false 
          },
          { 
            id: 'notif-1', 
            title: 'System Integrity Audited', 
            body: 'The SHA-256 data integrity check passed successfully. 0 database anomalies detected.', 
            type: 'system', 
            timestamp: '5 mins ago', 
            read: false 
          },
          { 
            id: 'notif-2', 
            title: 'Comment Reply Alert', 
            body: 'Dr. Tariq Al-Mansoor replied to your comment on "YMI-CHAOS-014": "I agree with your bifurcation analysis!"', 
            type: 'reply', 
            timestamp: '1 hour ago', 
            read: false 
          },
          { 
            id: 'notif-3', 
            title: 'Security Advisory', 
            body: 'Institute firewall status: Active. 12 unauthorised access attempts blocked.', 
            type: 'security', 
            timestamp: '3 hours ago', 
            read: true 
          }
        ];
        localStorage.setItem(userNotifKey, JSON.stringify(defaults));
        setNotifications(defaults);
      }
    } catch {
      setNotifications([]);
    }
  }, [currentUser.id, currentUser.isLoggedIn]);

  const markAllAsRead = () => {
    if (!currentUser.isLoggedIn) return;
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    try {
      localStorage.setItem(`ymi_notifications_${currentUser.id || 'guest'}`, JSON.stringify(updated));
    } catch {}
  };

  const handleNotificationAction = (notif: any) => {
    if (!currentUser.isLoggedIn) return;
    const updated = notifications.map(n => n.id === notif.id ? { ...n, read: true } : n);
    setNotifications(updated);
    try {
      localStorage.setItem(`ymi_notifications_${currentUser.id || 'guest'}`, JSON.stringify(updated));
    } catch {}
    
    if (notif.type === 'reply') {
      setActiveTab('archive');
    } else if (notif.type === 'security' || notif.type === 'system') {
      setActiveTab('security');
    }
    setShowNotifications(false);
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ymi_custom_narratives');
      if (saved) {
        const parsed = JSON.parse(saved);
        const mapped = parsed.map((item: any) => ({
          id: item.id,
          title: item.title,
          author: item.author,
          style: item.style || 'academic'
        }));
        setNarratives([...SEARCH_NARRATIVE_PRESETS, ...mapped]);
      } else {
        setNarratives(SEARCH_NARRATIVE_PRESETS);
      }
    } catch {
      setNarratives(SEARCH_NARRATIVE_PRESETS);
    }
  }, [activeTab]);

  // Click outside dropdown closer
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleUploadClick = () => {
    if (!currentUser.isLoggedIn) {
      onOpenAuthModal();
      return;
    }
    onOpenUploadStudio();
  };

  // Searching logic
  const filteredDossiers = localQuery.trim() === '' ? [] : dossiers.filter(d => 
    d.title.toLowerCase().includes(localQuery.toLowerCase()) ||
    d.subtitle.toLowerCase().includes(localQuery.toLowerCase()) ||
    d.protocolNumber.toLowerCase().includes(localQuery.toLowerCase()) ||
    d.leadResearcher.toLowerCase().includes(localQuery.toLowerCase())
  );

  const filteredNarratives = localQuery.trim() === '' ? [] : narratives.filter(n => 
    n.title.toLowerCase().includes(localQuery.toLowerCase()) ||
    n.author.toLowerCase().includes(localQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080d0b]/98 backdrop-blur-md border-b border-[#1b2b24] no-print">
      <div className="max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
        
        {/* Left Side: Brand wordmark */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => setActiveTab('home')}
            className="text-left font-display font-bold tracking-tight text-[#e6c679] hover:text-[#f3dc9e] transition-colors shrink-0 flex items-center gap-1.5"
          >
            <span className="sm:hidden text-base tracking-widest text-[#c5a059] border border-[#c5a059]/40 px-1.5 py-0.5 rounded bg-[#101b15]">
              YMI
            </span>
            <span className="hidden sm:inline text-lg sm:text-xl">
              Yaqoob Mosafa Institute
            </span>
          </button>
        </div>

        {/* Dynamic Global Autocomplete Search Input */}
        <div ref={dropdownRef} className="relative hidden md:block w-48 lg:w-64 max-w-xs font-sans">
          <div className="relative">
            <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-[#5e7566]" />
            <input
              type="text"
              placeholder="Search documents or lore..."
              value={localQuery}
              onChange={(e) => {
                setLocalQuery(e.target.value);
                setSearchQuery(e.target.value); // Sync to global state
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="w-full bg-[#040805] border border-[#1b2b24] focus:border-[#c5a059] rounded-lg pl-8 pr-8 py-1 text-xs text-[#ded9cd] placeholder-[#5e7566] focus:outline-none transition-all font-mono"
            />
            {localQuery && (
              <button
                onClick={() => { setLocalQuery(''); setSearchQuery(''); }}
                className="absolute right-2.5 top-1.5 p-0.5 rounded-full hover:bg-neutral-800 text-[#5e7566] hover:text-[#ded9cd] transition-colors"
                title="Clear search query"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Autocomplete absolute dropdown */}
          {showDropdown && localQuery.trim() !== '' && (
            <div className="absolute top-9 left-0 right-0 bg-[#080d0a]/98 border border-[#23382c] rounded-xl shadow-2xl p-3 max-h-80 overflow-y-auto space-y-3.5 z-50 backdrop-blur-md">
              
              {/* Documents results */}
              <div>
                <div className="text-[9px] font-mono font-bold text-[#c5a059] uppercase tracking-wider mb-1.5 pb-1 border-b border-[#14231b] flex items-center gap-1.5">
                  <FileText className="w-3 h-3 text-[#c5a059]" />
                  <span>Dossiers ({filteredDossiers.length})</span>
                </div>
                {filteredDossiers.length === 0 ? (
                  <div className="text-[10px] text-[#5e7566] italic pl-2">No matching papers</div>
                ) : (
                  <div className="space-y-1">
                    {filteredDossiers.slice(0, 5).map((d) => (
                      <button
                        key={d.id}
                        onClick={() => {
                          onSelectDossier(d);
                          setShowDropdown(false);
                          setLocalQuery('');
                        }}
                        className="w-full text-left p-1.5 rounded hover:bg-[#122319] text-[10.5px] font-mono text-[#8ca395] hover:text-white truncate block cursor-pointer transition-all"
                      >
                        <span className="text-[#c5a059] font-bold">{d.protocolNumber}</span>: {d.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Lore / Narratives results */}
              <div>
                <div className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1.5 pb-1 border-b border-[#14231b] flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-emerald-400" />
                  <span>Narration Vault ({filteredNarratives.length})</span>
                </div>
                {filteredNarratives.length === 0 ? (
                  <div className="text-[10px] text-[#5e7566] italic pl-2">No matching lore entries</div>
                ) : (
                  <div className="space-y-1">
                    {filteredNarratives.slice(0, 5).map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          onSelectNarrativeId(t.id);
                          setActiveTab('narration');
                          setShowDropdown(false);
                          setLocalQuery('');
                        }}
                        className="w-full text-left p-1.5 rounded hover:bg-[#122319] text-[10.5px] font-mono text-[#8ca395] hover:text-white truncate block cursor-pointer transition-all"
                      >
                        <span className="text-emerald-400 font-bold">[{t.style.toUpperCase()}]</span>: {t.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* Clean desktop navigation links with translations */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs font-mono font-medium text-[#9da8a2]">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors hover:text-[#e2ded6] py-1 border-b-2 ${
              activeTab === 'home'
                ? 'border-[#c5a059] text-[#e2ded6] font-bold'
                : 'border-transparent text-[#8b9992]'
            }`}
          >
            {t.homeNav}
          </button>

          <button
            onClick={() => setActiveTab('archive')}
            className={`transition-colors hover:text-[#e2ded6] py-1 border-b-2 ${
              activeTab === 'archive'
                ? 'border-[#c5a059] text-[#e2ded6] font-bold'
                : 'border-transparent text-[#8b9992]'
            }`}
          >
            {t.archiveNav}
          </button>
          
          <button
            onClick={() => {
              if (!currentUser.isLoggedIn) {
                onOpenAuthModal();
                return;
              }
              setActiveTab('studio');
            }}
            className={`transition-colors hover:text-[#e2ded6] py-1 border-b-2 flex items-center gap-1 ${
              activeTab === 'studio'
                ? 'border-[#c5a059] text-[#e2ded6] font-bold'
                : 'border-transparent text-[#8b9992]'
            }`}
          >
            <span>{t.studioNav}</span>
            {!currentUser.isLoggedIn && <Lock className="w-2.5 h-2.5 text-amber-400" />}
          </button>

          <button
            onClick={() => {
              if (!currentUser.isLoggedIn) {
                onOpenAuthModal();
                return;
              }
              setActiveTab('myworks');
            }}
            className={`transition-colors hover:text-[#e2ded6] py-1 border-b-2 flex items-center gap-1.5 ${
              activeTab === 'myworks'
                ? 'border-[#c5a059] text-[#e2ded6] font-bold'
                : 'border-transparent text-[#8b9992]'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>My Works</span>
            {!currentUser.isLoggedIn && <Lock className="w-2.5 h-2.5 text-amber-400" />}
          </button>

          {onOpenNetworkModal && (
            <button
              onClick={onOpenNetworkModal}
              className="transition-colors hover:text-[#e2ded6] py-1 border-b-2 border-transparent text-[#8b9992] flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Scholars Network</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('narration')}
            className={`transition-colors hover:text-[#e2ded6] py-1 border-b-2 flex items-center gap-1 ${
              activeTab === 'narration'
                ? 'border-[#c5a059] text-[#e2ded6] font-bold'
                : 'border-transparent text-[#8b9992]'
            }`}
          >
            <span>Narration Vault</span>
          </button>

          <button
            onClick={() => setActiveTab('lab')}
            className={`transition-colors hover:text-[#e2ded6] py-1 border-b-2 ${
              activeTab === 'lab'
                ? 'border-[#c5a059] text-[#e2ded6] font-bold'
                : 'border-transparent text-[#8b9992]'
            }`}
          >
            {t.labNav}
          </button>

          <button
            onClick={() => setActiveTab('manifesto')}
            className={`transition-colors hover:text-[#e2ded6] py-1 border-b-2 ${
              activeTab === 'manifesto'
                ? 'border-[#c5a059] text-[#e2ded6] font-bold'
                : 'border-transparent text-[#8b9992]'
            }`}
          >
            {t.manifestoNav}
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`transition-colors hover:text-[#e2ded6] py-1 border-b-2 ${
              activeTab === 'terminal'
                ? 'border-[#c5a059] text-[#e2ded6] font-bold'
                : 'border-transparent text-[#8b9992]'
            }`}
          >
            {t.terminalNav}
          </button>

          {/* Security & Surveillance Center tab */}
          <button
            onClick={() => setActiveTab('security')}
            className={`transition-colors hover:text-[#e2ded6] py-1 border-b-2 flex items-center gap-1.5 ${
              activeTab === 'security'
                ? 'border-[#c5a059] text-[#e2ded6] font-bold'
                : 'border-transparent text-[#8b9992]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.securityNav}</span>
          </button>
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Personal AI Chatbot Toggle Button */}
          {onToggleChatbot && (
            <button
              onClick={onToggleChatbot}
              className="px-2.5 py-1.5 rounded-md border border-[#2d4d3a] bg-[#122319] hover:bg-[#1a3525] text-[#c5a059] font-mono text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              title="Toggle Personal YMI AI Assistant"
            >
              <Bot className="w-4 h-4 text-[#c5a059]" />
              <span className="hidden md:inline font-bold">AI Assistant</span>
            </button>
          )}

          {/* Notification Center Dropdown */}
          <div ref={notificationsRef} className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 rounded-md border border-[#22352b] text-[#8fa296] hover:text-[#f0ece1] hover:border-[#c5a059] bg-[#0c1612] transition-colors relative cursor-pointer"
              title="Notification Center (Replies, System updates)"
            >
              <Bell className="w-4 h-4" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <div className="fixed right-4 left-4 top-14 md:absolute md:right-0 md:left-auto md:top-10 md:w-80 bg-[#080d0a]/98 border border-[#23382c] rounded-xl shadow-2xl p-4 space-y-4 z-50 backdrop-blur-md font-sans">
                {!currentUser.isLoggedIn ? (
                  <div className="text-center py-6 space-y-3.5">
                    <div className="w-10 h-10 rounded-full bg-amber-950/40 border border-amber-800/80 flex items-center justify-center text-[#c5a059] mx-auto animate-pulse">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-mono font-bold text-[#ded9cd] uppercase tracking-wider">
                        Real-Time Intel Locked
                      </h4>
                      <p className="text-[10.5px] text-[#718478] leading-relaxed max-w-[240px] mx-auto font-sans">
                        Please sign in with your researcher credentials to synchronise real-time notifications, peer-review comments, and system telemetry feeds.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        onOpenAuthModal();
                      }}
                      className="w-full py-1.5 rounded-lg bg-[#c5a059] hover:bg-[#d8b26a] text-black font-mono font-bold text-[10.5px] transition-all cursor-pointer shadow-md"
                    >
                      SIGN IN NOW
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-[#14231b]">
                      <span className="font-bold text-[#c5a059] flex items-center gap-1.5">
                        <Bell className="w-3.5 h-3.5 text-[#c5a059]" />
                        <span>NOTIFICATIONS ({notifications.filter(n => !n.read).length})</span>
                      </span>
                      {notifications.some(n => !n.read) && (
                        <button
                          onClick={markAllAsRead}
                          className="text-[10px] text-emerald-400 hover:underline cursor-pointer"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className="space-y-2.5 max-h-64 overflow-y-auto no-scrollbar">
                      {notifications.length === 0 ? (
                        <div className="text-center py-8 text-xs text-[#5e7566] italic">
                          No real-time notifications
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <button
                            key={notif.id}
                            onClick={() => handleNotificationAction(notif)}
                            className={`w-full p-2.5 rounded-lg border transition-all text-left space-y-1 block ${
                              notif.read 
                                ? 'bg-[#050806]/40 border-[#14231a] opacity-60' 
                                : 'bg-[#08130e] border-emerald-950/80 hover:border-emerald-500 shadow-sm'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[9px] font-mono">
                              <span className={`font-bold px-1.5 py-0.2 rounded text-[8px] uppercase ${
                                notif.type === 'system'
                                  ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/60'
                                  : notif.type === 'reply'
                                  ? 'bg-amber-950/40 text-amber-300 border border-amber-900/60'
                                  : 'bg-rose-950/40 text-rose-300 border border-rose-900/60'
                              }`}>
                                {notif.type}
                              </span>
                              <span className="text-[#5e7566]">{notif.timestamp}</span>
                            </div>
                            <h5 className="text-[11px] font-bold text-[#ded9cd] leading-snug">{notif.title}</h5>
                            <p className="text-[10px] text-[#8ca395] leading-relaxed line-clamp-2">{notif.body}</p>
                          </button>
                        ))
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Settings / Language quick button */}
          <button
            onClick={onOpenSettingsModal}
            className="p-1.5 rounded-md border border-[#22352b] text-[#8fa296] hover:text-[#f0ece1] hover:border-[#c5a059] bg-[#0c1612] transition-colors cursor-pointer"
            title="Language, Privacy Policy & System Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* User Account / SSO Login button */}
          <button
            onClick={onOpenAuthModal}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-mono rounded-md border transition-all max-w-[130px] sm:max-w-[190px] truncate ${
              currentUser.isDeveloper
                ? 'bg-[#18261e] border-[#c5a059] text-[#e8cf8f] shadow-sm hover:bg-[#203328]'
                : currentUser.isLoggedIn
                ? 'bg-[#0c1612] border-emerald-800/80 text-[#b6e2cb] hover:border-emerald-500 hover:bg-[#121f18]'
                : 'bg-[#1a110a] border-[#552f14] text-[#ffd699] hover:border-[#c5a059] hover:bg-[#26170c] animate-pulse'
            }`}
            title={currentUser.isLoggedIn ? 'Manage Account & Researcher Profile' : 'Click to Sign In with Google SSO'}
          >
            {currentUser.isDeveloper ? (
              <Crown className="w-3.5 h-3.5 text-[#e6c679] shrink-0" />
            ) : currentUser.authProvider === 'google' ? (
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
            ) : currentUser.authProvider === 'microsoft' ? (
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 23 23">
                <rect fill="#f35325" x="1" y="1" width="10" height="10"/>
                <rect fill="#81bc06" x="12" y="1" width="10" height="10"/>
                <rect fill="#05a6f0" x="1" y="12" width="10" height="10"/>
                <rect fill="#ffba08" x="12" y="12" width="10" height="10"/>
              </svg>
            ) : currentUser.isLoggedIn ? (
              <User className="w-3.5 h-3.5 text-[#889d91] shrink-0" />
            ) : (
              <LogIn className="w-3.5 h-3.5 text-[#ffaa3b] shrink-0" />
            )}
            <span className="truncate text-[11px] sm:text-xs">
              {currentUser.isLoggedIn ? currentUser.name : t.loginBtn}
            </span>
          </button>

          {/* Integrated Upload in Studio Riset trigger */}
          <button
            onClick={handleUploadClick}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-md bg-[#c5a059] text-[#060a08] hover:bg-[#d6b36c] active:bg-[#b08c46] font-semibold transition-colors shadow-sm whitespace-nowrap"
          >
            {currentUser.isLoggedIn ? (
              <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
            ) : (
              <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
            )}
            <span className="hidden sm:inline">{t.uploadBtn}</span>
            <span className="sm:hidden text-[11px]">+ Upload</span>
          </button>
        </div>

      </div>

      {/* Mobile nav bar row with clean horizontal scrolling and active indicators */}
      <div className="lg:hidden flex items-center justify-start sm:justify-around px-3 py-1.5 border-t border-[#16231d] bg-[#070b09] text-xs font-mono text-[#8b9992] overflow-x-auto gap-2 no-scrollbar">
        <button
          onClick={() => setActiveTab('home')}
          className={`px-2.5 py-1 rounded whitespace-nowrap transition-colors ${
            activeTab === 'home' ? 'bg-[#15241b] text-[#c5a059] font-bold border border-[#263e30]' : 'hover:text-white'
          }`}
        >
          {t.homeNav}
        </button>
        <button
          onClick={() => setActiveTab('archive')}
          className={`px-2.5 py-1 rounded whitespace-nowrap transition-colors ${
            activeTab === 'archive' ? 'bg-[#15241b] text-[#c5a059] font-bold border border-[#263e30]' : 'hover:text-white'
          }`}
        >
          {t.archiveNav}
        </button>
        <button
          onClick={() => setActiveTab('narration')}
          className={`px-2.5 py-1 rounded whitespace-nowrap transition-colors ${
            activeTab === 'narration' ? 'bg-[#15241b] text-[#c5a059] font-bold border border-[#263e30]' : 'hover:text-white'
          }`}
        >
          Narration Vault
        </button>
        <button
          onClick={() => {
            if (!currentUser.isLoggedIn) {
              onOpenAuthModal();
              return;
            }
            setActiveTab('studio');
          }}
          className={`px-2.5 py-1 rounded whitespace-nowrap transition-colors flex items-center gap-1 ${
            activeTab === 'studio' ? 'bg-[#15241b] text-[#c5a059] font-bold border border-[#263e30]' : 'hover:text-white'
          }`}
        >
          <span>{t.studioNav}</span>
          {!currentUser.isLoggedIn && <Lock className="w-2.5 h-2.5 text-amber-400" />}
        </button>
        <button
          onClick={() => setActiveTab('lab')}
          className={`px-2.5 py-1 rounded whitespace-nowrap transition-colors ${
            activeTab === 'lab' ? 'bg-[#15241b] text-[#c5a059] font-bold border border-[#263e30]' : 'hover:text-white'
          }`}
        >
          {t.labNav}
        </button>
        <button
          onClick={() => setActiveTab('manifesto')}
          className={`px-2.5 py-1 rounded whitespace-nowrap transition-colors ${
            activeTab === 'manifesto' ? 'bg-[#15241b] text-[#c5a059] font-bold border border-[#263e30]' : 'hover:text-white'
          }`}
        >
          {t.manifestoNav}
        </button>
        <button
          onClick={() => setActiveTab('terminal')}
          className={`px-2.5 py-1 rounded whitespace-nowrap transition-colors ${
            activeTab === 'terminal' ? 'bg-[#15241b] text-[#c5a059] font-bold border border-[#263e30]' : 'hover:text-white'
          }`}
        >
          {t.terminalNav}
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-2.5 py-1 rounded whitespace-nowrap transition-colors flex items-center gap-1 ${
            activeTab === 'security' ? 'bg-[#15241b] text-[#c5a059] font-bold border border-[#263e30]' : 'hover:text-white'
          }`}
        >
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>{t.securityNav}</span>
        </button>
      </div>
    </header>
  );
};
