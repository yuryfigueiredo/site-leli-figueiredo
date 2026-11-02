import { ImageResponse } from "next/og";
import { portfolioData } from "@/data/portfolioData";
import { getProjectBySlug } from "@/lib/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const { identity } = portfolioData;

  const title = project?.title ?? identity.name;
  const role = project?.role ?? identity.roles.join(" • ");
  const period = project?.periodLabel ?? "";

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
          {role}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              lineHeight: 1.1,
              fontWeight: 400,
              fontFamily: "serif",
            }}
          >
            {title}
          </div>
          {period ? (
            <div
              style={{
                display: "flex",
                marginTop: 36,
                fontSize: 32,
                color: "#F59E0B",
              }}
            >
              {period}
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#A1A1AA" }}>
          {identity.name}
        </div>
      </div>
    ),
    { ...size },
  );
}
