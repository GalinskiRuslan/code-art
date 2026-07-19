import { ImageResponse } from "next/og";

export const alt = "Code Art — full-cycle web studio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 72% 24%, rgba(132, 83, 255, 0.52), transparent 28%), radial-gradient(circle at 20% 80%, rgba(66, 240, 181, 0.26), transparent 26%), linear-gradient(135deg, #050512 0%, #100824 52%, #050512 100%)",
          color: "#f7f0e8",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            color: "#bca2ff",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 42,
              height: 42,
              border: "2px solid #a783ff",
              borderRadius: 12,
              boxShadow: "0 0 28px rgba(167, 131, 255, 0.75)",
            }}
          />
          Code Art
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              maxWidth: 900,
              fontSize: 78,
              lineHeight: 0.98,
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            Website, CRM and AI integration development
          </div>
          <div
            style={{
              maxWidth: 840,
              color: "rgba(247, 240, 232, 0.78)",
              fontSize: 30,
              lineHeight: 1.35,
            }}
          >
            Corporate websites, web applications, UX/UI, automation, and support for digital products.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 18,
            color: "#42f0b5",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          <span>codeart.kz</span>
          <span>•</span>
          <span>Full-cycle web studio</span>
        </div>
      </div>
    ),
    size
  );
}
