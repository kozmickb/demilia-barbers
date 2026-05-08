import { About, CTA, Reviews, Team } from '../sections';

export default function AboutUs() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="An Italian barbershop, two decades and counting."
        body="Founded by Arnie De'Milia, kept honest by a team of Italian barbers with twenty plus years each at the chair. Two shops, one standard."
      />
      <About />
      <Team />
      <Reviews />
      <CTA />
    </>
  );
}

function PageHero({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <section className="relative overflow-hidden border-b border-ink-900/10">
      <div className="absolute inset-0 cream-grain opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5">
        <p className="text-xs uppercase tracking-[0.22em] text-italia-green font-semibold">{eyebrow}</p>
        <h1 className="mt-3 font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink-950 leading-tight max-w-3xl">
          {title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-ink-700 max-w-2xl leading-relaxed">{body}</p>
      </div>
    </section>
  );
}
