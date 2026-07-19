"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Language } from "../../lib/i18n";
import { getWhatsAppHref } from "../../lib/whatsapp";
import { trackEvent } from "../../lib/analytics";

export const navItems = [
  { id: "overview", code: "01", icon: "target" },
  { id: "aiSystems", code: "02", icon: "neural" },
  { id: "webArchitecture", code: "03", icon: "layers" },
  { id: "projects", code: "04", icon: "cube" },
  { id: "services", code: "05", icon: "rings" },
  { id: "contact", code: "06", icon: "contact" },
] as const;

export type NavItemId = (typeof navItems)[number]["id"];

export const navIconSources = {
  overview: "/card_imgs/icons/1.jpeg",
  aiSystems: "/card_imgs/icons/5.jpeg",
  webArchitecture: "/card_imgs/icons/2.jpeg",
  projects: "/card_imgs/icons/3.jpeg",
  services: "/card_imgs/icons/4.jpeg",
  contact: "/card_imgs/icons/8.jpeg",
} satisfies Record<NavItemId, string>;

const benefitIconSources = {
  bolt: "/card_imgs/icons/6.jpeg",
  sync: "/card_imgs/icons/7.jpeg",
  growth: "/card_imgs/icons/8.jpeg",
} as const;

function getBenefitIconSource(icon: string) {
  return (
    benefitIconSources[icon as keyof typeof benefitIconSources] ??
    benefitIconSources.bolt
  );
}

function getCounterConfig(value: string) {
  const plusMatch = value.match(/^(\d+)\+$/);

  if (plusMatch) {
    return {
      target: Number.parseInt(plusMatch[1], 10),
      suffix: "+",
    };
  }

  const slashMatch = value.match(/^(\d+)\/(\d+)$/);

  if (slashMatch) {
    return {
      target: Number.parseInt(slashMatch[1], 10),
      suffix: `/${slashMatch[2]}`,
    };
  }

  const numberMatch = value.match(/^(\d+)$/);

  if (numberMatch) {
    return {
      target: Number.parseInt(numberMatch[1], 10),
      suffix: "",
    };
  }

  return null;
}

function AnimatedStatValue({ value }: { value: string }) {
  const config = getCounterConfig(value);

  if (!config) {
    return <>{value}</>;
  }

  return (
    <AnimatedCounterValue
      key={value}
      target={config.target}
      suffix={config.suffix}
    />
  );
}

