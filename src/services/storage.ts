import { Dossier, ScienceBranch, ProposalSubmission, SandboxDraft, ResearcherUser, ClearanceLevel, UniversalCapability, DossierComment, ReactionState } from '../types/dossier';
import { DEFAULT_DOSSIERS } from '../data/defaultDossiers';
import { DEFAULT_SCIENCE_BRANCHES } from '../data/defaultSciences';

const DOSSIER_KEY = 'ymi_classified_archive_v1';
const SCIENCES_KEY = 'ymi_science_branches_v1';
const PROPOSALS_KEY = 'ymi_proposals_v1';
const DRAFTS_KEY = 'ymi_sandbox_drafts_v1';
const CURRENT_USER_KEY = 'ymi_active_researcher_v1';
const COMMENTS_KEY = 'ymi_dossier_comments_v1';
const REACTIONS_KEY = 'ymi_dossier_reactions_v1';

export interface UniversalRoleDefinition {
  capability: UniversalCapability;
  title: string;
  description: string;
  capabilitiesList: string[];
}

export const UNIVERSAL_ROLES: UniversalRoleDefinition[] = [
  {
    capability: 'PRINCIPAL_ARCHITECT',
    title: 'Principal Architect (System Creator)',
    description: 'Supreme system authority with sovereign curation rights, master root access, and total architectural veto.',
    capabilitiesList: [
      'Instant authorization and direct archiving of anomaly dossiers',
      'Immediate bypass publishing for sandbox research drafts',
      'Full database schema governance and science directory registry',
      'Sovereign veto on all public repository revisions',
    ],
  },
  {
    capability: 'THEORY_CREATOR',
    title: 'Theoretical Paradigm Creator',
    description: 'For researchers formulating novel non-linear disciplines and scientific paradigms.',
    capabilitiesList: [
      'Establish new scientific disciplines in the institutional directory',
      'Formulate foundational axioms and non-linear master equations',
      'Calibrate and test phase-space simulator parameters',
      'Author foundational theoretical papers and treatises',
    ],
  },
  {
    capability: 'CURATORIAL_EDITOR',
    title: 'Curatorial Editor & Manuscript Proposer',
    description: 'For scholars contributing sandbox drafts or proposing errata to classified dossiers.',
    capabilitiesList: [
      'Draft uninhibited manuscripts in the Research Sandbox',
      'Propose empirical errata and supplementary observational data',
      'Submit manuscripts to the peer review curation queue',
    ],
  },
  {
    capability: 'PEER_REVIEWER',
    title: 'Peer Review Curator',
    description: 'For academics and senior fellows evaluating submitted research manuscripts.',
    capabilitiesList: [
      'Review and validate public manuscript submissions',
      'Provide critical peer evaluation notes and feedback',
      'Assist in refining mathematical formulations prior to ratification',
    ],
  },
  {
    capability: 'PUBLIC_OBSERVER',
    title: 'Public Explorer & Observer',
    description: 'For visiting scholars examining declassified records and investigating institute science.',
    capabilitiesList: [
      'Query the entire classified anomaly dossier repository',
      'Declassify and inspect [REDACTED] data sections',
      'Interact with numerical attractor engines in Chaos Lab',
      'Export or print official research dossiers (PDF)',
    ],
  },
];

