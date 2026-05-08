import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from './components/Reveal';
import { Counter, HeroOrbs, Marquee, Parallax, Tilt, WordReveal } from './components/effects';
import { track } from './lib/analytics';
import logoUrl from './assets/demilia-logo.png';
import heroImg from './assets/demilia-shop1.png';
import qloLogoUrl from './assets/qlo-logo.png';
import qloIconDark from './assets/qlo-icon-dark.png';

const QLO_APP_STORE_URL = 'https://apps.apple.com/app/id6757822508';
import {
  LOCATIONS,
  REVIEWS,
  SERVICES,
  TEAM,
  TIMES,
  classNames,
  getNextDays,
  type Location,
} from './data';

/* ------------------------------------------------------------ Hero */

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <HeroOrbs />
      <div className="absolute inset-0 cream-grain opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-italia-green/30 bg-italia-green/5 px-3 py-1 text-xs font-medium text-italia-green">
            <span className="h-1.5 w-1.5 rounded-full bg-italia-green animate-pulse" />
            Website refresh proposal &middot; Brentwood &amp; Upminster
          </span>
          <h1 className="mt-5 font-display font-semibold text-4xl sm:text-5xl md:text-7xl leading-[1.1] md:leading-[1.05] tracking-tight text-ink-950 pb-1">
            <WordReveal text="A site that does justice to" />{' '}
            <em className="text-italia-red not-italic">
              <WordReveal text="twenty plus years" stagger={70} />
            </em>{' '}
            <WordReveal text="of craft." stagger={70} />
          </h1>
          <p className="mt-5 text-base sm:text-lg text-ink-700 max-w-xl leading-relaxed">
            We loved that you&apos;re one of the best-rated barbers in Brentwood and Upminster, with
            staff boasting over 20 years of experience. Here&apos;s how we&apos;d build on that: a
            modern, mobile-first site, true to your brand, that reads as sharp as the cut.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/about-us"
              className="rounded-full bg-italia-red px-6 py-3 text-sm font-semibold text-bone-50 hover:opacity-90 hover:scale-[1.02] shadow-card transition"
            >
              See the refresh
            </Link>
            <Link
              to="/gallery"
              className="rounded-full border border-ink-900/15 px-5 py-3 text-sm font-semibold text-ink-900 hover:bg-ink-950/5 transition"
            >
              The work
            </Link>
            <a
              href="#qlo"
              className="rounded-full border border-ink-900/15 px-5 py-3 text-sm font-semibold text-ink-900 hover:bg-ink-950/5 transition"
            >
              + Qlo for walk-ins
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 sm:gap-6 max-w-lg">
            <Stat
              value={<Counter value={20} suffix="+ yrs" />}
              label="per master barber"
            />
            <Stat value="Since 2004" label="Italian heritage" />
            <Stat
              value={
                <span className="inline-flex items-baseline gap-1.5">
                  <span aria-hidden className="text-italia-red">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                </span>
              }
              label={<><Counter value={130} suffix="+" /> Google reviews</>}
            />
          </dl>
        </div>
        <div className="md:col-span-5">
          <Parallax speed={-0.08}>
            <Tilt max={4}>
              <HeroCard />
            </Tilt>
          </Parallax>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: React.ReactNode; label: React.ReactNode }) {
  return (
    <div>
      <dt className="font-display text-xl sm:text-2xl text-ink-950 tabular-nums">{value}</dt>
      <dd className="text-[10px] sm:text-xs uppercase tracking-wider text-ink-500 mt-1">{label}</dd>
    </div>
  );
}

function HeroCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-3 rounded-3xl bg-italia-green/5 blur-xl" />
      <div className="relative rounded-2xl overflow-hidden border border-ink-900/10 bg-bone-50 shadow-card">
        <div
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-1 z-10"
          style={{
            background: 'linear-gradient(180deg, rgb(var(--accent)) 0%, rgb(var(--accent)) 33%, rgb(var(--bone-50)) 33%, rgb(var(--bone-50)) 66%, rgb(var(--accent-2)) 66%, rgb(var(--accent-2)) 100%)',
          }}
        />
        <div className="aspect-[4/5] bg-ink-950 relative">
          <img src={heroImg} alt="De'Milia barber at work" className="absolute inset-0 h-full w-full object-cover opacity-95" />
          <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-ink-950/85 via-ink-950/40 to-transparent">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.22em] text-bone-200">De&apos;Milia &middot; Italian Barbershop</span>
              <span className="rounded-full bg-italia-green text-bone-50 px-2.5 py-0.5 text-xs font-medium">
                Established 2004
              </span>
            </div>
            <p className="mt-3 text-bone-50 font-display text-lg sm:text-xl leading-tight">
              Same chairs. Same blades. A site that finally matches the standard.
            </p>
          </div>
        </div>
        <div className="p-4 text-sm text-ink-700">
          Mobile-first, fast, and built around your real photos and reviews. Online booking is
          optional, we can wire it in if you want it.
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ Brand marquee */

