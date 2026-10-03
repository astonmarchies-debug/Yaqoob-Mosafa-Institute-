import React, { useState, useEffect } from 'react';
import { SandboxDraft, ProposalSubmission, ResearcherUser, Dossier, AttractorClass, ResearchDivision } from '../types/dossier';
import { storageService } from '../services/storage';
import { securityService } from '../services/securityService';
import { 
  Upload, FileText, Send, Check, Trash2, CheckCircle2, 
  Crown, Sparkles, Plus, AlertCircle, Lock, LogIn, ShieldAlert, HelpCircle, Tag, X,
  Paperclip, Image as ImageIcon, Video, File, Music
} from 'lucide-react';
import { DossierAttachment } from '../types/dossier';
import { DeveloperAbnormalModel } from './DeveloperAbnormalModel';

interface ResearchStudioViewProps {
  currentUser: ResearcherUser;
  dossiers: Dossier[];
  onSelectDossier: (d: Dossier) => void;
  onDossiersUpdated: (dossiers: Dossier[]) => void;
  defaultSubTab?: 'upload' | 'drafts' | 'proposals';
  onOpenAuthModal?: () => void;
}

export const ResearchStudioView: React.FC<ResearchStudioViewProps> = ({
  currentUser,
  dossiers,
  onSelectDossier,
  onDossiersUpdated,
  defaultSubTab = 'upload',
  onOpenAuthModal,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'upload' | 'drafts' | 'proposals' | 'secret_abnormal'>(defaultSubTab);

  // Custom Attractor Classes / Categories state (persisted in localStorage)
  const [customClasses, setCustomClasses] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ymi_custom_attractor_classes');
      return saved ? JSON.parse(saved) : ['Chaotic', 'Periodic', 'Order', 'Hyper-Entropy', 'Axiomatic', 'Metastable', 'Dispersive', 'Hyperchaotic'];
    } catch {
      return ['Chaotic', 'Periodic', 'Order', 'Hyper-Entropy', 'Axiomatic', 'Metastable', 'Dispersive', 'Hyperchaotic'];
    }
  });
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // === 1. UPLOAD STATES ===
  const [docTitle, setDocTitle] = useState('');
  const [docSubtitle, setDocSubtitle] = useState('');
  const [docClass, setDocClass] = useState<string>(customClasses[0] || 'Chaotic');
  const [docDivision, setDocDivision] = useState<ResearchDivision>('Division of Non-Linear Dynamics');
  const [docDescription, setDocDescription] = useState('');
  const [docContainment, setDocContainment] = useState('');
  const [attachments, setAttachments] = useState<DossierAttachment[]>([]);
  const [uploadNotice, setUploadNotice] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      
      let fileType: 'image' | 'video' | 'pdf' | 'audio' | 'doc' = 'doc';
      if (file.type.startsWith('image/')) fileType = 'image';
      else if (file.type.startsWith('video/')) fileType = 'video';
      else if (file.type.startsWith('audio/')) fileType = 'audio';
      else if (file.type === 'application/pdf') fileType = 'pdf';

      reader.onload = (event) => {
        const fileDataUrl = event.target?.result as string;
        const newAttachment: DossierAttachment = {
          id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name: file.name,
          type: fileType,
          url: fileDataUrl,
          size: fileSizeMB,
          dateAdded: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        };
        setAttachments((prev) => [...prev, newAttachment]);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  // === 2. DRAFTS STATES ===
  const [drafts, setDrafts] = useState<SandboxDraft[]>([]);
  const [activeDraftId, setActiveDraftId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftContent, setDraftContent] = useState('');
  const [saveNotice, setSaveNotice] = useState('');

  // === 3. PROPOSALS STATES ===
  const [proposals, setProposals] = useState<ProposalSubmission[]>([]);
  const [selectedTargetId, setSelectedTargetId] = useState(dossiers[0]?.id || '');
  const [summaryOfChanges, setSummaryOfChanges] = useState('');
  const [proposedText, setProposedText] = useState('');
  const [submitNotice, setSubmitNotice] = useState('');
  const [reviewNotes, setReviewNotes] = useState<{ [propId: string]: string }>({});

  useEffect(() => {
    setDrafts(storageService.getDrafts(currentUser.id));
    setProposals(storageService.getProposals());
  }, [currentUser]);

  // Handle adding a new custom category / attractor class
  const handleAddCustomCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;

    if (customClasses.map(c => c.toLowerCase()).includes(trimmed.toLowerCase())) {
      alert('This category or attractor class already exists.');
      return;
    }

    const updated = [...customClasses, trimmed];
    setCustomClasses(updated);
    try {
      localStorage.setItem('ymi_custom_attractor_classes', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setDocClass(trimmed);
    setNewCategoryName('');
    setShowCategoryModal(false);
  };

  // Handle Upload
  const handleUploadDossier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim() || !docDescription.trim()) {
      alert('Please fill out at least the title and phenomenological description.');
      return;
    }

    const protoNum = `YMI-RES-${Math.floor(100 + Math.random() * 900)}`;

    const newDoc: Dossier = {
      id: `custom-${Date.now()}`,
      protocolNumber: protoNum,
      title: docTitle.trim(),
      subtitle: docSubtitle.trim() || 'Independent observation accessioned into the institutional registry.',
      attractorClass: docClass,
      clearanceLevel: 2,
      division: docDivision,
      leadResearcher: currentUser.name,
      dateClassified: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      lastRevision: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: 'METASTABLE',
      lyapunovExponent: '+2.140 s⁻¹',
      fractalDimension: 'D_H = 2.04',
      entropyRate: 'ΔS = 3.12 nats/it',
      containmentProtocols: docContainment.trim() || 'Maintain continuous environmental isolation and monitor information radiation.',
      mathematicalFormulation: 'Causal Loop Resonance Criterion: ΔE/Δt ≢ 0',
      description: docDescription.trim(),
      experimentLogs: [
        {
          id: `log-1`,
          timestamp: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          researcher: currentUser.name,
          notes: 'Dossier registration verified and checksum calculated.',
          outcome: 'STABLE',
        },
      ],
      tags: ['Submission', currentUser.roleTitle, String(docClass)],
      attachments: attachments,
      isCustom: true,
    };

    const updated = storageService.addDossier(newDoc);
    onDossiersUpdated(updated);

    securityService.logEvent({
      eventType: 'DOSSIER_MUTATION',
      severity: 'INFO',
      actor: currentUser.name,
      actorEmail: currentUser.email,
      ipTrace: '10.0.4.15 [STUDIO_UPLOAD]',
      details: `New classified record accessioned: ${protoNum} - "${docTitle}" by ${currentUser.name} (${attachments.length} attachments).`,
    });

    setUploadNotice(`Record ${protoNum} successfully registered into the Classified Archive!`);

    setDocTitle('');
    setDocSubtitle('');
    setDocDescription('');
    setDocContainment('');
    setAttachments([]);

    setTimeout(() => {
      setUploadNotice('');
      onSelectDossier(newDoc);
    }, 1800);
  };

  // Draft operations
  const handleCreateNewDraft = () => {
    const newId = `draft-${Date.now()}`;
    const initialContent = `=== RESEARCH WORKING DRAFT ===\nAuthor: ${currentUser.name}\nTopic: Field Dynamics Observation\n\n[Phenomenological Notes]\nRecord observational data and differential equations here...`;

    const newDraft: SandboxDraft = {
      id: newId,
      authorId: currentUser.id,
      type: 'DOSSIER',
      title: 'Working Draft #' + (drafts.length + 1),
      lastSaved: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      data: { text: initialContent },
    };

    const updated = storageService.saveDraft(newDraft);
    setDrafts(updated.filter((d) => d.authorId === currentUser.id));
    setActiveDraftId(newId);
    setDraftTitle(newDraft.title);
    setDraftContent(initialContent);
  };

  const handleSelectDraft = (draft: SandboxDraft) => {
    setActiveDraftId(draft.id);
    setDraftTitle(draft.title);
    setDraftContent(draft.data?.text || '');
  };

  const handleSaveActiveDraft = () => {
    if (!activeDraftId) return;
    const updatedDraft: SandboxDraft = {
      id: activeDraftId,
      authorId: currentUser.id,
      type: 'DOSSIER',
      title: draftTitle.trim() || 'Untitled Manuscript',
      lastSaved: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      data: { text: draftContent },
    };

    const list = storageService.saveDraft(updatedDraft);
    setDrafts(list.filter((d) => d.authorId === currentUser.id));
    setSaveNotice('Draft saved to local client storage.');
    setTimeout(() => setSaveNotice(''), 2500);
  };

  const handleDeleteDraft = (id: string) => {
    const updated = storageService.deleteDraft(id);
    setDrafts(updated.filter((d) => d.authorId === currentUser.id));
    if (activeDraftId === id) {
      setActiveDraftId(null);
      setDraftTitle('');
      setDraftContent('');
    }
  };

  // Proposal submissions
  const handleSubmitEditProposal = (e: React.FormEvent) => {
    e.preventDefault();
    const targetDoc = dossiers.find((d) => d.id === selectedTargetId);
    if (!targetDoc) return;

    const proposal: ProposalSubmission = {
      id: `prop-${Date.now()}`,
      type: 'EDIT_DOSSIER',
      targetId: targetDoc.id,
      targetTitle: `${targetDoc.protocolNumber}: ${targetDoc.title}`,
      authorName: currentUser.name,
      authorBadgeId: currentUser.isDeveloper ? 'DEV-001' : 'CONTRIBUTOR',
      authorRoleTitle: currentUser.roleTitle,
      timestamp: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' UTC',
      summaryOfChanges: summaryOfChanges.trim(),
      proposedData: {
        suggestedText: proposedText.trim(),
        targetProtocol: targetDoc.protocolNumber,
      },
      status: currentUser.isDeveloper ? 'RATIFIED' : 'PENDING_CURATION',
    };

    const updated = storageService.addProposal(proposal);
    setProposals(updated);
    setSubmitNotice('Errata proposal dispatched to curatorial queue.');
    setSummaryOfChanges('');
    setProposedText('');
    setTimeout(() => {
      setSubmitNotice('');
      setActiveSubTab('proposals');
    }, 1500);
  };

  const handleReviewProposal = (id: string, newStatus: 'RATIFIED' | 'REVISION_REQUIRED') => {
    const notes = reviewNotes[id] || (newStatus === 'RATIFIED' ? 'Ratified by Principal Architect' : 'Requires mathematical refinement');
    const updated = storageService.updateProposalStatus(id, newStatus, currentUser.name, notes);
    setProposals(updated);

    const prop = updated.find((p) => p.id === id);
    if (prop && newStatus === 'RATIFIED' && prop.type === 'EDIT_DOSSIER') {
      const doc = dossiers.find((d) => d.id === prop.targetId);
      if (doc && prop.proposedData?.suggestedText) {
        const modified: Dossier = {
          ...doc,
          description: doc.description + '\n\n[RATIFIED ERRATA]: ' + prop.proposedData.suggestedText,
          lastRevision: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
        };
        const newDocList = storageService.updateDossier(modified);
        onDossiersUpdated(newDocList);
      }
    }
  };

  // STRICT ACCESS CONTROL
  if (!currentUser.isLoggedIn) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-20 text-center font-mono space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#170e08] border-2 border-[#ff9933]/70 mx-auto flex items-center justify-center text-[#ffaa3b] shadow-2xl animate-pulse">
          <Lock className="w-8 h-8" />
        </div>
        <div className="text-xs uppercase text-[#ffaa3b] tracking-widest font-bold">
          ACCESS RESTRICTED // SECTOR 04-A SURVEILLANCE & SECURITY
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#f5eedf]">
          Authentication Required to Access Research Studio
        </h2>
        <p className="text-xs sm:text-sm text-[#b8a798] max-w-lg mx-auto leading-relaxed">
          Pursuant to institutional data containment bylaws, only verified researchers (Google SSO / Principal Architect) may register new anomaly dossiers, compose sandbox manuscripts, or submit curatorial errata.
        </p>
        <div className="pt-3 flex justify-center">
          <button
            onClick={onOpenAuthModal}
            className="px-6 py-3 rounded-lg bg-[#c5a059] text-[#060a08] font-bold text-xs hover:bg-[#d8b56d] transition-all shadow-lg flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In with Google SSO</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-6">
      
      {/* Header */}
      <div className="border-b border-[#1b2b22] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#c5a059] font-bold">
            RESEARCH STUDIO & EXPERIMENTAL LAB · YAQOOB MOSAFA INSTITUTE
          </span>
          <h1 className="text-2xl sm:text-4xl font-display font-bold text-[#f5eedf] mt-1">
            Research Studio & Manuscript Vault
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#9ab0a4] max-w-2xl leading-relaxed">
            Directly register novel classified records, use the Sandbox for uninhibited drafting, 
            and submit peer-review errata proposals to the curatorial queue.
          </p>
        </div>

        {/* Responsive Sub-tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#09110e] border border-[#1b2b23] rounded-lg text-xs font-mono self-start md:self-auto shrink-0 overflow-x-auto w-full md:w-auto">
          <button
            onClick={() => setActiveSubTab('upload')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'upload'
                ? 'bg-[#182c22] text-[#e6c679] border border-[#2e4739] font-bold shadow-sm'
                : 'text-[#809187] hover:text-[#d3ddd7]'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Register Dossier</span>
          </button>
          
          <button
            onClick={() => setActiveSubTab('drafts')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'drafts'
                ? 'bg-[#182c22] text-[#e6c679] border border-[#2e4739] font-bold shadow-sm'
                : 'text-[#809187] hover:text-[#d3ddd7]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Sandbox Drafts ({drafts.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('proposals')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'proposals'
                ? 'bg-[#182c22] text-[#e6c679] border border-[#2e4739] font-bold shadow-sm'
                : 'text-[#809187] hover:text-[#d3ddd7]'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Curatorial Queue ({proposals.length})</span>
          </button>

          {/* DEVELOPER EXCLUSIVE TAB */}
          {currentUser.isDeveloper && (
            <button
              onClick={() => setActiveSubTab('secret_abnormal')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap border ${
                activeSubTab === 'secret_abnormal'
                  ? 'bg-[#241a0d] text-[#ffdd80] border-[#c5a059] font-bold'
                  : 'text-[#c5a059] border-[#c5a059]/40 hover:bg-[#1a140b]'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-[#e6c679]" />
              <span>Abnormal Models (Dev)</span>
            </button>
          )}
        </div>
      </div>

      {/* ================= 1. SUB-TAB: REGISTER NEW DOSSIER ================= */}
      {activeSubTab === 'upload' && (
        <div className="w-full">
          <form onSubmit={handleUploadDossier} className="bg-[#080e0b] border border-[#1d2d24] rounded-xl p-5 sm:p-8 space-y-5 font-mono text-xs shadow-xl">
            
            <div className="border-b border-[#18261e] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-display font-bold text-[#f5eedf]">
                  New Anomaly Dossier Registration Form
                </h2>
                <p className="text-xs text-[#82948a] font-sans mt-0.5">
                  Complete the accession specification below to publish a novel record into the classified archives.
                </p>
              </div>
              <span className="self-start sm:self-auto px-2.5 py-1 rounded bg-[#13221b] border border-[#243a2d] text-[#c5a059] text-[10px]">
                Investigator: {currentUser.name}
              </span>
            </div>

            {uploadNotice && (
              <div className="p-3 bg-emerald-950/50 border border-emerald-700/60 rounded text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{uploadNotice}</span>
              </div>
            )}

            <div>
              <label className="block text-[#8c9c93] mb-1 uppercase">
                Anomaly Designation / Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Acoustic Tower Resonance, Inverted Mirror Wavefront..."
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                className="w-full bg-[#050907] border border-[#1d2d25] rounded-md px-3.5 py-2.5 text-sm text-[#f0ece1] focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#8c9c93] mb-1 uppercase">
                  Subtitle / Phenomenon Synopsis
                </label>
                <input
                  type="text"
                  placeholder="e.g., Spontaneous sympathetic vibration propagation across phase boundaries"
                  value={docSubtitle}
                  onChange={(e) => setDocSubtitle(e.target.value)}
                  className="w-full bg-[#050907] border border-[#1d2d25] rounded-md px-3 py-2 text-xs text-[#e8e2d8] focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[#8c9c93] uppercase">
                    Attractor Class / Category *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(true)}
                    className="text-[#c5a059] hover:underline flex items-center gap-1 font-semibold text-[11px]"
                  >
                    <Plus className="w-3 h-3" /> + Add Custom Category
                  </button>
                </div>
                <select
                  value={docClass}
                  onChange={(e: any) => setDocClass(e.target.value)}
                  className="w-full bg-[#050907] border border-[#1d2d25] rounded-md px-3 py-2 text-xs text-[#e8e2d8] focus:outline-none focus:border-[#c5a059]"
                >
                  {customClasses.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls} {cls === 'Chaotic' ? '(Sensitive & Non-Periodic)' : cls === 'Periodic' ? '(Cyclic Orbit)' : cls === 'Order' ? '(Stable Manifold)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Custom Category Modal Inline */}
            {showCategoryModal && (
              <div className="p-4 bg-[#0d1612] border border-[#c5a059]/60 rounded-lg space-y-3">
                <div className="flex items-center justify-between text-[#f5eedf] font-bold">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-[#c5a059]" /> Add New Custom Attractor Class / Category
                  </span>
                  <button onClick={() => setShowCategoryModal(false)} className="text-[#819289] hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-[#93a79d] font-sans">
                  Create a new mathematical or dynamical category for classifying anomaly records in the institute archive.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g., Quantum-Stochastic, Non-Commutative, Singular..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="flex-1 bg-[#050907] border border-[#22362b] rounded px-3 py-1.5 text-xs text-[#f0ece1] focus:outline-none focus:border-[#c5a059]"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomCategory}
                    className="px-4 py-1.5 bg-[#c5a059] text-black font-bold rounded hover:bg-[#d8b56d] transition-colors"
                  >
                    Save Category
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-[#8c9c93] mb-1 uppercase">
                Observational Phenomenon Description *
              </label>
              <textarea
                rows={5}
                required
                placeholder="Describe how the phenomenon manifests, triggers, and behaves in empirical testbeds..."
                value={docDescription}
                onChange={(e) => setDocDescription(e.target.value)}
                className="w-full bg-[#050907] border border-[#1d2d25] rounded-md p-3 text-xs text-[#d3ded8] leading-relaxed focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-[#8c9c93] mb-1 uppercase">
                Containment & Mitigation Protocols
              </label>
              <textarea
                rows={3}
                placeholder="Safety instructions to isolate or damp the chaotic contagion..."
                value={docContainment}
                onChange={(e) => setDocContainment(e.target.value)}
                className="w-full bg-[#050907] border border-[#1d2d25] rounded-md p-3 text-xs text-[#d3ded8] leading-relaxed focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            {/* Multi-Media File Attachments Uploader */}
            <div className="p-4 bg-[#050907] border border-[#1b2d23] rounded-lg space-y-3 font-mono">
              <div className="flex items-center justify-between">
                <label className="text-[#c5a059] uppercase font-bold text-xs flex items-center gap-1.5">
                  <Paperclip className="w-4 h-4" /> Attach Research Files (Video, Photo, PDF, Audio, Docs)
                </label>
                <span className="text-[10px] text-[#63776d]">{attachments.length} files attached</span>
              </div>

              <input
                type="file"
                multiple
                accept="image/*,video/*,application/pdf,audio/*,.doc,.docx"
                onChange={handleFileUpload}
                className="block w-full text-xs text-[#8c9c93] file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#182c22] file:text-[#c5a059] hover:file:bg-[#213b2c] cursor-pointer"
              />

              {attachments.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {attachments.map((att) => (
                    <div key={att.id} className="p-2.5 bg-[#08100c] border border-[#1b2f23] rounded flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 truncate">
                        {att.type === 'image' && <ImageIcon className="w-4 h-4 text-emerald-400 shrink-0" />}
                        {att.type === 'video' && <Video className="w-4 h-4 text-sky-400 shrink-0" />}
                        {att.type === 'pdf' && <FileText className="w-4 h-4 text-rose-400 shrink-0" />}
                        {att.type === 'audio' && <Music className="w-4 h-4 text-amber-400 shrink-0" />}
                        {att.type === 'doc' && <File className="w-4 h-4 text-indigo-400 shrink-0" />}
                        <div className="truncate">
                          <div className="text-xs text-[#f0ece1] truncate font-semibold">{att.name}</div>
                          <div className="text-[9px] text-[#6d8276] uppercase">{att.type} · {att.size || 'Attached'}</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttachment(att.id)}
                        className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#18261e] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[11px] text-[#6d7f75]">
                {currentUser.isDeveloper 
                  ? '✓ Instantly ratified by Principal Architect' 
                  : '✓ Digitally signed by ' + currentUser.name + ' (' + currentUser.roleTitle + ')'}
              </span>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-[#c5a059] text-[#060a08] font-bold rounded-md hover:bg-[#d8b56d] transition-colors flex items-center justify-center gap-1.5"
              >
                <Upload className="w-4 h-4 stroke-[2.5]" />
                <span>Publish Record to Archive</span>
              </button>
            </div>

          </form>
        </div>
      )}

      {/* ================= 2. SUB-TAB: SANDBOX DRAFTS ================= */}
      {activeSubTab === 'drafts' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#788880] mb-1">
              <span>Your Manuscripts ({drafts.length})</span>
              <button
                onClick={handleCreateNewDraft}
                className="text-[#c5a059] hover:underline flex items-center gap-1 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" /> + New Draft
              </button>
            </div>

            {drafts.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-[#1c2c23] rounded-lg bg-[#070c09] text-xs text-[#788880]">
                No drafts yet. Click the button above to initialize a new manuscript.
              </div>
            ) : (
              drafts.map((d) => (
                <div
                  key={d.id}
                  onClick={() => handleSelectDraft(d)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    activeDraftId === d.id
                      ? 'bg-[#112019] border-[#c5a059]'
                      : 'bg-[#080e0b] border-[#18261e] hover:border-[#334b3d]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-[#c5a059] font-bold">Manuscript</span>
                    <span className="text-[#64786d]">{d.lastSaved}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-[#e8dfcf] truncate">
                    {d.title}
                  </h4>
                  <div className="mt-2 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDraft(d.id);
                      }}
                      className="text-[11px] text-rose-400 hover:text-rose-300 font-mono"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="lg:col-span-8">
            {activeDraftId ? (
              <div className="bg-[#080d0a] border border-[#1d2d24] rounded-lg p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1b2a22] pb-4">
                  <div className="flex-1">
                    <label className="block text-[10px] font-mono uppercase text-[#73857a] mb-1">
                      Manuscript Title
                    </label>
                    <input
                      type="text"
                      value={draftTitle}
                      onChange={(e) => setDraftTitle(e.target.value)}
                      className="w-full bg-[#050907] border border-[#1c2c23] rounded px-3 py-1.5 text-sm text-[#f0ebe0] font-semibold focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={handleSaveActiveDraft}
                      className="px-3.5 py-1.5 text-xs font-mono font-semibold bg-[#16271e] text-[#c5a059] border border-[#263e30] rounded hover:bg-[#20382b] transition-colors"
                    >
                      Save Manuscript
                    </button>
                  </div>
                </div>

                {saveNotice && (
                  <div className="p-2 text-xs font-mono text-emerald-400 bg-emerald-950/30 rounded border border-emerald-800/40">
                    {saveNotice}
                  </div>
                )}

                <div>
                  <textarea
                    rows={14}
                    value={draftContent}
                    onChange={(e) => setDraftContent(e.target.value)}
                    className="w-full bg-[#050907] border border-[#1b2b22] rounded-md p-4 text-xs font-mono text-[#a5e2ba] leading-relaxed focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>
            ) : (
              <div className="p-16 text-center border border-dashed border-[#1c2c23] rounded-lg bg-[#070c09] text-xs text-[#788880]">
                Select a manuscript from the list or click <strong>+ New Draft</strong>.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= 3. SUB-TAB: CURATORIAL QUEUE ================= */}
      {activeSubTab === 'proposals' && (
        <div className="space-y-6 w-full">
          
          {/* Explanatory Banner for Curatorial Queue */}
          <div className="p-4 bg-[#091410] border border-[#c5a059]/40 rounded-lg text-xs font-mono space-y-2">
            <div className="flex items-center gap-2 text-[#e6c679] font-bold">
              <HelpCircle className="w-4 h-4" />
              <span>What is the Curatorial Queue? (Peer Review & Errata Moderation)</span>
            </div>
            <p className="text-[#a4b5ad] font-sans text-xs leading-relaxed">
              The <strong>Curatorial Queue</strong> is where researchers submit empirical errata, mathematical corrections, or supplementary observational data to existing classified archive dossiers. Once submitted, the <strong>Principal Architect</strong> (Aston Marchies) reviews the proposal and can <strong>Ratify & Merge</strong> it, which automatically updates the live institutional archive record.
            </p>
          </div>

          <form onSubmit={handleSubmitEditProposal} className="bg-[#080e0b] border border-[#1d2d24] rounded-lg p-5 sm:p-6 space-y-4 text-xs font-mono">
            <div className="border-b border-[#192820] pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-display font-bold text-[#f5eedf]">
                  Submit Errata / Supplementary Observation to Target Dossier
                </h3>
                <p className="text-xs text-[#8c9c93] mt-0.5">
                  Propose mathematical corrections or supplementary notes on existing archive records.
                </p>
              </div>
            </div>

            {submitNotice && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 rounded text-xs">
                {submitNotice}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#88998f] mb-1 uppercase">Target Dossier *</label>
                <select
                  value={selectedTargetId}
                  onChange={(e) => setSelectedTargetId(e.target.value)}
                  className="w-full bg-[#050907] border border-[#1c2c23] rounded px-3 py-2 text-xs text-[#f0ebe0] focus:outline-none focus:border-[#c5a059]"
                >
                  {dossiers.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.protocolNumber} - {d.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#88998f] mb-1 uppercase">Rationale Synopsis *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Recalculated Lyapunov spectrum following microwave resonance calibration"
                  value={summaryOfChanges}
                  onChange={(e) => setSummaryOfChanges(e.target.value)}
                  className="w-full bg-[#050907] border border-[#1c2c23] rounded px-3 py-2 text-xs text-[#f0ebe0] focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#88998f] mb-1 uppercase">Proposed Errata Text *</label>
              <textarea
                rows={3}
                required
                placeholder="Enter exact supplementary observations..."
                value={proposedText}
                onChange={(e) => setProposedText(e.target.value)}
                className="w-full bg-[#050907] border border-[#1c2c23] rounded p-3 text-xs text-[#a5e2ba] focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-[#c5a059] text-[#060a08] font-bold rounded hover:bg-[#d8b56d] transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Errata Proposal</span>
              </button>
            </div>
          </form>

          {/* List of Proposals */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#8c9c93] flex items-center justify-between">
              <span>Dispatched Proposals ({proposals.length})</span>
              {currentUser.isDeveloper && (
                <span className="text-[#c5a059] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Principal Architect Sovereign Ratification Active
                </span>
              )}
            </div>

            {proposals.map((prop) => (
              <div
                key={prop.id}
                className="p-5 bg-[#080e0b] border border-[#1c2c23] rounded-lg space-y-2 text-xs font-mono"
              >
                <div className="flex items-center justify-between border-b border-[#16231c] pb-2">
                  <span className="text-[#e8dfcf] font-bold">{prop.targetTitle}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    prop.status === 'RATIFIED' || prop.status === 'DISETUJUI' ? 'text-emerald-400 bg-emerald-950/40' : 'text-amber-400 bg-amber-950/40'
                  }`}>
                    {prop.status === 'DISETUJUI' ? 'RATIFIED' : prop.status === 'MENUNGGU_KURASI' ? 'PENDING_CURATION' : prop.status}
                  </span>
                </div>
                <div className="text-[#899c92]">
                  <strong>Author:</strong> {prop.authorName} · <strong>Rationale:</strong> {prop.summaryOfChanges}
                </div>
                {prop.proposedData?.suggestedText && (
                  <div className="p-3 bg-[#050907] border border-[#16231c] rounded text-[#a5e2ba]">
                    {prop.proposedData.suggestedText}
                  </div>
                )}

                {currentUser.isDeveloper && (prop.status === 'PENDING_CURATION' || prop.status === 'MENUNGGU_KURASI') && (
                  <div className="pt-2 border-t border-[#16231c] flex items-center justify-end gap-2">
                    <input
                      type="text"
                      placeholder="Curatorial note..."
                      value={reviewNotes[prop.id] || ''}
                      onChange={(e) => setReviewNotes({ ...reviewNotes, [prop.id]: e.target.value })}
                      className="bg-[#050907] border border-[#1b2b22] rounded px-2.5 py-1 text-xs text-[#d3ded8] w-64"
                    />
                    <button
                      onClick={() => handleReviewProposal(prop.id, 'RATIFIED')}
                      className="px-3 py-1 bg-emerald-950/50 text-emerald-300 border border-emerald-800/60 rounded text-xs hover:bg-emerald-900/50 font-bold"
                    >
                      ✓ Ratify & Merge
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 4. SUB-TAB: ABNORMAL MODEL (DEVELOPER ONLY) ================= */}
      {activeSubTab === 'secret_abnormal' && currentUser.isDeveloper && (
        <DeveloperAbnormalModel currentUser={currentUser} />
      )}

    </div>
  );
};
