import React, { useState } from "react";
import { SKILLS_DATA } from "../types";
import { 
  Terminal, ShieldCheck, Cpu, Layers, Sparkles, Code, CheckCircle, ArrowRight, Lightbulb 
} from "lucide-react";
import { motion } from "motion/react";

export default function ArchitectCore() {
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>("All");
  const [activeSpecialization, setActiveSpecialization] = useState<string | null>(null);

  const categories = ["All", "Frameworks", "Languages", "Performance", "Systems"];

  const filteredSkills = selectedSkillCategory === "All" 
    ? SKILLS_DATA 
    : SKILLS_DATA.filter(skill => skill.category === selectedSkillCategory);

  const specializations = [
    {
      id: "components",
      title: "Component Systems",
      icon: <Layers className="text-primary" size={20} />,
      tagline: "Atomic layout modules conforming strictly to WCAG guidelines.",
      description: "My component systems feature strict accessibility (ARIA attributes), headless structural controllers, fluid modular padding spacing, and type-safe CSS custom parameter hydration.",
      achievement: "Built system supporting 40+ dynamic pages with consistent 100% lighthouse compliance score."
    },
    {
      id: "performance",
      title: "Performance Tuning",
      icon: <Cpu className="text-tertiary" size={20} />,
      tagline: "Reducing Largest Contentful Paint (LCP) down to absolute thresholds.",
      description: "My optimization stack applies dynamic route-splitting chunks, synchronous preload assets, image asset pipeline optimizations, and elimination of rendering recalculation states.",
      achievement: "Restructured legacy corporate portals to decrease average client initial render speeds by 42%."
    },
    {
      id: "state",
      title: "State Architecture",
      icon: <ShieldCheck className="text-secondary" size={20} />,
      tagline: "Predictable, multi-layer reactive data coordination.",
      description: "I construct transactional event cycles using atomic models (Zustand, Redux Toolkit) to coordinate web sockets, client persistence tables, and secure local cache schemas.",
      achievement: "Reduced frame stutter rate to 0 under high-frequency asynchronous state updates."
    }
  ];

  return (
    <div className="space-y-12">
      {/* Intro section with premium styling */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        {/* Bio text column */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-full">
            <Sparkles size={12} className="text-primary animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-semibold">Architectural Core Node</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-headline font-semibold tracking-tight text-on-surface leading-tight">
            Engineering High-Contrast <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
              Kinetic Web Platforms
            </span>
          </h1>

          <p className="text-base text-on-surface-variant leading-relaxed font-sans max-w-xl">
            I am a Frontend Architect & UI Engineer with 5+ years of experience sculpting type-safe, resilient single-page portals. My work centers on performance pipelines, accessible components, and modular client-side state managers.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <div className="flex items-center gap-2 px-3.5 py-2 bg-surface-container-low border border-outline-variant/40 rounded-lg text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
              <span>5+ Years Industry Experience</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 bg-surface-container-low border border-outline-variant/40 rounded-lg text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Bengaluru, India (UTC +5:30)</span>
            </div>
          </div>
        </div>

        {/* Dynamic Vector Avatar Visual Column */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-72 h-72 rounded-2xl border border-outline-variant/60 bg-surface-container-low flex items-center justify-center overflow-hidden p-6 shadow-xl group">
            {/* Background glowing grid effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d_1px,transparent_1px),linear-gradient(to_bottom,#1f293d_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
            
            {/* Ambient dynamic accent circles */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/10 blur-3xl group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-secondary/10 blur-3xl group-hover:scale-125 transition-transform duration-700" />

            {/* Stylized Avatar Frame with Code Vectors */}
            <div className="relative z-10 w-44 h-44 rounded-full border border-primary/30 bg-surface-container-lowest/80 p-1 flex items-center justify-center shadow-lg">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-surface-bright to-surface-dim flex flex-col items-center justify-center relative overflow-hidden group-hover:border group-hover:border-primary/40 transition-all">
                {/* Visual Math Lattice */}
                <div className="absolute inset-0 flex items-center justify-center opacity-25">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" className="animate-spin" style={{ animationDuration: "40s" }}>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="text-secondary" />
                    <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 2" className="text-tertiary" />
                  </svg>
                </div>
                
                {/* Elegant initials */}
                <span className="text-3xl font-headline font-bold text-on-surface tracking-wider">
                  NM
                </span>
                <span className="text-[10px] font-mono text-primary font-medium tracking-wide uppercase mt-1">
                  {"<FRONTEND>"}
                </span>
              </div>
            </div>

            {/* Outer coordinate labels */}
            <div className="absolute top-3 left-4 text-[9px] font-mono text-outline">
              LATENCY_THRESHOLD: 100ms
            </div>
            <div className="absolute bottom-3 right-4 text-[9px] font-mono text-outline">
              COMPILER: VITE_ESBUILD
            </div>
          </div>
        </div>
      </section>

      {/* Specialization Bento Section */}
      <section className="space-y-6">
        <div className="text-left">
          <span className="text-xs font-mono uppercase tracking-wider text-secondary font-semibold">Specialization Areas</span>
          <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-on-surface mt-1">
            Structural Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specializations.map((spec) => (
            <div 
              key={spec.id}
              onClick={() => setActiveSpecialization(activeSpecialization === spec.id ? null : spec.id)}
              className={`bg-surface-container border p-5 rounded-xl text-left transition-all duration-300 cursor-pointer relative overflow-hidden ${
                activeSpecialization === spec.id 
                  ? "border-primary ring-1 ring-primary/40 shadow-lg translate-y-[-2px]" 
                  : "border-outline-variant/60 hover:border-outline hover:translate-y-[-1px] shadow"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 bg-surface-container-high border border-outline-variant/60 rounded-lg">
                  {spec.icon}
                </div>
                <span className="text-[9px] font-mono text-outline uppercase tracking-wider">
                  {activeSpecialization === spec.id ? "EXPANDED" : "TAP TO READ"}
                </span>
              </div>

              <h3 className="text-base font-headline font-medium text-on-surface mb-1">
                {spec.title}
              </h3>
              <p className="text-xs text-on-surface-variant font-sans leading-relaxed mb-3">
                {spec.tagline}
              </p>

              {/* Collapsible deep dive details */}
              <div className={`transition-all duration-300 overflow-hidden ${
                activeSpecialization === spec.id ? "max-h-48 opacity-100 mt-4 pt-4 border-t border-outline-variant/30" : "max-h-0 opacity-0"
              }`}>
                <p className="text-xs text-on-surface-variant leading-relaxed font-sans mb-3">
                  {spec.description}
                </p>
                <div className="bg-surface-container-low p-2 rounded border border-outline-variant/20 flex gap-1.5 items-start">
                  <Lightbulb size={12} className="text-tertiary shrink-0 mt-0.5" />
                  <p className="text-[10px] font-mono text-on-surface leading-normal">
                    <span className="font-semibold text-tertiary">Outcome:</span> {spec.achievement}
                  </p>
                </div>
              </div>

              {/* Decorative side accent */}
              <div className={`absolute top-0 bottom-0 left-0 w-1 transition-all ${
                spec.id === "components" ? "bg-primary" : spec.id === "performance" ? "bg-tertiary" : "bg-secondary"
              }`} />
            </div>
          ))}
        </div>
      </section>

      {/* Syntactic Stack Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-outline-variant/30 pb-4 text-left">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-tertiary font-semibold">Engine Components</span>
            <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-on-surface mt-1">
              Syntactic Stack
            </h2>
          </div>
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedSkillCategory(cat)}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  selectedSkillCategory === cat 
                    ? "bg-primary/20 text-primary border-primary/40" 
                    : "bg-surface-container-high border-outline-variant/55 hover:border-outline text-on-surface-variant"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map((skill) => (
            <div 
              key={skill.name}
              className="bg-surface-container p-4 border border-outline-variant/40 rounded-xl flex flex-col justify-between hover:border-outline-variant transition-colors text-left"
            >
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-headline font-medium text-on-surface flex items-center gap-1.5">
                    <Code size={14} className="text-primary" />
                    {skill.name}
                  </h4>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant border border-outline-variant/30 rounded">
                    {skill.category.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                  {skill.details}
                </p>
              </div>

              {/* Progress visual indicator */}
              <div className="mt-3.5 space-y-1">
                <div className="flex justify-between text-[9px] font-mono text-outline">
                  <span>SYSTEM_PROB_LEVEL</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
