import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Blueprint } from "@/components/anim/Blueprint";
import { Reveal } from "@/components/anim/Reveal";
import { featured, materials, photos, pieces, steps } from "@/content/home";
import { site } from "@/content/site";
import { formatUsd } from "@/lib/pricing";
import { buildMetadata } from "@/lib/metadata";
import { unsplash } from "@/lib/unsplash";

export const metadata: Metadata = buildMetadata(site, { path: "/" });

export default function HomePage() {
  return (
    <main id="main">
      <section className="site-grid gap-y-10 pb-20 pt-12 md:pt-20">
        <div className="col-span-12 grid gap-5">
          <h1 className="display max-w-[14ch]">Furniture built to the millimetre.</h1>
          <div aria-hidden="true" className="ruler max-w-3xl" />
        </div>
        <div className="col-span-12 grid content-start gap-6 md:col-span-4 md:pt-2">
          <p className="text-lg">
            Wardrobes, kitchens and shelving drawn for your room and made in our workshop in Eastport. No standard
            sizes, no filler panels.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/configurator" className="btn-solid">
              Configure a piece
            </Link>
            <Link href="/contact" className="link-arrow">
              Book a measure
            </Link>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-fg pt-4 text-sm">
            <div>
              <dt className="text-muted">Lead time</dt>
              <dd className="text-2xl font-semibold tracking-tight">4 to 6 weeks</dd>
            </div>
            <div>
              <dt className="text-muted">Tolerance</dt>
              <dd className="text-2xl font-semibold tracking-tight">±1 mm</dd>
            </div>
          </dl>
        </div>
        <div className="col-span-12 grid grid-cols-8 gap-6 md:col-span-8">
          <Image
            src={unsplash(photos.wardrobe, 1600)}
            alt="Bedroom with a fitted white wardrobe along one wall"
            width={1600}
            height={1067}
            sizes="(min-width: 768px) 60vw, 100vw"
            loading="eager"
            fetchPriority="high"
            className="col-span-8 aspect-[4/3] h-auto w-full bg-border object-cover md:col-span-6"
          />
          <Blueprint className="col-span-4 self-end sm:col-span-3 md:col-span-2" />
        </div>
      </section>

      <section id="work" className="scroll-mt-8 border-t border-fg py-16">
        <div className="site-grid gap-y-10">
          <h2 className="col-span-12 text-4xl font-semibold md:col-span-4 md:text-5xl">Recent work</h2>
          <p className="col-span-12 max-w-xl text-muted md:col-span-8">
            Three rooms from the last year. Each one started as a laser survey and a drawing like the one in the
            configurator.
          </p>
          {featured.map((item, index) => (
            <Reveal
              as="figure"
              variant="curtain"
              delay={index * 0.15}
              key={item.title}
              className={index === 0 ? "col-span-12 md:col-span-7 md:row-span-2" : "col-span-12 md:col-span-5"}
            >
              <Image
                src={unsplash(item.photo, index === 0 ? 1600 : 900)}
                alt={item.alt}
                width={index === 0 ? 1600 : 900}
                height={index === 0 ? 1200 : 600}
                sizes={index === 0 ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 40vw, 100vw"}
                className={`h-auto w-full bg-border object-cover ${index === 0 ? "aspect-[4/3]" : "aspect-[3/2]"}`}
              />
              <figcaption className="mt-3 flex flex-wrap justify-between gap-x-6 gap-y-1 text-sm">
                <span className="font-semibold">{item.title}</span>
                <span className="text-muted">{item.note}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="catalogue" className="border-t border-fg py-16">
        <div className="site-grid gap-y-8">
          <div className="col-span-12 md:col-span-4">
            <h2 id="catalogue" className="text-4xl font-semibold md:text-5xl">Starting points</h2>
            <p className="mt-4 max-w-sm text-muted">
              Six pieces we build often. Every one is resized to your room; prices are for the size shown.
            </p>
          </div>
          <ul className="col-span-12 md:col-span-8">
            {pieces.map((piece) => (
              <li
                key={piece.code}
                className="piece-row grid grid-cols-[4rem_1fr_auto] gap-x-4 gap-y-1 border-t border-border py-5 last:border-b md:grid-cols-[5rem_1.3fr_1.3fr_auto]"
              >
                <span className="text-sm tabular-nums text-accent">{piece.code}</span>
                <span className="text-lg font-semibold tracking-tight">{piece.name}</span>
                <span className="col-start-2 text-sm text-muted md:col-start-3 md:row-start-1">
                  {piece.size}
                  <br />
                  {piece.material}
                </span>
                <span className="col-start-3 row-start-1 text-right tabular-nums md:col-start-4">
                  from {formatUsd(piece.from)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="materials" className="border-t border-fg py-16">
        <div className="site-grid gap-y-8">
          <h2 id="materials" className="col-span-12 text-4xl font-semibold md:col-span-4 md:text-5xl">
            Materials
          </h2>
          <ul className="col-span-12 grid grid-cols-2 gap-6 md:col-span-8 md:grid-cols-4">
            {materials.map((m, index) => (
              <Reveal as="li" variant="curtain" delay={index * 0.12} key={m.name} className="grid gap-3">
                <span aria-hidden="true" className="swatch aspect-square border border-fg/20" style={{ background: m.swatch }} />
                <span className="font-semibold">{m.name}</span>
                <span className="text-sm text-muted">{m.note}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="process" className="scroll-mt-8 bg-fg py-20 text-bg">
        <div className="site-grid gap-y-10">
          <h2 className="col-span-12 text-4xl font-semibold md:col-span-4 md:text-5xl">How a piece gets made</h2>
          <ol className="col-span-12 grid gap-8 sm:grid-cols-2 md:col-span-8">
            {steps.map((step, index) => (
              <Reveal as="li" delay={index * 0.15} key={step.title} className="relative grid content-start gap-2 border-t border-bg/30 pt-4">
                <span aria-hidden="true" className="grow-on-seen absolute -top-px left-0 h-0.5 w-full bg-accent" />
                <span className="text-sm tabular-nums text-bg/60">Step {index + 1} of {steps.length}</span>
                <h3 className="text-2xl font-semibold">{step.title}</h3>
                <p className="text-bg/75">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20">
        <div className="site-grid items-center gap-y-8">
          <Image
            src={unsplash(photos.workshop, 1200)}
            alt="Carpenter smiling while working on a piece of wood in a workshop"
            width={1200}
            height={800}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="col-span-12 aspect-[3/2] h-auto w-full bg-border object-cover md:col-span-6"
          />
          <div className="col-span-12 grid gap-6 md:col-span-5 md:col-start-8">
            <p className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Six people, one workshop, and every piece signed on the back by whoever built it.
            </p>
            <p className="text-muted">
              We cut on a CNC panel saw and finish by hand. Offcuts go to a local school&apos;s woodwork class.
            </p>
            <Link href="/configurator" className="link-arrow justify-self-start">
              Try the configurator
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
