import React, { useState } from "react";
import { 
  Send, Mail, Phone, MapPin, Copy, Check, Github, Linkedin, Code, Layers, ShieldCheck, Heart 
} from "lucide-react";

export default function ContactProtocol() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    protocolType: "General Consulting",
    payload: ""
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [sentProtocols, setSentProtocols] = useState<{ id: string; name: string; type: string; date: string }[]>([]);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.payload) {
      setFormStatus("error");
      return;
    }

    setFormStatus("submitting");
    setTimeout(() => {
      const newProtocol = {
        id: "PT-" + Math.floor(Math.random() * 9000 + 1000),
        name: formData.name,
        type: formData.protocolType,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSentProtocols(prev => [newProtocol, ...prev]);
      setFormData({
        name: "",
        email: "",
        organization: "",
        protocolType: "General Consulting",
        payload: ""
      });
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 4000);
    }, 1500);
  };

  const networkNodes = [
    { label: "Email Node", value: "3nishantmudgal@gmail.com", actionText: "COPY EMAIL" },
    { label: "Mobile Node", value: "+91 8968774126", actionText: "COPY PHONE" }
  ];

  const externalLinks = [
    { label: "GitHub Hub", link: "https://github.com/nishantmudgal", icon: <Github size={16} /> },
    { label: "LinkedIn Connect", link: "https://www.linkedin.com/in/nishant-mudgal", icon: <Linkedin size={16} /> },
    { label: "LeetCode Matrix", link: "https://leetcode.com", icon: <Code size={16} /> }
  ];

  return (
    <div className="space-y-12 text-left">
      {/* Header */}
      <div className="border-b border-outline-variant/30 pb-4">
        <span className="text-xs font-mono uppercase tracking-wider text-secondary font-semibold">Initiate Socket Protocol</span>
        <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-on-surface mt-1">
          Let's Build the Next Protocol
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left side: Secure Form Interface */}
        <div className="lg:col-span-7 bg-surface-container border border-outline-variant/60 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-2 mb-5">
            <Layers className="text-primary" size={18} />
            <h3 className="text-lg font-headline font-semibold text-on-surface">Secure Transmission Tunnel</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">Operator Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={formStatus === "submitting"}
                  className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-lg px-3 py-2 text-xs font-mono text-on-surface focus:outline-none focus:border-primary/50 disabled:opacity-50"
                  placeholder="e.g. Linus Torvalds"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">Operator Email *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={formStatus === "submitting"}
                  className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-lg px-3 py-2 text-xs font-mono text-on-surface focus:outline-none focus:border-primary/50 disabled:opacity-50"
                  placeholder="e.g. linus@kernel.org"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">Enterprise organization</label>
                <input 
                  type="text" 
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  disabled={formStatus === "submitting"}
                  className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-lg px-3 py-2 text-xs font-mono text-on-surface focus:outline-none focus:border-primary/50 disabled:opacity-50"
                  placeholder="e.g. Linux Foundation"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">Protocol Type</label>
                <select 
                  name="protocolType"
                  value={formData.protocolType}
                  onChange={handleInputChange}
                  disabled={formStatus === "submitting"}
                  className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-lg px-3 py-2 text-xs font-mono text-on-surface focus:outline-none focus:border-primary/50 cursor-pointer disabled:opacity-50"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Job Opportunity">Job Opportunity</option>
                  <option value="Freelance or Contract Work">Freelance or Contract Work</option>
                  <option value="Project Collaboration">Project Collaboration</option>
                  <option value="Portfolio Feedback">Portfolio Feedback</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">Transmission Payload *</label>
              <textarea 
                name="payload"
                rows={4}
                value={formData.payload}
                onChange={handleInputChange}
                required
                disabled={formStatus === "submitting"}
                className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-lg px-3 py-2 text-xs font-mono text-on-surface focus:outline-none focus:border-primary/50 resize-none disabled:opacity-50"
                placeholder="Include key-value structural requirements, system deadlines, or performance targets..."
              />
            </div>

            {formStatus === "error" && (
              <div className="p-3 bg-error-container/20 border border-error/30 rounded-lg text-error text-[11px] font-mono">
                Error: Essential payload fields are missing. Please complete fields marked with (*).
              </div>
            )}

            {formStatus === "success" && (
              <div className="p-3 bg-tertiary-container/20 border border-tertiary/30 rounded-lg text-tertiary text-[11px] font-mono animate-fadeIn">
                Success: Cryptographic secure payload broadcasted. Dispatch logged below.
              </div>
            )}

            <button 
              type="submit"
              disabled={formStatus === "submitting"}
              className="w-full py-2.5 bg-gradient-to-r from-primary via-primary-container to-secondary text-white hover:brightness-110 active:scale-[0.99] font-headline font-medium text-xs sm:text-sm rounded-lg transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex justify-center items-center gap-2"
            >
              {formStatus === "submitting" ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span className="font-mono">ENCRYPTING & DISPATCHING...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span className="font-mono">DISPATCH SECURE PAYLOAD</span>
                </>
              )}
            </button>
          </form>

          {/* Submitted feedback logger */}
          {sentProtocols.length > 0 && (
            <div className="mt-6 pt-5 border-t border-outline-variant/30 space-y-2">
              <span className="text-[10px] font-mono text-on-surface-variant block uppercase tracking-wider">Local Dispatch Ledger (Active Session)</span>
              <div className="space-y-1.5">
                {sentProtocols.map((p) => (
                  <div key={p.id} className="flex justify-between items-center text-xs font-mono bg-surface-container-lowest px-3 py-2 rounded-lg border border-outline-variant/20">
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-semibold">{p.id}</span>
                      <span className="text-on-surface truncate max-w-[120px]">{p.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-on-surface-variant text-[10px]">{p.type}</span>
                      <span className="text-tertiary text-[10px]">{p.date} DISPATCHED</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right side: Infrastructure Telemetry & Network Nodes */}
        <div className="lg:col-span-5 space-y-6">
          {/* Network Nodes */}
          <div className="bg-surface-container border border-outline-variant/50 rounded-2xl p-5 shadow-lg space-y-4">
            <h3 className="text-sm font-headline font-bold text-on-surface uppercase tracking-wider border-b border-outline-variant/30 pb-2">
              Direct Core Nodes
            </h3>
            
            <div className="space-y-3">
              {networkNodes.map((node) => {
                const isCopied = copiedField === node.label;
                return (
                  <div key={node.label} className="bg-surface-container-lowest border border-outline-variant/30 p-3.5 rounded-xl flex justify-between items-center text-left">
                    <div className="space-y-0.5">
                      <span className="text-[8px] uppercase font-mono tracking-wider text-outline block">
                        {node.label}
                      </span>
                      <span className="text-xs font-mono text-on-surface select-all leading-normal">
                        {node.value}
                      </span>
                    </div>

                    <button 
                      onClick={() => handleCopy(node.value, node.label)}
                      className="p-2 bg-surface-container hover:bg-surface-container-high text-primary hover:text-primary-fixed border border-outline-variant/40 rounded-lg transition-colors cursor-pointer"
                      title={node.actionText}
                    >
                      {isCopied ? <Check size={14} className="text-tertiary" /> : <Copy size={14} />}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Social connection rails */}
            <div className="pt-3 border-t border-outline-variant/30">
              <span className="text-[10px] uppercase font-mono tracking-wider text-outline block mb-2.5">Unified Integration Links</span>
              <div className="grid grid-cols-3 gap-2">
                {externalLinks.map((item) => (
                  <a 
                    key={item.label}
                    href={item.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-2.5 bg-surface-container-low border border-outline-variant/30 hover:border-primary/50 hover:bg-surface-container-high rounded-xl text-on-surface-variant hover:text-primary transition-all text-center group"
                  >
                    <div className="mb-1 text-on-surface-variant group-hover:text-primary transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-[9px] font-mono leading-none truncate max-w-full">
                      {item.label.split(" ")[0]}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Infrastructure telemetry metrics */}
          <div className="bg-surface-container border border-outline-variant/50 rounded-2xl p-5 shadow-lg text-left space-y-4">
            <h3 className="text-sm font-headline font-bold text-on-surface uppercase tracking-wider border-b border-outline-variant/30 pb-2 flex justify-between items-center">
              <span>Telemetry Matrix</span>
              <span className="text-[9px] font-mono text-tertiary">STABLE</span>
            </h3>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-surface-container-low border border-outline-variant/20 p-2.5 rounded-lg text-center">
                <span className="text-[8px] uppercase tracking-wider font-mono text-outline block">CURRENT_STATUS</span>
                <span className="text-lg font-mono font-bold text-on-surface">Open to Connect</span>
              </div>
              <div className="bg-surface-container-low border border-outline-variant/20 p-2.5 rounded-lg text-center">
                <span className="text-[8px] uppercase tracking-wider font-mono text-outline block">PHYSICAL_GRID_NODE</span>
                <span className="text-sm font-mono font-bold text-on-surface truncate block mt-1 text-tertiary">Delhi, IN (UTC+5:30)</span>
              </div>
              <div className="bg-surface-container-low border border-outline-variant/20 p-2.5 rounded-lg text-center flex flex-col justify-center">
                <span className="text-[8px] uppercase tracking-wider font-mono text-outline block">OPEN_PROTOCOLS</span>
                <span className="text-xs font-mono font-bold text-primary block">Roles · Collaborations · Tech Discussions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
