import { useEffect } from 'react';
import { initPostHog } from '../lib/analytics';

/**
 * Initializes PostHog once on mount. Pageview tracking is handled by the
 * SDK via capture_pageview: 'history_change'.
 */
export function AnalyticsTracker() {
  useEffect(() => {
    initPostHog();
  }, []);
  return null;
}
