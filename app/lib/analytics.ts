export type AnalyticsEventPayload = Record<string, unknown>;

// Pushes a GTM/GA4-style event onto window.dataLayer. Safe to call from
// anywhere (including during SSR, where it's a no-op) since window isn't
// available on the server.
export function trackEvent(eventName: string, payload: AnalyticsEventPayload = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: eventName,
    ...payload,
  });
}
