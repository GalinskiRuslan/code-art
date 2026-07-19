import {
  calculatorOptions,
  designTiers,
  domainConnectPrice,
  domainPickPrice,
  domainRegistrationSetupFee,
  domainZones,
  getOptionById,
  getProductById,
  hostingOptions,
  includedPages,
  multilingualPricePerLanguage,
  pagePrice,
  supportTiers,
} from "./data";
import { formatPrice } from "./format";
import type { CalculatorOption, CalculatorState, ProductId } from "./types";

export const initialCalculatorState: CalculatorState = {
  productId: null,
  designTierId: null,
  pagesCount: includedPages,
  selectedOptionIds: [],
  extraLanguages: 0,
  domainChoiceId: null,
  domainZoneId: "kz",
  hostingId: null,
  extraServiceIds: [],
  supportTierId: null,
};

export type CalculatorAction =
  | { type: "SET_PRODUCT"; productId: ProductId }
  | { type: "SET_DESIGN_TIER"; designTierId: CalculatorState["designTierId"] }
  | { type: "SET_PAGES_COUNT"; count: number }
  | { type: "ADD_OPTIONS"; ids: string[] }
  | { type: "REMOVE_OPTION"; id: string }
  | { type: "SET_EXTRA_LANGUAGES"; count: number }
  | { type: "SET_DOMAIN_CHOICE"; id: CalculatorState["domainChoiceId"] }
  | { type: "SET_DOMAIN_ZONE"; id: CalculatorState["domainZoneId"] }
  | { type: "SET_HOSTING"; id: CalculatorState["hostingId"] }
  | { type: "TOGGLE_EXTRA_SERVICE"; id: string }
  | { type: "SET_SUPPORT_TIER"; id: CalculatorState["supportTierId"] }
  | { type: "LOAD_STATE"; state: CalculatorState }
  | { type: "RESET" };

export function calculatorReducer(
  state: CalculatorState,
  action: CalculatorAction
): CalculatorState {
  switch (action.type) {
    case "SET_PRODUCT":
      return { ...state, productId: action.productId };
    case "SET_DESIGN_TIER":
      return { ...state, designTierId: action.designTierId };
    case "SET_PAGES_COUNT":
      return { ...state, pagesCount: Math.max(1, action.count) };
    case "ADD_OPTIONS":
      return {
        ...state,
        selectedOptionIds: Array.from(
          new Set([...state.selectedOptionIds, ...action.ids])
        ),
      };
    case "REMOVE_OPTION": {
      const toRemove = collectDependentSelectedIds(action.id, state.selectedOptionIds);
      return {
        ...state,
        selectedOptionIds: state.selectedOptionIds.filter(
          (id) => !toRemove.has(id)
        ),
      };
    }
    case "SET_EXTRA_LANGUAGES":
      return { ...state, extraLanguages: Math.max(0, action.count) };
    case "SET_DOMAIN_CHOICE":
      return { ...state, domainChoiceId: action.id };
    case "SET_DOMAIN_ZONE":
      return { ...state, domainZoneId: action.id };
    case "SET_HOSTING":
      return { ...state, hostingId: action.id };
    case "TOGGLE_EXTRA_SERVICE":
      return {
        ...state,
        extraServiceIds: state.extraServiceIds.includes(action.id)
          ? state.extraServiceIds.filter((id) => id !== action.id)
          : [...state.extraServiceIds, action.id],
      };
    case "SET_SUPPORT_TIER":
      return { ...state, supportTierId: action.id };
    case "LOAD_STATE":
      return action.state;
    case "RESET":
      return initialCalculatorState;
    default:
      return state;
  }
}

// A selected option that required `id` can no longer stay selected once
// `id` is removed, and so on transitively (e.g. removing "auth" also
// removes "личный кабинет" and anything that needed the account).
function collectDependentSelectedIds(
  id: string,
  selectedOptionIds: string[]
): Set<string> {
  const toRemove = new Set<string>([id]);
  let changed = true;

  while (changed) {
    changed = false;
    for (const selectedId of selectedOptionIds) {
      if (toRemove.has(selectedId)) continue;
      const option = getOptionById(selectedId);
      const dependsOnRemoved = option?.requiredOptionIds?.some((reqId) =>
        toRemove.has(reqId)
      );
      if (dependsOnRemoved) {
        toRemove.add(selectedId);
        changed = true;
      }
    }
  }

  return toRemove;
}

