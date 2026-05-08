import { Gallery } from '../components/Gallery';
import { CTA } from '../sections';

export default function GalleryPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-900/10">
        <div className="absolute inset-0 cream-grain opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5">
          <p className="text-xs uppercase tracking-[0.22em] text-italia-green font-semibold">Gallery</p>
          <h1 className="mt-3 font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink-950 leading-tight max-w-3xl">
            Twenty years of Italian craft, one chair at a time.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-700 max-w-2xl leading-relaxed">
            A small selection of cuts, shaves, and salon moments from Brentwood and Upminster.
            Real clients, real chairs, no stock photos.
          </p>
        </div>
      </section>
      <Gallery />
      <CTA />
    </>
  );
}
