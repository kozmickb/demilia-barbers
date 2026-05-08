import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import logoUrl from '../assets/demilia-logo.png';
import { ScissorsTrail } from '../components/ScissorsTrail';
import { ScrollToTop } from '../components/ScrollToTop';
import { Tweaker } from '../components/Tweaker';
import { ThemeProvider } from '../theme/ThemeProvider';
import { Footer } from '../sections';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about-us' },
  { label: 'Brentwood', to: '/brentwoodsalon' },
  { label: 'Upminster', to: '/upminstersalon' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact-us' },
];

export function SiteLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Reset scroll on route change unless a hash is present.
  useEffect(() => {
    if (location.hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, location.hash]);

  // Close drawer on route change.
  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-bone-50 text-ink-900 flex flex-col">
        <Topbar />
        <Header onOpenMenu={() => setMobileOpen(true)} />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <ScissorsTrail />
        <ScrollToTop />
        <Tweaker />
        <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </div>
    </ThemeProvider>
  );
}

function Topbar() {
  return (
    <div className="relative">
      <div className="italia-stripe h-1 w-full" aria-hidden />
      <div className="bg-ink-950 text-bone-100 text-[11px] sm:text-xs">
        <div className="mx-auto max-w-6xl px-5 py-2 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
          <span className="tracking-widest uppercase opacity-80">Italian Barbershop &middot; Estd 2004</span>
          <div className="flex items-center gap-3 sm:gap-5 opacity-90">
            <a href="tel:01277200008" className="hover:text-white">
              <span className="hidden sm:inline">Brentwood </span>01277 200008
            </a>
            <span className="opacity-30">|</span>
            <a href="tel:01708440144" className="hover:text-white">
              <span className="hidden sm:inline">Upminster </span>01708 440144
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 bg-bone-50/90 backdrop-blur border-b border-ink-900/10">
      <div className="mx-auto max-w-6xl px-5 py-3 md:py-4 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logoUrl} alt="De'Milia Italian Barbershop" className="demilia-logo h-9 sm:h-10 md:h-12 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-ink-700">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                'transition ' +
                (isActive
                  ? 'text-italia-green font-semibold'
                  : 'hover:text-italia-green')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact-us"
            className="hidden sm:inline-flex rounded-full bg-ink-950 px-4 py-2 text-xs sm:text-sm font-semibold text-bone-50 hover:bg-ink-800 transition"
          >
            Get in touch
          </Link>
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open menu"
            className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-ink-900/15 text-ink-900"
          >
            <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink-950/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        role="dialog"
        aria-modal={open}
        aria-label="Site menu"
        className={
          'fixed top-0 right-0 bottom-0 z-50 w-[88%] max-w-sm bg-bone-50 border-l border-ink-900/10 shadow-card flex flex-col md:hidden transition-transform duration-200 ' +
          (open ? 'translate-x-0' : 'translate-x-full')
        }
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-900/10">
          <img src={logoUrl} alt="De'Milia" className="demilia-logo h-9 w-auto" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-ink-900/15 text-ink-900"
          >
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                'block rounded-xl px-4 py-3 text-base font-display border transition ' +
                (isActive
                  ? 'border-italia-green bg-italia-green/10 text-italia-green'
                  : 'border-ink-900/10 text-ink-950 hover:border-ink-900/30')
              }
            >
              {item.label}
            </NavLink>
          ))}

          <div className="mt-6 space-y-2">
            <a
              href="tel:01277200008"
              className="flex items-center justify-between rounded-xl border border-ink-900/10 bg-bone-50 px-4 py-3 text-sm hover:border-italia-green"
            >
              <span className="text-ink-500 text-[10px] uppercase tracking-[0.2em]">Brentwood</span>
              <span className="font-display text-ink-950">01277 200008</span>
            </a>
            <a
              href="tel:01708440144"
              className="flex items-center justify-between rounded-xl border border-ink-900/10 bg-bone-50 px-4 py-3 text-sm hover:border-italia-green"
            >
              <span className="text-ink-500 text-[10px] uppercase tracking-[0.2em]">Upminster</span>
              <span className="font-display text-ink-950">01708 440144</span>
            </a>
            <a
              href="mailto:info@demiliabarbers.co.uk"
              className="flex items-center justify-between rounded-xl border border-ink-900/10 bg-bone-50 px-4 py-3 text-sm hover:border-italia-green"
            >
              <span className="text-ink-500 text-[10px] uppercase tracking-[0.2em]">Email</span>
              <span className="text-ink-950">info@demiliabarbers.co.uk</span>
            </a>
          </div>
        </nav>

        <div className="border-t border-ink-900/10 px-5 py-4">
          <Link
            to="/contact-us"
            className="block w-full rounded-full bg-ink-950 px-5 py-3 text-center text-sm font-semibold text-bone-50 hover:bg-ink-800 transition"
          >
            Get in touch
          </Link>
        </div>
      </aside>
    </>
  );
}
