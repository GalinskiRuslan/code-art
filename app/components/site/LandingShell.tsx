"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { uiCopy, type Language } from "../../lib/i18n";
import { SystemNavCard, type NavItemId } from "./SystemNavCard";

const SceneCanvas = dynamic(
  () => import("./SceneCanvas").then((module) => module.SceneCanvas),
  {
    ssr: false,
    loading: () => <SceneCanvasFallback />,
  }
);

const SystemModulePanel = dynamic(
  () =>
    import("./SystemModulePanel").then((module) => module.SystemModulePanel),
  {
    ssr: false,
    loading: () => null,
  }
);

const sceneShiftStep = 0.85;
const maxSceneOffset = 2.55;
const mobileMediaQuery = "(max-width: 900px)";

export function LandingShell({
  language,
}: {
  // The route decides the language now (`/` = ru, `/en` = en) so every
  // language has its own crawlable, indexable URL. See app/en/page.tsx.
  language: Language;
}) {
  const [sceneOffsetX, setSceneOffsetX] = useState(0);
  const [activeNavItem, setActiveNavItem] = useState<NavItemId | null>(null);
  const [isMobileScene, setIsMobileScene] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [shouldLoadScene, setShouldLoadScene] = useState(false);
  const modulePanelWrapperRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const wasModuleOpenRef = useRef(false);

  const shiftScene = useCallback((direction: -1 | 1) => {
    setSceneOffsetX((currentOffset) => {
      const nextOffset = currentOffset + direction * sceneShiftStep;

      return Math.max(-maxSceneOffset, Math.min(maxSceneOffset, nextOffset));
    });
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
    const loadScene = () => setShouldLoadScene(true);
    const isMobileViewport = window.matchMedia(mobileMediaQuery).matches;
    const sceneDelay = isMobileViewport ? 4200 : 1600;
    const timeoutId = window.setTimeout(loadScene, sceneDelay);

    window.addEventListener("pointerdown", loadScene, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", loadScene, { once: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("pointerdown", loadScene);
      window.removeEventListener("keydown", loadScene);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Module panel accessibility: Escape closes it, and focus moves into the
  // panel on open and returns to whatever triggered it on close, instead of
  // leaving keyboard/screen-reader users stranded when it appears/disappears.
  useEffect(() => {
    if (!activeNavItem) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        changeActiveNavItem(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeNavItem, changeActiveNavItem]);

  useEffect(() => {
    if (activeNavItem) {
      if (!wasModuleOpenRef.current) {
        previousFocusRef.current =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;
        wasModuleOpenRef.current = true;
      }

      const frame = window.requestAnimationFrame(() => {
        modulePanelWrapperRef.current
          ?.querySelector<HTMLElement>(".system-module-close")
          ?.focus();
      });

      return () => window.cancelAnimationFrame(frame);
    }

    if (wasModuleOpenRef.current) {
      wasModuleOpenRef.current = false;
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    }
  }, [activeNavItem]);

  return (
    <main className={shellClassName}>
      <h1 className="sr-only">
        {language === "ru"
          ? "Code Art — разработка сайтов, веб-приложений, CRM и AI-интеграций"
          : "Code Art — website, web app, CRM and AI integration development"}
      </h1>
      {/* <SiteHeader /> */}
      <div className="mobile-nav-bar">
        <span>code-art</span>
        <div className="mobile-nav-shortcuts">
          <Link className="mobile-nav-shortcut" href="/world">
            {language === "ru" ? "Карта" : "Map"}
          </Link>
          <a
            className="mobile-nav-shortcut"
            href="https://game.codeart.kz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {language === "ru" ? "Игра" : "Game"}
          </a>
        </div>
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
      {shouldLoadScene ? (
        <SceneCanvas
          sceneOffsetX={isMobileScene ? 0 : sceneOffsetX}
          language={language}
          activeNavItem={activeNavItem}
          onActiveNavItemChange={changeActiveNavItem}
          isMobileScene={isMobileScene}
        />
      ) : (
        <SceneCanvasFallback language={language} />
      )}
      <SystemNavCard
        language={language}
        activeItem={activeNavItem}
        onActiveItemChange={changeActiveNavItem}
        onNavItemSelect={closeMobileNavigation}
      />
      {activeNavItem ? (
        <div ref={modulePanelWrapperRef}>
          <SystemModulePanel
            language={language}
            activeItem={activeNavItem}
            onClose={() => changeActiveNavItem(null)}
          />
        </div>
      ) : null}
    </main>
  );
}

function SceneCanvasFallback({ language }: { language?: Language }) {
  return (
    <div className="scene-canvas scene-canvas-fallback" aria-hidden="true">
      <div className="scene-canvas-fallback-core">
        <span>code-art</span>
        <i className="scene-canvas-fallback-bar" />
        {language ? (
          <p className="scene-canvas-fallback-status">
            {uiCopy[language].loadingScene}
          </p>
        ) : null}
      </div>
    </div>
  );
}
