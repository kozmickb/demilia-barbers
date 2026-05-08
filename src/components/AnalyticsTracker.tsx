import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initPostHog, posthog } from '../lib/analytics';

/**
 * Initializes PostHog once on mount and captures a pageview every time the
 * SPA route changes. Mount inside BrowserRouter so useLocation works.
 */
export function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    initPostHog();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    posthog.capture('$pageview', {
      $current_url: window.location.href,
      path: location.pathname,
    });
  }, [location.pathname]);

  return null;
}
