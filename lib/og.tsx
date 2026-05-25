import { ImageResponse } from "next/og";

type OgOptions = {
  eyebrow: string;
  title: string;
  summary: string;
};

export const ogSize = {
  width: 1200,
  height: 630,
};

export const ogContentType = "image/png";

export function createOgImage({ eyebrow, title, summary }: OgOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "radial-gradient(circle at top left, rgba(255,255,255,0.22), transparent 28%), linear-gradient(135deg, #072b45 0%, #0A3D62 55%, #114f7f 100%)",
          color: "white",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "12px 18px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.1)",
              fontSize: 22,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: 28, letterSpacing: "0.3em" }}>
            EO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div
            style={{
              display: "flex",
              maxWidth: 900,
              fontSize: 68,
              lineHeight: 1.08,
              fontWeight: 700,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 840,
              fontSize: 30,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {summary}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgba(255,255,255,0.75)",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex" }}>Thought Leadership. Innovation. Impact.</div>
          <div style={{ display: "flex" }}>chairman.official</div>
        </div>
      </div>
    ),
    ogSize
  );
}