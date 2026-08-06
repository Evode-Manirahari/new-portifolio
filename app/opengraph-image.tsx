import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = "Evode Manirahari — Product-Minded Software & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share image, generated at build time. Deliberately typographic — same warm
 * paper, same accent rule, no screenshot to go stale.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f2efe7",
          color: "#11110f",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 64, height: 4, background: "#ff4f1f" }} />
          <div
            style={{
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#74716a",
            }}
          >
            {profile.role}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 128,
              fontWeight: 600,
              letterSpacing: -5,
              lineHeight: 1,
            }}
          >
            Evode
          </div>
          <div
            style={{
              fontSize: 128,
              fontWeight: 600,
              letterSpacing: -5,
              lineHeight: 1,
            }}
          >
            Manirahari
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(17,17,15,0.18)",
            paddingTop: 28,
            fontSize: 26,
            color: "#74716a",
          }}
        >
          <div style={{ display: "flex", maxWidth: 720, lineHeight: 1.3 }}>
            Full-stack products across applied AI, backend, voice, and mobile.
          </div>
          <div style={{ display: "flex" }}>{profile.location}</div>
        </div>
      </div>
    ),
    size,
  );
}
