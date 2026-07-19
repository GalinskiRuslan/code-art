"use client";

import { useState } from "react";
import {
  calculatorOptions,
  multilingualPricePerLanguage,
  optionCategories,
} from "../data";
import { formatPrice, formatPriceLine } from "../format";
import {
  collectMissingRequirements,
  isOptionIncluded,
  type CalculatorAction,
} from "../state";
import { trackCalculatorEvent } from "../analytics";
import type { CalculatorOption, CalculatorState } from "../types";
import styles from "../calculator.module.css";
import { DependencyModal } from "../DependencyModal";

export function FeaturesStep({
  state,
  dispatch,
}: {
  state: CalculatorState;
  dispatch: (action: CalculatorAction) => void;
}) {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(
    optionCategories[0]?.id ?? null
  );
  const [expandedOptionIds, setExpandedOptionIds] = useState<Set<string>>(
    new Set()
  );
  const [pendingOption, setPendingOption] = useState<CalculatorOption | null>(
    null
  );

  const toggleDescription = (id: string) => {
    setExpandedOptionIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAddClick = (option: CalculatorOption) => {
    const missing = collectMissingRequirements(option.id, state);

    if (missing.length > 0) {
      setPendingOption(option);
      return;
    }

    dispatch({ type: "ADD_OPTIONS", ids: [option.id] });
    trackCalculatorEvent("option_added", { optionId: option.id });
  };

  const handleRemoveClick = (option: CalculatorOption) => {
    dispatch({ type: "REMOVE_OPTION", id: option.id });
    trackCalculatorEvent("option_removed", { optionId: option.id });
  };

  const missingForPending = pendingOption
    ? collectMissingRequirements(pendingOption.id, state)
    : [];

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>3. Функционал</h2>
      <p className={styles.cardHint}>
        Функции сгруппированы по категориям. Разверните нужную категорию и
        добавьте то, что важно для вашего проекта.
      </p>

      <div className={styles.categoryList}>
        {optionCategories.map((category) => {
          const categoryOptions = calculatorOptions.filter(
            (option) => option.categoryId === category.id
          );
          const selectedCount = categoryOptions.filter(
            (option) =>
              state.selectedOptionIds.includes(option.id) ||
              isOptionIncluded(option, state.productId)
          ).length;
          const isOpen = openCategoryId === category.id;

          return (
            <div key={category.id} className={styles.category}>
              <button
                type="button"
                className={styles.categoryHeader}
                aria-expanded={isOpen}
                onClick={() => setOpenCategoryId(isOpen ? null : category.id)}
              >
                <span>{category.title}</span>
                <span className={styles.categoryHeaderMeta}>
                  {selectedCount > 0 ? `Выбрано: ${selectedCount}` : `${categoryOptions.length} функций`}
                  <span
                    className={
                      isOpen
                        ? `${styles.categoryChevron} ${styles.categoryChevronOpen}`
                        : styles.categoryChevron
                    }
                    aria-hidden="true"
                  >
                    ⌄
                  </span>
                </span>
              </button>

              {isOpen ? (
                <div className={styles.categoryBody}>
                  {categoryOptions.map((option) => {
                    const included = isOptionIncluded(option, state.productId);
                    const selected = state.selectedOptionIds.includes(option.id);
                    const descriptionOpen = expandedOptionIds.has(option.id);

                    return (
                      <div
                        key={option.id}
                        className={
                          included
                            ? `${styles.featureCard} ${styles.featureCardIncluded}`
                            : selected
                              ? `${styles.featureCard} ${styles.featureCardSelected}`
                              : styles.featureCard
                        }
                      >
                        <div className={styles.featureInfo}>
                          <div className={styles.featureNameRow}>
                            <span className={styles.featureName}>{option.name}</span>
                            <button
                              type="button"
                              className={styles.featureInfoButton}
                              aria-expanded={descriptionOpen}
                              aria-label={`Пояснение: ${option.name}`}
                              onClick={() => toggleDescription(option.id)}
                            >
                              i
                            </button>
                          </div>

                          {descriptionOpen ? (
                            <p className={styles.featureDescription}>
                              {option.description}
                            </p>
                          ) : null}

                          <div className={styles.featurePriceRow}>
                            {included ? (
                              <span className={styles.includedBadge}>
                                ✓ Уже включено
                              </span>
                            ) : (
                              <span className={styles.featurePrice}>
                                +{formatPriceLine(option.price, option.priceFrom)}
                              </span>
                            )}
                          </div>
                        </div>

                        {included ? null : (
                          <div className={styles.featureActions}>
                            {selected ? (
                              <>
                                <span className={styles.addedButton}>
                                  ✓ Добавлено
                                </span>
                                <button
                                  type="button"
                                  className={styles.removeButton}
                                  onClick={() => handleRemoveClick(option)}
                                >
                                  Удалить
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                className={styles.addButton}
                                onClick={() => handleAddClick(option)}
                              >
                                Добавить
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {category.id === "advanced" ? (
                    <div className={styles.languageRow}>
                      <div className={styles.pagesLabel}>
                        <strong>Мультиязычность</strong>
                        <span>
                          {formatPrice(multilingualPricePerLanguage)} за каждый
                          дополнительный язык интерфейса
                        </span>
                      </div>
                      <div className={styles.stepper}>
                        <button
                          type="button"
                          className={styles.stepperButton}
                          onClick={() =>
                            dispatch({
                              type: "SET_EXTRA_LANGUAGES",
                              count: state.extraLanguages - 1,
                            })
                          }
                          disabled={state.extraLanguages <= 0}
                          aria-label="Меньше языков"
                        >
                          −
                        </button>
                        <span className={styles.stepperValue}>
                          {state.extraLanguages}
                        </span>
                        <button
                          type="button"
                          className={styles.stepperButton}
                          onClick={() =>
                            dispatch({
                              type: "SET_EXTRA_LANGUAGES",
                              count: state.extraLanguages + 1,
                            })
                          }
                          aria-label="Больше языков"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {pendingOption ? (
        <DependencyModal
          option={pendingOption}
          missing={missingForPending}
          onCancel={() => setPendingOption(null)}
          onConfirm={() => {
            const ids = [
              ...missingForPending.map((option) => option.id),
              pendingOption.id,
            ];
            dispatch({ type: "ADD_OPTIONS", ids });
            trackCalculatorEvent("option_added_with_dependencies", {
              optionId: pendingOption.id,
              dependencyIds: missingForPending.map((option) => option.id),
            });
            setPendingOption(null);
          }}
        />
      ) : null}
    </section>
  );
}
