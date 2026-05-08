import { useEffect, useState } from 'react';
import { useTheme, type AccentKey, type DensityKey, type FontKey, type ThemeMode } from '../theme/ThemeProvider';
import { track } from '../lib/analytics';

const HINT_KEY = 'demilia-tweaker-hint-seen';

const ACCENTS: Array<{ key: AccentKey; label: string; primary: string; secondary: string }> = [
  { key: 'emerald', label: 'Italian Emerald', primary: '#0a6b3b', secondary: '#b71c2a' },
  { key: 'navy', label: 'Espresso Navy', primary: '#1e3a5f', secondary: '#c18a5a' },
  { key: 'sage', label: 'Warm Sage', primary: '#4f6f5a', secondary: '#b54f3a' },
  { key: 'oxblood', label: 'Oxblood Brass', primary: '#6b2738', secondary: '#c18a3f' },
];

const FONTS: Array<{ key: FontKey; label: string; sample: string; family: string }> = [
  { key: 'editorial', label: 'Editorial', sample: 'De’Milia', family: '"Playfair Display", Georgia, serif' },
  { key: 'modern', label: 'Modern', sample: 'De’Milia', family: '"DM Serif Display", Georgia, serif' },
  { key: 'classic', label: 'Classic', sample: 'De’Milia', family: '"Cormorant Garamond", Georgia, serif' },
  { key: 'sans', label: 'Clean Sans', sample: 'De’Milia', family: '"Manrope", system-ui, sans-serif' },
];

const DENSITIES: Array<{ key: DensityKey; label: string; hint: string }> = [
  { key: 'comfortable', label: 'Comfortable', hint: 'Editorial breathing room' },
  { key: 'compact', label: 'Compact', hint: 'Tighter for short screenshots' },
];

