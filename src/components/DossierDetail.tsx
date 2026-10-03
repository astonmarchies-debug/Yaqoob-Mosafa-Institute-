import React, { useState } from 'react';
import { Dossier, ClearanceLevel, ResearcherUser } from '../types/dossier';
import { ASSET_IMAGES } from '../assets/images';
import { 
  ArrowLeft, Printer, Shield, ShieldAlert, Lock, Unlock, 
  Copy, Check, Trash2, Eye, EyeOff, AlertTriangle, FileCode,
  Paperclip, Image as ImageIcon, Video, FileText, Music, Download,
  Bookmark, Clock
} from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../services/i18n';
import { CommentSection } from './CommentSection';

interface DossierDetailProps {
  dossier: Dossier;
  userClearance: ClearanceLevel;
  onBack: () => void;
  onDelete?: (id: string) => void;
  onRequestElevateClearance: () => void;
  currentLanguage: SupportedLanguage;
  currentUser?: ResearcherUser;
  onOpenAuthModal?: () => void;
}

export const DossierDetail: React.FC<DossierDetailProps> = ({
  dossier,
  userClearance,
  onBack,
  onDelete,
  onRequestElevateClearance,
  currentLanguage,
  currentUser = {
    id: 'guest-public',
    name: 'Guest Researcher',
    capability: 'PUBLIC_OBSERVER',
    roleTitle: 'Public Visitor',
    isDeveloper: false,
    canApprove: false,
    clearanceLevel: 1,
    isLoggedIn: false,
  },
  onOpenAuthModal,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const isRtl = currentLanguage === 'ar';

  const [copied, setCopied] = useState(false);
  const [revealedRedactions, setRevealedRedactions] = useState<{ [key: string]: boolean }>({});
  const hasClearance = userClearance >= dossier.clearanceLevel;

  // Calculate estimated reading time
  const calculateReadingTime = () => {
    const textToRead = `${dossier.description} ${dossier.containmentProtocols} ${dossier.mathematicalFormulation}`;
    const wordCount = textToRead.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(wordCount / 180)); // 180 WPM scholarly reading speed
    return `${minutes} min read`;
  };

  const [isBookmarked, setIsBookmarked] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('ymi_bookmarked_dossiers_v1');
      const list: string[] = saved ? JSON.parse(saved) : [];
      return list.includes(dossier.id);
    } catch {
      return false;
    }
  });

  const handleToggleBookmark = () => {
    try {
      const saved = localStorage.getItem('ymi_bookmarked_dossiers_v1');
      let list: string[] = saved ? JSON.parse(saved) : [];
      if (list.includes(dossier.id)) {
        list = list.filter(id => id !== dossier.id);
        setIsBookmarked(false);
      } else {
        list.push(dossier.id);
        setIsBookmarked(true);
      }
      localStorage.setItem('ymi_bookmarked_dossiers_v1', JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyCitation = () => {
    const citation = `Yaqoob Mosafa Institute. (${dossier.lastRevision.slice(-4)}). ${dossier.protocolNumber}: ${dossier.title}. Sector 04-A Archival Registry.`;
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleRedaction = (token: string) => {
    setRevealedRedactions((prev) => ({
      ...prev,
      [token]: !prev[token],
    }));
  };

  const toggleAllRedactions = () => {
    if (!dossier.redactedSections) return;
    const tokens = Object.keys(dossier.redactedSections);
    const allRevealed = tokens.every((t) => revealedRedactions[t]);
    const next: { [key: string]: boolean } = {};
    tokens.forEach((t) => {
      next[t] = !allRevealed;
    });
    setRevealedRedactions(next);
  };

  // Helper to render text with clickable redaction tokens
  const renderTextWithRedactions = (content: string) => {
    if (!dossier.redactedSections || Object.keys(dossier.redactedSections).length === 0) {
      return content.split('\n\n').map((para, i) => (
        <p key={i} className="mb-4 leading-relaxed text-[#c6d1cb]">
          {para}
        </p>
      ));
    }

    const tokens = Object.keys(dossier.redactedSections);
    const regex = new RegExp(`(${tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');

    return content.split('\n\n').map((para, pIdx) => {
      const parts = para.split(regex);
      return (
        <p key={pIdx} className="mb-4 leading-relaxed text-[#c6d1cb]">
          {parts.map((part, idx) => {
            if (tokens.includes(part)) {
              const isRevealed = revealedRedactions[part];
              const secretText = dossier.redactedSections![part];

              return (
                <button
                  key={idx}
                  onClick={() => toggleRedaction(part)}
                  title="Click to reveal / conceal redacted data"
                  className={`inline-block mx-1 px-1.5 py-0.5 text-xs font-mono rounded transition-all cursor-pointer ${
                    isRevealed
                      ? 'bg-[#1e3d2c] text-[#7ee787] border border-[#2ea043]'
                      : 'bg-[#16201b] hover:bg-[#203128] text-[#c5a059] border border-[#3b5243] underline decoration-dotted'
                  }`}
                >
                  {isRevealed ? secretText : `[REDACTED: ${part.replace(/[\[\]]/g, '')}]`}
                </button>
              );
            }
            return <span key={idx}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 dossier-print-container font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Top Action Toolbar (Hidden during print) */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#1b2a22] no-print">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-medium text-[#9daea5] hover:text-[#f0ece1] transition-colors"
        >
          <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
          <span>{t.detailBackBtn}</span>
        </button>

        <div className="flex items-center gap-2">
          {dossier.redactedSections && Object.keys(dossier.redactedSections).length > 0 && (
            <button
              onClick={toggleAllRedactions}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#c5a059] border border-[#273a2e] rounded-md hover:bg-[#14261c] transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Sensor Toggle</span>
            </button>
          )}

          <button
            onClick={handleToggleBookmark}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-[#1c2d23] border-emerald-500 text-emerald-400 font-bold shadow-md'
                : 'border-[#1f3026] text-[#8b9c93] hover:border-[#c5a059] hover:text-[#e5dfd3]'
            }`}
            title={isBookmarked ? 'Saved to Bookmarks' : 'Bookmark this Dossier'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-emerald-400' : ''}`} />
            <span>{isBookmarked ? 'Saved ✓' : 'Save'}</span>
          </button>

          <button
            onClick={handleCopyCitation}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#8b9c93] border border-[#1f3026] rounded-md hover:border-[#c5a059] hover:text-[#e5dfd3] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Cite'}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#8b9c93] border border-[#1f3026] rounded-md hover:border-[#c5a059] hover:text-[#e5dfd3] transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.detailPrintBtn}</span>
          </button>

          {dossier.isCustom && onDelete && (
            <button
              onClick={() => onDelete(dossier.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-rose-400 border border-rose-900/50 rounded-md hover:bg-rose-950/30 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.detailDeleteBtn}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Archival Document Sheet */}
      <article className="relative bg-[#090f0c] border border-[#1d2d24] rounded-lg p-6 sm:p-10 shadow-2xl overflow-hidden print:border-none print:shadow-none print:bg-white print:p-0">
        
        {/* Archival Watermark of Seal */}
        <div 
          className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none print:opacity-[0.04]"
          aria-hidden="true"
        >
          <img
            src={ASSET_IMAGES.insignia}
            alt="Watermark Lambang"
            className="w-[500px] h-[500px] object-contain"
          />
        </div>

        {/* Institutional Header Banner */}
        <header className="border-b-2 border-[#c5a059]/40 pb-6 mb-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            
            <div className="flex items-start gap-4">
              <img
                src={ASSET_IMAGES.insignia}
                alt="Segel Institut"
                className="w-14 h-14 rounded-full border border-[#c5a059]/60 shrink-0"
              />
              <div>
                <div className="text-xs uppercase tracking-widest font-mono text-[#c5a059] font-bold">
                  YAQOOB MOSAFA INSTITUTE · معهد يعقوب مصافا
                </div>
                <div className="text-[11px] font-mono text-[#788880]">
                  {t.topSectorBar}
                </div>
                <div className="text-xs font-mono text-[#a5b5ad] mt-0.5">
                  PROTOCOL: <span className="text-[#f5eedf] font-bold">{dossier.protocolNumber}</span>
                </div>
              </div>
            </div>

            {/* Red / Gold Security Clearance Stamp */}
            <div className="sm:text-right shrink-0">
              <div className="inline-block p-2 rounded border border-rose-600/70 bg-rose-950/20 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider text-center">
                <div>CLEARANCE: LEVEL {dossier.clearanceLevel}</div>
                <div className="text-[10px] text-rose-300 font-normal">
                  {hasClearance ? 'AUTHORIZATION VERIFIED' : 'RESTRICTED ACCESS'}
                </div>
              </div>
            </div>

          </div>

          {/* Dossier Document Main Titles */}
          <div className="mt-6">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#f5eedf] leading-tight">
              {dossier.title}
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-[#a3b3aa] font-editorial italic">
              {dossier.subtitle}
            </p>
          </div>
        </header>

        {/* Curatorial Accession Definition Grid */}
        <section className="mb-8 p-4 bg-[#060b08] border border-[#16231c] rounded-md font-mono text-xs text-[#8c9c93]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
            <div>
              <span className="text-[#64746b] block text-[10px] uppercase">Class</span>
              <span className="text-[#e2ded6] font-semibold">{dossier.attractorClass}</span>
            </div>
            <div>
              <span className="text-[#64746b] block text-[10px] uppercase">{t.detailStatus}</span>
              <span className="text-[#e2ded6] font-semibold">{dossier.status}</span>
            </div>
            <div>
              <span className="text-[#64746b] block text-[10px] uppercase">Division</span>
              <span className="text-[#e2ded6] truncate block">{dossier.division}</span>
            </div>
            <div>
              <span className="text-[#64746b] block text-[10px] uppercase">{t.detailLeadResearcher}</span>
              <span className="text-[#e2ded6] truncate block">{dossier.leadResearcher}</span>
            </div>
            <div>
              <span className="text-[#64746b] block text-[10px] uppercase">{t.detailClassifiedDate}</span>
              <span className="text-[#e2ded6]">{dossier.dateClassified}</span>
            </div>
            <div>
              <span className="text-[#64746b] block text-[10px] uppercase">{t.detailRevisionDate}</span>
              <span className="text-[#e2ded6]">{dossier.lastRevision}</span>
            </div>
            <div>
              <span className="text-[#64746b] block text-[10px] uppercase">Reading Time</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                <span>{calculateReadingTime()}</span>
              </span>
            </div>
          </div>

          {/* Telemetry Metrics Bar */}
          <div className="mt-3 pt-3 border-t border-[#131d17] grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
            <div>
              <span className="text-[#64746b]">Lyapunov Exponent: </span>
              <span className="text-[#c5a059] font-bold">{dossier.lyapunovExponent}</span>
            </div>
            <div>
              <span className="text-[#64746b]">Fractal Dimension: </span>
              <span className="text-[#c5a059] font-bold">{dossier.fractalDimension}</span>
            </div>
            <div>
              <span className="text-[#64746b]">Entropy Flux Rate: </span>
              <span className="text-[#c5a059] font-bold">{dossier.entropyRate}</span>
            </div>
          </div>
        </section>

        {/* Section 1: Containment Protocols */}
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[#c5a059] font-bold pb-2 border-b border-[#1c2e23] mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#c5a059]" />
            <span>{t.detailTabContainment}</span>
          </h2>
          <div className="p-4 bg-[#070c09] border-l-2 border-[#c5a059] rounded text-xs sm:text-sm font-editorial text-[#d8e3dc] leading-relaxed whitespace-pre-line">
            {dossier.containmentProtocols}
          </div>
        </section>

        {/* Section 2: Mathematical Formulation */}
        {dossier.mathematicalFormulation && (
          <section className="mb-8">
            <h2 className="text-xs uppercase tracking-widest font-mono text-[#c5a059] font-bold pb-2 border-b border-[#1c2e23] mb-4 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-[#c5a059]" />
              <span>{t.detailTabMath}</span>
            </h2>
            <pre className="p-4 bg-[#050806] border border-[#16251d] rounded text-xs font-mono text-[#8be2a8] overflow-x-auto whitespace-pre leading-relaxed" dir="ltr">
              {dossier.mathematicalFormulation}
            </pre>
          </section>
        )}

        {/* Section 3: Anomaly Description with Redactions */}
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-widest font-mono text-[#c5a059] font-bold pb-2 border-b border-[#1c2e23] mb-4">
            {t.detailTabDesc}
          </h2>
          <div className="text-xs sm:text-sm font-editorial text-[#d4ded8] leading-relaxed">
            {renderTextWithRedactions(dossier.description)}
          </div>
        </section>

        {/* Attached Research Media Section */}
        {dossier.attachments && dossier.attachments.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs uppercase tracking-widest font-mono text-[#c5a059] font-bold pb-2 border-b border-[#1c2e23] mb-4 flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-[#c5a059]" />
              <span>Attached Research Media & Documents ({dossier.attachments.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dossier.attachments.map((att) => (
                <div key={att.id} className="p-4 bg-[#060b08] border border-[#192b20] rounded-xl space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-xs border-b border-[#14231b] pb-2">
                    <div className="flex items-center gap-2 truncate">
                      {att.type === 'image' && <ImageIcon className="w-4 h-4 text-emerald-400 shrink-0" />}
                      {att.type === 'video' && <Video className="w-4 h-4 text-sky-400 shrink-0" />}
                      {att.type === 'pdf' && <FileText className="w-4 h-4 text-rose-400 shrink-0" />}
                      {att.type === 'audio' && <Music className="w-4 h-4 text-amber-400 shrink-0" />}
                      {att.type === 'doc' && <Paperclip className="w-4 h-4 text-indigo-400 shrink-0" />}
                      <span className="font-bold text-[#f5eedf] truncate">{att.name}</span>
                    </div>
                    <span className="text-[10px] text-[#6e8276] uppercase shrink-0">{att.size}</span>
                  </div>

                  {/* Render Image Media Preview */}
                  {att.type === 'image' && (
                    <div className="rounded-lg overflow-hidden border border-[#1b2f23] max-h-60 bg-black flex items-center justify-center">
                      <img src={att.url} alt={att.name} className="w-full h-auto object-cover" />
                    </div>
                  )}

                  {/* Render Video Media Player */}
                  {att.type === 'video' && (
                    <div className="rounded-lg overflow-hidden border border-[#1b2f23] bg-black">
                      <video src={att.url} controls className="w-full max-h-60" />
                    </div>
                  )}

                  {/* Render Audio Player */}
                  {att.type === 'audio' && (
                    <div className="p-2 rounded bg-[#08110c] border border-[#1b2f23]">
                      <audio src={att.url} controls className="w-full h-8" />
                    </div>
                  )}

                  {/* Render PDF / Doc Download Link */}
                  {(att.type === 'pdf' || att.type === 'doc') && (
                    <div className="p-3 bg-[#08110c] border border-[#1b2f23] rounded flex items-center justify-between">
                      <span className="text-[11px] text-[#8ea095]">Document file attached</span>
                      <a
                        href={att.url}
                        download={att.name}
                        className="px-3 py-1 bg-[#c5a059] hover:bg-[#d8b26a] text-black font-bold text-[11px] rounded flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 4: Experiment Logs */}
        {dossier.experimentLogs && dossier.experimentLogs.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs uppercase tracking-widest font-mono text-[#c5a059] font-bold pb-2 border-b border-[#1c2e23] mb-4">
              {t.detailTabLogs}
            </h2>
            <div className="space-y-3 font-mono text-xs">
              {dossier.experimentLogs.map((log) => (
                <div key={log.id} className="p-3.5 bg-[#060b08] border border-[#18281f] rounded">
                  <div className="flex items-center justify-between text-[11px] text-[#788e82] mb-1">
                    <span>{log.timestamp} · {log.researcher}</span>
                    <span className="text-[#c5a059] font-bold">[{log.outcome}]</span>
                  </div>
                  <p className="text-[#cdd8d1] font-sans text-xs">
                    {log.notes}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

      </article>

      {/* Community Comments & Like/Dislike Section */}
      <CommentSection
        targetId={dossier.id}
        targetTitle={`${dossier.protocolNumber}: ${dossier.title}`}
        currentUser={currentUser}
        onOpenAuthModal={onOpenAuthModal}
      />

    </div>
  );
};
