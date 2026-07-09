import { ImageResponse } from "next/og";
import profile from "@/data/profile.json";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "#0B0E14",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(94,234,212,0.18), transparent 55%)",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontFamily: "monospace",
            color: "#5EEAD4",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Portfolio OS
        </div>
        <div
          style={{
            fontSize: 72,
            color: "#E7EAF0",
            marginTop: 24,
            fontWeight: 700,
          }}
        >
          {profile.name}
        </div>
        <div style={{ fontSize: 32, color: "#8B93A7", marginTop: 12 }}>
          {profile.title}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
