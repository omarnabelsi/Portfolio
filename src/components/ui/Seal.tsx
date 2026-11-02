type Props = { className?: string; size?: "sm" | "md" };

/**
 * Compact signature mark: an "ON" monogram in a vermilion seal.
 * (The full Arabic calligraphic عمر is reserved for large sizes —
 * the hero and intro — where its strokes stay legible.)
 */
export function Seal({ className = "", size = "sm" }: Props) {
  const dims = size === "sm" ? "h-9 w-9 text-[0.82rem]" : "h-16 w-16 text-[1.45rem]";
  return (
    <span
      aria-hidden
      className={`inline-grid shrink-0 place-items-center rounded-[3px] bg-signal font-display font-[900] leading-none tracking-[-0.06em] text-paper [font-variation-settings:'wdth'_125] ${dims} ${className}`}
    >
      ON
    </span>
  );
}
