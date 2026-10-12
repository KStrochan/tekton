# Tekton

Demo website for Tekton, a custom furniture workshop I made up for my portfolio. The business, people and prices are fictional; the code is real.

Made-to-measure wardrobes, kitchens and shelving, built in our own workshop.

## Status

Live at https://tekton-seven.vercel.app

What is built:

- Home: recent work, six starting-point pieces, materials, the making process and the workshop
- Configurator (`/configurator`): type, sizes, material and front with a live scaled drawing, price, and a list of pieces kept for the session
- Contact page (`/contact`) that receives the whole list as a quote request

Still to do:

- [ ] Separate catalogue pages for each piece

## Design

Swiss minimalism: a strict grid, large type, plenty of white space and a single oxblood accent.

| Token | Value |
| --- | --- |
| bg | `#F4F2EE` |
| surface | `#FFFFFF` |
| fg | `#111111` |
| muted | `#55524D` |
| border | `#D6D2CA` |
| accent | `#8C2F39` |
| on accent | `#FFFFFF` |
| link | `#8C2F39` |
| error | `#B42318` |
| radius | `0px` |

Headings and body text use Inter Tight, which is self-hosted from `app/fonts` through `next/font/local`.

## Stack

- Next.js 16 (App Router), React 19
- TypeScript in strict mode
- Tailwind CSS 4
- zod for form validation
- Vitest and Testing Library
- Lighthouse CI

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run check` | Type check, lint and tests |
| `npm run lighthouse` | Builds the site, runs Lighthouse five times on mobile and fails if the median score in any category drops below 95 or the median LCP goes above 2.5 s |

## Contact form

Enquiries go to a Telegram chat. Copy `.env.example` to `.env.local` and fill in `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`. Without them the form runs in demo mode and tells the visitor that nothing was sent.

## Deploying

Import the repository in Vercel and add the two Telegram variables if the form should deliver leads. If the domain changes, update `url` in `content/site.ts` and `tests/metadata.test.ts`.

## Credits

Fonts are licensed under the SIL Open Font License; the license texts are in `app/fonts`. Photos are hotlinked from Unsplash and credited in the site footer.

## License

Code: MIT
