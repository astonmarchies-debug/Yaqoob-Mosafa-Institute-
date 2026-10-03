import React, { useState, useEffect, useRef } from 'react';
import { Book, Play, Pause, RotateCcw, Volume2, Sparkles, Compass, Star, Feather, Coffee, Plus, Save, Trash2, Edit3, Award, FileText, UserPlus, UserCheck } from 'lucide-react';
import { ResearcherUser } from '../types/dossier';
import { CommentSection } from './CommentSection';

interface NarrationSuiteProps {
  currentUser: ResearcherUser;
  onOpenAuthModal?: () => void;
  selectedNarrativeId?: string;
}

interface NarrativeTopic {
  id: string;
  title: string;
  author: string;
  era: string;
  style: 'ancient' | 'victorian' | 'academic' | 'cyberpunk';
  content: string[];
  works: string[];
}

const PRESET_TOPICS: NarrativeTopic[] = [
  {
    id: 'ibn_hamza',
    title: 'Ibn Hamza: The Al-Mizan Codex and the Trajectory of Equilibrium',
    author: 'Ibn Hamza Al-Mu\'addil',
    era: '14th Century (Baghdad / Aleppo)',
    style: 'ancient',
    content: [
      "In the name of the Infinite Balance, let it be recorded that the apparent randomness of the star systems is merely a silent choreography of equations yet unsolved.",
      "As a young geometer in Aleppo, I spent hundreds of nights charting the orbits of Saturn and Jupiter. Classical Ptolemaic orbits assumed perfect circularity, yet my astrolabe recorded a subtle, non-linear distortion.",
      "By balancing the weight of these planetary perturbations through recursive algebra, I designed the 'Al-Mizan' (The Cosmic Scale) geometry.",
      "This system proves that chaotic, non-linear trajectories eventually conform to a beautifully balanced, repeating pattern in phase space.",
      "Let those who inherit the work of the Institute know that we do not force nature into rigid straight lines. We let the natural chaos carry our mathematics."
    ],
    works: [
      "The Al-Mizan Codex on Celestial Gravitational Fluctuations",
      "The Geometrical Trajectory Balance of Dual Astral Moons",
      "Treatise on Recursive Orbits in Syrian Astrolabes"
    ]
  },
  {
    id: 'dr_jamestock',
    title: 'Dr. Jamestock: The Great London Convergence and Electromagnetic Chaos',
    author: 'Dr. Jamestock',
    era: 'Victorian London (1888 AD)',
    style: 'victorian',
    content: [
      "My midnight experiments in the fog-bound laboratory of Greenwich have led to a discovery that challenges the very foundations of Newtonian mechanics.",
      "By measuring the thermal and electromagnetic current fluctuations of the River Thames in synchronicity with the transit of Mars, a strange, double-lobed loop emerged upon my mapping coordinate canvas.",
      "The electromagnetic needle did not oscillate randomly, nor did it settle. It was captured by a complex attractor that defied any classical periodic formula.",
      "We have formally catalogued this as the 'Jamestock Anomaly'. It is proof that underlying the steam and steel of our modern world, the cosmos hums with a complex, non-linear harmony.",
      "I am convinced that our scientific establishment will reject these findings out of sheer fear of the unpredictable. But the future belongs to chaos."
    ],
    works: [
      "On Electromagnetic Perturbations and Non-Linear Oscillations in Fluids",
      "The Greenwich Logbook of Strange Attractors and Orbit Conversions",
      "A Critique of Newtonian Rigidity in Astronomical Calculations"
    ]
  },
  {
    id: 'franz_hamp',
    title: 'Franz Hamp: The Jena Experiments and the Psycho-Hermeneutics Mainframe',
    author: 'Franz Hamp',
    era: 'Weimar Era (1934 AD)',
    style: 'academic',
    content: [
      "Our isolation in the deep research facility of the Black Forest has yielded a absolute breakthrough in mapping the human mind's relation to cosmic geometry.",
      "Through the newly developed science of Axcelnetics and Psycho-Hermeneutics, we successfully measured sympathetic resonance between human neural wave patterns and galactic stellar coordinates.",
      "The human mind is not a passive bystander in the cosmos. It behaves as a non-linear receiver, fluctuating in absolute synchronicity with outer galactic frequencies.",
      "By measuring these cognitive attractor fluctuations, we have charted the mental coordinates of perception, opening new gateways to enlightened human intellect.",
      "We conclude that psychology and physics are not separate disciplines; they are merely the internal and external views of the same celestial equation."
    ],
    works: [
      "Foundations of Axcelnetics and Cognitive Galactic Alignment",
      "The Black Forest Protocols on Sympathetic Resonance in Human Brainwaves",
      "The Psycho-Hermeneutic Spectrum of Astronomical Coordinate Perception"
    ]
  },
  {
    id: 'abdul_khan',
    title: 'Abdul Khan: Mughal Astrometry and the Forbidden Theta Coordinates',
    author: 'Abdul Khan',
    era: 'Mughal Dynasty (1672 AD)',
    style: 'ancient',
    content: [
      "Under the royal decree of Delhi, I constructed a set of brass observation coordinates twice the height of a grown horse.",
      "While orthodox astronomers focused on tracking the solar calendar, my instruments were pointed to the dark gravitational voids of the sky, known as the Theta Quadrant.",
      "I recorded stars that did not stay in their expected paths, but warped and bent around invisible pockets of extreme gravity.",
      "These spatial anomalies prove that space is not a flat canvas, but an elastic fabric of curves and ripples.",
      "This catalogue was burned by royal rivals who called it sorcery, but the coordinates are safely preserved in the secret annals of our Institute."
    ],
    works: [
      "Imperial Mughal Star Catalogue of Anomalous Gravitational Voids",
      "Description of the Double-Loop Astrolabe for Non-Linear Alignment",
      "The Delhi Observations on Gravitational Fabric Warp"
    ]
  },
  {
    id: 'suleiman_altamrin',
    title: 'Süleiman Al-Tamrin: The Alchemical Matrix and Molecular Harmony',
    author: 'Süleiman Al-Tamrin',
    era: 'Ottoman Constantinople (1743 AD)',
    style: 'academic',
    content: [
      "In the candle-lit chambers of Constantinople, I succeeded in distilling the resonance frequency of cosmic minerals.",
      "By matching the molecular vibrations of rare elements with the sound of celestial background orbits, we created the first material synthesis of the Institute.",
      "The metal does not merely melt; it conforms its atomic grid to the cosmic background, singing a soft pitch that aligns perfectly with the universe's frequency.",
      "This proves that the chemistry of the earth and the astronomy of the heavens are tied together by a singular, non-linear harmonic chain.",
      "Let future philosophers guard this secret: for in the balance of the micro-atom lies the absolute key to the macro-cosmos."
    ],
    works: [
      "The Alchemical Treatise on Macro-Micro Harmonic Synchronization",
      "The Constantinople Records on Vibrational Alchemy",
      "On the Secret Pitch of Stellar Materials and Elemental Fusion"
    ]
  }
];