export const calculateUserProgression = (user: ResearcherUser): ResearcherUser => {
  if (!user.isLoggedIn) return user;

  const cleanEmail = user.email?.toLowerCase().trim() || '';
  const isAston = cleanEmail === 'astonmarchies@gmail.com' || user.id === 'dev-aston';

  // Level 5 is STRICTLY EXCLUSIVE to Aston Marchies
  if (isAston) {
    return {
      ...user,
      capability: 'PRINCIPAL_ARCHITECT',
      roleTitle: 'Principal Architect (System Creator)',
      clearanceLevel: 5,
      isDeveloper: true,
      canApprove: true,
    };
  }

  // Count user contributions across comments, dossiers, and proposals
  let totalComments = 0;
  let totalCustomDossiers = 0;
  let totalProposals = 0;

  try {
    const commentsData = localStorage.getItem('ymi_dossier_comments_v1');
    if (commentsData) {
      const comments: DossierComment[] = JSON.parse(commentsData);
      totalComments = comments.filter((c) => c.authorName === user.name || c.authorEmail === user.email).length;
    }

    const dossierData = localStorage.getItem('ymi_classified_archive_v1');
    if (dossierData) {
      const dossiers: Dossier[] = JSON.parse(dossierData);
      totalCustomDossiers = dossiers.filter((d) => d.isCustom && d.leadResearcher.toLowerCase().includes(user.name.toLowerCase())).length;
    }

    const proposalData = localStorage.getItem('ymi_proposals_v1');
    if (proposalData) {
      const proposals: ProposalSubmission[] = JSON.parse(proposalData);
      totalProposals = proposals.filter((p) => p.authorName === user.name).length;
    }
  } catch (e) {
    console.error(e);
  }

  // Calculate progression based on active contribution
  if (totalCustomDossiers >= 2) {
    return {
      ...user,
      capability: 'THEORY_CREATOR',
      roleTitle: 'Theoretical Paradigm Creator',
      clearanceLevel: 4,
      isDeveloper: false,
      canApprove: false,
    };
  } else if (totalComments >= 3 || totalProposals >= 2) {
    return {
      ...user,
      capability: 'PEER_REVIEWER',
      roleTitle: 'Peer Review Curator',
      clearanceLevel: 3,
      isDeveloper: false,
      canApprove: false,
    };
  } else if (totalProposals >= 1 || totalComments >= 1) {
    return {
      ...user,
      capability: 'CURATORIAL_EDITOR',
      roleTitle: 'Curatorial Editor',
      clearanceLevel: 2,
      isDeveloper: false,
      canApprove: false,
    };
  }

  // Level 1: Default new researcher
  return {
    ...user,
    capability: 'PUBLIC_OBSERVER',
    roleTitle: 'Junior Researcher Observer',
    clearanceLevel: 1,
    isDeveloper: false,
    canApprove: false,
  };
};

