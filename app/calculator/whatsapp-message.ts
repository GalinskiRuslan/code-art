import { discountPercent, extraServices, getProductById } from "./data";
import { formatPrice } from "./format";
import {
  computeDiscountedTotal,
  computeEstimatedDuration,
  getSummaryLineItems,
  getSummaryRecurringItems,
} from "./state";
import type { CalculatorState } from "./types";

const whatsappPhone = "77029951886";

export function buildCalculatorWhatsAppUrl(
  state: CalculatorState,
  savedUrl?: string
): string {
  const product = state.productId ? getProductById(state.productId) : null;
  if (!product) {
    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
      "Здравствуйте! Хочу рассчитать стоимость проекта с помощью калькулятора Code Art."
    )}`;
  }

  const lineItems = getSummaryLineItems(state);
  const recurringItems = getSummaryRecurringItems(state);
  const total = computeDiscountedTotal(state);
  const duration = computeEstimatedDuration(state);

  const parts = [
    "Здравствуйте! Собрал расчёт проекта на калькуляторе Code Art:",
    "",
    ...lineItems.map(
      (item) =>
        `${item.label} — ${item.isEstimate ? "от " : ""}${formatPrice(item.amount)}`
    ),
    "",
    `Предварительная стоимость: ${formatPrice(total)}${
      discountPercent > 0 ? ` (уже со скидкой ${discountPercent}%)` : ""
    }`,
  ];

  if (duration) {
    parts.push(`Ориентировочный срок: ${duration.minDays}–${duration.maxDays} дней`);
  }

  if (recurringItems.length > 0) {
    parts.push(
      "",
      "Регулярные расходы:",
      ...recurringItems.map(
        (item) =>
          `${item.label}: ${item.isEstimate ? "≈ " : ""}${formatPrice(item.amount)} / ${
            item.period === "month" ? "мес" : "год"
          }`
      )
    );
  }

  if (state.extraServiceIds.length > 0) {
    const names = state.extraServiceIds
      .map((id) => extraServices.find((service) => service.id === id)?.name)
      .filter(Boolean);
    parts.push("", `Доп. услуги (стоимость уточняется): ${names.join(", ")}`);
  }

  if (savedUrl) {
    parts.push("", `Ссылка на расчёт: ${savedUrl}`);
  }

  parts.push("", "Хочу обсудить проект и получить коммерческое предложение.");

  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(parts.join("\n"))}`;
}
