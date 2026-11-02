/**
 * Project content. Featured case studies come from project documentation
 * supplied by Omar; "more work" entries were verified against the public
 * repositories at github.com/omarnabelsi (READMEs, manifests, commit logs).
 */

export type FeaturedProject = {
  slug: "atizan-ledger" | "alfa";
  index: string;
  name: string;
  kicker: string;
  summary: string;
  tags: string[];
  theme: "atizan" | "alfa";
};

export const featured: FeaturedProject[] = [
  {
    slug: "atizan-ledger",
    index: "01",
    name: "ATIZAN Ledger",
    kicker: "Fintech · Marketplace · Supply chain",
    summary:
      "A digital wallet, marketplace and agricultural supply-chain platform for women market vendors and farmers in Haiti — operated through Radikal’s network of physical locations.",
    tags: ["NestJS", "PostgreSQL", "Redis", "Angular", "React Native", "Docker"],
    theme: "atizan",
  },
  {
    slug: "alfa",
    index: "02",
    name: "ALFA",
    kicker: "AI agent · Windows desktop",
    summary:
      "A voice-and-keyboard AI assistant that operates a real Windows desktop — through 64 named tools and a permission engine that checks every action before it runs.",
    tags: ["Python", "FastAPI", "Tauri", "Rust", "React", "Claude API"],
    theme: "alfa",
  },
];

export type RepoProject = {
  name: string;
  repo: string;
  summary: string;
  stack: string[];
  status?: string;
  hue: string;
};

export const moreWork: RepoProject[] = [
  {
    name: "Aura Shell",
    repo: "OS",
    summary:
      "A console-style, fully themeable shell for Windows: gamepad-first, 60 fps, Steam library parsing, process-tree aware launch-and-return.",
    stack: ["Rust", "Tauri", "TypeScript"],
    status: "In development",
    hue: "#2a3b8f",
  },
  {
    name: "VitalSense",
    repo: "Helth-Tracker",
    summary:
      "Health and fitness tracker with AI analysis of InBody scans, workout plans, localized achievements and multi-provider model fallback.",
    stack: ["React 19", "Python", "Supabase", "Gemini · Groq"],
    hue: "#1f6b52",
  },
  {
    name: "Sneaker Commerce",
    repo: "Jordon-Ecommerce",
    summary:
      "Full-stack storefront with filtering, infinite scroll, cart, multi-step checkout, JWT in httpOnly cookies and an OpenAPI-documented backend.",
    stack: ["Next.js 14", "Django REST", "PostgreSQL", "Redis"],
    hue: "#8f2a1a",
  },
  {
    name: "Gesture Control",
    repo: "gesture-control-",
    summary:
      "Control the computer with hand gestures: MediaPipe landmarks feed a PyTorch classifier, smoothed by majority vote and mapped to mouse actions.",
    stack: ["Python", "PyTorch", "MediaPipe"],
    hue: "#5b3a8a",
  },
  {
    name: "Custom PC Parts Store",
    repo: "computer.",
    summary:
      "E-commerce platform for computer components with a service-layer cart and order logic, JWT auth and Dockerised deployment.",
    stack: ["Django REST", "Next.js", "PostgreSQL", "React Query"],
    hue: "#3b4148",
  },
  {
    name: "VYRON",
    repo: "VYRON",
    summary:
      "Gaming storefront with Supabase auth, a persistent user library and an admin area for games, users and analytics.",
    stack: ["Nuxt 3", "Vue", "Supabase"],
    hue: "#7a5a12",
  },
];
