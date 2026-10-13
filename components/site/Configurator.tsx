"use client";

import Link from "next/link";
import { useId, useMemo, useState, useSyncExternalStore } from "react";
import { Odometer } from "@/components/anim/Odometer";
import { Drawing } from "@/components/site/Drawing";
import { clampSize, formatUsd, LIMITS, quote, type Front, type Material, type Piece, type PieceType } from "@/lib/pricing";

type Item = { id: string; piece: Piece; price: number };

const STORAGE_KEY = "tekton-list";
const listeners = new Set<() => void>();
let memory: string | null = null;

/** The list lives in sessionStorage; this store lets React read it without a hydration mismatch. */
const listStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  read(): string {
    try {
      return sessionStorage.getItem(STORAGE_KEY) ?? "[]";
    } catch {
      return "[]";
    }
  },
  write(items: Item[]) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable: changes last until the page reloads */
      memory = JSON.stringify(items);
    }
    listeners.forEach((l) => l());
  },
};

const TYPES: { value: PieceType; label: string; preset: Pick<Piece, "width" | "height" | "depth"> }[] = [
  { value: "wardrobe", label: "Wardrobe", preset: { width: 200, height: 240, depth: 60 } },
  { value: "kitchen", label: "Kitchen run", preset: { width: 300, height: 220, depth: 60 } },
  { value: "shelving", label: "Shelving", preset: { width: 120, height: 220, depth: 32 } },
];
const MATERIALS: { value: Material; label: string }[] = [
  { value: "birch", label: "Birch ply" },
  { value: "oak", label: "Oak" },
  { value: "walnut", label: "Walnut" },
  { value: "painted", label: "Painted" },
];
const FRONTS: { value: Front; label: string }[] = [
  { value: "flat", label: "Flat" },
  { value: "fluted", label: "Fluted" },
  { value: "glass", label: "Glass" },
  { value: "open", label: "Open" },
];

const describe = (p: Piece) =>
  `${TYPES.find((t) => t.value === p.type)?.label}, ${p.width} × ${p.height} × ${p.depth} cm, ${MATERIALS.find((m) => m.value === p.material)?.label}, ${FRONTS.find((f) => f.value === p.front)?.label.toLowerCase()} front`;

function Segmented<T extends string>({ legend, name, options, value, onChange }: { legend: string; name: string; options: { value: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <fieldset className="grid gap-2">
      <legend className="mb-2 text-sm font-semibold">{legend}</legend>
      <div className="flex flex-wrap border border-fg">
        {options.map((o) => (
          <label key={o.value} className="flex-1 cursor-pointer border-r border-fg px-3 py-2 text-center text-sm last:border-r-0 has-[:checked]:bg-fg has-[:checked]:text-bg has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2">
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="sr-only" />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Dimension({ label, value, limits, onChange }: { label: string; value: number; limits: { min: number; max: number }; onChange: (v: number) => void }) {
  const id = useId();
  return (
    <div className="grid gap-1">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <div className="flex items-center border border-fg">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={limits.min}
          max={limits.max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent px-3 py-2 tabular-nums outline-none"
        />
        <span className="px-3 text-sm text-muted">cm</span>
      </div>
      <span className="text-xs text-muted">
        {limits.min} to {limits.max}
      </span>
    </div>
  );
}

export function Configurator() {
  const [piece, setPiece] = useState<Piece>({ type: "wardrobe", width: 200, height: 240, depth: 60, material: "oak", front: "flat" });
  const raw = useSyncExternalStore(listStore.subscribe, () => memory ?? listStore.read(), () => "[]");
  const items = useMemo<Item[]>(() => {
    try {
      return JSON.parse(raw) as Item[];
    } catch {
      return [];
    }
  }, [raw]);
  const saveItems = (next: Item[]) => listStore.write(next);

  const valid = clampSize(piece);
  const outOfRange = valid.width !== piece.width || valid.height !== piece.height || valid.depth !== piece.depth;
  const price = quote(piece);
  const total = items.reduce((sum, i) => sum + i.price, 0);
  const set = <K extends keyof Piece>(key: K, value: Piece[K]) => setPiece((p) => ({ ...p, [key]: value }));

  const message = items.length
    ? `Quote request from the configurator:\n${items.map((i, n) => `${n + 1}. ${describe(i.piece)}, about ${formatUsd(i.price)}`).join("\n")}\nTotal about ${formatUsd(total)}.`
    : "";

  return (
    <div className="site-grid gap-y-10">
      <div className="col-span-12 grid content-start gap-8 lg:col-span-5">
        <Segmented
          legend="Piece"
          name="type"
          options={TYPES}
          value={piece.type}
          onChange={(v) => {
            const preset = TYPES.find((t) => t.value === v)!.preset;
            setPiece((p) => ({ ...p, type: v, ...preset, front: v === "shelving" ? "open" : p.front === "open" ? "flat" : p.front }));
          }}
        />
        <div className="grid grid-cols-3 gap-4">
          <Dimension label="Width" value={piece.width} limits={LIMITS.width} onChange={(v) => set("width", v)} />
          <Dimension label="Height" value={piece.height} limits={LIMITS.height} onChange={(v) => set("height", v)} />
          <Dimension label="Depth" value={piece.depth} limits={LIMITS.depth} onChange={(v) => set("depth", v)} />
        </div>
        {outOfRange ? (
          <p role="alert" className="text-sm text-accent">
            Some sizes are outside what we build, so the drawing and price use {valid.width} × {valid.height} × {valid.depth} cm.
          </p>
        ) : null}
        <Segmented legend="Material" name="material" options={MATERIALS} value={piece.material} onChange={(v) => set("material", v)} />
        <Segmented legend="Front" name="front" options={FRONTS} value={piece.front} onChange={(v) => set("front", v)} />
      </div>

      <div className="col-span-12 grid content-start gap-6 lg:col-span-7">
        <div className="border border-fg bg-surface p-6">
          <Drawing piece={valid} />
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-fg pb-6" aria-live="polite">
          <div>
            <p className="text-sm text-muted">{describe(valid)}</p>
            <p className="text-5xl font-semibold tracking-tight tabular-nums">
              <Odometer value={formatUsd(price)} />
            </p>
          </div>
          <button type="button" className="btn-solid" onClick={() => saveItems([...items, { id: crypto.randomUUID(), piece: valid, price }])}>
            Add to my list
          </button>
        </div>

        <section aria-labelledby="list-heading" className="grid gap-4">
          <h2 id="list-heading" className="text-2xl font-semibold">
            My list {items.length ? `(${items.length})` : ""}
          </h2>
          {items.length === 0 ? (
            <p className="text-muted">Add pieces to collect them here, then ask for one quote for the whole room.</p>
          ) : (
            <>
              <ul>
                {items.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-4 border-t border-border py-3 text-sm">
                    <span>{describe(item.piece)}</span>
                    <span className="flex items-center gap-4">
                      <span className="tabular-nums">{formatUsd(item.price)}</span>
                      <button type="button" className="underline underline-offset-4" onClick={() => saveItems(items.filter((i) => i.id !== item.id))} aria-label={`Remove ${describe(item.piece)}`}>
                        Remove
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-fg pt-4">
                <p className="text-lg font-semibold tabular-nums">Total about {formatUsd(total)}</p>
                <Link href={`/contact?items=${encodeURIComponent(message)}`} className="btn-solid">
                  Request a quote
                </Link>
              </div>
            </>
          )}
          <p className="text-xs text-muted">Demo prices for planning. The measure visit gives you a fixed quote.</p>
        </section>
      </div>
    </div>
  );
}