const MARQUEE_TOKENS = [
  'ESTD 2004',
  'ITALIAN BARBERSHOP',
  'BRENTWOOD',
  '20+ YEARS AT THE CHAIR',
  'UPMINSTER',
  'HOT TOWEL SHAVES',
  '130+ FIVE-STAR REVIEWS',
  'WALK-INS WELCOME',
];

export function BrandMarquee() {
  return (
    <section className="bg-ink-950 text-bone-50 border-y border-ink-900/20 relative overflow-hidden" style={{ paddingTop: 0, paddingBottom: 0 }}>
      <div className="italia-stripe absolute top-0 left-0 right-0 h-px opacity-50" aria-hidden />
      <Marquee speed={48} className="py-4">
        {MARQUEE_TOKENS.concat(MARQUEE_TOKENS).map((t, i) => (
          <span key={i} className="flex items-center gap-6 px-6 font-display text-base sm:text-lg uppercase tracking-[0.18em]">
            <span>{t}</span>
            <span aria-hidden className="text-italia-red opacity-80">&#10022;</span>
          </span>
        ))}
      </Marquee>
      <div className="italia-stripe absolute bottom-0 left-0 right-0 h-px opacity-50" aria-hidden />
    </section>
  );
}

/* ------------------------------------------------------------ Booking proposal */

