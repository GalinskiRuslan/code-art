"use client";

import { useCallback, useEffect, useState } from "react";

import {
  defaultLanguage,
  isLanguage,
  type Language,
} from "../../lib/i18n";
import { SceneCanvas } from "./SceneCanvas";
import { SystemModulePanel } from "./SystemModulePanel";
import { SystemNavCard, type NavItemId } from "./SystemNavCard";

const sceneShiftStep = 0.85;
const maxSceneOffset = 2.55;
const languageStorageKey = "code-art-language";

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return defaultLanguage;

  const savedLanguage = window.localStorage.getItem(languageStorageKey);

  if (isLanguage(savedLanguage)) return savedLanguage;

  return window.navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
};

export function LandingShell() {
  const [sceneOffsetX, setSceneOffsetX] = useState(0);
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [activeNavItem, setActiveNavItem] = useState<NavItemId | null>(null);

  const shiftScene = useCallback((direction: -1 | 1) => {
    setSceneOffsetX((currentOffset) => {
      const nextOffset = currentOffset + direction * sceneShiftStep;

      return Math.max(-maxSceneOffset, Math.min(maxSceneOffset, nextOffset));
    });
  }, []);

  const changeLanguage = useCallback((nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem(languageStorageKey, nextLanguage);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        shiftScene(-1);
      }

      if (event.key === "ArrowRight") {
        shiftScene(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shiftScene]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <main className="site-shell">
      {/* <SiteHeader /> */}
      <SceneCanvas
        sceneOffsetX={sceneOffsetX}
        language={language}
        activeNavItem={activeNavItem}
        onActiveNavItemChange={setActiveNavItem}
      />
      <SystemNavCard
        language={language}
        onLanguageChange={changeLanguage}
        activeItem={activeNavItem}
        onActiveItemChange={setActiveNavItem}
      />
      <SystemModulePanel
        language={language}
        activeItem={activeNavItem}
        onClose={() => setActiveNavItem(null)}
      />
    </main>
  );
}
