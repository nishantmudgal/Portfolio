import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X, CornerDownLeft, Circle } from "lucide-react";

interface TerminalProps {
  onClose?: () => void;
  setActiveTab?: (tab: string) => void;
  isEmbed?: boolean;
}

export default function Terminal({ onClose, setActiveTab, isEmbed = false }: TerminalProps) {
  const [history, setHistory] = useState<string[]>([
    "Kinetic Syntax Terminal v1.1.2",
    "Type 'help' to review available architectural queries.",
    ""
  ]);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Scroll to bottom whenever history changes
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Focus terminal input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let reply = "";

    switch (trimmed) {
      case "help":
        reply = `Available terminal systems:
  - 'stack'      Outputs detailed framework & compilation technologies
  - 'projects'   Lists core open-source creative projects
  - 'vitals'     Queries Lighthouse performance benchmarks
  - 'contact'    Displays cryptographic contact nodes
  - 'goto <tab>' Navigates to a portfolio tab (goto about, projects, experience, blogs, contact)
  - 'clear'      Wipes the console matrix`;
        break;
      case "stack":
        reply = `--- SYNTACTIC STACK INFRASTRUCTURE ---
  - Framework Core: React 18 / 19, TypeScript
  - Styling Matrix: Tailwind CSS, CSS Grid/Variables
  - Bundle Compiler: Vite, Esbuild (Tree Shaking optimized)
  - Core Modules: D3.js, Lucide Vectors, Motion Library`;
        break;
      case "projects":
        reply = `--- CURATED PROJECTS LISTING ---
  1. Hyperion Analytics Engine [Status: Active]
  2. Kinetic Wallet Interface  [Status: Released]
  3. Nexus API Orchestrator    [Status: Beta]
  4. Prism Shaders & Particles  [Status: Stable]`;
        break;
      case "vitals":
        reply = `--- LIGHTHOUSE TELEMETRY INDEX ---
  - Largest Contentful Paint (LCP): 0.8s (PASS)
  - Cumulative Layout Shift (CLS): 0.01 (PASS)
  - Interaction to Next Paint (INP): 12ms (PASS)
  - Total Bundle Weight: < 42KB gzipped`;
        break;
      case "contact":
        reply = `--- CRYPTOGRAPHIC NETWORK NODES ---
  - Email Node: nishant.mudgal.tech@gmail.com
  - Phone Node: +91 9876543210
  - Location: Bengaluru, IN (UTC +5:30)
  - Status: READY FOR PROTOCOL BUILD`;
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
            case "goto about":
      case "goto core":
        if (setActiveTab) {
          setActiveTab("about");
          reply = "Navigated to Architectural Core (About).";
        } else {
          reply = "Tab routing is offline in embedded workspace.";
        }
        break;
      case "goto projects":
      case "goto artifacts":
        if (setActiveTab) {
          setActiveTab("projects");
          reply = "Navigated to Curated Artifacts (Projects).";
        } else {
          reply = "Tab routing is offline in embedded workspace.";
        }
        break;
      case "goto experience":
      case "goto timeline":
        if (setActiveTab) {
          setActiveTab("experience");
          reply = "Navigated to Professional Timeline (Experience).";
        } else {
          reply = "Tab routing is offline in embedded workspace.";
        }
        break;
      case "goto blogs":
      case "goto blogs & certs":
      case "goto certs":
        if (setActiveTab) {
          setActiveTab("blogs");
          reply = "Navigated to Syntax & Steel (Blogs & Certifications).";
        } else {
          reply = "Tab routing is offline in embedded workspace.";
        }
        break;
      case "goto contact":
      case "goto connect":
        if (setActiveTab) {
          setActiveTab("contact");
          reply = "Navigated to Let's Build (Contact Node).";
        } else {
          reply = "Tab routing is offline in embedded workspace.";
        }
        break;
      default:
        if (trimmed.startsWith("goto ")) {
          const target = trimmed.substring(5);
          if (["about", "projects", "experience", "blogs", "contact"].includes(target)) {
            if (setActiveTab) {
              setActiveTab(target);
              reply = `Navigated to ${target.toUpperCase()}.`;
            } else {
              reply = "Tab routing is offline in embedded workspace.";
            }
          } else {
            reply = `Unknown node destination: "${target}". Try "goto about", "goto projects", etc.`;
          }
        } else {
          reply = `Syntax Error: Code "${trimmed}" not found. Type "help" for guidelines.`;
        }
        break;
    }

    setHistory(prev => [...prev, `nmudgal@architecture:~$ ${cmd}`, reply, ""]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  if (isEmbed) {
    return (
      <div className="w-full bg-surface-container border border-outline-variant/60 rounded-xl overflow-hidden shadow-sm flex flex-col h-[350px] font-mono">
        {/* Terminal Header */}
        <div className="flex justify-between items-center bg-surface-container-high px-4 py-2 border-b border-outline-variant/60">
          <div className="flex items-center gap-1.5">
            <Circle size={10} className="fill-error/85 stroke-error/85 text-error" />
            <Circle size={10} className="fill-secondary/85 stroke-secondary/85 text-secondary" />
            <Circle size={10} className="fill-tertiary/85 stroke-tertiary/85 text-tertiary" />
            <span className="text-xs text-on-surface-variant font-medium ml-2 flex items-center gap-1">
              <TerminalIcon size={12} /> nmudgal@architecture:~
            </span>
          </div>
          <span className="text-[9px] font-mono text-outline uppercase font-semibold">EMBEDDED_CONSOLE</span>
        </div>

        {/* Terminal Log View */}
        <div 
          ref={containerRef}
          className="p-4 flex-1 overflow-y-auto space-y-1.5 text-xs text-on-surface-variant text-left font-mono"
        >
          {history.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {line.startsWith("nmudgal@architecture:~$") ? (
                <span className="text-primary font-semibold">{line}</span>
              ) : line.includes("Available terminal systems:") || line.includes("---") ? (
                <span className="text-secondary">{line}</span>
              ) : line.includes("PASS") || line.includes("SUCCESS") || line.includes("OK") ? (
                <span className="text-tertiary">{line}</span>
              ) : line.includes("Error") ? (
                <span className="text-error">{line}</span>
              ) : (
                line
              )}
            </div>
          ))}
        </div>

        {/* Terminal Input Line */}
        <div className="flex items-center bg-surface-container-low border-t border-outline-variant/60 px-4 py-2.5">
          <span className="text-primary text-xs font-semibold shrink-0 mr-1.5 font-mono">nmudgal@architecture:~$</span>
          <input 
            ref={inputRef}
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none text-xs font-mono text-on-surface outline-none flex-1 focus:ring-0 focus:outline-none p-0"
            placeholder="Type 'help' and press Enter..."
          />
          <CornerDownLeft size={12} className="text-outline shrink-0 ml-1.5" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md font-mono">
      <div className="w-full max-w-2xl bg-surface-container border border-outline rounded-lg overflow-hidden shadow-2xl flex flex-col h-[400px]">
        {/* Terminal Header */}
        <div className="flex justify-between items-center bg-surface-container-high px-4 py-2 border-b border-outline-variant/60">
          <div className="flex items-center gap-1.5">
            <Circle size={10} className="fill-error stroke-error text-error" />
            <Circle size={10} className="fill-secondary stroke-secondary text-secondary" />
            <Circle size={10} className="fill-tertiary stroke-tertiary text-tertiary" />
            <span className="text-xs text-on-surface-variant font-medium ml-2 flex items-center gap-1">
              <TerminalIcon size={12} /> nmudgal@architecture:~
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none p-1"
          >
            <X size={14} />
          </button>
        </div>

        {/* Terminal Log View */}
        <div 
          ref={containerRef}
          className="p-4 flex-1 overflow-y-auto space-y-1.5 text-xs text-on-surface-variant text-left"
        >
          {history.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {line.startsWith("nmudgal@architecture:~$") ? (
                <span className="text-primary font-semibold">{line}</span>
              ) : line.includes("Available terminal systems:") || line.includes("---") ? (
                <span className="text-secondary">{line}</span>
              ) : line.includes("PASS") || line.includes("SUCCESS") || line.includes("OK") ? (
                <span className="text-tertiary">{line}</span>
              ) : line.includes("Error") ? (
                <span className="text-error">{line}</span>
              ) : (
                line
              )}
            </div>
          ))}
        </div>

        {/* Terminal Input Line */}
        <div className="flex items-center bg-surface-container-low border-t border-outline-variant/60 px-4 py-2.5">
          <span className="text-primary text-xs font-semibold shrink-0 mr-1.5">nmudgal@architecture:~$</span>
          <input 
            ref={inputRef}
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none text-xs font-mono text-on-surface outline-none flex-1 focus:ring-0 focus:outline-none p-0"
            placeholder="Type 'help' and press Enter..."
          />
          <CornerDownLeft size={12} className="text-outline shrink-0 ml-1.5" />
        </div>
      </div>
    </div>
  );
}