export function isOptionIncluded(
  option: CalculatorOption,
  productId: ProductId | null
): boolean {
  if (!productId) return false;
  return Boolean(option.includedInProductIds?.includes(productId));
}

// Full transitive set of options required to safely add `optionId` that
// aren't already selected or bundled free into the current product.
export function collectMissingRequirements(
  optionId: string,
  state: CalculatorState
): CalculatorOption[] {
  const missing = new Map<string, CalculatorOption>();
  const visited = new Set<string>();

  function visit(currentId: string) {
    if (visited.has(currentId)) return;
    visited.add(currentId);

    const option = getOptionById(currentId);
    if (!option?.requiredOptionIds) return;

    for (const reqId of option.requiredOptionIds) {
      const reqOption = getOptionById(reqId);
      if (!reqOption) continue;

      const satisfied =
        state.selectedOptionIds.includes(reqId) ||
        isOptionIncluded(reqOption, state.productId);

      if (!satisfied) {
        missing.set(reqId, reqOption);
      }

      visit(reqId);
    }
  }

  visit(optionId);

  return Array.from(missing.values());
}

export function getOptionDisplayPrice(option: CalculatorOption): number {
  return option.price ?? option.priceFrom ?? 0;
}

export function computeAdditionalPagesPrice(pagesCount: number): number {
  return Math.max(0, pagesCount - includedPages) * pagePrice;
}

export function computeOptionsOneTime(state: CalculatorState): number {
  return state.selectedOptionIds.reduce((sum, id) => {
    const option = getOptionById(id);
    if (!option) return sum;
    if (isOptionIncluded(option, state.productId)) return sum;
    return sum + getOptionDisplayPrice(option);
  }, 0);
}

export function computeMultilingualPrice(state: CalculatorState): number {
  return state.extraLanguages * multilingualPricePerLanguage;
}

export function computeDomainOneTime(state: CalculatorState): number {
  const zone = domainZones.find((item) => item.id === state.domainZoneId);
  const zonePrice = zone?.yearlyEstimate ?? 0;

  switch (state.domainChoiceId) {
    case "register":
      return zonePrice + domainRegistrationSetupFee;
    case "connect":
      return domainConnectPrice;
    case "pick":
      return domainPickPrice;
    case "existing":
    default:
      return 0;
  }
}

export function computeDomainRecurring(state: CalculatorState): number {
  if (state.domainChoiceId !== "register") return 0;

  const zone = domainZones.find((item) => item.id === state.domainZoneId);
  return zone?.yearlyEstimate ?? 0;
}

export function getSelectedHosting(state: CalculatorState) {
  return hostingOptions.find((item) => item.id === state.hostingId) ?? null;
}

export function computeHostingOneTime(state: CalculatorState): number {
  return getSelectedHosting(state)?.oneTimePrice ?? 0;
}

export function getSelectedSupportTier(state: CalculatorState) {
  return supportTiers.find((item) => item.id === state.supportTierId) ?? null;
}

export function computeTotalOneTime(state: CalculatorState): number {
  const product = state.productId ? getProductById(state.productId) : null;
  const designTier = designTiers.find((tier) => tier.id === state.designTierId);

  return (
    (product?.basePrice ?? 0) +
    (designTier?.price ?? 0) +
    computeAdditionalPagesPrice(state.pagesCount) +
    computeOptionsOneTime(state) +
    computeMultilingualPrice(state) +
    computeDomainOneTime(state) +
    computeHostingOneTime(state)
  );
}

export type SummaryLineItem = {
  label: string;
  amount: number;
  isEstimate?: boolean;
};