export const NarrationSuite: React.FC<NarrationSuiteProps> = ({ currentUser, onOpenAuthModal, selectedNarrativeId }) => {
  const [topics, setTopics] = useState<NarrativeTopic[]>(() => {
    const saved = localStorage.getItem('ymi_custom_narratives');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...PRESET_TOPICS, ...parsed];
      } catch {
        return PRESET_TOPICS;
      }
    }
    return PRESET_TOPICS;
  });

  const [followedScholars, setFollowedScholars] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ymi_followed_scholars');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFollowScholar = (scholarName: string) => {
    let updated: string[];
    if (followedScholars.includes(scholarName)) {
      updated = followedScholars.filter(s => s !== scholarName);
    } else {
      updated = [...followedScholars, scholarName];
    }
    setFollowedScholars(updated);
    localStorage.setItem('ymi_followed_scholars', JSON.stringify(updated));
  };

  const [selectedId, setSelectedId] = useState<string>(PRESET_TOPICS[0].id);

  // Sync selectedId when selectedNarrativeId changes
  useEffect(() => {
    if (selectedNarrativeId) {
      const exists = topics.some(t => t.id === selectedNarrativeId);
      if (exists) {
        setSelectedId(selectedNarrativeId);
      }
    }
  }, [selectedNarrativeId, topics]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentParagraphIdx, setCurrentParagraphIdx] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(0.85); // UK Academic standard
  const [voiceGender, setVoiceGender] = useState<'male' | 'female'>('male');

  // User story writer states
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newEra, setNewEra] = useState('');
  const [newStyle, setNewStyle] = useState<'ancient' | 'victorian' | 'academic' | 'cyberpunk'>('academic');
  const [newContent, setNewContent] = useState('');
  const [newWorks, setNewWorks] = useState('');
  const [showEditor, setShowEditor] = useState(false);

  const selectedTopic = topics.find(t => t.id === selectedId) || topics[0];
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Stop any playing speech when switching topics
  useEffect(() => {
    stopSpeech();
    setCurrentParagraphIdx(0);
  }, [selectedId]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const handleExportFolio = () => {
    try {
      const textToExport = `========================================================
YAQOOB MOSAFA INSTITUTE - ACADEMIC MEMOIR VAULT
========================================================
Title: ${selectedTopic.title}
Author/Scholar: ${selectedTopic.author}
Historical Era: ${selectedTopic.era}
Style: ${selectedTopic.style.toUpperCase()}

KARYA UTAMA / NOTABLE MASTERPIECES:
${selectedTopic.works && selectedTopic.works.length > 0 
  ? selectedTopic.works.map((w) => `  - ${w}`).join('\n') 
  : '  None Registered'}

MEMOIR / CHRONICLE CONTENT:
${selectedTopic.content.join('\n\n')}

========================================================
Verified Fictional Legacy Archives - Yaqoob Mosafa Institute © 2026
========================================================`;

      const blob = new Blob([textToExport], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedTopic.author.replace(/[^a-zA-Z0-9]/g, '_')}_memoirs_folio.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("Failed to export folio file.");
    }
  };

  const playParagraph = (idx: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Clear current queue
    setCurrentParagraphIdx(idx);

    const text = selectedTopic.content[idx];
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language to UK English for global academic prestige
    utterance.lang = 'en-GB';
    utterance.rate = playbackRate;

    // Apply specific pitch characteristics depending on selected style & character
    if (selectedTopic.style === 'ancient') {
      utterance.pitch = 0.85; // Deep ancient sage
    } else if (selectedTopic.style === 'victorian') {
      utterance.pitch = 1.05; // High formal British gentleman
    } else if (selectedTopic.style === 'cyberpunk') {
      utterance.pitch = 0.90; // Dramatic synthetic tone
    } else {
      utterance.pitch = 1.00; // Balanced academic
    }

    // Find high-quality UK English voice
    const voices = window.speechSynthesis.getVoices();
    const ukVoice = voices.find(v => 
      v.lang.startsWith('en-GB') && 
      (voiceGender === 'female' ? (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('hazel') || v.name.toLowerCase().includes('susan')) : (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('george') || v.name.toLowerCase().includes('oliver') || v.name.toLowerCase().includes('daniel')))
    ) || voices.find(v => v.lang.startsWith('en-GB')) || voices.find(v => v.lang.startsWith('en'));

    if (ukVoice) {
      utterance.voice = ukVoice;
    }

    // Handle end of paragraph
    utterance.onend = () => {
      if (idx < selectedTopic.content.length - 1) {
        // Move to next paragraph automatically
        playParagraph(idx + 1);
      } else {
        setIsPlaying(false);
        setCurrentParagraphIdx(0);
      }
    };

    utteranceRef.current = utterance;
    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      stopSpeech();
    } else {
      playParagraph(currentParagraphIdx);
    }
  };

  const handleReset = () => {
    stopSpeech();
    setCurrentParagraphIdx(0);
  };

  // Submit and save custom story
  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAuthor || !newContent) {
      alert("Please fill in Title, Author/Scholar, and the Story Content!");
      return;
    }

    const paragraphs = newContent.split('\n').filter(p => p.trim() !== '');
    const worksList = newWorks ? newWorks.split(',').map(w => w.trim()).filter(w => w !== '') : [];

    const newTopic: NarrativeTopic = {
      id: 'custom_' + Date.now(),
      title: newTitle,
      author: newAuthor,
      era: newEra || 'Modern Era (2026)',
      style: newStyle,
      content: paragraphs,
      works: worksList
    };

    const customOnly = topics.filter(t => t.id.startsWith('custom_'));
    const updatedCustom = [...customOnly, newTopic];

    // Save custom stories to localStorage
    localStorage.setItem('ymi_custom_narratives', JSON.stringify(updatedCustom));
    setTopics([...PRESET_TOPICS, ...updatedCustom]);
    setSelectedId(newTopic.id);

    // Reset inputs & hide editor
    setNewTitle('');
    setNewAuthor('');
    setNewEra('');
    setNewStyle('academic');
    setNewContent('');
    setNewWorks('');
    setShowEditor(false);
  };

  const handleDeleteCustom = (idToDelete: string) => {
    if (confirm("Are you sure you want to delete this custom story from the Institute's archive?")) {
      stopSpeech();
      const customOnly = topics.filter(t => t.id.startsWith('custom_') && t.id !== idToDelete);
      localStorage.setItem('ymi_custom_narratives', JSON.stringify(customOnly));
      setTopics([...PRESET_TOPICS, ...customOnly]);
      setSelectedId(PRESET_TOPICS[0].id);
    }
  };

  // Visual customisation matching style
  const getStyleClasses = () => {
    switch (selectedTopic.style) {
      case 'ancient':
        return {
          bg: 'bg-[#0f0e0b] border-[#5e4b30]',
          accentText: 'text-[#c5a059]',
          border: 'border-[#423420]',
          font: 'font-serif',
          titleColor: 'text-[#e6c679]',
          cardGlow: 'shadow-[0_0_20px_rgba(197,160,89,0.08)]'
        };
      case 'victorian':
        return {
          bg: 'bg-[#0d1117] border-[#38bdf8]/40',
          accentText: 'text-[#38bdf8]',
          border: 'border-[#1e293b]',
          font: 'font-serif italic',
          titleColor: 'text-[#7dd3fc]',
          cardGlow: 'shadow-[0_0_20px_rgba(56,189,248,0.08)]'
        };
      case 'academic':
        return {
          bg: 'bg-[#09110d] border-[#10b981]/40',
          accentText: 'text-[#10b981]',
          border: 'border-[#14261c]',
          font: 'font-mono',
          titleColor: 'text-[#34d399]',
          cardGlow: 'shadow-[0_0_20px_rgba(16,185,129,0.08)]'
        };
      case 'cyberpunk':
        return {
          bg: 'bg-[#120a1c] border-[#c084fc]/40',
          accentText: 'text-[#c084fc]',
          border: 'border-[#2e104a]',
          font: 'font-sans font-medium',
          titleColor: 'text-[#d8b4fe]',
          cardGlow: 'shadow-[0_0_20px_rgba(192,132,252,0.12)]'
        };
    }
  };

  const theme = getStyleClasses();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Welcome Title */}
      <div className="bg-[#040805] border border-[#14231b] rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#c5a059] mb-1.5">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>SECTOR-04 TAXONOMY</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-display font-bold text-[#f5eedf]">
            The Narration Vault & Memoir Studio
          </h1>
          <p className="text-sm text-[#8ca395] mt-1.5 max-w-3xl">
            A dedicated historical sector for hearing, experiencing, and cataloguing the comprehensive biographies, epic journeys, and masterpiece works of the five legendary scholars. Submit your own chronicles and listen to them in UK Global English!
          </p>
        </div>

        {/* Create new story trigger */}
        <button
          onClick={() => setShowEditor(!showEditor)}
          className="px-4 py-2.5 rounded-lg bg-[#c5a059] hover:bg-[#d4b46c] text-black font-mono font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>WRITE CHRONICLE</span>
        </button>
      </div>

      {/* Grid of preset and custom stories */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Story Navigator (Preset Scholars & Custom User Stories) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#040805] border border-[#14231b] rounded-2xl p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-[#c5a059] mb-3 uppercase tracking-wider pb-1.5 border-b border-[#14231b]">
                I. Legendary Pioneers
              </div>
              <div className="space-y-1.5 mb-6">
                {topics.filter(t => !t.id.startsWith('custom_')).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setSelectedId(t.id); setShowEditor(false); }}
                    className={`w-full text-left px-3.5 py-3 rounded-xl border text-xs font-mono transition-all flex items-center justify-between gap-3 ${
                      selectedId === t.id && !showEditor
                        ? 'bg-[#182d23] text-[#f2e7cb] border-[#c5a059]'
                        : 'bg-[#080d0a] text-[#86998e] border-[#101b15] hover:text-[#c5a059] hover:bg-[#0d1612]'
                    }`}
                  >
                    <div className="truncate">
                      <div className="font-bold">{t.author}</div>
                      <div className="text-[10px] text-[#5e7566] truncate mt-0.5">{t.era}</div>
                    </div>
                    <Compass className="w-3.5 h-3.5 opacity-60" />
                  </button>
                ))}
              </div>

              {/* Custom / User Submitted Section */}
              <div className="text-xs font-mono text-[#c5a059] mb-3 uppercase tracking-wider pb-1.5 border-b border-[#14231b] flex items-center justify-between">
                <span>II. User-Written Memoirs</span>
                <span className="text-[10px] bg-[#122319] border border-[#23402f] px-2 py-0.5 rounded text-[#10b981] font-bold">
                  {topics.filter(t => t.id.startsWith('custom_')).length} Total
                </span>
              </div>

              {topics.filter(t => t.id.startsWith('custom_')).length === 0 ? (
                <div className="text-center p-6 border border-dashed border-[#14231b] rounded-xl bg-[#080d0a]/50 text-xs text-[#5e7566] italic">
                  No user chronicles in archives yet. Click "Write Chronicle" above to submit the first story!
                </div>
              ) : (
                <div className="space-y-1.5">
                  {topics.filter(t => t.id.startsWith('custom_')).map((t) => (
                    <div
                      key={t.id}
                      className={`group w-full rounded-xl border text-xs font-mono transition-all flex items-center justify-between p-2.5 ${
                        selectedId === t.id && !showEditor
                          ? 'bg-[#182d23] text-[#f2e7cb] border-[#c5a059]'
                          : 'bg-[#080d0a] text-[#86998e] border-[#101b15] hover:text-[#c5a059]'
                      }`}
                    >
                      <button
                        onClick={() => { setSelectedId(t.id); setShowEditor(false); }}
                        className="flex-1 text-left truncate cursor-pointer"
                      >
                        <div className="font-bold truncate">{t.title}</div>
                        <div className="text-[9px] text-[#5e7566] truncate mt-0.5">Author: {t.author}</div>
                      </button>
                      <button
                        onClick={() => handleDeleteCustom(t.id)}
                        className="p-1.5 rounded hover:bg-rose-950/40 text-gray-500 hover:text-rose-400 transition-colors ml-2 cursor-pointer"
                        title="Delete custom chronicle"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-[#14231b] text-[10px] font-mono text-[#5e7566] leading-relaxed">
              *All submissions are encrypted and preserved using browser local persistence for zero-telemetry offline storage.
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Interface Panel / Submission Editor */}
        <div className="lg:col-span-8 flex flex-col justify-stretch">
          
          {/* Editor Form */}
          {showEditor ? (
            <form onSubmit={handleSaveStory} className="bg-[#040805] border border-[#1b3022] rounded-2xl p-6 sm:p-8 space-y-5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#c5a059] mb-3 pb-2 border-b border-[#14231b]">
                  <Edit3 className="w-4 h-4" />
                  <span>WRITE A NEW CHRONICLE TO THE REGISTRY</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-mono text-[#8ca395] uppercase mb-1">
                      Chronicle / Story Title
                    </label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. The Discovery of Astral Fluctuations"
                      className="w-full bg-[#080d0a] border border-[#1b3022] rounded-lg px-3 py-2 text-xs text-[#ded9cd] focus:outline-none focus:border-[#c5a059] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#8ca395] uppercase mb-1">
                      Scholar Name / Author
                    </label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Professor Nicholas Wood"
                      className="w-full bg-[#080d0a] border border-[#1b3022] rounded-lg px-3 py-2 text-xs text-[#ded9cd] focus:outline-none focus:border-[#c5a059] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#8ca395] uppercase mb-1">
                      Era / Year
                    </label>
                    <input
                      type="text"
                      value={newEra}
                      onChange={(e) => setNewEra(e.target.value)}
                      placeholder="e.g. Modern Era (2026)"
                      className="w-full bg-[#080d0a] border border-[#1b3022] rounded-lg px-3 py-2 text-xs text-[#ded9cd] focus:outline-none focus:border-[#c5a059] font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-mono text-[#8ca395] uppercase mb-1">
                      Narration & Theme Style
                    </label>
                    <select
                      value={newStyle}
                      onChange={(e: any) => setNewStyle(e.target.value)}
                      className="w-full bg-[#080d0a] border border-[#1b3022] rounded-lg px-3 py-2 text-xs text-[#ded9cd] focus:outline-none focus:border-[#c5a059] font-mono"
                    >
                      <option value="ancient">Ancient Folio (Low, wise sage pitch)</option>
                      <option value="victorian">Victorian Logbook (Elegant British tone)</option>
                      <option value="academic">Academic Journal (Standard analytical tone)</option>
                      <option value="cyberpunk">Cyberpunk Chronicle (Futuristic synthetic tone)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#8ca395] uppercase mb-1 text-emerald-400">
                      Masterwork / Published Karya (Separate with commas)
                    </label>
                    <input
                      type="text"
                      value={newWorks}
                      onChange={(e) => setNewWorks(e.target.value)}
                      placeholder="e.g. The Quantum Fluid Paradox, Principles of Cosmic Shift"
                      className="w-full bg-[#080d0a] border border-[#1b3022] rounded-lg px-3 py-2 text-xs text-[#ded9cd] focus:outline-none focus:border-[#c5a059] font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-[#8ca395] uppercase mb-1">
                    Story Content (Use Enter/New Line to separate paragraphs)
                  </label>
                  <textarea
                    required
                    rows={8}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Type the paragraphs of your historical discovery, journal entry, or memoir here..."
                    className="w-full bg-[#080d0a] border border-[#1b3022] rounded-lg px-3 py-2 text-xs text-[#ded9cd] focus:outline-none focus:border-[#c5a059] font-sans leading-relaxed"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#14231b]">
                <button
                  type="button"
                  onClick={() => setShowEditor(false)}
                  className="px-4 py-2 rounded-lg border border-[#1b3022] hover:bg-[#0c1410] text-[#8ca395] text-xs font-mono cursor-pointer transition-all"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#10b981] hover:bg-[#15d192] text-black font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>PUBLISH TO REGISTRY</span>
                </button>
              </div>
            </form>
          ) : (
            /* Immersive Reader Pane */
            <div className={`border rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 relative overflow-hidden h-full ${theme.bg} ${theme.cardGlow}`}>
              
              <div>
                {/* Stamp Info */}
                <div className="flex justify-between items-start gap-4 mb-6">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#c5a059]">
                    <Book className="w-4 h-4" />
                    <span>CHRONICLE MEMOIR PANE</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#8ca395] border border-[#1b3022] px-2.5 py-0.5 rounded bg-[#09110d]/90">
                    <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>{selectedTopic.era}</span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold font-display ${theme.titleColor}`}>
                    {selectedTopic.title}
                  </h2>
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-3.5 pt-1.5 border-t border-[#1b3022]/40">
                    <p className="text-[11px] font-mono text-[#6e8276] uppercase">
                      Author Scholar: <span className="text-[#c5a059] font-bold">{selectedTopic.author}</span>
                    </p>
                    
                    {/* Follow/Unfollow Button */}
                    <button
                      type="button"
                      onClick={() => toggleFollowScholar(selectedTopic.author)}
                      className={`px-3 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        followedScholars.includes(selectedTopic.author)
                          ? 'bg-emerald-950/70 border border-emerald-500/50 text-emerald-300'
                          : 'bg-[#09150f] border border-[#243f2d] hover:border-[#c5a059] text-[#c5a059]'
                      }`}
                    >
                      {followedScholars.includes(selectedTopic.author) ? (
                        <>
                          <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>FOLLOWING ✓</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>FOLLOW SCHOLAR</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Subtitle list of works */}
                {selectedTopic.works && selectedTopic.works.length > 0 && (
                  <div className="mt-4 p-3 rounded-lg bg-[#040605] border border-[#14231b] space-y-1">
                    <div className="text-[9px] font-mono text-[#5e7566] uppercase flex items-center gap-1">
                      <Award className="w-3 h-3 text-[#c5a059]" />
                      <span>Karya Utama / Notable Masterpieces:</span>
                    </div>
                    <ul className="list-disc list-inside text-[10.5px] font-mono text-[#a4b5ad] space-y-0.5 pl-1.5">
                      {selectedTopic.works.map((work, idx) => (
                        <li key={idx} className="truncate">{work}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Chronicle Content text lines */}
                <div className={`space-y-4 mt-6 ${theme.font} text-sm leading-relaxed text-[#c6cfc7] border-t border-[#1b3022]/40 pt-5`}>
                  {selectedTopic.content.map((para, idx) => {
                    const isCurrent = idx === currentParagraphIdx && isPlaying;
                    return (
                      <p
                        key={idx}
                        onClick={() => playParagraph(idx)}
                        className={`cursor-pointer p-3 rounded-xl transition-all duration-300 border-l-2 ${
                          isCurrent
                            ? 'bg-[#c5a059]/15 border-[#c5a059] text-[#f5eedf] font-medium scale-[1.01] shadow-md'
                            : 'hover:bg-[#121c16]/30 hover:text-white border-transparent'
                        }`}
                      >
                        {para}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* Orator customisation & Voice controls footer */}
              <div className="mt-10 pt-5 border-t border-[#1b3022]/40 space-y-4">
                
                {/* Audio Status */}
                <div className="flex items-center justify-between text-xs font-mono text-[#6e8276] bg-[#040805] p-3 rounded-lg border border-[#14231b]">
                  <div className="flex items-center gap-2">
                    <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-[#10b981] animate-pulse' : 'text-gray-500'}`} />
                    <span>
                      {isPlaying ? `Reading Paragraph ${currentParagraphIdx + 1} of ${selectedTopic.content.length}` : 'Narration Audio Idle'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Speed:</span>
                    <span className="text-[#c5a059] font-bold">{playbackRate.toFixed(2)}x</span>
                  </div>
                </div>

                {/* Control sliders & Play action button row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  
                  {/* Play, Reset, and Export Buttons */}
                  <div className="md:col-span-5 flex gap-2">
                    <button
                      onClick={handlePlayPause}
                      className={`flex-1 py-2.5 px-2.5 rounded-lg font-mono font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer shadow transition-all ${
                        isPlaying 
                          ? 'bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-800' 
                          : 'bg-[#c5a059] hover:bg-[#d9b671] text-black'
                      }`}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                    </button>

                    <button
                      onClick={handleReset}
                      className="py-2.5 px-2 rounded-lg bg-[#14231b] hover:bg-[#1c3327] border border-[#243f2d] text-[#ded9cd] font-mono text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-all"
                      title="Restart story to paragraph one"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>RESET</span>
                    </button>

                    <button
                      onClick={handleExportFolio}
                      type="button"
                      className="py-2.5 px-2 rounded-lg bg-[#0a1b24] hover:bg-[#112a35] border border-[#1b3e4d] text-[#7dd3fc] font-mono text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-all"
                      title="Export this scholar folio offline as a TXT file"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>EXPORT</span>
                    </button>
                  </div>

                  {/* Gender / Accents */}
                  <div className="md:col-span-4 bg-[#040805] p-1 rounded-lg border border-[#14231b] flex gap-1">
                    <button
                      onClick={() => { setVoiceGender('male'); stopSpeech(); }}
                      className={`flex-1 py-1.5 text-[10px] font-mono rounded transition-all ${
                        voiceGender === 'male'
                          ? 'bg-[#1c3326] text-[#10b981] font-bold border border-[#10b981]/30'
                          : 'text-[#6e8276] hover:text-[#ded9cd]'
                      }`}
                    >
                      UK Male
                    </button>
                    <button
                      onClick={() => { setVoiceGender('female'); stopSpeech(); }}
                      className={`flex-1 py-1.5 text-[10px] font-mono rounded transition-all ${
                        voiceGender === 'female'
                          ? 'bg-[#1c3326] text-[#10b981] font-bold border border-[#10b981]/30'
                          : 'text-[#6e8276] hover:text-[#ded9cd]'
                      }`}
                    >
                      UK Female
                    </button>
                  </div>

                  {/* Pacing Speed bar */}
                  <div className="md:col-span-3 flex flex-col justify-center">
                    <input
                      type="range"
                      min="0.6"
                      max="1.2"
                      step="0.05"
                      value={playbackRate}
                      onChange={(e) => {
                        setPlaybackRate(parseFloat(e.target.value));
                        if (isPlaying) playParagraph(currentParagraphIdx);
                      }}
                      className="w-full accent-[#c5a059] bg-[#0c140f] border border-[#1b3022] rounded h-1 cursor-pointer"
                    />
                    <div className="flex justify-between text-[8px] font-mono text-[#5e7566] mt-1">
                      <span>Slow</span>
                      <span>Fast</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

        </div>

      </div>

      {/* Community Comments & Reactions for Chronicles */}
      {!showEditor && (
        <div className="mt-8 border-t border-[#1b3022]/60 pt-6">
          <CommentSection
            targetId={selectedTopic.id}
            targetTitle={`Chronicle: "${selectedTopic.title}"`}
            currentUser={currentUser}
            onOpenAuthModal={onOpenAuthModal}
          />
        </div>
      )}

    </div>
  );
};
