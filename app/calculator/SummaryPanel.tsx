"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { formatPrice } from "./format";
import {
  computeEstimatedDuration,
  computeTotalOneTime,
  encodeCalculatorState,
  getSummaryLineItems,
  getSummaryRecurringItems,
} from "./state";
import { buildCalculatorWhatsAppUrl } from "./whatsapp-message";
import { trackCalculatorEvent } from "./analytics";
import type { CalculatorState } from "./types";
import styles from "./calculator.module.css";

export function SummaryPanel({ state }: { state: CalculatorState }) {
  const router = useRouter();
  const pathname = usePathname();
  const [savedUrl, setSavedUrl] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"saved" | "copied" | null>(null);

  if (!state.productId) {
    return (
      <aside className={styles.summary}>
        <p className={styles.summaryTitle}>Ваш проект</p>
        <p className={styles.summaryEmpty}>
          Выберите тип продукта, чтобы увидеть предварительную стоимость.
        </p>
      </aside>
    );
  }

  const lineItems = getSummaryLineItems(state);
  const recurringItems = getSummaryRecurringItems(state);
  const total = computeTotalOneTime(state);
  const duration = computeEstimatedDuration(state);

  const handleSave = async () => {
    const encoded = encodeCalculatorState(state);
    const url = `${window.location.origin}${pathname}?c=${encoded}`;

    router.replace(`${pathname}?c=${encoded}`, { scroll: false });
    setSavedUrl(url);
    trackCalculatorEvent("save_clicked", { total });

    // The URL is already saved regardless of clipboard access, so give
    // that feedback even if the copy itself fails (permissions,
    // non-secure context, older browsers without the Clipboard API).
    let status: "saved" | "copied" = "saved";
    try {
      await navigator.clipboard.writeText(url);
      status = "copied";
    } catch {
      // Ignored — falls back to "saved" status below.
    }

    setSaveStatus(status);
    window.setTimeout(() => setSaveStatus(null), 4000);
  };

  const handleGetQuote = () => {
    trackCalculatorEvent("quote_requested", { total });
    window.open(
      buildCalculatorWhatsAppUrl(state, savedUrl ?? undefined),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <aside className={styles.summary}>
      <p className={styles.summaryTitle}>Ваш проект</p>

      <ul className={styles.summaryList}>
        {lineItems.map((item) => (
          <li key={item.label} className={styles.summaryLine}>
            <span>{item.label}</span>
            <strong>
              {item.isEstimate ? "от " : ""}
              {formatPrice(item.amount)}
            </strong>
          </li>
        ))}
      </ul>

      <hr className={styles.summaryDivider} />

      <div className={styles.summaryTotalRow}>
        <span className={styles.summaryTotalLabel}>Предварительная стоимость</span>
        <span className={styles.summaryTotalValue}>{formatPrice(total)}</span>
      </div>

      {duration ? (
        <p className={styles.summaryDuration}>
          Ориентировочный срок: {duration.minDays}–{duration.maxDays} дней
        </p>
      ) : null}

      {recurringItems.length > 0 ? (
        <div>
          <p className={styles.summaryRecurringTitle}>Регулярные расходы</p>
          <ul className={styles.summaryList}>
            {recurringItems.map((item) => (
              <li key={item.label} className={styles.summaryLine}>
                <span>{item.label}</span>
                <strong>
                  {item.isEstimate ? "≈ " : ""}
                  {formatPrice(item.amount)} / {item.period === "month" ? "мес" : "год"}
                </strong>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className={styles.summaryActions}>
        <button
          type="button"
          className={styles.summaryPrimaryAction}
          onClick={handleGetQuote}
        >
          Получить коммерческое предложение
        </button>
        <button
          type="button"
          className={styles.summarySecondaryAction}
          onClick={handleSave}
        >
          Сохранить расчёт
        </button>
        {saveStatus === "copied" ? (
          <p className={styles.saveConfirm}>Ссылка скопирована в буфер обмена</p>
        ) : null}
        {saveStatus === "saved" ? (
          <p className={styles.saveConfirm}>Расчёт сохранён — ссылка в адресной строке</p>
        ) : null}
      </div>

      <p className={styles.summaryDisclaimer}>
        Расчёт является предварительным. Точная стоимость определяется после
        обсуждения требований и подготовки технического задания.
      </p>
    </aside>
  );
}
