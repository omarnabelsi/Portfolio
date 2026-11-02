"use client";

import { useState } from "react";
import { site } from "@/content/site";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

/**
 * Posts to /api/contact, which delivers via Resend when configured.
 * The UI only reports success when the server confirms delivery.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? "Something went wrong.");
      form.reset();
      setStatus({ kind: "sent" });
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  const field =
    "peer w-full border-0 border-b border-paper/25 bg-transparent px-0 pb-3 pt-6 text-[1.1rem] text-paper outline-none transition-colors placeholder:text-transparent focus:border-signal-bright";
  const label =
    "pointer-events-none absolute left-0 top-6 origin-left text-paper/55 transition-all duration-300 peer-focus:top-0 peer-focus:scale-[0.8] peer-focus:text-signal-bright peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-[0.8]";

  return (
    <form onSubmit={onSubmit} noValidate={false} className="grid gap-8" aria-describedby="contact-status">
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="relative">
          <input id="cf-name" name="name" required maxLength={120} autoComplete="name" placeholder="Name" className={field} />
          <label htmlFor="cf-name" className={label}>
            Your name
          </label>
        </div>
        <div className="relative">
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="Email"
            className={field}
          />
          <label htmlFor="cf-email" className={label}>
            Email
          </label>
        </div>
      </div>
      <div className="relative">
        <textarea
          id="cf-message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={4}
          placeholder="Message"
          className={`${field} resize-none`}
        />
        <label htmlFor="cf-message" className={label}>
          What are you building?
        </label>
      </div>
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute left-[-10000px] h-px w-px overflow-hidden">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="group inline-flex min-h-14 items-center gap-3 rounded-full bg-signal px-8 py-4 font-semibold text-paper transition-[background-color,transform] hover:bg-paper hover:text-ink disabled:opacity-60"
        >
          {status.kind === "sending" ? "Sending…" : "Send message"}
          <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </button>
        <p id="contact-status" role="status" aria-live="polite" className="text-[0.95rem]">
          {status.kind === "sent" && <span className="text-paper">Thanks — your message was delivered.</span>}
          {status.kind === "error" && (
            <span className="text-[#ff9a85]">
              {status.message}{" "}
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="underline">
                Reach me on GitHub instead
              </a>
              .
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
