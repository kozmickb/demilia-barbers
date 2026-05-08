import { useEffect, useRef, useState } from 'react';

/**
 * Right-edge scissors that tracks scroll progress.
 * - A vertical dashed line runs the height of the viewport.
 * - Above the scissors the line is solid (the "cut" portion).
 * - Below it is dashed (still to cut).
 * - The scissors snip (open/close) while the user is actively scrolling.
 */
export function ScissorsTrail() {
  const [progress, setProgress] = useState(0);
  const [snipping, setSnipping] = useState(false);
  const [visible, setVisible] = useState(false);
  const snipTimer = useRef<number | null>(null);

  useEffect(() => {
    const compute = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const pct = Math.min(1, Math.max(0, window.scrollY / max));
      setProgress(pct);
      setVisible(window.scrollY > 200);
      setSnipping(true);
      if (snipTimer.current) window.clearTimeout(snipTimer.current);
      snipTimer.current = window.setTimeout(() => setSnipping(false), 220);
    };
    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
      if (snipTimer.current) window.clearTimeout(snipTimer.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={
        'pointer-events-none fixed right-3 top-0 bottom-0 z-30 hidden md:block transition-opacity duration-300 ' +
        (visible ? 'opacity-100' : 'opacity-0')
      }
    >
      {/* dashed line, full height */}
      <span className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px border-l border-dashed border-ink-900/25" />
      {/* solid "cut" portion from top to scissors */}
      <span
        className="absolute left-1/2 top-0 -translate-x-1/2 w-px bg-italia-red"
        style={{ height: `calc(${progress * 100}% - 12px)` }}
      />
      {/* scissors marker */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-bone-50 border border-ink-900/15 shadow-card h-8 w-8 text-italia-red"
        style={{ top: `${progress * 100}%` }}
      >
        <ScissorsIcon snipping={snipping} />
      </div>
      {/* progress percentage tooltip - quiet accent */}
      <div
        className="absolute left-1/2 -translate-x-[calc(100%+12px)] -translate-y-1/2 rounded-full bg-ink-950 text-bone-50 text-[10px] uppercase tracking-[0.18em] px-2 py-1 whitespace-nowrap"
        style={{ top: `${progress * 100}%`, opacity: snipping ? 1 : 0, transition: 'opacity 200ms ease' }}
      >
        {Math.round(progress * 100)}% cut
      </div>
    </div>
  );
}

function ScissorsIcon({ snipping }: { snipping: boolean }) {
  // Two blades rotating around a pivot. Snip = blades close, idle = blades open.
  // We rotate the top + bottom blade groups in opposite directions.
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <g
        style={{
          transformOrigin: '12px 12px',
          transform: snipping ? 'rotate(-12deg)' : 'rotate(0deg)',
          transition: 'transform 110ms ease',
        }}
      >
        <circle cx="6" cy="6" r="3" />
        <line x1="8.12" y1="8.12" x2="20" y2="20" />
      </g>
      <g
        style={{
          transformOrigin: '12px 12px',
          transform: snipping ? 'rotate(12deg)' : 'rotate(0deg)',
          transition: 'transform 110ms ease',
        }}
      >
        <circle cx="6" cy="18" r="3" />
        <line x1="8.12" y1="15.88" x2="20" y2="4" />
      </g>
    </svg>
  );
}
