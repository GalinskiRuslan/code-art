export type Language = "ru" | "en";

export const defaultLanguage: Language = "ru";

export const isLanguage = (value: string | null): value is Language =>
  value === "ru" || value === "en";

export const uiCopy = {
  en: {
    scenePosition: "Scene position",
    moveSceneLeft: "Move scene left",
    moveSceneRight: "Move scene right",
    loadingScene: "Loading scene...",
  },
  ru: {
    scenePosition: "Положение сцены",
    moveSceneLeft: "Сдвинуть сцену влево",
    moveSceneRight: "Сдвинуть сцену вправо",
    loadingScene: "Загрузка сцены...",
  },
} as const satisfies Record<Language, Record<string, string>>;

export const systemNavCopy = {
  en: {
    ariaLabel: "System navigation",
    primaryNavLabel: "Primary navigation",
    languageSwitchLabel: "Language",
    kicker: "System Nav",
    subtitle: "AI x Architecture",
    navigationCore: "Navigation Core",
    online: "Online",
    systemStatus: "System Status",
    stable: "Stable",
    latency: "Latency",
    uptime: "Uptime",
    nodes: "Nodes",
    moduleId: "Module ID",
    dataStream: "Data Stream",
    openModule: "Open Module",
    secureLink: "Secure link established",
    version: "ver. 2.4.1",
    navItems: {
      overview: "Overview",
      aiSystems: "AI Systems",
      webArchitecture: "Web Architecture",
      projects: "Projects",
      services: "Services",
      contact: "Contact",
    },
  },
  ru: {
    ariaLabel: "Системная навигация",
    primaryNavLabel: "Основная навигация",
    languageSwitchLabel: "Язык",
    kicker: "Системная навигация",
    subtitle: "AI x Архитектура",
    navigationCore: "Навигационное ядро",
    online: "Онлайн",
    systemStatus: "Статус системы",
    stable: "Стабильно",
    latency: "Задержка",
    uptime: "Аптайм",
    nodes: "Узлы",
    moduleId: "ID модуля",
    dataStream: "Поток данных",
    openModule: "Открыть модуль",
    secureLink: "Защищенное соединение",
    version: "вер. 2.4.1",
    navItems: {
      overview: "Обзор",
      aiSystems: "AI-системы",
      webArchitecture: "Веб-архитектура",
      projects: "Проекты",
      services: "Услуги",
      contact: "Контакты",
    },
  },
} as const satisfies Record<Language, object>;
