"use client";

import { designTiers, includedPages, pagePrice } from "../data";
import { formatPrice } from "../format";
import { trackCalculatorEvent } from "../analytics";
import type { CalculatorAction } from "../state";
import type { CalculatorState } from "../types";
import styles from "../calculator.module.css";

export function DesignStep({
  state,
  dispatch,
}: {
  state: CalculatorState;
  dispatch: (action: CalculatorAction) => void;
}) {
  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>2. Выбор дизайна</h2>
      <p className={styles.cardHint}>
        От готовой структуры до полностью индивидуального интерфейса с
        дизайн-системой.
      </p>

      <div className={styles.designGrid}>
        {designTiers.map((tier) => {
          const isActive = tier.id === state.designTierId;

          return (
            <button
              key={tier.id}
              type="button"
              className={
                isActive
                  ? `${styles.optionButton} ${styles.optionButtonActive}`
                  : styles.optionButton
              }
              aria-pressed={isActive}
              onClick={() => {
                dispatch({ type: "SET_DESIGN_TIER", designTierId: tier.id });
                trackCalculatorEvent("design_tier_selected", {
                  designTierId: tier.id,
                  price: tier.price,
                });
              }}
            >
              <span className={styles.optionName}>{tier.name}</span>
              <p className={styles.optionDescription}>{tier.description}</p>
              <span className={styles.optionPrice}>
                +{formatPrice(tier.price)}
              </span>
            </button>
          );
        })}
      </div>

      <div className={styles.pagesRow}>
        <div className={styles.pagesLabel}>
          <strong>Уникальные страницы</strong>
          <span>
            Первые {includedPages} страниц включены. Дополнительная страница:{" "}
            {formatPrice(pagePrice)}
          </span>
        </div>

        <div className={styles.stepper}>
          <button
            type="button"
            className={styles.stepperButton}
            onClick={() =>
              dispatch({ type: "SET_PAGES_COUNT", count: state.pagesCount - 1 })
            }
            disabled={state.pagesCount <= 1}
            aria-label="Меньше страниц"
          >
            −
          </button>
          <span className={styles.stepperValue}>{state.pagesCount}</span>
          <button
            type="button"
            className={styles.stepperButton}
            onClick={() =>
              dispatch({ type: "SET_PAGES_COUNT", count: state.pagesCount + 1 })
            }
            aria-label="Больше страниц"
          >
            +
          </button>
        </div>
      </div>
    </section>
  );
}
