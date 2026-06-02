import { useState, type FormEvent, type ReactNode } from 'react';
import logo from '../assets/demilia-logo.png';
import previewGif from '../assets/site-preview.gif';
import shotHero from '../assets/preview-01-hero.png';
import shotQuote from '../assets/preview-02-pullquote.png';
import shotQlo from '../assets/preview-03-qlo.png';
import shotPricing from '../assets/preview-04-pricing.png';

/* ------------------------------------------------------------------ */
/*  Access code — give this to prospects. Change it here when needed.  */
/*  (Client-side gate: a teaser lock for outreach, not hard security.) */
/* ------------------------------------------------------------------ */
const ACCESS_CODE = 'demilia2026';
const STORAGE_KEY = 'demilia-gate-v1';
const CONTACT_EMAIL = 'karo.bonas@gmail.com';

export function hasAccess(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'ok';
  } catch {
    return false;
  }
}

const SHOTS: { src: string; label: string }[] = [
  { src: shotHero, label: 'The homepage' },
  { src: shotQuote, label: 'Your story' },
  { src: shotQlo, label: 'Walk-in booking' },
  { src: shotPricing, label: 'Services & pricing' },
];

export default function AccessGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(hasAccess);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [activeShot, setActiveShot] = useState<number | null>(null);

  if (unlocked) return <>{children}</>;

  function submit(e: FormEvent) {
    e.preventDefault();
    if (value.trim().toLowerCase() === ACCESS_CODE.toLowerCase()) {
      try {
        sessionStorage.setItem(STORAGE_KEY, 'ok');
      } catch {
        /* ignore */
      }
      setUnlocked(true);
    } else {
      setError(true);
    }
  }

  return (
    <div className="gate-root">
      <style>{gateCss}</style>

      <div className="gate-glow" aria-hidden />

      <header className="gate-head">
        <img src={logo} alt="De'Milia — Italian Barbershop, established 2004" className="gate-logo" />
      </header>

      <main className="gate-grid">
        {/* ---- Copy + lock ---- */}
        <section className="gate-copy">
          <span className="gate-eyebrow">
            <span className="gate-dot" /> Website refresh · private preview
          </span>

          <h1 className="gate-title">
            A first look at the new <em>De&rsquo;Milia</em> online.
          </h1>

          <p className="gate-lede">
            We&rsquo;ve been building a website worthy of twenty-plus years of craft in
            Brentwood &amp; Upminster. Hover the preview to watch it come to life — then
            enter your access code to explore the full site.
          </p>

          <form className="gate-form" onSubmit={submit}>
            <label htmlFor="gate-code" className="gate-label">
              Access code
            </label>
            <div className="gate-input-row">
              <input
                id="gate-code"
                type="password"
                autoComplete="off"
                placeholder="Enter your code"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setError(false);
                }}
                className={`gate-input${error ? ' gate-input--err' : ''}`}
              />
              <button type="submit" className="gate-btn">
                View the site
              </button>
            </div>
            {error && <p className="gate-err">That code isn&rsquo;t right — give it another go.</p>}
          </form>

          <p className="gate-ask">
            Want to see more?{' '}
            <a href={`mailto:${CONTACT_EMAIL}?subject=De'Milia%20site%20preview%20access`}>
              Speak with Karo Bonas
            </a>{' '}
            to retrieve the password and view the rest of the site.
          </p>
        </section>

        {/* ---- Preview device ---- */}
        <section className="gate-preview">
          <figure
            className="gate-frame"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onFocus={() => setHovering(true)}
            onBlur={() => setHovering(false)}
            tabIndex={0}
            aria-label="Animated preview of the De'Milia website"
          >
            <div className="gate-chrome">
              <span className="gate-tl" />
              <span className="gate-tl" />
              <span className="gate-tl" />
              <span className="gate-url">demilia-barbers.com</span>
            </div>
            <div className="gate-shot">
              <img src={shotHero} alt="" className="gate-poster" />
              {hovering && <img src={previewGif} alt="" className="gate-anim" />}
              {!hovering && (
                <span className="gate-hint">
                  <span className="gate-play">▸</span> Hover to preview
                </span>
              )}
            </div>
          </figure>

          {/* hover-reveal snippet strip */}
          <ul className="gate-strip">
            {SHOTS.map((s, i) => (
              <li
                key={s.label}
                className="gate-thumb"
                onMouseEnter={() => setActiveShot(i)}
                onMouseLeave={() => setActiveShot(null)}
              >
                <img src={s.src} alt={s.label} />
                <span className="gate-thumb-label">{s.label}</span>
                {activeShot === i && (
                  <span className="gate-pop" role="tooltip">
                    <img src={s.src} alt={s.label} />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="gate-foot">
        De&rsquo;Milia Italian Barbershop · Est. 2004 · Brentwood &amp; Upminster
      </footer>
    </div>
  );
}

const gateCss = `
.gate-root{
  --bone:#fbf8f3; --bone-2:#f4ecdf; --ink:#171717; --ink-soft:#525252;
  --emerald:#0a6b3b; --oxblood:#b71c2a; --line:rgba(23,23,23,.12);
  position:fixed; inset:0; z-index:9999; overflow:auto;
  background:var(--bone); color:var(--ink);
  font-family:'Inter',system-ui,sans-serif;
  display:flex; flex-direction:column;
}
.gate-glow{
  position:absolute; inset:0; pointer-events:none;
  background:
    radial-gradient(60% 50% at 78% 8%, rgba(10,107,59,.10), transparent 60%),
    radial-gradient(50% 45% at 12% 92%, rgba(183,28,42,.07), transparent 60%);
}
.gate-head{ position:relative; padding:28px 32px 0; }
.gate-logo{ height:46px; width:auto; }
.gate-grid{
  position:relative; flex:1; display:grid; gap:48px;
  grid-template-columns:1fr; align-items:center;
  max-width:1180px; margin:0 auto; padding:32px;
}
@media(min-width:980px){ .gate-grid{ grid-template-columns:1.05fr 1fr; gap:64px; padding:24px 48px; } }

.gate-eyebrow{
  display:inline-flex; align-items:center; gap:8px;
  font-size:12px; letter-spacing:.14em; text-transform:uppercase;
  color:var(--emerald); font-weight:600;
  background:rgba(10,107,59,.08); border:1px solid rgba(10,107,59,.18);
  padding:6px 12px; border-radius:999px;
}
.gate-dot{ width:7px; height:7px; border-radius:50%; background:var(--emerald);
  box-shadow:0 0 0 0 rgba(10,107,59,.5); animation:gatePulse 2s infinite; }
@keyframes gatePulse{ 70%{ box-shadow:0 0 0 7px rgba(10,107,59,0);} 100%{ box-shadow:0 0 0 0 rgba(10,107,59,0);} }

.gate-title{
  font-family:'Playfair Display',Georgia,serif; font-weight:700;
  font-size:clamp(34px,5vw,54px); line-height:1.04; margin:22px 0 0;
  letter-spacing:-.01em;
}
.gate-title em{ font-style:italic; color:var(--oxblood); }
.gate-lede{ color:var(--ink-soft); font-size:clamp(15px,1.4vw,17px); line-height:1.6; margin:18px 0 0; max-width:48ch; }

.gate-form{ margin:28px 0 0; }
.gate-label{ display:block; font-size:12px; letter-spacing:.12em; text-transform:uppercase; color:var(--ink-soft); margin:0 0 8px; font-weight:600; }
.gate-input-row{ display:flex; gap:10px; flex-wrap:wrap; }
.gate-input{
  flex:1; min-width:180px; padding:14px 16px; font-size:15px;
  background:#fff; border:1px solid var(--line); border-radius:12px; color:var(--ink);
  outline:none; transition:border-color .15s, box-shadow .15s;
}
.gate-input:focus{ border-color:var(--emerald); box-shadow:0 0 0 4px rgba(10,107,59,.12); }
.gate-input--err{ border-color:var(--oxblood); box-shadow:0 0 0 4px rgba(183,28,42,.12); }
.gate-btn{
  padding:14px 22px; font-size:15px; font-weight:600; cursor:pointer;
  background:var(--ink); color:var(--bone); border:0; border-radius:12px;
  transition:transform .12s, background .15s;
}
.gate-btn:hover{ background:var(--emerald); transform:translateY(-1px); }
.gate-err{ color:var(--oxblood); font-size:13px; margin:10px 0 0; }
.gate-ask{ margin:22px 0 0; font-size:14px; color:var(--ink-soft); }
.gate-ask a{ color:var(--emerald); font-weight:600; text-decoration:none; border-bottom:1px solid rgba(10,107,59,.4); }
.gate-ask a:hover{ border-bottom-color:var(--emerald); }

.gate-preview{ position:relative; }
.gate-frame{
  margin:0; border-radius:16px; overflow:hidden; background:#fff;
  border:1px solid var(--line);
  box-shadow:0 30px 60px -28px rgba(23,23,23,.45), 0 8px 24px -16px rgba(23,23,23,.3);
  transition:transform .25s ease, box-shadow .25s ease; cursor:pointer; outline:none;
}
.gate-frame:hover, .gate-frame:focus-visible{
  transform:translateY(-4px);
  box-shadow:0 40px 80px -30px rgba(10,107,59,.4), 0 10px 28px -16px rgba(23,23,23,.35);
}
.gate-chrome{ display:flex; align-items:center; gap:7px; padding:11px 14px; background:var(--bone-2); border-bottom:1px solid var(--line); }
.gate-tl{ width:10px; height:10px; border-radius:50%; background:rgba(23,23,23,.18); }
.gate-url{ margin-left:10px; font-size:12px; color:var(--ink-soft); letter-spacing:.02em; }
.gate-shot{ position:relative; aspect-ratio:1280/800; }
.gate-poster, .gate-anim{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; }
.gate-anim{ animation:gateFade .35s ease; }
@keyframes gateFade{ from{ opacity:0; } to{ opacity:1; } }
.gate-hint{
  position:absolute; bottom:14px; left:50%; transform:translateX(-50%);
  display:inline-flex; align-items:center; gap:8px;
  background:rgba(23,23,23,.78); color:#fff; backdrop-filter:blur(4px);
  padding:9px 16px; border-radius:999px; font-size:13px; font-weight:500; letter-spacing:.02em;
}
.gate-play{ color:#7be0a8; }

.gate-strip{ list-style:none; display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin:14px 0 0; padding:0; }
.gate-thumb{ position:relative; border-radius:9px; overflow:hidden; border:1px solid var(--line); cursor:pointer; }
.gate-thumb > img{ display:block; width:100%; aspect-ratio:1280/800; object-fit:cover; transition:transform .25s ease; }
.gate-thumb:hover > img{ transform:scale(1.08); }
.gate-thumb-label{
  position:absolute; inset:auto 0 0 0; padding:5px 8px; font-size:10px; font-weight:600;
  letter-spacing:.04em; color:#fff; background:linear-gradient(transparent,rgba(23,23,23,.82));
}
.gate-pop{
  position:absolute; bottom:calc(100% + 10px); left:50%; transform:translateX(-50%);
  width:260px; max-width:60vw; border-radius:12px; overflow:hidden;
  border:1px solid var(--line); background:#fff; z-index:5;
  box-shadow:0 24px 48px -20px rgba(23,23,23,.5); animation:gateFade .2s ease;
}
.gate-pop img{ display:block; width:100%; }
@media(max-width:620px){ .gate-pop{ display:none; } }

.gate-foot{ position:relative; text-align:center; padding:20px; font-size:12px; letter-spacing:.04em; color:var(--ink-soft); border-top:1px solid var(--line); }
`;
