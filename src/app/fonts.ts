import localFont from "next/font/local";

/** Display + body: Archivo variable (weight 100–900, width 62–125). */
export const archivo = localFont({
  src: "./fonts/archivo-variable.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
});

/** Editorial accent: Instrument Serif. */
export const instrument = localFont({
  src: [
    { path: "./fonts/instrument-serif-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/instrument-serif-regular.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-instrument",
  display: "swap",
});

/** Technical labels: JetBrains Mono variable. */
export const jetbrains = localFont({
  src: "./fonts/jetbrains-mono-variable.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
  display: "swap",
});

/** Signature seal: Aref Ruqaa (Arabic calligraphic). Only used for عمر. */
export const ruqaa = localFont({
  src: "./fonts/aref-ruqaa-arabic-700.woff2",
  variable: "--font-ruqaa",
  weight: "700",
  display: "block",
  preload: true,
});
