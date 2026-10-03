import React, { useState, useRef, useEffect } from 'react';
import { Dossier, ClearanceLevel } from '../types/dossier';
import { Terminal as TerminalIcon, CornerDownLeft, BookOpen, Sparkles, Check, ChevronRight, Play } from 'lucide-react';
import { storageService } from '../services/storage';

interface TerminalConsoleProps {
  dossiers: Dossier[];
  clearanceLevel: ClearanceLevel;
  setClearanceLevel: (lvl: ClearanceLevel) => void;
  onSelectDossier: (d: Dossier) => void;
  onNavigateTab: (tab: 'archive' | 'lab' | 'manifesto' | 'security' | 'home') => void;
}

interface CommandLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  text: string;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({
  dossiers,
  onSelectDossier,
  onNavigateTab,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [showCourse, setShowCourse] = useState(true);
  const currentUser = storageService.getActiveUser();

  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'YAQS-DOS v8.4.1 [EPISTEMIC OS CORE - YAQOOB MOSAFA INSTITUTE]',
    },
    {
      id: 'init-2',
      type: 'system',
      text: `Authenticated Session: ${currentUser.name} // Designation: ${currentUser.roleTitle}`,
    },
    {
      id: 'init-3',
      type: 'system',
      text: 'Type "help" or "guide" to inspect available command syntax and training modules.',
    },
  ]);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommandString = (cmd: string) => {
    const raw = cmd.trim();
    if (!raw) return;

    const parts = raw.split(' ');
    const action = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').trim();

    const newLogs: CommandLog[] = [
      ...history,
      { id: `in-${Date.now()}`, type: 'input', text: `researcher@ymi-core:~$ ${raw}` },
    ];

    switch (action) {
      case 'help':
      case 'man':
      case 'commands':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `================== YAQS-DOS COMMAND DIRECTORY & SYNTAX ==================
• list / ls / archive      : Query all official classified anomaly records
• view / read <id/code>    : Declassify & render full dossier (e.g., view YMI-CHAOS-014)
• search / find <term>     : Filter records by keyword, researcher, or attractor class
• axcelnetics / theory     : Display the foundational treatise on resonance contagion
• whoami / auth            : Inspect active researcher credentials and clearance tier
• guide / tutorial         : Open the interactive command-line curriculum panel
• open / goto <id/code>    : Navigate directly to the dossier in the web UI
• clear / cls              : Purge terminal console memory buffer
========================================================================`,
        });
        break;

      case 'guide':
      case 'tutorial':
      case 'course':
        setShowCourse(true);
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `[INTERACTIVE TRAINING CONSOLE EXPANDED]
Please inspect the "YAQS-DOS Interactive Mastery Course" panel above.
Click any training module to automatically stage and execute command pipelines.`,
        });
        break;

      case 'axcelnetics':
      case 'theory':
      case 'akselnetika':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `[FOUNDATIONAL AXCELNETICS TREATISE - YMI SECTOR 04-A]
Definition: Axcelnetics is the mathematical study of stochastic resonance contagion, 
describing how minute phase fluctuations induce irreversible macroscopic order.

Three Cardinal Axioms of Contagion:
1. Sympathetic Propagation: Harmonically compatible nodes synchronize spontaneously.
2. Silent Ripple Cascade: Catastrophic state transitions emerge from infinitesimal noise.
3. Network Saturation Threshold: Beyond critical entropy (Sc), resonance becomes systemic.`,
        });
        break;

      case 'whoami':
      case 'auth':
      case 'user':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `ACTIVE RESEARCHER TELEMETRY:
Identity    : ${currentUser.name}
Role        : ${currentUser.roleTitle} ${currentUser.isDeveloper ? '[PRINCIPAL ARCHITECT PRIVILEGES ACTIVE]' : ''}
Affiliation : ${currentUser.affiliation || 'Independent Academic'}
Clearance   : Level-${currentUser.clearanceLevel} // Sector 04-A Validated`,
        });
        break;

      case 'list':
      case 'ls':
      case 'archive':
      case 'archives':
        const docList = dossiers
          .map((d) => `  [${d.protocolNumber}] - ${d.title} (Class: ${d.attractorClass}, Clearance: L${d.clearanceLevel})`)
          .join('\n');
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `CLASSIFIED DOSSIER REGISTRY (${dossiers.length} Records Preserved):\n${docList}\n\nType "view <protocol-code>" to declassify and read a specific record.`,
        });
        break;

      case 'view':
      case 'read':
      case 'cat':
        if (!arg) {
          newLogs.push({
            id: `err-${Date.now()}`,
            type: 'error',
            text: 'Syntax Error: Missing protocol identifier. Example: "view YMI-CHAOS-014"',
          });
          break;
        }

        const found = dossiers.find(
          (d) =>
            d.protocolNumber.toLowerCase().includes(arg.toLowerCase()) ||
            d.title.toLowerCase().includes(arg.toLowerCase()) ||
            d.id.toLowerCase().includes(arg.toLowerCase())
        );

        if (!found) {
          newLogs.push({
            id: `err-${Date.now()}`,
            type: 'error',
            text: `Dossier record matching "${arg}" not found in institutional archives.`,
          });
        } else {
          newLogs.push({
            id: `out-${Date.now()}`,
            type: 'output',
            text: `================ ${found.protocolNumber}: ${found.title} ================
Attractor Class : ${found.attractorClass}
Research Group  : ${found.division}
Lead Scientist  : ${found.leadResearcher}
Clearance Level : Level-${found.clearanceLevel}

[PHENOMENOLOGICAL DESCRIPTION]:
${found.description}

[CONTAINMENT & SAFETY PROTOCOLS]:
${found.containmentProtocols}
========================================================================`,
          });
        }
        break;

      case 'open':
      case 'goto':
        if (!arg) {
          newLogs.push({
            id: `err-${Date.now()}`,
            type: 'error',
            text: 'Syntax Error: Missing protocol code. Example: "open YMI-CHAOS-014"',
          });
          break;
        }

        const targetDossier = dossiers.find(
          (d) =>
            d.protocolNumber.toLowerCase().includes(arg.toLowerCase()) ||
            d.title.toLowerCase().includes(arg.toLowerCase()) ||
            d.id.toLowerCase().includes(arg.toLowerCase())
        );

        if (targetDossier) {
          onSelectDossier(targetDossier);
          onNavigateTab('archive');
          return;
        } else {
          newLogs.push({
            id: `err-${Date.now()}`,
            type: 'error',
            text: `Dossier record "${arg}" not found.`,
          });
        }
        break;

      case 'search':
      case 'find':
      case 'grep':
        if (!arg) {
          newLogs.push({
            id: `err-${Date.now()}`,
            type: 'error',
            text: 'Syntax Error: "search <keyword>". Example: "search lorenz" or "search chaotic"',
          });
          break;
        }

        const matches = dossiers.filter(
          (d) =>
            d.title.toLowerCase().includes(arg.toLowerCase()) ||
            d.description.toLowerCase().includes(arg.toLowerCase()) ||
            d.tags.some((t) => t.toLowerCase().includes(arg.toLowerCase()))
        );

        if (matches.length === 0) {
          newLogs.push({
            id: `out-${Date.now()}`,
            type: 'output',
            text: `No records match search parameter "${arg}".`,
          });
        } else {
          const results = matches.map((m) => `  • ${m.protocolNumber}: ${m.title}`).join('\n');
          newLogs.push({
            id: `out-${Date.now()}`,
            type: 'output',
            text: `Found ${matches.length} matching classified records:\n${results}`,
          });
        }
        break;

      case 'clear':
      case 'cls':
        setHistory([
          {
            id: `sys-${Date.now()}`,
            type: 'system',
            text: 'Console screen buffer purged. Type "help" for syntax reference.',
          },
        ]);
        setInputVal('');
        return;

      default:
        newLogs.push({
          id: `err-${Date.now()}`,
          type: 'error',
          text: `Command "${action}" not recognized. Type "help" for a list of available routines.`,
        });
        break;
    }

    setHistory(newLogs);
    setInputVal('');
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommandString(inputVal);
  };

  const courseSteps = [
    {
      step: 1,
      title: 'Query Archive Vault',
      cmd: 'list',
      desc: 'Enumerate all classified anomaly dossiers stored across institutional vaults.',
    },
    {
      step: 2,
      title: 'Declassify Record Details',
      cmd: 'view YMI-CHAOS-014',
      desc: 'Render observational analysis and differential equations directly in console.',
    },
    {
      step: 3,
      title: 'Inspect Axcelnetics Theory',
      cmd: 'axcelnetics',
      desc: 'Read the three foundational laws of non-contact resonance contagion.',
    },
    {
      step: 4,
      title: 'Keyword Search Pipeline',
      cmd: 'search attractor',
      desc: 'Filter archives by specific physical properties and keywords.',
    },
    {
      step: 5,
      title: 'Verify Active Session',
      cmd: 'whoami',
      desc: 'Inspect researcher clearance credentials and security tier.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-mono">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-[#1b2b23] pb-3">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-5 h-5 text-[#c5a059]" />
          <h2 className="text-base font-bold text-[#f5eedf] font-display">
            YAQS-DOS Command Line & Interactive Mastery Console
          </h2>
        </div>
        <button
          onClick={() => setShowCourse(!showCourse)}
          className="text-xs text-[#c5a059] hover:underline flex items-center gap-1 font-mono"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{showCourse ? 'Hide Curriculum' : 'Show Interactive Guide'}</span>
        </button>
      </div>

      {/* INTERACTIVE TERMINAL COURSE */}
      {showCourse && (
        <div className="mb-6 p-4 rounded-xl bg-[#09120e] border border-[#23382c] shadow-lg text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#182920] pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
              <span className="font-bold text-[#e8dfcf] uppercase tracking-wider font-display">
                Operator Training Modules: Master Terminal Syntax
              </span>
            </div>
            <span className="text-[10px] text-[#718579]">
              Click any module to execute command automatically:
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
            {courseSteps.map((c) => (
              <div
                key={c.step}
                onClick={() => executeCommandString(c.cmd)}
                className="p-2.5 rounded bg-[#060b08] border border-[#1b2e23] hover:border-[#c5a059] hover:bg-[#0c1611] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-[#7e9086] mb-1">
                    <span>Module {c.step}</span>
                    <Play className="w-3 h-3 text-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="font-bold text-[#d8e3dc] group-hover:text-[#c5a059]">
                    {c.title}
                  </div>
                  <p className="text-[11px] text-[#788a80] mt-0.5 line-clamp-2">
                    {c.desc}
                  </p>
                </div>

                <div className="mt-2 text-[10px] bg-[#030604] px-1.5 py-0.5 rounded text-[#8be2a8] border border-[#14231a] truncate">
                  $ {c.cmd}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Terminal Screen Container */}
      <div className="bg-[#040806] border border-[#1b2b24] rounded-xl shadow-2xl overflow-hidden">
        
        {/* Terminal Title Bar */}
        <div className="px-4 py-2 bg-[#08100c] border-b border-[#15231c] flex items-center justify-between text-xs text-[#788880]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-[#a8b8af]">archive-core@yaqoob-institute:~</span>
          </div>
          <span className="text-[10px] text-[#55695e]">Type "help" for syntax</span>
        </div>

        {/* Console logs */}
        <div className="p-4 sm:p-6 min-h-[360px] max-h-[500px] overflow-y-auto space-y-2 text-xs leading-relaxed">
          {history.map((log) => {
            if (log.type === 'input') {
              return (
                <div key={log.id} className="text-[#e2ded6] font-semibold flex items-center gap-1.5">
                  <span className="text-[#c5a059]">❯</span>
                  <span>{log.text}</span>
                </div>
              );
            }
            if (log.type === 'error') {
              return (
                <div key={log.id} className="text-rose-400 pl-4 border-l border-rose-900/60 whitespace-pre-wrap">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'system') {
              return (
                <div key={log.id} className="text-[#5f7467] italic whitespace-pre-wrap">
                  {log.text}
                </div>
              );
            }
            return (
              <div key={log.id} className="text-[#96dfb2] pl-4 border-l border-[#1a3828] whitespace-pre-wrap">
                {log.text}
              </div>
            );
          })}
          <div ref={endRef} />
        </div>

        {/* Input prompt */}
        <form onSubmit={handleCommandSubmit} className="p-3 bg-[#060b08] border-t border-[#16231c] flex items-center gap-2">
          <span className="text-[#c5a059] font-bold text-sm">❯</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command (e.g., list, axcelnetics, view YMI-CHAOS-014, help)..."
            className="flex-1 bg-transparent text-xs text-[#f5eedf] font-mono focus:outline-none placeholder-[#4e6055]"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-1 bg-[#17271e] hover:bg-[#233d2f] text-[#c5a059] text-xs rounded border border-[#2b4435] flex items-center gap-1"
          >
            <span>Execute</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </form>

      </div>

    </div>
  );
};
