import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omar Nabelsi — Full-Stack Software Engineer",
  description:
    "Results-driven Software Engineer specializing in full-stack web development with expertise in React, Vue.js, Next.js, Node.js, and Python. Building scalable, production-ready applications with clean architecture.",
  keywords: [
    "Omar Nabelsi",
    "Software Engineer",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Python",
    "Beirut",
    "Lebanon",
  ],
  authors: [{ name: "Omar Nabelsi" }],
  openGraph: {
    title: "Omar Nabelsi — Full-Stack Software Engineer",
    description:
      "Building scalable, production-ready web applications with clean architecture and thoughtful engineering.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omar Nabelsi — Full-Stack Software Engineer",
    description:
      "Building scalable, production-ready web applications with clean architecture and thoughtful engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050508] text-white`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
