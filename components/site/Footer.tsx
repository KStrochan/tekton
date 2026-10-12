import Link from "next/link";
import { PhotoCredits } from "@/components/PhotoCredits";
import { site } from "@/content/site";

export function Footer() {
  const tel = site.contact.phone.replace(/[^+\d]/g, "");
  return (
    <footer className="mt-24 border-t border-fg">
      <div className="site-grid gap-y-8 py-12 text-sm">
        <div className="col-span-12 grid gap-1 md:col-span-4">
          <p className="font-semibold">Workshop and showroom</p>
          <p className="text-muted">{site.contact.address}</p>
          <p className="text-muted">{site.contact.hours}</p>
        </div>
        <div className="col-span-12 grid gap-1 md:col-span-4">
          <p className="font-semibold">Talk to us</p>
          <a href={`tel:${tel}`}>{site.contact.phone}</a>
          <Link href="/contact">Send a message</Link>
        </div>
        <nav aria-label="Footer" className="col-span-12 grid gap-1 md:col-span-4">
          <p className="font-semibold">Pages</p>
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-fg">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <p aria-hidden="true" className="site-wordmark">
        {site.name}
      </p>
      <div className="site-grid gap-y-2 border-t border-border py-5 text-xs text-muted">
        <p className="col-span-12 md:col-span-6">
          &copy; {new Date().getFullYear()} {site.name}. Demo project by{" "}
          <a href="https://github.com/KStrochan">Konstantyn Strochan</a>; the business is fictional.
        </p>
        <div className="col-span-12 md:col-span-6 md:text-right">
          <PhotoCredits credits={site.photoCredits} />
        </div>
      </div>
    </footer>
  );
}
