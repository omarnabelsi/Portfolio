import type { CSSProperties } from "react";

export type Segment = { text: string; className?: string; block?: boolean };

/**
 * Server-split headline: every character sits in a mask and rises via CSS.
 * Needs no JavaScript, so above-the-fold headlines paint immediately (good LCP)
 * and still get a per-letter entrance. Timing hooks into --intro-base,
 * which the boot script shortens when the intro loader is skipped.
 */
export function CharRise({ segments, start = 0 }: { segments: Segment[]; start?: number }) {
  let i = start;
  return (
    <>
      {segments.map((seg, s) => {
        const chars = Array.from(seg.text).map((ch) => {
          const idx = i++;
          return ch === " " ? (
            <span key={idx}> </span>
          ) : (
            <span key={idx} className="char-mask">
              <span className="char" style={{ "--i": idx } as CSSProperties}>
                {ch}
              </span>
            </span>
          );
        });
        return (
          <span key={s} className={`${seg.block ? "block" : ""} ${seg.className ?? ""}`}>
            {chars}
          </span>
        );
      })}
    </>
  );
}