export function BookingProposal() {
  const days = useMemo(() => getNextDays(7), []);
  const firstOpen = days.findIndex((d) => !d.closed);
  const [open, setOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(firstOpen >= 0 ? firstOpen : 0);
  const [activeTime, setActiveTime] = useState<string | null>('11:00');
  const [activeLocation, setActiveLocation] = useState(0);
  const [activeService, setActiveService] = useState(0);

  // Auto-expand if the user lands on #book directly.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === '#book') setOpen(true);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  return (
    <section id="book" className="border-y border-ink-900/10 bg-bone-100 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-italia-green font-semibold">
              Online booking &middot; optional
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl text-ink-950 leading-tight">
              And here&apos;s the same thing as a booking page, if you change your mind one day.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-ink-700 leading-relaxed">
              Demo only. We don&apos;t think you need this today (QLO above is the better fit), but
              the door stays open. Pick a salon, a chair, a time, send a text confirmation.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen((v) => {
                track(v ? 'booking_collapsed' : 'booking_expanded');
                return !v;
              });
            }}
            aria-expanded={open}
            aria-controls="booking-picker"
            className="rounded-full bg-ink-950 px-5 py-3 text-sm font-semibold text-bone-50 hover:bg-ink-800 transition flex items-center gap-2 shrink-0"
          >
            {open ? 'Hide demo' : 'See the picker'}
            <svg
              viewBox="0 0 24 24"
              width={14}
              height={14}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms ease' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        <div
          id="booking-picker"
          className={
            'grid lg:grid-cols-3 gap-5 transition-all duration-300 ease-out overflow-hidden ' +
            (open ? 'mt-8 max-h-[2000px] opacity-100' : 'mt-0 max-h-0 opacity-0')
          }
          aria-hidden={!open}
        >
          <div className="lg:col-span-1 rounded-2xl border border-ink-900/10 bg-bone-50 p-5">
            <h3 className="text-xs font-semibold text-ink-500 uppercase tracking-[0.22em]">1. Salon</h3>
            <div className="mt-3 space-y-2">
              {LOCATIONS.map((loc, i) => (
                <button
                  key={loc.name}
                  onClick={() => setActiveLocation(i)}
                  className={classNames(
                    'w-full text-left rounded-xl border px-4 py-3 transition',
                    activeLocation === i
                      ? 'border-ink-950 bg-bone-50 shadow-card'
                      : 'border-ink-900/10 bg-bone-50 hover:border-ink-900/30',
                  )}
                >
                  <div className="font-semibold text-ink-950">{loc.name}</div>
                  <div className="text-xs text-ink-500 mt-0.5">{loc.address}</div>
                </button>
              ))}
            </div>

            <h3 className="mt-6 text-xs font-semibold text-ink-500 uppercase tracking-[0.22em]">2. Service</h3>
            <div className="mt-3 space-y-2">
              {SERVICES.slice(0, 4).map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setActiveService(i)}
                  className={classNames(
                    'w-full flex items-center justify-between rounded-xl border px-4 py-2.5 text-sm transition',
                    activeService === i
                      ? 'border-ink-950 bg-bone-50 shadow-card'
                      : 'border-ink-900/10 bg-bone-50 hover:border-ink-900/30',
                  )}
                >
                  <span className="text-ink-950">{s.name}</span>
                  <span className="text-ink-500 font-medium">{s.price}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 rounded-2xl border border-ink-900/10 bg-bone-50 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-ink-500 uppercase tracking-[0.22em]">3. When suits you</h3>
              <span className="text-xs text-ink-500">{LOCATIONS[activeLocation].short} salon</span>
            </div>

            <div className="mt-3 grid grid-cols-7 gap-2">
              {days.map((d, i) => (
                <button
                  key={d.iso}
                  onClick={() => !d.closed && setActiveDay(i)}
                  disabled={d.closed}
                  className={classNames(
                    'rounded-xl border py-3 text-center transition',
                    d.closed
                      ? 'border-ink-900/5 bg-bone-100 text-ink-400 line-through cursor-not-allowed'
                      : activeDay === i
                        ? 'border-ink-950 bg-bone-50 shadow-card'
                        : 'border-ink-900/10 bg-bone-50 hover:border-ink-900/30',
                  )}
                >
                  <div className="text-[10px] uppercase tracking-widest text-ink-500">{d.label}</div>
                  <div className={classNames('mt-1 font-display text-lg sm:text-xl', d.closed ? '' : 'text-ink-950')}>{d.day}</div>
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TIMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTime(t)}
                  className={classNames(
                    'rounded-xl border py-3 text-sm font-medium transition',
                    activeTime === t
                      ? 'border-italia-green bg-italia-green text-bone-50 shadow-card'
                      : 'border-ink-900/10 bg-bone-50 text-ink-900 hover:border-ink-900/30',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-ink-950 text-bone-50 px-5 py-4">
              <div className="text-sm">
                <div className="text-bone-200/70 text-[10px] uppercase tracking-[0.22em]">Your booking</div>
                <div className="mt-1">
                  <span className="font-display text-lg">{SERVICES[activeService].name}</span>
                  <span className="text-bone-200/80"> at </span>
                  <span className="font-display text-lg">{LOCATIONS[activeLocation].short}</span>
                  <span className="text-bone-200/80">, {days[activeDay]?.label} {activeTime ?? ''}</span>
                </div>
              </div>
              <button className="rounded-full bg-italia-red px-5 py-2.5 text-sm font-semibold text-bone-50 hover:opacity-90 transition">
                Confirm booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ QLO walk-in proposition */

const QLO_FEATURES: Array<{ title: string; body: string }> = [
  {
    title: 'Live wait times',
    body: 'Customers see how busy each salon is right now, before they leave the house. Fewer wasted trips, more chairs filled.',
  },
  {
    title: 'Smart demand predictions',
    body: 'Quiet Tuesday afternoon? QLO nudges nearby regulars to pop in. Saturday rammed? It tells late-comers to swing by Upminster instead.',
  },
  {
    title: 'No diary to manage',
    body: 'Walk-in only stays walk-in only. No appointments to forget, no double-bookings, no admin time eaten on the phone.',
  },
];

export function QloProposal() {
  const [open, setOpen] = useState(false);
  return (
    <section id="qlo" className="border-y border-ink-900/10 bg-bone-50 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <img
                src={qloLogoUrl}
                alt="Qlo"
                className="h-9 sm:h-10 w-auto rounded-xl"
              />
              <span className="text-xs uppercase tracking-[0.22em] text-italia-red font-semibold">
                Better fit: walk-ins, not bookings
              </span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl text-ink-950 leading-tight">
              You&apos;re a walk-in shop. Meet Qlo.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-ink-700 leading-relaxed">
              Bookings aren&apos;t how De&apos;Milia works. Walk-ins are. Qlo is a real app, live on the
              App Store, built for shops exactly like yours: live wait times, smart nudges when
              it&apos;s quiet, no diary to babysit.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={QLO_APP_STORE_URL}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Download Qlo on the App Store"
                onClick={() => track('qlo_app_store_clicked')}
                className="inline-flex items-center gap-3 rounded-xl bg-ink-950 text-bone-50 pl-3 pr-4 py-2 hover:bg-ink-800 transition shadow-card"
              >
                <AppleIcon className="h-6 w-6" />
                <span className="leading-tight">
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-bone-200/80">Download on the</span>
                  <span className="block font-display text-base">App Store</span>
                </span>
              </a>
              <span className="text-xs text-ink-500">Live now &middot; iPhone &middot; free</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen((v) => {
                track(v ? 'qlo_collapsed' : 'qlo_expanded');
                return !v;
              });
            }}
            aria-expanded={open}
            aria-controls="qlo-detail"
            className="rounded-full bg-italia-red px-5 py-3 text-sm font-semibold text-bone-50 hover:opacity-90 transition flex items-center gap-2 shrink-0"
          >
            {open ? 'Hide Qlo' : 'See how Qlo fits'}
            <svg
              viewBox="0 0 24 24"
              width={14}
              height={14}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms ease' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        <div
          id="qlo-detail"
          className={
            'grid lg:grid-cols-3 gap-5 transition-all duration-300 ease-out overflow-hidden ' +
            (open ? 'mt-8 max-h-[2400px] opacity-100' : 'mt-0 max-h-0 opacity-0')
          }
          aria-hidden={!open}
        >
          <div className="lg:col-span-1 space-y-3">
            {QLO_FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={open ? i * 60 : 0}>
                <div className="rounded-2xl border border-ink-900/10 bg-bone-50 p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
                  <h3 className="font-display text-lg sm:text-xl text-ink-950 leading-tight">{f.title}</h3>
                  <p className="mt-2 text-sm text-ink-700 leading-relaxed">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-2 grid gap-4">
            <Reveal delay={open ? 120 : 0}>
              <QloCustomerCard />
            </Reveal>
            <Reveal delay={open ? 200 : 0}>
              <QloOwnerCard />
            </Reveal>
          </div>
        </div>

        <p className={'mt-5 text-xs text-ink-500 ' + (open ? '' : 'hidden')}>
          QLO is built by Appening Now. Currently running at Mitchell&apos;s in Brentwood.
        </p>
      </div>
    </section>
  );
}

function AppleIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.365 1.43c0 1.14-.42 2.22-1.13 3.04-.78.91-2.04 1.61-3.07 1.53-.13-1.12.41-2.27 1.1-3.05.78-.88 2.1-1.55 3.1-1.52zM21 17.34c-.59 1.32-.87 1.92-1.62 3.09-1.05 1.62-2.53 3.65-4.36 3.66-1.62.02-2.04-1.05-4.25-1.04-2.21.01-2.66 1.06-4.29 1.04-1.84-.02-3.23-1.85-4.28-3.47C-.59 16.06-.92 10.55 1.6 7.34c1.36-1.74 3.51-2.76 5.55-2.76 2.07 0 3.37 1.13 5.08 1.13 1.66 0 2.67-1.13 5.07-1.13 1.81 0 3.74.99 5.11 2.69-4.49 2.46-3.76 8.86-1.41 10.07z" />
    </svg>
  );
}

function QloCustomerCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-ink-900/10 bg-ink-950 text-bone-50 shadow-card">
      <div className="px-5 py-4 border-b border-bone-50/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={qloIconDark} alt="" className="h-8 w-8 rounded-lg" aria-hidden />
          <span className="text-[10px] uppercase tracking-[0.22em] text-bone-200/70">Customer view &middot; Qlo app</span>
        </div>
        <span className="rounded-full bg-italia-green text-bone-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">Live</span>
      </div>
      <div className="p-5 grid sm:grid-cols-2 gap-3">
        <SalonStatus name="Brentwood" status="open" wait="~12 min" detail="3 ahead of you" tone="ok" />
        <SalonStatus name="Upminster" status="quiet" wait="Walk straight in" detail="No queue right now" tone="great" />
      </div>
      <div className="px-5 pb-5 -mt-1">
        <div className="rounded-xl bg-bone-50/5 border border-bone-50/10 px-4 py-3 text-xs text-bone-100/80 flex items-center justify-between gap-3">
          <span>&ldquo;Today is quieter at Upminster - skip the wait?&rdquo;</span>
          <span className="rounded-full bg-italia-red px-3 py-1 text-bone-50 font-semibold whitespace-nowrap">I&apos;ll go</span>
        </div>
      </div>
    </div>
  );
}

