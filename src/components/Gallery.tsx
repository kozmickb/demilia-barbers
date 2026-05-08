import { useCallback, useEffect, useState } from 'react';
import { GALLERY } from '../data/gallery';
import { track } from '../lib/analytics';

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % GALLERY.length)),
    [],
  );
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length)),
    [],
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activeIndex, close, next, prev]);

  return (
    <section id="gallery" className="bg-bone-50 border-y border-ink-900/10">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-italia-green font-semibold">The work</p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink-950">
              Twenty years of Italian craft, one chair at a time.
            </h2>
            <p className="mt-3 text-ink-700 max-w-xl">
              A small selection of cuts, shaves, and salon moments from Brentwood and Upminster.
              Real clients, real chairs, no stock photos.
            </p>
          </div>
          <a
            href="https://www.instagram.com/demiliabarbers/"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full border border-ink-900/15 px-5 py-2 text-sm font-semibold text-ink-900 hover:bg-bone-100 transition"
          >
            More on Instagram
          </a>
        </div>

        <div
          className="columns-2 sm:columns-3 lg:columns-4 gap-3 md:gap-4 [column-fill:_balance]"
          role="list"
        >
          {GALLERY.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => {
                track('gallery_image_opened', { index: i, alt: img.alt });
                setActiveIndex(i);
              }}
              className="group mb-3 md:mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl border border-ink-900/5 bg-bone-100 shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-italia-green"
              aria-label={`Open image ${i + 1} of ${GALLERY.length}: ${img.alt}`}
              role="listitem"
            >
              <div className="relative">
                <img
                  src={img.thumb}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block transition duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="pointer-events-none absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-bone-50 opacity-0 group-hover:opacity-100 transition">
                  <span className="rounded-full bg-ink-950/70 px-2 py-1 backdrop-blur">View</span>
                  <span className="rounded-full bg-italia-green/90 px-2 py-1">{i + 1} / {GALLERY.length}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <Lightbox
          image={GALLERY[activeIndex]}
          index={activeIndex}
          total={GALLERY.length}
          onClose={close}
          onNext={next}
          onPrev={prev}
        />
      )}
    </section>
  );
}

type LightboxProps = {
  image: (typeof GALLERY)[number];
  index: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

function Lightbox({ image, index, total, onClose, onNext, onPrev }: LightboxProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/95 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery image ${index + 1} of ${total}`}
      onClick={onClose}
    >
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-bone-100 text-xs uppercase tracking-[0.2em]">
        <span>De&apos;Milia Gallery &middot; {index + 1} / {total}</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="rounded-full border border-bone-50/20 px-4 py-2 hover:bg-white/10 transition"
        >
          Close (Esc)
        </button>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-bone-50/20 bg-ink-900/60 text-bone-50 hover:bg-ink-800 transition"
      >
        &larr;
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-bone-50/20 bg-ink-900/60 text-bone-50 hover:bg-ink-800 transition"
      >
        &rarr;
      </button>

      <figure
        className="relative max-h-[88vh] max-w-[92vw] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.full}
          alt={image.alt}
          className="max-h-[80vh] w-auto rounded-xl shadow-2xl object-contain"
        />
        <figcaption className="mt-3 text-center text-xs text-bone-200/80 max-w-xl">
          {image.alt}
        </figcaption>
      </figure>
    </div>
  );
}
