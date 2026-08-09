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

// Hardcoded rather than read from an env var — this site is deployed on
// Vercel, which has no INTERNAL_API_URL/NEXT_PUBLIC_API_URL configured
// (Vercel doesn't read docker-compose.yml at all, those vars only exist
// for local/self-hosted Docker). Update this constant directly if
// launch-hub-api's public URL ever changes.
const PRODUCTION_API_URL = "https://launch.codeart.kz/api";

// Local/self-hosted Docker (docker-compose.yml's `front` service) still
// overrides via env var — container-to-container calls there use the
// Compose service DNS name (`api`), which only resolves inside that
// network, not on Vercel.
const INTERNAL_API_URL =
  process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || PRODUCTION_API_URL;

export async function loadCalculatorPricing(): Promise<CalculatorPricingOverrides> {
  const url = `${INTERNAL_API_URL}/calculator-pricing/public`;
  try {
    const response = await fetch(url, { next: { revalidate: 60 } });
    if (!response.ok) {
      console.error(
        `[calculator-pricing] ${url} responded ${response.status} ${response.statusText} — falling back to defaults`,
      );
      return DEFAULT_PRICING;
    }
    return (await response.json()) as CalculatorPricingOverrides;
  } catch (error) {
    console.error(`[calculator-pricing] fetch to ${url} failed — falling back to defaults`, error);
    return DEFAULT_PRICING;
  }
}
