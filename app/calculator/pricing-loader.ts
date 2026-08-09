// Server-only — must not be imported from CalculatorApp.tsx or any other
// "use client" file. Fetches admin-editable prices/discount from
// launch-hub-api and hands them to page.tsx to apply via
// applyPricingOverrides() before anything renders.
import {
  calculatorOptions,
  designTiers,
  domainConnectPrice,
  domainPickPrice,
  domainRegistrationSetupFee,
  domainZones,
  hostingOptions,
  multilingualPricePerLanguage,
  pagePrice,
  products,
  supportTiers,
  type CalculatorPricingOverrides,
} from "./data";

// Snapshot of the still-pristine hardcoded values, captured once at module
// load (server boot) before any request has had a chance to call
// applyPricingOverrides — this is what the calculator falls back to if the
// API is unreachable, so a briefly-down backend never breaks the page.
const DEFAULT_PRICING: CalculatorPricingOverrides = {
  products: Object.fromEntries(products.map((p) => [p.id, p.basePrice])),
  designTiers: Object.fromEntries(designTiers.map((t) => [t.id, t.price])),
  pagePrice,
  options: Object.fromEntries(calculatorOptions.map((o) => [o.id, o.price])),
  optionsPriceFrom: Object.fromEntries(
    calculatorOptions.filter((o) => o.priceFrom != null).map((o) => [o.id, o.priceFrom as number])
  ),
  multilingualPricePerLanguage,
  domain: {
    registrationSetupFee: domainRegistrationSetupFee,
    connectPrice: domainConnectPrice,
    pickPrice: domainPickPrice,
    zones: Object.fromEntries(domainZones.map((z) => [z.id, z.yearlyEstimate])),
  },
  hosting: Object.fromEntries(
    hostingOptions.map((h) => [h.id, { oneTimePrice: h.oneTimePrice, recurringPrice: h.recurringPrice }])
  ),
  supportTiers: Object.fromEntries(supportTiers.map((t) => [t.id, t.price])),
  discountPercent: 0,
};

// Container-to-container calls must use the Compose service DNS name
// (`api`), not `localhost` — NEXT_PUBLIC_API_URL is the browser-facing
// URL and only resolves on the host machine. Falls back to it anyway for
// native `next dev` outside Docker, where `api` doesn't resolve.
const INTERNAL_API_URL =
  process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3010";

export async function loadCalculatorPricing(): Promise<CalculatorPricingOverrides> {
  try {
    const response = await fetch(`${INTERNAL_API_URL}/calculator-pricing/public`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return DEFAULT_PRICING;
    return (await response.json()) as CalculatorPricingOverrides;
  } catch {
    return DEFAULT_PRICING;
  }
}
