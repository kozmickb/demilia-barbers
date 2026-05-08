import { track as vercelTrack } from '@vercel/analytics';

/**
 * Fire-and-forget custom event helper. Wraps Vercel Analytics' track()
 * so analytics never blocks the UI thread or throws into render.
 *
 * Page views and route changes are handled automatically by the
 * <Analytics /> component mounted in App.tsx - no manual SPA tracker needed.
 */
export function track(event: string, props: Record<string, string | number | boolean | null> = {}) {
  if (typeof window === 'undefined') return;
  try {
    vercelTrack(event, props);
  } catch {
    // never let analytics break the page
  }
}
