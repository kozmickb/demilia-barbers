import posthog from 'posthog-js';

const POSTHOG_KEY = 'phc_oXvHtxfQQmL9bRH3MdnZbU4JVoTp7XCGUS6tNp9ZPXkz';
const POSTHOG_HOST = 'https://us.i.posthog.com';

let initialized = false;

export function initPostHog() {
  if (typeof window === 'undefined') return;
  if (initialized) return;
  initialized = true;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    ui_host: 'https://us.posthog.com',
    person_profiles: 'always',
    autocapture: true,
    capture_pageview: false, // SPA - we trigger manually on route change
    capture_pageleave: true,
    request_batching: false, // send each event immediately, no batching
    disable_compression: true, // simpler request payload, easier to debug
    session_recording: {
      maskAllInputs: false,
    },
    loaded: (ph) => {
      // Expose for debugging in the browser console
      (window as unknown as { posthog: typeof ph }).posthog = ph;
      // Tag traffic that came from the email link, persists across the session
      const params = new URLSearchParams(window.location.search);
      if (params.get('via') === 'email') {
        ph.register({ via: 'email', acquisition_source: 'cold-outreach-2026' });
      }
      // Send a confirmation event so we know the wire works end-to-end
      ph.capture('analytics_initialized');
    },
  });
}

/** Fire-and-forget custom event helper for high-signal interactions. */
export function track(event: string, props: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  try {
    posthog.capture(event, props);
  } catch {
    // ignore - never let analytics break the page
  }
}

export { posthog };
