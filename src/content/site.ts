/**
 * Single source of truth for identity + contact details.
 * Only verified information lives here. Optional fields render
 * nothing when unset — no placeholders ship to production.
 */
export const site = {
  name: "Omar Nabelsi",
  nameArabic: "عمر",
  role: "Full-Stack Software Engineer",
  /** Set NEXT_PUBLIC_SITE_URL to the production domain (used for canonical + OG URLs). */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  description:
    "Omar Nabelsi is a full-stack software engineer building financial platforms, AI agents and the infrastructure underneath them — with TypeScript, Python, NestJS, FastAPI, React and Rust.",
  github: "https://github.com/omarnabelsi",
  githubHandle: "omarnabelsi",
  /** Set NEXT_PUBLIC_CONTACT_EMAIL to show a direct email link. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "omarnabelsi12@gmail.com",
  phone: "+961 76638469",
  /** Set NEXT_PUBLIC_LINKEDIN_URL once verified. */
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || null,
} as const;

export const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/#principles", label: "Principles" },
  { href: "/#contact", label: "Contact" },
] as const;
