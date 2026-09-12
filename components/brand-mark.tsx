/** House glyph built from CSS shapes (border-triangle trick) so it renders identically via `next/og`'s ImageResponse and in the browser. */
export function BrandMark({ size = 64 }: { size?: number }) {
  const roofHeight = size * 0.28;
  const roofHalfWidth = size * 0.26;
  const bodyTop = roofHeight - 1;
  const bodyHeight = size * 0.34;
  const doorWidth = size * 0.16;
  const doorHeight = size * 0.19;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: "#D97706",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: size * 0.14,
          width: 0,
          height: 0,
          borderLeft: `${roofHalfWidth}px solid transparent`,
          borderRight: `${roofHalfWidth}px solid transparent`,
          borderBottom: `${roofHeight}px solid white`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: bodyTop + size * 0.14,
          width: size * 0.44,
          height: bodyHeight,
          background: "white",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: doorWidth,
            height: doorHeight,
            background: "#D97706",
          }}
        />
      </div>
    </div>
  );
}
