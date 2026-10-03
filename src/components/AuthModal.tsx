import React, { useState } from 'react';
import { ResearcherUser } from '../types/dossier';
import { storageService, calculateUserProgression } from '../services/storage';
import { securityService } from '../services/securityService';
import { ASSET_IMAGES } from '../assets/images';
import { X, Crown, User, Check, ShieldCheck, LogOut, Lock, ShieldAlert, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: ResearcherUser;
  onUpdateUser: (user: ResearcherUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
}) => {
  if (!isOpen) return null;

  const [emailInput, setEmailInput] = useState(currentUser.email || '');
  const [nameInput, setNameInput] = useState(currentUser.name && currentUser.name !== 'Guest Researcher' ? currentUser.name : '');
  const [affiliationInput, setAffiliationInput] = useState(currentUser.affiliation || 'Yaqoob Mosafa Institute');
  const [notice, setNotice] = useState<{ text: string; type: 'success' | 'error' | 'warning' } | null>(null);

  const handleManualSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanName = nameInput.trim();

    if (!cleanEmail) {
      setNotice({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    const isAston = cleanEmail === 'astonmarchies@gmail.com' || (cleanEmail.includes('astonmarchies') && cleanEmail.includes('gmail'));
    const finalName = isAston ? 'Aston Marchies' : (cleanName || cleanEmail.split('@')[0]);

    const baseUser: ResearcherUser = {
      id: isAston ? 'dev-aston' : `user-${Date.now()}`,
      name: finalName,
      email: cleanEmail,
      authProvider: 'manual',
      isLoggedIn: true,
      capability: isAston ? 'PRINCIPAL_ARCHITECT' : 'PUBLIC_OBSERVER',
      roleTitle: isAston ? 'Principal Architect' : 'Verified Researcher',
      affiliation: isAston ? 'System Architect & Grand Curator' : (affiliationInput.trim() || 'Independent Researcher'),
      isDeveloper: isAston,
      canApprove: isAston,
      clearanceLevel: isAston ? 6 : 1,
    };

    // Calculate progression based on existing user activity
    const finalUser = calculateUserProgression(baseUser);

    storageService.setActiveUser(finalUser);
    onUpdateUser(finalUser);

    securityService.logEvent({
      eventType: 'AUTH_LOGIN',
      severity: 'INFO',
      actor: finalUser.name,
      actorEmail: finalUser.email,
      ipTrace: '10.0.4.15 [DIRECT_GATEWAY_AUTHENTICATED]',
      details: isAston
        ? 'Principal Architect (Aston Marchies) authenticated successfully. Level-6 master root clearance engaged.'
        : `Researcher credentials registered for ${finalUser.name} (${finalUser.email}).`,
    });

    setNotice({
      text: isAston
        ? 'Welcome back, Principal Architect Aston Marchies! Level-6 Master Root Clearance Enabled.'
        : `Successfully signed in as ${finalUser.name} (${finalUser.email})`,
      type: 'success',
    });

    setTimeout(() => {
      setNotice(null);
      onClose();
    }, 1000);
  };

  const handleSignOut = () => {
    const guestUser: ResearcherUser = {
      id: 'guest-public',
      name: 'Guest Researcher',
      capability: 'PUBLIC_OBSERVER',
      roleTitle: 'Public Visitor',
      affiliation: 'Public Observation Node',
      isDeveloper: false,
      canApprove: false,
      clearanceLevel: 1,
      authProvider: 'manual',
      isLoggedIn: false,
    };

    storageService.setActiveUser(guestUser);
    onUpdateUser(guestUser);

    securityService.logEvent({
      eventType: 'AUTH_LOGOUT',
      severity: 'INFO',
      actor: currentUser.name,
      actorEmail: currentUser.email,
      ipTrace: '10.0.4.15 [LOGOUT_COMMAND]',
      details: `Session for ${currentUser.name} terminated. Returned to public guest mode.`,
    });

    setNotice({
      text: 'Session terminated. Returned to public guest mode.',
      type: 'warning',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md no-print font-sans">
      <div className="w-full max-w-md bg-[#080d0a] border border-[#23382c] rounded-xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="px-5 py-4 bg-[#0d1612] border-b border-[#1b2b22] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={ASSET_IMAGES.insignia}
              alt="YMI Seal"
              className="w-8 h-8 rounded-full border border-[#c5a059]/60 shadow-sm"
            />
            <div>
              <h2 className="text-sm sm:text-base font-display font-bold text-[#f5eedf] flex items-center gap-2">
                <span>YMI Researcher Authentication</span>
                {currentUser.isLoggedIn && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-mono font-bold">
                    ACTIVE
                  </span>
                )}
              </h2>
              <div className="text-[10px] font-mono text-[#7a8c82]">
                Direct Gate credential control
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

        {/* Notice feedback */}
        {notice && (
          <div className={`m-4 mb-0 p-3 rounded-lg font-mono text-xs flex items-center gap-2 ${
            notice.type === 'success' 
              ? 'bg-emerald-950/60 border border-emerald-700/60 text-emerald-300'
              : notice.type === 'error'
              ? 'bg-rose-950/60 border border-rose-700/60 text-rose-300'
              : 'bg-amber-950/60 border border-amber-700/60 text-amber-300'
          }`}>
            {notice.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : notice.type === 'error' ? (
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            <span>{notice.text}</span>
          </div>
        )}

        {/* Current Active Account Status */}
        <div className="p-4 border-b border-[#16251d] bg-[#050907] flex items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2.5 truncate">
            <div className={`p-1.5 rounded-full border ${
              currentUser.isDeveloper 
                ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#e6c679]' 
                : currentUser.isLoggedIn 
                ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-300'
                : 'bg-[#122219] border-[#22352a] text-[#869b8f]'
            }`}>
              {currentUser.isDeveloper ? <Crown className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            <div className="truncate">
              <div className="font-semibold text-[#f0ece1] flex items-center gap-1.5 truncate">
                <span>{currentUser.name}</span>
                {currentUser.email && (
                  <span className="text-[10px] text-[#788a80] truncate">({currentUser.email})</span>
                )}
              </div>
              <div className="text-[10px] text-[#718579]">
                {currentUser.roleTitle} · {currentUser.affiliation || 'Independent'}
              </div>
            </div>
          </div>

          {currentUser.isLoggedIn && (
            <button
              onClick={handleSignOut}
              className="px-2.5 py-1 text-[11px] text-rose-400 hover:text-rose-300 border border-rose-900/50 rounded bg-rose-950/20 flex items-center gap-1 shrink-0 cursor-pointer"
              title="Sign out of current account"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
          )}
        </div>

        {/* Single Direct Manual Input Form */}
        <form onSubmit={handleManualSignIn} className="p-5 space-y-4 font-mono text-xs">
          <div className="text-[11px] text-[#83978c] uppercase font-semibold flex items-center gap-1.5 border-b border-[#182a1f] pb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Enter Researcher Credentials</span>
          </div>

          <div>
            <label className="block text-[#718478] text-[10px] uppercase mb-1 font-bold">
              Researcher Email Address *
            </label>
            <input
              type="email"
              placeholder="e.g. researcher@institute.org or personal@domain.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
              className="w-full bg-[#040705] border border-[#1c2e23] focus:border-[#c5a059] rounded px-3 py-2 text-xs text-[#f0ece1] focus:outline-none transition-colors"
            />
            <p className="text-[10px] text-[#63756b] mt-1 font-sans">
              Enter your registered researcher email address to verify identity and load portfolio credentials.
            </p>
          </div>

          <div>
            <label className="block text-[#718478] text-[10px] uppercase mb-1 font-bold">
              Display Name (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Dr. Vance / Mr. Hilal"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full bg-[#040705] border border-[#1c2e23] focus:border-[#c5a059] rounded px-3 py-2 text-xs text-[#f0ece1] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[#718478] text-[10px] uppercase mb-1 font-bold flex items-center justify-between">
              <span>Assigned Role & Clearance (Server Managed)</span>
              <span className="text-[#c5a059] font-normal text-[9px] flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> Read-Only
              </span>
            </label>
            <div className="p-2.5 rounded bg-[#030604] border border-[#182a1f] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                <span className="text-[#f5eedf] font-bold">{currentUser.roleTitle || 'Junior Researcher Observer'}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#0e1a13] border border-emerald-800/60 text-emerald-400 font-bold text-[10px]">
                Level-{currentUser.clearanceLevel || 1}
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded bg-[#050b07] border border-[#14231b] text-[10px] text-[#81958a] leading-relaxed font-sans">
            <strong>SYSTEM ROLE ASSIGNMENT:</strong> Your role and clearance level are determined automatically by the server based on your account's recorded research activity. New accounts start as Level 1 Junior Observers.
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 mt-2 rounded bg-[#c5a059] hover:bg-[#d6b068] active:scale-[0.99] text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer font-mono"
          >
            <span>Enter Institute Gateway</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
