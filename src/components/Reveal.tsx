import { useEffect, useRef, useState, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section';
  threshold?: number;
};

/**
 * Wraps children in a fade + slide-up that triggers when the element enters
 * the viewport. Per the ui-ux-pro-max stagger-sequence + motion-meaning
 * rules: 700ms ease-out, ~12px translate, optional delay for staggered
 * children. Honors prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, className = '', as = 'div', threshold = 0.12 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  const Component = as as 'div';
  return (
    <Component
      ref={ref}
      className={
        'transition-all duration-700 ease-out will-change-transform will-change-opacity ' +
        (shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3') +
        (className ? ' ' + className : '')
      }
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Component>
  );
}
