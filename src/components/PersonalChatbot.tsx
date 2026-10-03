import React, { useState, useEffect, useRef } from 'react';
import { ResearcherUser, Dossier } from '../types/dossier';
import { 
  Bot, Send, User, Trash2, Sparkles, X, Minimize2, Maximize2, 
  Copy, Check, RefreshCw, Cpu, Brain, Lock
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface PersonalChatbotProps {
  currentUser: ResearcherUser;
  currentDossierContext?: Dossier | null;
  onOpenAuthModal?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  isFloating?: boolean;
}

export const PersonalChatbot: React.FC<PersonalChatbotProps> = ({
  currentUser,
  currentDossierContext,
  onOpenAuthModal,
  isOpen = true,
  onClose,
  isFloating = false,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const storageKey = `ymi_chat_history_${currentUser.id || 'guest'}`;

  useEffect(() => {
    // Load chat history for current user
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        // Initial greeting
        const initialGreeting: ChatMessage = {
          id: 'welcome-1',
          role: 'assistant',
          content: currentUser.isLoggedIn
            ? `Greetings, ${currentUser.name} (${currentUser.roleTitle}). I am your personal YMI Cybernetic Intelligence Assistant. How may I assist your personal research, mathematical formulations, or dossier analysis today?`
            : `Welcome to the YMI Intelligence Portal. Please sign in with your Google or Microsoft account to unlock your personal AI research assistant.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([initialGreeting]);
      }
    } catch {
      setMessages([]);
    }
  }, [currentUser.id, currentUser.isLoggedIn]);

  useEffect(() => {
    // Save chat history
    if (messages.length > 0) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(messages));
      } catch {}
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, storageKey]);

  const getSmartLocalResponse = (query: string): string | null => {
    const q = query.toLowerCase();
    if (q.includes('akselnetika') || q.includes('axcelnetics')) {
      return `Akselnetika (Axcelnetics) is the pioneering non-linear dynamics framework formulated by Aston Marchies. It bridges deterministic chaos and stochastic noise, proving that high-entropy randomness acts as a rich information carrier. In simple terms: order is naturally embedded at the very heart of chaos! You can experiment with this in the "Resonance Field Simulator" on the home page!`;
    }
    if (q.includes('status') || q.includes('defcon') || q.includes('threat')) {
      return `Current Security Status: DEFCON 5 (Normal Causal Coherence). The Causal Firewall is running on all ports. Active integrity scanning is fully operational 24/7. 0 system corruptions or database deviations have been logged in Sector 04-A today.`;
    }
    if (q.includes('attractor') || q.includes('lorenz')) {
      return `A Strange Attractor is a fractional-dimension limit set in phase space toward which a chaotic system evolves. The Lorenz attractor, representing thermal atmospheric convection, is governed by a system of three non-linear differential equations. You can simulate and visualize this dynamic 3D integration in real-time in the "Chaos Lab"!`;
    }
    if (q.includes('aston') || q.includes('architect')) {
      return `Aston Marchies is the Principal Architect, Grand Curator, and Sovereign System Authority of the Yaqoob Mosafa Institute. He constructed the modern digital repositories, designed the Chaos Lab models, and authored the foundational treatise on Axcelnetics.`;
    }
    return null;
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!currentUser.isLoggedIn) {
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }

    const userMsgText = input.trim();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    // Intercept with smart local informational responses first (real-time 24/7)
    const localResp = getSmartLocalResponse(userMsgText);
    if (localResp) {
      setTimeout(() => {
        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: localResp,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsLoading(false);
      }, 750);
      return;
    }

    try {
      const apiMessages = newHistory.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          userProfile: currentUser,
          currentDossierContext: currentDossierContext || null,
        }),
      });

      const data = await res.json();
      const replyContent = data.reply || data.error || 'No response received.';

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `Connection error: Unable to contact neural assistant node (${err.message || 'Server error'}).`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch {}
    const initialGreeting: ChatMessage = {
      id: `welcome-${Date.now()}`,
      role: 'assistant',
      content: `Session history reset. Ready for new personal research queries, ${currentUser.name}.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([initialGreeting]);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className={`font-sans flex flex-col ${
      isFloating 
        ? 'fixed bottom-4 right-4 z-50 w-full max-w-md bg-[#080d0a] border border-[#23382c] rounded-2xl shadow-2xl overflow-hidden max-h-[85vh]'
        : 'w-full bg-[#070c09] border border-[#1b2b22] rounded-xl overflow-hidden shadow-xl'
    }`}>
      
      {/* Header */}
      <div className="bg-[#0b140e] px-4 py-3 border-b border-[#1b2b22] flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#14261d] border border-[#2d4737] text-[#c5a059]">
            <Brain className="w-4 h-4 animate-pulse text-[#c5a059]" />
          </div>
          <div>
            <h4 className="font-bold text-[#f5eedf] flex items-center gap-2">
              <span>Personal YMI Intelligence</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-mono">
                {currentUser.isLoggedIn ? 'ACTIVE' : 'LOCKED'}
              </span>
            </h4>
            <div className="text-[10px] text-[#788a80]">
              Assigned to {currentUser.name} ({currentUser.roleTitle})
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[#7e8f85]">
          <button
            onClick={handleClearHistory}
            className="p-1 rounded hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {isFloating && (
            <>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 rounded hover:text-white transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-1 rounded hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Body Content */}
      {!isMinimized && (
        <>
          {/* Chat Messages */}
          <div className="p-4 space-y-3.5 overflow-y-auto max-h-[420px] min-h-[220px] bg-[#040705] text-xs">
            
            {!currentUser.isLoggedIn ? (
              <div className="p-6 text-center bg-[#080e0b] border border-[#1b2b22] rounded-xl space-y-3 font-mono my-4">
                <Lock className="w-8 h-8 text-amber-400 mx-auto opacity-80" />
                <h5 className="font-bold text-[#f5eedf]">Personal Assistant Locked</h5>
                <p className="text-xs text-[#7e9086] max-w-xs mx-auto">
                  Sign in with your Google or Microsoft account to unlock your personal neural AI research companion.
                </p>
                {onOpenAuthModal && (
                  <button
                    onClick={onOpenAuthModal}
                    className="px-4 py-2 rounded-lg bg-[#c5a059] text-black font-bold text-xs"
                  >
                    Sign In to Unlock
                  </button>
                )}
              </div>
            ) : (
              messages.map((msg) => {
                const isAssistant = msg.role === 'assistant';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                  >
                    {isAssistant && (
                      <div className="p-1.5 rounded bg-[#101c15] border border-[#1f3327] text-[#c5a059] shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div className={`max-w-[85%] rounded-xl p-3 leading-relaxed space-y-1 ${
                      isAssistant
                        ? 'bg-[#09100c] border border-[#1b2e23] text-[#d6e2db]'
                        : 'bg-[#182c21] border border-[#2a4a37] text-[#f5eedf]'
                    }`}>
                      <div className="flex items-center justify-between gap-3 text-[10px] font-mono text-[#6c8074] border-b border-[#122218] pb-1 mb-1">
                        <span>{isAssistant ? 'YMI Neural Intelligence' : currentUser.name}</span>
                        <div className="flex items-center gap-2">
                          <span>{msg.timestamp}</span>
                          {isAssistant && (
                            <button
                              onClick={() => handleCopyText(msg.id, msg.content)}
                              className="hover:text-white transition-colors"
                            >
                              {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="whitespace-pre-line text-xs font-sans">
                        {msg.content}
                      </div>
                    </div>

                    {!isAssistant && (
                      <div className="p-1.5 rounded bg-[#182c21] border border-[#2a4a37] text-[#f5eedf] shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#c5a059] p-3 bg-[#08100c] border border-[#1b2e23] rounded-xl w-fit">
                <Cpu className="w-4 h-4 animate-spin text-[#c5a059]" />
                <span>Synthesizing neural response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Shortcuts */}
          {currentUser.isLoggedIn && (
            <div className="px-3 py-2 bg-[#060b08] border-t border-[#14231b] flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono no-scrollbar">
              <span className="text-[#5f7368] shrink-0 font-semibold">Prompts:</span>
              <button
                type="button"
                onClick={() => setInput('Explain Akselnetika')}
                className="px-2 py-1 rounded bg-[#0d1712] hover:bg-[#16271e] border border-[#1f3328] text-emerald-400 shrink-0 transition-colors font-bold"
              >
                🧬 Akselnetika
              </button>
              <button
                type="button"
                onClick={() => setInput('System Status & DEFCON')}
                className="px-2 py-1 rounded bg-[#0d1712] hover:bg-[#16271e] border border-[#1f3328] text-sky-400 shrink-0 transition-colors font-bold"
              >
                📡 System Status
              </button>
              <button
                type="button"
                onClick={() => setInput('Explain Lorenz Strange Attractors')}
                className="px-2 py-1 rounded bg-[#0d1712] hover:bg-[#16271e] border border-[#1f3328] text-amber-400 shrink-0 transition-colors font-bold"
              >
                🌀 Strange Attractors
              </button>
              <button
                type="button"
                onClick={() => setInput('Analyze the chaos and Lyapunov exponent of my current dossier.')}
                className="px-2 py-1 rounded bg-[#0d1712] hover:bg-[#16271e] border border-[#1f3328] text-[#a4b8ac] shrink-0 transition-colors"
              >
                📊 Analyze Chaos
              </button>
              <button
                type="button"
                onClick={() => setInput('Help me draft a new research theory.')}
                className="px-2 py-1 rounded bg-[#0d1712] hover:bg-[#16271e] border border-[#1f3328] text-[#a4b8ac] shrink-0 transition-colors"
              >
                💡 Draft Theory
              </button>
            </div>
          )}

          {/* Input Box */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#080e0b] border-t border-[#1b2b22] flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!currentUser.isLoggedIn || isLoading}
              placeholder={
                currentUser.isLoggedIn
                  ? 'Ask your personal YMI AI Assistant anything...'
                  : 'Sign in to send messages...'
              }
              className="flex-1 bg-[#040705] border border-[#1b2b22] focus:border-[#c5a059] rounded-lg px-3 py-2 text-xs text-[#f5eedf] placeholder-[#5a6e62] focus:outline-none transition-colors"
            />

            <button
              type="submit"
              disabled={!input.trim() || !currentUser.isLoggedIn || isLoading}
              className="p-2 rounded-lg bg-[#c5a059] hover:bg-[#d8b26a] disabled:opacity-30 text-black font-bold transition-all shrink-0 cursor-pointer"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </>
      )}

    </div>
  );
};
