import { doorCount, type Piece } from "@/lib/pricing";

const MATERIAL_FILL: Record<Piece["material"], string> = {
  birch: "#E3CFAE",
  oak: "#C49A6C",
  walnut: "#6B4A35",
  painted: "#E2DFD9",
};

/** Scaled front elevation with dimension lines. 1 SVG unit = 1 cm. */
export function Drawing({ piece }: { piece: Piece }) {
  const { width, height } = piece;
  const pad = 40;
  const doors = piece.front === "open" ? 0 : doorCount(width);
  const shelves = piece.type === "shelving" || piece.front === "open" ? Math.max(1, Math.floor(height / 36)) : 0;
  const fill = piece.front === "glass" ? "#dfe7e6" : MATERIAL_FILL[piece.material];
  const lineColor = piece.material === "walnut" && piece.front !== "glass" ? "#3c2a1e" : "#111111";

  return (
    <svg
      viewBox={`${-pad} ${-pad / 2} ${width + pad * 2} ${height + pad * 2}`}
      role="img"
      aria-label={`Front view, ${width} cm wide and ${height} cm high`}
      className="h-auto max-h-[28rem] w-full"
    >
      <rect x={0} y={0} width={width} height={height} fill={fill} stroke={lineColor} strokeWidth={1.2} />
      {piece.type === "kitchen" ? (
        <rect x={-2} y={height - 92} width={width + 4} height={4} fill="#111111" />
      ) : null}
      {Array.from({ length: shelves }, (_, i) => {
        const y = ((i + 1) * height) / (shelves + 1);
        return <line key={`s${i}`} x1={0} x2={width} y1={y} y2={y} stroke={lineColor} strokeWidth={1} />;
      })}
      {Array.from({ length: Math.max(0, doors - 1) }, (_, i) => {
        const x = ((i + 1) * width) / doors;
        return <line key={`d${i}`} x1={x} x2={x} y1={0} y2={height} stroke={lineColor} strokeWidth={1} />;
      })}
      {piece.front === "fluted"
        ? Array.from({ length: Math.floor(width / 4) }, (_, i) => (
            <line key={`f${i}`} x1={i * 4 + 2} x2={i * 4 + 2} y1={2} y2={height - 2} stroke={lineColor} strokeOpacity={0.18} strokeWidth={0.6} />
          ))
        : null}
      {Array.from({ length: doors }, (_, i) => {
        const x = ((i + 0.5) * width) / doors + (i % 2 === 0 ? 8 : -8);
        return <line key={`h${i}`} x1={x} x2={x} y1={height / 2 - 6} y2={height / 2 + 6} stroke={lineColor} strokeWidth={1.6} />;
      })}

      <g stroke="#8C2F39" strokeWidth={0.8} fill="#8C2F39" fontSize={Math.max(8, width / 28)}>
        <line x1={0} x2={width} y1={height + 18} y2={height + 18} />
        <line x1={0} x2={0} y1={height + 12} y2={height + 24} />
        <line x1={width} x2={width} y1={height + 12} y2={height + 24} />
        <text x={width / 2} y={height + 34} textAnchor="middle" stroke="none">
          {width} cm
        </text>
        <line x1={width + 18} x2={width + 18} y1={0} y2={height} />
        <line x1={width + 12} x2={width + 24} y1={0} y2={0} />
        <line x1={width + 12} x2={width + 24} y1={height} y2={height} />
        <text x={width + 30} y={height / 2} stroke="none" transform={`rotate(90 ${width + 30} ${height / 2})`} textAnchor="middle">
          {height} cm
        </text>
      </g>
    </svg>
  );
}
