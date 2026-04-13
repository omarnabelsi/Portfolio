export const siteConfig = {
  name: "Omar Nabelsi",
  role: "Full-Stack Software Engineer",
  location: "Saida, Lebanon",
  email: "omarnabelsi12@gmail.com",
  github: "https://github.com/omarnabelsi",
  linkedin: "https://www.linkedin.com/in/omar-nabelsi-4776b8398/",
  summary:
    "I build things for the web that are fast, accessible, and built to last. I care deeply about clean architecture, thoughtful user experiences, and writing code that other humans can actually read.",
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Process", href: "#process" },
    { label: "Journey", href: "#journey" },
  ],
};

export const skills = {
  frontend: {
    label: "Frontend",
    color: "from-blue-500 to-cyan-400",
    items: ["React", "Vue.js", "Next.js", "TypeScript", "TailwindCSS", "HTML/CSS"],
  },
  backend: {
    label: "Backend",
    color: "from-emerald-500 to-teal-400",
    items: ["Node.js", "Express", "NestJS", "Python", "Flask", "Django", "FastAPI"],
  },
  database: {
    label: "Database",
    color: "from-purple-500 to-pink-400",
    items: ["MySQL", "MongoDB", "Prisma", "Mongoose"],
  },
  auth: {
    label: "Auth & Security",
    color: "from-orange-500 to-amber-400",
    items: ["JWT", "OAuth 2.0", "RBAC", "Session Management"],
  },
  devops: {
    label: "DevOps & Tools",
    color: "from-rose-500 to-red-400",
    items: ["Git", "CI/CD", "Vercel", "Netlify", "Render", "Docker"],
  },
};

export const projects = [
  {
    title: "Full-Stack E-Commerce Platform",
    subtitle: "Lamsas — Clothing Retail",
    description:
      "Stack: HTML, CSS, JavaScript. Built a complete clothing retail platform with product management, inventory tracking, and secure authentication.",
    problem:
      "Small retail brands struggle with expensive SaaS platforms that don't fit their needs. They need a custom solution that's affordable, fast, and gives them full control.",
    solution:
      "Built a modular e-commerce platform with a Next.js storefront, Node.js API, MongoDB for flexible product data, JWT auth with RBAC for admin/user separation, and integrated payment processing.",
    impact:
      "Launched to production with real users. Admin can manage inventory, view sales analytics, and control user access — all from a single dashboard.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://lamsas1ore.netlify.app/",
    image: "/projects/ecommerce.png",
    featured: true,
  },
  {
    title: "Kiswani Admin Dashboard",
    subtitle: "Enterprise Analytics Platform",
    description:
      "Stack: Next.js, React, GraphQL, RBAC, Analytics. Built a scalable admin dashboard with role-based access control and real-time analytics.",
    problem:
      "Business teams needed a centralized place to track KPIs, monitor real-time data, and make data-driven decisions without switching between multiple tools.",
    solution:
      "Designed and built a modern dashboard with GraphQL integration for efficient data queries, real-time analytics using WebSockets, and interactive chart components with drill-down capabilities.",
    impact:
      "Reduced data retrieval time by 40% compared to REST endpoints. The modular architecture allowed the team to add new widgets independently.",
    tech: ["Next.js", "React", "GraphQL", "RBAC", "Analytics"],
    link: null,
    image: "/projects/dashboard.png",
    featured: true,
  },
  {
    title: "Personal Portfolio Website",
    subtitle: "Personal Brand & Showcase",
    description:
      "Stack: React, TypeScript, Animation, Responsive Design. Designed a responsive portfolio with modern animations, theme toggle, and dynamic project showcase.",
    problem:
      "Most developer portfolios look the same — template-driven, generic, and forgettable. I needed something that reflected my actual engineering philosophy.",
    solution:
      "Built a custom portfolio from scratch with React, TypeScript, and Framer Motion. Every interaction is intentional. Dark mode by default. Performance-first rendering.",
    impact:
      "A living showcase of my work that loads in under 1 second, scores 95+ on Lighthouse, and actually represents who I am as an engineer.",
    tech: ["React", "TypeScript", "Framer Motion", "TailwindCSS"],
    link: null,
    image: "/projects/portfolio.png",
    featured: false,
  },
  {
    title: "VYRON Gaming Platform",
    subtitle: "Full-Stack Game Store",
    description:
      "Stack: Nuxt 3, Supabase, Full-Stack. Built a game store with authentication, admin dashboard, user library system, and role-based access control.",
    problem:
      "Players needed a single platform to discover games, manage purchases, and keep a persistent personal library.",
    solution:
      "Implemented a Nuxt 3 + Supabase architecture with secure authentication, role-based admin tools, and a user library tied to account history.",
    impact:
      "Delivered a complete game commerce workflow from browsing to ownership tracking with an admin panel for catalog management.",
    tech: ["Nuxt 3", "Supabase", "Authentication", "RBAC", "Full-Stack"],
    link: "https://vyrone.netlify.app/",
    image: "/projects/dashboard.png",
    featured: false,
  },
  {
    title: "Camera Mouse Controller",
    subtitle: "Computer Vision Utility",
    description:
      "Stack: Python, Computer Vision. Controlled cursor movement through hand gestures detected using a webcam.",
    problem:
      "Traditional input devices can be limiting in accessibility and hands-free interaction scenarios.",
    solution:
      "Built a Python computer-vision pipeline to detect hand landmarks in real time and map gestures to cursor movement and click actions.",
    impact:
      "Enabled touchless desktop control through a lightweight webcam-based interaction model.",
    tech: ["Python", "Computer Vision", "OpenCV", "Gesture Recognition"],
    link: null,
    image: "/projects/portfolio.png",
    featured: false,
  },
];

export const timeline = [
  {
    year: "2024 — Present",
    title: "Full-Stack Software Engineer",
    description:
      "Building production applications with Next.js, Node.js, and Python. Focused on scalable architecture, clean code practices, and delivering real value through software.",
    type: "work" as const,
  },
  {
    year: "2023",
    title: "Deep Dive into Full-Stack",
    description:
      "Mastered backend development with Node.js, Express, NestJS and Python frameworks. Built complete applications with authentication, REST APIs, and database design.",
    type: "learning" as const,
  },
  {
    year: "2022",
    title: "Frontend Engineering Focus",
    description:
      "Sharpened frontend skills with React, Vue.js, and TypeScript. Started building real projects and learning about component architecture, state management, and performance.",
    type: "learning" as const,
  },
  {
    year: "2021",
    title: "The Beginning",
    description:
      "Wrote my first lines of code. Fell in love with the idea that you can build anything with a keyboard and an idea. Started with HTML, CSS, JavaScript — the fundamentals.",
    type: "milestone" as const,
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Understand the Problem",
    description:
      "Before writing a single line of code, I make sure I deeply understand what we're building and why. Good architecture starts with good questions.",
    icon: "🔍",
  },
  {
    step: "02",
    title: "Design the Architecture",
    description:
      "I plan the system structure, data flow, and component hierarchy. Clean Architecture and SOLID principles aren't buzzwords — they're how I think.",
    icon: "📐",
  },
  {
    step: "03",
    title: "Build Incrementally",
    description:
      "I ship in small, testable increments. Each piece works independently before it connects to the whole. This reduces bugs and keeps momentum.",
    icon: "🧱",
  },
  {
    step: "04",
    title: "Refine & Optimize",
    description:
      "Performance isn't an afterthought. I profile, optimize, and ensure the final product is fast, accessible, and maintainable for the next developer.",
    icon: "⚡",
  },
];
