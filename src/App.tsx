import { useMemo, useState } from 'react';
import logoUrl from './assets/demilia-logo.png';
import heroImg from './assets/demilia-shop1.png';
import shopBrentwood from './assets/demilia-shop2.jpg';
import shopUpminster from './assets/demilia-hero.jpg';
import { Gallery } from './components/Gallery';
import { Tweaker } from './components/Tweaker';
import { ScrollToTop } from './components/ScrollToTop';
import { ScissorsTrail } from './components/ScissorsTrail';
import { ThemeProvider } from './theme/ThemeProvider';

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Salons', href: '#locations' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = [
  { name: 'Skin Fade', time: '30 min', price: '£22' },
  { name: 'Classic Gentleman Cut', time: '30 min', price: '£20' },
  { name: 'Cut & Beard Sculpt', time: '45 min', price: '£30' },
  { name: 'Hot Towel Cut-Throat Shave', time: '40 min', price: '£30' },
  { name: 'Beard Trim & Line-Up', time: '20 min', price: '£15' },
  { name: 'Father & Son (under 12)', time: '45 min', price: '£32' },
];

const REVIEWS = [
  {
    name: 'James W.',
    where: 'Brentwood',
    body: 'Best fade in Essex, no question. Arnie has been cutting my hair for six years and somehow keeps getting sharper.',
  },
  {
    name: 'Marco P.',
    where: 'Upminster',
    body: 'Walked out feeling ten years younger. The hot towel cut-throat shave is worth the trip alone.',
  },
  {
    name: 'Daniel K.',
    where: 'Brentwood',
    body: 'My boy was nervous for his first proper cut. They had him laughing in two minutes. Booked the whole family in.',
  },
];

const TIMES = ['09:30', '10:15', '11:00', '12:30', '14:15', '15:00', '16:45', '17:30'];

const LOCATIONS = [
  {
    id: 'brentwood',
    name: 'Brentwood Salon',
    short: 'Brentwood',
    address: '23a Ongar Road, Brentwood, Essex, CM15 9AU',
    phone: '01277 200008',
    phoneHref: 'tel:01277200008',
    mapsHref: 'https://www.google.com/maps/dir/?api=1&destination=23A%20Ongar%20Rd,%20Brentwood%20CM15%209AU,%20UK',
    image: shopBrentwood,
    headline: 'The highest-rated salon in Brentwood.',
    where: 'Top of the High Street on Ongar Road (A128), opposite Sainsbury’s.',
    travel: 'Brentwood station is a 15 minute walk.',
    parking: 'Sainsbury’s car park opposite, or William Hunter Way (5 minute walk).',
    hours: [
      { d: 'Mon to Tue', h: '9:00 - 18:30' },
      { d: 'Wednesday', h: '9:00 - 19:30' },
      { d: 'Thu to Fri', h: '9:00 - 18:30' },
      { d: 'Saturday', h: '8:30 - 17:30' },
      { d: 'Sunday', h: 'Closed' },
    ],
  },
  {
    id: 'upminster',
    name: 'Upminster Salon',
    short: 'Upminster',
    address: '164b Upminster Road, Upminster, Essex, RM14 2RB',
    phone: '01708 440144',
    phoneHref: 'tel:01708440144',
    mapsHref: 'https://www.google.com/maps/place/164B+Upminster+Rd,+Upminster+RM14+2RB',
    image: shopUpminster,
    headline: 'The original. Where Arnie opened the doors.',
    where: 'Upminster Bridge, opposite the Windmill Pub, next to Co-Op.',
    travel: 'Upminster Bridge station is a 2 minute walk; Upminster Station is 10 minutes.',
    parking: 'Two spaces directly outside the shop, or 2 hours free at Co-Op next door.',
    hours: [
      { d: 'Mon to Wed', h: '9:00 - 18:30' },
      { d: 'Thursday', h: '9:00 - 19:30' },
      { d: 'Friday', h: '9:00 - 18:30' },
      { d: 'Saturday', h: '8:30 - 17:30' },
      { d: 'Sunday', h: 'Closed' },
    ],
  },
];

const TEAM = [
  { name: 'Arnie De’Milia', role: 'Master barber, founder', years: 'Since 2004', shop: 'Both salons' },
  { name: 'Marco Russo', role: 'Senior barber, fades & line-ups', years: '22 years', shop: 'Brentwood' },
  { name: 'Sal Ricci', role: 'Senior barber, classic cuts', years: '24 years', shop: 'Upminster' },
  { name: 'Leo De’Milia', role: 'Barber, beard work', years: '9 years', shop: 'Upminster' },
];

