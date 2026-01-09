import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Saksham Bedi - AI Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          padding: "80px",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "linear-gradient(90deg, #b3d4d1 0%, #e85d4c 100%)",
          }}
        />

        {/* Document label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontFamily: "monospace",
              color: "#666666",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            PORTFOLIO — AI SOFTWARE ENGINEER
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "40px",
          }}
        >
          <span
            style={{
              fontSize: "72px",
              fontWeight: 600,
              color: "#f5f5f0",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Saksham Bedi
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            maxWidth: "700px",
          }}
        >
          <span
            style={{
              fontSize: "24px",
              fontFamily: "monospace",
              color: "#999999",
              lineHeight: 1.5,
            }}
          >
            Building intelligent systems • Production-ready ML • AI Copilots
          </span>
        </div>

        {/* Bottom info */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            right: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontFamily: "monospace",
              color: "#444444",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            sakshambedi.com
          </span>
          <span
            style={{
              fontSize: "14px",
              fontFamily: "monospace",
              color: "#444444",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            2025
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
