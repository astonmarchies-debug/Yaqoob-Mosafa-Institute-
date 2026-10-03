import React, { useState, useEffect, useRef } from 'react';
import { Brain, Compass, Lightbulb, HeartHandshake, Zap } from 'lucide-react';
import { SupportedLanguage } from '../services/i18n';
import { ResearcherUser } from '../types/dossier';
import { CommentSection } from './CommentSection';

interface PsychoHermeneuticsSectionProps {
  currentLanguage: SupportedLanguage;
  currentUser?: ResearcherUser;
  onOpenAuthModal?: () => void;
}

export const PsychoHermeneuticsSection: React.FC<PsychoHermeneuticsSectionProps> = ({
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
  const isAr = currentLanguage === 'ar';

  // Interactive Mind Simulator State
  const [stressNoise, setStressNoise] = useState<number>(3); // 1 to 10
  const [mentalFlexibility, setFlexibility] = useState<number>(5); // 1 to 10
  const [attractorState, setAttractorState] = useState<'STABLE' | 'CYCLIC' | 'CREATIVE_CHAOS'>('STABLE');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (stressNoise < 4 && mentalFlexibility < 5) {
      setAttractorState('STABLE');
    } else if (stressNoise >= 4 && stressNoise <= 7) {
      setAttractorState('CYCLIC');
    } else {
      setAttractorState('CREATIVE_CHAOS');
    }
  }, [stressNoise, mentalFlexibility]);

  // Render Mind Phase-Space Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const particles: { x: number; y: number; vx: number; vy: number; hue: number }[] = [];
    const numParticles = 40;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * 300,
        y: Math.random() * 200,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        hue: Math.random() * 60 + 35,
      });
    }

    const resize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = 220;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      step += 0.03;
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.fillStyle = 'rgba(5, 9, 7, 0.25)';
      ctx.fillRect(0, 0, width, height);

      if (attractorState === 'STABLE') {
        ctx.beginPath();
        ctx.arc(cx, cy, 14, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(197, 160, 89, 0.2)';
        ctx.fill();
        ctx.strokeStyle = '#c5a059';
        ctx.stroke();

        ctx.fillStyle = '#f5eedf';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(isAr ? 'جاذب كلاسيكي (منطقة الراحة)' : 'Fixed Point Attractor (Comfort Zone)', cx, cy + 30);
      } else if (attractorState === 'CYCLIC') {
        const offset = Math.sin(step) * 50;
        ctx.beginPath();
        ctx.arc(cx - offset, cy, 10, 0, Math.PI * 2);
        ctx.arc(cx + offset, cy, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(46, 160, 67, 0.2)';
        ctx.fill();
        ctx.strokeStyle = '#2ea043';
        ctx.stroke();

        ctx.fillStyle = '#a4e2ba';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(isAr ? 'دورة دورية (حلقة العادة)' : 'Periodic Cycle (Habit Loop)', cx, cy + 40);
      } else {
        ctx.strokeStyle = 'rgba(216, 178, 106, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let t = 0; t < Math.PI * 4; t += 0.1) {
          const r = 60 * Math.sin(2 * t + step);
          const px = cx + r * Math.cos(t);
          const py = cy + r * Math.sin(t);
          if (t === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        ctx.fillStyle = '#e6c679';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(isAr ? 'جاذب غريب (الابتكار والإلهام)' : 'Strange Attractor (Creative Insight)', cx, cy + 50);
      }

      particles.forEach((p, idx) => {
        const pullStrength = (11 - mentalFlexibility) * 0.002;
        const noiseFactor = stressNoise * 0.3;

        p.vx += (cx - p.x) * pullStrength + (Math.random() - 0.5) * noiseFactor;
        p.vy += (cy - p.y) * pullStrength + (Math.random() - 0.5) * noiseFactor;

        p.vx *= 0.94;
        p.vy *= 0.94;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = attractorState === 'STABLE' ? '#c5a059' : attractorState === 'CYCLIC' ? '#3fb950' : '#f0883e';
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 45) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(197, 160, 89, ${1 - dist / 45})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [stressNoise, mentalFlexibility, attractorState, isAr]);

  return (
    <article className="w-full bg-[#070c09] border border-[#23352a] rounded-2xl shadow-2xl overflow-hidden font-sans mt-10" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Top Bar */}
      <div className="bg-[#0e1713] border-b border-[#23352a] px-5 py-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-[#c5a059]" />
          <span className="font-bold text-[#c5a059] tracking-wider uppercase">
            {isAr ? 'الهرمينوطيقا النفسية والأتراكترات المعرفية' : 'APPLIED DISCIPLINE: AXCELNETIC PSYCHO-HERMENEUTICS'}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[#869b8e]">
          <span>{isAr ? 'الحالة: دليل معرفي مؤكد' : 'STATUS: VERIFIED COGNITIVE GUIDE'}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-8 space-y-8">
        
        {/* Title Header */}
        <div className="border-b border-[#1b2c22] pb-6">
          <div className="text-[11px] font-mono text-[#889b8f] uppercase tracking-widest mb-1.5 flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#c5a059]" />
            <span>{isAr ? 'فلسفة الأكسيلنيتيكا والجاذبات المعرفية' : 'AXCELNETIC PHILOSOPHY & COGNITIVE ATTRACTOR THEORY'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#f5eedf] tracking-tight leading-tight">
            {isAr
              ? 'نظرية الجاذب المعرفي: كيف تتشكل مسارات التفكير والأنماط الانفعالية؟'
              : 'The Cognitive Attractor Theory: Deciphering Human Thought Orbits & Emotional Trajectories'}
          </h2>
          <p className="text-sm sm:text-base text-[#9eb2a6] mt-2 font-editorial italic leading-relaxed">
            {isAr
              ? '"لا يعمل العقل البشري بخطوط مستقيمة، بل يتكون من فضاء طوري ذي جواذب مغناطيسية. عندما تشعر بالقلق أو الفضول، يجري سحب أفكارك إلى مدارات محددة داخل هذا الفضاء."'
              : '"Human consciousness operates not along linear vectors, but across a non-linear phase space possessing intrinsic Attractors. When anxiety or curiosity arises, your thoughts are being drawn into specific orbital trajectories."'}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-mono">
            <span className="px-2.5 py-1 rounded bg-[#101d16] border border-[#23382c] text-[#a4e2ba] font-bold">
              {isAr ? '💡 مفهوم ميسر للعموم' : '💡 Public Accessible Science'}
            </span>
            <span className="px-2.5 py-1 rounded bg-[#101d16] border border-[#23382c] text-[#c5a059] font-bold">
              {isAr ? '🧠 علم النفس المعرفي والفلسفة' : '🧠 Cognitive Psychology & Philosophy'}
            </span>
            <span className="px-2.5 py-1 rounded bg-[#101d16] border border-[#23382c] text-[#91a89c]">
              YMI Curriculum Core
            </span>
          </div>
        </div>

        {/* 3 Core Philosophical Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="p-5 rounded-xl bg-[#09120e] border border-[#1a2d23] space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#14261d] border border-[#233e2f] flex items-center justify-center text-[#c5a059] font-mono font-bold text-xs">
              01
            </div>
            <h4 className="font-display font-bold text-base text-[#f5eedf]">
              {isAr ? '1. المدارات الفكرية (Attractors)' : '1. Thought Orbits (Attractors)'}
            </h4>
            <p className="text-xs text-[#a0b2a6] leading-relaxed font-sans">
              {isAr
                ? 'مثل جاذبية الكواكب، يمتلك كل فرد "جاذبات معرفية". يتأثر البعض بجاذب الفضول العلمي، أو القلق، أو الروتين اليومي.'
                : 'Analogous to planetary gravity, mind landscapes possess Cognitive Attractors pulling thoughts into specific orbits such as Curiosity, Anxiety, or Habitual Comfort.'}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#09120e] border border-[#1a2d23] space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#14261d] border border-[#233e2f] flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
              02
            </div>
            <h4 className="font-display font-bold text-base text-[#f5eedf]">
              {isAr ? '2. تكرار السلوكيات والأنماط' : '2. Periodic Habit Loops'}
            </h4>
            <p className="text-xs text-[#a0b2a6] leading-relaxed font-sans">
              {isAr
                ? 'الأنماط الانفعالية المتكررة (مثل: الحماس ← الإرهاق ← السكون ← الحماس) هي دورات دورية كلاسيكية تستخدمها الدماغ لترشيد الطاقة.'
                : 'Cyclic emotional sequences (e.g. enthusiasm → exhaustion → stillness → enthusiasm) represent Periodic Attractor Orbits optimizing mental energy conservation.'}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#09120e] border border-[#1a2d23] space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#14261d] border border-[#233e2f] flex items-center justify-center text-[#f0883e] font-mono font-bold text-xs">
              03
            </div>
            <h4 className="font-display font-bold text-base text-[#f5eedf]">
              {isAr ? '3. الإلهام والابتكار (Strange Attractor)' : '3. Creative Insight (Strange Attractor)'}
            </h4>
            <p className="text-xs text-[#a0b2a6] leading-relaxed font-sans">
              {isAr
                ? 'عند إدخال اضطراب بسيط في الروتين، يتجاوز الذهن المدار الكلاسيكي ليشكل جاذباً غريباً ينتج أفكاراً مبتكرة وغير متوقعة.'
                : 'When subtle perturbations enter the system, consciousness departs routine orbits to synthesize Strange Attractors—generating original creative breakthroughs.'}
            </p>
          </div>

        </div>

        {/* Interactive Mind Simulator Panel */}
        <div className="p-6 bg-[#050907] border border-[#192b20] rounded-2xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#14241a] pb-4">
            <div>
              <div className="text-[10px] font-mono text-[#c5a059] uppercase font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>{isAr ? 'محاكاة تفاعلية لمسارات الذهن' : 'Interactive Mind Phase-Space Visualiser'}</span>
              </div>
              <h3 className="text-lg font-display font-bold text-[#f5eedf] mt-0.5">
                {isAr ? 'اختبار مسارات ومدارات أفكارك' : 'Simulate Your Cognitive Attractor Field'}
              </h3>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-[#85988d]">{isAr ? 'النمط الحالي:' : 'Attractor Dynamics:'}</span>
              <span className={`px-2.5 py-1 rounded font-bold ${
                attractorState === 'STABLE'
                  ? 'bg-amber-950/60 border border-amber-800/80 text-amber-300'
                  : attractorState === 'CYCLIC'
                  ? 'bg-emerald-950/60 border border-emerald-800/80 text-emerald-300'
                  : 'bg-orange-950/60 border border-orange-800/80 text-orange-300'
              }`}>
                {attractorState === 'STABLE'
                  ? (isAr ? 'منطقة الراحة (ثابت)' : 'Fixed Comfort Zone')
                  : attractorState === 'CYCLIC'
                  ? (isAr ? 'حلقة متكررة (دوري)' : 'Habitual Cycle')
                  : (isAr ? 'ابتكار وإلهام (فوضى خلاقة)' : 'Creative Insight (Strange Attractor)')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Visualizer Canvas */}
            <div className="lg:col-span-7 bg-[#030604] border border-[#15251b] rounded-xl p-3 relative overflow-hidden">
              <canvas ref={canvasRef} className="w-full h-[220px] rounded block" />
            </div>

            {/* Sliders Controls */}
            <div className="lg:col-span-5 space-y-4 font-mono text-xs text-[#8e9f93]">
              
              {/* Slider 1: Stress Noise */}
              <div className="p-3.5 rounded-lg bg-[#08100c] border border-[#182a1f] space-y-2">
                <div className="flex justify-between items-center text-[#d0dad3]">
                  <span className="font-bold flex items-center gap-1.5">
                    <span>⚡ {isAr ? 'المثيرات والضغط (Noise Input)' : 'Stimulus & Stress Noise'}</span>
                  </span>
                  <span className="text-[#c5a059] font-bold">{stressNoise} / 10</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={stressNoise}
                  onChange={(e) => setStressNoise(parseInt(e.target.value))}
                  className="w-full accent-[#c5a059] cursor-pointer"
                />
                <p className="text-[10px] text-[#6a7d72]">
                  {isAr ? 'كلما زادت القيمة، زادت المدخلات العشوائية في الذهن.' : 'Higher noise introduces dense stochastic fluctuations.'}
                </p>
              </div>

              {/* Slider 2: Mental Flexibility */}
              <div className="p-3.5 rounded-lg bg-[#08100c] border border-[#182a1f] space-y-2">
                <div className="flex justify-between items-center text-[#d0dad3]">
                  <span className="font-bold flex items-center gap-1.5">
                    <span>🧠 {isAr ? 'المرونة الذهنية (Adaptability)' : 'Mental Adaptability & Flexibility'}</span>
                  </span>
                  <span className="text-emerald-400 font-bold">{mentalFlexibility} / 10</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={mentalFlexibility}
                  onChange={(e) => setFlexibility(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <p className="text-[10px] text-[#6a7d72]">
                  {isAr ? 'قدرة الذهن على التكيف وتبني منظورات جديدة.' : 'System flexibility to break rigid attractor basins.'}
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Practical Life Application Guide */}
        <div className="p-6 bg-[#08120e] border border-[#1b2e23] rounded-xl space-y-4">
          <h3 className="text-base font-display font-bold text-[#f5eedf] flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-[#c5a059]" />
            <span>{isAr ? 'التطبيق العملي في الحياة اليومية' : 'Practical Life Application Protocol'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-[#c8d4ce] leading-relaxed">
            <div className="p-3.5 bg-[#050907] border border-[#16271c] rounded-lg">
              <strong className="text-[#f0ece1] block mb-1 font-mono text-[11px] uppercase text-[#c5a059]">
                💡 {isAr ? 'كسر الحلقات المتكررة' : 'Breaking Unwanted Attractors'}
              </strong>
              {isAr
                ? 'عند الانحصار في قلق متكرر، أدخل تغييراً بسيطاً في روتينك اليومي لإزاحة أفكارك خارج المدار المعتاد.'
                : 'To break repetitive anxiety loops, introduce a subtle daily routine perturbation to shift phase-space dynamics out of legacy basins.'}
            </div>

            <div className="p-3.5 bg-[#050907] border border-[#16271c] rounded-lg">
              <strong className="text-[#f0ece1] block mb-1 font-mono text-[11px] uppercase text-emerald-400">
                🌱 {isAr ? 'استغلال اللحظات الخلاقة' : 'Harnessing Strange Attractors'}
              </strong>
              {isAr
                ? 'عندما تشعر بتشتت أفكارك، وثّقها مباشرة في تدوينات؛ فهذه الحالة تعكس تشكّل جاذب غريب يتيح أفكاراً أصيلة.'
                : 'When thoughts fluctuate dynamically, record insights immediately—the Strange Attractor phase synthesises authentic creative clarity.'}
            </div>
          </div>
        </div>

        {/* Section Comment & Discussion */}
        <CommentSection
          targetId="ymi-doc-psiko-hermeneutika-01"
          targetTitle={isAr ? 'الهرمينوطيقا النفسية ونظرية الجاذب المعرفي' : 'Axcelnetic Psycho-Hermeneutics & Cognitive Attractor Theory'}
          currentUser={currentUser}
          onOpenAuthModal={onOpenAuthModal}
        />

      </div>

    </article>
  );
};
