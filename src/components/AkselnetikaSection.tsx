import React, { useState, useEffect, useRef } from 'react';
import { Radio, BookOpen, Layers, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { SupportedLanguage, COMPLETE_TRANSLATIONS } from '../services/i18n';
import { ResearcherUser } from '../types/dossier';
import { CommentSection } from './CommentSection';

interface AkselnetikaSectionProps {
  currentLanguage: SupportedLanguage;
  currentUser?: ResearcherUser;
  onOpenAuthModal?: () => void;
}

export const AkselnetikaSection: React.FC<AkselnetikaSectionProps> = ({ 
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
  const t = COMPLETE_TRANSLATIONS[currentLanguage];
  const isRtl = currentLanguage === 'ar';

  const [spreadSpeed, setSpreadSpeed] = useState<number>(3.5);
  const [resonanceSpread, setResonanceSpread] = useState<number>(2.4);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const resize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = Math.min(260, Math.max(190, window.innerWidth < 640 ? 190 : 240));
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      step += 0.03 * (spreadSpeed / 3);
      ctx.fillStyle = '#060a08';
      ctx.fillRect(0, 0, width, height);

      // Node coordinates scaled dynamically to canvas width
      const nodes = [
        { x: width * 0.15, y: height * 0.5, label: currentLanguage === 'ar' ? 'العقدة المحفزة' : 'Trigger Node' },
        { x: width * 0.38, y: height * 0.32, label: 'Resonance-1' },
        { x: width * 0.42, y: height * 0.72, label: 'Resonance-2' },
        { x: width * 0.65, y: height * 0.36, label: 'N-Alpha' },
        { x: width * 0.70, y: height * 0.68, label: 'N-Beta' },
        { x: width * 0.88, y: height * 0.5, label: currentLanguage === 'ar' ? 'عتبة التشبع' : 'Saturation Threshold' },
      ];

      // Connecting resonance lines
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length - 1; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (dist < width * 0.35) {
            ctx.strokeStyle = 'rgba(197, 160, 89, 0.2)';
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Expanding ripples from origin node
      const maxRadius = Math.min(width * 0.35, 140) * (resonanceSpread / 2);
      for (let r = 0; r < 4; r++) {
        const currentR = (step * 30 + r * 30) % maxRadius;
        const opacity = Math.max(0, 1 - currentR / maxRadius) * 0.5;
        ctx.strokeStyle = `rgba(197, 160, 89, ${opacity})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(nodes[0].x, nodes[0].y, currentR, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw nodes
      nodes.forEach((n, idx) => {
        const isPulse = Math.sin(step * 2 + idx) > 0.3;
        ctx.fillStyle = idx === 0 ? '#e6c679' : isPulse ? '#8be2a8' : '#385343';
        ctx.beginPath();
        ctx.arc(n.x, n.y, idx === 0 ? 6.5 : 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#83968b';
        ctx.font = '9px "JetBrains Mono", monospace';
        if (width > 440 || idx === 0 || idx === nodes.length - 1) {
          ctx.fillText(n.label, Math.max(5, n.x - 24), Math.min(height - 6, n.y + 16));
        }
      });

      // Status text
      ctx.fillStyle = '#65786d';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText(
        `AXCELNETICS · DYNAMICS [Rate=${spreadSpeed.toFixed(1)}x, Range=${resonanceSpread.toFixed(1)}]`,
        12,
        18
      );

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [spreadSpeed, resonanceSpread, currentLanguage]);

  const principles = [
    {
      code: 'AXCEL-I',
      title: t.akselP1Title,
      desc: t.akselP1Desc,
    },
    {
      code: 'AXCEL-II',
      title: t.akselP2Title,
      desc: t.akselP2Desc,
    },
    {
      code: 'AXCEL-III',
      title: t.akselP3Title,
      desc: t.akselP3Desc,
    },
  ];

  return (
    <article className="w-full bg-[#070c09] border border-[#23352a] rounded-lg shadow-xl overflow-hidden font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Official Header Bar */}
      <div className="bg-[#0e1713] border-b border-[#23352a] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c5a059] inline-block animate-pulse" />
          <span className="font-bold text-[#c5a059] tracking-wider uppercase">
            {t.akselHeaderBar}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[#7d9086]">
          <span>STATUS: <strong className="text-emerald-400">{t.akselStatusVerified}</strong></span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">{t.akselAuthAston}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 sm:p-8 space-y-6">
        
        {/* Article Heading */}
        <div className="border-b border-[#1b2b22] pb-5">
          <div className="text-[11px] font-mono text-[#8b9e93] uppercase tracking-widest mb-1 flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{t.akselCategory}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#f5eedf] tracking-tight">
            {t.akselTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#9eb0a4] mt-1 font-editorial">
            {t.akselSubtitle}
          </p>

          <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded bg-[#101c16] border border-[#23382c] text-[#a4e2ba]">
              {t.akselNoMathBadge}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#101c16] border border-[#23382c] text-[#c5a059]">
              {t.akselDomainBadge}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#101c16] border border-[#23382c] text-[#93a79d]">
              {t.akselSectorBadge}
            </span>
          </div>
        </div>

        {/* Notice Box */}
        <div className={`p-4 bg-[#0a120e] ${isRtl ? 'border-r-4' : 'border-l-4'} border-[#c5a059] rounded-lg space-y-2`}>
          <div className="font-mono text-xs font-bold text-[#c5a059] uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>{t.akselExecutiveTitle}</span>
          </div>
          <p className="text-xs sm:text-sm font-editorial text-[#d5ded8] leading-relaxed">
            {t.akselExecutiveBody}
          </p>
        </div>

        {/* Three Principles */}
        <div className="space-y-3">
          <div className="font-mono text-xs font-bold text-[#e5dfd3] uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{t.akselAxiomsTitle}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {principles.map((p, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#050907] border border-[#1a2d22] rounded-lg space-y-2 hover:border-[#c5a059]/60 transition-colors"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-[#788e82]">
                  <span className="text-[#c5a059] font-bold">{p.code}</span>
                  <span>§ 0{idx + 1}</span>
                </div>
                <h4 className="font-semibold text-xs text-[#e8dfcf] font-display">
                  {p.title}
                </h4>
                <p className="text-xs text-[#9eb1a6] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Simulation Apparatus */}
        <div className="p-4 sm:p-5 bg-[#050907] border border-[#1a2d22] rounded-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#14231a] pb-2">
            <div className="text-xs font-mono font-bold text-[#e6dfd1] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{t.akselSimTitle}</span>
            </div>
            <span className="text-[10px] font-mono text-[#6e8276]">
              {t.akselSimSub}
            </span>
          </div>

          <div className="w-full rounded overflow-hidden border border-[#16251d] bg-[#060a08]">
            <canvas ref={canvasRef} className="w-full block" />
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-1">
            <div className="bg-[#09120e] p-3 rounded border border-[#15241b]">
              <div className="flex justify-between text-[#8ba094] mb-1">
                <span>{t.akselSliderSpeed}</span>
                <span className="text-[#c5a059] font-bold">{spreadSpeed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min={1}
                max={8}
                step={0.5}
                value={spreadSpeed}
                onChange={(e) => setSpreadSpeed(parseFloat(e.target.value))}
                className="w-full accent-[#c5a059] cursor-pointer"
              />
              <p className="text-[10px] text-[#63756b] mt-1 font-sans">
                {t.akselSliderSpeedDesc}
              </p>
            </div>

            <div className="bg-[#09120e] p-3 rounded border border-[#15241b]">
              <div className="flex justify-between text-[#8ba094] mb-1">
                <span>{t.akselSliderRange}</span>
                <span className="text-[#c5a059] font-bold">{resonanceSpread.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={1}
                max={6}
                step={0.5}
                value={resonanceSpread}
                onChange={(e) => setResonanceSpread(parseFloat(e.target.value))}
                className="w-full accent-[#c5a059] cursor-pointer"
              />
              <p className="text-[10px] text-[#63756b] mt-1 font-sans">
                {t.akselSliderRangeDesc}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Classification Bar */}
      <div className="bg-[#0a120e] border-t border-[#1a2d22] px-4 sm:px-6 py-2.5 text-[11px] font-mono text-[#6c8074] flex flex-wrap items-center justify-between gap-2">
        <span>PROTOCOL CODIFICATION: [YMI-CHAOS-014, YMI-AXCEL-103]</span>
        <span className="text-[#a4e2ba] flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> {t.akselFooterVerify}
        </span>
      </div>

      {/* Community Comments & Like/Dislike Panel */}
      <div className="px-4 sm:px-6 pb-6">
        <CommentSection
          targetId="ymi-doc-aksel-01"
          targetTitle="Axcelnetics Treatise (YMI-DOC-AKSEL-01)"
          currentUser={currentUser}
          onOpenAuthModal={onOpenAuthModal}
        />
      </div>

    </article>
  );
};
