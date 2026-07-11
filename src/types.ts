export interface Skill {
  name: string;
  category:
    | "Languages"
    | "Frontend"
    | "Backend & APIs"
    | "Testing & Quality"
    | "DevOps & Tools"
    | "AI-Assisted Development"
    | "Core Skills";
  level: number; // 1-5
  details: string;
}

export const SKILL_CATEGORIES = [
  "Languages",
  "Frontend",
  "Backend & APIs",
  "Testing & Quality",
  "DevOps & Tools",
  "AI-Assisted Development",
  "Core Skills",
] as const;

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
  // Languages
  { name: "JavaScript", category: "Languages", level: 5, details: "ESNext features, async patterns, event loop, and modern module systems" },
  { name: "TypeScript", category: "Languages", level: 5, details: "Strict typing, generics, utility types, and type-safe API contracts" },
  { name: "HTML5", category: "Languages", level: 5, details: "Semantic markup, ARIA roles, and accessible document structure" },
  { name: "CSS3", category: "Languages", level: 5, details: "Layout systems, animations, custom properties, and responsive design" },
  { name: "SCSS", category: "Languages", level: 4, details: "Variables, mixins, nesting, and modular stylesheet architecture" },
  { name: "C++", category: "Languages", level: 3, details: "Object-oriented programming and algorithmic problem solving" },
  { name: "Python", category: "Languages", level: 3, details: "Scripting, automation, and data processing workflows" },
  { name: "SQL", category: "Languages", level: 4, details: "Query optimization, joins, and relational data modeling" },

  // Frontend
  { name: "React.js", category: "Frontend", level: 5, details: "Component architecture, hooks, concurrent features, and state patterns" },
  { name: "Next.js", category: "Frontend", level: 5, details: "App Router, SSR/SSG, middleware, and edge-ready deployments" },
  { name: "Redux", category: "Frontend", level: 4, details: "Predictable state containers, middleware, and normalized store design" },
  { name: "Responsive UI", category: "Frontend", level: 5, details: "Fluid layouts, breakpoint strategies, and mobile-first interfaces" },
  { name: "Design Systems", category: "Frontend", level: 5, details: "Token-driven themes, reusable components, and documentation standards" },
  { name: "Accessibility (WCAG)", category: "Frontend", level: 5, details: "Keyboard navigation, screen reader support, and compliance auditing" },
  { name: "JAMstack", category: "Frontend", level: 4, details: "Static generation, CDN delivery, and decoupled frontend architectures" },

  // Backend & APIs
  { name: "GraphQL", category: "Backend & APIs", level: 4, details: "Schema design, query optimization, and client-side data fetching" },
  { name: "REST APIs", category: "Backend & APIs", level: 5, details: "Resource modeling, versioning, error handling, and integration patterns" },
  { name: "Sitecore CMS", category: "Backend & APIs", level: 3, details: "Headless content delivery and component-driven page authoring" },
  { name: "API Integration", category: "Backend & APIs", level: 5, details: "Third-party services, auth flows, and resilient client-side orchestration" },

  // Testing & Quality
  { name: "Jest", category: "Testing & Quality", level: 4, details: "Unit test suites, mocking strategies, and snapshot testing" },
  { name: "React Testing Library", category: "Testing & Quality", level: 4, details: "User-centric component tests and accessibility-first assertions" },
  { name: "Unit Testing", category: "Testing & Quality", level: 4, details: "Test-driven development and isolated module verification" },
  { name: "Lighthouse", category: "Testing & Quality", level: 5, details: "Performance, accessibility, and SEO audits with actionable remediation" },
  { name: "Chrome DevTools", category: "Testing & Quality", level: 5, details: "Profiling, network analysis, memory inspection, and debugging workflows" },
  { name: "Code Reviews", category: "Testing & Quality", level: 5, details: "Quality gates, architectural feedback, and team knowledge sharing" },

  // DevOps & Tools
  { name: "Git", category: "DevOps & Tools", level: 5, details: "Branching strategies, rebasing, and collaborative version control" },
  { name: "GitHub Actions", category: "DevOps & Tools", level: 4, details: "Automated pipelines, build workflows, and deployment triggers" },
  { name: "CI/CD", category: "DevOps & Tools", level: 4, details: "Continuous integration, automated testing, and release automation" },
  { name: "Docker", category: "DevOps & Tools", level: 3, details: "Containerized environments and reproducible build configurations" },
  { name: "Storybook", category: "DevOps & Tools", level: 4, details: "Isolated component development, visual testing, and design documentation" },

  // AI-Assisted Development
  { name: "GitHub Copilot", category: "AI-Assisted Development", level: 4, details: "Inline code suggestions and accelerated boilerplate generation" },
  { name: "Cursor", category: "AI-Assisted Development", level: 5, details: "AI-powered IDE workflows for rapid iteration and codebase exploration" },
  { name: "AI-Assisted Debugging", category: "AI-Assisted Development", level: 4, details: "Root-cause analysis and error resolution with LLM-assisted tooling" },
  { name: "AI-Assisted Refactoring", category: "AI-Assisted Development", level: 4, details: "Safe code transformations and pattern modernization at scale" },
  { name: "AI-Assisted Test Creation", category: "AI-Assisted Development", level: 4, details: "Automated test scaffolding and coverage expansion with AI guidance" },

  // Core Skills
  { name: "Frontend Architecture", category: "Core Skills", level: 5, details: "Modular system design, domain boundaries, and scalable UI foundations" },
  { name: "Performance Optimization", category: "Core Skills", level: 5, details: "Core Web Vitals tuning, bundle reduction, and render path optimization" },
  { name: "Code Splitting", category: "Core Skills", level: 5, details: "Lazy loading, dynamic imports, and route-based chunk strategies" },
  { name: "Caching", category: "Core Skills", level: 4, details: "Browser cache policies, service workers, and stale-while-revalidate patterns" },
  { name: "System Design", category: "Core Skills", level: 4, details: "End-to-end frontend system planning and integration architecture" },
  { name: "Agile/Scrum", category: "Core Skills", level: 4, details: "Sprint planning, iterative delivery, and cross-functional collaboration" },
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
    role: "Software Engineer",
    company: "McKinsey & Company",
    period: "June 2022 - July 2026",
    description: ["Built and maintained digital experiences used by millions of people globally, using React.js, Next.js, TypeScript, JavaScript, GraphQL, SCSS, and Sitecore.", "Modernized older parts of the platform by simplifying frontend patterns, improving existing code, and making features easier to maintain, reuse, and extend.", "Created reusable UI components and flexible page modules that helped engineering teams build faster while allowing content teams to manage digital experiences with fewer code changes.", "Improved navigation and usability across desktop, tablet, and mobile while making interfaces more inclusive through semantic HTML, keyboard-friendly interactions, responsive layouts, and WCAG-aligned accessibility practices.", "Developed polished animations and interface interactions using GSAP and SCSS while improving performance through lazy loading, bundle optimization, and efficient rendering.", "Helped maintain a secure and reliable platform by resolving dependency vulnerabilities, supporting security improvements, and investigating critical production issues.", "Used GitHub Copilot, Cursor, and other AI-assisted workflows for development, debugging, refactoring, documentation, and test creation while carefully reviewing and validating every change.", "Maintained software quality through automated testing, peer reviews, continuous integration checks, and strong test coverage across supported frontend modules."],
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "GraphQL",
      "SCSS",
      "Design Systems",
      "Accessibility",
      "Web Performance",
      "GitHub Actions",
      "AI-Assisted Development"
    ],
    metrics: [
      { label: "Monthly Users", value: "5M+" },
      { label: "Accessibility Standards", value: "WCAG AA compliant" },
      { label: "Test Coverage", value: "95%+" }
    ]
  },
  {
    id: "idemia",
    role: "Software Engineer",
    company: "IDEMIA",
    period: "Jan 2018 - Sept 2019",
    description: [
      "Developed production-grade firmware for biometric access-control systems using C++, Linux, and embedded-system technologies, supporting reliable device authentication and access-control workflows.",
      "Built secure browser-based interfaces for enterprise security platforms using JavaScript and HTML, while debugging device-level issues and contributing to improvements in overall system reliability."
    ],
    skills: [
      "C++",
      "Linux",
      "Embedded Systems",
      "JavaScript",
      "HTML",
      "Firmware Development",
      "Biometric Systems",
      "Device Debugging"
    ],
    metrics: [
      { label: "Primary Domain", value: "Biometric Security" },
      { label: "System Layer", value: "Embedded Firmware" },
      { label: "Interface Stack", value: "JavaScript / HTML" }
    ]
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    date: "Lifetime",
    idCode: "5EC8909AA6DC28A0"
  },
  {
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services (AWS)",
    date: "2026 - 2029",
    idCode: "6b326e7e4c2b4084b0467b2b5c8d593a"
  }
];

