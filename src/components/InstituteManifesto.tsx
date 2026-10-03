import React from 'react';
import { ASSET_IMAGES } from '../assets/images';
import { Shield, BookOpen, Atom, Compass, KeyRound, Cpu, Layers } from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../services/i18n';

interface InstituteManifestoProps {
  currentLanguage?: SupportedLanguage;
}

export const InstituteManifesto: React.FC<InstituteManifestoProps> = ({ currentLanguage = 'en' }) => {
  const t = TRANSLATIONS[currentLanguage];
  const isRtl = currentLanguage === 'ar';

  const manifestos = ({
    en: {
      sealTitle: 'Hermeneutics of the Official Seal',
      sealBody: 'The medallion seal of the Yaqoob Mosafa Institute represents the formal synthesis between classical fractal polygon geometry and the non-commutative single invariant axiom.',
      point1: 'Golden Upright Pointer: The Singular Invariant — the primordial origin from which all universal bifurcations emerge.',
      point2: '16-Point Arabesque Star: Geometric projection of Poincaré phase space, symbolizing limit cycles that preserve cosmic balance.',
      point3: 'Emerald & Gold Palette: Timeless epistemic transmission from classical algebra observatories to modern non-linear physics.',
    },
    id: {
      sealTitle: 'Hermeneutika Segel Resmi',
      sealBody: 'Segel medali Institut Yaqoob Mosafa mewakili sintesis formal antara geometri poligon fraktal klasik dan aksioma invarian tunggal non-komutatif.',
      point1: 'Penunjuk Emas Tegak: Invarian Tunggal — asal usul primordial dari mana semua bifurkasi kosmik muncul.',
      point2: 'Bintang Arabesque 16 Titik: Proyeksi geometris dari ruang fasa Poincaré, melambangkan siklus batas yang menjaga keseimbangan alam semesta.',
      point3: 'Palet Emerald & Emas: Transmisi epistemik abadi dari observatorium aljabar klasik ke fisika non-linear modern.',
    },
    ar: {
      sealTitle: 'التأويل الرمزي لشعار المعهد الرسمي',
      sealBody: 'صُمم الشعار استناداً إلى الجمع بين الهندسة الكسورية الإسلامية الكلاسيكية ومفهوم البديهية المفردة غير التبادلية.',
      point1: 'السبابة الذهبية المفردة: رمز المبدأ الثابت البدائي الذي تتفرع منه كافة مسارات الكون.',
      point2: 'نجمة الأرابيسك ذات الـ16 نقطة: إسقاط هندسي لفضاء طور بوانكاريه يمثل دورات الحدود الحافظة للاتزان.',
      point3: 'الزمرد والذهب الخالص: ديمومة انتقال المعرفة العلمية من مراصد مراغة إلى فيزياء الديناميكا المعاصرة.',
    },
  }[currentLanguage] || {
    sealTitle: 'Hermeneutics of the Official Seal',
    sealBody: 'The medallion seal of the Yaqoob Mosafa Institute represents the formal synthesis between classical fractal polygon geometry and the non-commutative single invariant axiom.',
    point1: 'Golden Upright Pointer: The Singular Invariant — the primordial origin from which all universal bifurcations emerge.',
    point2: '16-Point Arabesque Star: Geometric projection of Poincaré phase space, symbolizing limit cycles that preserve cosmic balance.',
    point3: 'Emerald & Gold Palette: Timeless epistemic transmission from classical algebra observatories to modern non-linear physics.',
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="text-xs uppercase tracking-widest font-mono text-[#c5a059] font-semibold mb-2">
          {t.manifestoTag}
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-[#f5eedf] leading-tight">
          {t.manifestoTitle}
        </h1>
        <p className="mt-3 text-base sm:text-lg font-editorial italic text-[#9cb0a5]">
          {t.manifestoSubtitle}
        </p>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto mt-6" />
      </div>

      {/* Insignia & Symbolism Breakdown Card */}
      <div className="mb-14 p-6 sm:p-8 bg-[#09110d] border border-[#1d3025] rounded-xl flex flex-col md:flex-row items-center gap-8 shadow-2xl">
        <div className="shrink-0 relative">
          <img
            src={ASSET_IMAGES.insignia}
            alt="Yaqoob Mosafa Institute Official Seal"
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover border-2 border-[#c5a059]/60 shadow-2xl"
          />
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-[#b2c2b8] leading-relaxed">
          <h2 className="text-lg font-display font-bold text-[#e8dfcf]">
            {manifestos.sealTitle}
          </h2>
          <p>
            {manifestos.sealBody}
          </p>
          <ul className="space-y-2 font-sans">
            <li className="flex items-start gap-2">
              <span className="text-[#c5a059] font-mono font-bold">1.</span>
              <span>{manifestos.point1}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c5a059] font-mono font-bold">2.</span>
              <span>{manifestos.point2}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c5a059] font-mono font-bold">3.</span>
              <span>{manifestos.point3}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3 Core Articles of the Institute */}
      <div className="space-y-8">
        <div className="p-6 sm:p-8 bg-[#080e0b] border border-[#172b20] rounded-xl relative overflow-hidden group hover:border-[#c5a059]/40 transition-colors">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#c5a059]" />
          <h3 className="text-xl font-display font-bold text-[#f5eedf] mb-3">
            {t.manifestoArticle1Title}
          </h3>
          <p className="text-sm text-[#9db1a5] leading-relaxed font-editorial italic text-base">
            {t.manifestoArticle1Body}
          </p>
        </div>

        <div className="p-6 sm:p-8 bg-[#080e0b] border border-[#172b20] rounded-xl relative overflow-hidden group hover:border-[#c5a059]/40 transition-colors">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#c5a059]" />
          <h3 className="text-xl font-display font-bold text-[#f5eedf] mb-3">
            {t.manifestoArticle2Title}
          </h3>
          <p className="text-sm text-[#9db1a5] leading-relaxed font-editorial italic text-base">
            {t.manifestoArticle2Body}
          </p>
        </div>

        <div className="p-6 sm:p-8 bg-[#080e0b] border border-[#172b20] rounded-xl relative overflow-hidden group hover:border-[#c5a059]/40 transition-colors">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#c5a059]" />
          <h3 className="text-xl font-display font-bold text-[#f5eedf] mb-3">
            {t.manifestoArticle3Title}
          </h3>
          <p className="text-sm text-[#9db1a5] leading-relaxed font-editorial italic text-base">
            {t.manifestoArticle3Body}
          </p>
        </div>
      </div>

    </div>
  );
};
