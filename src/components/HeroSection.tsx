import React, { useState, useEffect, useRef } from 'react';
import { ASSET_IMAGES } from '../assets/images';
import { Search, Sparkles, BookOpen, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { SupportedLanguage, COMPLETE_TRANSLATIONS } from '../services/i18n';

interface HeroSectionProps {
  totalDossiers: number;
  onExploreClick: () => void;
  onOpenLabClick: () => void;
  onOpenCreateClick: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  currentLanguage: SupportedLanguage;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalDossiers,
  onExploreClick,
  onOpenLabClick,
  onOpenCreateClick,
  searchQuery,
  setSearchQuery,
  currentLanguage,
}) => {
  const t = COMPLETE_TRANSLATIONS[currentLanguage];
  const isRtl = currentLanguage === 'ar';

  // Video States
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoTime, setVideoTime] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Speech and Audio synthesis references
  const [activeStep, setActiveStep] = useState(-1);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneOscRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Playback timer (runs up to 105 seconds (1:45) then loops)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setVideoTime((prev) => {
        if (prev >= 105) return 0;
        return prev + 0.2;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Determine current active step based on videoTime (105s total split into five 21s chapters)
  let currentStep = -1;
  if (videoTime >= 0 && videoTime < 21) currentStep = 0;
  else if (videoTime >= 21 && videoTime < 42) currentStep = 1;
  else if (videoTime >= 42 && videoTime < 63) currentStep = 2;
  else if (videoTime >= 63 && videoTime < 84) currentStep = 3;
  else if (videoTime >= 84 && videoTime <= 105) currentStep = 4;

  // Real-time Spoken Arabic TTS Voiceover is removed to have pure music only
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [isMuted, isPlaying]);

  // Web Audio background music synthesizer (Pure "Memory Reboot" melody)
  useEffect(() => {
    if (isMuted || !isPlaying) {
      if (gainNodeRef.current) {
        // Smooth fade out
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current?.currentTime || 0, 0.15);
      }
      return;
    }

    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (!gainNodeRef.current) {
        const gainNode = ctx.createGain();
        gainNode.connect(ctx.destination);
        gainNodeRef.current = gainNode;
      }

      // Smooth fade in background music (increased master volume for a louder, richer sound)
      gainNodeRef.current.gain.setTargetAtTime(0.32, ctx.currentTime, 0.25);

      // Memory Reboot iconic retro cyberpunk synth arpeggiator melody scheduler
      let noteIndex = 0;
      // Melody notes scaled relative to 452Hz A-tuning (Memory Reboot progression)
      const memoryRebootMelody = [452.00, 508.00, 603.00, 570.00, 452.00, 508.00, 603.00, 678.00];
      const subBassProgression = [113.00, 127.00, 150.75, 142.50]; // Low pitch sub-octave cosmic roots

      const melodyInterval = setInterval(() => {
        if (isMuted || !isPlaying || !gainNodeRef.current) return;
        
        // --- 1. Primary Melody Synth (Memory Reboot Hook) ---
        const synthNote = ctx.createOscillator();
        const synthGain = ctx.createGain();
        const delay = ctx.createDelay();
        const feedback = ctx.createGain();

        synthNote.type = 'sawtooth';
        const currentFreq = memoryRebootMelody[noteIndex % memoryRebootMelody.length];
        synthNote.frequency.setValueAtTime(currentFreq, ctx.currentTime);

        // Filter out harsh highs for smooth retro space exploration texture
        const bandpass = ctx.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.setValueAtTime(1100 + Math.sin(noteIndex * 0.4) * 300, ctx.currentTime); // Resonance sweep!
        bandpass.Q.setValueAtTime(1.5, ctx.currentTime);

        // Individual note volume
        synthGain.gain.setValueAtTime(0.045, ctx.currentTime);
        synthGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

        // Delay & Feedback for glorious cosmic space echo
        delay.delayTime.setValueAtTime(0.22, ctx.currentTime);
        feedback.gain.setValueAtTime(0.42, ctx.currentTime);

        // Route routing connections
        synthNote.connect(bandpass);
        bandpass.connect(synthGain);
        synthGain.connect(gainNodeRef.current);
        
        // Feedback loop
        synthGain.connect(delay);
        delay.connect(feedback);
        feedback.connect(delay);
        delay.connect(gainNodeRef.current);

        synthNote.start();
        synthNote.stop(ctx.currentTime + 0.38);

        // --- 2. Secondary Deep Space Sub-Bass (Triggers every 4 beats for deep universe epicness) ---
        if (noteIndex % 4 === 0) {
          const subBass = ctx.createOscillator();
          const subGain = ctx.createGain();
          const subFilter = ctx.createBiquadFilter();

          subBass.type = 'triangle'; // Smooth deep bass wave
          const chordIndex = Math.floor(noteIndex / 4) % subBassProgression.length;
          subBass.frequency.setValueAtTime(subBassProgression[chordIndex], ctx.currentTime);

          subFilter.type = 'lowpass';
          subFilter.frequency.setValueAtTime(150, ctx.currentTime); // Keep only deep warm rumble

          subGain.gain.setValueAtTime(0.18, ctx.currentTime);
          subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

          subBass.connect(subFilter);
          subFilter.connect(subGain);
          subGain.connect(gainNodeRef.current);

          subBass.start();
          subBass.stop(ctx.currentTime + 1.6);
        }

        noteIndex++;
      }, 400); // Rhythmic universe-drifting pace

      return () => {
        clearInterval(melodyInterval);
      };
    } catch (e) {
      console.error("Web Audio Synthesizer blocked or not supported in this environment", e);
    }
  }, [isMuted, isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (droneOscRef.current) {
        try { droneOscRef.current.stop(); } catch {}
      }
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch {}
      }
    };
  }, []);

  // High-tech Canvas simulation of non-linear orbits (representing the Video feed)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    // Universe Starfield Stars
    const stars: { x: number; y: number; speed: number; size: number; alpha: number; color: string }[] = [];
    for (let i = 0; i < 60; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.1 + Math.random() * 0.4,
        size: 0.5 + Math.random() * 2,
        alpha: 0.3 + Math.random() * 0.7,
        color: i % 3 === 0 ? '#c5a059' : (i % 3 === 1 ? '#38bdf8' : '#ffffff'),
      });
    }

    // Floating Astrological Constellation Nodes
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    for (let i = 0; i < 12; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 3 + Math.random() * 2,
      });
    }

    // Shooting Star Tracker
    let shootingStar = { x: 0, y: 0, length: 0, active: false, speedX: 0, speedY: 0 };

    const render = () => {
      // Space Dark Backdrop with Nebula Glow effect
      ctx.fillStyle = 'rgba(4, 7, 6, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create a gorgeous radial cosmic nebula in the center
      const nebulaGrad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 20, 
        canvas.width / 2, canvas.height / 2, 240
      );
      nebulaGrad.addColorStop(0, 'rgba(15, 23, 42, 0.35)');
      nebulaGrad.addColorStop(0.5, 'rgba(13, 148, 136, 0.08)');
      nebulaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render Starfield
      stars.forEach((s) => {
        // Move stars horizontally representing slow galaxy spin
        s.x += s.speed;
        if (s.x > canvas.width) {
          s.x = 0;
          s.y = Math.random() * canvas.height;
        }

        // Twinkle effect
        s.alpha += (Math.random() - 0.5) * 0.1;
        s.alpha = Math.max(0.2, Math.min(1.0, s.alpha));

        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      // Draw Constellation Connections
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.12)';
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and Draw Constellation Nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        // Bounce boundaries
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        ctx.fillStyle = '#c5a059';
        ctx.shadowColor = '#c5a059';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
      });

      // Orbiting Golden Sun & Planets
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Golden Sun
      ctx.shadowColor = '#e6c679';
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#c5a059';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Orbit Ring 1
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 65, 0, Math.PI * 2);
      ctx.stroke();

      // Planet 1
      const p1X = centerX + Math.cos(angle) * 65;
      const p1Y = centerY + Math.sin(angle) * 65;
      ctx.fillStyle = '#38bdf8'; // Blue planet
      ctx.beginPath();
      ctx.arc(p1X, p1Y, 6, 0, Math.PI * 2);
      ctx.fill();

      // Orbit Ring 2 (Elliptical!)
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 120, 50, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      // Planet 2
      const p2X = centerX + Math.cos(angle * 0.6) * 120;
      const p2Y = centerY + Math.sin(angle * 0.6) * 50;
      ctx.fillStyle = '#10b981'; // Green planet
      ctx.beginPath();
      ctx.arc(p2X, p2Y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Random Shooting Stars
      if (!shootingStar.active && Math.random() < 0.015) {
        shootingStar.active = true;
        shootingStar.x = Math.random() * canvas.width * 0.8;
        shootingStar.y = Math.random() * canvas.height * 0.5;
        shootingStar.length = 30 + Math.random() * 40;
        shootingStar.speedX = 3 + Math.random() * 5;
        shootingStar.speedY = 1.5 + Math.random() * 3;
      }

      if (shootingStar.active) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(shootingStar.x + shootingStar.length, shootingStar.y + (shootingStar.length * 0.5));
        ctx.stroke();

        shootingStar.x += shootingStar.speedX;
        shootingStar.y += shootingStar.speedY;

        if (shootingStar.x > canvas.width || shootingStar.y > canvas.height) {
          shootingStar.active = false;
        }
      }

      // Telemetry Data Box
      ctx.fillStyle = 'rgba(197, 160, 89, 0.85)';
      ctx.font = '9px monospace';
      ctx.fillText(`ASTRO_ALIGNMENT: P_SYS_901_SECURED`, 15, 20);
      ctx.fillText(`COSMIC_EXPANSION_RATE: 73.24 km/s/Mpc`, 15, 32);
      ctx.fillText(`YMQ_GALACTIC_QUADRANT: Theta-89-Z`, 15, 44);

      // Simulating voiceover audio bars at the bottom
      ctx.fillStyle = '#38bdf8';
      for (let i = 0; i < 40; i++) {
        const barHeight = 4 + Math.abs(Math.sin(i * 0.5 + angle * 3.5)) * 15;
        ctx.fillRect(canvas.width - 200 + i * 5, canvas.height - 15 - barHeight, 3, barHeight);
      }

      angle += 0.015;
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Sync Subtitle Content
  let arabicSubtitle = "";
  let englishSubtitle = "";

  if (videoTime >= 0 && videoTime < 21) {
    arabicSubtitle = "مرحباً بكم في معهد يعقوب مصطفى - حراس النظم غير الخطية والفوضى الكونية.";
    englishSubtitle = "Welcome to the Yaqoob Mosafa Institute - guardians of non-linear systems and cosmic chaos.";
  } else if (videoTime >= 21 && videoTime < 42) {
    arabicSubtitle = "هنا، نقوم بتدجين الفوضى والتحكم في المجموعات الجاذبة وتفاعلات الحركة اللانهائية.";
    englishSubtitle = "Here, we domesticate chaos and control chaotic attractors and infinite trajectory interactions.";
  } else if (videoTime >= 42 && videoTime < 63) {
    arabicSubtitle = "ندعوكم لاستكشاف مختبراتنا المتقدمة وأقسامنا الأكاديمية المختلفة.";
    englishSubtitle = "We invite you to explore our advanced research laboratories and academic divisions.";
  } else if (videoTime >= 63 && videoTime < 84) {
    arabicSubtitle = "عبر علم الأكسلنيتيكا والهرمنيوطيقيا النفسية، نفتح بوابات الإدراك وننير الفكر البشري.";
    englishSubtitle = "Through Axcelnetics and Psycho-Hermeneutics, we open gateways of perception and enlighten human intellect.";
  } else if (videoTime >= 84 && videoTime <= 105) {
    arabicSubtitle = "معهد يعقوب مصطفى: نحو آفاق المعرفة اللانهائية والدقة المتكاملة.";
    englishSubtitle = "The Yaqoob Mosafa Institute: Toward horizons of infinite knowledge and absolute precision.";
  }

  return (
    <section className="relative border-b border-[#1b2b22] bg-[#050907] overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Official Top Institutional Header Bar */}
      <div className="bg-[#09110d] border-b border-[#16231c] px-4 py-1.5 text-[10px] font-mono text-[#6e8276] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span className="text-[#a4b5ad] font-bold">{t.topSectorBar}</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">{t.classificationRestricted}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>{t.protocolSys}</span>
          <span>{t.authActive}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative z-10">
        
        {/* Heraldic Insignia & Institutional Masthead */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pb-8 border-b border-[#15231c]">
          
          {/* Official Seal */}
          <div className="relative shrink-0 group">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-br from-[#c5a059] via-[#7d642e] to-[#1c3327] shadow-2xl shadow-black/80">
              <img
                src={ASSET_IMAGES.insignia}
                alt="Segel Resmi Yaqoob Mosafa Institute"
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#091510] border border-[#c5a059]/60 text-[9px] font-mono text-[#e6c679] whitespace-nowrap shadow-md font-bold">
              {t.estYear}
            </div>
          </div>

          {/* Title & Institutional Mandate */}
          <div className={`text-center sm:${isRtl ? 'text-right' : 'text-left'} flex-1`}>
            <div className="text-xs sm:text-sm font-editorial italic text-[#c5a059] tracking-wider mb-1">
              {t.heroMotto}
            </div>
            
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-[#f5eedf] tracking-tight leading-tight">
              {t.brandTitle}
            </h1>
            
            <p className="mt-2 text-xs sm:text-sm text-[#9eb1a6] max-w-3xl leading-relaxed">
              {t.heroDescription}
            </p>

            {/* Quick Institutional Badge Row */}
            <div className={`mt-4 flex flex-wrap items-center justify-center sm:${isRtl ? 'justify-start' : 'justify-start'} gap-2 text-[11px] font-mono`}>
              <span className="px-2.5 py-1 rounded bg-[#0b1611] border border-[#1b2f24] text-[#d5ded8]">
                {t.statTotalArchives}: <strong className="text-[#c5a059]">{totalDossiers}</strong>
              </span>
              <span className="px-2.5 py-1 rounded bg-[#0b1611] border border-[#1b2f24] text-[#d5ded8]">
                Discipline: <strong className="text-[#a4e2ba]">Non-Linear Dynamics</strong>
              </span>
              <span className="px-2.5 py-1 rounded bg-[#0b1611] border border-[#1b2f24] text-[#d5ded8]">
                System: <strong className="text-[#e6c679]">{t.statSystemConsole}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Search & Fast Action Toolbar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <Search className={`w-4 h-4 absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-[#72857a]`} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-[#070d0a] border border-[#1d2d25] rounded-lg ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 text-xs text-[#f0ebe0] font-mono placeholder-[#53655b] focus:outline-none focus:border-[#c5a059]`}
            />
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end text-xs font-mono">
            <button
              onClick={onExploreClick}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-lg bg-[#0e1b15] border border-[#213529] hover:border-[#c5a059] text-[#d8e3dc] transition-colors flex items-center justify-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{t.exploreBtn}</span>
            </button>
            <button
              onClick={onOpenCreateClick}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-lg bg-[#c5a059] hover:bg-[#d6b36c] text-[#060a08] font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.registerDossierBtn}</span>
            </button>
          </div>
        </div>

        {/* ================= YAQUOB MOSAFA INSTITUTE ARABIC SIMULATED INTERACTIVE VIDEO UNIT ================= */}
        <div className="mt-8 border border-[#243d2c] rounded-2xl overflow-hidden bg-[#040806] shadow-2xl relative">
          <div className="bg-[#09120d] border-b border-[#14231b] px-4 py-2.5 text-xs font-mono text-[#a4b5ad] flex items-center justify-between">
            <span className="flex items-center gap-2 text-[#c5a059]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <strong>[Official Videos]: Yaqoob Mosafa Institute</strong>
            </span>
            <span className="text-[10px] text-[#6e8276] uppercase">Yaqoob Mosafa Institute © 2026</span>
          </div>

          <div className="relative aspect-video max-h-[380px] w-full bg-black flex flex-col justify-end overflow-hidden">
            {/* Interactive Glowing Vector Chaos Canvas Simulator */}
            <canvas
              ref={canvasRef}
              width={640}
              height={360}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Timed Dual Subtitles Overlay Panel */}
            <div className="absolute bottom-12 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex flex-col items-center justify-center text-center space-y-1.5 select-none pointer-events-none z-20">
              <p className="text-[#c5a059] font-sans text-xs sm:text-sm md:text-base font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                {englishSubtitle}
              </p>
            </div>

            {/* Custom Video Control Bar Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-black/80 border-t border-[#1a2c21] flex items-center justify-between gap-4 text-[11px] font-mono text-[#82948a] z-30">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 rounded bg-[#101e15] hover:bg-[#1b2f21] text-[#c5a059] hover:text-[#e6c679] transition-colors cursor-pointer"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-[#c5a059]" />}
                </button>

                <div className="text-[10px] text-[#86998f]">
                  {Math.floor(videoTime / 60)}:{(Math.floor(videoTime % 60) < 10 ? '0' : '')}{Math.floor(videoTime % 60)} / 1:45
                </div>
              </div>

              {/* Progress Slider (Interactive!) */}
              <div className="flex-1 max-w-md h-1.5 bg-[#14231b] rounded-full overflow-hidden relative cursor-pointer" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = clickX / rect.width;
                setVideoTime(ratio * 105);
              }}>
                <div
                  className="h-full bg-gradient-to-r from-[#10b981] to-[#c5a059] transition-all"
                  style={{ width: `${(videoTime / 105) * 100}%` }}
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1 text-[#82948a] hover:text-white transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#10b981]" />}
                </button>
                <Maximize2 className="w-3.5 h-3.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#060b08] border-t border-[#14231b] flex items-center justify-between text-[11px] font-mono text-[#82948a]">
            <span>🔊 Fully interactive mathematical attractor video simulation constructed from real-time vectors.</span>
            <span className="text-[#c5a059] font-bold">Audio: Arabic (اللغة العربية)</span>
          </div>
        </div>

      </div>
    </section>
  );
};
