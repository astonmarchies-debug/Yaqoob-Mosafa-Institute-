import React from 'react';
import { Award, BookOpen, Orbit, Star, Sparkles } from 'lucide-react';

interface Scholar {
  name: string;
  title: string;
  era: string;
  bio: string;
  achievement: string;
  image: string;
  icon: React.ComponentType<any>;
}

const SCHOLARS: Scholar[] = [
  {
    name: "Ibn Hamza",
    title: "Al-Mu'addil (The Balancer of Chaos)",
    era: "14th Century (Baghdad / Aleppo)",
    bio: "Pioneered the early geometric modelling of non-linear state spaces in the Islamic Golden Age. Through his celestial manuscripts, he designed recursive calculations to balance dynamic gravitational anomalies, layting the groundwork for chaotic attractors.",
    achievement: "The Al-Mizan Geometry (Foundational Lorenz Attractor Principle)",
    image: "/src/assets/images/ibn_hamza_portrait_1791000050606.jpg",
    icon: Orbit
  },
  {
    name: "Dr. Jamestock",
    title: "Regius Professor of Non-Linear Physics",
    era: "Victorian Era (1842 - 1911)",
    bio: "A British mathematical physicist who dedicated his life to mapping planetary perturbations and thermal currents. His work unified classical Newtonian mechanics with early quantum chaos, characterised by extreme intellectual rigour.",
    achievement: "Jamestock's Cosmic Regression Constant (452Hz Harmonic Vector)",
    image: "/src/assets/images/dr_jamestock_portrait_1791000068217.jpg",
    icon: Star
  },
  {
    name: "Franz Hamp",
    title: "Dean of Psycho-Hermeneutics",
    era: "Early 20th Century (Vienna / Jena)",
    bio: "Coined the term 'Axcelnetics' to describe how human cognitive waves align with the periodic oscillation of cosmic star systems. His profound experiments in Vienna proved the link between neural state spaces and deep astrophysical geometry.",
    achievement: "The Cognitive Hermeneutics Matrix (Axcelnetics Core Paradigm)",
    image: "/src/assets/images/franz_hamp_portrait_1791000082365.jpg",
    icon: BookOpen
  },
  {
    name: "Abdul Khan",
    title: "Grand Imperial Astronomer",
    era: "Mughal Empire (17th Century)",
    bio: "Built massive brass astrolabes to chart stellar movements across the forbidden Theta Quadrant. His highly detailed star catalogues catalogued gravitational pockets that classical astronomers of his time dismissed as mere dust.",
    achievement: "The Khan Stellar Catalogue (Anomalous Gravity Trajectories)",
    image: "/src/assets/images/abdul_khan_portrait_1791000096440.jpg",
    icon: Sparkles
  },
  {
    name: "Süleiman Al-Tamrin",
    title: "Grand Alchemist & Natural Philosopher",
    era: "Ottoman Empire (18th Century)",
    bio: "An alchemist who discovered the molecular vibration linking organic matter to the cosmic background resonance. His alchemical equations established the initial spiritual and material synthesis of the Yaqoob Mosafa Institute.",
    achievement: "Al-Kimiya Al-Falak Resonance Laws (Macro-Micro Cosmic Union)",
    image: "/src/assets/images/suleiman_altamrin_portrait_1791000118162.jpg",
    icon: Award
  }
];

interface ScholarsGalleryProps {
  currentLanguage: 'en' | 'ar';
}

export const ScholarsGallery: React.FC<ScholarsGalleryProps> = ({ currentLanguage }) => {
  const isRtl = currentLanguage === 'ar';

  return (
    <section className="bg-[#050906] border border-[#1b3022] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#15251a_1px,transparent_1px),linear-gradient(to_bottom,#15251a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Header section */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#1b3022] pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#c5a059] mb-1">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>ACADEMIC HONOUR ARCHIVE</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-display font-bold text-[#f5eedf]">
            {isRtl ? 'العلماء المؤسسون ومجلس الشيوخ الأكاديمي' : 'Founders & Academic Senate Leaders'}
          </h2>
          <p className="text-xs sm:text-sm text-[#8ca395] mt-1">
            {isRtl ? 'أبرز المفكرين والعلماء الذين شكلوا الرؤية المعرفية لمعهد يعقوب مصطفى.' : 'Explore the biographies, stellar identities, and histories of the legendary pioneers who constructed the Yaqoob Mosafa Institute.'}
          </p>
        </div>
        <div className="px-3 py-1.5 rounded bg-[#09150f] border border-[#243f2d] text-[10px] font-mono text-[#10b981] uppercase tracking-wider shrink-0 shadow-inner">
          UK Global English Edition
        </div>
      </div>

      {/* Grid of Scholars */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {SCHOLARS.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div 
              key={idx} 
              className="group bg-[#08100b] border border-[#1b3022] rounded-xl overflow-hidden hover:border-[#c5a059] transition-all duration-300 hover:shadow-[0_0_20px_rgba(197,160,89,0.15)] flex flex-col h-full"
            >
              {/* Scholar Image */}
              <div className="relative aspect-square w-full overflow-hidden border-b border-[#1b3022]">
                <img 
                  src={s.image} 
                  alt={s.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80";
                  }}
                />
                {/* Vintage Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08100b] via-transparent to-transparent opacity-80" />
                <div className="absolute top-2 right-2 p-1.5 rounded bg-[#09150f]/90 border border-[#c5a059]/40 text-[#c5a059] shadow-md z-10">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Scholar Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-[#f5eedf] text-base group-hover:text-[#c5a059] transition-colors">
                    {s.name}
                  </h3>
                  <div className="text-[10px] font-mono text-[#a29272] uppercase font-bold mt-0.5">
                    {s.title}
                  </div>
                  <div className="text-[9px] font-mono text-[#5e7566] mt-1">
                    Historical Era: {s.era}
                  </div>
                  <p className="text-xs text-[#8da194] mt-2 leading-relaxed">
                    {s.bio}
                  </p>
                </div>

                {/* Main Achievement */}
                <div className="mt-4 pt-3 border-t border-[#1b3022]/60">
                  <div className="text-[9px] font-mono text-[#5e7566] uppercase">Key Scientific Breakthrough:</div>
                  <div className="text-[10px] font-bold text-[#c5a059] mt-0.5 leading-snug">
                    {s.achievement}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
