import React, { useState } from "react";
import { BLOGS_DATA, CERTIFICATIONS_DATA, BlogPost } from "../types";
import { 
  BookOpen, Calendar, Clock, Award, ChevronRight, X, Sparkles, AlertCircle, FileText, CheckCircle2 
} from "lucide-react";

export default function SyntaxSteel() {
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);

  // Helper to render markdown headings and sections beautifully inside the modal
  const renderBlogContent = (text: string) => {
    return text.split("\n").map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("# ")) {
        return (
          <h2 key={idx} className="text-xl sm:text-2xl font-headline font-semibold text-on-surface mt-6 mb-3">
            {trimmed.substring(2)}
          </h2>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h3 key={idx} className="text-base sm:text-lg font-headline font-semibold text-on-surface mt-5 mb-2.5">
            {trimmed.substring(3)}
          </h3>
        );
      }
      if (trimmed.startsWith("- ")) {
        return (
          <li key={idx} className="text-xs sm:text-sm text-on-surface-variant font-sans list-disc list-inside ml-4 mb-1.5">
            {trimmed.substring(2)}
          </li>
        );
      }
      if (trimmed.startsWith("```")) {
        if (trimmed === "```" || trimmed === "```bash" || trimmed === "```http") {
          return null; // Ignore opening/closing code tags
        }
        return (
          <pre key={idx} className="bg-surface-container-lowest border border-outline-variant/40 p-3 rounded-lg font-mono text-xs text-on-surface-variant overflow-x-auto my-3 leading-relaxed">
            <code>{trimmed.replace(/```/g, "")}</code>
          </pre>
        );
      }
      if (trimmed === "") {
        return <div key={idx} className="h-3" />;
      }
      return (
        <p key={idx} className="text-xs sm:text-sm text-on-surface-variant font-sans leading-relaxed mb-3">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="space-y-12 text-left">
      {/* Tab Header */}
      <div className="border-b border-outline-variant/30 pb-4">
        <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">Syntax & Steel</span>
        <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-on-surface mt-1">
          Blogs & Certifications
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left columns: Technical articles / blogs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="text-primary" size={18} />
            <h3 className="text-lg font-headline font-semibold text-on-surface">Architectural Ledger</h3>
          </div>

          <div className="space-y-4">
            {BLOGS_DATA.map((blog) => (
              <div 
                key={blog.id}
                onClick={() => setActiveBlog(blog)}
                className="p-5 bg-surface-container border border-outline-variant/50 rounded-xl hover:border-outline transition-all cursor-pointer group text-left relative overflow-hidden"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono text-primary uppercase bg-primary/10 px-2 py-0.5 border border-primary/25 rounded">
                    {blog.category}
                  </span>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-outline">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {blog.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {blog.readTime}</span>
                  </div>
                </div>

                <h4 className="text-base font-headline font-semibold text-on-surface group-hover:text-primary transition-colors mt-2 mb-1">
                  {blog.title}
                </h4>
                <p className="text-xs text-on-surface-variant font-sans leading-relaxed line-clamp-2">
                  {blog.summary}
                </p>

                <div className="mt-4 flex items-center gap-1 text-[10px] font-mono text-primary font-semibold group-hover:gap-2 transition-all">
                  <span>READ ARCHITECTURAL ANALYSIS</span>
                  <ChevronRight size={11} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right columns: Certifications list */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Award className="text-secondary" size={18} />
            <h3 className="text-lg font-headline font-semibold text-on-surface">Verified Credentials</h3>
          </div>

          <div className="space-y-3">
            {CERTIFICATIONS_DATA.map((cert) => (
              <div 
                key={cert.idCode} 
                className="p-4 bg-surface-container-low border border-outline-variant/40 rounded-xl flex items-start gap-3 text-left hover:border-outline-variant transition-colors"
              >
                <div className="p-2 bg-surface-container border border-outline-variant/60 rounded-lg text-secondary shrink-0 mt-0.5">
                  <Award size={18} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-headline font-semibold text-on-surface leading-tight">
                    {cert.name}
                  </h4>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-[10px] font-mono text-on-surface-variant">
                    <span>{cert.issuer}</span>
                    <span className="hidden sm:inline text-outline">•</span>
                    <span>Issued {cert.date}</span>
                  </div>
                  <div className="text-[9px] font-mono text-outline uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 size={10} className="text-tertiary" />
                    <span>ID_CODE: {cert.idCode}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-surface-container-high/40 rounded-xl border border-outline-variant/30 flex gap-2.5 items-start mt-6">
            <Sparkles size={16} className="text-tertiary shrink-0 mt-0.5" />
            <p className="text-[10px] font-mono text-on-surface-variant leading-relaxed">
              All credentials are fully registered in AWS and Microsoft learning indexes. Standard verification ID keys are provided inline for transparent audits.
            </p>
          </div>
        </div>
      </div>

      {/* Full screen blog read modal */}
      {activeBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-3xl bg-surface-container border border-outline rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[85vh]">
            {/* Modal header */}
            <div className="px-6 py-4 bg-surface-container-high border-b border-outline-variant/60 flex justify-between items-center text-left">
              <div>
                <span className="text-[10px] font-mono text-primary uppercase tracking-wider block">
                  {activeBlog.category} ANALYSIS LOG
                </span>
                <h3 className="text-sm sm:text-base font-headline font-semibold text-on-surface truncate max-w-lg">
                  {activeBlog.title}
                </h3>
              </div>
              <button 
                onClick={() => setActiveBlog(null)}
                className="p-1.5 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal content body */}
            <div className="p-6 overflow-y-auto flex-1 text-left select-text bg-surface-container-lowest">
              <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-outline border-b border-outline-variant/20 pb-4 mb-4">
                <span>By Nishant Mudgal</span>
                <span>•</span>
                <span>Published: {activeBlog.date}</span>
                <span>•</span>
                <span>Reading Time: {activeBlog.readTime}</span>
              </div>
              
              <div className="prose prose-invert max-w-none text-left">
                {renderBlogContent(activeBlog.content)}
              </div>
            </div>

            {/* Modal footer feedback banner */}
            <div className="px-6 py-3 bg-surface-container-low border-t border-outline-variant/30 flex justify-between items-center text-xs text-on-surface-variant">
              <span className="font-mono text-[10px]">VERIFIED ARCHITECTURAL ENTRY</span>
              <button 
                onClick={() => setActiveBlog(null)}
                className="px-3 py-1 bg-surface-container border border-outline-variant rounded-lg hover:bg-surface-container-highest transition-colors font-mono text-[10px] cursor-pointer"
              >
                CLOSE ENTRY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
