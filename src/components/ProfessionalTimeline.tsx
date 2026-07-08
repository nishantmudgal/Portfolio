import React, { useState } from "react";
import { EXPERIENCE_DATA } from "../types";
import { PerformanceTuningSimulator } from "./InteractiveWidget";
import { 
  Building2, Briefcase, Calendar, CheckSquare, Sparkles, TrendingUp, Cpu, Award 
} from "lucide-react";

export default function ProfessionalTimeline() {
  const [activeExperienceId, setActiveExperienceId] = useState<string>("mckinsey");

  return (
    <div className="space-y-10 text-left">
      {/* Overview stats header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-secondary font-semibold">Professional History</span>
          <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-on-surface mt-1">
            Professional Timeline
          </h2>
        </div>

        {/* Quick high level summary */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-tertiary" />
            <div className="text-xs font-mono">
              <span className="text-on-surface-variant block uppercase text-[9px]">Average Load Reduction</span>
              <span className="text-on-surface font-semibold">-42% Page Timing</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Award size={16} className="text-primary" />
            <div className="text-xs font-mono">
              <span className="text-on-surface-variant block uppercase text-[9px]">Design Standards</span>
              <span className="text-on-surface font-semibold">WCAG AAA Compliance</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Timeline tracker list */}
        <div className="lg:col-span-6 space-y-6">
          <div className="relative border-l-2 border-outline-variant/40 ml-4 pl-6 space-y-8">
            {EXPERIENCE_DATA.map((exp) => {
              const isActive = activeExperienceId === exp.id;
              return (
                <div 
                  key={exp.id}
                  className="relative group cursor-pointer"
                  onClick={() => setActiveExperienceId(exp.id)}
                >
                  {/* Timeline indicator node */}
                  <span className={`absolute -left-[31px] top-1.5 flex items-center justify-center w-4 h-4 rounded-full border transition-all ${
                    isActive 
                      ? "bg-primary border-primary ring-4 ring-primary/20 scale-125" 
                      : "bg-surface border-outline group-hover:border-primary"
                  }`} />

                  <div className={`p-5 bg-surface-container border rounded-xl transition-all ${
                    isActive 
                      ? "border-primary shadow-md" 
                      : "border-outline-variant/50 hover:border-outline-variant"
                  }`}>
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <div>
                        <h3 className="text-base font-headline font-semibold text-on-surface group-hover:text-primary transition-colors flex items-center gap-2">
                          {exp.role}
                        </h3>
                        <div className="text-xs font-semibold text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                          <Building2 size={13} className="text-outline" />
                          <span>{exp.company}</span>
                        </div>
                      </div>

                      <div className="text-[10px] font-mono text-outline flex items-center gap-1 bg-surface-container-high px-2 py-0.5 border border-outline-variant/30 rounded">
                        <Calendar size={11} />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Short excerpt / expanded points */}
                    <div className="space-y-2.5 mt-4">
                      {exp.description.map((desc, idx) => (
                        <div key={idx} className="flex gap-2 items-start text-xs text-on-surface-variant">
                          <CheckSquare size={13} className="text-primary shrink-0 mt-0.5" />
                          <p className="leading-relaxed font-sans">{desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Skill tags list */}
                    <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-outline-variant/20">
                      {exp.skills.map((s, idx) => (
                        <span key={idx} className="text-[9px] font-mono text-on-surface px-2 py-0.5 bg-surface-container-high border border-outline-variant/30 rounded">
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Achievements row */}
                    <div className="grid grid-cols-3 gap-2.5 mt-4 pt-3 border-t border-outline-variant/20">
                      {exp.metrics.map((m, idx) => (
                        <div key={idx} className="bg-surface-container-lowest/70 border border-outline-variant/20 p-2 rounded">
                          <span className="text-[8px] uppercase tracking-wider text-outline font-mono block">
                            {m.label}
                          </span>
                          <span className="text-xs font-mono font-medium text-tertiary">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: Embed interactive bundle size optimizer simulator */}
        <div className="lg:col-span-6 lg:sticky lg:top-24">
          <PerformanceTuningSimulator />
        </div>
      </div>
    </div>
  );
}
