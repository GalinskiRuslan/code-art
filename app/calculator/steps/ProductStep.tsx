"use client";

import { products } from "../data";
import { formatPrice } from "../format";
import { getWhatsAppHref } from "../../lib/whatsapp";
import { trackCalculatorEvent } from "../analytics";
import type { CalculatorAction } from "../state";
import type { CalculatorState } from "../types";
import styles from "../calculator.module.css";

export function ProductStep({
  state,
  dispatch,
}: {
  state: CalculatorState;
  dispatch: (action: CalculatorAction) => void;
}) {
  const selectedProduct = products.find((product) => product.id === state.productId);

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>1. Тип продукта</h2>
      <p className={styles.cardHint}>
        Тип проекта задаёт базовую стоимость, срок и начальный набор функций.
        Дальше вы донастроите дизайн, функционал и всё остальное.
      </p>

      <div className={styles.productGrid}>
        {products.map((product) => {
          const isActive = product.id === state.productId;

          return (
            <button
              key={product.id}
              type="button"
              className={
                isActive
                  ? `${styles.optionButton} ${styles.optionButtonActive}`
                  : styles.optionButton
              }
              aria-pressed={isActive}
              onClick={() => {
                dispatch({ type: "SET_PRODUCT", productId: product.id });
                trackCalculatorEvent("product_selected", {
                  productId: product.id,
                  basePrice: product.basePrice,
                });
              }}
            >
              <span className={styles.optionName}>{product.name}</span>
              <p className={styles.optionDescription}>{product.shortDescription}</p>
              <span className={styles.optionMeta}>
                <span className={styles.optionPrice}>
                  от {formatPrice(product.basePrice)}
                </span>
                <span className={styles.optionDuration}>
                  {product.minDays}–{product.maxDays} дней
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className={styles.consultRow}>
        <a
          className={styles.consultButton}
          href={getWhatsAppHref(
            "ru",
            "Не знаю, какой тип проекта выбрать — нужна консультация"
          )}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCalculatorEvent("consult_requested", { step: "product" })}
        >
          Не знаю, нужна консультация
        </a>
      </div>

      {selectedProduct ? (
        <div className={styles.includedBox}>
          <p className={styles.includedTitle}>
            Уже включено в базовую стоимость «{selectedProduct.name}»
          </p>
          <ul className={styles.includedList}>
            {selectedProduct.includedSummary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
