import React, { useState } from "react";
import { PROJECTS_DATA } from "../types";
import { 
  HyperionDemo, WalletDemo, NexusDemo, PrismCanvasDemo 
} from "./InteractiveWidget";
import { 
  Sparkles, Layers, Terminal, ChevronRight, Play, ExternalLink, RefreshCw, BarChart2 
} from "lucide-react";

export default function CuratedArtifacts() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProjectDemo, setActiveProjectDemo] = useState<string>("hyperion-analytics");

  const categories = ["All", "Applications", "Tools & Packages", "Shaders/Creative"];

  const filteredProjects = selectedCategory === "All"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === selectedCategory);

  const renderActiveDemo = () => {
    switch (activeProjectDemo) {
      case "hyperion-analytics":
        return <HyperionDemo />;
      case "kinetic-wallet":
        return <WalletDemo />;
      case "nexus-orchestrator":
        return <NexusDemo />;
      case "prism-shaders":
        return <PrismCanvasDemo />;
      default:
        return <HyperionDemo />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left border-b border-outline-variant/30 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">Curated Code Artifacts</span>
          <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-on-surface mt-1">
            Production-Grade Assemblies
          </h2>
          <p className="text-xs text-on-surface-variant font-sans mt-1">
            Click on any artifact to launch its live simulation in the dynamic playground.
          </p>
        </div>

        {/* Filter list */}
        <div className="flex flex-wrap gap-1.5 shrink-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                selectedCategory === cat 
                  ? "bg-primary/20 text-primary border-primary/40" 
                  : "bg-surface-container-high border-outline-variant/65 hover:border-outline text-on-surface-variant"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main split dashboard view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left side: Project grid cards */}
        <div className="lg:col-span-6 space-y-4">
          {filteredProjects.map((proj) => {
            const isActive = activeProjectDemo === proj.id;
            return (
              <div 
                key={proj.id}
                onClick={() => setActiveProjectDemo(proj.id)}
                className={`p-5 bg-surface-container border rounded-xl text-left transition-all cursor-pointer relative group ${
                  isActive 
                    ? "border-primary ring-1 ring-primary/40 shadow-lg" 
                    : "border-outline-variant/50 hover:border-outline-variant hover:bg-surface-container/85"
                }`}
              >
                <div className="flex justify-between items-start mb-2.5">
                  <div>
                    <span className="text-[10px] font-mono text-primary font-semibold uppercase tracking-wider block mb-0.5">
                      {proj.category.toUpperCase()}
                    </span>
                    <h3 className="text-base font-headline font-semibold text-on-surface group-hover:text-primary transition-colors">
                      {proj.title}
                    </h3>
                  </div>

                  <span className={`text-[10px] font-mono rounded px-1.5 py-0.5 border ${
                    isActive 
                      ? "bg-primary/10 text-primary border-primary/20" 
                      : "bg-surface-container-high text-on-surface-variant border-outline-variant/40"
                  }`}>
                    {isActive ? "ACTIVE SANDBOX" : "PLAY DEMO"}
                  </span>
                </div>

                <p className="text-xs text-on-surface-variant font-sans leading-relaxed mb-4">
                  {proj.description}
                </p>

                {/* Performance stats bento block */}
                <div className="grid grid-cols-3 gap-2.5 mb-4">
                  {proj.metrics.map((m, idx) => (
                    <div key={idx} className="bg-surface-container-lowest border border-outline-variant/30 p-2 rounded">
                      <span className="text-[8px] uppercase tracking-wider text-outline font-mono block">
                        {m.label}
                      </span>
                      <span className="text-xs font-mono font-medium text-on-surface">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tags.map((t, idx) => (
                    <span key={idx} className="text-[9px] font-mono text-on-surface-variant px-1.5 py-0.5 bg-surface-container-high/70 border border-outline-variant/20 rounded">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="text-[10px] text-on-surface-variant font-mono leading-relaxed border-t border-outline-variant/20 pt-2.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0" />
                  <span>{proj.highlight}</span>
                </div>

                {/* Slide index helper */}
                <div className={`absolute top-0 bottom-0 left-0 w-1 transition-all ${
                  isActive ? "bg-primary" : "bg-transparent"
                }`} />
              </div>
            );
          })}
        </div>

        {/* Right side: Active interactive simulation terminal panel */}
        <div className="lg:col-span-6 lg:sticky lg:top-24">
          <div className="border border-outline-variant rounded-2xl overflow-hidden bg-surface-container-low shadow-xl">
            {/* Simulation console header */}
            <div className="px-4 py-3 bg-surface-container border-b border-outline-variant/50 flex justify-between items-center text-left">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary" />
                </span>
                <span className="text-xs uppercase font-mono tracking-wider font-semibold text-on-surface">
                  Interactive Lab Environment
                </span>
              </div>
              <span className="text-[10px] font-mono text-outline uppercase">
                NODE_PORT: 3000
              </span>
            </div>

            {/* Injected simulator workspace */}
            <div className="p-4 bg-surface-container-lowest">
              {renderActiveDemo()}
            </div>

            {/* Quick architectural footer notes */}
            <div className="px-4 py-3 bg-surface-container-low text-xs text-on-surface-variant/80 text-left border-t border-outline-variant/30 flex items-start gap-2 font-mono">
              <span className="text-secondary select-none font-bold">INFO:</span>
              <p className="text-[10px] leading-relaxed">
                This playground runs native React client state engines and real HTML5 canvas particle buffers to demonstrate performance optimization under high loads.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
