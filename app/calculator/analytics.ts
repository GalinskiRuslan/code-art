import { trackEvent, type AnalyticsEventPayload } from "../lib/analytics";

export function trackCalculatorEvent(
  eventName: string,
  payload: AnalyticsEventPayload = {}
) {
  trackEvent(`calculator_${eventName}`, payload);
}
