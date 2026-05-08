import posthog from 'posthog-js';

const POSTHOG_KEY = 'phc_oXvHtxfQQmL9bRH3MdnZbU4JVoTp7XCGUS6tNp9ZPXkz';
const POSTHOG_HOST = 'https://eu.i.posthog.com';

let initialized = false;

export function initPostHog() {
  if (typeof window === 'undefined') return;
  if (initialized) return;
  initialized = true;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    ui_host: 'https://eu.posthog.com',
    person_profiles: 'always',
    autocapture: true,
    capture_pageview: false, // SPA - we trigger manually on route change
    capture_pageleave: true,
    session_recording: {
      maskAllInputs: false,
    },
    loaded: (ph) => {
      // Tag traffic that came from the email link, persists across the session
      const params = new URLSearchParams(window.location.search);
      if (params.get('via') === 'email') {
        ph.register({ via: 'email', acquisition_source: 'cold-outreach-2026' });
      }
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
