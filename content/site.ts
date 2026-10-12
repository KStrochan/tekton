import type { SiteConfig } from "./types";

export const site: SiteConfig = {
  name: "Tekton",
  description: "Made-to-measure wardrobes, kitchens and shelving, built in our own workshop.",
  url: "https://tekton-seven.vercel.app",
  locale: "en",
  routes: ["/", "/configurator", "/contact"],
  nav: [
    { href: "/#work", label: "Work" },
    { href: "/#process", label: "Process" },
    { href: "/configurator", label: "Configurator" },
    { href: "/contact", label: "Contact" },
  ],
  contact: {
    phone: "+1 (555) 017-3300",
    address: "Unit 4, 19 Sawmill Yard, Eastport",
    hours: "Showroom open Tue to Sat, 10:00 to 17:00",
  },
  photoCredits: [
    { author: "Alex Tyson", url: "https://unsplash.com/@alextyson195" },
    { author: "Pawel Czerwinski", url: "https://unsplash.com/@pawel_czerwinski" },
    { author: "Brecht Corbeel", url: "https://unsplash.com/@brechtcorbeel" },
    { author: "Ali Mkumbwa", url: "https://unsplash.com/@mkumbwajr" },
    { author: "Francesca Tosolini", url: "https://unsplash.com/@fromitaly" },
  ],
};
