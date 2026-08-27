import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Rafiq — lower your gaze, take back your time, and get 30 days Premium free.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

const geist = readFile(
  join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"),
);

export default async function Image() {
  const fontData = await geist;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#F6F1E7",
          color: "#2E2A23",
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            width: 770,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 68px 58px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 24,
                background: "#5C6B4C",
                color: "#F8F5EE",
                fontSize: 24,
              }}
            >
              R
            </div>
            <div style={{ display: "flex", fontSize: 29, letterSpacing: -1.2 }}>
              Rafiq
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                color: "#A96A3D",
                fontSize: 70,
                lineHeight: 0.98,
                letterSpacing: -3.8,
              }}
            >
              Lower your gaze.
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 4,
                color: "#5C6B4C",
                fontSize: 70,
                lineHeight: 0.98,
                letterSpacing: -3.8,
              }}
            >
              Take back your time.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#625B4D",
              fontSize: 21,
            }}
          >
            <div style={{ display: "flex", color: "#5C6B4C" }}>●</div>
            Android protection · Matching stays on your phone
          </div>
        </div>

        <div
          style={{
            width: 430,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
            padding: "62px 56px 58px",
            background: "#1C1A16",
            color: "#EDE6D6",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 58,
              right: -52,
              width: 210,
              height: 210,
              display: "flex",
              border: "2px solid rgba(216,184,95,0.18)",
              transform: "rotate(45deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 62,
              left: -74,
              width: 176,
              height: 176,
              display: "flex",
              border: "2px solid rgba(143,160,122,0.16)",
              transform: "rotate(45deg)",
            }}
          />

          <div
            style={{
              display: "flex",
              position: "relative",
              color: "#D8B85F",
              fontSize: 17,
              letterSpacing: 2.4,
            }}
          >
            ANDROID EARLY ACCESS
          </div>

          <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <div
                style={{
                  display: "flex",
                  color: "#D69A6E",
                  fontSize: 158,
                  lineHeight: 0.78,
                  letterSpacing: -9,
                }}
              >
                30
              </div>
              <div
                style={{
                  display: "flex",
                  marginBottom: 7,
                  marginLeft: 14,
                  color: "#B6AC96",
                  fontSize: 24,
                }}
              >
                days
              </div>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 48,
                lineHeight: 0.98,
                letterSpacing: -2.3,
              }}
            >
              Premium free
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              color: "#B6AC96",
              fontSize: 20,
              lineHeight: 1.35,
            }}
          >
            <div style={{ display: "flex" }}>No card required.</div>
            <div style={{ display: "flex" }}>One launch email.</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Geist",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
