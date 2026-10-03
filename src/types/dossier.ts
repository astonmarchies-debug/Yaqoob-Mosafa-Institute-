export type AttractorClass = 
  | 'Order'                 // Fixed Point / Deterministic Stable
  | 'Periodic'              // Limit Cycle / Recurring Orbit
  | 'Chaotic'               // Strange Attractor / Sensitive to Initial Conditions
  | 'Hyper-Entropy'         // Non-Conservative Information / Stochastic Drift
  | 'Axiomatic'             // Foundational Logic Shift / Non-Commutative
  | 'Metastable'            // Transient Coherence Phase
  | 'Dispersive'            // Causal Dispersion Field
  | 'Hyperchaotic';         // Multi-Positive Lyapunov Exponents

export type ClearanceLevel = 1 | 2 | 3 | 4 | 5 | 6;

// Universal Roles Based on Real Researcher Capability
export type UniversalCapability = 
  | 'PRINCIPAL_ARCHITECT'   // Aston Marchies (Full Architectural Access & Sovereign Veto)
  | 'THEORY_CREATOR'        // Formulates novel scientific disciplines & mathematical models
  | 'CURATORIAL_EDITOR'     // Composes sandbox manuscripts & errata submissions
  | 'PEER_REVIEWER'         // Evaluates and provides review notes on research proposals
  | 'PUBLIC_OBSERVER';      // Explores declassified archives & interacts with numerical engines

export type ResearchDivision = 
  | 'Division of Non-Linear Dynamics'
  | 'Department of Stochastic Quantum'
  | 'Bureau of Fractal Topology'
  | 'Laboratory of Entropic Hermeneutics'
  | 'Council of Curatorial Axioms'
  | 'Causal Fluctuation Taskforce'
  | 'Division of Axcelnetic Systems'
  | 'Division of Higher Topologies'
  | 'Division of Temporal Mechanics'
  | 'Department of Semiotic Memetics & Rottenology';

export interface ExperimentLog {
  id: string;
  timestamp: string;
  researcher: string;
  notes: string;
  outcome: 'STABLE' | 'DEVIATION' | 'CRITICAL' | 'ANOMALY' | 'CONFIRMED' | 'OPTIMAL';
}

export interface DossierAttachment {
  id: string;
  name: string;
  type: 'image' | 'video' | 'pdf' | 'audio' | 'doc';
  url: string;
  size?: string;
  dateAdded: string;
}

export interface Dossier {
  id: string;
  protocolNumber: string; // e.g. YMI-CHAOS-014
  title: string;
  subtitle: string;
  attractorClass: AttractorClass | string;
  clearanceLevel: ClearanceLevel;
  division: ResearchDivision | string;
  leadResearcher: string;
  dateClassified: string;
  lastRevision: string;
  status: 'CONTAINED' | 'ACTIVE_OBSERVATION' | 'METASTABLE' | 'CRITICAL_ACTIVE' | 'SOVEREIGN_CURATION';
  lyapunovExponent: string; // e.g. "+3.418 s⁻¹"
  fractalDimension: string; // e.g. "D_H = 2.064 ± 0.002"
  entropyRate: string;      // e.g. "ΔS = 4.88 nats/it"
  containmentProtocols: string; // Entropic Containment Protocols
  mathematicalFormulation: string; // Governing Equations & Differential Systems
  description: string;
  redactedSections?: { [key: string]: string }; // Map of redaction token -> clear text
  experimentLogs: ExperimentLog[];
  tags: string[];
  imageUrl?: string;
  attachments?: DossierAttachment[];
  isCustom?: boolean;
  scienceBranchId?: string;
}

export interface ResearcherUser {
  id: string;
  name: string;
  email?: string;
  authProvider?: 'google' | 'microsoft' | 'manual' | 'developer';
  avatarUrl?: string;
  isLoggedIn: boolean;
  capability: UniversalCapability;
  roleTitle: string; // e.g. "Principal Architect", "Theoretical Paradigm Creator"
  affiliation?: string; // Institution / Community / Independent Node
  isDeveloper: boolean;
  canApprove: boolean;
  clearanceLevel: ClearanceLevel;
}

export type SecurityThreatLevel = 'DEFCON_5_NORMAL' | 'DEFCON_3_ELEVATED' | 'DEFCON_1_LOCKDOWN';

export interface SecurityAuditLog {
  id: string;
  timestamp: string;
  eventType: 'AUTH_LOGIN' | 'AUTH_LOGOUT' | 'UNAUTHORIZED_ACCESS_BLOCKED' | 'DOSSIER_MUTATION' | 'INTEGRITY_SCAN' | 'LOCKDOWN_TRIGGERED' | 'SYSTEM_OVERRIDE';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  actor: string;
  actorEmail?: string;
  ipTrace: string;
  details: string;
}

export interface SecuritySystemState {
  threatLevel: SecurityThreatLevel;
  firewallActive: boolean;
  lastIntegrityScan: string;
  checksumHash: string;
  activeSessionsCount: number;
  blockedIntrusionsCount: number;
  isLockdownActive: boolean;
}

export interface ParameterSpec {
  name: string;
  symbol: string;
  defaultValue: number;
  min: number;
  max: number;
  description: string;
}

export interface ScienceBranch {
  id: string;
  name: string;
  founder: string;
  founderBadgeId: string;
  division: ResearchDivision | string;
  dateCreated: string;
  status: 'INSTITUTE_VERIFIED' | 'UNDER_TESTING' | 'PENDING_CURATION' | 'DIVERIFIKASI_INSTITUT';
  category?: string;
  coreParadigm: string;
  foundingAxioms: string[];
  chaosOrderDynamic: string;
  masterEquation: string;
  parameters: ParameterSpec[];
  associatedProtocols: string[];
  tags: string[];
}

export interface ProposalSubmission {
  id: string;
  type: 'EDIT_DOSSIER' | 'NEW_DOSSIER' | 'NEW_SCIENCE_BRANCH';
  targetId: string;
  targetTitle: string;
  authorName: string;
  authorBadgeId?: string;
  authorRoleTitle?: string;
  timestamp: string;
  summaryOfChanges: string;
  proposedData: any;
  status: 'PENDING_CURATION' | 'RATIFIED' | 'REVISION_REQUIRED' | 'REJECTED' | 'MENUNGGU_KURASI' | 'DISETUJUI';
  reviewerNotes?: string;
  reviewedBy?: string;
}

export interface SandboxDraft {
  id: string;
  authorId: string;
  type: 'DOSSIER' | 'SCIENCE_BRANCH';
  title: string;
  lastSaved: string;
  data: any;
}

export interface CommentReply {
  id: string;
  authorName: string;
  authorEmail?: string;
  authorRole: string;
  authorCapability?: UniversalCapability;
  timestamp: string;
  content: string;
  likes?: number;
}

export interface DossierComment {
  id: string;
  targetId: string;
  authorName: string;
  authorEmail?: string;
  authorRole: string;
  authorCapability?: UniversalCapability;
  timestamp: string;
  content: string;
  likes: number;
  dislikes: number;
  replies?: CommentReply[];
}

export interface ReactionState {
  likes: number;
  dislikes: number;
  userVote?: 'like' | 'dislike' | null;
}
