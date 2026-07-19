"use client";

import { useEffect, useRef } from "react";
import { getOptionDisplayPrice } from "./state";
import { formatPrice, formatPriceLine } from "./format";
import type { CalculatorOption } from "./types";
import styles from "./calculator.module.css";

export function DependencyModal({
  option,
  missing,
  onConfirm,
  onCancel,
}: {
  option: CalculatorOption;
  missing: CalculatorOption[];
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const total =
    missing.reduce((sum, item) => sum + getOptionDisplayPrice(item), 0) +
    getOptionDisplayPrice(option);

  useEffect(() => {
    cancelButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div
        className={styles.modalCard}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dependency-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="dependency-modal-title" className={styles.modalTitle}>
          Добавить необходимые функции?
        </h3>
        <p className={styles.modalHint}>
          Функция «{option.name}» работает только вместе со следующими
          функциями. Добавим их вместе?
        </p>

        <ul className={styles.modalList}>
          {missing.map((item) => (
            <li key={item.id} className={styles.modalListRow}>
              <span>{item.name}</span>
              <strong>+{formatPriceLine(item.price, item.priceFrom)}</strong>
            </li>
          ))}
          <li className={styles.modalListRow}>
            <span>{option.name}</span>
            <strong>+{formatPriceLine(option.price, option.priceFrom)}</strong>
          </li>
        </ul>

        <div className={styles.modalTotalRow}>
          <span>Общая стоимость</span>
          <span>{formatPrice(total)}</span>
        </div>

        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.footerNavButtonPrimary}
            onClick={onConfirm}
          >
            Добавить всё
          </button>
          <button
            type="button"
            ref={cancelButtonRef}
            className={styles.footerNavButton}
            onClick={onCancel}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
