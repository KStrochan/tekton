import type { Metadata } from "next";
import Image from "next/image";
import { submitLead } from "@/app/actions";
import { LeadForm } from "@/components/LeadForm";
import { photos } from "@/content/home";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";
import { unsplash } from "@/lib/unsplash";

export const metadata: Metadata = buildMetadata(site, {
  title: "Contact",
  description: "Book a measure visit or ask for a quote on made-to-measure furniture.",
  path: "/contact",
});

type Props = { searchParams: Promise<{ items?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { items } = await searchParams;
  const tel = site.contact.phone.replace(/[^+\d]/g, "");

  return (
    <main id="main">
      <div className="site-grid gap-y-10 py-12 md:py-16">
        <h1 className="display col-span-12 text-[clamp(2.75rem,7vw,6.5rem)]">Start a project</h1>
        <div className="col-span-12 grid content-start gap-6 md:col-span-5">
          <p className="text-lg">
            Send us the room and roughly what you have in mind. We reply within two working days to book a measure
            visit, which is free within 30 miles of the workshop.
          </p>
          <dl className="grid gap-4 border-t border-fg pt-4 text-sm">
            <div>
              <dt className="text-muted">Phone</dt>
              <dd>
                <a href={`tel:${tel}`} className="text-lg font-semibold text-fg">
                  {site.contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Workshop and showroom</dt>
              <dd>{site.contact.address}</dd>
              <dd>{site.contact.hours}</dd>
            </div>
          </dl>
          <Image
            src={unsplash(photos.workshop, 900)}
            alt="Carpenter working on a piece of wood in the workshop"
            width={900}
            height={600}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="aspect-[3/2] h-auto w-full bg-border object-cover"
          />
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <LeadForm action={submitLead} defaultMessage={items} submitLabel="Send request" />
        </div>
      </div>
    </main>
  );
}