export function getSummaryLineItems(state: CalculatorState): SummaryLineItem[] {
  const items: SummaryLineItem[] = [];
  const product = state.productId ? getProductById(state.productId) : null;
  if (!product) return items;

  items.push({ label: product.name, amount: product.basePrice });

  const designTier = designTiers.find((tier) => tier.id === state.designTierId);
  if (designTier && designTier.price > 0) {
    items.push({ label: designTier.name, amount: designTier.price });
  }

  const additionalPagesPrice = computeAdditionalPagesPrice(state.pagesCount);
  if (additionalPagesPrice > 0) {
    const extraPages = state.pagesCount - includedPages;
    items.push({
      label: `Доп. страницы, ${extraPages} × ${formatPrice(pagePrice)}`,
      amount: additionalPagesPrice,
    });
  }

  for (const id of state.selectedOptionIds) {
    const option = getOptionById(id);
    if (!option || isOptionIncluded(option, state.productId)) continue;

    items.push({
      label: option.name,
      amount: getOptionDisplayPrice(option),
      isEstimate: option.price === null,
    });
  }

  if (state.extraLanguages > 0) {
    items.push({
      label: `Мультиязычность, ${state.extraLanguages} яз.`,
      amount: computeMultilingualPrice(state),
    });
  }

  const domainOneTime = computeDomainOneTime(state);
  if (domainOneTime > 0) {
    items.push({ label: "Домен — настройка", amount: domainOneTime });
  }

  const hostingOneTime = computeHostingOneTime(state);
  if (hostingOneTime > 0) {
    const hosting = getSelectedHosting(state);
    items.push({
      label: hosting?.name ?? "Хостинг — настройка",
      amount: hostingOneTime,
      isEstimate: hosting?.oneTimePriceFrom,
    });
  }

  return items;
}

export type RecurringLineItem = {
  label: string;
  amount: number;
  period: "year" | "month";
  isEstimate?: boolean;
};

export function getSummaryRecurringItems(
  state: CalculatorState
): RecurringLineItem[] {
  const items: RecurringLineItem[] = [];

  const domainRecurring = computeDomainRecurring(state);
  if (domainRecurring > 0) {
    items.push({
      label: "Домен",
      amount: domainRecurring,
      period: "year",
      isEstimate: true,
    });
  }

  const hosting = getSelectedHosting(state);
  if (hosting?.recurringPrice) {
    items.push({
      label: hosting.name,
      amount: hosting.recurringPrice,
      period: hosting.recurringPeriod === "month" ? "month" : "year",
      isEstimate: hosting.recurringPriceFrom,
    });
  }

  const supportTier = getSelectedSupportTier(state);
  if (supportTier && supportTier.id !== "none") {
    items.push({
      label: supportTier.name,
      amount: supportTier.price,
      period: "month",
      isEstimate: supportTier.priceFrom,
    });
  }

  return items;
}

export function computeEstimatedDuration(
  state: CalculatorState
): { minDays: number; maxDays: number } | null {
  const product = state.productId ? getProductById(state.productId) : null;
  if (!product) return null;

  const totalOneTime = computeTotalOneTime(state);
  const growth = product.basePrice > 0 ? totalOneTime / product.basePrice - 1 : 0;
  const span = product.maxDays - product.minDays;
  const shift = Math.round(span * Math.min(1, Math.max(0, growth)) * 0.6);

  return {
    minDays: Math.min(product.maxDays, product.minDays + shift),
    maxDays: product.maxDays,
  };
}

export function encodeCalculatorState(state: CalculatorState): string {
  const compact = {
    p: state.productId,
    d: state.designTierId,
    pg: state.pagesCount,
    o: state.selectedOptionIds,
    l: state.extraLanguages,
    dc: state.domainChoiceId,
    dz: state.domainZoneId,
    h: state.hostingId,
    e: state.extraServiceIds,
    s: state.supportTierId,
  };

  return btoa(encodeURIComponent(JSON.stringify(compact)));
}

export function decodeCalculatorState(param: string): CalculatorState | null {
  try {
    const compact = JSON.parse(decodeURIComponent(atob(param))) as Record<
      string,
      unknown
    >;

    return {
      productId: (compact.p as ProductId | null) ?? null,
      designTierId:
        (compact.d as CalculatorState["designTierId"]) ?? null,
      pagesCount:
        typeof compact.pg === "number" ? compact.pg : includedPages,
      selectedOptionIds: Array.isArray(compact.o)
        ? (compact.o as string[])
        : [],
      extraLanguages: typeof compact.l === "number" ? compact.l : 0,
      domainChoiceId:
        (compact.dc as CalculatorState["domainChoiceId"]) ?? null,
      domainZoneId: compact.dz === "com" ? "com" : "kz",
      hostingId: (compact.h as CalculatorState["hostingId"]) ?? null,
      extraServiceIds: Array.isArray(compact.e) ? (compact.e as string[]) : [],
      supportTierId:
        (compact.s as CalculatorState["supportTierId"]) ?? null,
    };
  } catch {
    return null;
  }
}

export { calculatorOptions };