function classNames(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

function getNextDays(count: number) {
  const out: { iso: string; label: string; weekday: string; day: number; closed: boolean }[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const closed = d.getDay() === 0;
    out.push({
      iso: d.toISOString().slice(0, 10),
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-GB', { weekday: 'short' }),
      weekday: d.toLocaleDateString('en-GB', { weekday: 'short' }),
      day: d.getDate(),
      closed,
    });
  }
  return out;
}

export default function App() {
  const days = useMemo(() => getNextDays(7), []);
  const firstOpen = days.findIndex((d) => !d.closed);
  const [activeDay, setActiveDay] = useState(firstOpen >= 0 ? firstOpen : 0);
  const [activeTime, setActiveTime] = useState<string | null>('11:00');
  const [activeLocation, setActiveLocation] = useState(0);
  const [activeService, setActiveService] = useState(0);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-bone-50 text-ink-900">
        <Topbar />
        <Header />
        <Hero />
        <BookingPreview
          days={days}
          activeDay={activeDay}
          setActiveDay={setActiveDay}
          activeTime={activeTime}
          setActiveTime={setActiveTime}
          activeLocation={activeLocation}
          setActiveLocation={setActiveLocation}
          activeService={activeService}
          setActiveService={setActiveService}
        />
        <About />
        <Services />
        <Team />
        <Gallery />
        <Reviews />
        <Locations />
        <Contact />
        <CTA />
        <Footer />
        <ScissorsTrail />
        <ScrollToTop />
        <Tweaker />
      </div>
    </ThemeProvider>
  );
}

function Topbar() {
  return (
    <div className="relative">
      <div className="italia-stripe h-1 w-full" aria-hidden />
      <div className="bg-ink-950 text-bone-100 text-xs">
        <div className="mx-auto max-w-6xl px-5 py-2 flex flex-wrap items-center justify-between gap-3">
          <span className="tracking-widest uppercase opacity-80">Italian Barbershop &middot; Estd 2004</span>
          <div className="flex items-center gap-5 opacity-90">
            <a href="tel:01277200008" className="hover:text-white">Brentwood 01277 200008</a>
            <span className="opacity-30">|</span>
            <a href="tel:01708440144" className="hover:text-white">Upminster 01708 440144</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 bg-bone-50/90 backdrop-blur border-b border-ink-900/10">
      <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-3">
          <img src={logoUrl} alt="De'Milia Italian Barbershop" className="demilia-logo h-10 md:h-12 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-ink-700">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-italia-green transition">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#book"
          className="rounded-full bg-ink-950 px-5 py-2.5 text-sm font-semibold text-bone-50 hover:bg-ink-800 transition"
        >
          Book a chair
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 cream-grain opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-italia-green/30 bg-italia-green/5 px-3 py-1 text-xs font-medium text-italia-green">
            <span className="h-1.5 w-1.5 rounded-full bg-italia-green" />
            Now booking online, Brentwood & Upminster
          </span>
          <h1 className="mt-5 font-display font-bold text-5xl md:text-7xl leading-[0.98] tracking-tight text-ink-950">
            Book your chair in <em className="text-italia-red not-italic">30 seconds</em>,
            <br className="hidden md:block" /> not three phone calls.
          </h1>
          <p className="mt-6 text-lg text-ink-700 max-w-xl leading-relaxed">
            We loved that you&apos;re one of the best-rated barbers in Brentwood and Upminster, with
            staff boasting over 20 years of experience. Here&apos;s how we&apos;d build on that, on the phone in
            your pocket, at midnight, in your slippers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#book" className="rounded-full bg-ink-950 px-6 py-3 text-sm font-semibold text-bone-50 hover:bg-ink-800 transition">
              See live availability
            </a>
            <a href="#services" className="rounded-full border border-ink-900/15 px-6 py-3 text-sm font-semibold text-ink-900 hover:bg-ink-950/5 transition">
              Services & prices
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
            <Stat value="20+ yrs" label="per master barber" />
            <Stat value="Since 2004" label="Italian heritage" />
            <Stat value="2 salons" label="One booking page" />
          </dl>
        </div>
        <div className="md:col-span-5">
          <HeroCard />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-display text-2xl text-ink-950">{value}</dt>
      <dd className="text-xs uppercase tracking-wider text-ink-500 mt-1">{label}</dd>
    </div>
  );
}

function HeroCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-3 rounded-3xl bg-italia-green/5 blur-xl" />
      <div className="relative rounded-2xl overflow-hidden border border-ink-900/10 bg-bone-50 shadow-card">
        <div className="aspect-[4/5] bg-ink-950 relative">
          <img src={heroImg} alt="De'Milia barber at work" className="absolute inset-0 h-full w-full object-cover opacity-95" />
          <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-ink-950/85 via-ink-950/40 to-transparent">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-bone-200">Today &middot; 3 chairs free</span>
              <span className="rounded-full bg-italia-green text-bone-50 px-2.5 py-0.5 text-xs font-medium">
                Live diary
              </span>
            </div>
            <div className="mt-3 space-y-2">
              <ChairLine name="Arnie - Brentwood" next="11:00" />
              <ChairLine name="Marco - Brentwood" next="12:30" />
              <ChairLine name="Sal - Upminster" next="14:15" />
            </div>
          </div>
        </div>
        <div className="p-4 text-sm text-ink-700 bg-bone-50">
          Customers who used to call three times to find a slot now book at 11pm from the sofa.
          That is the entire pitch.
        </div>
      </div>
    </div>
  );
}

function ChairLine({ name, next }: { name: string; next: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white/10 backdrop-blur border border-white/15 px-3 py-2">
      <div>
        <div className="text-sm font-semibold text-bone-50">{name}</div>
        <div className="text-[11px] text-bone-200/80">Next available</div>
      </div>
      <div className="font-display text-lg text-bone-50">{next}</div>
    </div>
  );
}

type BookingProps = {
  days: { iso: string; label: string; day: number; closed: boolean }[];
  activeDay: number;
  setActiveDay: (i: number) => void;
  activeTime: string | null;
  setActiveTime: (t: string | null) => void;
  activeLocation: number;
  setActiveLocation: (i: number) => void;
  activeService: number;
  setActiveService: (i: number) => void;
};

