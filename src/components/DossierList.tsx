import React, { useState, useMemo } from 'react';
import { Dossier, ClearanceLevel, ResearchDivision } from '../types/dossier';
import { Search, Lock, Unlock, FileText, ChevronRight, AlertCircle, RefreshCw, Plus } from 'lucide-react';
import { SupportedLanguage, COMPLETE_TRANSLATIONS } from '../services/i18n';

interface DossierListProps {
  dossiers: Dossier[];
  userClearance: ClearanceLevel;
  onSelectDossier: (dossier: Dossier) => void;
  onResetArchive: () => void;
  onOpenCreate: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  currentLanguage: SupportedLanguage;
}

export const DossierList: React.FC<DossierListProps> = ({
  dossiers,
  userClearance,
  onSelectDossier,
  onResetArchive,
  onOpenCreate,
  searchQuery,
  setSearchQuery,
  currentLanguage,
}) => {
  const t = COMPLETE_TRANSLATIONS[currentLanguage];
  const isRtl = currentLanguage === 'ar';

  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const classes: { id: string; label: string }[] = [
    { id: 'all', label: t.archiveAllClasses },
    { id: 'Chaotic', label: currentLanguage === 'ar' ? 'فوضوي' : 'Chaotic' },
    { id: 'Hyperchaotic', label: currentLanguage === 'ar' ? 'شديد الفوضوية' : 'Hyperchaotic' },
    { id: 'Hyper-Entropy', label: currentLanguage === 'ar' ? 'عالي الإنتروبيا' : 'Hyper-Entropy' },
    { id: 'Periodic', label: currentLanguage === 'ar' ? 'دوري' : 'Periodic' },
    { id: 'Axiomatic', label: currentLanguage === 'ar' ? 'بديهي' : 'Axiomatic' },
    { id: 'Metastable', label: currentLanguage === 'ar' ? 'شبه مستقر' : 'Metastable' },
    { id: 'Dispersive', label: currentLanguage === 'ar' ? 'تشتتي' : 'Dispersive' },
    { id: 'Order', label: currentLanguage === 'ar' ? 'نظامي' : 'Order' },
  ];

  const divisions: ResearchDivision[] = [
    'Division of Non-Linear Dynamics',
    'Division of Axcelnetic Systems',
    'Division of Higher Topologies',
    'Division of Temporal Mechanics',
    'Department of Stochastic Quantum',
    'Bureau of Fractal Topology',
    'Laboratory of Entropic Hermeneutics',
    'Council of Curatorial Axioms',
  ];

  const filteredDossiers = useMemo(() => {
    return dossiers.filter((d) => {
      const matchSearch =
        searchQuery.trim() === '' ||
        d.protocolNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        d.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchClass = selectedClass === 'all' || 
        d.attractorClass.toLowerCase() === selectedClass.toLowerCase() ||
        (selectedClass === 'Chaotic' && (d.attractorClass === 'Kaotik' || d.attractorClass === 'Chaotic')) ||
        (selectedClass === 'Order' && (d.attractorClass === 'Ordo' || d.attractorClass === 'Order')) ||
        (selectedClass === 'Periodic' && (d.attractorClass === 'Periodik' || d.attractorClass === 'Periodic'));

      const matchDivision = selectedDivision === 'all' || d.division === selectedDivision;
      const matchStatus = statusFilter === 'all' || d.status === statusFilter;

      return matchSearch && matchClass && matchDivision && matchStatus;
    });
  }, [dossiers, searchQuery, selectedClass, selectedDivision, statusFilter]);

  return (
    <div className="w-full space-y-6 font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Archive Header & Filter Controls */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#1c2d24]">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-[#c5a059] font-bold">
              {t.archiveHeaderTag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#f0ebe0] mt-1">
              {t.archiveMainTitle}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#819289]">
              {t.archiveShowing} {filteredDossiers.length} / {dossiers.length}
            </span>
            <button
              onClick={onResetArchive}
              className="text-xs font-mono text-[#8c9c93] hover:text-[#c5a059] transition-colors flex items-center gap-1.5 p-1.5 rounded hover:bg-[#121d17]"
              title="Reset Database"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.archiveResetBtn}</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 font-mono text-xs">
          <div className="relative flex-1 w-full">
            <Search className={`w-4 h-4 absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-[#687a71]`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={`w-full bg-[#080e0b] border border-[#1b2b23] rounded-md ${isRtl ? 'pr-9 pl-4' : 'pl-9 pr-4'} py-2 text-[#e2ded6] placeholder-[#4f6156] focus:outline-none focus:border-[#c5a059]`}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              aria-label="Filter Attractor Class"
              className="bg-[#080e0b] border border-[#1b2b23] rounded-md px-3 py-2 text-[#cbd6cf] focus:outline-none focus:border-[#c5a059] flex-1 sm:flex-none"
            >
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Dossiers */}
      {filteredDossiers.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-[#1c2d24] rounded-lg p-8">
          <AlertCircle className="w-10 h-10 text-[#7a8a81] mx-auto mb-3" />
          <h3 className="text-base font-display font-medium text-[#e2ded6]">
            {t.archiveNoRecords}
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDossiers.map((dossier) => {
            const isLocked = dossier.clearanceLevel > userClearance;
            return (
              <div
                key={dossier.id}
                onClick={() => onSelectDossier(dossier)}
                className="group relative bg-[#080e0b] border border-[#1c2d24] hover:border-[#c5a059] rounded-lg p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-black/50 overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-mono mb-2">
                    <span className="text-[#c5a059] font-bold tracking-wider">
                      {dossier.protocolNumber}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#101b15] border border-[#1d3025] text-[#93a79d]">
                      Level {dossier.clearanceLevel}
                    </span>
                  </div>

                  <h3 className="text-base font-display font-bold text-[#f5eedf] group-hover:text-[#e8cf8f] transition-colors leading-snug">
                    {dossier.title}
                  </h3>
                  <p className="text-xs text-[#82968b] mt-1 line-clamp-2 leading-relaxed">
                    {dossier.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#132018] flex items-center justify-between text-[11px] font-mono text-[#6e8076]">
                  <span className="truncate max-w-[180px]">{dossier.leadResearcher}</span>
                  <div className="flex items-center gap-1 text-[#c5a059] group-hover:translate-x-0.5 transition-transform">
                    {isLocked ? <Lock className="w-3.5 h-3.5 text-amber-500" /> : <Unlock className="w-3.5 h-3.5 text-emerald-400" />}
                    <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