function SalonStatus({
  name,
  status,
  wait,
  detail,
  tone,
}: {
  name: string;
  status: string;
  wait: string;
  detail: string;
  tone: 'ok' | 'great' | 'busy';
}) {
  const dot = tone === 'great' ? 'bg-italia-green' : tone === 'busy' ? 'bg-italia-red' : 'bg-bone-200';
  return (
    <div className="rounded-xl bg-bone-50/5 border border-bone-50/10 p-4">
      <div className="flex items-center justify-between">
        <span className="font-display text-lg">{name}</span>
        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-bone-200/80">
          <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
          {status}
        </span>
      </div>
      <div className="mt-2 font-display text-2xl text-bone-50">{wait}</div>
      <div className="mt-1 text-xs text-bone-200/70">{detail}</div>
    </div>
  );
}

function QloOwnerCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-ink-900/10 bg-bone-50 shadow-card">
      <div className="px-5 py-4 border-b border-ink-900/10 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.22em] text-ink-500">Owner view &middot; QLO dashboard</span>
        <span className="rounded-full bg-italia-green/10 text-italia-green px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">Quiet now</span>
      </div>
      <div className="p-5 grid grid-cols-3 gap-3">
        <Stat3 value="42" label="Walk-ins today" />
        <Stat3 value="11 min" label="Avg wait" />
        <Stat3 value="+18%" label="vs last Wed" />
      </div>
      <div className="mx-5 mb-5 rounded-xl bg-bone-100 border border-ink-900/5 p-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-ink-500 uppercase tracking-[0.22em]">Suggested action</span>
          <span className="font-semibold text-italia-red">Send a nudge</span>
        </div>
        <p className="mt-2 text-sm text-ink-900">
          Upminster has had 4 free chairs for 20 minutes. QLO can ping nearby regulars now.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="rounded-full bg-ink-950 text-bone-50 px-3 py-1.5 text-xs font-semibold">Send nudge</button>
          <button className="rounded-full border border-ink-900/15 px-3 py-1.5 text-xs font-semibold text-ink-900">Not now</button>
        </div>
      </div>
    </div>
  );
}

function Stat3({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-ink-900/10 bg-bone-50 p-3 text-center">
      <div className="font-display text-xl sm:text-2xl text-ink-950">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-ink-500">{label}</div>
    </div>
  );
}

