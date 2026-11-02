import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const archivo = await readFile(join(process.cwd(), "src/app/fonts/archivo-800.woff"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#efebe3",
          color: "#121110",
          padding: "60px 72px",
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, letterSpacing: 3 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                background: "#c23218",
                color: "#efebe3",
                fontSize: 22,
                letterSpacing: -1,
              }}
            >
              ON
            </div>
            <span>PORTFOLIO</span>
          </div>
          <span>{site.role.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 190, lineHeight: 0.84, letterSpacing: -9 }}>
          <span>OMAR</span>
          <span>NABELSI</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 32, letterSpacing: -0.5 }}>
          <div style={{ width: 22, height: 22, background: "#c23218" }} />
          <span>Software that moves money and takes action — safely.</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: archivo, style: "normal", weight: 800 }] },
  );
}
