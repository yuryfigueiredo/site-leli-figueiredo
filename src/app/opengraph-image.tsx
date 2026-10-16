import { ImageResponse } from "next/og";
import { portfolioData } from "@/data/portfolioData";

export const alt = portfolioData.seo.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagem Open Graph editorial: nome e função, sem fotografia. */
export default function OpenGraphImage() {
  const { identity } = portfolioData;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090B",
          color: "#FAFAFA",
          padding: "72px 80px",
          borderTop: "6px solid #F59E0B",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            color: "#A1A1AA",
            textTransform: "uppercase",
          }}
        >
          {identity.roles.join("  •  ")}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 150, lineHeight: 1, fontWeight: 400 }}>
            {identity.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 36,
              width: 120,
              height: 2,
              background: "#F59E0B",
            }}
          />
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#A1A1AA" }}>
          {identity.location}
        </div>
      </div>
    ),
    { ...size },
  );
}
