import { About, CTA, Reviews, StylishPhoto, Team } from '../sections';
import teamPhoto from '../assets/demilia-shop2.jpg';

export default function AboutUs() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-900/10">
        <div className="absolute inset-0 cream-grain opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.22em] text-italia-green font-semibold">About Us</p>
            <h1 className="mt-3 font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink-950 leading-tight max-w-3xl">
              An Italian barbershop, two decades and counting.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-ink-700 max-w-2xl leading-relaxed">
              Founded by Arnie De&apos;Milia, kept honest by a team of Italian barbers with twenty
              plus years each at the chair. Two shops, one standard.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-ink-900/10 bg-bone-50 shadow-card">
              <StylishPhoto
                src={teamPhoto}
                alt="The De'Milia team with a regular client"
                className="aspect-[4/5]"
                position="object-center"
              />
            </div>
          </div>
        </div>
      </section>
      <About />
      <Team />
      <Reviews />
      <CTA />
    </>
  );
}
