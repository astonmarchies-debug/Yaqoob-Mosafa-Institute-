import React from 'react';
import { ClearanceLevel } from '../types/dossier';
import { X, Shield, Lock, Unlock, Check } from 'lucide-react';

interface ClearanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: ClearanceLevel;
  onSelectLevel: (level: ClearanceLevel) => void;
}

export const ClearanceModal: React.FC<ClearanceModalProps> = ({
  isOpen,
  onClose,
  currentLevel,
  onSelectLevel,
}) => {
  if (!isOpen) return null;

  const levels: {
    level: ClearanceLevel;
    title: string;
    role: string;
    description: string;
    color: string;
  }[] = [
    {
      level: 1,
      title: 'Tier 1 - Public Academic Explorer',
      role: 'Visiting Scholar & Seminar Guest',
      description: 'Access to general declassified research records and standard deterministic calibrations.',
      color: 'border-[#55695e]',
    },
    {
      level: 2,
      title: 'Tier 2 - Research Associate',
      role: 'Sector Laboratory Assistant',
      description: 'Access to localized acoustic testing and small-scale periodic attractor data.',
      color: 'border-blue-700/60',
    },
    {
      level: 3,
      title: 'Tier 3 - Specialist Investigator',
      role: 'Non-Linear Dynamics Analyst',
      description: 'Direct operational access to Lorenz strange attractor records and fractal crystal substrates.',
      color: 'border-emerald-600/70',
    },
    {
      level: 4,
      title: 'Tier 4 - Curatorial Council & Directorate',
      role: 'Entropy Governor',
      description: 'High clearance authorization for thermodynamic violation dossiers and Maxwell Demon systems.',
      color: 'border-amber-600/70',
    },
    {
      level: 5,
      title: 'Tier 5 - The Inner Conclave (Principal Architect)',
      role: 'Sovereign Invariant Custodian',
      description: 'Absolute unredacted access to Gödel-Yaqoob paradox records, abnormal models, and master files.',
      color: 'border-rose-600/80',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm no-print">
      <div className="w-full max-w-xl bg-[#080e0b] border border-[#23382c] rounded-xl shadow-2xl overflow-hidden font-sans">
        
        <div className="px-6 py-4 bg-[#0c1612] border-b border-[#1b2b22] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#c5a059]" />
            <h2 className="text-base font-display font-bold text-[#f5eedf]">
              Access Authorization & Clearance Tier Verification
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#7e8f85] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-3 max-h-[75vh] overflow-y-auto">
          <p className="text-xs text-[#95a69d] mb-3 font-mono">
            Select the clearance authorization level to verify. Higher clearance tiers automatically reveal 
            and declassify previously <code>[REDACTED]</code> anomaly coordinates.
          </p>

          {levels.map((item) => {
            const isSelected = currentLevel === item.level;

            return (
              <div
                key={item.level}
                onClick={() => {
                  onSelectLevel(item.level);
                  onClose();
                }}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#122119] border-[#c5a059] ring-1 ring-[#c5a059]'
                    : 'bg-[#060a08] border-[#18261e] hover:border-[#2f4639]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#f5eedf] font-mono">
                      {item.title}
                    </span>
                    {isSelected && (
                      <span className="px-1.5 py-0.2 rounded bg-[#1c3829] text-emerald-400 text-[9px] font-mono font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  {isSelected ? (
                    <Check className="w-4 h-4 text-[#c5a059]" />
                  ) : (
                    <Unlock className="w-3.5 h-3.5 text-[#596d62]" />
                  )}
                </div>

                <div className="text-[11px] font-mono text-[#c5a059] mb-1">
                  {item.role}
                </div>

                <p className="text-xs text-[#82968b] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="px-6 py-3 bg-[#0a110d] border-t border-[#1b2b22] flex items-center justify-between text-xs text-[#5e7568] font-mono">
          <span>YMI Sector 04-A Security Matrix</span>
          <button onClick={onClose} className="hover:text-white">
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
