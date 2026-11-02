/**
 * Technologies grouped by discipline. Every entry cites where it is used,
 * so the list doubles as evidence rather than self-assessment.
 */
export type Skill = { name: string; where: string };
export type SkillGroup = { id: string; title: string; note: string; skills: Skill[] };

export const expertise: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend engineering",
    note: "Interfaces for dashboards, storefronts, mobile and desktop.",
    skills: [
      { name: "TypeScript", where: "Across projects" },
      { name: "React · Next.js", where: "ALFA · Sneaker Commerce" },
      { name: "Angular + Material", where: "ATIZAN dashboard" },
      { name: "Vue · Nuxt 3", where: "VYRON" },
      { name: "React Native · Expo", where: "ATIZAN mobile" },
      { name: "Tailwind CSS", where: "ATIZAN · VitalSense" },
    ],
  },
  {
    id: "backend",
    title: "Backend engineering",
    note: "APIs with clear contracts, auth and domain boundaries.",
    skills: [
      { name: "NestJS · Node.js", where: "ATIZAN" },
      { name: "FastAPI", where: "ALFA · Auth service" },
      { name: "Django REST Framework", where: "Two commerce platforms" },
      { name: "Express", where: "API service" },
      { name: "OpenAPI · contract generation", where: "ATIZAN · Sneaker Commerce" },
      { name: "JWT · role-based access", where: "ATIZAN · FastAPI · Django" },
    ],
  },
  {
    id: "data",
    title: "Databases",
    note: "Schemas that evolve safely and money that reconciles.",
    skills: [
      { name: "PostgreSQL", where: "ATIZAN · commerce" },
      { name: "TypeORM migrations", where: "ATIZAN" },
      { name: "Redis", where: "ATIZAN · Sneaker Commerce" },
      { name: "Supabase", where: "VitalSense · VYRON" },
      { name: "SQLite", where: "ALFA · Auth service" },
      { name: "MongoDB · Mongoose", where: "API service" },
    ],
  },
  {
    id: "ai",
    title: "AI & automation",
    note: "Agents and models wired to real systems — with guardrails.",
    skills: [
      { name: "Claude API · tool use", where: "ALFA" },
      { name: "Model Context Protocol", where: "ALFA" },
      { name: "Whisper · Kokoro · Piper", where: "ALFA voice" },
      { name: "Gemini · Groq vision", where: "VitalSense" },
      { name: "PyTorch · MediaPipe", where: "Gesture Control" },
      { name: "Desktop & browser automation", where: "ALFA" },
    ],
  },
  {
    id: "infra",
    title: "Infrastructure & DevOps",
    note: "Containers, observability and pipelines that catch problems early.",
    skills: [
      { name: "Docker · Compose", where: "ATIZAN · commerce" },
      { name: "Prometheus · Grafana · Alertmanager", where: "ATIZAN" },
      { name: "CI/CD · security automation", where: "ATIZAN" },
      { name: "DigitalOcean staging", where: "ATIZAN" },
      { name: "AWS ECS (target architecture)", where: "ATIZAN" },
      { name: "Render · Netlify", where: "VitalSense · VYRON" },
    ],
  },
  {
    id: "systems",
    title: "Systems & tooling",
    note: "When software needs to live on the machine.",
    skills: [
      { name: "Rust", where: "Aura Shell · ALFA" },
      { name: "Tauri", where: "Aura Shell · ALFA" },
      { name: "Python", where: "ALFA · ML projects" },
      { name: "Solidity · Hardhat · ethers", where: "ATIZAN (experimental)" },
      { name: "Git · testing · e2e", where: "Everywhere" },
    ],
  },
];

export const marquee = [
  "TypeScript",
  "NestJS",
  "Python",
  "FastAPI",
  "React",
  "Angular",
  "Next.js",
  "PostgreSQL",
  "Redis",
  "Rust",
  "Tauri",
  "Docker",
  "Claude API",
  "Django",
];
