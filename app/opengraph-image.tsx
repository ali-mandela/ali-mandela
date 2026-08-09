import { ImageResponse } from "next/og";

export const alt = "Muhammad Ali - Software Engineer, SaaS, AI & Web Development in Kargil, Leh, Ladakh";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#161616",
          color: "#EDEDED",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#27c93f",
            marginBottom: 24,
          }}
        >
          Shipping Production SaaS
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>
          Muhammad Ali
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#A1A1A1", marginTop: 16 }}>
          Software Engineer — SaaS, AI &amp; Web Development
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#27c93f",
            marginTop: 40,
            letterSpacing: 1,
          }}
        >
          Kargil · Leh · Ladakh · Bengaluru
        </div>
      </div>
    ),
    { ...size }
  );
}
