export interface Skill {
  name: string;
  category: "Frameworks" | "Performance" | "Systems" | "Languages";
  level: number; // 0-100
  details: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "Applications" | "Tools & Packages" | "Shaders/Creative";
  tags: string[];
  metrics: { label: string; value: string }[];
  highlight: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
  metrics: { label: string; value: string }[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  idCode: string;
  link?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  category: string;
  content: string; // Markdown or simple HTML
}

export interface TelemetryMetrics {
  deployments: number;
  coreVitals: {
    lcp: string;
    fid: string;
    cls: string;
  };
  serverStatus: string;
  uptime: string;
}

export const SKILLS_DATA: Skill[] = [
  { name: "React 18/19", category: "Frameworks", level: 96, details: "Concurrent rendering, Server Components, Custom Hooks, Suspense architectures" },
  { name: "TypeScript", category: "Languages", level: 95, details: "Advanced generic typing, template literal types, conditional type-guards" },
  { name: "Next.js", category: "Frameworks", level: 92, details: "App Router, incremental static regeneration (ISR), middleware, edge runtime" },
  { name: "Vite & Esbuild", category: "Performance", level: 94, details: "Custom bundler plugins, asset pipelines, split-chunk strategies" },
  { name: "CSS/Tailwind", category: "Systems", level: 95, details: "Utility-first architecture, custom design system engines, fluid layouts" },
  { name: "State Management", category: "Systems", level: 92, details: "Redux Toolkit, Zustand, Jotai, React Context optimization" },
  { name: "Performance Auditing", category: "Performance", level: 95, details: "Chrome DevTools, flame graphs, memory leak detection, LCP/INP remediation" },
  { name: "CSP & Security Headers", category: "Systems", level: 90, details: "Content Security Policy directives, JWT, XSS/CSRF mitigation strategies" },
  { name: "D3.js & Canvas API", category: "Systems", level: 88, details: "Low-latency custom data visualizations, interactive charting, math-based particle structures" },
  { name: "JavaScript (ESNext)", category: "Languages", level: 98, details: "Asynchronous loops, event loop execution contexts, proxy-based state" }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "hyperion-analytics",
    title: "Hyperion Analytics Engine",
    subtitle: "Real-time stream telemetry dashboard",
    description: "A low-latency telemetric reporting platform rendering fast timeseries data. Designed with custom D3-driven micro-charts, heavy request request bundling, and virtualized visual lists to sustain 60 FPS under intensive data feeds.",
    category: "Applications",
    tags: ["React", "TypeScript", "D3.js", "Zustand", "Performance"],
    metrics: [
      { label: "Throughput", value: "10k msg/sec" },
      { label: "Frame Rate", value: "60 FPS stable" },
      { label: "Bundle Overhead", value: "< 42KB gzip" }
    ],
    highlight: "Sustains seamless interface updates with virtualized rendering techniques during high-frequency events."
  },
  {
    id: "kinetic-wallet",
    title: "Kinetic Wallet Interface",
    subtitle: "Next-gen Web3 asset client & controller",
    description: "An elegant cryptographic wallet interface featuring simulated asset swapping, multi-chain balances, transaction queue tracing, and atomic gas cost estimates. Focuses on spatial layout, motion layout animations, and visual security feedback.",
    category: "Applications",
    tags: ["React", "Motion", "Tailwind CSS", "Web3 Sim", "UX Physics"],
    metrics: [
      { label: "Sync Latency", value: "< 140ms" },
      { label: "FPS on Transition", value: "59.8 Avg" },
      { label: "Accessibility Score", value: "100%" }
    ],
    highlight: "Uses spring physics motion vectors to render fluid cryptographic asset swapping mechanics."
  },
  {
    id: "nexus-orchestrator",
    title: "Nexus API Orchestrator",
    subtitle: "Low-overhead API compiler & client sandbox",
    description: "An interactive API compiler that allows engineers to prototype server endpoints, model payload structures, and simulate latency distribution profiles. Includes custom response-time charting and inline JSON syntax highlighting.",
    category: "Tools & Packages",
    tags: ["TypeScript", "API Compiler", "Tailwind", "Telemetry", "JSON Engine"],
    metrics: [
      { label: "Compilation Speed", value: "1.2ms" },
      { label: "Memory Footprint", value: "2.4MB" },
      { label: "Nesting Depth Support", value: "Infinite" }
    ],
    highlight: "Enables instant simulation of throttled, faulty, or optimized REST endpoints."
  },
  {
    id: "prism-shaders",
    title: "Prism Shaders & Particles",
    subtitle: "Generative math-driven canvas playground",
    description: "A creative web rendering experiment harnessing high-performance HTML5 Canvas APIs and mathematical functions to generate noise maps, gravitational orbits, and particle webs reacting to mouse vectors.",
    category: "Shaders/Creative",
    tags: ["HTML5 Canvas", "Trigonometry", "Creative Coding", "Micro-physics"],
    metrics: [
      { label: "Particle Capacity", value: "3,000 Nodes" },
      { label: "Math Computations", value: "120k/frame" },
      { label: "Render Engine", value: "Native Context2D" }
    ],
    highlight: "Translates complex trigonometric vector fields into elegant, high-frequency kinetic artwork."
  }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: "mckinsey",
    role: "Frontend Architect / Tech Lead",
    company: "McKinsey & Company",
    period: "2023 - Present",
    description: [
      "Led frontend architecture for highly critical enterprise client-facing portals, standardizing React 18 / Vite stack and reducing initial page-load times by 42%.",
      "Designed and authored an internal enterprise-wide design system featuring strict Web Content Accessibility Guidelines (WCAG) AAA compliance, type-safe theme tokens, and lightweight headless components.",
      "Established strict code quality guidelines, including automated bundle budgeting, strict CSP header configuration, and Lighthouse CI checks in Github Action pipelines.",
      "Mentored a distributed team of 10+ frontend developers, spearheading modular architecture practices and state optimization techniques to eliminate redundant component tree updates."
    ],
    skills: ["React", "TypeScript", "Vite", "Design Systems", "Web Performance", "WCAG", "CI/CD"],
    metrics: [
      { label: "Initial Load Time", value: "-42%" },
      { label: "Accessibility Audit", value: "AAA Level" },
      { label: "Team Velocity Boost", value: "+30%" }
    ]
  },
  {
    id: "idemia",
    role: "Senior Frontend Developer",
    company: "IDEMIA",
    period: "2021 - 2023",
    description: [
      "Developed secure and resilient biometric administration consoles and identity management interfaces using highly structured React and Redux systems.",
      "Integrated secure authentication protocols and client-side encryption layers, while ensuring rigorous Content Security Policies (CSP) to defend against XSS exploits.",
      "Engineered real-time data synchronization pipelines using secure persistent web sockets, managing visual state reconciliations seamlessly under low-bandwidth connections.",
      "Pioneered testing strategies across critical web modules, implementing Jest, React Testing Library, and Cypress, reaching 92% coverage across application cores."
    ],
    skills: ["React", "Redux Toolkit", "Web Security", "Jest", "Cypress", "WebSockets", "Data Sync"],
    metrics: [
      { label: "Security Incidents", value: "0" },
      { label: "Code Coverage", value: "92%" },
      { label: "Websocket Frame Latency", value: "< 15ms" }
    ]
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    idCode: "AWS-AIP-773491"
  },
  {
    name: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    date: "2023",
    idCode: "AZ900-884021"
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2022",
    idCode: "AWS-CCP-992140"
  }
];

