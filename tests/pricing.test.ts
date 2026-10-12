import { describe, expect, test } from "vitest";
import { clampSize, doorCount, formatUsd, quote, LIMITS } from "@/lib/pricing";

const base = { type: "wardrobe", width: 200, height: 240, depth: 60, material: "birch", front: "flat" } as const;

describe("quote", () => {
  test("prices a birch wardrobe by front area", () => {
    expect(quote(base)).toBe(2500);
  });

  test("walnut costs more than birch", () => {
    expect(quote({ ...base, material: "walnut" })).toBeGreaterThan(quote(base));
  });

  test("deeper units cost more", () => {
    expect(quote({ ...base, depth: 70 })).toBeGreaterThan(quote(base));
  });

  test("rounds to the nearest ten dollars", () => {
    expect(quote({ ...base, width: 123 }) % 10).toBe(0);
  });
});

describe("clampSize", () => {
  test("keeps dimensions inside what the workshop builds", () => {
    expect(clampSize({ ...base, width: 9999, height: 1, depth: 500 })).toMatchObject({
      width: LIMITS.width.max,
      height: LIMITS.height.min,
      depth: LIMITS.depth.max,
    });
  });
});

describe("doorCount", () => {
  test("uses one door per 50 cm, at least one", () => {
    expect(doorCount(200)).toBe(4);
    expect(doorCount(40)).toBe(1);
  });
});

describe("formatUsd", () => {
  test("formats whole dollars", () => {
    expect(formatUsd(2500)).toBe("$2,500");
  });
});