export const storageService = {
  // === DOSSIERS ===
  getDossiers(): Dossier[] {
    try {
      const data = localStorage.getItem(DOSSIER_KEY);
      if (!data) {
        localStorage.setItem(DOSSIER_KEY, JSON.stringify(DEFAULT_DOSSIERS));
        return DEFAULT_DOSSIERS;
      }
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(DOSSIER_KEY, JSON.stringify(DEFAULT_DOSSIERS));
        return DEFAULT_DOSSIERS;
      }

      // Always update default dossiers with the latest pristine codebase definitions
      const defaultMap = new Map(DEFAULT_DOSSIERS.map((d) => [d.protocolNumber, d]));
      let updated = false;

      const merged = parsed.map((d: Dossier) => {
        if (!d.isCustom && defaultMap.has(d.protocolNumber)) {
          updated = true;
          return defaultMap.get(d.protocolNumber)!;
        }
        return d;
      });

      // Add any missing default dossiers
      const existingProtocols = new Set(merged.map((d: Dossier) => d.protocolNumber));
      for (const def of DEFAULT_DOSSIERS) {
        if (!existingProtocols.has(def.protocolNumber)) {
          merged.unshift(def);
          updated = true;
        }
      }

      if (updated) {
        localStorage.setItem(DOSSIER_KEY, JSON.stringify(merged));
      }

      return merged;
    } catch {
      return DEFAULT_DOSSIERS;
    }
  },

  saveDossiers(dossiers: Dossier[]): void {
    try {
      localStorage.setItem(DOSSIER_KEY, JSON.stringify(dossiers));
    } catch (err) {
      console.error('Failed to save dossiers', err);
    }
  },

  addDossier(dossier: Dossier): Dossier[] {
    const current = this.getDossiers();
    const updated = [dossier, ...current];
    this.saveDossiers(updated);
    return updated;
  },

  updateDossier(dossier: Dossier): Dossier[] {
    const current = this.getDossiers();
    const updated = current.map((d) => (d.id === dossier.id ? dossier : d));
    this.saveDossiers(updated);
    return updated;
  },

  deleteDossier(id: string): Dossier[] {
    const current = this.getDossiers();
    const updated = current.filter((d) => d.id !== id);
    this.saveDossiers(updated);
    return updated;
  },

  resetToDefault(): Dossier[] {
    localStorage.removeItem(DOSSIER_KEY);
    localStorage.setItem(DOSSIER_KEY, JSON.stringify(DEFAULT_DOSSIERS));
    return DEFAULT_DOSSIERS;
  },

  // === SCIENCE BRANCHES ===
  getScienceBranches(): ScienceBranch[] {
    try {
      const data = localStorage.getItem(SCIENCES_KEY);
      if (!data) {
        localStorage.setItem(SCIENCES_KEY, JSON.stringify(DEFAULT_SCIENCE_BRANCHES));
        return DEFAULT_SCIENCE_BRANCHES;
      }
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(SCIENCES_KEY, JSON.stringify(DEFAULT_SCIENCE_BRANCHES));
        return DEFAULT_SCIENCE_BRANCHES;
      }
      return parsed;
    } catch {
      return DEFAULT_SCIENCE_BRANCHES;
    }
  },

  saveScienceBranches(branches: ScienceBranch[]): void {
    try {
      localStorage.setItem(SCIENCES_KEY, JSON.stringify(branches));
    } catch (err) {
      console.error('Failed to save science branches', err);
    }
  },

  // === PROPOSALS ===
  getProposals(): ProposalSubmission[] {
    try {
      const data = localStorage.getItem(PROPOSALS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveProposals(proposals: ProposalSubmission[]): void {
    try {
      localStorage.setItem(PROPOSALS_KEY, JSON.stringify(proposals));
    } catch (err) {
      console.error('Failed to save proposals', err);
    }
  },

  addProposal(proposal: ProposalSubmission): ProposalSubmission[] {
    const current = this.getProposals();
    const updated = [proposal, ...current];
    this.saveProposals(updated);
    return updated;
  },

  updateProposalStatus(id: string, status: 'RATIFIED' | 'REVISION_REQUIRED' | 'PENDING_CURATION', reviewerName: string, notes?: string): ProposalSubmission[] {
    const current = this.getProposals();
    const updated = current.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          status: status === 'RATIFIED' ? 'RATIFIED' as const : 'REVISION_REQUIRED' as const,
          curatorReviewNotes: notes || `Reviewed by ${reviewerName}`,
        };
      }
      return p;
    });
    this.saveProposals(updated);
    return updated;
  },

  // === DRAFTS ===
  getDrafts(userId: string): SandboxDraft[] {
    try {
      const data = localStorage.getItem(DRAFTS_KEY);
      const list: SandboxDraft[] = data ? JSON.parse(data) : [];
      return list.filter((d) => d.authorId === userId);
    } catch {
      return [];
    }
  },

  saveDraft(draft: SandboxDraft): SandboxDraft[] {
    try {
      const data = localStorage.getItem(DRAFTS_KEY);
      const list: SandboxDraft[] = data ? JSON.parse(data) : [];
      const index = list.findIndex((d) => d.id === draft.id);
      let updated: SandboxDraft[];
      if (index >= 0) {
        updated = list.map((d) => (d.id === draft.id ? draft : d));
      } else {
        updated = [draft, ...list];
      }
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  deleteDraft(id: string): SandboxDraft[] {
    try {
      const data = localStorage.getItem(DRAFTS_KEY);
      const list: SandboxDraft[] = data ? JSON.parse(data) : [];
      const updated = list.filter((d) => d.id !== id);
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  // === ACTIVE USER ===
  getActiveUser(): ResearcherUser {
    try {
      const data = localStorage.getItem(CURRENT_USER_KEY);
      if (data) {
        const parsed: ResearcherUser = JSON.parse(data);
        return calculateUserProgression(parsed);
      }
    } catch {}

    // Default Guest state
    return {
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
  },

  setActiveUser(user: ResearcherUser): void {
    try {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } catch (err) {
      console.error('Failed to set active user', err);
    }
  },

  exportDatabaseJSON(): string {
    const dossiers = this.getDossiers();
    const branches = this.getScienceBranches();
    const proposals = this.getProposals();
    return JSON.stringify({ dossiers, branches, proposals, exportedAt: new Date().toISOString() }, null, 2);
  },

  importDatabaseJSON(jsonStr: string): { dossiers: Dossier[]; branches: ScienceBranch[] } {
    const parsed = JSON.parse(jsonStr);
    if (!parsed.dossiers || !Array.isArray(parsed.dossiers)) {
      throw new Error('Invalid JSON structure: missing "dossiers" array.');
    }
    this.saveDossiers(parsed.dossiers);
    if (parsed.branches && Array.isArray(parsed.branches)) {
      this.saveScienceBranches(parsed.branches);
    }
    return { dossiers: parsed.dossiers, branches: this.getScienceBranches() };
  },

  // === REACTIONS (LIKE / DISLIKE) ===
  getReactions(targetId: string, userId?: string): ReactionState {
    try {
      const data = localStorage.getItem(REACTIONS_KEY);
      const allReactions: { [key: string]: { likes: number; dislikes: number; votes: { [uid: string]: 'like' | 'dislike' } } } = data ? JSON.parse(data) : {};
      const target = allReactions[targetId] || { likes: 0, dislikes: 0, votes: {} };
      const userVote = userId ? target.votes?.[userId] || null : null;
      return {
        likes: target.likes || 0,
        dislikes: target.dislikes || 0,
        userVote,
      };
    } catch {
      return { likes: 0, dislikes: 0, userVote: null };
    }
  },

  toggleReaction(targetId: string, voteType: 'like' | 'dislike', userId: string): ReactionState {
    try {
      const data = localStorage.getItem(REACTIONS_KEY);
      const allReactions: { [key: string]: { likes: number; dislikes: number; votes: { [uid: string]: 'like' | 'dislike' } } } = data ? JSON.parse(data) : {};
      
      if (!allReactions[targetId]) {
        allReactions[targetId] = { likes: 0, dislikes: 0, votes: {} };
      }

      const target = allReactions[targetId];
      if (!target.votes) target.votes = {};

      const currentVote = target.votes[userId];

      if (currentVote === voteType) {
        // Toggle off
        delete target.votes[userId];
        if (voteType === 'like') target.likes = Math.max(0, target.likes - 1);
        else target.dislikes = Math.max(0, target.dislikes - 1);
      } else {
        // Switching vote
        if (currentVote === 'like') target.likes = Math.max(0, target.likes - 1);
        if (currentVote === 'dislike') target.dislikes = Math.max(0, target.dislikes - 1);

        target.votes[userId] = voteType;
        if (voteType === 'like') target.likes += 1;
        else target.dislikes += 1;
      }

      localStorage.setItem(REACTIONS_KEY, JSON.stringify(allReactions));
      return {
        likes: target.likes,
        dislikes: target.dislikes,
        userVote: target.votes[userId] || null,
      };
    } catch {
      return { likes: 0, dislikes: 0, userVote: null };
    }
  },

  // === COMMENTS ===
  getComments(targetId: string): DossierComment[] {
    try {
      const data = localStorage.getItem(COMMENTS_KEY);
      const allComments: DossierComment[] = data ? JSON.parse(data) : [];
      return allComments.filter((c) => c.targetId === targetId);
    } catch {
      return [];
    }
  },

  addComment(comment: DossierComment): DossierComment[] {
    try {
      const data = localStorage.getItem(COMMENTS_KEY);
      const allComments: DossierComment[] = data ? JSON.parse(data) : [];
      const updated = [comment, ...allComments];
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(updated));
      return updated.filter((c) => c.targetId === comment.targetId);
    } catch {
      return [];
    }
  },

  deleteComment(commentId: string, targetId: string): DossierComment[] {
    try {
      const data = localStorage.getItem(COMMENTS_KEY);
      const allComments: DossierComment[] = data ? JSON.parse(data) : [];
      const updated = allComments.filter((c) => c.id !== commentId);
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(updated));
      return updated.filter((c) => c.targetId === targetId);
    } catch {
      return [];
    }
  },

  reactToComment(commentId: string, voteType: 'like' | 'dislike', targetId: string, userId: string): DossierComment[] {
    try {
      const data = localStorage.getItem(COMMENTS_KEY);
      const allComments: DossierComment[] = data ? JSON.parse(data) : [];
      
      // Load vote record
      const votesKey = `ymi_comment_votes_${userId || 'guest'}`;
      const savedVotesStr = localStorage.getItem(votesKey);
      const savedVotes: { [commentId: string]: 'like' | 'dislike' } = savedVotesStr ? JSON.parse(savedVotesStr) : {};
      
      const currentVote = savedVotes[commentId];
      
      if (currentVote === voteType) {
        // Toggle off
        delete savedVotes[commentId];
      } else {
        // Set vote or switch vote
        savedVotes[commentId] = voteType;
      }
      
      localStorage.setItem(votesKey, JSON.stringify(savedVotes));

      const updated = allComments.map((c) => {
        if (c.id === commentId) {
          let likesDiff = 0;
          let dislikesDiff = 0;
          
          if (currentVote === voteType) {
            // Remove existing vote
            if (voteType === 'like') likesDiff = -1;
            else dislikesDiff = -1;
          } else {
            // Apply new vote, remove old vote if switched
            if (currentVote === 'like') likesDiff = -1;
            if (currentVote === 'dislike') dislikesDiff = -1;
            
            if (voteType === 'like') likesDiff += 1;
            else dislikesDiff += 1;
          }

          return {
            ...c,
            likes: Math.max(0, c.likes + likesDiff),
            dislikes: Math.max(0, c.dislikes + dislikesDiff),
          };
        }
        return c;
      });
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(updated));
      return updated.filter((c) => c.targetId === targetId);
    } catch {
      return [];
    }
  },

  addCommentReply(commentId: string, reply: any, targetId: string): DossierComment[] {
    try {
      const data = localStorage.getItem(COMMENTS_KEY);
      const allComments: DossierComment[] = data ? JSON.parse(data) : [];
      const updated = allComments.map((c) => {
        if (c.id === commentId) {
          const currentReplies = c.replies || [];
          return {
            ...c,
            replies: [...currentReplies, reply],
          };
        }
        return c;
      });
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(updated));
      return updated.filter((c) => c.targetId === targetId);
    } catch {
      return [];
    }
  },

  deleteCommentReply(commentId: string, replyId: string, targetId: string): DossierComment[] {
    try {
      const data = localStorage.getItem(COMMENTS_KEY);
      const allComments: DossierComment[] = data ? JSON.parse(data) : [];
      const updated = allComments.map((c) => {
        if (c.id === commentId) {
          const currentReplies = c.replies || [];
          return {
            ...c,
            replies: currentReplies.filter((r) => r.id !== replyId),
          };
        }
        return c;
      });
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(updated));
      return updated.filter((c) => c.targetId === targetId);
    } catch {
      return [];
    }
  },
};
