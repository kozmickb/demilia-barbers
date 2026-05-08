# De'Milia Barbers - Website Refresh Prototype

A one-day prototype of a modern, mobile-first one-pager for [De'Milia Barbers](https://www.demiliabarbers.co.uk/), the Italian barbershop with salons in Brentwood and Upminster. The point of the prototype: show what an integrated online booking experience would look like, on the brand they already have.

## What this would do for them

De'Milia's current site sends every booking through a contact form that ends in a "Thanks for submitting!" message and a phone callback. Customers and staff time get burnt on phone tag. This prototype replaces that with a 30-second pick-shop, pick-time, pick-barber flow, on the same brand (the real DE'MILIA logo, ESTD 2004 mark, Italian-flag accents), so screenshotting the demo into a cold email immediately reads as "this is for you, not a stock template".

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173. Build with `npm run build`.

## Deploy to Vercel

```bash
npx vercel --prod
```

Or connect the repo on https://vercel.com/new - it autodetects Vite.

## Where each design decision came from

Each section maps back to a captured research field for De'Milia:

| Research field | How the prototype answers it |
| --- | --- |
| **Website gap** ("Book Now" leads to a contact form that just says "Thanks for submitting!") | The whole page is built around the `#book` section: a live three-step picker (Salon, Service, Day & Time) with a confirm button, replacing the dead form. |
| **Tech pain point** (manual phone booking, two locations to coordinate) | "Two salons, one diary" framing on the booking widget and locations section. The hero promises a chair in 30 seconds, not three phone calls. |
| **Compliment hook** ("one of the best-rated barbers in Brentwood and Upminster, with staff boasting over 20 years of experience") | Used verbatim in the hero subhead, with "here's how we'd build on that" as the bridge into the demo. |
| **Urgency signal** (broken booking flow loses high-demand bookings) | The CTA panel headline: "Stop missing calls. Start filling chairs." |
| **Local connection** (Appening Now is also Brentwood-based) | Footer line names Appening Now as a Brentwood-based AI consultancy, plus a closing italia-stripe motif tying us into the local-Italian-heritage story. |

Real brand details pulled directly from demiliabarbers.co.uk via Firecrawl:

- Real DE'MILIA logo (`src/assets/demilia-logo.png`)
- Real address, phone, and opening hours for both salons
- Real product list: American Crew, Kevin Murphy, DS Laboratories, DFI
- Founder name (Arnie De'Milia) and 2004 establishment date
- Real Instagram and Facebook links

Service prices and individual review names are realistic placeholders (Brentwood barber market rates), to keep the prototype demo-only and not impersonate real prices that may be wrong.

## Stack

- React 18 + Vite + TypeScript
- Tailwind CSS for styling, Playfair Display + Inter via Google Fonts
- No data layer, no analytics, no cookies, no auth. The demo is the demo.

## Hard constraints honoured

- No em dashes anywhere in copy or code (hyphens and commas only)
- Tone is local Essex SMB, not Silicon Valley. No "revolutionise", no "synergy"
- Mobile-first; the booking widget collapses cleanly on a phone
- One page. No analytics. No cookie banner.

## File layout

```
src/
  App.tsx                    - top-level composition + sections
  index.css                  - CSS variables for theming + density + helpers
  main.tsx
  assets/
    demilia-logo.png
    demilia-hero.jpg
    demilia-shop1.png
    demilia-shop2.jpg
  components/
    Gallery.tsx              - masonry gallery + lightbox
    Tweaker.tsx              - floating drawer to swap theme/accent/font/density
  data/
    gallery.ts               - 24 real gallery photos via Wix CDN
  theme/
    ThemeProvider.tsx        - localStorage-backed theme context
```

## Sections (every Wix link mapped to an in-page anchor)

| Wix link              | Anchor              | Notes |
| --------------------- | ------------------- | --- |
| Home                  | `#top`              | Hero + booking widget |
| About Us              | `#about`            | Real "since 1999" copy + 4 craft cards |
| Brentwood Salon       | `#brentwood`        | Address, travel, parking, hours, "highest-rated in Brentwood" |
| Upminster Salon       | `#upminster`        | Address, travel, parking, hours, "the original" |
| Gallery               | `#gallery`          | 24 real photos, masonry + lightbox |
| Contact Us            | `#contact`          | Form + email + both phones + socials |

## Tweak drawer

Floating button bottom-right opens a drawer that lets the visitor (or staff) swap:

- **Theme**: light cream <-> deep ink
- **Accent palette**: 4 presets that all stay close to the Italian-heritage vibe (Italian Emerald, Espresso Navy, Warm Sage, Oxblood Brass)
- **Typeface pair**: Editorial (Playfair + Inter), Modern (DM Serif + Inter), Classic (Cormorant + Crimson Pro), Clean Sans (Manrope only)
- **Density**: comfortable / compact (compact is useful when capturing a short screenshot)

Selections persist to `localStorage` under the `demilia-theme-v1` key. Implementation: CSS custom properties on `<html>`, swapped via `data-theme` / `data-accent` / `data-font` / `data-density` attributes. Tailwind colours (`bone`, `ink`, `italia.green`, `italia.red`) are wired to those vars, so nothing in the markup needs changing per-theme.
