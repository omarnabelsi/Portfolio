import { ArrowLink } from "@/components/ui/ArrowLink";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-end pb-20 pt-40">
      <p className="mono-label text-muted">[ 404 — Not found ]</p>
      <h1 className="display mt-6 text-[clamp(4rem,16vw,14rem)]">
        Lost <span className="serif-accent text-signal">route</span>
      </h1>
      <p className="mt-6 max-w-[44ch] text-ink-2">This page doesn’t exist — but the work does.</p>
      <div className="mt-10">
        <ArrowLink href="/">Back to the index</ArrowLink>
      </div>
    </section>
  );
}
