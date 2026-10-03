import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, Award, CheckCircle2, Sliders, Zap, Activity, 
  RotateCcw, Sparkles, Shield, Key, FileCheck, ArrowRight, Gauge
} from 'lucide-react';
import { SupportedLanguage } from '../services/i18n';
import { ResearcherUser } from '../types/dossier';

interface TechnicalSkillsTrainerProps {
  currentUser: ResearcherUser;
  currentLanguage: SupportedLanguage;
  onOpenAuthModal: () => void;
}

export const TechnicalSkillsTrainer: React.FC<TechnicalSkillsTrainerProps> = ({
  currentUser,
  currentLanguage,
  onOpenAuthModal,
}) => {
  const isRtl = currentLanguage === 'ar';

  const [activeModule, setActiveModule] = useState<'lyapunov' | 'entropy' | 'axcelnetic'>('lyapunov');
  
  // Module 1 parameters: Lyapunov Phase Calibration
  const [lyapunovExponent, setLyapunovExponent] = useState(2.4);
  const [dampingFactor, setDampingFactor] = useState(1.8);
  const [phaseStability, setPhaseStability] = useState(78);

  // Module 2 parameters: Entropy Signal Decryption
  const [noiseFilterLevel, setNoiseFilterLevel] = useState(5.0);
  const [resonanceGain, setResonanceGain] = useState(3.2);
  const [signalClarity, setSignalClarity] = useState(82);

  // Module 3 parameters: Axcelnetic Grid Containment
  const [contagionDamping, setContagionDamping] = useState(4.5);
  const [barrierIntegrity, setBarrierIntegrity] = useState(88);

  // Diagnostic Test State
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ score: number; rank: string; passed: boolean } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Calculate live phase stability
  useEffect(() => {
    const stability = Math.min(100, Math.max(10, Math.round(100 - (lyapunovExponent * 15 - dampingFactor * 18))));
    setPhaseStability(stability);
  }, [lyapunovExponent, dampingFactor]);

  // Calculate signal clarity
  useEffect(() => {
    const clarity = Math.min(100, Math.max(15, Math.round(noiseFilterLevel * 10 + resonanceGain * 12)));
    setSignalClarity(clarity);
  }, [noiseFilterLevel, resonanceGain]);

  // Canvas visualizer for technical training
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = 200;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      time += 0.04;
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = '#050907';
      ctx.fillRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = '#0e1d15';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      if (activeModule === 'lyapunov') {
        // Double phase-space trajectory
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#c5a059';
        ctx.beginPath();
        for (let i = 0; i < w; i += 4) {
          const y = h / 2 + Math.sin(i * 0.03 + time * lyapunovExponent) * (35 * (phaseStability / 100));
          if (i === 0) ctx.moveTo(i, y);
          else ctx.lineTo(i, y);
        }
        ctx.stroke();

        ctx.strokeStyle = '#4ecca3';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < w; i += 4) {
          const y = h / 2 + Math.cos(i * 0.025 - time * dampingFactor) * (25 * (phaseStability / 100));
          if (i === 0) ctx.moveTo(i, y);
          else ctx.lineTo(i, y);
        }
        ctx.stroke();
      } else if (activeModule === 'entropy') {
        // High frequency stochastic waveform
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#38bdf8';
        ctx.beginPath();
        for (let i = 0; i < w; i += 3) {
          const noise = (Math.random() - 0.5) * (40 / (noiseFilterLevel + 0.1));
          const wave = Math.sin(i * 0.04 + time * resonanceGain) * 30;
          const y = h / 2 + wave + noise;
          if (i === 0) ctx.moveTo(i, y);
          else ctx.lineTo(i, y);
        }
        ctx.stroke();
      } else {
        // Axcelnetic grid pulse
        const cx = w / 2;
        const cy = h / 2;
        const maxR = Math.min(w, h) * 0.45;
        const ringCount = 5;

        for (let r = 1; r <= ringCount; r++) {
          const radius = ((time * 20 * (11 - contagionDamping) + r * (maxR / ringCount)) % maxR);
          const alpha = 1 - radius / maxR;
          ctx.strokeStyle = `rgba(197, 160, 89, ${alpha * (barrierIntegrity / 100)})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [activeModule, lyapunovExponent, dampingFactor, phaseStability, noiseFilterLevel, resonanceGain, contagionDamping, barrierIntegrity]);

  const handleRunDiagnosticTest = () => {
    setIsTesting(true);
    setTestResult(null);

    setTimeout(() => {
      setIsTesting(false);
      const score = Math.round((phaseStability + signalClarity + barrierIntegrity) / 3);
      const passed = score >= 75;
      const rank = score >= 90 ? 'Senior Epistemic Fellow' : score >= 80 ? 'Classified Dynamics Specialist' : 'Associate Researcher';
      setTestResult({ score, rank, passed });
    }, 1500);
  };

  const txt = {
    en: {
      headerBar: 'TECHNICAL SKILLS ACCREDITATION // SECTOR 04-A SIMULATOR SUITE',
      headerStatus: 'ACCREDITATION SUITE · VIP+',
      title: 'Technical Skills & Epistemic Calibration Simulator',
      subtitle: 'An advanced interactive laboratory module to calibrate non-linear dynamics, decode stochastic telemetry signals, and contain anomalous resonance cascades.',
      tab1: '01. Lyapunov Phase Space',
      tab2: '02. Stochastic Decryption',
      tab3: '03. Axcelnetic Containment',
      m1Param1: 'Lyapunov Divergence λ:',
      m1Param2: 'Damping Dissipation γ:',
      m1Metric: 'Phase Orbit Stability:',
      m2Param1: 'Noise Suppression Filter:',
      m2Param2: 'Resonant Signal Gain:',
      m2Metric: 'Telemetry Signal Clarity:',
      m3Param1: 'Contagion Damping Rate:',
      m3Metric: 'Lattice Barrier Integrity:',
      runTestBtn: 'Run Accreditation Diagnostic Exam',
      testingMsg: 'Executing Multidimensional Diagnostic Suite...',
      passedTitle: 'CERTIFICATION ACHIEVED: SECTOR 04-A ACCREDITED',
      scoreLabel: 'Mastery Score:',
      badgeLabel: 'Status Tier: VIP+ VERIFIED',
    },
    ar: {
      headerBar: 'التدريب الفني التخصصي // محاكي الاعتماد التقني للقطاع 04-أ',
      headerStatus: 'منظومة الاعتماد المتقدمة · VIP+',
      title: 'محاكي رفع الكفاءة الفنية والمعايرة الإبستيمولوجية',
      subtitle: 'وحدة تدريب معملية تفاعلية لمعايرة الديناميكيات غير الخطية، وفك تشفير إشارات الضجيج العشوائي، والتحكم في احتواء الظواهر الرنانة.',
      tab1: '01. فضاء طور ليابونوف',
      tab2: '02. فك التشفير العشوائي',
      tab3: '03. احتواء الأكسلنيتيكا',
      m1Param1: 'تباعد ليابونوف λ:',
      m1Param2: 'عامل التخميد والتبديد γ:',
      m1Metric: 'استقرار مدار الطور:',
      m2Param1: 'مرشح كبت الضجيج:',
      m2Param2: 'كسب الرنين التوافقي:',
      m2Metric: 'وضوح إشارة القياس:',
      m3Param1: 'معدل تخميد الانتشار:',
      m3Metric: 'سلامة حاجز الشبكة:',
      runTestBtn: 'إجراء اختبار التشخيص للاعتماد الفني',
      testingMsg: 'جارٍ تنفيذ حزمة الفحص التشخيصي متعدد الأبعاد...',
      passedTitle: 'تم نيل شهادة الاعتماد: مؤهل رسمي للقطاع 04-أ',
      scoreLabel: 'درجة الإتقان:',
      badgeLabel: 'مستوى التصنيف: معتمد VIP+',
    },
  }[currentLanguage === 'ar' ? 'ar' : 'en'];

  return (
    <article className="w-full bg-[#070c09] border border-[#23352a] rounded-lg shadow-xl overflow-hidden font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Official Header Bar */}
      <div className="bg-[#0e1713] border-b border-[#23352a] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#c5a059]" />
          <span className="font-bold text-[#c5a059] tracking-wider uppercase">
            {txt.headerBar}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="px-2 py-0.5 rounded bg-[#1b2b20] border border-[#2d4938] text-emerald-400 font-bold">
            {txt.headerStatus}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-8 space-y-6">
        
        {/* Title */}
        <div className="border-b border-[#1b2b22] pb-4">
          <div className="text-[11px] font-mono text-[#8b9e93] uppercase tracking-widest mb-1 flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>INSTITUTIONAL TECHNICAL ACCREDITATION PROGRAM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#f5eedf] tracking-tight">
            {txt.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#9eb1a6] mt-1 font-editorial">
            {txt.subtitle}
          </p>
        </div>

        {/* Module Selector Tabs */}
        <div className="flex border-b border-[#192b21] bg-[#050907] text-xs font-mono text-[#83978b] overflow-x-auto">
          <button
            onClick={() => setActiveModule('lyapunov')}
            className={`py-2.5 px-4 text-center border-b-2 transition-colors whitespace-nowrap ${
              activeModule === 'lyapunov'
                ? 'border-[#c5a059] text-[#f5eedf] font-bold bg-[#0b140f]'
                : 'border-transparent hover:text-white'
            }`}
          >
            {txt.tab1}
          </button>
          <button
            onClick={() => setActiveModule('entropy')}
            className={`py-2.5 px-4 text-center border-b-2 transition-colors whitespace-nowrap ${
              activeModule === 'entropy'
                ? 'border-[#c5a059] text-[#f5eedf] font-bold bg-[#0b140f]'
                : 'border-transparent hover:text-white'
            }`}
          >
            {txt.tab2}
          </button>
          <button
            onClick={() => setActiveModule('axcelnetic')}
            className={`py-2.5 px-4 text-center border-b-2 transition-colors whitespace-nowrap ${
              activeModule === 'axcelnetic'
                ? 'border-[#c5a059] text-[#f5eedf] font-bold bg-[#0b140f]'
                : 'border-transparent hover:text-white'
            }`}
          >
            {txt.tab3}
          </button>
        </div>

        {/* Live Simulation Apparatus */}
        <div className="w-full rounded-lg overflow-hidden border border-[#1a2d22] bg-[#050907] relative">
          <canvas ref={canvasRef} className="w-full block" />
          <div className="absolute top-2.5 left-3 px-2 py-0.5 rounded bg-black/70 border border-[#23352a] text-[10px] font-mono text-[#8be2a8]">
            ● LIVE OSCILLATOR MATRIX
          </div>
        </div>

        {/* Sliders & Telemetry Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          
          {/* Module 1 Controls */}
          {activeModule === 'lyapunov' && (
            <>
              <div className="p-3.5 bg-[#08110c] border border-[#172b1f] rounded-lg space-y-2">
                <div className="flex justify-between text-[#8ba094]">
                  <span>{txt.m1Param1}</span>
                  <span className="text-[#c5a059] font-bold">{lyapunovExponent.toFixed(1)} s⁻¹</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={6.0}
                  step={0.1}
                  value={lyapunovExponent}
                  onChange={(e) => setLyapunovExponent(parseFloat(e.target.value))}
                  className="w-full accent-[#c5a059] cursor-pointer"
                />
              </div>

              <div className="p-3.5 bg-[#08110c] border border-[#172b1f] rounded-lg space-y-2">
                <div className="flex justify-between text-[#8ba094]">
                  <span>{txt.m1Param2}</span>
                  <span className="text-[#c5a059] font-bold">{dampingFactor.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min={0.2}
                  max={4.0}
                  step={0.1}
                  value={dampingFactor}
                  onChange={(e) => setDampingFactor(parseFloat(e.target.value))}
                  className="w-full accent-[#c5a059] cursor-pointer"
                />
              </div>
            </>
          )}

          {/* Module 2 Controls */}
          {activeModule === 'entropy' && (
            <>
              <div className="p-3.5 bg-[#08110c] border border-[#172b1f] rounded-lg space-y-2">
                <div className="flex justify-between text-[#8ba094]">
                  <span>{txt.m2Param1}</span>
                  <span className="text-[#c5a059] font-bold">{noiseFilterLevel.toFixed(1)} dB</span>
                </div>
                <input
                  type="range"
                  min={1.0}
                  max={10.0}
                  step={0.5}
                  value={noiseFilterLevel}
                  onChange={(e) => setNoiseFilterLevel(parseFloat(e.target.value))}
                  className="w-full accent-[#c5a059] cursor-pointer"
                />
              </div>

              <div className="p-3.5 bg-[#08110c] border border-[#172b1f] rounded-lg space-y-2">
                <div className="flex justify-between text-[#8ba094]">
                  <span>{txt.m2Param2}</span>
                  <span className="text-[#c5a059] font-bold">{resonanceGain.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={6.0}
                  step={0.1}
                  value={resonanceGain}
                  onChange={(e) => setResonanceGain(parseFloat(e.target.value))}
                  className="w-full accent-[#c5a059] cursor-pointer"
                />
              </div>
            </>
          )}

          {/* Module 3 Controls */}
          {activeModule === 'axcelnetic' && (
            <>
              <div className="p-3.5 bg-[#08110c] border border-[#172b1f] rounded-lg space-y-2">
                <div className="flex justify-between text-[#8ba094]">
                  <span>{txt.m3Param1}</span>
                  <span className="text-[#c5a059] font-bold">{contagionDamping.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min={1.0}
                  max={10.0}
                  step={0.5}
                  value={contagionDamping}
                  onChange={(e) => setContagionDamping(parseFloat(e.target.value))}
                  className="w-full accent-[#c5a059] cursor-pointer"
                />
              </div>

              <div className="p-3.5 bg-[#08110c] border border-[#172b1f] rounded-lg space-y-2">
                <div className="flex justify-between text-[#8ba094]">
                  <span>{txt.m3Metric}</span>
                  <span className="text-emerald-400 font-bold">{barrierIntegrity}%</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={100}
                  step={1}
                  value={barrierIntegrity}
                  onChange={(e) => setBarrierIntegrity(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </>
          )}

        </div>

        {/* Diagnostic Exam Run Action */}
        <div className="p-4 bg-[#08120d] border border-[#1a3325] rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div className="flex items-center gap-3">
            <Gauge className="w-6 h-6 text-[#c5a059] shrink-0" />
            <div>
              <div className="text-xs font-bold text-[#f5eedf]">
                {txt.scoreLabel} {Math.round((phaseStability + signalClarity + barrierIntegrity) / 3)}%
              </div>
              <div className="text-[10px] text-[#788e82]">
                Stability: {phaseStability}% · Clarity: {signalClarity}% · Barrier: {barrierIntegrity}%
              </div>
            </div>
          </div>

          <button
            onClick={handleRunDiagnosticTest}
            disabled={isTesting}
            className="w-full sm:w-auto px-5 py-2.5 rounded bg-[#c5a059] hover:bg-[#d8b56d] text-[#060a08] font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            <Zap className={`w-4 h-4 ${isTesting ? 'animate-bounce' : ''}`} />
            <span>{isTesting ? txt.testingMsg : txt.runTestBtn}</span>
          </button>
        </div>

        {/* Certificate / Accreditation Result */}
        {testResult && (
          <div className={`p-5 rounded-lg border font-mono animate-fadeIn ${
            testResult.passed 
              ? 'bg-[#0a1811] border-emerald-700/80 text-emerald-200 shadow-xl' 
              : 'bg-[#180a0a] border-rose-800 text-rose-200'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-[#f5eedf]">
                  {txt.passedTitle}
                </h4>
                <div className="text-xs text-[#a3b8ad]">
                  {txt.badgeLabel} // {testResult.rank} (Score: {testResult.score}/100)
                </div>
              </div>
            </div>
            <p className="text-xs text-[#8ca396] font-sans leading-relaxed mt-2">
              The researcher demonstrated mastery of non-linear parameter calibration, dissipative Lyapunov stabilization, and stochastic barrier containment under Sector 04-A protocols.
            </p>
          </div>
        )}

      </div>

    </article>
  );
};
