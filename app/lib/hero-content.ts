import type { Language } from "./i18n";

export const heroHeadline = [
  "We build",
  "digital experiences",
  "shaped by",
  "design, code, and AI",
] as const;

export const heroDescription =
  "Interactive websites, 3D scenes, motion systems, and intelligent interfaces for modern brands.";

export const heroTags = ["Web", "3D", "Motion", "AI", "Interactive"] as const;

const heroPanelLayouts = [
  {
    id: "interfaceLayer",
    position: [-12, -3, -64] as [number, number, number],
    rotation: [0, 0.12, 0] as [number, number, number],
  },
  {
    id: "motionSystems",
    position: [-25, 0, -65] as [number, number, number],
    rotation: [0, 0.12, 0] as [number, number, number],
  },
  {
    id: "webArchitecture",
    position: [0, -5, -58.5] as [number, number, number],
    rotation: [0.08, 0.12, 0] as [number, number, number],
  },
  {
    id: "aiCore",
    position: [-30, -1.2, -52] as [number, number, number],
    rotation: [0, 0.12, 0] as [number, number, number],
  },
] as const;

const heroPanelCopy = {
  en: {
    interfaceLayer: {
      title: "INTERFACE LAYER",
      eyebrow: "SYSTEM 01",
      lines: ["Design Systems", "UI Components", "Interactions"],
      accent: "LIVE",
      summary:
        "Interface systems that stay expressive under motion, responsive states, and dense product complexity.",
      details: [
        "Component libraries with reusable interaction patterns",
        "Motion-aware UI states for hover, focus, and transitions",
        "Visual systems that stay clean across desktop and mobile",
      ],
      stats: [
        { label: "Latency", value: "12ms" },
        { label: "Modules", value: "24" },
        { label: "State", value: "Synced" },
      ],
    },
    motionSystems: {
      title: "MOTION SYSTEMS",
      eyebrow: "SYSTEM 02",
      lines: ["Timelines", "Transitions", "Microinteractions"],
      accent: "ACTIVE",
      summary:
        "Motion direction that guides the eye, supports hierarchy, and makes advanced interfaces feel intuitive.",
      details: [
        "Choreographed section reveals and camera-linked timing",
        "Microinteractions tuned to feel precise, not noisy",
        "Animation systems that can scale with content changes",
      ],
      stats: [
        { label: "Curves", value: "48" },
        { label: "Loops", value: "06" },
        { label: "Flow", value: "Stable" },
      ],
    },
    webArchitecture: {
      title: "WEB ARCHITECTURE",
      eyebrow: "SYSTEM 03",
      lines: ["Structure", "Performance", "Scalability"],
      accent: "STABLE",
      summary:
        "Architecture for immersive sites that still loads fast, adapts cleanly, and stays maintainable.",
      details: [
        "Scene composition split into reusable technical layers",
        "Performance budgeting for 3D, motion, and content blocks",
        "A structure that supports iteration without visual collapse",
      ],
      stats: [
        { label: "Budget", value: "Light" },
        { label: "Render", value: "GPU" },
        { label: "Scale", value: "Ready" },
      ],
    },
    aiCore: {
      title: "AI CORE",
      eyebrow: "SYSTEM 04",
      lines: ["Intelligence", "Adaptive", "Real-time"],
      accent: "SYNCED",
      summary:
        "AI-driven layers that can personalize behavior, surface insight, and react in real time.",
      details: [
        "Context-aware interactions for immersive digital products",
        "Generative systems connected to live visual responses",
        "Adaptive UX patterns designed around intelligence, not gimmicks",
      ],
      stats: [
        { label: "Signals", value: "128" },
        { label: "Agents", value: "03" },
        { label: "Mode", value: "Live" },
      ],
    },
  },
  ru: {
    interfaceLayer: {
      title: "ИНТЕРФЕЙСНЫЙ СЛОЙ",
      eyebrow: "СИСТЕМА 01",
      lines: ["Дизайн-системы", "UI-компоненты", "Интеракции"],
      accent: "LIVE",
      summary:
        "Интерфейсные системы, которые остаются выразительными в движении, состояниях и сложной продуктовой логике.",
      details: [
        "Библиотеки компонентов с повторяемыми паттернами",
        "UI-состояния для hover, focus и переходов",
        "Визуальные системы для desktop и mobile",
      ],
      stats: [
        { label: "Задержка", value: "12ms" },
        { label: "Модули", value: "24" },
        { label: "Статус", value: "Синхр." },
      ],
    },
    motionSystems: {
      title: "СИСТЕМЫ АНИМАЦИИ",
      eyebrow: "СИСТЕМА 02",
      lines: ["Таймлайны", "Переходы", "Микроанимации"],
      accent: "АКТИВНО",
      summary:
        "Анимационное направление, которое ведет взгляд, поддерживает иерархию и делает интерфейс понятнее.",
      details: [
        "Сценарии появления секций и камерные переходы",
        "Микроинтеракции с точным, ненавязчивым ощущением",
        "Анимационные системы, готовые к росту контента",
      ],
      stats: [
        { label: "Кривые", value: "48" },
        { label: "Лупы", value: "06" },
        { label: "Поток", value: "Stable" },
      ],
    },
    webArchitecture: {
      title: "ВЕБ-АРХИТЕКТУРА",
      eyebrow: "СИСТЕМА 03",
      lines: ["Структура", "Скорость", "Масштаб"],
      accent: "STABLE",
      summary:
        "Архитектура для иммерсивных сайтов, которые быстро загружаются, адаптируются и легко развиваются.",
      details: [
        "Сцены разбиты на переиспользуемые технические слои",
        "Баланс производительности для 3D, motion и контента",
        "Структура, которая выдерживает быстрые итерации",
      ],
      stats: [
        { label: "Бюджет", value: "Light" },
        { label: "Рендер", value: "GPU" },
        { label: "Рост", value: "Ready" },
      ],
    },
    aiCore: {
      title: "AI-ЯДРО",
      eyebrow: "СИСТЕМА 04",
      lines: ["Интеллект", "Адаптация", "Реальное время"],
      accent: "SYNCED",
      summary:
        "AI-слои, которые персонализируют поведение, выявляют инсайты и реагируют в реальном времени.",
      details: [
        "Контекстные взаимодействия для цифровых продуктов",
        "Генеративные системы, связанные с визуальной реакцией",
        "UX-паттерны вокруг интеллекта, а не декоративного шума",
      ],
      stats: [
        { label: "Сигналы", value: "128" },
        { label: "Агенты", value: "03" },
        { label: "Режим", value: "Live" },
      ],
    },
  },
} as const satisfies Record<
  Language,
  Record<(typeof heroPanelLayouts)[number]["id"], object>
>;

export const floatingPanelUiCopy = {
  en: {
    linked: "Linked to core",
    activate: "Click to activate",
    focused: "Focused",
    expanded: "Expanded",
    standby: "Standby",
  },
  ru: {
    linked: "Связано с ядром",
    activate: "Активировать",
    focused: "В фокусе",
    expanded: "Открыто",
    standby: "Ожидание",
  },
} as const satisfies Record<Language, Record<string, string>>;

export const getHeroPanels = (language: Language) =>
  heroPanelLayouts.map((layout) => ({
    ...layout,
    ...heroPanelCopy[language][layout.id],
  }));
