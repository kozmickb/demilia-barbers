import { Contact, Locations } from '../sections';

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-900/10">
        <div className="absolute inset-0 cream-grain opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5">
          <p className="text-xs uppercase tracking-[0.22em] text-italia-green font-semibold">Contact Us</p>
          <h1 className="mt-3 font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink-950 leading-tight max-w-3xl">
            Two shops, one conversation away.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-700 max-w-2xl leading-relaxed">
            Drop a note, call either salon directly, or come and find us in Brentwood or Upminster.
          </p>
        </div>
      </section>
      <Contact />
      <Locations />
    </>
  );
}
