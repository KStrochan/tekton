import Link from "next/link";
import { site } from "@/content/site";

export function Header() {
  return (
    <header className="border-b border-fg">
      <div className="site-grid items-end py-4">
        <Link href="/" className="col-span-6 text-2xl font-semibold tracking-tight text-fg no-underline md:col-span-3">
          {site.name}
        </Link>
        <nav aria-label="Main" className="col-span-9 hidden justify-end gap-8 text-sm md:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-fg no-underline hover:text-accent">
              {item.label}
            </Link>
          ))}
        </nav>
        <details className="relative col-span-6 justify-self-end md:hidden">
          <summary className="cursor-pointer list-none text-sm underline underline-offset-4">Menu</summary>
          <nav aria-label="Mobile" className="absolute right-0 z-40 mt-3 grid w-52 border border-fg bg-bg">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} className="border-b border-border px-4 py-3 text-fg no-underline last:border-b-0">
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
