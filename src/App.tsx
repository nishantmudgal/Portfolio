import React, { useState, useEffect } from "react";
import ArchitectCore from "./components/ArchitectCore";
import CuratedArtifacts from "./components/CuratedArtifacts";
import ProfessionalTimeline from "./components/ProfessionalTimeline";
import SyntaxSteel from "./components/SyntaxSteel";
import ContactProtocol from "./components/ContactProtocol";
import Terminal from "./components/Terminal";
import { 
  Terminal as TerminalIcon, Sun, Moon, Sparkles, Layers, Briefcase, Award, Send, Cpu, Heart 
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("about");
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Apply .light class to body if light mode is selected
  useEffect(() => {
    const root = window.document.body;
    if (!isDarkMode) {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  }, [isDarkMode]);

  // Bind hotkey to open terminal (backtick or ctrl+backtick)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const renderActiveView = () => {
    switch (activeTab) {
      case "about":
        return <ArchitectCore />;
      case "projects":
        return <CuratedArtifacts />;
      case "experience":
        return <ProfessionalTimeline />;
      case "blogs":
        return <SyntaxSteel />;
      case "contact":
        return <ContactProtocol />;
      default:
        return <ArchitectCore />;
    }
  };

  const navItems = [
    { id: "about", label: "Architect Core", icon: <Cpu size={14} /> },
    { id: "projects", label: "Curated Artifacts", icon: <Layers size={14} /> },
    { id: "experience", label: "Professional Timeline", icon: <Briefcase size={14} /> },
    { id: "blogs", label: "Syntax & Steel", icon: <Award size={14} /> },
    { id: "contact", label: "Let's Build", icon: <Send size={14} /> }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-on-background transition-colors duration-300 font-sans selection:bg-primary/30">
      
      {/* Premium Header Layout */}
      <header className="sticky top-0 z-40 w-full border-b border-outline-variant/40 bg-surface/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo Name block */}
          <div className="flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary via-primary-container to-secondary flex items-center justify-center text-white shadow-lg relative group">
              <span className="font-headline font-bold text-sm select-none">NM</span>
              {/* Pulse circle status */}
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary" />
              </span>
            </div>
            <div>
              <h1 className="font-headline font-bold text-base tracking-tight text-on-surface">
                Nishant Mudgal
              </h1>
              <p className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-medium">
                Frontend Architect / UI Engineer
              </p>
            </div>
          </div>

          {/* Desktop Navigation Link rails */}
          <nav className="flex flex-wrap items-center gap-1 sm:gap-2 justify-center md:justify-end">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive 
                      ? "bg-primary/25 text-primary border-primary/40 shadow-sm" 
                      : "bg-surface-container-low border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container-high/80 text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Utility control triggers */}
            <div className="flex items-center gap-1.5 ml-2 border-l border-outline-variant/40 pl-2">
              {/* Terminal query trigger */}
              <button 
                onClick={() => setIsTerminalOpen(true)}
                className="p-1.5 bg-surface-container-low border border-outline-variant/30 hover:border-primary/40 hover:bg-surface-container-high rounded-lg text-primary transition-colors cursor-pointer"
                title="Trigger Command Console [ ` ]"
              >
                <TerminalIcon size={14} />
              </button>

              {/* Theme toggle switch */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-1.5 bg-surface-container-low border border-outline-variant/30 hover:border-outline hover:bg-surface-container-high rounded-lg text-secondary transition-colors cursor-pointer"
                title={isDarkMode ? "Enable Light Mode" : "Enable Dark Mode"}
              >
                {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Core View Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 md:py-12 animate-fadeIn">
        {renderActiveView()}
      </main>

      {/* Floating command prompt tip */}
      <div className="fixed bottom-4 right-4 z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 bg-surface-container-high/90 border border-outline-variant/50 rounded-lg text-[10px] font-mono text-on-surface-variant shadow-lg backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span>Press <kbd className="bg-surface px-1 py-0.5 rounded border border-outline-variant/40">`</kbd> to launch shell console</span>
      </div>

      {/* Footnote */}
      <footer className="border-t border-outline-variant/30 bg-surface-container-lowest/60 py-6 text-center text-xs text-on-surface-variant">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-mono text-[10px]">
            © {new Date().getFullYear()} NISHANT MUDGAL. ALL CONTRACTS SECURED.
          </p>
          <div className="flex items-center gap-1 text-[10px] font-mono">
            <span>SCULPTED IN REACT 19</span>
            <Heart size={10} className="text-error animate-pulse" />
            <span>& TAILWIND CSS v4</span>
          </div>
        </div>
      </footer>

      {/* Floating Developer Terminal Console Overlay */}
      {isTerminalOpen && (
        <Terminal 
          onClose={() => setIsTerminalOpen(false)} 
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  );
}
