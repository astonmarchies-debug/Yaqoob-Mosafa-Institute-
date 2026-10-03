import React, { useState } from 'react';
import { Crown, Key, Lock, ShieldAlert, Sparkles, Terminal, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { ResearcherUser } from '../types/dossier';

interface DeveloperAbnormalModelProps {
  currentUser: ResearcherUser;
}

export const DeveloperAbnormalModel: React.FC<DeveloperAbnormalModelProps> = ({ currentUser }) => {
  // CRITICAL REQUIREMENT: Only the developer (Aston Marchies) can view this abnormal model
  if (!currentUser.isDeveloper) {
    return null;
  }

  const [isCipherDecoded, setIsCipherDecoded] = useState(false);

  return (
    <article className="w-full bg-[#0a0604] border-2 border-[#c5a059] rounded-lg shadow-2xl overflow-hidden font-sans relative">
      
      {/* Official Classified Warning Ribbon */}
      <div className="bg-gradient-to-r from-[#291708] via-[#1a0e04] to-[#291708] border-b-2 border-[#c5a059] px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#e6c679] font-bold">
          <AlertTriangle className="w-4 h-4 text-[#ffc83b] animate-pulse" />
          <span className="tracking-widest uppercase">
            CLASSIFICATION: LEVEL-5 / OMEGA-0 · PRINCIPAL ARCHITECT EXCLUSIVE
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#ffdd80]">
          <Crown className="w-3.5 h-3.5" />
          <span>SUPREME AUTHORITY: ASTON MARCHIES</span>
        </div>
      </div>

      <div className="p-5 sm:p-8 space-y-6">
        
        {/* Document Header */}
        <div className="border-b border-[#2d1e10] pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <div className="text-[11px] font-mono text-[#c5a059] uppercase tracking-widest mb-1 flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>CLASSIFIED ABNORMAL SCIENTIFIC RECORD // CLOSED DOSSIER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#fce8bd] tracking-tight">
              Aporia-Cryptica: Non-Causal Obscura Hermeneutics
            </h2>
            <p className="text-xs sm:text-sm text-[#c4af92] mt-0.5 font-mono">
              This record is completely sealed from public registries and unauthenticated non-developer sessions.
            </p>
          </div>

          <button
            onClick={() => setIsCipherDecoded(!isCipherDecoded)}
            className="self-start sm:self-auto px-4 py-2 rounded bg-[#241508] border border-[#c5a059] text-[#ffd666] hover:bg-[#331e0c] text-xs font-mono font-bold transition-all flex items-center gap-2 shadow-md shrink-0"
          >
            {isCipherDecoded ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{isCipherDecoded ? 'Relock Hermetic Cipher' : 'Decode Architect Cyphertext'}</span>
          </button>
        </div>

        {/* Cryptic Encrypted Core Body */}
        <div className="p-4 sm:p-5 bg-[#050302] border border-[#3d240d] rounded-lg space-y-3 font-mono">
          <div className="flex items-center justify-between text-[11px] text-[#a68c70] border-b border-[#291708] pb-2">
            <span className="text-[#c5a059] font-bold">
              PARADOX SYNTAX CIPHER: [OMEGA-KHAWARIQ]
            </span>
            <span className="text-emerald-400">
              {isCipherDecoded ? '✓ DECRYPTED BY ARCHITECT' : '⚠ ENCRYPTED HERMETIC SYNTAX'}
            </span>
          </div>

          <div className="p-4 bg-[#0a0502] rounded border border-[#261508] text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-[#ffd666]">
            {isCipherDecoded ? (
              `⟦ARCHITECT-LEVEL DECRYPTION - APORIA CRYPTICA (ASTON MARCHIES)⟧:
"Inverted Causality Axiom: An event detonates in the present because in the deep future exists a memory that refuses erasure.
Within this singularity zone, language sheds its communication utility and transforms into an ontological tension field that repels external observers.
Any observer lacking the Architect's ontological key perceives this treatise as unstructured white noise."

[HIGHEST NON-CAUSAL FORMULATION]:
∮_C [A_obscura ⊗ dℓ] = -∂/∂t ∬_S [Causal_Decay] · dS ⟹ ∅_obscura`
            ) : (
              `⟦HERMETIC NON-LINEAR GLYPH - HIGH ENCRYPTION MATRIX⟧:
§-Ψ_khawariq: ∇⊗Φ(τ) ∦ ℵ_0(∞) ⇋ ⨂ [Reason(t) ⊘ Paradox(t+Δt)]
0x7F 0x4B 0x9A 0xEE :: [LOCAL_APORIA_COLLAPSE_SYNTAX]
"∰_∅ [Ψ_chronic ⊗ ∇_absurd] ⇋ ℵ_aleph(0) ⨁ Axiomatic Breakdown.
Reason decays at the boundary of folded chronological singularities."`
            )}
          </div>
        </div>

        {/* 3 Cryptic Axioms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3.5 bg-[#080402] border border-[#331c0a] rounded-lg space-y-1">
            <span className="text-[#c5a059] block font-bold">Axiom α-Cryptic:</span>
            <p className="text-[#bfa98e] text-[11px] leading-relaxed">
              {isCipherDecoded 
                ? 'A proposition is fundamentally true only if it refutes its own empirical existence prior to articulation.'
                : '∇·B(t) ≢ 0 ⨂ "Verum_in_falsum: ∄[A] ⟹ ∃[¬A ⊗ A]"'}
            </p>
          </div>

          <div className="p-3.5 bg-[#080402] border border-[#331c0a] rounded-lg space-y-1">
            <span className="text-[#c5a059] block font-bold">Axiom β-Cryptic:</span>
            <p className="text-[#bfa98e] text-[11px] leading-relaxed">
              {isCipherDecoded 
                ? 'Phase space freezes when measured by linear instruments; the anomaly conceals its manifold under observation.'
                : '∮_C [A_obscura · dℓ] = 0 ⇋ det(J - λI) ⟹ ∞'}
            </p>
          </div>

          <div className="p-3.5 bg-[#080402] border border-[#331c0a] rounded-lg space-y-1">
            <span className="text-[#c5a059] block font-bold">Axiom γ-Cryptic:</span>
            <p className="text-[#bfa98e] text-[11px] leading-relaxed">
              {isCipherDecoded 
                ? 'The Grand Curator retains total veto over causality; reality behaves as text that erases its own ink.'
                : 'Ψ_curatorial(Aston) ⨁ ∇Φ_omega ⇋ Level-5 Sovereign Control'}
            </p>
          </div>
        </div>

      </div>

    </article>
  );
};
