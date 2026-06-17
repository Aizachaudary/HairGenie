import { siteConfig } from "@/lib/site-config";

const SPARKLE_PATH =
  "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z";

export function brandOgElement() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        background: "linear-gradient(135deg, #fff7f6 0%, #fbeae8 55%, #f8dcd9 100%)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 96,
          height: 96,
          borderRadius: "50%",
          background: "#e8726e",
        }}
      >
        <svg width="56" height="56" viewBox="0 0 24 24" fill="white">
          <path d={SPARKLE_PATH} />
        </svg>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 76,
          fontWeight: 700,
          color: "#28201e",
          letterSpacing: -1.5,
        }}
      >
        {siteConfig.name}
      </div>
      <div style={{ display: "flex", fontSize: 32, color: "#8a7e78" }}>{siteConfig.tagline}</div>
    </div>
  );
}
