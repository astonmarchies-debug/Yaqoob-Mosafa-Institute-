import React, { useState, useEffect } from 'react';
import { Dossier, ScienceBranch, SandboxDraft, ResearcherUser, AttractorClass, ClearanceLevel } from '../types/dossier';
import { storageService } from '../services/storage';
import { 
  FolderKanban, Edit3, Trash2, Plus, FileText, Sparkles, 
  Check, X, Shield, Cpu, BookOpen, AlertCircle, Save, ArrowRight
} from 'lucide-react';

interface MyWorksViewProps {
  currentUser: ResearcherUser;
  dossiers: Dossier[];
  onDossiersUpdated: (updated: Dossier[]) => void;
  onSelectDossier: (dossier: Dossier) => void;
  onOpenCreateStudio: () => void;
  onOpenAuthModal?: () => void;
}

export const MyWorksView: React.FC<MyWorksViewProps> = ({
  currentUser,
  dossiers,
  onDossiersUpdated,
  onSelectDossier,
  onOpenCreateStudio,
  onOpenAuthModal,
}) => {
  const [editingDossier, setEditingDossier] = useState<Dossier | null>(null);
  const [editingDraft, setEditingDraft] = useState<SandboxDraft | null>(null);
  const [drafts, setDrafts] = useState<SandboxDraft[]>([]);
  const [notice, setNotice] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (currentUser.id) {
      setDrafts(storageService.getDrafts(currentUser.id));
    }
  }, [currentUser.id]);

  // Filter works created by or attributed to the active user
  const myDossiers = dossiers.filter((d) => {
    if (!currentUser.isLoggedIn) return false;
    if (!d.isCustom) return false;
    const authorMatch = d.leadResearcher.toLowerCase().includes(currentUser.name.toLowerCase());
    const emailMatch = currentUser.email ? d.leadResearcher.toLowerCase().includes(currentUser.email.toLowerCase()) : false;
    return authorMatch || emailMatch;
  });

  const handleDeleteDossier = (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action is permanent.`)) return;

    const updated = dossiers.filter((d) => d.id !== id);
    storageService.saveDossiers(updated);
    onDossiersUpdated(updated);

    setNotice({ text: `Successfully deleted "${title}" from your personal portfolio.`, type: 'success' });
    setTimeout(() => setNotice(null), 3000);
  };

  const handleDeleteDraft = (id: string, title: string) => {
    if (!window.confirm(`Delete draft "${title}"?`)) return;

    const updated = storageService.deleteDraft(id);
    setDrafts(updated.filter((d) => d.authorId === currentUser.id));

    setNotice({ text: `Deleted draft "${title}".`, type: 'success' });
    setTimeout(() => setNotice(null), 3000);
  };

  const handleSaveEditedDossier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDossier) return;

    const updated = dossiers.map((d) => (d.id === editingDossier.id ? editingDossier : d));
    storageService.saveDossiers(updated);
    onDossiersUpdated(updated);

    setEditingDossier(null);
    setNotice({ text: `Updated "${editingDossier.title}" successfully.`, type: 'success' });
    setTimeout(() => setNotice(null), 3000);
  };

  if (!currentUser.isLoggedIn) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 font-sans">
        <div className="p-8 text-center bg-[#070c09] border border-[#1d3226] rounded-2xl space-y-4 shadow-2xl font-mono">
          <FolderKanban className="w-12 h-12 text-[#c5a059] mx-auto opacity-80" />
          <h2 className="text-xl font-bold text-[#f5eedf]">Personal Portfolio ("My Works") Locked</h2>
          <p className="text-xs text-[#8a9d91] max-w-md mx-auto leading-relaxed font-sans">
            Please sign in with your Google or Microsoft account to view, edit, or manage your personal research works, custom dossiers, and sandbox drafts.
          </p>
          {onOpenAuthModal && (
            <button
              onClick={onOpenAuthModal}
              className="mt-2 px-5 py-2.5 rounded-xl bg-[#c5a059] text-black font-bold text-xs hover:bg-[#d8b26a] transition-all cursor-pointer shadow-lg"
            >
              Sign In to Access Portfolio
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#1c2e23]">
        <div>
          <div className="text-xs font-mono text-[#c5a059] font-bold uppercase tracking-wider flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-[#c5a059]" />
            <span>Personal Researcher Portfolio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#f5eedf] mt-1">
            My Works & Manuscripts
          </h1>
          <p className="text-xs sm:text-sm text-[#8c9f93] font-editorial mt-0.5">
            Manage, edit, or curate dossiers and manuscripts created by {currentUser.name} ({currentUser.roleTitle}).
          </p>
        </div>

        <button
          onClick={onOpenCreateStudio}
          className="px-4 py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#d6b068] text-black font-bold font-mono text-xs flex items-center gap-2 transition-all shadow-lg shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Work</span>
        </button>
      </div>

      {/* Notice Banner */}
      {notice && (
        <div className="mb-6 p-3.5 bg-emerald-950/60 border border-emerald-700/60 rounded-xl text-emerald-300 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notice.text}</span>
        </div>
      )}

      {/* Section 1: Custom Dossiers & Anomaly Records */}
      <section className="mb-10 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[#8a9e91]">
          <h3 className="font-bold text-[#f5eedf] uppercase tracking-wider text-sm">
            My Classified Dossiers ({myDossiers.length})
          </h3>
          <span>Sector 04-A Vault</span>
        </div>

        {myDossiers.length === 0 ? (
          <div className="p-8 text-center bg-[#070c09] border border-[#192b20] rounded-xl text-xs font-mono text-[#768a7d] space-y-3">
            <p>You have not created any custom dossiers in your portfolio yet.</p>
            <button
              onClick={onOpenCreateStudio}
              className="px-4 py-2 rounded-lg bg-[#14261c] hover:bg-[#1d3829] border border-[#233f2e] text-[#c5a059] font-bold text-xs"
            >
              Compose New Anomaly Dossier
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myDossiers.map((dossier) => (
              <div
                key={dossier.id}
                className="p-5 bg-[#080d0a] border border-[#1c2e23] hover:border-[#2f4f3c] rounded-xl transition-all space-y-3 shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#c5a059] uppercase px-2 py-0.5 rounded bg-[#101c15] border border-[#1e3427]">
                      {dossier.protocolNumber}
                    </span>
                    <h4 className="text-base font-display font-bold text-[#f5eedf] mt-1.5 leading-snug">
                      {dossier.title}
                    </h4>
                    <p className="text-xs text-[#8a9e91] font-editorial italic">
                      {dossier.subtitle}
                    </p>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-1 rounded border border-rose-800/60 bg-rose-950/30 text-rose-300 font-bold shrink-0">
                    L-{dossier.clearanceLevel}
                  </span>
                </div>

                <p className="text-xs text-[#b0c0b6] line-clamp-2 leading-relaxed">
                  {dossier.description}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-[#16271e] text-xs font-mono">
                  <button
                    onClick={() => onSelectDossier(dossier)}
                    className="text-[#c5a059] hover:underline font-bold flex items-center gap-1"
                  >
                    <span>View Record</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingDossier(dossier)}
                      className="px-2.5 py-1 rounded bg-[#122218] hover:bg-[#1c3527] border border-[#234230] text-[#91a89b] hover:text-[#f0ece1] flex items-center gap-1 transition-colors"
                      title="Edit Dossier"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteDossier(dossier.id, dossier.title)}
                      className="px-2.5 py-1 rounded bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/50 text-rose-400 flex items-center gap-1 transition-colors"
                      title="Delete Dossier"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section 2: Sandbox Drafts */}
      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[#8a9e91]">
          <h3 className="font-bold text-[#f5eedf] uppercase tracking-wider text-sm">
            Saved Sandbox Drafts ({drafts.length})
          </h3>
          <span>Working Manuscripts</span>
        </div>

        {drafts.length === 0 ? (
          <div className="p-6 text-center bg-[#070c09] border border-[#192b20] rounded-xl text-xs font-mono text-[#768a7d]">
            No pending sandbox drafts found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className="p-4 bg-[#060b08] border border-[#182a1f] rounded-xl space-y-2 text-xs font-mono"
              >
                <div className="flex items-center justify-between text-[#788c80]">
                  <span className="text-[10px] font-bold text-[#c5a059] uppercase">{draft.type} DRAFT</span>
                  <span className="text-[10px]">{draft.lastSaved}</span>
                </div>

                <h5 className="font-bold text-[#f0ece1] truncate">{draft.title || 'Untitled Draft'}</h5>

                <div className="flex items-center justify-between pt-2 border-t border-[#132219]">
                  <button
                    onClick={onOpenCreateStudio}
                    className="text-[#c5a059] hover:underline text-[11px] font-bold"
                  >
                    Open in Studio
                  </button>

                  <button
                    onClick={() => handleDeleteDraft(draft.id, draft.title)}
                    className="text-rose-400 hover:text-rose-300"
                    title="Delete Draft"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Editing Modal for Dossiers */}
      {editingDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans">
          <div className="w-full max-w-2xl bg-[#080d0a] border border-[#23382c] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="px-5 py-4 bg-[#0d1612] border-b border-[#1b2b22] flex items-center justify-between">
              <h3 className="text-sm font-display font-bold text-[#f5eedf] flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#c5a059]" />
                <span>Edit Dossier: {editingDossier.protocolNumber}</span>
              </h3>
              <button onClick={() => setEditingDossier(null)} className="text-[#889b90] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedDossier} className="p-5 overflow-y-auto space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#718478] text-[10px] uppercase mb-1">Title</label>
                <input
                  type="text"
                  value={editingDossier.title}
                  onChange={(e) => setEditingDossier({ ...editingDossier, title: e.target.value })}
                  className="w-full bg-[#040705] border border-[#1b2b22] rounded p-2 text-xs text-[#f0ece1] focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#718478] text-[10px] uppercase mb-1">Subtitle</label>
                <input
                  type="text"
                  value={editingDossier.subtitle}
                  onChange={(e) => setEditingDossier({ ...editingDossier, subtitle: e.target.value })}
                  className="w-full bg-[#040705] border border-[#1b2b22] rounded p-2 text-xs text-[#f0ece1] focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#718478] text-[10px] uppercase mb-1">Containment Protocols</label>
                <textarea
                  rows={3}
                  value={editingDossier.containmentProtocols}
                  onChange={(e) => setEditingDossier({ ...editingDossier, containmentProtocols: e.target.value })}
                  className="w-full bg-[#040705] border border-[#1b2b22] rounded p-2 text-xs text-[#f0ece1] focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#718478] text-[10px] uppercase mb-1">Description</label>
                <textarea
                  rows={4}
                  value={editingDossier.description}
                  onChange={(e) => setEditingDossier({ ...editingDossier, description: e.target.value })}
                  className="w-full bg-[#040705] border border-[#1b2b22] rounded p-2 text-xs text-[#f0ece1] focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#718478] text-[10px] uppercase mb-1">Mathematical Formulation</label>
                <textarea
                  rows={2}
                  value={editingDossier.mathematicalFormulation}
                  onChange={(e) => setEditingDossier({ ...editingDossier, mathematicalFormulation: e.target.value })}
                  className="w-full bg-[#040705] border border-[#1b2b22] rounded p-2 text-xs font-mono text-[#8be2a8] focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#1b2b22] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingDossier(null)}
                  className="px-4 py-2 rounded bg-[#18281e] text-[#8aa093] hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#c5a059] text-black font-bold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
