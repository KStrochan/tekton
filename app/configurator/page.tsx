import type { Metadata } from "next";
import { Configurator } from "@/components/site/Configurator";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(site, {
  title: "Configurator",
  description: "Size a wardrobe, kitchen run or shelving unit, see the drawing and an estimated price.",
  path: "/configurator",
});

export default function ConfiguratorPage() {
  return (
    <main id="main" className="pb-8">
      <div className="site-grid gap-y-4 py-12 md:py-16">
        <h1 className="display col-span-12 text-[clamp(2.75rem,7vw,6.5rem)]">Configurator</h1>
        <p className="col-span-12 max-w-xl text-lg text-muted md:col-span-6">
          Pick a piece, type the sizes of your space and choose a finish. The drawing and price update as you go.
        </p>
      </div>
      <Configurator />
    </main>
  );
}
