export type PieceType = "wardrobe" | "kitchen" | "shelving";
export type Material = "birch" | "oak" | "walnut" | "painted";
export type Front = "flat" | "fluted" | "glass" | "open";

export type Piece = {
  type: PieceType;
  width: number;
  height: number;
  depth: number;
  material: Material;
  front: Front;
};

export const LIMITS = {
  width: { min: 40, max: 400 },
  height: { min: 40, max: 260 },
  depth: { min: 30, max: 70 },
} as const;

/** Demo rates in USD per square metre of front, for a 60 cm deep unit. */
const RATE: Record<PieceType, number> = { wardrobe: 520, kitchen: 780, shelving: 340 };
const MATERIAL: Record<Material, number> = { birch: 1, oak: 1.25, walnut: 1.5, painted: 0.9 };
const FRONT: Record<Front, number> = { flat: 1, fluted: 1.15, glass: 1.25, open: 0.8 };

const clamp = (value: number, { min, max }: { min: number; max: number }) => Math.min(Math.max(value, min), max);

export function clampSize(piece: Piece): Piece {
  return {
    ...piece,
    width: clamp(piece.width, LIMITS.width),
    height: clamp(piece.height, LIMITS.height),
    depth: clamp(piece.depth, LIMITS.depth),
  };
}

export function quote(input: Piece): number {
  const piece = clampSize(input);
  const area = (piece.width / 100) * (piece.height / 100);
  const price = area * RATE[piece.type] * MATERIAL[piece.material] * FRONT[piece.front] * (piece.depth / 60);
  return Math.round(price / 10) * 10;
}

export function doorCount(width: number): number {
  return Math.max(1, Math.round(width / 50));
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}