function BookingPreview({
  days,
  activeDay,
  setActiveDay,
  activeTime,
  setActiveTime,
  activeLocation,
  setActiveLocation,
  activeService,
  setActiveService,
}: BookingProps) {
  return (
    <section id="book" className="border-y border-ink-900/10 bg-bone-100">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-italia-green font-semibold">The booking page that should be there</p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink-950">Pick a chair, pick a time, done.</h2>
          </div>
          <span className="hidden md:block text-sm text-ink-500 max-w-xs text-right">
            Demo only. Real version syncs each barber&apos;s diary and texts a confirmation to the client.
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-1 rounded-2xl border border-ink-900/10 bg-bone-50 p-5">
            <h3 className="text-xs font-semibold text-ink-500 uppercase tracking-[0.18em]">1. Salon</h3>
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

            <h3 className="mt-6 text-xs font-semibold text-ink-500 uppercase tracking-[0.18em]">2. Service</h3>
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
              <h3 className="text-xs font-semibold text-ink-500 uppercase tracking-[0.18em]">3. When suits you</h3>
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
                  <div className={classNames('mt-1 font-display text-xl', d.closed ? '' : 'text-ink-950')}>{d.day}</div>
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
                <div className="text-bone-200/70 text-[10px] uppercase tracking-[0.2em]">Your booking</div>
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

function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5">
      <div className="flex items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-italia-green font-semibold">The menu</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink-950">Honest prices. No surprises at the till.</h2>
        </div>
        <a href="#book" className="hidden md:inline text-sm font-semibold text-ink-950 hover:text-italia-red">
          Book a chair &rarr;
        </a>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {SERVICES.map((s) => (
          <div
            key={s.name}
            className="flex items-baseline justify-between gap-4 rounded-xl border border-ink-900/10 bg-bone-50 px-5 py-4"
          >
            <div>
              <div className="font-display text-xl text-ink-950">{s.name}</div>
              <div className="text-xs text-ink-500 mt-1">{s.time}</div>
            </div>
            <div className="font-display text-2xl text-ink-950">{s.price}</div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-ink-500">
        Products on the shelf and at the chair: American Crew, Kevin Murphy, DS Laboratories, DFI.
      </p>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="border-y border-ink-900/10 bg-ink-950 text-bone-50">
      <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-6">
          <p className="text-xs uppercase tracking-[0.2em] text-italia-red font-semibold">The chair</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl text-bone-50 leading-tight">
            Italian craft since 2004.
            <br />
            <span className="text-bone-200/80">Online booking since today.</span>
          </h2>
          <p className="mt-5 text-bone-100/85 max-w-xl">
            Founded by Arnie De&apos;Milia in 2004, kept honest by a team of mostly Italian barbers
            with two decades each at the chair. The craft already wins clients. The website should
            make it effortless to keep them.
          </p>
          <div className="mt-7 flex items-center gap-4 text-xs text-bone-200/70">
            <span className="italia-stripe h-3 w-12 rounded-sm" aria-hidden />
            <span className="uppercase tracking-[0.2em]">Brentwood &middot; Upminster &middot; Essex</span>
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
      <div className="flex-1">
        <div className="font-semibold text-bone-50">{name}</div>
        <div className="text-xs text-bone-200/70">{role}</div>
      </div>
      <div className="text-right text-xs">
        <div className="text-bone-50 font-semibold">{years}</div>
        <div className="text-bone-200/60">{shop}</div>
      </div>
    </div>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-5">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-italia-green font-semibold">What clients say</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink-950">Five-star regulars across both salons.</h2>
        </div>
        <div className="rounded-full border border-ink-900/10 bg-bone-50 px-4 py-2 text-sm font-semibold text-ink-900 flex items-center gap-2 shadow-card">
          <span className="text-italia-red text-base">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          <span>130+ 5-star reviews on Google</span>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {REVIEWS.map((r) => (
          <figure key={r.name} className="rounded-2xl border border-ink-900/10 bg-bone-50 p-5 shadow-card">
            <div className="text-italia-red text-lg tracking-wide">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <blockquote className="mt-3 text-ink-900 leading-relaxed">&ldquo;{r.body}&rdquo;</blockquote>
            <figcaption className="mt-4 text-sm text-ink-500">
              {r.name}, {r.where}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Locations() {
  return (
    <section id="locations" className="border-y border-ink-900/10 bg-bone-100">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs uppercase tracking-[0.2em] text-italia-green font-semibold">Two salons, one diary</p>
        <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink-950">Find us in Brentwood and Upminster.</h2>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {LOCATIONS.map((loc) => (
            <article
              key={loc.name}
              id={loc.id}
              className="scroll-mt-24 overflow-hidden rounded-2xl border border-ink-900/10 bg-bone-50 shadow-card"
            >
              <div className="aspect-[16/9] bg-ink-700 overflow-hidden">
                <img src={loc.image} alt={`${loc.name} interior`} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl text-ink-950">{loc.name}</h3>
                  <span className="rounded-full bg-italia-green/10 px-3 py-1 text-xs font-medium text-italia-green">
                    Open today
                  </span>
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
                  <div className="text-[10px] uppercase tracking-[0.2em] text-ink-500 mb-2">Opening hours</div>
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
                    href="#book"
                    className="inline-flex rounded-full bg-ink-950 px-5 py-2 text-sm font-semibold text-bone-50 hover:bg-ink-800 transition"
                  >
                    Book at {loc.short}
                  </a>
                  <a
                    href={loc.mapsHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex rounded-full border border-ink-900/15 px-5 py-2 text-sm font-semibold text-ink-900 hover:bg-bone-100 transition"
                  >
                    View on map
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-ink-900/5 bg-bone-100 p-3">
      <div className="text-[10px] uppercase tracking-[0.18em] text-ink-500">{label}</div>
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

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-5">
      <div className="relative overflow-hidden rounded-3xl border border-ink-900/10 bg-ink-950 text-bone-50 p-8 md:p-14 text-center">
        <div className="absolute top-0 left-0 right-0 italia-stripe h-1.5" aria-hidden />
        <h2 className="font-display text-3xl md:text-5xl">Stop missing calls. Start filling chairs.</h2>
        <p className="mt-4 text-bone-200/85 max-w-2xl mx-auto leading-relaxed">
          A booking page that works on a phone, syncs to each barber&apos;s diary, sends a text reminder,
          and stops eating your evenings. That is the whole job.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a href="#book" className="rounded-full bg-italia-red px-6 py-3 text-sm font-semibold text-bone-50 hover:opacity-90 transition">
            See the live booking demo
          </a>
          <a
            href="mailto:karo@appeningnow.com?subject=De%27Milia%20Barbers%20website"
            className="rounded-full border border-bone-50/20 px-6 py-3 text-sm font-semibold text-bone-50 hover:bg-white/10 transition"
          >
            Talk to Appening Now
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink-900/10 bg-bone-50">
      <div className="mx-auto max-w-6xl px-5 py-12 grid md:grid-cols-3 gap-8 text-sm">
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
          <div className="text-ink-500 text-[10px] uppercase tracking-[0.2em]">Visit</div>
          <ul className="mt-3 space-y-3 text-ink-900">
            {LOCATIONS.map((l) => (
              <li key={l.name}>
                <div className="font-semibold">{l.name}</div>
                <div className="text-ink-700 text-xs mt-0.5">{l.address}</div>
                <a href={l.phoneHref} className="text-ink-700 text-xs hover:text-italia-red">
                  {l.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-ink-500 text-[10px] uppercase tracking-[0.2em]">Concept by</div>
          <p className="mt-3 text-ink-900">
            One-day prototype by{' '}
            <a href="https://appening.now" className="font-semibold hover:text-italia-red">
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
          <span>No tracking. No cookies. No nonsense.</span>
        </div>
      </div>
    </footer>
  );
}

function About() {
  return (
    <section id="about" className="bg-bone-50 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-[0.2em] text-italia-green font-semibold">About De&apos;Milia</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink-950 leading-tight">
            Serving Essex and Londoners since 1999.
          </h2>
          <p className="mt-4 text-ink-700 leading-relaxed">
            Over twenty-five years of making first impressions count. The Upminster shop was Arnie&apos;s
            first, and its success allowed the Brentwood salon to follow. Two chairs, two doors, one
            standard.
          </p>
          <div className="mt-6 italia-stripe h-2 w-24 rounded-sm" aria-hidden />
        </div>
        <div className="md:col-span-7 grid sm:grid-cols-2 gap-3">
          <Card icon="craft" title="Italian craft, professionally trained">
            Our staff are mainly Italian with over twenty years of experience in the salon. Trained
            properly, hosting properly. The reviews on Google back this up.
          </Card>
          <Card icon="razor" title="Traditional razor shaves">
            Hot and cold towels, real cut-throat blades, no shortcuts. The shave your grandfather
            used to get, done by people who actually trained for it.
          </Card>
          <Card icon="travel" title="Worth the travel">
            We are well known locally and we are delighted to have many customers who travel from
            further afield, drawn by the consistency of the cut and the quality of the shave.
          </Card>
          <Card icon="shelf" title="Products on the shelf">
            American Crew, Kevin Murphy, DS Laboratories, DFI. The same products we use at the
            chair, available to take home.
          </Card>
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
    <div className="rounded-2xl border border-ink-900/10 bg-bone-50 p-5 shadow-card">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-italia-green/10 text-italia-green">
        <CardIcon name={icon} />
      </span>
      <h3 className="mt-4 font-display text-xl text-ink-950 leading-tight">{title}</h3>
      <p className="mt-2 text-sm text-ink-700 leading-relaxed">{children}</p>
    </div>
  );
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

function Contact() {
  return (
    <section id="contact" className="bg-bone-100 border-y border-ink-900/10 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-[0.2em] text-italia-green font-semibold">Contact</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink-950 leading-tight">
            Drop us a line, or pick up the phone.
          </h2>
          <p className="mt-4 text-ink-700 leading-relaxed">
            For bookings, the fastest path is the chair picker above. For everything else, we
            answer email within a working day, and either shop will pick up during opening hours.
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
          className="md:col-span-7 rounded-2xl border border-ink-900/10 bg-bone-50 p-6 shadow-card space-y-4"
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
      <span className="text-[10px] uppercase tracking-[0.2em] text-ink-500">{label}</span>
      <span className="font-display text-lg text-ink-950">{value}</span>
    </a>
  );
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.18em] text-ink-500">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-ink-900/10 bg-bone-50 px-3 py-2.5 text-sm text-ink-950 placeholder:text-ink-400 focus:outline-none focus:border-italia-green"
      />
    </label>
  );
}

function TextAreaField({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.18em] text-ink-500">{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={4}
        className="mt-1.5 w-full rounded-lg border border-ink-900/10 bg-bone-50 px-3 py-2.5 text-sm text-ink-950 placeholder:text-ink-400 focus:outline-none focus:border-italia-green"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.18em] text-ink-500">{label}</span>
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
