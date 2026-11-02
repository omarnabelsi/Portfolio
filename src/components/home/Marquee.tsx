import { marquee } from "@/content/expertise";

/** Infinite stack ticker. Pure CSS; pauses on hover; static for reduced motion. */
export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="group relative overflow-hidden border-y border-line bg-ink py-5 text-paper" aria-label="Core technologies">
      <ul className="flex w-max animate-[marquee_42s_linear_infinite] group-hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <li
            key={`${item}-${i}`}
            aria-hidden={i >= marquee.length}
            className="flex items-center gap-8 pr-8 display-tight text-[clamp(1.4rem,3vw,2.6rem)] font-[700] uppercase"
          >
            {item}
            <span className="inline-block h-2 w-2 rotate-45 bg-signal" aria-hidden />
          </li>
        ))}
      </ul>
    </div>
  );
}
