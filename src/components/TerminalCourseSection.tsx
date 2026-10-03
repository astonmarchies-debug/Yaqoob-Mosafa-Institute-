import React, { useState } from 'react';
import { Terminal as TerminalIcon, Sparkles, Play, CornerDownLeft, ArrowRight, BookOpen } from 'lucide-react';
import { Dossier } from '../types/dossier';
import { SupportedLanguage, COMPLETE_TRANSLATIONS } from '../services/i18n';

interface TerminalCourseSectionProps {
  dossiers: Dossier[];
  userName: string;
  userRoleTitle: string;
  isDeveloper: boolean;
  currentLanguage: SupportedLanguage;
  onOpenFullTerminal: () => void;
  onSelectDossier: (d: Dossier) => void;
}

export const TerminalCourseSection: React.FC<TerminalCourseSectionProps> = ({
  dossiers,
  userName,
  userRoleTitle,
  isDeveloper,
  currentLanguage,
  onOpenFullTerminal,
  onSelectDossier,
}) => {
  const t = COMPLETE_TRANSLATIONS[currentLanguage];
  const isRtl = currentLanguage === 'ar';

  const [inputVal, setInputVal] = useState('');
  const [miniLogs, setMiniLogs] = useState<string[]>([
    'YAQS-DOS v8.4.1 [EPISTEMIC OS CORE - SECTOR 04-A]',
    `Session: ${userName} // Role: ${userRoleTitle}`,
    t.termPromptNotice,
  ]);

  const courseLessons = [
    {
      step: 1,
      name: t.termLesson1Title,
      cmd: 'list',
      desc: t.termLesson1Desc,
    },
    {
      step: 2,
      name: t.termLesson2Title,
      cmd: 'view YMI-CHAOS-014',
      desc: t.termLesson2Desc,
    },
    {
      step: 3,
      name: t.termLesson3Title,
      cmd: 'search attractor',
      desc: t.termLesson3Desc,
    },
    {
      step: 4,
      name: t.termLesson4Title,
      cmd: 'scan',
      desc: t.termLesson4Desc,
    },
    {
      step: 5,
      name: t.termLesson5Title,
      cmd: 'whoami',
      desc: t.termLesson5Desc,
    },
  ];

  const runCommand = (cmd: string) => {
    const raw = cmd.trim();
    if (!raw) return;

    const parts = raw.split(' ');
    const action = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').trim();

    let output = '';

    switch (action) {
      case 'help':
      case 'man':
      case 'commands':
      case 'مساعدة':
        output = 'COMMANDS: list, view <protocol>, scan, search <keyword>, whoami, clear';
        break;

      case 'list':
      case 'ls':
      case 'archive':
      case 'archives':
      case 'قائمة':
        output = `[ARCHIVE REGISTRY YAQS-04A (${dossiers.length} Records)]:\n` +
          dossiers.slice(0, 5).map((d) => `  • ${d.protocolNumber} - ${d.title}`).join('\n') +
          (dossiers.length > 5 ? `\n  ...and ${dossiers.length - 5} more records.` : '');
        break;

      case 'view':
      case 'read':
      case 'cat':
      case 'اقرأ':
        const found = dossiers.find((d) => 
          d.protocolNumber.toLowerCase().includes(arg.toLowerCase()) || 
          d.title.toLowerCase().includes(arg.toLowerCase()) ||
          d.id.toLowerCase().includes(arg.toLowerCase())
        );
        if (found) {
          output = `[${found.protocolNumber}: ${found.title}]\nClass: ${found.attractorClass} | Lead: ${found.leadResearcher}\nDescription: ${found.description.slice(0, 180)}...`;
        } else {
          output = `Record "${arg}" not found. Try: view YMI-CHAOS-014`;
        }
        break;

      case 'axcelnetics':
      case 'theory':
      case 'akselnetika':
        output = '[AXCELNETICS]: Non-linear resonance contagion framework wherein stochastic fluctuations propagate macroscopic order across decoupled phase spaces.';
        break;

      case 'whoami':
      case 'auth':
      case 'user':
      case 'من_أنا':
        output = `Session: ${userName} | Role: ${userRoleTitle} ${isDeveloper ? '[PRINCIPAL ARCHITECT PRIVILEGES ACTIVE]' : ''}`;
        break;

      case 'scan':
      case 'audit':
      case 'فحص':
        output = 'SHA-256 INTEGRITY AUDIT: 100% of memory blocks intact. Checksum validated.';
        break;

      case 'search':
      case 'find':
      case 'grep':
      case 'بحث':
        const matches = dossiers.filter((d) => 
          d.title.toLowerCase().includes(arg.toLowerCase()) || 
          d.description.toLowerCase().includes(arg.toLowerCase())
        );
        output = matches.length > 0
          ? `Found ${matches.length} files: ` + matches.map((m) => m.protocolNumber).join(', ')
          : `No dossiers matched "${arg}".`;
        break;

      case 'clear':
      case 'cls':
        setMiniLogs(['Console screen buffer cleared.']);
        setInputVal('');
        return;

      default:
        output = `Command "${action}" not recognized. Type "help" for syntax.`;
        break;
    }

    setMiniLogs((prev) => [
      ...prev.slice(-6),
      `❯ ${raw}`,
      output,
    ]);
    setInputVal('');
  };

  return (
    <article className="w-full bg-[#070c09] border border-[#23352a] rounded-lg shadow-xl overflow-hidden font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Official Header Bar */}
      <div className="bg-[#0e1713] border-b border-[#23352a] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-[#c5a059]" />
          <span className="font-bold text-[#c5a059] tracking-wider uppercase">
            {t.termHeaderBar}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[#7d9086]">
          <span>PROTO: <strong>CLI-SHELL-v8</strong></span>
          <span className="hidden sm:inline">|</span>
          <span className="text-[#a4e2ba]">{t.termActiveBadge}</span>
        </div>
      </div>

      <div className="p-5 sm:p-8 space-y-6">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1b2b22] pb-4">
          <div>
            <div className="text-[11px] font-mono text-[#8b9e93] uppercase tracking-widest mb-1 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>YAQS-DOS USER MANUAL & QUICKSTART</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#f5eedf] tracking-tight">
              {t.termTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#9eb1a6] mt-0.5">
              {t.termSubtitle}
            </p>
          </div>

          <button
            onClick={onOpenFullTerminal}
            className="self-start sm:self-auto px-4 py-2 rounded bg-[#13221b] border border-[#263e30] text-[#e6c679] hover:bg-[#1a3126] text-xs font-mono font-bold transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            <span>{t.termOpenFullBtn}</span>
            <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Quick-Command Table Cards */}
        <div>
          <div className="font-mono text-xs font-bold text-[#e5dfd3] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{t.termModulesTitle}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {courseLessons.map((lesson) => (
              <button
                key={lesson.step}
                onClick={() => runCommand(lesson.cmd)}
                className="p-3 rounded-lg bg-[#050907] border border-[#182a20] hover:border-[#c5a059] hover:bg-[#0c1611] transition-all text-left group flex flex-col justify-between"
                dir={isRtl ? 'rtl' : 'ltr'}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#6e8276] mb-1">
                    <span>§ 0{lesson.step}</span>
                    <Play className="w-2.5 h-2.5 text-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="font-semibold text-xs text-[#e5dfd3] group-hover:text-[#c5a059]">
                    {lesson.name}
                  </div>
                  <p className="text-[10px] text-[#7d9085] mt-1 line-clamp-2">
                    {lesson.desc}
                  </p>
                </div>

                <div className="mt-2 text-[10px] font-mono bg-[#030604] px-1.5 py-0.5 rounded text-[#8be2a8] border border-[#14231a] truncate" dir="ltr">
                  $ {lesson.cmd}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Live Terminal Emulator Box */}
        <div className="bg-[#040806] border border-[#1a2d22] rounded-lg overflow-hidden font-mono text-xs shadow-inner" dir="ltr">
          <div className="px-3.5 py-2 bg-[#08120d] border-b border-[#14231a] flex items-center justify-between text-[#687b70]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500/70 inline-block" />
              <span className="w-2 h-2 rounded-full bg-amber-500/70 inline-block" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/70 inline-block" />
              <span className="ml-1 text-[11px] text-[#86998e]">quick-shell@yaqoob-institute:~</span>
            </div>
            <span className="text-[10px] text-[#556b5e]">{t.termPromptNotice}</span>
          </div>

          <div className="p-4 space-y-1.5 max-h-52 overflow-y-auto text-[11px] leading-relaxed">
            {miniLogs.map((log, i) => (
              <div
                key={i}
                className={log.startsWith('❯') ? 'text-[#c5a059] font-bold' : 'text-[#8be2a8] whitespace-pre-wrap'}
              >
                {log}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              runCommand(inputVal);
            }}
            className="p-2.5 bg-[#050907] border-t border-[#14231a] flex items-center gap-2"
          >
            <span className="text-[#c5a059] font-bold">❯</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={t.termInputPlaceholder}
              className="flex-1 bg-transparent text-xs text-[#f5eedf] font-mono focus:outline-none placeholder-[#45564b]"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-[#13221b] hover:bg-[#1a3126] text-[#c5a059] text-[11px] rounded border border-[#233b2e] flex items-center gap-1"
            >
              <span>{t.termSendBtn}</span>
              <CornerDownLeft className="w-3 h-3" />
            </button>
          </form>
        </div>

      </div>

    </article>
  );
};