/* ------------------------------------------------------------ Services */

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-italia-green font-semibold">The menu</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink-950">Honest prices. No surprises at the till.</h2>
        </div>
        <Link to="/contact-us" className="hidden md:inline text-sm font-semibold text-ink-950 hover:text-italia-red">
          Get in touch &rarr;
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.name} delay={i * 40}>
            <div className="flex items-baseline gap-4 rounded-xl border border-ink-900/10 bg-bone-50 px-5 py-4 transition hover:-translate-y-0.5 hover:border-ink-900/20">
              <span
                aria-hidden
                className="font-display text-base text-italia-red/60 tabular-nums shrink-0 w-7"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-display text-lg sm:text-xl text-ink-950">{s.name}</div>
                <div className="text-xs text-ink-500 mt-1">{s.time}</div>
              </div>
              <div className="font-display text-xl sm:text-2xl text-ink-950 tabular-nums shrink-0">{s.price}</div>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-xs text-ink-500">
        Products on the shelf and at the chair: American Crew, Kevin Murphy, DS Laboratories, DFI.
      </p>
    </section>
  );
}

/* ------------------------------------------------------------ About */

export function About({ compact = false }: { compact?: boolean }) {
  return (
    <section id="about" className="bg-bone-50 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-[0.22em] text-italia-green font-semibold">About De&apos;Milia</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink-950 leading-tight">
            Serving Essex and Londoners since 1999.
          </h2>
          <p className="mt-4 text-ink-700 leading-relaxed">
            Over twenty-five years of making first impressions count. The Upminster shop was Arnie&apos;s
            first, and its success allowed the Brentwood salon to follow. Two chairs, two doors, one
            standard.
          </p>
          {!compact && (
            <p className="mt-4 text-ink-700 leading-relaxed">
              Our mission is to make all Essex and Londoners look and feel awesome. Whether it is an
              important business meeting, a date, a social event, or a wedding, the chair is here to
              make sure you walk out looking the part.
            </p>
          )}
          <div className="mt-6 italia-stripe h-2 w-24 rounded-sm" aria-hidden />
        </div>
        <div className="md:col-span-7 grid sm:grid-cols-2 gap-3">
          <Reveal delay={0}>
            <Card icon="craft" title="Italian craft, professionally trained">
              Our staff are mainly Italian with over twenty years of experience in the salon. Trained
              properly, hosting properly. The reviews on Google back this up.
            </Card>
          </Reveal>
          <Reveal delay={60}>
            <Card icon="razor" title="Traditional razor shaves">
              Hot and cold towels, real cut-throat blades, no shortcuts. The shave your grandfather
              used to get, done by people who actually trained for it.
            </Card>
          </Reveal>
          <Reveal delay={120}>
            <Card icon="travel" title="Worth the travel">
              We are well known locally and we are delighted to have many customers who travel from
              further afield, drawn by the consistency of the cut and the quality of the shave.
            </Card>
          </Reveal>
          <Reveal delay={180}>
            <Card icon="shelf" title="Products on the shelf">
              American Crew, Kevin Murphy, DS Laboratories, DFI. The same products we use at the
              chair, available to take home.
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Card({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: 'craft' | 'razor' | 'travel' | 'shelf';
}) {
  return (
    <div className="h-full rounded-2xl border border-ink-900/10 bg-bone-50 p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-italia-green/10 text-italia-green">
        <CardIcon name={icon} />
      </span>
      <h3 className="mt-4 font-display text-lg sm:text-xl text-ink-950 leading-tight">{title}</h3>
      <p className="mt-2 text-sm text-ink-700 leading-relaxed">{children}</p>
    </div>
  );
}

function initialsOf(name: string): string {
  return name
    .replace(/[.,]/g, '')
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('');
}

function CardIcon({ name }: { name: 'craft' | 'razor' | 'travel' | 'shelf' }) {
  const props = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  if (name === 'craft') {
    return (
      <svg {...props}>
        <path d="M14 4l6 6-9 9-6-6 9-9z" />
        <path d="M5 19l-2 2" />
      </svg>
    );
  }
  if (name === 'razor') {
    return (
      <svg {...props}>
        <path d="M3 5h13l5 5-9 9H4l-1-1V5z" />
        <path d="M16 5l-7 7" />
      </svg>
    );
  }
  if (name === 'travel') {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 9h16M9 4v16" />
    </svg>
  );
}

/* ------------------------------------------------------------ Team */

export function Team() {
  return (
    <section id="team" className="border-y border-ink-900/10 bg-ink-950 text-bone-50 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-12 gap-8 md:gap-10 items-center">
        <div className="md:col-span-6">
          <p className="text-xs uppercase tracking-[0.22em] text-italia-red font-semibold">The chair</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl text-bone-50 leading-tight">
            Italian craft since 2004.
          </h2>
          <p className="mt-5 text-bone-100/85 max-w-xl">
            Founded by Arnie De&apos;Milia in 2004, kept honest by a team of mostly Italian barbers
            with two decades each at the chair. The craft already wins clients. The website should
            make it effortless to keep them.
          </p>
          <div className="mt-7 flex items-center gap-4 text-xs text-bone-200/70">
            <span className="italia-stripe h-3 w-12 rounded-sm" aria-hidden />
            <span className="uppercase tracking-[0.22em]">Brentwood &middot; Upminster &middot; Essex</span>
          </div>
        </div>
        <div className="md:col-span-6 space-y-3">
          {TEAM.map((m) => (
            <TeamCard key={m.name} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ name, role, years, shop }: { name: string; role: string; years: string; shop: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-bone-50/10 bg-ink-900 p-4">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-bone-50 text-ink-950 font-display text-lg">
        {name
          .replace(/’/g, "'")
          .split(' ')
          .map((p) => p[0])
          .slice(0, 2)
          .join('')}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-bone-50 truncate">{name}</div>
        <div className="text-xs text-bone-200/70 truncate">{role}</div>
      </div>
      <div className="text-right text-xs">
        <div className="text-bone-50 font-semibold">{years}</div>
        <div className="text-bone-200/60">{shop}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ Pull quote (off-grid moment) */

export function PullQuote({
  quote = 'Best fade in Essex, no question.',
  attribution = 'James W., Brentwood regular',
}: {
  quote?: string;
  attribution?: string;
}) {
  return (
    <section className="bg-bone-50">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <Reveal>
          <span aria-hidden className="block text-italia-red/40 font-display text-7xl sm:text-8xl leading-none mb-2">&ldquo;</span>
          <p className="font-display italic font-semibold text-italia-red text-3xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
            {quote}
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.22em] text-ink-500 font-semibold">
            {attribution}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Reviews */

export function Reviews({ filter }: { filter?: 'Brentwood' | 'Upminster' }) {
  const items = filter ? REVIEWS.filter((r) => r.where === filter) : REVIEWS;
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-5 scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-italia-green font-semibold">What clients say</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink-950">
            {filter ? `Five-star regulars in ${filter}.` : 'Five-star regulars across both salons.'}
          </h2>
        </div>
        <div className="rounded-full border border-ink-900/10 bg-bone-50 px-4 py-2 text-sm font-semibold text-ink-900 flex items-center gap-2 shadow-card">
          <span className="text-italia-red text-base">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          <span>130+ 5-star reviews on Google</span>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((r, i) => (
          <Reveal key={r.name} delay={i * 60}>
            <figure className="h-full rounded-2xl border border-ink-900/10 bg-bone-50 p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-italia-green/10 text-italia-green font-display text-base"
                >
                  {initialsOf(r.name)}
                </span>
                <div className="text-italia-red text-lg tracking-wide">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              </div>
              <blockquote className="mt-3 text-ink-900 leading-relaxed">&ldquo;{r.body}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm text-ink-500">
                {r.name}, {r.where}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Stylish photo treatment */

/**
 * Editorial wrapper for the real Wix-CDN salon photos. Keeps the source
 * photo recognizable while lifting it with a subtle saturation/contrast
 * grade, a soft bottom vignette, a faint italia-red wash, a small
 * italia-stripe corner accent, and an inner cream hairline that reads
 * like a polaroid edge.
 */
export function StylishPhoto({
  src,
  alt,
  className = 'aspect-[16/9]',
  position = 'object-top',
}: {
  src: string;
  alt: string;
  className?: string;
  position?: 'object-top' | 'object-center';
}) {
  return (
    <div className={`group relative overflow-hidden bg-ink-700 ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover ${position} transition duration-[1200ms] ease-out group-hover:scale-[1.04]`}
        style={{ filter: 'saturate(1.12) contrast(1.05) brightness(1.02)' }}
      />
      {/* Soft bottom vignette for weight */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/55 via-ink-950/10 to-transparent" aria-hidden />
      {/* Faint italia-red warm wash, mix-blend for editorial color grade */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-30"
        style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0) 55%, rgb(var(--accent-2) / 0.18) 100%)' }}
        aria-hidden
      />
      {/* Italia-stripe corner accent */}
      <div className="pointer-events-none absolute bottom-3 left-3 italia-stripe h-1 w-12 rounded-sm shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" aria-hidden />
      {/* Hairline polaroid frame */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-bone-50/15" aria-hidden />
    </div>
  );
}

/* ------------------------------------------------------------ Locations (both) and SalonCard (one) */

export function Locations() {
  return (
    <section id="locations" className="border-y border-ink-900/10 bg-bone-100 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs uppercase tracking-[0.22em] text-italia-green font-semibold">Both salons</p>
        <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink-950">Find us in Brentwood and Upminster.</h2>
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {LOCATIONS.map((loc, i) => (
            <Reveal key={loc.name} delay={i * 80}>
              <SalonCard loc={loc} compact />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SalonCard({
  loc,
  compact = false,
  hideImage = false,
}: {
  loc: Location;
  compact?: boolean;
  hideImage?: boolean;
}) {
  const isOpenToday = new Date().getDay() !== 0; // Sunday = 0, both salons closed
  return (
    <article id={loc.id} className="h-full scroll-mt-24 overflow-hidden rounded-2xl border border-ink-900/10 bg-bone-50 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
      {!hideImage && (
        <StylishPhoto
          src={loc.image}
          alt={`${loc.name} shopfront`}
          className={compact ? 'aspect-[16/9]' : 'aspect-[16/8]'}
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl text-ink-950">{loc.name}</h3>
          {isOpenToday ? (
            <span className="rounded-full bg-italia-green/10 px-3 py-1 text-xs font-medium text-italia-green">
              Open today
            </span>
          ) : (
            <span className="rounded-full bg-ink-900/5 px-3 py-1 text-xs font-medium text-ink-500">
              Closed Sunday
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-ink-700 italic">{loc.headline}</p>

        <dl className="mt-5 space-y-2 text-sm">
          <Row label="Address" value={loc.address} />
          <Row label="Phone" value={loc.phone} href={loc.phoneHref} />
          <Row label="Email" value="info@demiliabarbers.co.uk" href="mailto:info@demiliabarbers.co.uk" />
        </dl>

        <div className="mt-5 grid sm:grid-cols-3 gap-3 text-xs">
          <Detail label="Where" value={loc.where} />
          <Detail label="By train" value={loc.travel} />
          <Detail label="Parking" value={loc.parking} />
        </div>

        <div className="mt-5 rounded-xl bg-bone-100 border border-ink-900/5 p-4">
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-500 mb-2">Opening hours</div>
          <dl className="grid grid-cols-2 gap-y-1 text-xs text-ink-700">
            {loc.hours.map((h) => (
              <div key={h.d} className="contents">
                <dt>{h.d}</dt>
                <dd className="text-right tabular-nums">{h.h}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={loc.phoneHref}
            className="inline-flex rounded-full bg-ink-950 px-5 py-2 text-sm font-semibold text-bone-50 hover:bg-ink-800 transition"
          >
            Call {loc.short}
          </a>
          <a
            href={loc.mapsHref}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex rounded-full border border-ink-900/15 px-5 py-2 text-sm font-semibold text-ink-900 hover:bg-bone-100 transition"
          >
            View on map
          </a>
          {compact && (
            <Link
              to={`/${loc.slug}`}
              className="inline-flex rounded-full border border-italia-green/40 bg-italia-green/5 px-5 py-2 text-sm font-semibold text-italia-green hover:bg-italia-green/10 transition"
            >
              Salon detail &rarr;
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-ink-900/5 bg-bone-100 p-3">
      <div className="text-[10px] uppercase tracking-[0.22em] text-ink-500">{label}</div>
      <div className="mt-1 text-ink-900 leading-snug">{value}</div>
    </div>
  );
}

function Row({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex justify-between gap-6 border-b border-ink-900/5 pb-2 last:border-b-0 last:pb-0">
      <dt className="text-ink-500 uppercase tracking-wider text-[10px]">{label}</dt>
      <dd className="text-ink-950 text-right">
        {href ? (
          <a href={href} className="hover:text-italia-red">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

/* ------------------------------------------------------------ Contact */

export function Contact() {
  return (
    <section id="contact" className="bg-bone-100 border-y border-ink-900/10 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-12 gap-8 md:gap-10">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-[0.22em] text-italia-green font-semibold">Contact</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink-950 leading-tight">
            Drop us a line, or pick up the phone.
          </h2>
          <p className="mt-4 text-ink-700 leading-relaxed">
            We answer email within a working day, and either shop will pick up during opening hours.
          </p>

          <div className="mt-6 space-y-3">
            <ContactRow label="Email" value="info@demiliabarbers.co.uk" href="mailto:info@demiliabarbers.co.uk" />
            <ContactRow label="Brentwood" value="01277 200008" href="tel:01277200008" />
            <ContactRow label="Upminster" value="01708 440144" href="tel:01708440144" />
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <a
              href="https://www.instagram.com/demiliabarbers/"
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full border border-ink-900/15 px-4 py-2 hover:bg-bone-50"
            >
              @demiliabarbers
            </a>
            <a
              href="https://www.facebook.com/demiliabarbers"
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full border border-ink-900/15 px-4 py-2 hover:bg-bone-50"
            >
              Facebook
            </a>
          </div>
        </div>

        <form
          className="md:col-span-7 rounded-2xl border border-ink-900/10 bg-bone-50 p-5 sm:p-6 shadow-card space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Demo only - in production this would email the salon.');
          }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Your name" name="name" placeholder="James Wilson" />
            <Field label="Email" name="email" type="email" placeholder="you@example.com" />
          </div>
          <Field label="Phone (optional)" name="phone" type="tel" placeholder="07xxx xxx xxx" />
          <SelectField label="Which salon" name="salon" options={['Either - whichever fits', 'Brentwood', 'Upminster']} />
          <TextAreaField
            label="What can we help with?"
            name="message"
            placeholder="Quick question, group booking, products in stock, anything..."
          />
          <div className="flex items-center justify-between gap-4 pt-2">
            <p className="text-xs text-ink-500">We never share your details. Demo only.</p>
            <button
              type="submit"
              className="rounded-full bg-ink-950 px-5 py-2.5 text-sm font-semibold text-bone-50 hover:bg-ink-800 transition"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      className="flex items-center justify-between rounded-xl border border-ink-900/10 bg-bone-50 px-5 py-4 hover:border-italia-green hover:bg-italia-green/5 transition"
    >
      <span className="text-[10px] uppercase tracking-[0.22em] text-ink-500">{label}</span>
      <span className="font-display text-base sm:text-lg text-ink-950">{value}</span>
    </a>
  );
}

function Field({ label, name, type = 'text', placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.22em] text-ink-500">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-ink-900/10 bg-bone-50 px-3 py-2.5 text-sm text-ink-950 placeholder:text-ink-400 focus:outline-none focus:border-italia-green"
      />
    </label>
  );
}

function TextAreaField({ label, name, placeholder }: { label: string; name: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.22em] text-ink-500">{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={4}
        className="mt-1.5 w-full rounded-lg border border-ink-900/10 bg-bone-50 px-3 py-2.5 text-sm text-ink-950 placeholder:text-ink-400 focus:outline-none focus:border-italia-green"
      />
    </label>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.22em] text-ink-500">{label}</span>
      <select
        name={name}
        className="mt-1.5 w-full rounded-lg border border-ink-900/10 bg-bone-50 px-3 py-2.5 text-sm text-ink-950 focus:outline-none focus:border-italia-green"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

/* ------------------------------------------------------------ CTA, Footer */

export function CTA({ href = '/contact-us' }: { href?: string }) {
  return (
    <section className="mx-auto max-w-6xl px-5">
      <div className="relative overflow-hidden rounded-3xl border border-ink-900/10 bg-ink-950 text-bone-50 p-7 sm:p-8 md:p-14">
        <div className="absolute top-0 left-0 right-0 italia-stripe h-1.5" aria-hidden />
        <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-center">
          <div className="order-2 md:order-1 md:col-span-7 text-center md:text-left">
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl">A modern home for an Italian craft.</h2>
            <p className="mt-4 text-bone-200/85 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Mobile-first, fast, easy to update. Built around your brand, your photos, your reviews.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link to={href} className="rounded-full bg-italia-red px-6 py-3 text-sm font-semibold text-bone-50 hover:opacity-90 transition">
                Talk to us
              </Link>
              <a
                href="https://www.appeningnow.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-bone-200/70 underline-offset-4 hover:underline hover:text-bone-50 transition"
              >
                appeningnow.com &rarr;
              </a>
            </div>
          </div>

          <div className="order-1 md:order-2 md:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-bone-50/15 bg-bone-50/5 p-6 sm:p-7 backdrop-blur-sm">
              <div className="absolute top-0 left-0 right-0 italia-stripe h-1" aria-hidden />
              <div className="text-[10px] uppercase tracking-[0.22em] text-italia-red font-semibold">
                This exact site, built for you
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-display text-5xl sm:text-6xl text-bone-50 tabular-nums">£500</span>
                <span className="text-sm text-bone-200/80 font-semibold">+ VAT</span>
              </div>
              <p className="mt-3 text-sm text-bone-100/85 leading-relaxed">
                One flat price for the website refresh. Walk-in features and online booking are
                optional add-ons, only if you ever want them.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-bone-100/90">
                <Tick>Mobile-first one-pager, both salons</Tick>
                <Tick>Real photos, real reviews, your brand</Tick>
                <Tick>Hosted, fast, simple to update</Tick>
                <Tick>No tie-ins, no obligation, no chasing</Tick>
              </ul>
              <p className="mt-4 text-xs text-bone-200/70 italic">
                If it&apos;s a no, that&apos;s OK too. Either way, we hope you like the prototype.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tick({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 text-italia-green shrink-0">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink-900/10 bg-bone-50">
      <div className="mx-auto max-w-6xl px-5 py-10 md:py-12 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <img src={logoUrl} alt="De'Milia Italian Barbershop" className="demilia-logo h-12 w-auto" />
          <p className="mt-4 text-ink-700 max-w-xs">
            Italian Barbershop, Brentwood and Upminster. Cutting hair the right way since 2004.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://www.instagram.com/demiliabarbers/"
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full border border-ink-900/15 px-3 py-1.5 text-xs hover:bg-ink-950/5"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/demiliabarbers"
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full border border-ink-900/15 px-3 py-1.5 text-xs hover:bg-ink-950/5"
            >
              Facebook
            </a>
          </div>
        </div>
        <div>
          <div className="text-ink-500 text-[10px] uppercase tracking-[0.22em]">Visit</div>
          <ul className="mt-3 space-y-3 text-ink-900">
            {LOCATIONS.map((l) => (
              <li key={l.name}>
                <Link to={`/${l.slug}`} className="font-semibold hover:text-italia-red">
                  {l.name}
                </Link>
                <div className="text-ink-700 text-xs mt-0.5">{l.address}</div>
                <a href={l.phoneHref} className="text-ink-700 text-xs hover:text-italia-red">
                  {l.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-ink-500 text-[10px] uppercase tracking-[0.22em]">Concept by</div>
          <p className="mt-3 text-ink-900">
            One-day prototype by{' '}
            <a
              href="https://www.appeningnow.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="font-semibold hover:text-italia-red"
            >
              Appening Now
            </a>
            , a Brentwood-based AI consultancy. We build small, sharp tools for local businesses we
            already love.
          </p>
        </div>
      </div>
      <div className="border-t border-ink-900/10">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs text-ink-500 flex flex-wrap items-center justify-between gap-3">
          <span>&copy; {new Date().getFullYear()} De&apos;Milia Barbers. Prototype, not a live site.</span>
          <span>Aggregate analytics only. No cookies, no personal tracking.</span>
        </div>
      </div>
    </footer>
  );
}
