# De'Milia Barbers — Outreach Email (v2 · gated preview + GIF + WhatsApp)

**To:** info@demiliabarbers.co.uk
**From:** karo@appeningnow.com

> **What changed in v2:** the live site is now a **private preview** (access code).
> So the email no longer says "click around" — instead the **GIF does the selling
> inside the message**, and the access code is the reason to start a conversation:
> *WhatsApp me for the code.* That turns a link they ignored once into a reply.

---

## Subject options (pick one)

1. Built you a site mockup — 6-second preview inside
2. From a neighbour up the A12, with a small gift
3. Quick one for Arnie — new site preview, no obligation

Recommended: **#1** (specific, sets expectation, hints at the GIF).

---

## Body

> **Lead with the GIF.** In Gmail compose, drag `marketing/demilia-site-preview.gif`
> straight into the body so it sits **above** the first line and animates on open.
> (First frame is the hero, so even Outlook-desktop — which shows only frame 1 —
> still looks good.)

```
Hi Arnie,

[ animated preview GIF here ]

We loved that you're one of the best-rated barbers in Brentwood and
Upminster, with staff boasting over 20 years of experience. So I built
you what we'd ship as a website refresh — same brand, your real photos,
your real addresses, your real reviews. That clip above is the actual
thing, moving.

I'm Karo. I run Appening Now, a small AI and software studio in
Ingatestone, just up the A12 from your Brentwood shop. I noticed the
current site still routes "Book Now" to a contact form when De'Milia
is really a walk-in shop — so the refresh is built around walk-ins.

The full site is live but password-protected while it's in preview.
WhatsApp me and I'll send you the code straight away:

  https://wa.me/message/AICP4RY7KGDJP1

(or just reply to this email and I'll fire it over). Once you're in,
it's six pages, mobile-first — open it on your phone, click around,
screenshot anything. There's even a little button to swap the colours,
fonts and dark mode in real time if you or the team want to play.

The price for the refresh is GBP 500 + VAT. One flat fee, the site as
you see it. No tie-ins, no monthly fees, no chasing.

One optional extra, not part of the GBP 500 — Qlo, our walk-ins app,
live on the App Store: https://apps.apple.com/app/id6757822508
Live wait times, smart nudges when one shop is quiet, no diary to
babysit. Already running with another local barber.

If it's a yes, we'll grab a coffee in Brentwood and tighten the copy
and photos with the team. If it's a no, that's OK too — hope you like
what's there either way.

Either way, thanks for keeping the chair sharp in Essex for over
twenty years.

Karo Bonas
Appening Now · appeningnow.com
WhatsApp: https://wa.me/message/AICP4RY7KGDJP1
```

---

## Notes for sending

- **GIF-forward now, not plain text.** The old plain-text link didn't land — this
  time the visual hook is in the inbox before they decide whether to click.
- **Don't put the access code in the email.** The code is the reason to reply /
  WhatsApp — that's the engagement mechanic. (If you'd rather remove all friction,
  you *can* paste the code `demilia2026` instead — but then you lose the contact moment.)
- **Send Tuesday or Wednesday morning** (best SMB-owner response window).
- **From a personal-looking address** (karo@, not info@) — one human to another.
- **Follow up once after 5 working days**, single line:
  "Bumping this in case it got buried — happy to WhatsApp you the preview code, no pressure."

## The GIF asset

- `marketing/demilia-site-preview.gif` — 1.6 MB looping crossfade (hero → your story →
  Qlo booking → pricing). Use it inline in email **and** as the first WhatsApp message.
- Stills if you want one static teaser instead: `screenshots/02-pullquote.png` (brand)
  or `screenshots/04-pricing.png` (price hook). Both 1280×800.

## Access code

- Current preview code: **`demilia2026`** (change in `src/gate/AccessGate.tsx`, line 26).
- Hand it out over WhatsApp/reply. One code for all prospects is fine at this volume.

## Live URLs

| What | URL |
| --- | --- |
| Gated preview (what they land on) | https://demilia-barbers.vercel.app/ |
| WhatsApp (Business short link) | https://wa.me/message/AICP4RY7KGDJP1 |
| GitHub | https://github.com/kozmickb/demilia-barbers |

## Watching for engagement

Vercel Analytics (cookieless, aggregate): https://vercel.com/karos-projects-3f56d00b/demilia-barbers/analytics

- **Page Views** above your own = someone opened the gate page.
- A spike in views with **few unlocks** = the GIF is landing but the gate is too much friction → consider including the code next round.
- **Region = Essex / Greater London** = likely them.
- The real signal now lives in **WhatsApp**: a message from a new number after a send = the funnel worked.
