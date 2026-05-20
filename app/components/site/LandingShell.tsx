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
const mobileMediaQuery = "(max-width: 900px)";

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
  const [isMobileScene, setIsMobileScene] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

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

  const changeActiveNavItem = useCallback((item: NavItemId | null) => {
    setActiveNavItem(item);
    setIsMobileNavOpen(false);
  }, []);

  const closeMobileNavigation = useCallback(() => {
    setIsMobileNavOpen(false);
  }, []);

  const toggleMobileNavigation = useCallback(() => {
    if (isMobileNavOpen) {
      setIsMobileNavOpen(false);
      return;
    }

    setActiveNavItem(null);
    setIsMobileNavOpen(true);
  }, [isMobileNavOpen]);

  const shellClassName = [
    "site-shell",
    isMobileNavOpen ? "is-mobile-nav-open" : "",
    activeNavItem ? "has-active-module" : "",
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isMobileScene) return;

      if (event.key === "ArrowLeft") {
        shiftScene(-1);
      }

      if (event.key === "ArrowRight") {
        shiftScene(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileScene, shiftScene]);

  useEffect(() => {
    const media = window.matchMedia(mobileMediaQuery);
    const updateMobileState = () => {
      setIsMobileScene(media.matches);

      if (!media.matches) {
        setIsMobileNavOpen(false);
      }
    };

    updateMobileState();
    media.addEventListener("change", updateMobileState);

    return () => media.removeEventListener("change", updateMobileState);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <main className={shellClassName}>
      {/* <SiteHeader /> */}
      <div className="mobile-nav-bar">
        <span>code-art</span>
        <button
          className="mobile-nav-toggle"
          type="button"
          aria-expanded={isMobileNavOpen}
          onClick={toggleMobileNavigation}
        >
          {isMobileNavOpen
            ? language === "ru"
              ? "Закрыть"
              : "Close"
            : language === "ru"
              ? "Подробнее"
              : "Details"}
        </button>
      </div>
      <SceneCanvas
        sceneOffsetX={isMobileScene ? 0 : sceneOffsetX}
        language={language}
        activeNavItem={activeNavItem}
        onActiveNavItemChange={changeActiveNavItem}
        isMobileScene={isMobileScene}
      />
      <SystemNavCard
        language={language}
        onLanguageChange={changeLanguage}
        activeItem={activeNavItem}
        onActiveItemChange={changeActiveNavItem}
        onNavItemSelect={closeMobileNavigation}
      />
      <SystemModulePanel
        language={language}
        activeItem={activeNavItem}
        onClose={() => changeActiveNavItem(null)}
      />
    </main>
  );
}
