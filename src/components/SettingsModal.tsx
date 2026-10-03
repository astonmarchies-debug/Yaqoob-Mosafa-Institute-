import React, { useState } from 'react';
import { 
  X, Globe, Shield, FileText, Check, 
  Trash2, ExternalLink, ShieldCheck, Lock
} from 'lucide-react';
import { SupportedLanguage, setStoredLanguage, COMPLETE_TRANSLATIONS } from '../services/i18n';
import { ASSET_IMAGES } from '../assets/images';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  initialTab?: 'language' | 'privacy' | 'terms' | 'system';
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onLanguageChange,
  initialTab = 'language',
}) => {
  if (!isOpen) return null;

  const validLang: SupportedLanguage = currentLanguage === 'ar' ? 'ar' : 'en';
  const t = COMPLETE_TRANSLATIONS[validLang];
  const isRtl = validLang === 'ar';

  const [activeTab, setActiveTab] = useState<'language' | 'privacy' | 'terms' | 'system'>(initialTab);
  const [saveNotice, setSaveNotice] = useState('');

  const handleSelectLanguage = (lang: SupportedLanguage) => {
    setStoredLanguage(lang);
    onLanguageChange(lang);
    setSaveNotice(
      lang === 'en'
        ? 'Global Language (English) applied across the entire repository.'
        : 'تم تحويل الواجهة بالكامل إلى اللغة العربية.'
    );
    setTimeout(() => setSaveNotice(''), 2000);
  };

  const handleClearCache = () => {
    const confirmPrompt = validLang === 'en'
      ? 'Clear local session cache and restore initial settings?'
      : 'هل تريد مسح ذاكرة التخزين المؤقت واستعادة الإعدادات الأولية؟';

    if (confirm(confirmPrompt)) {
      localStorage.removeItem('ymi_active_researcher_v1');
      localStorage.removeItem('ymi_language_preference');
      setSaveNotice('Cache cleared.');
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  // Localized texts for policy and terms
  const localizedContent = {
    en: {
      langHeader: 'Interface Language Selector (Global / Arabic)',
      langSubtitle: 'Switching languages instantly translates the entire repository interface, archives, terminals, and training modules.',
      privacyTag: 'DATA PROTOCOL-04 // PRIVACY POLICY',
      privacyTitle: 'Epistemic Data Protection & Privacy Policy',
      privacySubtitle: 'Applies to all researchers, authenticated Google/Microsoft identities, and curators.',
      p1Title: '1. Identity Collection & SSO Authentication',
      p1Body: 'When signing in via Google or Microsoft, the repository only processes display names and verified email addresses for authorization credentials. We never sell, transfer, or exploit user personal data.',
      p2Title: '2. Client-Side Memory & Local Persistence',
      p2Body: 'Your draft sandbox documents, custom files, and language preferences are stored locally in your browser storage. You retain total control to clear this memory at any time.',
      p3Title: '3. Omega-Class Confidentiality Clause',
      p3Body: 'Abnormal scientific models are hermetically encrypted and restricted exclusively to the Principal Architect (Aston Marchies). Unauthorized code tampering is logged internally.',
      termsTag: 'CURATORIAL STATUTES // EST. 1974',
      termsTitle: 'Terms of Access & Epistemic Publication Ethics',
      termsSubtitle: 'Scientific collaboration standards to maintain non-linear anomaly integrity.',
      t1: '1. Observation Integrity: Every dossier submitted must include verifiable phenomena descriptions and sensible containment protocols.',
      t2: '2. Peer Review Mechanism: Corrections submitted undergo curation queues; the Principal Architect retains sovereign veto.',
      t3: '3. Epistemic Open Access: Declassified records may be cited freely with proper credit to the Yaqoob Mosafa Institute.',
      sysTitle: 'System Diagnostics & Storage Management',
      sysSub: 'Repository runtime build specifications and client cache controls.',
      sysCore: 'Core Repository Version:',
      sysSector: 'Archival Sector:',
      sysCert: 'Certification:',
      sysActiveLang: 'Active Interface Language:',
      sysClearTitle: 'Clear Cache & Preferences',
      sysClearDesc: 'Purge language settings, active logins, and reset to default initialization.',
      sysClearBtn: 'Clear Memory Cache',
    },
    ar: {
      langHeader: 'محدد لغة الواجهة الرئيسية (عالمي / عربي)',
      langSubtitle: 'يؤدي تغيير اللغة إلى تحويل فوري لكافة عناصر المستودع والأرشيف وموجه الأوامر والوحدات التدريبية.',
      privacyTag: 'بروتوكول البيانات 04 // سياسة الخصوصية',
      privacyTitle: 'سياسة الخصوصية وحماية البيانات المعرفية',
      privacySubtitle: 'تسري على كافة الباحثين وحسابات Google/Microsoft المعتمدة.',
      p1Title: '1. جمع الهوية والمصادقة الموحدة',
      p1Body: 'عند تسجيل الدخول، يعالج المستودع الاسم والبريد الإلكتروني فقط لأغراض التصريح. لا نقوم ببيع أو نقل بياناتك إطلاقاً.',
      p2Title: '2. الحفظ المحلي للذاكرة',
      p2Body: 'تُحفظ مسودات الأبحاث وتفضيلات اللغة محلياً داخل متصفحك، وتملك السيطرة الكاملة على مسحها في أي وقت.',
      p3Title: '3. بند سرية وثائق أوميغا',
      p3Body: 'النماذج العلمية غير الطبيعية محمية بتشفير صارم ومخصصة حصرياً للمهندس المعماري الرئيسي (أستون مارشيز).',
      termsTag: 'المواثيق التأسيسية // 1974',
      termsTitle: 'شروط الوصول وأخلاقيات النشر المعرفي',
      termsSubtitle: 'معايير التعاون العلمي للحفاظ على سلامة أبحاث الشواذ غير الخطية.',
      t1: '1. أمانة الرصد: يجب أن تتضمن كل وثيقة توصيفاً دقيقاً وبروتوكولات احتواء معقولة.',
      t2: '2. مراجعة الأقران: تخضع التعديلات لموافقة هيئة الأمناء مع حق النقض للمهندس المعماري.',
      t3: '3. الوصول المفتوح: يمكن الاستشهاد بالوثائق بعد رفع السرية مع الإشارة لمعهد يعقوب مصافا.',
      sysTitle: 'تشخيص النظام وإدارة الذاكرة',
      sysSub: 'مواصفات إصدار المستودع وأدوات التحكم في التخزين المحلي.',
      sysCore: 'إصدار نواة المستودع:',
      sysSector: 'قطاع الأرشيف:',
      sysCert: 'الاعتماد:',
      sysActiveLang: 'اللغة النشطة حالياً:',
      sysClearTitle: 'مسح التخزين المؤقت والتفضيلات',
      sysClearDesc: 'حذف تفضيلات اللغة والجلسات النشطة واستعادة الإعدادات الأصلية.',
      sysClearBtn: 'مسح الذاكرة',
    },
  }[validLang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md no-print font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-2xl bg-[#080d0a] border border-[#23382c] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-5 py-4 bg-[#0d1612] border-b border-[#1b2b22] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={ASSET_IMAGES.insignia}
              alt="Segel Institut"
              className="w-7 h-7 rounded-full border border-[#c5a059]/60 shadow-sm"
            />
            <div>
              <h2 className="text-sm sm:text-base font-display font-bold text-[#f5eedf]">
                {t.settingsModalTitle}
              </h2>
              <div className="text-[10px] font-mono text-[#7a8c82]">
                {t.settingsModalSubtitle}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-[#7e8f85] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice */}
        {saveNotice && (
          <div className="bg-emerald-950/80 border-b border-emerald-800 text-emerald-300 px-5 py-2 text-xs font-mono flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{saveNotice}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-[#18261e] bg-[#060a08] px-4 overflow-x-auto no-scrollbar font-mono text-xs">
          <button
            onClick={() => setActiveTab('language')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-colors shrink-0 ${
              activeTab === 'language'
                ? 'border-[#c5a059] text-[#f5eedf] font-bold bg-[#0c1611]'
                : 'border-transparent text-[#7e9086] hover:text-[#cdd8d1]'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{t.tabLanguage}</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-colors shrink-0 ${
              activeTab === 'privacy'
                ? 'border-[#c5a059] text-[#f5eedf] font-bold bg-[#0c1611]'
                : 'border-transparent text-[#7e9086] hover:text-[#cdd8d1]'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.tabPrivacy}</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-colors shrink-0 ${
              activeTab === 'terms'
                ? 'border-[#c5a059] text-[#f5eedf] font-bold bg-[#0c1611]'
                : 'border-transparent text-[#7e9086] hover:text-[#cdd8d1]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#d4b36a]" />
            <span>{t.tabTerms}</span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-colors shrink-0 ${
              activeTab === 'system'
                ? 'border-[#c5a059] text-[#f5eedf] font-bold bg-[#0c1611]'
                : 'border-transparent text-[#7e9086] hover:text-[#cdd8d1]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>{t.tabSystem}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 font-sans text-xs text-[#cdd8d1]">
          
          {/* ================= TAB 1: BAHASA & LOKALISASI (GLOBAL / ARABIC) ================= */}
          {activeTab === 'language' && (
            <div className="space-y-4">
              <div className="border-b border-[#18261e] pb-3">
                <h3 className="text-sm font-bold text-[#f5eedf] font-display">
                  {localizedContent.langHeader}
                </h3>
                <p className="text-xs text-[#7e9086] mt-0.5">
                  {localizedContent.langSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* 1. Global English (EN) */}
                <div
                  onClick={() => handleSelectLanguage('en')}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    validLang === 'en'
                      ? 'bg-[#122119] border-[#c5a059] text-[#f5eedf] ring-1 ring-[#c5a059]'
                      : 'bg-[#060a08] border-[#18261e] hover:border-[#2f4639]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-[#c5a059]">Global English (EN)</span>
                    {validLang === 'en' && (
                      <Check className="w-4 h-4 text-[#c5a059]" />
                    )}
                  </div>
                  <div className="text-[10px] font-mono text-[#a4e2ba] mb-1">
                    [Primary International Standard]
                  </div>
                  <p className="text-[11px] text-[#869b8f] leading-relaxed">
                    Full international scientific terminology across all research dossiers, archives, and training modules.
                  </p>
                </div>

                {/* 2. Bahasa Arab (العربية) */}
                <div
                  onClick={() => handleSelectLanguage('ar')}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    validLang === 'ar'
                      ? 'bg-[#122119] border-[#c5a059] text-[#f5eedf] ring-1 ring-[#c5a059]'
                      : 'bg-[#060a08] border-[#18261e] hover:border-[#2f4639]'
                  }`}
                  dir="rtl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-[#e5dfd3]">اللغة العربية (AR)</span>
                    {validLang === 'ar' && (
                      <Check className="w-4 h-4 text-[#c5a059]" />
                    )}
                  </div>
                  <div className="text-[10px] font-mono text-[#a4e2ba] mb-1">
                    [لغة الميثاق التأسيسي والأرشيف]
                  </div>
                  <p className="text-[11px] text-[#869b8f] leading-relaxed">
                    الترجمة الكاملة لكافة الأقسام والميثاق التأسيسي مع دعم كامل لتخطيط الكتابة من اليمين إلى اليسار.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: PRIVACY POLICY ================= */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="border-b border-[#18261e] pb-3">
                <div className="text-[10px] font-mono text-emerald-400 font-bold mb-0.5">
                  {localizedContent.privacyTag}
                </div>
                <h3 className="text-sm font-bold text-[#f5eedf] font-display">
                  {localizedContent.privacyTitle}
                </h3>
                <p className="text-xs text-[#7e9086] mt-0.5">
                  {localizedContent.privacySubtitle}
                </p>
              </div>

              <div className="space-y-3 font-mono text-[11px] text-[#9eb1a6]">
                <div className="p-3.5 rounded-lg bg-[#0b1410] border border-[#16271e]">
                  <h4 className="font-bold text-[#e1dbcd] text-xs mb-1">
                    {localizedContent.p1Title}
                  </h4>
                  <p className="leading-relaxed">
                    {localizedContent.p1Body}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#0b1410] border border-[#16271e]">
                  <h4 className="font-bold text-[#e1dbcd] text-xs mb-1">
                    {localizedContent.p2Title}
                  </h4>
                  <p className="leading-relaxed">
                    {localizedContent.p2Body}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#0b1410] border border-[#16271e]">
                  <h4 className="font-bold text-[#e1dbcd] text-xs mb-1">
                    {localizedContent.p3Title}
                  </h4>
                  <p className="leading-relaxed">
                    {localizedContent.p3Body}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: TERMS OF ACCESS ================= */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div className="border-b border-[#18261e] pb-3">
                <div className="text-[10px] font-mono text-[#c5a059] font-bold mb-0.5">
                  {localizedContent.termsTag}
                </div>
                <h3 className="text-sm font-bold text-[#f5eedf] font-display">
                  {localizedContent.termsTitle}
                </h3>
                <p className="text-xs text-[#7e9086] mt-0.5">
                  {localizedContent.termsSubtitle}
                </p>
              </div>

              <div className="space-y-2.5 font-mono text-[11px] text-[#9eb1a6]">
                <div className="p-3 rounded-lg bg-[#0b1410] border border-[#16271e]">
                  <p className="leading-relaxed">{localizedContent.t1}</p>
                </div>
                <div className="p-3 rounded-lg bg-[#0b1410] border border-[#16271e]">
                  <p className="leading-relaxed">{localizedContent.t2}</p>
                </div>
                <div className="p-3 rounded-lg bg-[#0b1410] border border-[#16271e]">
                  <p className="leading-relaxed">{localizedContent.t3}</p>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 4: SYSTEM & DIAGNOSTICS ================= */}
          {activeTab === 'system' && (
            <div className="space-y-4">
              <div className="border-b border-[#18261e] pb-3">
                <h3 className="text-sm font-bold text-[#f5eedf] font-display">
                  {localizedContent.sysTitle}
                </h3>
                <p className="text-xs text-[#7e9086] mt-0.5">
                  {localizedContent.sysSub}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-[11px]">
                <div className="p-3 rounded-lg bg-[#0b1410] border border-[#16271e]">
                  <div className="text-[#647c6f]">{localizedContent.sysCore}</div>
                  <div className="font-bold text-[#e1dbcd] text-xs mt-0.5">v3.4.0-Global-Arabic</div>
                </div>

                <div className="p-3 rounded-lg bg-[#0b1410] border border-[#16271e]">
                  <div className="text-[#647c6f]">{localizedContent.sysSector}</div>
                  <div className="font-bold text-[#e1dbcd] text-xs mt-0.5">Sector 04-A Primary Node</div>
                </div>

                <div className="p-3 rounded-lg bg-[#0b1410] border border-[#16271e]">
                  <div className="text-[#647c6f]">{localizedContent.sysActiveLang}</div>
                  <div className="font-bold text-[#c5a059] text-xs mt-0.5 uppercase">{validLang}</div>
                </div>

                <div className="p-3 rounded-lg bg-[#0b1410] border border-[#16271e]">
                  <div className="text-[#647c6f]">{localizedContent.sysCert}</div>
                  <div className="font-bold text-emerald-400 text-xs mt-0.5">SHA-256 Validated</div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#18261e]">
                <div className="p-3 rounded-lg bg-[#140b0b] border border-rose-950/80 flex items-center justify-between gap-3">
                  <div>
                    <h5 className="font-bold text-rose-300 text-xs">{localizedContent.sysClearTitle}</h5>
                    <p className="text-[10px] text-[#8c7777] mt-0.5">{localizedContent.sysClearDesc}</p>
                  </div>
                  <button
                    onClick={handleClearCache}
                    className="px-3 py-1.5 rounded bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-200 font-mono text-[11px] transition-colors shrink-0"
                  >
                    {localizedContent.sysClearBtn}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#0a110d] border-t border-[#1b2b22] flex items-center justify-between">
          <div className="text-[10px] font-mono text-[#5b7366]">
            Yaqoob Mosafa Institute · Global & Arabic Multi-Regional Engine
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#182a20] hover:bg-[#20362a] border border-[#2d4737] text-xs font-mono text-[#f0ebe0] transition-colors"
          >
            {t.closeBtn}
          </button>
        </div>

      </div>
    </div>
  );
};
