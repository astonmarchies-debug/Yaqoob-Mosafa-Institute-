import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, ShieldAlert, AlertTriangle, Lock, Unlock, 
  Activity, RefreshCw, Terminal, Eye, FileText, CheckCircle2, 
  Search, Radio, Zap, Shield, Key
} from 'lucide-react';
import { SecurityAuditLog, SecuritySystemState, ResearcherUser } from '../types/dossier';
import { securityService } from '../services/securityService';
import { SupportedLanguage } from '../services/i18n';

interface SecurityCenterProps {
  currentUser: ResearcherUser;
  currentLanguage: SupportedLanguage;
  onOpenAuthModal: () => void;
}

export const SecurityCenter: React.FC<SecurityCenterProps> = ({
  currentUser,
  currentLanguage,
  onOpenAuthModal,
}) => {
  const isRtl = currentLanguage === 'ar';
  const [logs, setLogs] = useState<SecurityAuditLog[]>([]);
  const [systemState, setSystemState] = useState<SecuritySystemState>(securityService.getState());
  const [filterType, setFilterType] = useState<string>('ALL');
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState('');

  const reloadSecurityData = () => {
    setLogs(securityService.getLogs());
    setSystemState(securityService.getState());
  };

  useEffect(() => {
    reloadSecurityData();
  }, []);

  const handleRunScan = () => {
    setIsScanning(true);
    setScanMessage('Initiating deep SHA-256 cryptographic audit across all archive memory blocks...');
    setTimeout(() => {
      const { state, log } = securityService.runIntegrityScan(currentUser.name);
      setSystemState(state);
      setLogs((prev) => [log, ...prev]);
      setIsScanning(false);
      setScanMessage('Cryptographic audit complete: 100% of classified dossier blocks verified tamper-proof.');
      setTimeout(() => setScanMessage(''), 4000);
    }, 1200);
  };

  const handleToggleLockdown = () => {
    if (!currentUser.isLoggedIn) {
      alert('Access Denied: You must authenticate with Google SSO or Microsoft Entra to alter security protocols.');
      onOpenAuthModal();
      return;
    }

    const confirmMsg = systemState.isLockdownActive
      ? 'Deactivate Emergency Quarantine Protocol and restore DEFCON 5 (Normal Operations)?'
      : 'CRITICAL ALERT: Engage Emergency Quarantine Protocol (DEFCON 1)? All public access will be placed into immutable read-only isolation!';

    if (confirm(confirmMsg)) {
      const { state, log } = securityService.toggleLockdown(currentUser.name);
      setSystemState(state);
      setLogs((prev) => [log, ...prev]);
    }
  };

  const filteredLogs = logs.filter((log) => {
    if (filterType === 'ALL') return true;
    if (filterType === 'AUTH') return log.eventType.startsWith('AUTH');
    if (filterType === 'BLOCKED') return log.eventType === 'UNAUTHORIZED_ACCESS_BLOCKED';
    if (filterType === 'SCAN') return log.eventType === 'INTEGRITY_SCAN';
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Official Security Header */}
      <div className="border-b border-[#1f3326] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#c5a059] tracking-widest uppercase mb-1.5">
            <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
            <span>SURVEILLANCE & ACCESS PROTECTION // SECTOR 04-A</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#f5eedf] tracking-tight">
            Epistemic Security & Surveillance Center
          </h1>
          <p className="text-xs sm:text-sm text-[#9eb1a6] mt-1 max-w-2xl">
            Real-time checksum audit feeds, researcher access logging, causal barrier firewalls, and anomaly intrusion detection.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleRunScan}
            disabled={isScanning}
            className="px-3.5 py-2 rounded-lg bg-[#0e1c15] border border-[#223d2d] text-[#c5a059] hover:bg-[#152a20] text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Auditing...' : 'Audit SHA-256 Integrity'}</span>
          </button>

          <button
            onClick={handleToggleLockdown}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-sm border ${
              systemState.isLockdownActive
                ? 'bg-rose-950 text-rose-200 border-rose-600 hover:bg-rose-900 animate-pulse'
                : 'bg-[#1a0f07] text-[#ffaa3b] border-[#42220f] hover:bg-[#29170a]'
            }`}
          >
            {systemState.isLockdownActive ? (
              <Lock className="w-3.5 h-3.5" />
            ) : (
              <ShieldAlert className="w-3.5 h-3.5" />
            )}
            <span>{systemState.isLockdownActive ? 'DISENGAGE LOCKDOWN' : 'Emergency Quarantine'}</span>
          </button>
        </div>
      </div>

      {/* Notice Bar */}
      {scanMessage && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-700/60 rounded-lg text-emerald-300 font-mono text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{scanMessage}</span>
        </div>
      )}

      {/* System Telemetry & Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 font-mono text-xs">
        
        {/* Card 1: Threat Level */}
        <div className={`p-4 rounded-lg border flex flex-col justify-between ${
          systemState.isLockdownActive 
            ? 'bg-rose-950/30 border-rose-700/80 text-rose-200' 
            : 'bg-[#060b08] border-[#18281f] text-[#d4ded8]'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase text-[#7a8f82]">Threat Level</span>
            <Activity className="w-4 h-4 text-[#c5a059]" />
          </div>
          <div className="text-base font-bold text-[#f5eedf]">
            {systemState.isLockdownActive ? 'DEFCON 1 (LOCKDOWN)' : 'DEFCON 5 (NORMAL)'}
          </div>
          <div className="text-[10px] text-[#718579] mt-1">
            Containment Status: {systemState.isLockdownActive ? 'Quarantined / Isolated' : 'Stable & Regulated'}
          </div>
        </div>

        {/* Card 2: Causal Firewall */}
        <div className="p-4 rounded-lg bg-[#060b08] border border-[#18281f] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase text-[#7a8f82]">Causal Firewall</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-base font-bold text-emerald-400">
            ACTIVE & ENFORCING
          </div>
          <div className="text-[10px] text-[#718579] mt-1">
            Sympathetic contagion damping online
          </div>
        </div>

        {/* Card 3: Hash Checksum */}
        <div className="p-4 rounded-lg bg-[#060b08] border border-[#18281f] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase text-[#7a8f82]">SHA-256 Checksum</span>
            <Key className="w-4 h-4 text-[#c5a059]" />
          </div>
          <div className="text-xs font-bold text-[#e6c679] truncate" title={systemState.checksumHash}>
            {systemState.checksumHash}
          </div>
          <div className="text-[10px] text-[#718579] mt-1">
            All Archive Vaults Verified Intact
          </div>
        </div>

        {/* Card 4: Audited Sessions & Intrusions */}
        <div className="p-4 rounded-lg bg-[#060b08] border border-[#18281f] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase text-[#7a8f82]">Session Auditing</span>
            <Shield className="w-4 h-4 text-[#c5a059]" />
          </div>
          <div className="text-base font-bold text-[#f5eedf]">
            {currentUser.isLoggedIn ? '1 Authenticated Node' : '0 Nodes (Guest)'}
          </div>
          <div className="text-[10px] text-amber-400/90 mt-1">
            {systemState.blockedIntrusionsCount} Unauthorized Intrusion Attempts Filtered
          </div>
        </div>

      </div>

      {/* Access Control Enforcement Banner */}
      <div className={`p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono ${
        currentUser.isLoggedIn 
          ? 'bg-[#09150f] border-[#1d3525] text-[#b3dec5]' 
          : 'bg-[#140b07] border-[#381c10] text-[#ffd699]'
      }`}>
        <div className="flex items-center gap-2.5">
          {currentUser.isLoggedIn ? (
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <Lock className="w-5 h-5 text-amber-400 shrink-0" />
          )}
          <div>
            <div className="font-bold text-[#f5eedf]">
              {currentUser.isLoggedIn 
                ? `Authenticated Session: ${currentUser.name} (${currentUser.roleTitle})`
                : 'Security Advisory: Unauthenticated Public Explorer Session'}
            </div>
            <div className="text-[11px] text-[#869b8e] mt-0.5">
              {currentUser.isLoggedIn 
                ? `Provider: ${currentUser.authProvider?.toUpperCase()} | Authorization: Level-${currentUser.clearanceLevel} Full Curation Access`
                : 'Research manuscript authoring, proposal submission, and dossier creation require authenticated Google SSO.'}
            </div>
          </div>
        </div>

        {!currentUser.isLoggedIn && (
          <button
            onClick={onOpenAuthModal}
            className="px-4 py-2 rounded bg-[#c5a059] text-[#060a08] font-bold hover:bg-[#d8b56d] transition-colors shrink-0"
          >
            Sign In with Google SSO
          </button>
        )}
      </div>

      {/* Security Audit Log Feed */}
      <div className="bg-[#050907] border border-[#1b2b22] rounded-lg overflow-hidden font-mono text-xs">
        
        {/* Table Header Controls */}
        <div className="p-4 bg-[#0a120d] border-b border-[#18261e] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#c5a059]" />
            <span className="font-bold text-[#f5eedf] uppercase tracking-wider">
              REAL-TIME SURVEILLANCE & SYSTEM AUDIT FEED
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filterType === 'ALL' ? 'bg-[#182a20] text-[#c5a059] font-bold border border-[#2b4437]' : 'text-[#7d9085] hover:text-white'
              }`}
            >
              All Events ({logs.length})
            </button>
            <button
              onClick={() => setFilterType('AUTH')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filterType === 'AUTH' ? 'bg-[#182a20] text-[#c5a059] font-bold border border-[#2b4437]' : 'text-[#7d9085] hover:text-white'
              }`}
            >
              Authentication
            </button>
            <button
              onClick={() => setFilterType('BLOCKED')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filterType === 'BLOCKED' ? 'bg-[#182a20] text-[#c5a059] font-bold border border-[#2b4437]' : 'text-[#7d9085] hover:text-white'
              }`}
            >
              Blocked Access
            </button>
            <button
              onClick={() => setFilterType('SCAN')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filterType === 'SCAN' ? 'bg-[#182a20] text-[#c5a059] font-bold border border-[#2b4437]' : 'text-[#7d9085] hover:text-white'
              }`}
            >
              Integrity Scans
            </button>
          </div>
        </div>

        {/* Log Entries */}
        <div className="divide-y divide-[#132018] max-h-96 overflow-y-auto">
          {filteredLogs.length === 0 ? (
            <div className="p-8 text-center text-[#6e8276]">
              No surveillance log entries recorded for this filter.
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div key={log.id} className="p-3.5 sm:p-4 hover:bg-[#08100b] transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                      log.severity === 'CRITICAL'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : log.severity === 'WARNING'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {log.severity}
                    </span>

                    <span className="text-[#c5a059] font-bold">[{log.eventType}]</span>
                    <span className="text-[#788e82] text-[11px]">{log.id}</span>
                  </div>

                  <p className="text-[#d8e3dc] text-xs font-sans leading-relaxed">
                    {log.details}
                  </p>

                  <div className="text-[10px] text-[#637a6e] flex items-center gap-2">
                    <span>Actor: <strong className="text-[#a4b8ac]">{log.actor}</strong></span>
                    <span>•</span>
                    <span>Routing: {log.ipTrace}</span>
                  </div>
                </div>

                <div className="text-[10px] text-[#637a6e] whitespace-nowrap self-start sm:self-auto">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Table Footer */}
        <div className="p-3 bg-[#080f0b] border-t border-[#142319] text-[10px] text-[#637a6e] flex items-center justify-between">
          <span>Automated Epistemic Cryptographic Audit Daemon</span>
          <span className="text-emerald-400">● 24/7 Active Surveillance</span>
        </div>

      </div>

    </div>
  );
};