export function Tweaker() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // First-visit attention chip. Shows after a short delay, hides on first
  // open or after 14 seconds. Persists "seen" so it never reappears.
  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(HINT_KEY) === '1';
    } catch {
      // ignore
    }
    if (seen) return;
    const showT = window.setTimeout(() => setHintVisible(true), 1400);
    const hideT = window.setTimeout(() => {
      setHintVisible(false);
      try { localStorage.setItem(HINT_KEY, '1'); } catch { /* ignore */ }
    }, 14000);
    return () => {
      window.clearTimeout(showT);
      window.clearTimeout(hideT);
    };
  }, []);

  // Dismiss the chip the moment the user opens the drawer.
  useEffect(() => {
    if (!open) return;
    setHintVisible(false);
    try { localStorage.setItem(HINT_KEY, '1'); } catch { /* ignore */ }
  }, [open]);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40">
        {/* Pulsing spotlight ring while the hint is visible */}
        {!open && hintVisible && (
          <>
            <span className="pointer-events-none absolute inset-0 rounded-full bg-italia-green/30 animate-ping" aria-hidden />
            <span className="pointer-events-none absolute -inset-2 rounded-full bg-italia-green/10 blur-md" aria-hidden />
          </>
        )}

        {/* Attention chip floating above the FAB, with a tail pointing down */}
        {!open && hintVisible && (
          <div
            role="status"
            className="absolute bottom-[3.75rem] right-0 mb-1 flex items-center gap-2 rounded-full border border-ink-900/10 bg-ink-950 text-bone-50 px-4 py-2 text-xs font-semibold shadow-card whitespace-nowrap"
          >
            Make it yours
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="13 6 19 12 13 18" />
            </svg>
            <span
              className="absolute -bottom-1 right-5 h-2 w-2 rotate-45 bg-ink-950 border-r border-b border-ink-900/10"
              aria-hidden
            />
          </div>
        )}

        <button
          type="button"
          onClick={() =>
            setOpen((v) => {
              track(v ? 'tweaker_closed' : 'tweaker_opened');
              return !v;
            })
          }
          aria-label={open ? 'Close style tweaks' : 'Open style tweaks'}
          aria-expanded={open}
          className="relative grid h-12 w-12 place-items-center rounded-full border border-ink-900/15 bg-italia-green text-bone-50 shadow-card hover:scale-105 active:scale-95 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-italia-red"
        >
          <SlidersIcon className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink-950/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Style tweaks"
        className={
          'fixed bottom-0 right-0 top-0 z-50 w-full max-w-sm overflow-y-auto border-l border-ink-900/10 bg-bone-50 text-ink-900 shadow-card transition-transform duration-200 ' +
          (open ? 'translate-x-0' : 'translate-x-full')
        }
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-ink-900/10 bg-bone-50/95 backdrop-blur px-5 py-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-italia-green font-semibold">Tweak section</p>
            <h2 className="font-display text-xl text-ink-950">Make it yours</h2>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="rounded-full border border-ink-900/15 px-3 py-1 text-xs hover:bg-ink-950/5"
          >
            Close
          </button>
        </div>

        <div className="px-5 py-6 space-y-8">
          <Group label="Theme">
            <div className="grid grid-cols-2 gap-2">
              {(['light', 'dark'] as ThemeMode[]).map((mode) => (
                <PresetButton
                  key={mode}
                  active={theme.mode === mode}
                  onClick={() => {
                    theme.set('mode', mode);
                    track('theme_mode_changed', { mode });
                  }}
                  title={mode === 'light' ? 'Light' : 'Dark'}
                  subtitle={mode === 'light' ? 'Cream editorial' : 'Deep ink'}
                  swatch={
                    <div className="flex h-8 w-full overflow-hidden rounded-md border border-ink-900/10">
                      <span className="flex-1" style={{ background: mode === 'light' ? '#fbf8f3' : '#0d0d0d' }} />
                      <span className="flex-1" style={{ background: mode === 'light' ? '#171717' : '#fbf8f3' }} />
                    </div>
                  }
                />
              ))}
            </div>
          </Group>

          <Group label="Accent palette">
            <div className="grid grid-cols-2 gap-2">
              {ACCENTS.map((a) => (
                <PresetButton
                  key={a.key}
                  active={theme.accent === a.key}
                  onClick={() => {
                    theme.set('accent', a.key);
                    track('theme_accent_changed', { accent: a.key });
                  }}
                  title={a.label}
                  swatch={
                    <div className="flex h-8 w-full overflow-hidden rounded-md border border-ink-900/10">
                      <span className="flex-1" style={{ background: a.primary }} />
                      <span className="flex-1" style={{ background: a.secondary }} />
                    </div>
                  }
                />
              ))}
            </div>
          </Group>

          <Group label="Typeface pair">
            <div className="space-y-2">
              {FONTS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => {
                    theme.set('font', f.key);
                    track('theme_font_changed', { font: f.key });
                  }}
                  className={
                    'w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ' +
                    (theme.font === f.key
                      ? 'border-italia-green bg-italia-green/10'
                      : 'border-ink-900/10 hover:border-ink-900/30')
                  }
                >
                  <div>
                    <div className="text-xs text-ink-500 uppercase tracking-[0.18em]">{f.label}</div>
                    <div className="text-2xl text-ink-950" style={{ fontFamily: f.family }}>
                      {f.sample}
                    </div>
                  </div>
                  {theme.font === f.key && <CheckIcon className="h-5 w-5 text-italia-green" />}
                </button>
              ))}
            </div>
          </Group>

          <Group label="Density">
            <div className="grid grid-cols-2 gap-2">
              {DENSITIES.map((d) => (
                <PresetButton
                  key={d.key}
                  active={theme.density === d.key}
                  onClick={() => {
                    theme.set('density', d.key);
                    track('theme_density_changed', { density: d.key });
                  }}
                  title={d.label}
                  subtitle={d.hint}
                />
              ))}
            </div>
          </Group>

          <button
            type="button"
            onClick={theme.reset}
            className="w-full rounded-full border border-ink-900/15 px-4 py-2 text-sm hover:bg-ink-950/5"
          >
            Reset to defaults
          </button>

          <p className="text-xs text-ink-500 leading-relaxed">
            Demo only - tweaks are stored in your browser. They show what we&apos;d wire up so you (or
            staff) can adjust the look without touching code.
          </p>
        </div>
      </aside>
    </>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-[10px] uppercase tracking-[0.22em] text-ink-500 font-semibold mb-3">{label}</h3>
      {children}
    </section>
  );
}

function PresetButton({
  active,
  onClick,
  title,
  subtitle,
  swatch,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
  swatch?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'rounded-xl border px-3 py-3 text-left transition ' +
        (active ? 'border-italia-green bg-italia-green/10' : 'border-ink-900/10 hover:border-ink-900/30')
      }
    >
      {swatch && <div className="mb-2">{swatch}</div>}
      <div className="text-sm font-semibold text-ink-950 leading-tight">{title}</div>
      {subtitle && <div className="text-[11px] text-ink-500 mt-0.5">{subtitle}</div>}
    </button>
  );
}

function SlidersIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className={className}>
      <line x1="4" y1="6" x2="11" y2="6" />
      <line x1="14" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="6" y2="12" />
      <line x1="9" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="14" y2="18" />
      <line x1="17" y1="18" x2="20" y2="18" />
      <circle cx="12" cy="6" r="2" fill="currentColor" stroke="none" />
      <circle cx="7.5" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="18" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