export const BLOGS_DATA: BlogPost[] = [
  {
    id: "scaling-frontend-architecture",
    title: "Scaling Frontend Architecture in Enterprise Portals",
    summary: "A deep dive into modular designs, domain-driven folder hierarchies, federated configurations, and how to maintain compile-time type-safety across distributed software teams.",
    date: "May 15, 2024",
    readTime: "8 min read",
    category: "Architecture",
    content: `
# Scaling Frontend Architecture in Enterprise Portals

As organizations scale, their frontend platforms often devolve into rigid monoliths. Features become interlocked, deployment speeds crater, and different engineering teams accidentally override each other's visual states. 

In this article, we outline a modern architecture designed to sustain complex client portals without sacrificing development velocity.

## 1. Domain-Driven Design (DDD) in Frontend Folders
Instead of grouping files strictly by technical role (e.g., \`/components\`, \`/hooks\`, \`/services\`), structure your codebase by domain features. 

\`\`\`bash
src/
├── domains/
│   ├── identity/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts  # Clear public API contract
│   ├── telemetry/
│   └── billing/
├── shared/
│   ├── ui-kit/
│   └── utils/
\`\`\`

By enforcing a strict contract where domains can only communicate through defined entry points (\`index.ts\`), you prevent spaghetti code and make future migrations a breeze.

## 2. Enforcing Strict Type boundaries
Leverage TypeScript’s absolute imports and strict path mapping to lock down internal domain logic. Use ESLint rules to prevent developers from importing directly into the private folders of another domain.

## 3. Bundle Budgets & Performance Guards
Implement rigid bundle budgets within your compiler configurations. If any single feature bundle exceeds **50KB gzipped**, the build system should generate warning alerts or actively block the integration pipeline.
    `
  },
  {
    id: "implementing-csp-spas",
    title: "Implementing CSP in Complex SPAs",
    summary: "Securing modern single-page applications against injection vector exploits using Content Security Policy rules, nonces, and secure script-hashes without causing layout breaks.",
    date: "Feb 28, 2024",
    readTime: "6 min read",
    category: "Security",
    content: `
# Implementing CSP in Complex SPAs

Content Security Policy (CSP) is a critical defensive system designed to prevent Cross-Site Scripting (XSS) and data injection exploits. However, many developers avoid setting strict headers because it risks breaking visual layout systems or block third-party analytics trackers.

Here is the step-by-step guideline for implementing a rigid CSP that keeps your app secure and fully functional.

## The Problem: Dynamic Script Injections
Traditional SPA tools inject inline styles and dynamic script bundles on the fly. Under a secure CSP, rules like \`unsafe-inline\` and \`unsafe-eval\` must be **fully banned**.

## The Solution: Strict CSP Matrix
To secure your frontend without breaking dynamic updates:

1. **Use Nonces for Hydrated Scripts**: Generate a cryptographic cryptographically random single-use token (nonce) on the backend for each request and bind it to script tags.
2. **Hash Static Bundles**: Include SHA-256 hashes of known vendor files inside your header instructions:
   \`\`\`http
   Content-Security-Policy: default-src 'self'; script-src 'self' 'sha256-abc...'; style-src 'self' 'unsafe-hashes';
   \`\`\`
3. **Connect-src Constraints**: Explicitly white-list the exact domain API endpoints that the client-side state is allowed to query.

By enforcing these simple guards, you close the primary loops exploited by malicious browser injectors.
    `
  },
  {
    id: "logic-of-latency",
    title: "The Logic of Latency: Perceived Performance Optimization",
    summary: "Beyond raw load-time metrics, this article explores spatial design, eager layout skeletons, micro-interactions, and request queuing to make heavy applications feel instantly responsive.",
    date: "Nov 12, 2023",
    readTime: "10 min read",
    category: "Performance",
    content: `
# The Logic of Latency: Perceived Performance Optimization

If a page loads in 1.2 seconds but flashes blank screens three times, users perceive it as sluggish. Conversely, if a page takes 2 seconds but guides attention smoothly with transition physics, it feels instantaneous. 

Visual performance is about **perceived latency**, not just raw network timings.

## 1. Eliminate Cumulative Layout Shifts (CLS)
Always reserve spaces for asynchronous content using elegant skeleton blocks. A layout that shifts even slightly when an image loads causes cognitive distress to the user.

## 2. Dynamic Priority Queuing
Do not load all API feeds in parallel. Sequence them:
- **Priority 1**: Immediate visible viewport (e.g., Hero title, main visual)
- **Priority 2**: Secondary functional states (e.g., buttons, interactables)
- **Priority 3**: Below-the-fold telemetry metrics

## 3. Optimistic Visual Reconciliations
When a user toggles an option or submits a form, do not force them to wait for the network round-trip. Instantly update the client-side interface to show the successful target state, and silently resolve the action in the background. If a network failure occurs, execute a graceful, animated rollback.
    `
  }
];
