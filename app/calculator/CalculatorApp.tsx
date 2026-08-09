"use client";

import Link from "next/link";
import { useEffect, useReducer, useState } from "react";
import { applyPricingOverrides, type CalculatorPricingOverrides } from "./data";
import {
  calculatorReducer,
  decodeCalculatorState,
  initialCalculatorState,
} from "./state";
import { trackCalculatorEvent } from "./analytics";
import { ProductStep } from "./steps/ProductStep";
import { DesignStep } from "./steps/DesignStep";
import { FeaturesStep } from "./steps/FeaturesStep";
import { DomainHostingStep } from "./steps/DomainHostingStep";
import { ExtraServicesStep } from "./steps/ExtraServicesStep";
import { SupportStep } from "./steps/SupportStep";
import { SummaryPanel } from "./SummaryPanel";
import type { StepId } from "./types";
import styles from "./calculator.module.css";

const steps: Array<{ id: StepId; label: string }> = [
  { id: "product", label: "Продукт" },
  { id: "design", label: "Дизайн" },
  { id: "features", label: "Функционал" },
  { id: "domain", label: "Домен и хостинг" },
  { id: "extras", label: "Доп. услуги" },
  { id: "support", label: "Поддержка" },
];

function pluralizeSteps(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) return "шаг";
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return "шага";
  return "шагов";
}

export function CalculatorApp({ pricing }: { pricing: CalculatorPricingOverrides }) {
  // The client bundle has its own separate module instance of `data.ts`
  // (server-side overrides applied in page.tsx don't carry over), so the
  // resolved config from the server must be re-applied here too. Cheap and
  // idempotent — just overwrites ~45 numbers — so no guard against
  // re-running on every render is needed.
  applyPricingOverrides(pricing);

  const [state, dispatch] = useReducer(calculatorReducer, initialCalculatorState);
  const [stepId, setStepId] = useState<StepId>("product");
  const [maxVisitedIndex, setMaxVisitedIndex] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("c");

    if (encoded) {
      const restored = decodeCalculatorState(encoded);
      if (restored) {
        dispatch({ type: "LOAD_STATE", state: restored });
        trackCalculatorEvent("calculation_restored", {
          productId: restored.productId,
        });
      }
    }

    trackCalculatorEvent("step_view", { step: "product" });
  }, []);

  const currentIndex = steps.findIndex((step) => step.id === stepId);
  const canLeaveProductStep = Boolean(state.productId);
  const isComplete = maxVisitedIndex >= steps.length - 1;

  const goToStep = (id: StepId) => {
    if (id !== "product" && !canLeaveProductStep) return;
    const index = steps.findIndex((step) => step.id === id);
    setStepId(id);
    setMaxVisitedIndex((current) => Math.max(current, index));
    trackCalculatorEvent("step_view", { step: id });
  };

  const goNext = () => {
    const next = steps[currentIndex + 1];
    if (next) goToStep(next.id);
  };

  const goBack = () => {
    const previous = steps[currentIndex - 1];
    if (previous) goToStep(previous.id);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <nav className={styles.stepTabs} aria-label="Шаги калькулятора">
          {steps.map((step, index) => {
            const isActive = step.id === stepId;
            const isDisabled = step.id !== "product" && !canLeaveProductStep;
            const isDone = index < currentIndex;

            return (
              <button
                key={step.id}
                type="button"
                className={
                  isActive
                    ? `${styles.stepTab} ${styles.stepTabActive}`
                    : isDone
                      ? `${styles.stepTab} ${styles.stepTabDone}`
                      : styles.stepTab
                }
                disabled={isDisabled}
                onClick={() => goToStep(step.id)}
              >
                <span className={styles.stepIndex}>{index + 1}</span>
                {step.label}
              </button>
            );
          })}
        </nav>

        <div className={styles.stepProgress}>
          <div className={styles.stepProgressTrack}>
            <div
              className={styles.stepProgressFill}
              style={{ width: `${((maxVisitedIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
          <span className={styles.stepProgressLabel}>
            {isComplete
              ? "Все шаги пройдены — расчёт готов"
              : `Шаг ${currentIndex + 1} из ${steps.length}`}
          </span>
        </div>

        {stepId === "product" ? (
          <ProductStep state={state} dispatch={dispatch} />
        ) : null}
        {stepId === "design" ? (
          <DesignStep state={state} dispatch={dispatch} />
        ) : null}
        {stepId === "features" ? (
          <FeaturesStep state={state} dispatch={dispatch} />
        ) : null}
        {stepId === "domain" ? (
          <DomainHostingStep state={state} dispatch={dispatch} />
        ) : null}
        {stepId === "extras" ? (
          <ExtraServicesStep state={state} dispatch={dispatch} />
        ) : null}
        {stepId === "support" ? (
          <SupportStep state={state} dispatch={dispatch} />
        ) : null}

        <div className={styles.stepFooter}>
          {currentIndex > 0 ? (
            <button type="button" className={styles.footerNavButton} onClick={goBack}>
              ← Назад
            </button>
          ) : (
            <Link href="/" className={styles.footerNavButton}>
              ← На главную
            </Link>
          )}

          {currentIndex < steps.length - 1 ? (
            <div className={styles.stepFooterNext}>
              <span className={styles.stepFooterHint}>
                Осталось {steps.length - 1 - currentIndex}{" "}
                {pluralizeSteps(steps.length - 1 - currentIndex)}
              </span>
              <button
                type="button"
                className={`${styles.footerNavButtonPrimary} ${styles.footerNextButton}`}
                onClick={goNext}
                disabled={stepId === "product" && !state.productId}
              >
                Далее →
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <SummaryPanel
        state={state}
        isComplete={isComplete}
        remainingStepLabels={steps.slice(maxVisitedIndex + 1).map((step) => step.label)}
        totalSteps={steps.length}
        completedSteps={maxVisitedIndex + 1}
        onContinue={goNext}
      />
    </div>
  );
}