function AnimatedCounterValue({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const duration = 1250;
    const startTime = Date.now();

    const intervalId = window.setInterval(() => {
      const progress = Math.min((Date.now() - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;

      setCurrentValue(Math.round(target * easedProgress));

      if (progress >= 1) {
        window.clearInterval(intervalId);
      }
    }, 16);

    return () => window.clearInterval(intervalId);
  }, [target]);

  return (
    <>
      <span className="system-nav-stat-counter">{currentValue}</span>
      <span className="system-nav-stat-suffix">{suffix}</span>
    </>
  );
}

export const moduleCopy: Record<
  Language,
  Record<
    NavItemId,
    {
      title: string;
      eyebrow: string;
      subtitle: string;
      description: string;
      cards: Array<{ title: string; text: string }>;
      metrics: Array<{ label: string; value: string }>;
      modelTitle: string;
      modelMeta: string;
      action: string;
    }
  >
> = {
  en: {
    overview: {
      title: "Overview",
      eyebrow: "Home > Overview",
      subtitle: "A compact command layer for immersive digital products.",
      description:
        "The overview module connects strategy, interface, motion, and production into one readable system. It keeps the experience coherent while the visual scene stays alive around it.",
      cards: [
        { title: "Brand Signal", text: "Clear first-screen identity with an interactive product surface." },
        { title: "Scene Logic", text: "3D layers, camera movement, and UI states synchronized together." },
        { title: "Delivery Map", text: "Reusable components prepared for fast iteration and expansion." },
      ],
      metrics: [
        { label: "Readiness", value: "94%" },
        { label: "Modules", value: "06" },
        { label: "Signal", value: "Live" },
        { label: "Sync", value: "99.9%" },
      ],
      modelTitle: "Core System",
      modelMeta: "Unified visual architecture",
      action: "Explore Overview",
    },
    aiSystems: {
      title: "AI Systems",
      eyebrow: "Home > AI Systems",
      subtitle: "Adaptive intelligence for business interfaces and custom digital systems.",
      description:
        "AI Systems orchestrates intelligent workflows, contextual decisioning, and continuous learning to power adaptive experiences across your digital infrastructure.",
      cards: [
        { title: "Automation", text: "Streamline repetitive tasks with intelligent automation pipelines." },
        { title: "Decision Layer", text: "Context-aware logic for complex product and business flows." },
        { title: "Realtime Insights", text: "Live analytics and anomaly detection with instant feedback loops." },
      ],
      metrics: [
        { label: "Latency", value: "12ms" },
        { label: "Response", value: "98.7%" },
        { label: "Sync", value: "99.9%" },
        { label: "Nodes", value: "24" },
      ],
      modelTitle: "Core Model",
      modelMeta: "v3.2.1 / last trained 2h ago",
      action: "Explore System",
    },
    webArchitecture: {
      title: "Web Architecture",
      eyebrow: "Home > Web Architecture",
      subtitle: "Fast, scalable structure for immersive websites and product interfaces.",
      description:
        "Architecture aligns rendering, routing, content, and visual systems so the project can grow without losing performance or clarity.",
      cards: [
        { title: "Performance", text: "Lean frontend structure with clear render boundaries." },
        { title: "Scalability", text: "Components and data surfaces prepared for future sections." },
        { title: "Reliability", text: "Stable layouts, predictable states, and clean module ownership." },
      ],
      metrics: [
        { label: "Budget", value: "Light" },
        { label: "Render", value: "GPU" },
        { label: "Pages", value: "04" },
        { label: "Scale", value: "Ready" },
      ],
      modelTitle: "Render Stack",
      modelMeta: "Next.js / R3F / component pipeline",
      action: "Inspect Stack",
    },
    projects: {
      title: "Projects",
      eyebrow: "Home > Projects",
      subtitle: "Selected builds shaped around motion, 3D scenes, and product clarity.",
      description:
        "The projects module presents production-ready work patterns: landing systems, 3D interfaces, dashboards, and AI-connected experiences.",
      cards: [
        { title: "Immersive Sites", text: "Hero scenes and interactive product storytelling." },
        { title: "Dashboards", text: "Dense operational views with cinematic but usable UI." },
        { title: "AI Interfaces", text: "Contextual tools connected to intelligent workflows." },
      ],
      metrics: [
        { label: "Cases", value: "18" },
        { label: "3D", value: "07" },
        { label: "Motion", value: "42" },
        { label: "Live", value: "12" },
      ],
      modelTitle: "Project Matrix",
      modelMeta: "Portfolio modules mapped by capability",
      action: "View Projects",
    },
    services: {
      title: "Services",
      eyebrow: "Home > Services",
      subtitle: "Design, development, 3D, motion, and AI integration in one workflow.",
      description:
        "Services are organized as modular production tracks, so each project can combine visual design, engineering, automation, and launch support.",
      cards: [
        { title: "Interface Design", text: "Design systems, layouts, and responsive interaction states." },
        { title: "3D Frontend", text: "R3F scenes, models, particles, and cinematic motion." },
        { title: "AI Integration", text: "Assistants, automations, and data-connected experiences." },
      ],
      metrics: [
        { label: "Tracks", value: "05" },
        { label: "Cycles", value: "2-6w" },
        { label: "Support", value: "24/7" },
        { label: "Mode", value: "Agile" },
      ],
      modelTitle: "Service Engine",
      modelMeta: "From prototype to production launch",
      action: "Open Services",
    },
    contact: {
      title: "Contact",
      eyebrow: "Home > Contact",
      subtitle: "Start a project, request an audit, or discuss a custom digital system.",
      description:
        "The contact module is a direct link for new builds, redesigns, technical consulting, and AI-enhanced interface work.",
      cards: [
        { title: "Project Brief", text: "Share goals, timeline, references, and constraints." },
        { title: "Technical Audit", text: "Review performance, UX, architecture, and conversion paths." },
        { title: "Partnership", text: "Plan continuous design and engineering support." },
      ],
      metrics: [
        { label: "Reply", value: "<24h" },
        { label: "Slots", value: "03" },
        { label: "Region", value: "Global" },
        { label: "Link", value: "Open" },
      ],
      modelTitle: "Contact Channel",
      modelMeta: "Secure request intake and discovery flow",
      action: "Start Contact",
    },
  },
  ru: {
    overview: {
      title: "Обзор",
      eyebrow: "Главная > Обзор",
      subtitle: "Компактный командный слой для иммерсивных цифровых продуктов.",
      description:
        "Модуль обзора соединяет стратегию, интерфейс, motion и разработку в единую понятную систему. Он держит опыт цельным, пока визуальная сцена живет вокруг.",
      cards: [
        { title: "Сигнал бренда", text: "Четкая айдентика первого экрана и интерактивная продуктовая поверхность." },
        { title: "Логика сцены", text: "3D-слои, движение камеры и UI-состояния синхронизированы между собой." },
        { title: "Карта сборки", text: "Переиспользуемые компоненты готовы к быстрым итерациям." },
      ],
      metrics: [
        { label: "Готовность", value: "94%" },
        { label: "Модули", value: "06" },
        { label: "Сигнал", value: "Live" },
        { label: "Синхр.", value: "99.9%" },
      ],
      modelTitle: "Core System",
      modelMeta: "Единая визуальная архитектура",
      action: "Открыть обзор",
    },
    aiSystems: {
      title: "AI-системы",
      eyebrow: "Главная > AI-системы",
      subtitle: "Адаптивный интеллект для бизнес-интерфейсов и кастомных цифровых систем.",
      description:
        "AI Systems управляет интеллектуальными workflow, контекстными решениями и непрерывным обучением для адаптивных цифровых продуктов.",
      cards: [
        { title: "Автоматизация", text: "Повторяющиеся задачи уходят в интеллектуальные пайплайны." },
        { title: "Decision Layer", text: "Контекстная логика для сложных продуктовых и бизнес-сценариев." },
        { title: "Realtime Insights", text: "Live-аналитика и обнаружение аномалий с быстрым feedback loop." },
      ],
      metrics: [
        { label: "Задержка", value: "12ms" },
        { label: "Ответ", value: "98.7%" },
        { label: "Синхр.", value: "99.9%" },
        { label: "Узлы", value: "24" },
      ],
      modelTitle: "Core Model",
      modelMeta: "v3.2.1 / обучение 2 часа назад",
      action: "Исследовать систему",
    },
    webArchitecture: {
      title: "Веб-архитектура",
      eyebrow: "Главная > Веб-архитектура",
      subtitle: "Быстрая и масштабируемая структура для сайтов и продуктовых интерфейсов.",
      description:
        "Архитектура связывает rendering, routing, контент и визуальные системы, чтобы проект рос без потери скорости и ясности.",
      cards: [
        { title: "Производительность", text: "Легкая frontend-структура с понятными границами рендера." },
        { title: "Масштаб", text: "Компоненты и data-секции готовы к новым разделам." },
        { title: "Надежность", text: "Стабильные layout-ы, предсказуемые состояния и чистые модули." },
      ],
      metrics: [
        { label: "Бюджет", value: "Light" },
        { label: "Рендер", value: "GPU" },
        { label: "Страницы", value: "04" },
        { label: "Рост", value: "Ready" },
      ],
      modelTitle: "Render Stack",
      modelMeta: "Next.js / R3F / component pipeline",
      action: "Изучить стек",
    },
    projects: {
      title: "Проекты",
      eyebrow: "Главная > Проекты",
      subtitle: "Избранные работы вокруг motion, 3D-сцен и продуктовой ясности.",
      description:
        "Модуль проектов показывает production-паттерны: лендинги, 3D-интерфейсы, dashboards и AI-connected experiences.",
      cards: [
        { title: "Immersive Sites", text: "Hero-сцены и интерактивный продуктовый сторителлинг." },
        { title: "Dashboards", text: "Плотные рабочие интерфейсы с кинематографичным UI." },
        { title: "AI Interfaces", text: "Контекстные инструменты, связанные с интеллектуальными workflow." },
      ],
      metrics: [
        { label: "Кейсы", value: "18" },
        { label: "3D", value: "07" },
        { label: "Motion", value: "42" },
        { label: "Live", value: "12" },
      ],
      modelTitle: "Project Matrix",
      modelMeta: "Портфолио-модули по компетенциям",
      action: "Смотреть проекты",
    },
    services: {
      title: "Услуги",
      eyebrow: "Главная > Услуги",
      subtitle: "Дизайн, разработка, 3D, motion и AI-интеграции в одном процессе.",
      description:
        "Услуги собраны как модульные production-треки: можно комбинировать дизайн, инженеринг, автоматизацию и запуск.",
      cards: [
        { title: "Interface Design", text: "Дизайн-системы, layout-ы и responsive interaction states." },
        { title: "3D Frontend", text: "R3F-сцены, модели, частицы и кинематографичный motion." },
        { title: "AI Integration", text: "Ассистенты, автоматизации и data-connected experiences." },
      ],
      metrics: [
        { label: "Треки", value: "05" },
        { label: "Циклы", value: "2-6w" },
        { label: "Поддержка", value: "24/7" },
        { label: "Режим", value: "Agile" },
      ],
      modelTitle: "Service Engine",
      modelMeta: "От прототипа до production launch",
      action: "Открыть услуги",
    },
    contact: {
      title: "Контакты",
      eyebrow: "Главная > Контакты",
      subtitle: "Запустить проект, запросить аудит или обсудить кастомную систему.",
      description:
        "Контактный модуль — прямой канал для новых сборок, редизайнов, технического консалтинга и AI-интерфейсов.",
      cards: [
        { title: "Project Brief", text: "Цели, сроки, референсы и ограничения проекта." },
        { title: "Technical Audit", text: "Проверка performance, UX, архитектуры и conversion paths." },
        { title: "Partnership", text: "План постоянной дизайн- и инженерной поддержки." },
      ],
      metrics: [
        { label: "Ответ", value: "<24h" },
        { label: "Слоты", value: "03" },
        { label: "Регион", value: "Global" },
        { label: "Связь", value: "Open" },
      ],
      modelTitle: "Contact Channel",
      modelMeta: "Безопасный intake и discovery flow",
      action: "Начать контакт",
    },
  },
};

const studioNavCopy: Record<
  Language,
  {
    ariaLabel: string;
    eyebrow: string;
    subtitle: string;
    description: string;
    servicesTitle: string;
    benefitsTitle: string;
    cta: string;
    footer: string;
    languageSwitchLabel: string;
    benefits: Array<{ icon: string; title: string }>;
    stats: Array<{ icon: string; value: string; label: string; text: string }>;
  }
> = {
  ru: {
    ariaLabel: "Навигация по услугам code-art",
    eyebrow: "Веб-студия полного цикла",
    subtitle: "Веб-студия полного цикла",
    description:
      "Создаём индивидуальные цифровые решения для бизнеса: сайты, веб-приложения, автоматизация и AI-инструменты.",
    servicesTitle: "Чем мы занимаемся",
    benefitsTitle: "Для бизнеса",
    cta: "Посмотреть решения",
    footer: "Надёжный партнёр для цифрового роста вашего бизнеса",
    languageSwitchLabel: "Переключить язык",
    benefits: [
      { icon: "bolt", title: "Упрощаем процессы" },
      { icon: "sync", title: "Автоматизируем рутину" },
      { icon: "growth", title: "Помогаем расти онлайн" },
    ],
    stats: [
      { icon: "folder", value: "120+", label: "Проектов", text: "успешно реализовано" },
      { icon: "stack", value: "48+", label: "Систем", text: "разработано" },
      { icon: "support", value: "24/7", label: "Поддержка", text: "всегда на связи" },
      { icon: "status", value: "Онлайн", label: "Статус:", text: "готовы к задачам" },
    ],
  },
  en: {
    ariaLabel: "code-art services navigation",
    eyebrow: "Full-cycle web studio",
    subtitle: "Full-cycle web studio",
    description:
      "We create custom digital solutions for business: websites, web apps, automation, and AI tools.",
    servicesTitle: "What we do",
    benefitsTitle: "For business",
    cta: "View solutions",
    footer: "A reliable partner for your digital growth",
    languageSwitchLabel: "Switch language",
    benefits: [
      { icon: "bolt", title: "Simplify processes" },
      { icon: "sync", title: "Automate routine" },
      { icon: "growth", title: "Help grow online" },
    ],
    stats: [
      { icon: "folder", value: "120+", label: "Projects", text: "successfully shipped" },
      { icon: "stack", value: "48+", label: "Systems", text: "developed" },
      { icon: "support", value: "24/7", label: "Support", text: "always connected" },
      { icon: "status", value: "Online", label: "Status:", text: "ready for tasks" },
    ],
  },
};

const studioServiceItems: Record<
  Language,
  Array<{
    id: NavItemId;
    icon: string;
    title: string;
    text: string;
  }>
> = {
  ru: [
    {
      id: "overview",
      icon: "globe",
      title: "Корпоративные сайты",
      text: "Сайты любой сложности под задачи бизнеса",
    },
    {
      id: "webArchitecture",
      icon: "stack",
      title: "Веб-приложения",
      text: "Сложные интерфейсы и масштабируемые системы",
    },
    {
      id: "projects",
      icon: "design",
      title: "UX/UI дизайн",
      text: "Удобные интерфейсы, которые работают на результат",
    },
    {
      id: "services",
      icon: "gear",
      title: "CRM / Автоматизация",
      text: "Оптимизация процессов и интеграция систем",
    },
    {
      id: "aiSystems",
      icon: "ai",
      title: "AI-интеграции",
      text: "Умные решения, чат-боты, анализ данных",
    },
    {
      id: "contact",
      icon: "support",
      title: "Поддержка и развитие",
      text: "Техническая поддержка и развитие проектов",
    },
  ],
  en: [
    {
      id: "overview",
      icon: "globe",
      title: "Corporate Websites",
      text: "Websites of any complexity for business goals",
    },
    {
      id: "webArchitecture",
      icon: "stack",
      title: "Web Applications",
      text: "Complex interfaces and scalable systems",
    },
    {
      id: "projects",
      icon: "design",
      title: "UX/UI Design",
      text: "Useful interfaces built for measurable results",
    },
    {
      id: "services",
      icon: "gear",
      title: "CRM / Automation",
      text: "Process optimization and system integration",
    },
    {
      id: "aiSystems",
      icon: "ai",
      title: "AI Integrations",
      text: "Smart tools, chatbots, and data analysis",
    },
    {
      id: "contact",
      icon: "support",
      title: "Support & Growth",
      text: "Technical support and product development",
    },
  ],
};

export function SystemNavCard({
  language,
  activeItem,
  onActiveItemChange,
  onNavItemSelect,
}: {
  language: Language;
  activeItem: NavItemId | null;
  onActiveItemChange: (item: NavItemId | null) => void;
  onNavItemSelect?: () => void;
}) {
  const copy = studioNavCopy[language];
  const services = studioServiceItems[language];
  const calculatorLabel =
    language === "ru" ? "Рассчитать стоимость проекта" : "Calculate project cost";
  const calculatorMeta =
    language === "ru"
      ? "Интерактивный калькулятор стоимости"
      : "Interactive project cost calculator";
  const servicesPageLabel =
    language === "ru" ? "Услуги Code Art" : "Code Art services";
  const servicesPageMeta =
    language === "ru"
      ? "Направления работы и форматы услуг"
      : "Service directions and work formats";
  const careerLabel =
    language === "ru" ? "Карьера в Code Art" : "Career at Code Art";
  const careerMeta =
    language === "ru" ? "Страница сотрудничества и вакансий" : "Careers and collaboration page";
  const worldMapLabel = language === "ru" ? "Открыть AI Map" : "Open AI Map";
  const worldMapMeta =
    language === "ru" ? "Интерактивная карта компаний" : "Interactive company map";
  const gameLabel = language === "ru" ? "Наша игра" : "Our game";
  const gameMeta =
    language === "ru" ? "Открыть game.codeart.kz" : "Open game.codeart.kz";
  const selectNavItem = (item: NavItemId) => {
    onActiveItemChange(item);
    onNavItemSelect?.();
    trackEvent("module_opened", { module: item, language });
  };

  return (
    <aside className="system-nav-card" aria-label={copy.ariaLabel}>
      <span className="system-nav-corner system-nav-corner-tl" />
      <span className="system-nav-corner system-nav-corner-tr" />
      <span className="system-nav-corner system-nav-corner-bl" />
      <span className="system-nav-corner system-nav-corner-br" />

      <div className="system-nav-brand">
        <span className="system-nav-logo-mark" aria-hidden="true">
          <Image
            className="system-nav-brand-logo"
            src="/logo/code_art_logo_flow_transparent.gif"
            alt=""
            width={160}
            height={160}
            unoptimized
            priority
          />
        </span>
        <div className="system-nav-brand-copy">
          <p className="system-nav-brand-name">code-art</p>
          <p className="system-nav-brand-subtitle">{copy.subtitle}</p>
        </div>
        <div
          className="system-nav-language"
          aria-label={copy.languageSwitchLabel}
        >
          {(["ru", "en"] as const).map((item) => (
            <Link
              key={item}
              href={item === "ru" ? "/" : "/en"}
              className={
                language === item
                  ? "system-nav-language-button is-active"
                  : "system-nav-language-button"
              }
              aria-current={language === item ? "page" : undefined}
              hrefLang={item}
              onClick={() =>
                trackEvent("language_switch", { from: language, to: item })
              }
            >
              {item.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>

      <p className="system-nav-intro">{copy.description}</p>

      <div className="system-nav-section-head">
        <span>{copy.servicesTitle}</span>
        <i aria-hidden="true" />
      </div>

      <nav className="system-nav-list" aria-label={copy.servicesTitle}>
        {services.map((item) => {
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              className={isActive ? "system-nav-item is-active" : "system-nav-item"}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => selectNavItem(item.id)}
            >
              <span className="system-nav-service-icon" aria-hidden="true">
                <Image
                  className="system-nav-service-image"
                  src={navIconSources[item.id]}
                  alt=""
                  width={96}
                  height={96}
                />
              </span>
              <span className="system-nav-item-copy">
                <span className="system-nav-label">{item.title}</span>
                <span className="system-nav-item-text">{item.text}</span>
              </span>
              <span className="system-nav-arrow" aria-hidden="true">
                &gt;
              </span>
            </button>
          );
        })}
      </nav>

      <section className="system-nav-benefits" aria-label={copy.benefitsTitle}>
        <p>{copy.benefitsTitle}</p>
        <div>
          {copy.benefits.map((benefit) => (
            <span key={benefit.title} className="system-nav-benefit">
              <Image
                className="system-nav-benefit-image"
                src={getBenefitIconSource(benefit.icon)}
                alt=""
                width={72}
                height={72}
                sizes="72px"
                aria-hidden="true"
              />
              <span>{benefit.title}</span>
            </span>
          ))}
        </div>
      </section>

      <section className="system-nav-stats" aria-label="code-art stats">
        {copy.stats.map((stat) => (
          <div key={stat.label} className="system-nav-stat">
            <i
              className={`system-nav-stat-icon system-nav-stat-icon-${stat.icon}`}
              aria-hidden="true"
            />
            <strong>
              <AnimatedStatValue value={stat.value} />
            </strong>
            <span>{stat.label}</span>
            <small>{stat.text}</small>
          </div>
        ))}
      </section>

      <a
        className="system-nav-action"
        href={getWhatsAppHref(language, copy.cta)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent("whatsapp_click", { location: "nav_main_cta", language })
        }
      >
        <span className="system-nav-action-mark" aria-hidden="true" />
        <strong>{copy.cta}</strong>
        <i aria-hidden="true">&gt;</i>
      </a>

      <Link
        className="system-nav-subaction system-nav-subaction-highlight"
        href="/calculator"
        onClick={() => {
          onNavItemSelect?.();
          trackEvent("nav_link_click", { target: "calculator", language });
        }}
      >
        <span>{calculatorLabel}</span>
        <small>{calculatorMeta}</small>
        <i aria-hidden="true">&gt;</i>
      </Link>

      <Link
        className="system-nav-subaction"
        href="/services"
        onClick={() => {
          onNavItemSelect?.();
          trackEvent("nav_link_click", { target: "services", language });
        }}
      >
        <span>{servicesPageLabel}</span>
        <small>{servicesPageMeta}</small>
        <i aria-hidden="true">&gt;</i>
      </Link>

      <Link
        className="system-nav-subaction"
        href="/career"
        onClick={() => {
          onNavItemSelect?.();
          trackEvent("nav_link_click", { target: "career", language });
        }}
      >
        <span>{careerLabel}</span>
        <small>{careerMeta}</small>
        <i aria-hidden="true">&gt;</i>
      </Link>

      <Link
        className="system-nav-subaction"
        href="/world"
        onClick={() => {
          onNavItemSelect?.();
          trackEvent("nav_link_click", { target: "world", language });
        }}
      >
        <span>{worldMapLabel}</span>
        <small>{worldMapMeta}</small>
        <i aria-hidden="true">&gt;</i>
      </Link>

      <a
        className="system-nav-subaction"
        href="https://game.codeart.kz/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          onNavItemSelect?.();
          trackEvent("nav_link_click", { target: "game", language });
        }}
      >
        <span>{gameLabel}</span>
        <small>{gameMeta}</small>
        <i aria-hidden="true">&gt;</i>
      </a>

      <div className="system-nav-footer">
        <span>{copy.footer}</span>
        <i aria-hidden="true" />
      </div>
    </aside>
  );
}