export const BLOGS_DATA: BlogPost[] = [
//   {
//     id: "scaling-frontend-architecture",
//     title: "Scaling Frontend Architecture in Enterprise Portals",
//     summary: "A deep dive into modular designs, domain-driven folder hierarchies, federated configurations, and how to maintain compile-time type-safety across distributed software teams.",
//     date: "May 15, 2024",
//     readTime: "8 min read",
//     category: "Architecture",
//     content: `
// # Scaling Frontend Architecture in Enterprise Portals

// As organizations scale, their frontend platforms often devolve into rigid monoliths. Features become interlocked, deployment speeds crater, and different engineering teams accidentally override each other's visual states. 

// In this article, we outline a modern architecture designed to sustain complex client portals without sacrificing development velocity.

// ## 1. Domain-Driven Design (DDD) in Frontend Folders
// Instead of grouping files strictly by technical role (e.g., \`/components\`, \`/hooks\`, \`/services\`), structure your codebase by domain features. 

// \`\`\`bash
// src/
// ├── domains/
// │   ├── identity/
// │   │   ├── components/
// │   │   ├── hooks/
// │   │   └── index.ts  # Clear public API contract
// │   ├── telemetry/
// │   └── billing/
// ├── shared/
// │   ├── ui-kit/
// │   └── utils/
// \`\`\`

// By enforcing a strict contract where domains can only communicate through defined entry points (\`index.ts\`), you prevent spaghetti code and make future migrations a breeze.

// ## 2. Enforcing Strict Type boundaries
// Leverage TypeScript’s absolute imports and strict path mapping to lock down internal domain logic. Use ESLint rules to prevent developers from importing directly into the private folders of another domain.

// ## 3. Bundle Budgets & Performance Guards
// Implement rigid bundle budgets within your compiler configurations. If any single feature bundle exceeds **50KB gzipped**, the build system should generate warning alerts or actively block the integration pipeline.
//     `
//   },

];
