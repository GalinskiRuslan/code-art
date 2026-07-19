"use client";

import {
  domainConnectPrice,
  domainPickPrice,
  domainRegistrationSetupFee,
  domainZones,
  hostingOptions,
} from "../data";
import { formatPrice } from "../format";
import { trackCalculatorEvent } from "../analytics";
import type { CalculatorAction } from "../state";
import type { CalculatorState, DomainChoiceId } from "../types";
import styles from "../calculator.module.css";

const domainChoices: Array<{
  id: DomainChoiceId;
  name: string;
  description: string;
}> = [
  {
    id: "existing",
    name: "Домен уже есть",
    description: "Продолжаем работу с вашим текущим доменом.",
  },
  {
    id: "register",
    name: "Зарегистрировать домен",
    description: "Стоимость домена (первый год) + настройка.",
  },
  {
    id: "connect",
    name: "Подключить существующий домен",
    description: "Настроим DNS и подключим домен к проекту.",
  },
  {
    id: "pick",
    name: "Подобрать название и проверить домены",
    description: "Поможем подобрать свободное и удачное имя.",
  },
];

function getDomainChoicePrice(id: DomainChoiceId, zoneEstimate: number): number {
  switch (id) {
    case "register":
      return zoneEstimate + domainRegistrationSetupFee;
    case "connect":
      return domainConnectPrice;
    case "pick":
      return domainPickPrice;
    case "existing":
    default:
      return 0;
  }
}

export function DomainHostingStep({
  state,
  dispatch,
}: {
  state: CalculatorState;
  dispatch: (action: CalculatorAction) => void;
}) {
  const zone = domainZones.find((item) => item.id === state.domainZoneId);

  return (
    <>
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>4. Домен</h2>
        <p className={styles.cardHint}>
          Стоимость домена ориентировочная — зависит от регистратора и
          доступности конкретного имени.
        </p>

        <div className={styles.radioGrid}>
          {domainChoices.map((choice) => {
            const isActive = choice.id === state.domainChoiceId;
            const price = getDomainChoicePrice(
              choice.id,
              zone?.yearlyEstimate ?? 0
            );

            return (
              <button
                key={choice.id}
                type="button"
                className={
                  isActive
                    ? `${styles.radioCard} ${styles.radioCardActive}`
                    : styles.radioCard
                }
                aria-pressed={isActive}
                onClick={() => {
                  dispatch({ type: "SET_DOMAIN_CHOICE", id: choice.id });
                  trackCalculatorEvent("domain_choice_selected", {
                    domainChoiceId: choice.id,
                  });
                }}
              >
                <span className={styles.radioCardName}>{choice.name}</span>
                <p className={styles.radioCardDescription}>
                  {choice.description}
                </p>
                <span className={styles.radioCardPrice}>
                  {price > 0 ? formatPrice(price) : "0 ₸"}
                </span>
              </button>
            );
          })}
        </div>

        {state.domainChoiceId === "register" ? (
          <div className={styles.subCard}>
            <p className={styles.subCardTitle}>Зона домена</p>
            <div className={styles.radioGrid}>
              {domainZones.map((item) => {
                const isActive = item.id === state.domainZoneId;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={
                      isActive
                        ? `${styles.radioCard} ${styles.radioCardActive}`
                        : styles.radioCard
                    }
                    aria-pressed={isActive}
                    onClick={() =>
                      dispatch({ type: "SET_DOMAIN_ZONE", id: item.id })
                    }
                  >
                    <span className={styles.radioCardName}>{item.name}</span>
                    <p className={styles.radioCardDescription}>
                      Ориентировочно {item.rangeLabel}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Хостинг</h2>
        <p className={styles.cardHint}>
          Разовая настройка и регулярные расходы считаются отдельно от
          стоимости разработки.
        </p>

        <div className={styles.radioGrid}>
          {hostingOptions.map((hosting) => {
            const isActive = hosting.id === state.hostingId;

            return (
              <button
                key={hosting.id}
                type="button"
                className={
                  isActive
                    ? `${styles.radioCard} ${styles.radioCardActive}`
                    : styles.radioCard
                }
                aria-pressed={isActive}
                onClick={() => {
                  dispatch({ type: "SET_HOSTING", id: hosting.id });
                  trackCalculatorEvent("hosting_selected", {
                    hostingId: hosting.id,
                  });
                }}
              >
                <span className={styles.radioCardName}>{hosting.name}</span>
                <p className={styles.radioCardDescription}>
                  {hosting.description}
                </p>
                <span className={styles.radioCardPrice}>
                  {hosting.oneTimePrice > 0
                    ? `${hosting.oneTimePriceFrom ? "от " : ""}${formatPrice(hosting.oneTimePrice)} разово`
                    : hosting.recurringPrice
                      ? `${hosting.recurringPriceFrom ? "от " : ""}${formatPrice(hosting.recurringPrice)} / ${hosting.recurringPeriod === "month" ? "мес" : "год"}`
                      : "0 ₸"}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
}
