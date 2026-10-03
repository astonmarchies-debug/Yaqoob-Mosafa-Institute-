import React from 'react';
import { Crown, User, Upload, Settings, ShieldCheck, Lock, LogIn, Sparkles, BookOpen, FolderKanban, Bot, Users } from 'lucide-react';
import { ResearcherUser } from '../types/dossier';
import { SupportedLanguage, TRANSLATIONS } from '../services/i18n';

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
}

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
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const handleUploadClick = () => {
    if (!currentUser.isLoggedIn) {
      onOpenAuthModal();
      return;
    }
    onOpenUploadStudio();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080d0b]/98 backdrop-blur-md border-b border-[#1b2b24] no-print">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
        
        {/* Brand wordmark - responsive */}
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

          {/* Settings / Language quick button */}
          <button
            onClick={onOpenSettingsModal}
            className="p-1.5 rounded-md border border-[#22352b] text-[#8fa296] hover:text-[#f0ece1] hover:border-[#c5a059] bg-[#0c1612] transition-colors"
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
      <div className="lg:hidden flex items-center justify-start sm:justify-around px-3 py-1.5 border-t border-[#16231d] bg-[#070b09] text-xs font-mono text-[#8b9992] overflow-x-auto gap-2">
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
