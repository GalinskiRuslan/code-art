"use client";

import { supportTiers } from "../data";
import { formatPrice } from "../format";
import { trackCalculatorEvent } from "../analytics";
import type { CalculatorAction } from "../state";
import type { CalculatorState } from "../types";
import styles from "../calculator.module.css";

export function SupportStep({
  state,
  dispatch,
}: {
  state: CalculatorState;
  dispatch: (action: CalculatorAction) => void;
}) {
  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>6. Поддержка после запуска</h2>
      <p className={styles.cardHint}>
        Поддержка — регулярный расход и считается отдельно от разовой
        стоимости разработки.
      </p>

      <div className={styles.radioGrid}>
        {supportTiers.map((tier) => {
          const isActive = tier.id === state.supportTierId;

          return (
            <button
              key={tier.id}
              type="button"
              className={
                isActive
                  ? `${styles.radioCard} ${styles.radioCardActive}`
                  : styles.radioCard
              }
              aria-pressed={isActive}
              onClick={() => {
                dispatch({ type: "SET_SUPPORT_TIER", id: tier.id });
                trackCalculatorEvent("support_tier_selected", {
                  supportTierId: tier.id,
                });
              }}
            >
              <span className={styles.radioCardName}>{tier.name}</span>
              <p className={styles.radioCardDescription}>{tier.description}</p>
              {tier.perks.length > 0 ? (
                <ul className={styles.radioCardPerks}>
                  {tier.perks.map((perk) => (
                    <li key={perk}>• {perk}</li>
                  ))}
                </ul>
              ) : null}
              <span className={styles.radioCardPrice}>
                {tier.price > 0
                  ? `${tier.priceFrom ? "от " : ""}${formatPrice(tier.price)} / мес`
                  : "0 ₸"}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
