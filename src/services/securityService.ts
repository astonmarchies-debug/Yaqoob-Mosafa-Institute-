import { SecurityAuditLog, SecuritySystemState } from '../types/dossier';

const SECURITY_LOGS_KEY = 'ymi_security_audit_logs_v1';
const SECURITY_STATE_KEY = 'ymi_security_system_state_v1';

const INITIAL_LOGS: SecurityAuditLog[] = [
  {
    id: 'SEC-LOG-8911',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    eventType: 'INTEGRITY_SCAN',
    severity: 'INFO',
    actor: 'SYS-DAEMON-04A',
    ipTrace: '10.0.4.1 [INTRANET_ISOLATED]',
    details: 'Repository cryptographic integrity audit completed: 100% of anomaly records SHA-256 verified.',
  },
  {
    id: 'SEC-LOG-8912',
    timestamp: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
    eventType: 'AUTH_LOGIN',
    severity: 'INFO',
    actor: 'Aston Marchies (Principal Architect)',
    actorEmail: 'astonmarchies@gmail.com',
    ipTrace: '192.168.4.88 [SECURE_VPN_GATEWAY]',
    details: 'Google SSO Authentication successful: Level-5 Sovereign Architectural Authority active.',
  },
  {
    id: 'SEC-LOG-8913',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    eventType: 'UNAUTHORIZED_ACCESS_BLOCKED',
    severity: 'WARNING',
    actor: 'Unauthenticated Guest Node',
    ipTrace: '185.220.101.42 [TOR_EXIT_NODE_QUARANTINE]',
    details: 'Unauthorized manuscript modification blocked: Researcher credentials required for repository mutations.',
  },
];

const INITIAL_STATE: SecuritySystemState = {
  threatLevel: 'DEFCON_5_NORMAL',
  firewallActive: true,
  lastIntegrityScan: new Date().toISOString(),
  checksumHash: 'SHA256: 0x8F3A29B0D9E1475A9C0B7E31D8',
  activeSessionsCount: 3,
  blockedIntrusionsCount: 19,
  isLockdownActive: false,
};

export const securityService = {
  getLogs(): SecurityAuditLog[] {
    try {
      const data = localStorage.getItem(SECURITY_LOGS_KEY);
      if (data) {
        return JSON.parse(data);
      }
      localStorage.setItem(SECURITY_LOGS_KEY, JSON.stringify(INITIAL_LOGS));
      return INITIAL_LOGS;
    } catch {
      return INITIAL_LOGS;
    }
  },

  logEvent(event: Omit<SecurityAuditLog, 'id' | 'timestamp'>): SecurityAuditLog {
    const currentLogs = this.getLogs();
    const newLog: SecurityAuditLog = {
      ...event,
      id: `SEC-LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
    };

    const updated = [newLog, ...currentLogs.slice(0, 49)];
    try {
      localStorage.setItem(SECURITY_LOGS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    return newLog;
  },

  getState(): SecuritySystemState {
    try {
      const data = localStorage.getItem(SECURITY_STATE_KEY);
      if (data) {
        return JSON.parse(data);
      }
      localStorage.setItem(SECURITY_STATE_KEY, JSON.stringify(INITIAL_STATE));
      return INITIAL_STATE;
    } catch {
      return INITIAL_STATE;
    }
  },

  saveState(state: SecuritySystemState): void {
    try {
      localStorage.setItem(SECURITY_STATE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error(e);
    }
  },

  runIntegrityScan(actorName: string): { state: SecuritySystemState; log: SecurityAuditLog } {
    const currentState = this.getState();
    const newHash = `SHA256: 0x${Math.random().toString(16).substring(2, 10).toUpperCase()}${Math.random().toString(16).substring(2, 10).toUpperCase()}`;
    const updatedState: SecuritySystemState = {
      ...currentState,
      lastIntegrityScan: new Date().toISOString(),
      checksumHash: newHash,
    };
    this.saveState(updatedState);

    const log = this.logEvent({
      eventType: 'INTEGRITY_SCAN',
      severity: 'INFO',
      actor: actorName,
      ipTrace: '10.0.4.1 [SYS_INTRANET]',
      details: `Manual repository integrity scan completed: All archival blocks verified against root ledger (${newHash}).`,
    });

    return { state: updatedState, log };
  },

  toggleLockdown(actorName: string): { state: SecuritySystemState; log: SecurityAuditLog } {
    const currentState = this.getState();
    const isNowLockdown = !currentState.isLockdownActive;

    const updatedState: SecuritySystemState = {
      ...currentState,
      isLockdownActive: isNowLockdown,
      threatLevel: isNowLockdown ? 'DEFCON_1_LOCKDOWN' : 'DEFCON_5_NORMAL',
      blockedIntrusionsCount: isNowLockdown ? currentState.blockedIntrusionsCount + 1 : currentState.blockedIntrusionsCount,
    };
    this.saveState(updatedState);

    const log = this.logEvent({
      eventType: isNowLockdown ? 'LOCKDOWN_TRIGGERED' : 'SYSTEM_OVERRIDE',
      severity: isNowLockdown ? 'CRITICAL' : 'INFO',
      actor: actorName,
      ipTrace: 'SECTOR-04A-OVERRIDE',
      details: isNowLockdown
        ? 'EMERGENCY ENTROPIC QUARANTINE PROTOCOL ENGAGED: All public records placed in immutable read-only isolation.'
        : 'Quarantine protocol deactivated: Security threat posture restored to DEFCON 5 (Normal Operations).',
    });

    return { state: updatedState, log };
  },
};
