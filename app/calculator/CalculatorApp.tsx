"use client";

import Link from "next/link";
import { useEffect, useReducer, useState } from "react";
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

export function CalculatorApp() {
  const [state, dispatch] = useReducer(calculatorReducer, initialCalculatorState);
  const [stepId, setStepId] = useState<StepId>("product");

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

  const goToStep = (id: StepId) => {
    if (id !== "product" && !canLeaveProductStep) return;
    setStepId(id);
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
            <button
              type="button"
              className={styles.footerNavButtonPrimary}
              onClick={goNext}
              disabled={stepId === "product" && !state.productId}
            >
              Далее →
            </button>
          ) : null}
        </div>
      </div>

      <SummaryPanel state={state} />
    </div>
  );
}
