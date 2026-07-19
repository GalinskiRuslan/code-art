export type ProductId =
  | "landing"
  | "corporate"
  | "ecommerce"
  | "webservice"
  | "mvp"
  | "account";

export type CalculatorProduct = {
  id: ProductId;
  name: string;
  shortDescription: string;
  basePrice: number;
  minDays: number;
  maxDays: number;
  includedSummary: string[];
};

export type DesignTierId = "ready" | "template" | "custom" | "premium";

export type DesignTier = {
  id: DesignTierId;
  name: string;
  description: string;
  price: number;
};

export type OptionCategoryId =
  | "users"
  | "catalog"
  | "communications"
  | "content"
  | "advanced";

export type CalculatorOption = {
  id: string;
  categoryId: OptionCategoryId;
  name: string;
  description: string;
  price: number | null;
  priceFrom?: number;
  requiredOptionIds?: string[];
  incompatibleOptionIds?: string[];
  includedInProductIds?: ProductId[];
};

export type DomainChoiceId = "existing" | "register" | "connect" | "pick";
export type DomainZoneId = "kz" | "com";

export type HostingId = "client" | "basic" | "business" | "cloud" | "own-server";

export type HostingOption = {
  id: HostingId;
  name: string;
  description: string;
  oneTimePrice: number;
  oneTimePriceFrom?: boolean;
  recurringPrice: number | null;
  recurringPeriod: "year" | "month" | null;
  recurringPriceFrom?: boolean;
};

export type ExtraServiceCategoryId = "content" | "promotion" | "technical";

export type ExtraService = {
  id: string;
  categoryId: ExtraServiceCategoryId;
  name: string;
};

export type SupportTierId = "none" | "basic" | "business" | "personal";

export type SupportTier = {
  id: SupportTierId;
  name: string;
  price: number;
  priceFrom?: boolean;
  description: string;
  perks: string[];
};

export type CalculatorState = {
  productId: ProductId | null;
  designTierId: DesignTierId | null;
  pagesCount: number;
  selectedOptionIds: string[];
  extraLanguages: number;
  domainChoiceId: DomainChoiceId | null;
  domainZoneId: DomainZoneId;
  hostingId: HostingId | null;
  extraServiceIds: string[];
  supportTierId: SupportTierId | null;
};

export type StepId =
  | "product"
  | "design"
  | "features"
  | "domain"
  | "extras"
  | "support";
