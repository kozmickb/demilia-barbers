import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark';
export type AccentKey = 'emerald' | 'navy' | 'sage' | 'oxblood';
export type FontKey = 'editorial' | 'modern' | 'classic' | 'sans';
export type DensityKey = 'comfortable' | 'compact';

export type ThemeState = {
  mode: ThemeMode;
  accent: AccentKey;
  font: FontKey;
  density: DensityKey;
};

const DEFAULT: ThemeState = {
  mode: 'light',
  accent: 'emerald',
  font: 'editorial',
  density: 'comfortable',
};

const STORAGE_KEY = 'demilia-theme-v1';

type Ctx = ThemeState & {
  set: <K extends keyof ThemeState>(key: K, value: ThemeState[K]) => void;
  reset: () => void;
};

const ThemeContext = createContext<Ctx | null>(null);

function readStored(): ThemeState {
  if (typeof window === 'undefined') return DEFAULT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT;
    const parsed = JSON.parse(raw) as Partial<ThemeState>;
    return { ...DEFAULT, ...parsed };
  } catch {
    return DEFAULT;
  }
}

function applyToDom(s: ThemeState) {
  const html = document.documentElement;
  html.dataset.theme = s.mode === 'dark' ? 'dark' : 'light';
  html.dataset.accent = s.accent;
  html.dataset.font = s.font;
  html.dataset.density = s.density;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ThemeState>(() => readStored());

  useEffect(() => {
    applyToDom(state);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
  }, [state]);

  const value: Ctx = {
    ...state,
    set: (key, value) => setState((prev) => ({ ...prev, [key]: value })),
    reset: () => setState(DEFAULT),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
