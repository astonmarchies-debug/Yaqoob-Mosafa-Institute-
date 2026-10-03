import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Sliders, Info, Zap } from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../services/i18n';

interface ChaosLabProps {
  currentLanguage?: SupportedLanguage;
}

export const ChaosLab: React.FC<ChaosLabProps> = ({ currentLanguage = 'en' }) => {
  const t = TRANSLATIONS[currentLanguage];
  const isRtl = currentLanguage === 'ar';

  const [activeExperiment, setActiveExperiment] = useState<'lorenz' | 'bifurcation'>('lorenz');

  // Lorenz parameters
  const [sigma, setSigma] = useState(10);
  const [rho, setRho] = useState(28);
  const [beta, setBeta] = useState(2.667);
  const [isRunning, setIsRunning] = useState(true);
  const [butterflyMode, setButterflyMode] = useState(true);
  const [lyapunovEstimate, setLyapunovEstimate] = useState<number>(0.905);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Lorenz Simulation Engine
  useEffect(() => {
    if (activeExperiment !== 'lorenz') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = 450);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 450;
      }
    };
    window.addEventListener('resize', handleResize);

    let dt = 0.008;
    let p1 = { x: 0.1, y: 0, z: 0 };
    let p2 = { x: 0.10001, y: 0, z: 0 };

    const trail1: { x: number; y: number }[] = [];
    const trail2: { x: number; y: number }[] = [];
    const maxTrail = 1800;

    let animId: number;
    let angle = 0;

    const render = () => {
      if (!ctx) return;

      ctx.fillStyle = 'rgba(6, 10, 8, 0.2)';
      ctx.fillRect(0, 0, width, height);

      angle += 0.002;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      if (isRunning) {
        for (let step = 0; step < 5; step++) {
          const dx1 = sigma * (p1.y - p1.x);
          const dy1 = p1.x * (rho - p1.z) - p1.y;
          const dz1 = p1.x * p1.y - beta * p1.z;

          p1.x += dx1 * dt;
          p1.y += dy1 * dt;
          p1.z += dz1 * dt;

          const dx2 = sigma * (p2.y - p2.x);
          const dy2 = p2.x * (rho - p2.z) - p2.y;
          const dz2 = p2.x * p2.y - beta * p2.z;

          p2.x += dx2 * dt;
          p2.y += dy2 * dt;
          p2.z += dz2 * dt;

          const scale = Math.min(width, height) * 0.016;
          const rx1 = p1.x * cosA - p1.y * sinA;
          const sx1 = width / 2 + rx1 * scale;
          const sy1 = height * 0.85 - p1.z * scale;
          trail1.push({ x: sx1, y: sy1 });
          if (trail1.length > maxTrail) trail1.shift();

          const rx2 = p2.x * cosA - p2.y * sinA;
          const sx2 = width / 2 + rx2 * scale;
          const sy2 = height * 0.85 - p2.z * scale;
          trail2.push({ x: sx2, y: sy2 });
          if (trail2.length > maxTrail) trail2.shift();
        }

        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);
        const lyap = Math.max(0.1, Math.min(4.5, Math.log(Math.max(1e-5, dist) / 1e-5) / 10));
        setLyapunovEstimate(Number(lyap.toFixed(3)));
      }

      if (trail1.length > 1) {
        ctx.strokeStyle = '#4ade80';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(trail1[0].x, trail1[0].y);
        for (let i = 1; i < trail1.length; i++) {
          ctx.lineTo(trail1[i].x, trail1[i].y);
        }
        ctx.stroke();
      }

      if (butterflyMode && trail2.length > 1) {
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(trail2[0].x, trail2[0].y);
        for (let i = 1; i < trail2.length; i++) {
          ctx.lineTo(trail2[i].x, trail2[i].y);
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeExperiment, isRunning, sigma, rho, beta, butterflyMode]);

  const resetLorenz = () => {
    setSigma(10);
    setRho(28);
    setBeta(2.667);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Lab Header */}
      <div className="pb-6 mb-6 border-b border-[#1b2b22] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#c5a059] font-semibold">
            {t.labTag}
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#f5eedf] mt-1">
            {t.labTitle}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#9ab0a4] max-w-2xl">
            {t.labSubtitle}
          </p>
        </div>

        {/* Experiment Selector Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#09110e] border border-[#1b2b23] rounded-lg text-xs font-mono">
          <button
            onClick={() => setActiveExperiment('lorenz')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeExperiment === 'lorenz'
                ? 'bg-[#182c22] text-[#e6c679] border border-[#2e4739] shadow-sm'
                : 'text-[#809187] hover:text-[#d3ddd7]'
            }`}
          >
            {t.labAttractorLorenz}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Main Visualizer Stage */}
        <div className="relative bg-[#060a08] border border-[#1a2d23] rounded-lg overflow-hidden shadow-2xl">
          <canvas ref={canvasRef} className="w-full block" />

          {/* Stage Controls Overlay */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="p-2 bg-[#0c1612]/90 hover:bg-[#162720] border border-[#243a2e] text-[#c5a059] rounded-md transition-colors"
              title="Pause/Play"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={resetLorenz}
              className="p-2 bg-[#0c1612]/90 hover:bg-[#162720] border border-[#243a2e] text-[#8ea096] hover:text-[#e6c679] rounded-md transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Legend */}
          <div className="px-4 py-2.5 bg-[#08100d] border-t border-[#16241c] flex flex-wrap items-center justify-between text-xs font-mono text-[#819289] gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Trajectory 1 (x₀ = 0.10000)
              </span>
              {butterflyMode && (
                <span className="flex items-center gap-1.5 text-yellow-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  Trajectory 2 (Perturbed: x₀ + 10⁻⁵)
                </span>
              )}
            </div>

            <div className="text-[#e6c679] font-bold">
              Lyapunov λ ≈ +{lyapunovEstimate} s⁻¹
            </div>
          </div>
        </div>

        {/* Sliders & Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 bg-[#08100c] border border-[#18281f] rounded-lg space-y-2">
            <div className="flex justify-between text-[#8ba093]">
              <span>Prandtl Parameter (σ):</span>
              <span className="text-[#c5a059] font-bold">{sigma}</span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={sigma}
              onChange={(e) => setSigma(parseFloat(e.target.value))}
              className="w-full accent-[#c5a059] cursor-pointer"
            />
          </div>

          <div className="p-4 bg-[#08100c] border border-[#18281f] rounded-lg space-y-2">
            <div className="flex justify-between text-[#8ba093]">
              <span>Rayleigh Parameter (ρ):</span>
              <span className="text-[#c5a059] font-bold">{rho}</span>
            </div>
            <input
              type="range"
              min={5}
              max={60}
              step={1}
              value={rho}
              onChange={(e) => setRho(parseFloat(e.target.value))}
              className="w-full accent-[#c5a059] cursor-pointer"
            />
          </div>

          <div className="p-4 bg-[#08100c] border border-[#18281f] rounded-lg space-y-2">
            <div className="flex justify-between text-[#8ba093]">
              <span>Aspect Ratio (β):</span>
              <span className="text-[#c5a059] font-bold">{beta.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={6}
              step={0.1}
              value={beta}
              onChange={(e) => setBeta(parseFloat(e.target.value))}
              className="w-full accent-[#c5a059] cursor-pointer"
            />
          </div>
        </div>

      </div>

    </div>
  );
};
