import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F5F5F7",
          color: "#1D1D1F",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "24px",
            color: "#6E6E73",
          }}
        >
          <span
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "999px",
              background: "#15803D",
            }}
          />
          <span>Mohammad Ullah — Full-Stack Engineer</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "68px",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Designing and engineering fast, tactile web software.
          </div>
          <div style={{ fontSize: "28px", color: "#6E6E73" }}>
            Next.js · TypeScript · Drizzle ORM · Motion
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(29,29,31,0.15)",
            paddingTop: "24px",
            fontSize: "22px",
            color: "#6E6E73",
          }}
        >
          <span>mohammadullah.me</span>
          <span>Brahmanbaria, Bangladesh</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
