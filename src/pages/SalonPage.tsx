import { Link } from 'react-router-dom';
import { CTA, Reviews, SalonCard, Services } from '../sections';
import { LOCATIONS, type Location } from '../data';

export function BrentwoodSalonPage() {
  return <SalonPage loc={LOCATIONS[0]} otherSlug="upminstersalon" otherShort="Upminster" />;
}

export function UpminsterSalonPage() {
  return <SalonPage loc={LOCATIONS[1]} otherSlug="brentwoodsalon" otherShort="Brentwood" />;
}

function SalonPage({ loc, otherSlug, otherShort }: { loc: Location; otherSlug: string; otherShort: string }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-900/10">
        <div className="absolute inset-0 cream-grain opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 grid md:grid-cols-12 gap-8 md:gap-10 items-start">
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.22em] text-italia-green font-semibold">{loc.short} Salon</p>
            <h1 className="mt-3 font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink-950 leading-tight">
              {loc.headline}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-ink-700 max-w-2xl leading-relaxed">
              {loc.where}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={loc.phoneHref}
                className="rounded-full bg-ink-950 px-5 py-3 text-sm font-semibold text-bone-50 hover:bg-ink-800 transition"
              >
                Call {loc.short}
              </a>
              <a
                href={loc.mapsHref}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-full border border-ink-900/15 px-5 py-3 text-sm font-semibold text-ink-900 hover:bg-bone-100 transition"
              >
                Get directions
              </a>
              <Link
                to={`/${otherSlug}`}
                className="rounded-full border border-italia-green/40 bg-italia-green/5 px-5 py-3 text-sm font-semibold text-italia-green hover:bg-italia-green/10 transition"
              >
                {otherShort} salon &rarr;
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 md:sticky md:top-24">
            <SalonCard loc={loc} hideImage />
          </div>
        </div>
      </section>

      <Services />
      <Reviews filter={loc.short as 'Brentwood' | 'Upminster'} />
      <CTA />
    </>
  );
}
