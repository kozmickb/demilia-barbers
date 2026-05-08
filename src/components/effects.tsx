import { useEffect, useRef, useState, type ReactNode } from 'react';

const REDUCED_MOTION = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------ Parallax */

/**
 * Translates children on scroll for a parallax effect.
 * speed > 0 moves slower than the page (parallax bg).
 * speed < 0 reverses for foreground floating elements.
 */
export function Parallax({
  children,
  speed = 0.3,
  className = '',
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (REDUCED_MOTION()) return;
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const diff = viewportCenter - elementCenter;
      setOffset(diff * speed);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform: `translate3d(0, ${offset}px, 0)`, willChange: 'transform' }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------ Word reveal */

/**
 * Splits the children string into words and animates each in with a small
 * upward translate + fade-in, staggered by index. Fires once on mount.
 */
export function WordReveal({
  text,
  className = '',
  highlight,
  highlightClassName = 'text-italia-red not-italic',
  stagger = 60,
  as = 'span',
}: {
  text: string;
  className?: string;
  highlight?: string;
  highlightClassName?: string;
  stagger?: number;
  as?: 'span' | 'h1' | 'h2';
}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (REDUCED_MOTION()) {
      setShown(true);
      return;
    }
    const t = window.setTimeout(() => setShown(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  const words = text.split(' ');
  const Component = as as 'span';

  return (
    <Component className={className}>
      {words.map((w, i) => {
        const isHighlight = highlight && (w === highlight || text.indexOf(highlight) >= 0 && text.indexOf(highlight, text.indexOf(highlight)) === text.indexOf(w));
        return (
          <span key={`${w}-${i}`} className="inline-block">
            <span
              className={
                'inline-block transition-all duration-700 ease-out ' +
                (shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[0.25em]') +
                (isHighlight ? ' ' + highlightClassName : '')
              }
              style={{ transitionDelay: shown ? `${i * stagger}ms` : '0ms' }}
            >
              {w}
            </span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
      })}
    </Component>
  );
}

/* ------------------------------------------------------------ Counter */

/**
 * Animates a number from 0 to value when the element enters the viewport.
 * Honors prefers-reduced-motion.
 */
export function Counter({
  value,
  duration = 1200,
  prefix = '',
  suffix = '',
  className = '',
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (REDUCED_MOTION()) {
      setDisplay(value);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4); // ease-out-quart
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------ Tilt */

/**
 * Mouse-follow 3D tilt wrapper. Subtle rotateX/Y based on cursor position.
 * Resets smoothly on mouse leave. Disabled for reduced-motion users.
 */
export function Tilt({
  children,
  max = 6,
  className = '',
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => setReduced(REDUCED_MOTION()), []);

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: 'transform 250ms ease-out', transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------ Marquee */

/**
 * Infinite-scrolling horizontal strip. Doubles its children for seamless loop.
 */
export function Marquee({
  children,
  speed = 40,
  className = '',
}: {
  children: ReactNode;
  speed?: number; // seconds per loop
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `demilia-marquee ${speed}s linear infinite`,
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ Brand orbs */

/**
 * Soft italia-color blurred orbs that drift gently behind hero content.
 * Pure CSS animation; honors reduced-motion via index.css.
 */
export function HeroOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <span className="absolute -top-32 -left-20 h-[28rem] w-[28rem] rounded-full bg-italia-green/15 blur-3xl demilia-orb-a" />
      <span className="absolute top-1/3 -right-20 h-[22rem] w-[22rem] rounded-full bg-italia-red/12 blur-3xl demilia-orb-b" />
      <span className="absolute bottom-0 left-1/3 h-[18rem] w-[18rem] rounded-full bg-bone-300/30 blur-3xl demilia-orb-c" />
    </div>
  );
}
