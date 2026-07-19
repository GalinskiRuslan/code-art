"use client";

import { extraServiceCategories, extraServices } from "../data";
import { trackCalculatorEvent } from "../analytics";
import type { CalculatorAction } from "../state";
import type { CalculatorState } from "../types";
import styles from "../calculator.module.css";

export function ExtraServicesStep({
  state,
  dispatch,
}: {
  state: CalculatorState;
  dispatch: (action: CalculatorAction) => void;
}) {
  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>5. Дополнительные услуги</h2>
      <p className={styles.cardHint}>
        Отметьте, что нужно, — стоимость этих услуг индивидуальна и
        уточняется после обсуждения объёма работ, поэтому в предварительный
        расчёт она не входит.
      </p>

      {extraServiceCategories.map((category) => (
        <div key={category.id}>
          <p className={styles.categoryLabel}>{category.title}</p>
          <div className={styles.checkboxGrid}>
            {extraServices
              .filter((service) => service.categoryId === category.id)
              .map((service) => {
                const checked = state.extraServiceIds.includes(service.id);

                return (
                  <label
                    key={service.id}
                    className={
                      checked
                        ? `${styles.checkboxItem} ${styles.checkboxItemChecked}`
                        : styles.checkboxItem
                    }
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        dispatch({ type: "TOGGLE_EXTRA_SERVICE", id: service.id });
                        trackCalculatorEvent("extra_service_toggled", {
                          serviceId: service.id,
                          checked: !checked,
                        });
                      }}
                    />
                    {service.name}
                  </label>
                );
              })}
          </div>
        </div>
      ))}
    </section>
  );
}
