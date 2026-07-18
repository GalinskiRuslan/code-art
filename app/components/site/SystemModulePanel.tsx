"use client";

import Image from "next/image";
import { type CSSProperties } from "react";

import type { Language } from "../../lib/i18n";
import { getWhatsAppHref } from "../../lib/whatsapp";
import { moduleCopy, navIconSources, type NavItemId } from "./SystemNavCard";

const corporateSitesCopy = {
  ru: {
    solution: "Решение 01",
    title: "Корпоративные сайты",
    subtitle: "Имиджевые, презентационные и многостраничные сайты для бизнеса",
    description:
      "Мы создаём корпоративные сайты, которые точно и понятно представляют ваш бизнес в интернете, формируют доверие, демонстрируют услуги и продукцию, помогают привлекать клиентов и развивать компанию.",
    includesTitle: "Что входит",
    audienceTitle: "Для кого",
    resultTitle: "Что получает бизнес",
    includes: [
      "Анализ бизнеса и структуры",
      "UX/UI дизайн",
      "Адаптивная вёрстка",
      "CMS / админ-панель",
      "Базовая контентная и техническая база",
      "Интеграция заявок и аналитики",
    ],
    audience: [
      "Производственные компании",
      "Сервисный бизнес",
      "Девелоперы и B2B",
      "Медицинские и образовательные проекты",
    ],
    results: [
      "Повышение доверия к бренду",
      "Понятную презентацию услуг",
      "Удобный путь клиента к заявке",
      "Готовность к запуску и развитию",
    ],
    stagesTitle: "Этапы",
    stages: ["Бриф", "Прототип", "Дизайн", "Разработка", "Запуск"],
    metrics: [
      { label: "Срок:", value: "2-6", text: "недель", icon: "calendar" },
      { label: "Формат:", value: "Индивидуальная", text: "разработка", icon: "code" },
      { label: "Поддержка:", value: "24/7", text: "всегда на связи", icon: "support" },
      { label: "Статус:", value: "Онлайн", text: "готовы к задачам", icon: "status" },
    ],
    primaryAction: "Обсудить проект",
    secondaryAction: "Смотреть кейсы",
    footer: "Надёжный партнёр для цифрового роста вашего бизнеса",
    closeLabel: "Закрыть карточку",
  },
  en: {
    solution: "Solution 01",
    title: "Corporate Websites",
    subtitle: "Brand, presentation, and multi-page websites for business",
    description:
      "We create corporate websites that present your business clearly online, build trust, showcase services and products, and help attract clients while your company grows.",
    includesTitle: "What is included",
    audienceTitle: "Who it fits",
    resultTitle: "Business outcome",
    includes: [
      "Business and structure analysis",
      "UX/UI design",
      "Responsive frontend",
      "CMS / admin panel",
      "Content and technical foundation",
      "Lead and analytics integration",
    ],
    audience: [
      "Manufacturing companies",
      "Service businesses",
      "Developers and B2B",
      "Medical and education projects",
    ],
    results: [
      "Higher brand trust",
      "Clear service presentation",
      "Simple path to a request",
      "Ready for launch and growth",
    ],
    stagesTitle: "Stages",
    stages: ["Brief", "Prototype", "Design", "Development", "Launch"],
    metrics: [
      { label: "Timeline:", value: "2-6", text: "weeks", icon: "calendar" },
      { label: "Format:", value: "Custom", text: "development", icon: "code" },
      { label: "Support:", value: "24/7", text: "always online", icon: "support" },
      { label: "Status:", value: "Online", text: "ready for tasks", icon: "status" },
    ],
    primaryAction: "Discuss Project",
    secondaryAction: "View Cases",
    footer: "A reliable partner for your business digital growth",
    closeLabel: "Close card",
  },
} satisfies Record<
  Language,
  {
    solution: string;
    title: string;
    subtitle: string;
    description: string;
    includesTitle: string;
    audienceTitle: string;
    resultTitle: string;
    includes: string[];
    audience: string[];
    results: string[];
    stagesTitle: string;
    stages: string[];
    metrics: Array<{ label: string; value: string; text: string; icon: string }>;
    primaryAction: string;
    secondaryAction: string;
    footer: string;
    closeLabel: string;
  }
>;

const webApplicationsCopy = {
  ru: {
    solution: "Решение 02",
    title: "Веб-приложения",
    subtitle: "Сервисы, личные кабинеты, CRM и внутренние системы для бизнеса",
    description:
      "Мы разрабатываем веб-приложения, которые автоматизируют процессы, упрощают работу сотрудников и клиентов, помогают управлять данными, заказами, заявками и аналитикой в одном цифровом пространстве.",
    includesTitle: "Что входит",
    audienceTitle: "Для кого",
    resultTitle: "Что получает бизнес",
    includes: [
      "Проектирование логики и структуры",
      "UX/UI дизайн интерфейсов",
      "Личный кабинет / роли доступа",
      "CRM / ERP / учётные модули",
      "API и интеграции",
      "Аналитика и уведомления",
    ],
    audience: [
      "Производственные компании",
      "Сервисный и операционный бизнес",
      "Онлайн-сервисы и стартапы",
      "B2B платформы и кабинеты партнёров",
      "Внутренние системы для команд",
    ],
    results: [
      "Автоматизацию процессов",
      "Снижение ручной нагрузки",
      "Единое рабочее пространство",
      "Контроль заявок, клиентов и задач",
      "Масштабируемую цифровую систему",
    ],
    stagesTitle: "Этапы",
    stages: ["Бриф", "Аналитика", "Прототип", "Разработка", "Запуск"],
    metrics: [
      { label: "Срок:", value: "4-12", text: "недель", icon: "calendar" },
      { label: "Формат:", value: "Индивидуальная", text: "разработка", icon: "code" },
      { label: "Поддержка:", value: "24/7", text: "всегда на связи", icon: "support" },
      { label: "Статус:", value: "Онлайн", text: "готовы к задачам", icon: "status" },
    ],
    primaryAction: "Обсудить проект",
    secondaryAction: "Смотреть кейсы",
    footer: "Надёжный партнёр для цифрового роста вашего бизнеса",
    closeLabel: "Закрыть карточку",
  },
  en: {
    solution: "Solution 02",
    title: "Web Applications",
    subtitle: "Services, accounts, CRM, and internal systems for business",
    description:
      "We build web applications that automate workflows, simplify work for teams and clients, and help manage data, orders, requests, and analytics in one digital workspace.",
    includesTitle: "What is included",
    audienceTitle: "Who it fits",
    resultTitle: "Business outcome",
    includes: [
      "Logic and structure planning",
      "UX/UI interface design",
      "User accounts / access roles",
      "CRM / ERP / accounting modules",
      "API and integrations",
      "Analytics and notifications",
    ],
    audience: [
      "Manufacturing companies",
      "Service and operations teams",
      "Online services and startups",
      "B2B platforms and partner portals",
      "Internal systems for teams",
    ],
    results: [
      "Process automation",
      "Lower manual workload",
      "Unified workspace",
      "Control over requests, clients, and tasks",
      "Scalable digital system",
    ],
    stagesTitle: "Stages",
    stages: ["Brief", "Analytics", "Prototype", "Development", "Launch"],
    metrics: [
      { label: "Timeline:", value: "4-12", text: "weeks", icon: "calendar" },
      { label: "Format:", value: "Custom", text: "development", icon: "code" },
      { label: "Support:", value: "24/7", text: "always online", icon: "support" },
      { label: "Status:", value: "Online", text: "ready for tasks", icon: "status" },
    ],
    primaryAction: "Discuss Project",
    secondaryAction: "View Cases",
    footer: "A reliable partner for your business digital growth",
    closeLabel: "Close card",
  },
} satisfies typeof corporateSitesCopy;

const uiUxDesignCopy = {
  ru: {
    eyebrow: "code-art • UI/UX studio",
    title: "UI/UX Дизайн",
    subtitle:
      "Создаём интуитивные и красивые интерфейсы, которые помогают бизнесу расти",
    description:
      "Мы проектируем удобные, логичные и эстетичные цифровые продукты, которые решают задачи пользователей и приносят измеримый результат бизнесу.",
    advantagesTitle: "Ваши преимущества",
    workflowTitle: "Как мы работаем",
    designSystemTitle: "Дизайн-система",
    journeyTitle: "Путь пользователя",
    analyticsTitle: "Аналитика и улучшения UX",
    footer: "Интерфейсы, которые работают на бизнес",
    closeLabel: "Закрыть карточку",
    ctaTitle: "Обсудим ваш проект?",
    ctaText:
      "Создадим интерфейс, который влюбляет пользователей и увеличивает прибыль.",
    primaryAction: "Обсудить проект",
    secondaryAction: "Получить концепцию",
    principles: [
      {
        icon: "target",
        title: "Фокус на цели",
        text: "Проектируем интерфейсы, которые ведут к результату",
      },
      {
        icon: "smile",
        title: "Удобство прежде всего",
        text: "Понятные сценарии и простое взаимодействие",
      },
      {
        icon: "gem",
        title: "Премиальный дизайн",
        text: "Эстетика, внимание к деталям и сильный визуал",
      },
      {
        icon: "rocket",
        title: "Рост бизнеса",
        text: "Интерфейсы, которые увеличивают конверсию",
      },
    ],
    advantages: [
      {
        icon: "gear",
        title: "Удобно",
        text: "Интерфейсы, которые легко использовать",
      },
      {
        icon: "spark",
        title: "Современно",
        text: "Актуальный дизайн и тренды",
      },
      {
        icon: "logic",
        title: "Логично",
        text: "Понятные сценарии и структура",
      },
      {
        icon: "arrow",
        title: "Под задачи бизнеса",
        text: "Фокус на цели и результат",
      },
    ],
    workflow: [
      ["1. Исследование", "Анализ аудитории, рынка и задач пользователей"],
      ["2. Прототипирование", "Wireframes, user flow, сценарии взаимодействия"],
      ["3. Дизайн", "Интерфейсы для web и mobile в фирменном стиле"],
      ["4. Дизайн-система", "Компоненты, типографика, цвета, гайдлайны"],
      ["5. Тестирование", "Проверка удобства и доработка решений"],
      ["6. Передача", "Файлы, логика и поддержка после запуска"],
    ],
    journey: ["Главная", "Каталог", "Карточка товара", "Корзина", "Оформление", "Успех"],
    analytics: [
      ["-28%", "Время на задачу после редизайна"],
      ["+34%", "Конверсия после редизайна"],
      ["-41%", "Ошибки пользователей снижены"],
    ],
    improvements: [
      ["A/B тестирование", "Проверяем гипотезы и находим лучшее решение"],
      ["Юзабилити-тесты", "Тестируем с реальными пользователями на каждом этапе"],
      ["Данные и метрики", "Решения на основе данных, а не предположений"],
      ["Постоянное улучшение", "Итеративно улучшаем интерфейсы и растим показатели"],
    ],
  },
  en: {
    eyebrow: "code-art • UI/UX studio",
    title: "UI/UX Design",
    subtitle:
      "We create intuitive and beautiful interfaces that help businesses grow",
    description:
      "We design usable, logical, and aesthetic digital products that solve user tasks and bring measurable business results.",
    advantagesTitle: "Your advantages",
    workflowTitle: "How we work",
    designSystemTitle: "Design system",
    journeyTitle: "User journey",
    analyticsTitle: "UX analytics and improvements",
    footer: "Interfaces that work for business",
    closeLabel: "Close card",
    ctaTitle: "Discuss your project?",
    ctaText:
      "We will create an interface that users love and that increases profit.",
    primaryAction: "Discuss Project",
    secondaryAction: "Get Concept",
    principles: [
      {
        icon: "target",
        title: "Goal focus",
        text: "Interfaces designed to lead users toward results",
      },
      {
        icon: "smile",
        title: "Usability first",
        text: "Clear scenarios and simple interaction",
      },
      {
        icon: "gem",
        title: "Premium design",
        text: "Aesthetics, attention to detail, and strong visuals",
      },
      {
        icon: "rocket",
        title: "Business growth",
        text: "Interfaces that increase conversion",
      },
    ],
    advantages: [
      {
        icon: "gear",
        title: "Usable",
        text: "Interfaces that are easy to use",
      },
      {
        icon: "spark",
        title: "Modern",
        text: "Current design and trends",
      },
      {
        icon: "logic",
        title: "Logical",
        text: "Clear scenarios and structure",
      },
      {
        icon: "arrow",
        title: "Business-fit",
        text: "Focused on goals and results",
      },
    ],
    workflow: [
      ["1. Research", "Audience, market, and user task analysis"],
      ["2. Prototyping", "Wireframes, user flow, interaction scenarios"],
      ["3. Design", "Web and mobile interfaces in brand style"],
      ["4. Design system", "Components, typography, colors, guidelines"],
      ["5. Testing", "Usability checks and solution refinement"],
      ["6. Handoff", "Files, logic, and post-launch support"],
    ],
    journey: ["Home", "Catalog", "Product", "Cart", "Checkout", "Success"],
    analytics: [
      ["-28%", "Task time after redesign"],
      ["+34%", "Conversion after redesign"],
      ["-41%", "User errors reduced"],
    ],
    improvements: [
      ["A/B testing", "We test hypotheses and find stronger solutions"],
      ["Usability tests", "We test with real users at each stage"],
      ["Data and metrics", "Decisions based on data, not assumptions"],
      ["Continuous improvement", "We iterate and grow the product metrics"],
    ],
  },
} satisfies Record<
  Language,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    advantagesTitle: string;
    workflowTitle: string;
    designSystemTitle: string;
    journeyTitle: string;
    analyticsTitle: string;
    footer: string;
    closeLabel: string;
    ctaTitle: string;
    ctaText: string;
    primaryAction: string;
    secondaryAction: string;
    principles: Array<{ icon: string; title: string; text: string }>;
    advantages: Array<{ icon: string; title: string; text: string }>;
    workflow: Array<[string, string]>;
    journey: string[];
    analytics: Array<[string, string]>;
    improvements: Array<[string, string]>;
  }
>;

const uiUxIconSources = {
  principles: {
    target: "/ui/icons/1.jpeg",
    smile: "/ui/icons/2.jpeg",
    gem: "/ui/icons/3-removebg-preview.png",
    rocket: "/ui/icons/4-removebg-preview.png",
  },
  advantages: {
    gear: "/ui/icons/5-removebg-preview.png",
    spark: "/ui/icons/13-removebg-preview.png",
    logic: "/ui/icons/17-removebg-preview.png",
    arrow: "/ui/icons/8-removebg-preview.png",
  },
  workflow: [
    "/ui/icons/1.jpeg",
    "/ui/icons/9.jpeg",
    "/ui/icons/14-removebg-preview.png",
    "/ui/icons/17-removebg-preview.png",
    "/ui/icons/15-removebg-preview.png",
    "/ui/icons/18-removebg-preview.png",
  ],
  journey: [
    "/ui/icons/сделай_в_хорошем_качестве_202605082205-removebg-preview.png",
    "/ui/icons/17-removebg-preview.png",
    "/ui/icons/20-removebg-preview.png",
    "/ui/icons/19-removebg-preview.png",
    "/ui/icons/18-removebg-preview.png",
    "/ui/icons/6-removebg-preview.png",
  ],
  improvements: [
    "/ui/icons/10.jpeg",
    "/ui/icons/15-removebg-preview.png",
    "/ui/icons/11-removebg-preview.png",
    "/ui/icons/7-removebg-preview.png",
  ],
} as const;

const aiIntegrationCopy = {
  ru: {
    eyebrow: "code-art • AI / интеграция",
    title: "AI-интеграция",
    accent: "AI",
    lead:
      "Подключаем искусственный интеллект к CRM и бизнес-процессам. Автоматизируем рутину, подсказываем решения и ускоряем работу команды.",
    description:
      "Интегрируем AI-инструменты в продажи, поддержку и аналитику: от умных подсказок менеджеру до прогнозов, суммаризации диалогов и автоматического запуска действий.",
    cta: "Обсудить AI-интеграцию",
    capabilitiesTitle: "Что умеет AI",
    dataTitle: "Источники данных",
    resultTitle: "Результат",
    benefits: [
      ["Умные подсказки", "Рекомендации менеджеру в реальном времени", "brain"],
      ["Суммаризация", "Краткие итоги звонков, писем и чатов", "summary"],
      ["Прогнозирование", "Оценка вероятности сделки и рисков", "forecast"],
      ["Автодействия", "AI запускает сценарии и задачи", "action"],
    ],
    featureCards: [
      ["lead", "Умный скоринг лидов", "Lead score", "92%", "lead"],
      ["assistant", "AI-ассистент", "Отвечает, подсказывает, помогает продавать", "", "assistant"],
      ["transcript", "Транскрипция звонков", "Речь в текст с точностью 98%", "", "wave"],
      ["summary", "Генерация саммари", "AI summary готов за секунды", "", "document"],
      ["analytics", "Прогнозная аналитика", "Прогноз сделки", "76%", "chart"],
      ["tasks", "Автоподсказки задач", "Предлагает задачи по контексту", "", "check"],
      ["sentiment", "Анализ настроения", "Настроение клиента", "Положительное", "smile"],
      ["segments", "Умная сегментация", "Выделено 6 сегментов с высоким потенциалом", "", "users"],
      ["recommend", "Рекомендации действий", "Следующее лучшее действие для сделки", "", "arrow"],
    ],
    chips: [
      ["Lead score", "92%"],
      ["Следующее действие", "↗"],
      ["Сумма разговора", "12:45"],
      ["AI summary", "Готово"],
      ["Автозадача", "создана"],
    ],
    capabilities: ["распознаёт", "анализирует", "предсказывает", "рекомендует"],
    sources: ["CRM", "Почта", "Звонки", "Чаты", "Сайт"],
    results: [
      ["+42%", "скорость реакции"],
      ["-28%", "рутина"],
      ["+19%", "конверсия"],
    ],
    closeLabel: "Закрыть карточку",
  },
  en: {
    eyebrow: "code-art • AI / integration",
    title: "AI integration",
    accent: "AI",
    lead:
      "We connect artificial intelligence to CRM and business workflows. Automate routine, suggest decisions, and accelerate the team.",
    description:
      "We integrate AI tools into sales, support, and analytics: from smart manager prompts to forecasts, dialogue summaries, and automated actions.",
    cta: "Discuss AI integration",
    capabilitiesTitle: "What AI can do",
    dataTitle: "Data sources",
    resultTitle: "Result",
    benefits: [
      ["Smart prompts", "Real-time recommendations for managers", "brain"],
      ["Summaries", "Short outcomes from calls, emails, and chats", "summary"],
      ["Forecasting", "Deal probability and risk estimation", "forecast"],
      ["Auto actions", "AI launches scenarios and tasks", "action"],
    ],
    featureCards: [
      ["lead", "Lead scoring", "Lead score", "92%", "lead"],
      ["assistant", "AI assistant", "Answers, suggests, helps sell", "", "assistant"],
      ["transcript", "Call transcription", "Speech to text with 98% accuracy", "", "wave"],
      ["summary", "Summary generation", "AI summary ready in seconds", "", "document"],
      ["analytics", "Predictive analytics", "Deal forecast", "76%", "chart"],
      ["tasks", "Task prompts", "Suggests tasks from context", "", "check"],
      ["sentiment", "Sentiment analysis", "Client mood", "Positive", "smile"],
      ["segments", "Smart segmentation", "6 high-potential segments found", "", "users"],
      ["recommend", "Action recommendations", "Next best action for the deal", "", "arrow"],
    ],
    chips: [
      ["Lead score", "92%"],
      ["Next action", "↗"],
      ["Conversation", "12:45"],
      ["AI summary", "Ready"],
      ["Auto task", "created"],
    ],
    capabilities: ["recognizes", "analyzes", "predicts", "recommends"],
    sources: ["CRM", "Email", "Calls", "Chats", "Site"],
    results: [
      ["+42%", "response speed"],
      ["-28%", "routine"],
      ["+19%", "conversion"],
    ],
    closeLabel: "Close card",
  },
} satisfies Record<
  Language,
  {
    eyebrow: string;
    title: string;
    accent: string;
    lead: string;
    description: string;
    cta: string;
    capabilitiesTitle: string;
    dataTitle: string;
    resultTitle: string;
    benefits: Array<[string, string, string]>;
    featureCards: Array<[string, string, string, string, string]>;
    chips: Array<[string, string]>;
    capabilities: string[];
    sources: string[];
    results: Array<[string, string]>;
    closeLabel: string;
  }
>;

const aiIconSources = {
  brain: "/ai/BRAIN.png",
  summary: "/ai/сделай_в_хорошем_качестве_202605151906%20(2).jpeg",
  forecast: "/ai/сделай_в_хорошем_качестве_202605151906%20(3).jpeg",
  action: "/ai/сделай_в_хорошем_качестве_202605151907-removebg-preview.png",
  lead: "/ai/сделай_в_хорошем_качестве_202605160010-removebg-preview.png",
  assistant: "/ai/сделай_в_хорошем_качестве_202605152259-removebg-preview.png",
  wave: "/ai/сделай_в_хорошем_качестве_202605152259__1_-removebg-preview.png",
  document: "/ai/сделай_в_хорошем_качестве_202605151906%20(2).jpeg",
  chart: "/ai/сделай_в_хорошем_качестве_202605160025-removebg-preview.png",
  check: "/ai/сделай_в_хорошем_качестве_202605160037-removebg-preview.png",
  smile: "/ai/сделай_в_хорошем_качестве_202605160043-removebg-preview.png",
  users: "/ai/сделай_в_хорошем_качестве_202605160048-removebg-preview.png",
  arrow: "/ai/сделай_в_хорошем_качестве_202605160010__1_-removebg-preview.png",
  crm: "/ai/сделай_в_хорошем_качестве_202605162322-removebg-preview.png",
  email: "/ai/сделай_в_хорошем_качестве_202605162359-removebg-preview.png",
  calls: "/ai/сделай_в_хорошем_качестве_202605160010-removebg-preview.png",
  chats: "/ai/сделай_в_хорошем_качестве_202605170148-removebg-preview.png",
  site: "/ai/сделай_в_хорошем_качестве_202605160105-removebg-preview.png",
} as const;

const aiSourceIconKeys = ["crm", "email", "calls", "chats", "site"] as const;

const supportDevelopmentCopy = {
  ru: {
    eyebrow: "code-art · support / development",
    title: "Поддержка и развитие",
    lead:
      "Поддерживаем продукт, быстро решаем задачи и постоянно развиваем систему.",
    description:
      "Наша команда сопровождает продукт на всех этапах: мониторим систему 24/7, оперативно решаем инциденты, устраняем ошибки, внедряем улучшения и выпускаем новые версии.",
    benefits: [
      ["Мониторинг 24/7", "Постоянный контроль и оповещения", "shield"],
      ["Быстрое реагирование", "Минимальное время на решение", "lightning"],
      ["Плановые улучшения", "Регулярное развитие и оптимизация", "growth"],
      ["Масштабирование", "Рост производительности без потери качества", "cubes"],
    ],
    contactsTitle: "Каналы поддержки",
    contacts: [
      ["Email", "support@code-art.ru", "mail"],
      ["Telegram", "@code_art_support", "telegram"],
      ["WhatsApp", "+7 (999) 123-45-67", "phone"],
      ["Helpdesk", "support.code-art.ru", "headset"],
    ],
    primaryAction: "Обсудить поддержку",
    secondaryAction: "Получить план развития",
    requestsTitle: "Новые заявки",
    requestsToday: "за сегодня",
    requestsRows: [
      ["Критические", "2"],
      ["Высокий", "6"],
      ["Средний", "10"],
      ["Низкий", "5"],
    ],
    responseTitle: "SLA / время ответа",
    responseValue: "14 мин",
    responseText: "средний ответ",
    fixedTitle: "Исправлено за месяц",
    fixedValue: "137",
    fixedText: "задач",
    healthTitle: "Системное здоровье",
    healthValue: "Отлично",
    healthRows: [
      ["Сервисы", "100%"],
      ["База данных", "100%"],
      ["API", "100%"],
      ["Инфраструктура", "100%"],
    ],
    releaseTitle: "Релиз-пайплайн",
    releaseSteps: ["Код", "Тесты", "Сборка", "Стенд", "Продакшн"],
    roadmapTitle: "Roadmap",
    roadmap: [
      ["Q2 2024", "Модуль аналитики 2.0", "60%"],
      ["Q3 2024", "Мобильное приложение", "30%"],
      ["Q3 2024", "Интеграции и API", "20%"],
      ["Q4 2024", "AI-рекомендации", "0%"],
    ],
    uptimeTitle: "Uptime",
    uptimeValue: "99.9%",
    uptimeText: "за последние 30 дней",
    backlogTitle: "Backlog",
    backlogRows: [
      ["Критические", "8"],
      ["Высокий", "15"],
      ["Средний", "23"],
      ["Низкий", "34"],
    ],
    processTitle: "Наш процесс",
    process: [
      ["Мониторинг", "Отслеживаем систему и собираем метрики", "monitor"],
      ["Анализ", "Анализируем причину и влияние", "analysis"],
      ["Приоритизация", "Оцениваем важность и планируем", "target"],
      ["Исправление", "Разрабатываем и тестируем решение", "wrench"],
      ["Релиз", "Выпускаем безопасно и поэтапно", "rocket"],
      ["Улучшение", "Собираем обратную связь и улучшаем продукт", "improve"],
    ],
    metricsTitle: "Результаты, которыми гордимся",
    metrics: [
      ["+38%", "Стабильность системы к прошлому году", "metricStability"],
      ["14 мин", "Средний ответ службы поддержки", "metricResponse"],
      ["99.9%", "Uptime за последние 30 дней", "metricUptime"],
      ["-27%", "Критических ошибок к прошлому кварталу", "metricErrors"],
      ["480+", "Улучшений и доработок выпущено за год", "metricGrowth"],
      ["98.7%", "SLA выполнено по всем заявкам", "metricScore"],
    ],
    closeLabel: "Закрыть карточку",
  },
  en: {
    eyebrow: "code-art · support / development",
    title: "Support & Growth",
    lead:
      "We support the product, resolve tasks quickly, and continuously improve the system.",
    description:
      "Our team supports the product at every stage: monitors systems 24/7, resolves incidents, fixes bugs, ships improvements, and releases new versions.",
    benefits: [
      ["24/7 monitoring", "Continuous control and alerts", "shield"],
      ["Fast response", "Minimal time to resolution", "lightning"],
      ["Planned improvements", "Regular optimization and growth", "growth"],
      ["Scaling", "Performance growth without quality loss", "cubes"],
    ],
    contactsTitle: "Support channels",
    contacts: [
      ["Email", "support@code-art.ru", "mail"],
      ["Telegram", "@code_art_support", "telegram"],
      ["WhatsApp", "+7 (999) 123-45-67", "phone"],
      ["Helpdesk", "support.code-art.ru", "headset"],
    ],
    primaryAction: "Discuss support",
    secondaryAction: "Get growth plan",
    requestsTitle: "New requests",
    requestsToday: "today",
    requestsRows: [
      ["Critical", "2"],
      ["High", "6"],
      ["Medium", "10"],
      ["Low", "5"],
    ],
    responseTitle: "SLA / response time",
    responseValue: "14 min",
    responseText: "average response",
    fixedTitle: "Fixed this month",
    fixedValue: "137",
    fixedText: "tasks",
    healthTitle: "System health",
    healthValue: "Excellent",
    healthRows: [
      ["Services", "100%"],
      ["Database", "100%"],
      ["API", "100%"],
      ["Infrastructure", "100%"],
    ],
    releaseTitle: "Release pipeline",
    releaseSteps: ["Code", "Tests", "Build", "Stage", "Production"],
    roadmapTitle: "Roadmap",
    roadmap: [
      ["Q2 2024", "Analytics module 2.0", "60%"],
      ["Q3 2024", "Mobile application", "30%"],
      ["Q3 2024", "Integrations and API", "20%"],
      ["Q4 2024", "AI recommendations", "0%"],
    ],
    uptimeTitle: "Uptime",
    uptimeValue: "99.9%",
    uptimeText: "last 30 days",
    backlogTitle: "Backlog",
    backlogRows: [
      ["Critical", "8"],
      ["High", "15"],
      ["Medium", "23"],
      ["Low", "34"],
    ],
    processTitle: "Our process",
    process: [
      ["Monitoring", "Track systems and collect metrics", "monitor"],
      ["Analysis", "Analyze root cause and impact", "analysis"],
      ["Prioritization", "Estimate importance and plan", "target"],
      ["Fixing", "Build and test the solution", "wrench"],
      ["Release", "Ship safely and gradually", "rocket"],
      ["Improvement", "Collect feedback and improve the product", "improve"],
    ],
    metricsTitle: "Results we are proud of",
    metrics: [
      ["+38%", "System stability year over year", "metricStability"],
      ["14 min", "Average support response", "metricResponse"],
      ["99.9%", "Uptime over the last 30 days", "metricUptime"],
      ["-27%", "Critical bugs quarter over quarter", "metricErrors"],
      ["480+", "Improvements shipped this year", "metricGrowth"],
      ["98.7%", "SLA met across all requests", "metricScore"],
    ],
    closeLabel: "Close card",
  },
} satisfies Record<
  Language,
  {
    eyebrow: string;
    title: string;
    lead: string;
    description: string;
    benefits: Array<[string, string, string]>;
    contactsTitle: string;
    contacts: Array<[string, string, string]>;
    primaryAction: string;
    secondaryAction: string;
    requestsTitle: string;
    requestsToday: string;
    requestsRows: Array<[string, string]>;
    responseTitle: string;
    responseValue: string;
    responseText: string;
    fixedTitle: string;
    fixedValue: string;
    fixedText: string;
    healthTitle: string;
    healthValue: string;
    healthRows: Array<[string, string]>;
    releaseTitle: string;
    releaseSteps: string[];
    roadmapTitle: string;
    roadmap: Array<[string, string, string]>;
    uptimeTitle: string;
    uptimeValue: string;
    uptimeText: string;
    backlogTitle: string;
    backlogRows: Array<[string, string]>;
    processTitle: string;
    process: Array<[string, string, string]>;
    metricsTitle: string;
    metrics: Array<[string, string, string]>;
    closeLabel: string;
  }
>;

const supportIconSources = {
  shield: "/support/01_01_shield_star.svg",
  lightning: "/support/01_02_lightning.svg",
  growth: "/support/01_03_bar_chart.svg",
  cubes: "/support/01_04_cubes.svg",
  infinity: "/support/01_05_infinity.svg",
  heart: "/support/01_06_heart_pulse.svg",
  monitor: "/support/01_07_monitor_pulse.svg",
  analysis: "/support/02_01_analytics_circle.svg",
  target: "/support/02_03_target.svg",
  wrench: "/support/02_04_settings_wrench.svg",
  rocket: "/support/02_05_rocket.svg",
  checklist: "/support/02_07_checklist.svg",
  mail: "/support/03_01_mail.svg",
  telegram: "/support/03_02_paper_plane.svg",
  phone: "/support/03_03_phone_chat.svg",
  headset: "/support/03_04_support_headset.svg",
  sync: "/support/03_05_sync_infinity.svg",
  bug: "/support/03_07_bug.svg",
  clock: "/support/04_04_clock.svg",
  chat: "/support/04_06_chat.svg",
  speedometer: "/support/05_01_speedometer.svg",
  shieldCheck: "/support/05_04_shield_check.svg",
  improve: "/support/05_07_goal.svg",
  metricStability: "/support/06_01_percent_38.svg",
  metricResponse: "/support/06_02_metric_14m.svg",
  metricUptime: "/support/06_03_uptime_99_9.svg",
  metricErrors: "/support/06_04_negative_27.svg",
  metricGrowth: "/support/06_07_metric_480_plus.svg",
  metricScore: "/support/06_08_score_98_7.svg",
} as const;

const crmAutomationCopy = {
  ru: {
    eyebrow: "code-art • CRM / Автоматизация",
    title: "CRM / Автоматизация",
    subtitle:
      "Автоматизируем продажи, коммуникации и задачи. Усиливаем команду. Ускоряем рост бизнеса.",
    description:
      "Внедряем CRM-системы и автоматизируем бизнес-процессы, чтобы вы больше продавали, лучше работали с клиентами и масштабировались без хаоса.",
    benefits: [
      ["Больше продаж", "Повышаем конверсию и повторные касания"],
      ["Экономия времени", "Автоматизируем рутину и освобождаем часы"],
      ["Прозрачность процессов", "Контроль на каждой стадии воронки"],
      ["Лояльные клиенты", "Персонализированный фоллоу-ап и сервис"],
    ],
    processTitle: "Как работает процесс",
    process: [
      ["1. Лид", "Получаем лиды из всех каналов"],
      ["2. Квалификация", "Проверяем потребность и приоритет"],
      ["3. Сделка", "Ведём по этапам воронки"],
      ["4. Автоматизация", "Назначаем задачи и действия"],
      ["5. Оплата", "Закрываем сделку и документы"],
      ["6. Удержание", "Работаем после сделки"],
    ],
    communicationsTitle: "Коммуникации",
    leadSourcesTitle: "Источники лидов",
    teamTitle: "Активность команды",
    revenueTitle: "Прогноз выручки",
    scenariosTitle: "Автоматизация сценариев",
    integrationsTitle: "Интеграции",
    analyticsTitle: "Аналитика и отчёты",
    kpiTitle: "Ключевые показатели",
    footer: "Автоматизируем процессы. Усиливаем команду. Увеличиваем прибыль.",
    closeLabel: "Закрыть карточку",
  },
  en: {
    eyebrow: "code-art • CRM / Automation",
    title: "CRM / Automation",
    subtitle:
      "We automate sales, communication, and tasks. Strengthen the team. Accelerate business growth.",
    description:
      "We implement CRM systems and automate business processes so you sell more, work with clients better, and scale without chaos.",
    benefits: [
      ["More sales", "Increase conversion and repeat touches"],
      ["Time savings", "Automate routine and free up hours"],
      ["Process clarity", "Control every funnel stage"],
      ["Loyal clients", "Personal follow-up and service"],
    ],
    processTitle: "How the process works",
    process: [
      ["1. Lead", "Collect leads from every channel"],
      ["2. Qualification", "Check need and priority"],
      ["3. Deal", "Move through funnel stages"],
      ["4. Automation", "Assign tasks and actions"],
      ["5. Payment", "Close deal and documents"],
      ["6. Retention", "Continue after the deal"],
    ],
    communicationsTitle: "Communications",
    leadSourcesTitle: "Lead sources",
    teamTitle: "Team activity",
    revenueTitle: "Revenue forecast",
    scenariosTitle: "Scenario automation",
    integrationsTitle: "Integrations",
    analyticsTitle: "Analytics and reports",
    kpiTitle: "Key indicators",
    footer: "Automating processes. Strengthening teams. Increasing profit.",
    closeLabel: "Close card",
  },
} satisfies Record<
  Language,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    benefits: Array<[string, string]>;
    processTitle: string;
    process: Array<[string, string]>;
    communicationsTitle: string;
    leadSourcesTitle: string;
    teamTitle: string;
    revenueTitle: string;
    scenariosTitle: string;
    integrationsTitle: string;
    analyticsTitle: string;
    kpiTitle: string;
    footer: string;
    closeLabel: string;
  }
>;

const crmIconSources = {
  benefits: ["/crm/1.png", "/crm/2.png", "/crm/3.png", "/crm/4.png"],
  process: [
    "/crm/proc/1.png",
    "/crm/proc/2.png",
    "/crm/proc/3.png",
    "/crm/proc/4.png",
    "/crm/proc/5.png",
    "/crm/proc/6.png",
  ],
  communications: [
    "/crm/communic/1.png",
    "/crm/communic/2.png",
    "/crm/communic/3.png",
    "/crm/communic/4.png",
    "/crm/communic/5.png",
  ],
  scenarios: [
    "/crm/automatic/1-removebg-preview.png",
    "/crm/automatic/2-removebg-preview.png",
    "/crm/automatic/3-removebg-preview.png",
    "/crm/automatic/4-removebg-preview.png",
    "/crm/automatic/5-removebg-preview.png",
  ],
  integrations: [
    "/crm/communic/1.png",
    "/crm/communic/2.png",
    "/crm/automatic/3-removebg-preview.png",
    "/crm/communic/4.png",
    "/crm/automatic/4-removebg-preview.png",
    "/crm/automatic/5-removebg-preview.png",
  ],
} as const;

const performancePoints = [
  [0, 72],
  [34, 68],
  [68, 76],
  [102, 52],
  [136, 70],
  [170, 58],
  [204, 64],
  [238, 38],
  [272, 66],
  [306, 44],
  [340, 52],
  [374, 24],
  [408, 42],
  [442, 18],
  [476, 45],
  [510, 35],
  [544, 58],
  [578, 40],
  [612, 54],
  [646, 30],
] as const;

const corporateAnimationPoster = "/corp/animation/ezgif-frame-001.webp";
const corporateAnimationWebm = "/corp/animation/corporate-loop.webm";
const corporateAnimationMp4 = "/corp/animation/corporate-loop.mp4";

const corporateIconSources = {
  includesTitle: "/corp/1/1-removebg-preview.png",
  includes: [
    "/corp/1/2-removebg-preview.png",
    "/corp/1/3-removebg-preview.png",
    "/corp/1/4-removebg-preview.png",
    "/corp/1/7-removebg-preview.png",
    "/corp/1/8-removebg-preview.png",
    "/corp/1/9-removebg-preview.png",
  ],
  audienceTitle: "/corp/2/1-removebg-preview.png",
  audience: [
    "/corp/2/2-removebg-preview.png",
    "/corp/2/3-removebg-preview.png",
    "/corp/2/4-removebg-preview.png",
    "/corp/2/5-removebg-preview.png",
  ],
  resultTitle: "/corp/3/1-removebg-preview.png",
  results: [
    "/corp/3/1-removebg-preview.png",
    "/corp/3/2-removebg-preview.png",
    "/corp/3/3-removebg-preview%20(1).png",
    "/corp/3/4-removebg-preview.png",
  ],
  stages: [
    "/corp/stages/1-removebg-preview%20(1).png",
    "/corp/stages/2-removebg-preview.png",
    "/corp/stages/3-removebg-preview.png",
    "/corp/stages/4-removebg-preview.png",
    "/corp/stages/5-removebg-preview.png",
  ],
  metrics: {
    calendar: "/calendar-removebg-preview.png",
    code: "/corp/stages/4-removebg-preview.png",
    support: "/corp/2/3-removebg-preview.png",
    status: "/corp/3/1-removebg-preview.png",
  },
  primaryAction: "/corp/stages/5-removebg-preview.png",
} as const;

const webApplicationIconSources = {
  includesTitle: "/corp/1/1-removebg-preview.png",
  includes: [
    "/corp/1/9-removebg-preview.png",
    "/corp/1/3-removebg-preview.png",
    "/corp/3/3-removebg-preview%20(1).png",
    "/corp/3/2-removebg-preview.png",
    "/corp/1/2-removebg-preview.png",
    "/corp/1/7-removebg-preview.png",
  ],
  audienceTitle: "/corp/2/1-removebg-preview.png",
  audience: [
    "/corp/2/2-removebg-preview.png",
    "/corp/2/3-removebg-preview.png",
    "/corp/3/2-removebg-preview.png",
    "/corp/1/8-removebg-preview.png",
    "/corp/1/1-removebg-preview.png",
  ],
  resultTitle: "/corp/3/1-removebg-preview.png",
  results: [
    "/corp/1/7-removebg-preview.png",
    "/corp/3/4-removebg-preview.png",
    "/corp/1/1-removebg-preview.png",
    "/corp/2/1-removebg-preview.png",
    "/corp/1/8-removebg-preview.png",
  ],
  stages: [
    "/corp/stages/1-removebg-preview%20(1).png",
    "/corp/stages/2-removebg-preview.png",
    "/corp/stages/3-removebg-preview.png",
    "/corp/stages/4-removebg-preview.png",
    "/corp/stages/5-removebg-preview.png",
  ],
  metrics: {
    calendar: "/calendar-removebg-preview.png",
    code: "/corp/stages/4-removebg-preview.png",
    support: "/callc-removebg-preview.png",
    status: "/online.jpeg",
  },
  primaryAction: "/cub-removebg-preview.png",
} as const;

export function SystemModulePanel({
  language,
  activeItem,
  onClose,
}: {
  language: Language;
  activeItem: NavItemId | null;
  onClose: () => void;
}) {
  if (!activeItem) return null;

  const fallbackItem = activeItem;
  const fallbackModule = moduleCopy[language][fallbackItem];

  if (activeItem === "overview") {
    return <CorporateSitesPanel language={language} onClose={onClose} />;
  }

  if (activeItem === "aiSystems") {
    return <AiIntegrationPanel language={language} onClose={onClose} />;
  }

  if (activeItem === "webArchitecture") {
    return <WebApplicationsPanel language={language} onClose={onClose} />;
  }

  if (activeItem === "projects") {
    return <UiUxDesignPanel language={language} onClose={onClose} />;
  }

  if (activeItem === "services") {
    return <CrmAutomationPanel language={language} onClose={onClose} />;
  }

  if (activeItem === "contact") {
    return <SupportDevelopmentPanel language={language} onClose={onClose} />;
  }

  const activeModule = fallbackModule;
  const performancePolyline = performancePoints
    .map(([x, y]) => `${x},${y}`)
    .join(" ");
  const performanceFill = `0,118 ${performancePolyline} 646,118`;

  return (
    <section
      key={`${language}-${fallbackItem}`}
      className="system-module-panel"
      aria-label={activeModule.title}
    >
      <span className="system-module-corner system-module-corner-tl" />
      <span className="system-module-corner system-module-corner-tr" />
      <span className="system-module-corner system-module-corner-bl" />
      <span className="system-module-corner system-module-corner-br" />
      <span className="system-module-link-line system-module-link-line-a" />
      <span className="system-module-link-line system-module-link-line-b" />
      <span className="system-module-link-line system-module-link-line-c" />

      <button
        className="system-module-close"
        type="button"
        aria-label={language === "ru" ? "Закрыть карточку" : "Close card"}
        onClick={onClose}
      >
        <span />
        <span />
      </button>

      <div className="system-module-top">
        <span>{activeModule.eyebrow}</span>
        <div className="system-module-top-status">
          <span>Core Module</span>
          <strong>Active</strong>
        </div>
      </div>

      <div className="system-module-grid">
        <div className="system-module-main">
          <div className="system-module-heading">
            <span className="system-module-icon-frame" aria-hidden="true">
              <Image
                className="system-module-icon-image"
                src={navIconSources[fallbackItem]}
                alt=""
                width={120}
                height={120}
              />
            </span>
            <div>
              <h2>{activeModule.title}</h2>
              <p>{activeModule.subtitle}</p>
            </div>
          </div>

          <p className="system-module-description">
            {activeModule.description}
          </p>

          <div className="system-module-cards">
            {activeModule.cards.map((card) => (
              <article key={card.title} className="system-module-info-card">
                <span aria-hidden="true" />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <i aria-hidden="true">&gt;</i>
              </article>
            ))}
          </div>
        </div>

        <div className="system-module-visual" aria-hidden="true">
          <span className="system-module-orbit" />
          <span className="system-module-orbit" />
          <span className="system-module-orbit" />
          <span className="system-module-core" />
          {Array.from({ length: 18 }, (_, index) => (
            <span
              key={index}
              className="system-module-node"
              style={
                {
                  "--angle": `${index * 20}deg`,
                  "--radius": `${38 + (index % 4) * 10}%`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <aside className="system-module-side">
          <div className="system-module-metrics">
            {activeModule.metrics.map((metric) => (
              <div key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <em aria-hidden="true" />
                <i aria-hidden="true" />
              </div>
            ))}
          </div>
        </aside>

        <div className="system-module-performance">
          <div>
            <span>System Performance</span>
            <strong>24H</strong>
          </div>
          <div className="system-module-chart" aria-hidden="true">
            <svg viewBox="0 0 646 118" preserveAspectRatio="none">
              <defs>
                <linearGradient id="moduleChartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(179,147,255,0.34)" />
                  <stop offset="100%" stopColor="rgba(179,147,255,0)" />
                </linearGradient>
              </defs>
              <polyline
                className="system-module-chart-fill"
                points={performanceFill}
              />
              <polyline
                className="system-module-chart-line"
                points={performancePolyline}
              />
              {performancePoints
                .filter((_, index) => index % 4 === 3)
                .map(([x, y]) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="4.2" />
                ))}
            </svg>
          </div>
        </div>

        <div className="system-module-status-card">
          <span>Model Status</span>
          <strong>Active</strong>
        </div>

        <div className="system-module-model">
          <span>{activeModule.modelTitle}</span>
          <strong>{activeModule.modelMeta}</strong>
          <div className="system-module-model-wave" aria-hidden="true">
            {Array.from({ length: 48 }, (_, index) => (
              <span
                key={index}
                style={
                  {
                    "--wave": `${18 + ((index * 13 + fallbackItem.length * 7) % 54)}%`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
          <i />
        </div>
      </div>

      <a
        className="system-module-action"
        href={getWhatsAppHref(language, activeModule.action)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span aria-hidden="true">&lt;&gt;</span>
        <strong>{activeModule.action}</strong>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}

function AiIntegrationPanel({
  language,
  onClose,
}: {
  language: Language;
  onClose: () => void;
}) {
  const copy = aiIntegrationCopy[language];

  return (
    <section
      key={`ai-integration-${language}`}
      className="system-module-panel ai-integration-panel"
      aria-label={copy.title}
    >
      <span className="system-module-corner system-module-corner-tl" />
      <span className="system-module-corner system-module-corner-tr" />
      <span className="system-module-corner system-module-corner-bl" />
      <span className="system-module-corner system-module-corner-br" />

      <button
        className="system-module-close"
        type="button"
        aria-label={copy.closeLabel}
        onClick={onClose}
      >
        <span />
        <span />
      </button>

      <div className="ai-integration-shell">
        <header className="ai-integration-copy">
          <p className="ai-integration-eyebrow">{copy.eyebrow}</p>
          <h2>
            <span>{copy.accent}</span>
            {copy.title.replace(copy.accent, "")}
          </h2>
          <p className="ai-integration-lead">{copy.lead}</p>
          <p className="ai-integration-description">{copy.description}</p>

          <div className="ai-benefit-grid">
            {copy.benefits.map(([title, text, icon]) => (
              <article key={title} className="ai-benefit-card">
                <AiIcon icon={icon} className="ai-symbol" />
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </header>

        <div className="ai-network-stage" aria-hidden="true">
          <span className="ai-starfield" />
          <span className="ai-nebula ai-nebula-a" />
          <span className="ai-nebula ai-nebula-b" />
          <span className="ai-radial-grid" />
          <span className="ai-network-halo ai-network-halo-a" />
          <span className="ai-network-halo ai-network-halo-b" />
          <span className="ai-network-halo ai-network-halo-c" />

          <svg className="ai-network-lines" viewBox="0 0 900 560" preserveAspectRatio="none">
            <path d="M88 92 C220 64 260 194 424 230" />
            <path d="M72 202 C204 184 268 280 430 276" />
            <path d="M98 332 C232 320 282 292 430 304" />
            <path d="M132 444 C254 408 304 350 438 326" />
            <path d="M812 86 C682 78 646 196 474 228" />
            <path d="M830 212 C696 214 640 268 474 278" />
            <path d="M806 342 C682 334 638 312 474 306" />
            <path d="M780 462 C656 430 616 352 468 326" />
          </svg>

          <div className="ai-hero-image-wrap">
            <span className="ai-brain-glow" />
            <Image
              className="ai-brain-image"
              src="/ai/1.png"
              alt=""
              width={620}
              height={520}
            />
          </div>

          <div className="ai-data-rain">
            {Array.from({ length: 28 }, (_, index) => (
              <span
                key={index}
                style={
                  {
                    "--x": `${(index * 37) % 100}%`,
                    "--h": `${18 + (index % 5) * 8}%`,
                    "--delay": `${(index % 7) * 0.16}s`,
                  } as CSSProperties
                }
              />
            ))}
          </div>

          {Array.from({ length: 72 }, (_, index) => (
            <span
              key={index}
              className="ai-orb-node"
              style={
                {
                  "--angle": `${index * 13}deg`,
                  "--radius": `${28 + (index % 7) * 6}%`,
                  "--size": `${0.16 + (index % 4) * 0.035}rem`,
                } as CSSProperties
              }
            />
          ))}

          {copy.featureCards.map(([id, title, text, value, icon]) => (
            <article key={id} className={`ai-feature-card ai-feature-${id}`}>
              <AiIcon icon={icon} className="ai-symbol" />
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
                {value && <em>{value}</em>}
              </div>
            </article>
          ))}

          {copy.chips.map(([label, value], index) => (
            <div key={label} className={`ai-chip ai-chip-${index + 1}`}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <a
          className="ai-integration-action"
          href={getWhatsAppHref(language, copy.cta)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>{copy.cta}</strong>
          <span aria-hidden="true">→</span>
        </a>

        <div className="ai-integration-bottom">
          <section className="ai-bottom-card ai-capabilities-card">
            <h3>{copy.capabilitiesTitle}</h3>
            <div>
              <ul>
                {copy.capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <span className="ai-mini-orbit" aria-hidden="true" />
            </div>
          </section>

          <section className="ai-bottom-card ai-data-card">
            <h3>{copy.dataTitle}</h3>
            <div>
              {copy.sources.map((source, index) => (
                <span key={source}>
                  <AiIcon
                    icon={aiSourceIconKeys[index] ?? "site"}
                    className="ai-source-symbol"
                  />
                  <small>{source}</small>
                </span>
              ))}
            </div>
          </section>

          <section className="ai-bottom-card ai-result-card">
            <h3>{copy.resultTitle}</h3>
            <div>
              {copy.results.map(([value, label]) => (
                <span key={label}>
                  <strong>{value}</strong>
                  <small>{label}</small>
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

function AiIcon({
  icon,
  className,
}: {
  icon: string;
  className: string;
}) {
  const source =
    aiIconSources[icon as keyof typeof aiIconSources] ?? aiIconSources.brain;

  return (
    <span className={className} aria-hidden="true">
      <Image
        className="ai-icon-image"
        src={source}
        alt=""
        width={96}
        height={96}
      />
    </span>
  );
}

function SupportDevelopmentPanel({
  language,
  onClose,
}: {
  language: Language;
  onClose: () => void;
}) {
  const copy = supportDevelopmentCopy[language];
  const labels =
    language === "ru"
      ? {
          responseRows: [
            ["Цель (SLA)", "30 мин"],
            ["Выполнено", "98.7%"],
          ],
          fixedRows: [
            ["Ошибки", "82"],
            ["Улучшения", "41"],
            ["Прочее", "14"],
          ],
          currentRelease: "Текущий релиз",
          nextRelease: "Следующий релиз",
          uptimeRows: [
            ["Инциденты", "2"],
            ["Доступность", "99.9%"],
            ["Простой", "0ч 32м"],
          ],
        }
      : {
          responseRows: [
            ["SLA target", "30 min"],
            ["Completed", "98.7%"],
          ],
          fixedRows: [
            ["Bugs", "82"],
            ["Improvements", "41"],
            ["Other", "14"],
          ],
          currentRelease: "Current release",
          nextRelease: "Next release",
          uptimeRows: [
            ["Incidents", "2"],
            ["Availability", "99.9%"],
            ["Downtime", "0h 32m"],
          ],
        };

  return (
    <section
      key={`support-development-${language}`}
      className="system-module-panel support-panel"
      aria-label={copy.title}
    >
      <span className="system-module-corner system-module-corner-tl" />
      <span className="system-module-corner system-module-corner-tr" />
      <span className="system-module-corner system-module-corner-bl" />
      <span className="system-module-corner system-module-corner-br" />

      <button
        className="system-module-close"
        type="button"
        aria-label={copy.closeLabel}
        onClick={onClose}
      >
        <span />
        <span />
      </button>

      <div className="support-shell">
        <header className="support-copy">
          <p className="support-eyebrow">{copy.eyebrow}</p>
          <h2>{copy.title}</h2>
          <p className="support-lead">{copy.lead}</p>
          <p className="support-description">{copy.description}</p>

          <div className="support-benefits">
            {copy.benefits.map(([title, text, icon]) => (
              <article key={title}>
                <SupportIcon icon={icon} className="support-small-icon" />
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <section className="support-contact-card">
            <h3>{copy.contactsTitle}</h3>
            <div>
              {copy.contacts.map(([title, text, icon]) => (
                <span key={title}>
                  <SupportIcon icon={icon} className="support-contact-icon" />
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>
              ))}
            </div>
          </section>

          <div className="support-actions">
            <a
              href={getWhatsAppHref(language, copy.primaryAction)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.primaryAction}
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={getWhatsAppHref(language, copy.secondaryAction)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SupportIcon icon="checklist" className="support-action-icon" />
              {copy.secondaryAction}
            </a>
          </div>
        </header>

        <div className="support-stage" aria-hidden="true">
          <span className="support-space support-space-a" />
          <span className="support-space support-space-b" />
          <span className="support-orbit support-orbit-a" />
          <span className="support-orbit support-orbit-b" />
          <span className="support-orbit support-orbit-c" />
          <span className="support-orbit support-orbit-d" />
          <span className="support-beam" />
          <span className="support-floor" />

          <div className="support-cycle">
            <div className="support-core">
              <SupportIcon icon="infinity" className="support-core-icon" />
            </div>
            {copy.process.map(([title, , icon], index) => (
              <span
                key={title}
                className={`support-cycle-step support-cycle-step-${index + 1}`}
              >
                <SupportIcon icon={icon} className="support-cycle-icon" />
                <strong>{title}</strong>
              </span>
            ))}
          </div>

          <article className="support-widget support-widget-requests">
            <h3>{copy.requestsTitle}</h3>
            <div className="support-widget-main">
              <strong>23</strong>
              <span>{copy.requestsToday}</span>
              <em>-12%</em>
            </div>
            <SupportMiniChart variant="line" />
            <div className="support-widget-rows">
              {copy.requestsRows.map(([label, value]) => (
                <span key={label}>
                  <small>{label}</small>
                  <b>{value}</b>
                </span>
              ))}
            </div>
          </article>

          <article className="support-widget support-widget-response">
            <h3>{copy.responseTitle}</h3>
            <div className="support-widget-main">
              <strong>{copy.responseValue}</strong>
              <span>{copy.responseText}</span>
              <em>-18%</em>
            </div>
            <SupportMiniChart variant="bars" />
            <div className="support-widget-rows">
              {labels.responseRows.map(([label, value]) => (
                <span key={label}>
                  <small>{label}</small>
                  <b>{value}</b>
                </span>
              ))}
            </div>
          </article>

          <article className="support-widget support-widget-fixed">
            <h3>{copy.fixedTitle}</h3>
            <div className="support-widget-main">
              <strong>{copy.fixedValue}</strong>
              <span>{copy.fixedText}</span>
              <em>+27%</em>
            </div>
            <SupportMiniChart variant="stairs" />
            <div className="support-widget-rows">
              {labels.fixedRows.map(([label, value]) => (
                <span key={label}>
                  <small>{label}</small>
                  <b>{value}</b>
                </span>
              ))}
            </div>
          </article>

          <article className="support-widget support-widget-health">
            <h3>{copy.healthTitle}</h3>
            <div className="support-health-head">
              <SupportIcon icon="heart" className="support-card-icon" />
              <span>{copy.healthValue}</span>
              <SupportMiniChart variant="pulse" />
            </div>
            <div className="support-widget-rows">
              {copy.healthRows.map(([label, value]) => (
                <span key={label}>
                  <small>{label}</small>
                  <b>{value}</b>
                </span>
              ))}
            </div>
          </article>

          <article className="support-widget support-widget-release">
            <h3>{copy.releaseTitle}</h3>
            <div className="support-release-flow">
              {copy.releaseSteps.map((step, index) => (
                <span key={step} className={index === 4 ? "is-live" : undefined}>
                  <SupportIcon
                    icon={index === 4 ? "sync" : index === 1 ? "checklist" : "rocket"}
                    className="support-release-icon"
                  />
                  <small>{step}</small>
                </span>
              ))}
            </div>
            <div className="support-release-meta">
              <span>
                <small>{labels.currentRelease}</small>
                <strong>v2.4.0</strong>
              </span>
              <span>
                <small>{labels.nextRelease}</small>
                <strong>v2.4.1</strong>
              </span>
            </div>
          </article>

          <article className="support-widget support-widget-roadmap">
            <h3>{copy.roadmapTitle}</h3>
            <div className="support-timeline">
              {copy.roadmap.map(([quarter, title, value]) => (
                <span key={title}>
                  <i />
                  <small>{quarter}</small>
                  <b>{title}</b>
                  <em>{value}</em>
                </span>
              ))}
            </div>
          </article>

          <article className="support-widget support-widget-uptime">
            <h3>{copy.uptimeTitle}</h3>
            <div className="support-widget-main">
              <strong>{copy.uptimeValue}</strong>
              <span>{copy.uptimeText}</span>
            </div>
            <SupportMiniChart variant="uptime" />
            <div className="support-widget-rows">
              {labels.uptimeRows.map(([label, value]) => (
                <span key={label}>
                  <small>{label}</small>
                  <b>{value}</b>
                </span>
              ))}
            </div>
          </article>

          <article className="support-widget support-widget-backlog">
            <h3>{copy.backlogTitle}</h3>
            <div className="support-widget-rows support-backlog-rows">
              {copy.backlogRows.map(([label, value], index) => (
                <span key={label}>
                  <i className={`support-dot support-dot-${index + 1}`} />
                  <small>{label}</small>
                  <b>{value}</b>
                </span>
              ))}
            </div>
          </article>
        </div>

        <section className="support-process-strip">
          <h3>{copy.processTitle}</h3>
          <div>
            {copy.process.map(([title, text, icon], index) => (
              <article key={title}>
                <span>{index + 1}</span>
                <SupportIcon icon={icon} className="support-process-icon" />
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="support-metrics-strip">
          <h3>{copy.metricsTitle}</h3>
          <div>
            {copy.metrics.map(([value, label, icon]) => (
              <article key={label}>
                <SupportIcon icon={icon} className="support-metric-icon" />
                <strong>{value}</strong>
                <p>{label}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function SupportMiniChart({ variant }: { variant: string }) {
  const bars =
    variant === "stairs"
      ? ["18%", "26%", "36%", "48%", "58%", "72%", "82%"]
      : variant === "uptime"
        ? ["92%", "94%", "93%", "95%", "96%", "98%", "97%", "99%", "98%", "99%"]
        : ["34%", "56%", "42%", "70%", "48%", "62%", "38%", "74%", "52%", "80%"];

  if (variant === "uptime") {
    return (
      <div className="support-chart support-chart-uptime">
        <span className="support-uptime-live" />
        <div className="support-uptime-line">
          {bars.map((height, index) => (
            <span
              key={`${height}-${index}`}
              style={
                {
                  "--support-bar": height,
                  "--support-delay": `${index * 95}ms`,
                } as CSSProperties
              }
            />
          ))}
        </div>
        <div className="support-uptime-rail">
          {Array.from({ length: 18 }, (_, index) => (
            <i
              key={index}
              style={{ "--support-delay": `${index * 75}ms` } as CSSProperties}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "line" || variant === "pulse") {
    return (
      <svg className={`support-chart support-chart-${variant}`} viewBox="0 0 180 54">
        <path
          d="M2 42 C16 38 22 28 34 30 C48 16 54 40 68 34 C82 50 90 44 102 36 C118 24 126 34 138 30 C154 22 158 38 178 26"
          pathLength={1}
        >
          <animate
            attributeName="stroke-dashoffset"
            values="1;0;0;1"
            dur={variant === "pulse" ? "2.4s" : "3.2s"}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.35;1;0.72;1"
            dur={variant === "pulse" ? "1.6s" : "2.2s"}
            repeatCount="indefinite"
          />
        </path>
      </svg>
    );
  }

  return (
    <div className={`support-chart support-chart-${variant}`}>
      {bars.map((height, index) => (
        <span
          key={`${height}-${index}`}
          style={
            {
              "--support-bar": height,
              "--support-delay": `${index * 120}ms`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function SupportIcon({
  icon,
  className,
}: {
  icon: string;
  className: string;
}) {
  const source =
    supportIconSources[icon as keyof typeof supportIconSources] ??
    supportIconSources.infinity;

  return (
    <span className={className} aria-hidden="true">
      <Image
        className="support-icon-image"
        src={source}
        alt=""
        width={96}
        height={96}
      />
    </span>
  );
}

function CorporateSitesPanel({
  language,
  onClose,
}: {
  language: Language;
  onClose: () => void;
}) {
  const copy = corporateSitesCopy[language];

  return (
    <section
      key={`corporate-sites-${language}`}
      className="system-module-panel corporate-sites-panel"
      aria-label={copy.title}
    >
      <span className="system-module-corner system-module-corner-tl" />
      <span className="system-module-corner system-module-corner-tr" />
      <span className="system-module-corner system-module-corner-bl" />
      <span className="system-module-corner system-module-corner-br" />
      <span className="system-module-link-line system-module-link-line-a" />
      <span className="system-module-link-line system-module-link-line-b" />
      <span className="system-module-link-line system-module-link-line-c" />

      <button
        className="system-module-close"
        type="button"
        aria-label={copy.closeLabel}
        onClick={onClose}
      >
        <span />
        <span />
      </button>

      <header className="corporate-sites-top">
        <div className="corporate-sites-brand">
          <span className="corporate-sites-logo" aria-hidden="true">
            <Image
              src="/logo/code_art_logo_flow_transparent.gif"
              alt=""
              width={76}
              height={76}
            />
          </span>
          <div>
            <p>code-art</p>
            <span>{language === "ru" ? "Веб-студия полного цикла" : "Full-cycle web studio"}</span>
          </div>
        </div>
        <i aria-hidden="true" />
      </header>

      <div className="corporate-sites-hero">
        <div className="corporate-sites-copy">
          <p className="corporate-sites-kicker">{copy.solution}</p>
          <div className="corporate-sites-heading">
            <span className="corporate-sites-heading-icon" aria-hidden="true">
              <Image
                src={navIconSources.overview}
                alt=""
                width={112}
                height={112}
              />
            </span>
            <div>
              <h2>{copy.title}</h2>
              <p>{copy.subtitle}</p>
            </div>
          </div>
          <p className="corporate-sites-description">{copy.description}</p>
        </div>

        <CorporateAnimationVisual />
      </div>

      <div className="corporate-sites-columns">
        <CorporateListCard
          title={copy.includesTitle}
          items={copy.includes}
          titleIconSrc={corporateIconSources.includesTitle}
          itemIconSources={corporateIconSources.includes}
        />
        <CorporateListCard
          title={copy.audienceTitle}
          items={copy.audience}
          titleIconSrc={corporateIconSources.audienceTitle}
          itemIconSources={corporateIconSources.audience}
        />
        <CorporateListCard
          title={copy.resultTitle}
          items={copy.results}
          titleIconSrc={corporateIconSources.resultTitle}
          itemIconSources={corporateIconSources.results}
        />
      </div>

      <section className="corporate-sites-stages" aria-label={copy.stagesTitle}>
        <p>{copy.stagesTitle}</p>
        <div>
          {copy.stages.map((stage, index) => (
            <span key={stage} className="corporate-sites-stage">
              <span className="corporate-sites-stage-icon" aria-hidden="true">
                <Image
                  className="corporate-sites-stage-icon-image"
                  src={corporateIconSources.stages[index]}
                  alt=""
                  width={96}
                  height={96}
                />
              </span>
              <span>{stage}</span>
            </span>
          ))}
        </div>
      </section>

      <section className="corporate-sites-metrics" aria-label="project facts">
        {copy.metrics.map((metric) => (
          <div key={metric.label} className="corporate-sites-metric">
            <span className="corporate-sites-metric-icon" aria-hidden="true">
              <Image
                className="corporate-sites-metric-icon-image"
                src={
                  corporateIconSources.metrics[
                    metric.icon as keyof typeof corporateIconSources.metrics
                  ]
                }
                alt=""
                width={72}
                height={72}
              />
            </span>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.text}</small>
          </div>
        ))}
      </section>

      <div className="corporate-sites-actions">
        <a
          className="corporate-sites-primary"
          href={getWhatsAppHref(language, copy.primaryAction)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="corporate-sites-primary-icon" aria-hidden="true">
            <Image
              src={corporateIconSources.primaryAction}
              alt=""
              width={84}
              height={84}
            />
          </span>
          <strong>{copy.primaryAction}</strong>
          <i aria-hidden="true">&gt;</i>
        </a>
        <a
          className="corporate-sites-secondary"
          href={getWhatsAppHref(language, copy.secondaryAction)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>{copy.secondaryAction}</strong>
          <i aria-hidden="true" />
        </a>
      </div>

      <footer className="corporate-sites-footer">
        <span>{copy.footer}</span>
        <i aria-hidden="true" />
      </footer>
    </section>
  );
}

function WebApplicationsPanel({
  language,
  onClose,
}: {
  language: Language;
  onClose: () => void;
}) {
  const copy = webApplicationsCopy[language];

  return (
    <section
      key={`web-applications-${language}`}
      className="system-module-panel corporate-sites-panel web-apps-panel"
      aria-label={copy.title}
    >
      <span className="system-module-corner system-module-corner-tl" />
      <span className="system-module-corner system-module-corner-tr" />
      <span className="system-module-corner system-module-corner-bl" />
      <span className="system-module-corner system-module-corner-br" />
      <span className="system-module-link-line system-module-link-line-a" />
      <span className="system-module-link-line system-module-link-line-b" />
      <span className="system-module-link-line system-module-link-line-c" />

      <button
        className="system-module-close"
        type="button"
        aria-label={copy.closeLabel}
        onClick={onClose}
      >
        <span />
        <span />
      </button>

      <header className="corporate-sites-top">
        <div className="corporate-sites-brand">
          <span className="corporate-sites-logo" aria-hidden="true">
            <Image
              src="/logo/code_art_logo_flow_transparent.gif"
              alt=""
              width={76}
              height={76}
            />
          </span>
          <div>
            <p>code-art</p>
            <span>{language === "ru" ? "Веб-студия полного цикла" : "Full-cycle web studio"}</span>
          </div>
        </div>
        <i aria-hidden="true" />
      </header>

      <div className="corporate-sites-hero web-apps-hero">
        <div className="corporate-sites-copy">
          <p className="corporate-sites-kicker">{copy.solution}</p>
          <div className="corporate-sites-heading">
            <span className="corporate-sites-heading-icon web-apps-heading-icon" aria-hidden="true">
              <span className="web-apps-monitor-icon">
                <span />
              </span>
            </span>
            <div>
              <h2>{copy.title}</h2>
              <p>{copy.subtitle}</p>
            </div>
          </div>
          <p className="corporate-sites-description">{copy.description}</p>
        </div>

        <WebApplicationsVisual />
      </div>

      <div className="corporate-sites-columns">
        <CorporateListCard
          title={copy.includesTitle}
          items={copy.includes}
          titleIconSrc={webApplicationIconSources.includesTitle}
          itemIconSources={webApplicationIconSources.includes}
        />
        <CorporateListCard
          title={copy.audienceTitle}
          items={copy.audience}
          titleIconSrc={webApplicationIconSources.audienceTitle}
          itemIconSources={webApplicationIconSources.audience}
        />
        <CorporateListCard
          title={copy.resultTitle}
          items={copy.results}
          titleIconSrc={webApplicationIconSources.resultTitle}
          itemIconSources={webApplicationIconSources.results}
        />
      </div>

      <section className="corporate-sites-stages" aria-label={copy.stagesTitle}>
        <p>{copy.stagesTitle}</p>
        <div>
          {copy.stages.map((stage, index) => (
            <span key={stage} className="corporate-sites-stage">
              <span className="corporate-sites-stage-icon" aria-hidden="true">
                <Image
                  className="corporate-sites-stage-icon-image"
                  src={webApplicationIconSources.stages[index]}
                  alt=""
                  width={96}
                  height={96}
                />
              </span>
              <span>{stage}</span>
            </span>
          ))}
        </div>
      </section>

      <section className="corporate-sites-metrics" aria-label="project facts">
        {copy.metrics.map((metric) => (
          <div key={metric.label} className="corporate-sites-metric">
            <span className="corporate-sites-metric-icon" aria-hidden="true">
              <Image
                className="corporate-sites-metric-icon-image"
                src={
                  webApplicationIconSources.metrics[
                    metric.icon as keyof typeof webApplicationIconSources.metrics
                  ]
                }
                alt=""
                width={72}
                height={72}
              />
            </span>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.text}</small>
          </div>
        ))}
      </section>

      <div className="corporate-sites-actions">
        <a
          className="corporate-sites-primary"
          href={getWhatsAppHref(language, copy.primaryAction)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="corporate-sites-primary-icon" aria-hidden="true">
            <Image
              src={webApplicationIconSources.primaryAction}
              alt=""
              width={84}
              height={84}
            />
          </span>
          <strong>{copy.primaryAction}</strong>
          <i aria-hidden="true">&gt;</i>
        </a>
        <a
          className="corporate-sites-secondary"
          href={getWhatsAppHref(language, copy.secondaryAction)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>{copy.secondaryAction}</strong>
          <i aria-hidden="true" />
        </a>
      </div>

      <footer className="corporate-sites-footer">
        <span>{copy.footer}</span>
        <i aria-hidden="true" />
      </footer>
    </section>
  );
}

function WebApplicationsVisual() {
  return (
    <div className="corporate-sites-visual web-apps-visual" aria-hidden="true">
      <div className="web-apps-video-shell">
        <video
          className="web-apps-video"
          src="/apps/kling_20260505_Image_to_Video_Animate_on_4101_0.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
      <span className="corporate-sites-animation-glow web-apps-glow" />
    </div>
  );
}

function UiUxDesignPanel({
  language,
  onClose,
}: {
  language: Language;
  onClose: () => void;
}) {
  const copy = uiUxDesignCopy[language];

  return (
    <section
      key={`uiux-design-${language}`}
      className="system-module-panel uiux-panel"
      aria-label={copy.title}
    >
      <span className="system-module-corner system-module-corner-tl" />
      <span className="system-module-corner system-module-corner-tr" />
      <span className="system-module-corner system-module-corner-bl" />
      <span className="system-module-corner system-module-corner-br" />

      <button
        className="system-module-close"
        type="button"
        aria-label={copy.closeLabel}
        onClick={onClose}
      >
        <span />
        <span />
      </button>

      <header className="uiux-top">
        <span>{copy.eyebrow}</span>
        <i aria-hidden="true" />
      </header>

      <div className="uiux-hero">
        <div className="uiux-copy">
          <h2>{copy.title}</h2>
          <p className="uiux-subtitle">{copy.subtitle}</p>
          <p className="uiux-description">{copy.description}</p>

          <div className="uiux-principles">
            {copy.principles.map((item) => (
              <article key={item.title}>
                <UiUxIcon
                  className={`uiux-symbol uiux-symbol-${item.icon}`}
                  src={
                    uiUxIconSources.principles[
                      item.icon as keyof typeof uiUxIconSources.principles
                    ]
                  }
                />
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <UiUxHeroVisual />

        <div className="uiux-wireflow" aria-hidden="true">
          <div className="uiux-image-slot uiux-wire-slot uiux-photo-slot">
            <Image
              className="uiux-slot-image"
              src="/ui/icons/9.jpeg"
              alt=""
              fill
              sizes="220px"
            />
          </div>
          <i />
          <div className="uiux-image-slot uiux-result-slot uiux-photo-slot">
            <Image
              className="uiux-slot-image"
              src="/ui/icons/10.jpeg"
              alt=""
              fill
              sizes="260px"
            />
          </div>
        </div>

        <aside className="uiux-advantages" aria-label={copy.advantagesTitle}>
          <h3>{copy.advantagesTitle}</h3>
          <div>
            {copy.advantages.map((item) => (
              <article key={item.title}>
                <UiUxIcon
                  className={`uiux-symbol uiux-symbol-${item.icon}`}
                  src={
                    uiUxIconSources.advantages[
                      item.icon as keyof typeof uiUxIconSources.advantages
                    ]
                  }
                />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="uiux-conversion">
            <span>{language === "ru" ? "Рост конверсии" : "Conversion growth"}</span>
            <strong>+34%</strong>
            <small>{language === "ru" ? "после редизайна" : "after redesign"}</small>
            <svg
              className="uiux-conversion-chart"
              viewBox="0 0 150 78"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="uiuxConversionFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(52,240,181,0.28)" />
                  <stop offset="100%" stopColor="rgba(179,147,255,0)" />
                </linearGradient>
              </defs>
              <polygon
                className="uiux-conversion-fill"
                points="8,66 8,55 32,50 55,42 78,45 102,25 124,31 142,12 142,66"
              />
              <polyline
                className="uiux-conversion-line"
                points="8,55 32,50 55,42 78,45 102,25 124,31 142,12"
              />
              {[112, 122, 132, 142].map((x, index) => (
                <rect
                  key={x}
                  className="uiux-conversion-bar"
                  x={x}
                  y={[48, 38, 26, 16][index]}
                  width="5"
                  height={[18, 28, 40, 50][index]}
                  rx="1.5"
                />
              ))}
            </svg>
          </div>
        </aside>
      </div>

      <div className="uiux-lower">
        <section className="uiux-workflow" aria-label={copy.workflowTitle}>
          <h3>{copy.workflowTitle}</h3>
          <div>
            {copy.workflow.map(([title, text], index) => (
              <article key={title}>
                <UiUxIcon
                  className="uiux-step-icon"
                  src={uiUxIconSources.workflow[index] ?? uiUxIconSources.workflow[0]}
                />
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="uiux-design-system" aria-label={copy.designSystemTitle}>
          <h3>{copy.designSystemTitle}</h3>
          <div className="uiux-swatches" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="uiux-components">
            <span>Кнопка</span>
            <span>Тоггл</span>
            <span>Иконки</span>
          </div>
          <div className="uiux-type">
            <strong>Aa</strong>
            <span>Inter / Regular / Semibold</span>
          </div>
        </section>

        <section className="uiux-journey" aria-label={copy.journeyTitle}>
          <h3>{copy.journeyTitle}</h3>
          <div>
            {copy.journey.map((step, index) => (
              <span key={step}>
                <UiUxIcon
                  className="uiux-journey-icon"
                  src={uiUxIconSources.journey[index] ?? uiUxIconSources.journey[0]}
                />
                {step}
              </span>
            ))}
          </div>
        </section>

        <section className="uiux-analytics" aria-label={copy.analyticsTitle}>
          <h3>{copy.analyticsTitle}</h3>
          <div className="uiux-analytics-grid">
            {copy.analytics.map(([value, text]) => (
              <article key={text}>
                <strong>{value}</strong>
                <span>{text}</span>
              </article>
            ))}
          </div>
          <div className="uiux-image-slot uiux-heatmap" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
        </section>

        <section className="uiux-improvements">
          {copy.improvements.map(([title, text], index) => (
            <article key={title}>
              <UiUxIcon
                className="uiux-step-icon"
                src={
                  uiUxIconSources.improvements[index] ??
                  uiUxIconSources.improvements[0]
                }
              />
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </section>

        <section className="uiux-cta">
          <div>
            <h3>{copy.ctaTitle}</h3>
            <p>{copy.ctaText}</p>
          </div>
          <div>
            <a
              href={getWhatsAppHref(language, copy.primaryAction)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.primaryAction}
              <span aria-hidden="true">&gt;</span>
            </a>
            <a
              href={getWhatsAppHref(language, copy.secondaryAction)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.secondaryAction}
            </a>
          </div>
        </section>
      </div>

      <footer className="uiux-footer">
        <span>{copy.footer}</span>
      </footer>
    </section>
  );
}

function CrmAutomationPanel({
  language,
  onClose,
}: {
  language: Language;
  onClose: () => void;
}) {
  const copy = crmAutomationCopy[language];

  return (
    <section
      key={`crm-automation-${language}`}
      className="system-module-panel crm-panel"
      aria-label={copy.title}
    >
      <span className="system-module-corner system-module-corner-tl" />
      <span className="system-module-corner system-module-corner-tr" />
      <span className="system-module-corner system-module-corner-bl" />
      <span className="system-module-corner system-module-corner-br" />

      <button
        className="system-module-close"
        type="button"
        aria-label={copy.closeLabel}
        onClick={onClose}
      >
        <span />
        <span />
      </button>

      <header className="crm-top">
        <span>{copy.eyebrow}</span>
        <i aria-hidden="true" />
      </header>

      <div className="crm-hero">
        <div className="crm-copy">
          <h2>{copy.title}</h2>
          <p className="crm-subtitle">{copy.subtitle}</p>
          <p className="crm-description">{copy.description}</p>

          <div className="crm-benefits">
            {copy.benefits.map(([title, text], index) => (
              <article key={title}>
                <CrmIcon src={crmIconSources.benefits[index]} index={index} />
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>

        <CrmDashboardMockup />
      </div>

      <section className="crm-process" aria-label={copy.processTitle}>
        <h3>{copy.processTitle}</h3>
        <div>
          {copy.process.map(([title, text], index) => (
            <article key={title}>
              <CrmIcon src={crmIconSources.process[index]} index={index + 4} />
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="crm-mid-grid">
        <CrmMiniCard title={copy.communicationsTitle} variant="communications" />
        <CrmMiniCard title={copy.leadSourcesTitle} variant="donut" />
        <CrmMiniCard title={copy.teamTitle} variant="team" />
        <CrmMiniCard title={copy.revenueTitle} variant="chart" />
      </div>

      <div className="crm-lower-grid">
        <section className="crm-scenarios">
          <h3>{copy.scenariosTitle}</h3>
          <div className="crm-scenario-flow" aria-hidden="true">
            {["Приветствие", "Назначение лида", "Смена статуса", "Контроль оплаты", "Повторные продажи"].map(
              (item, index) => (
                <span key={item}>
                  <CrmIcon src={crmIconSources.scenarios[index]} index={index + 10} />
                  <strong>{item}</strong>
                  <small>{index < 3 ? "Автодействие" : "Триггер"}</small>
                </span>
              )
            )}
          </div>
        </section>

        <section className="crm-integrations">
          <h3>{copy.integrationsTitle}</h3>
          <div>
            {["Почта", "Телефония", "Webhook", "Мессенджеры", "Платежи", "1C и учет"].map(
              (item, index) => (
                <span key={item}>
                  <CrmIcon src={crmIconSources.integrations[index]} index={index + 15} />
                  {item}
                </span>
              )
            )}
          </div>
          <strong>+ 50+ интеграций</strong>
        </section>

        <section className="crm-analytics">
          <h3>{copy.analyticsTitle}</h3>
          <ul>
            <li>Эффективность менеджеров</li>
            <li>Конверсии по этапам</li>
            <li>Выручка и динамика</li>
            <li>Источники лидов</li>
          </ul>
          <div className="crm-bars" aria-hidden="true">
            {Array.from({ length: 6 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
        </section>

        <section className="crm-kpi">
          <h3>{copy.kpiTitle}</h3>
          <div className="crm-kpi-main">
            {[
              ["24,7%", "Конверсия"],
              ["2ч 15м", "Ср. цикл сделки"],
              ["128", "Новые лиды"],
              ["$2.45M", "Выручка"],
            ].map(([value, label]) => (
              <article key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>
          <div className="crm-kpi-growth">
            {["+18%", "+18%", "+24%", "+31%"].map((value, index) => (
              <article key={`${value}-${index}`}>
                <strong>{value}</strong>
                <span>Рост</span>
              </article>
            ))}
          </div>
        </section>
      </div>

      <footer className="crm-footer">
        <span>{copy.footer}</span>
      </footer>
    </section>
  );
}

function CrmDashboardMockup() {
  return (
    <div className="crm-visual" aria-hidden="true">
      <span className="crm-planet-placeholder" />
      <span className="crm-orbit-placeholder" />
      <div className="crm-funnel-card">
        <div className="crm-funnel-detail">
          <div className="crm-card-head">
            <strong>Воронка продаж</strong>
            <em>+24%</em>
          </div>
          {[
            ["Новый лид", "128", "92%"],
            ["Квалификация", "87", "72%"],
            ["Презентация", "56", "55%"],
            ["Переговоры", "31", "38%"],
            ["Закрытие", "24", "26%"],
          ].map(([item, count, progress]) => (
            <span key={item} style={{ "--crm-progress": progress } as CSSProperties}>
              <i />
              <b>{item}</b>
              <small>{count}</small>
              <em />
            </span>
          ))}
          <div className="crm-funnel-total">
            <small>Конверсия</small>
            <strong>24.7%</strong>
          </div>
        </div>
        <strong>Воронка продаж</strong>
        {["Новый лид", "Квалификация", "Презентация", "Переговоры"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="crm-dashboard">
        <div className="crm-dashboard-detail">
          <div className="crm-dashboard-head">
            <p>CRM панель</p>
            <span>LIVE</span>
          </div>
          <div className="crm-dashboard-stats crm-dashboard-stats-rich">
            {[
              ["Новые лиды", "128", "+24%"],
              ["Сделки", "56", "+18%"],
              ["Победы", "24", "+31%"],
              ["Выручка", "$2,450,000", "+24.7%"],
            ].map(([label, value, delta]) => (
              <span key={value}>
                <small>{label}</small>
                <strong>{value}</strong>
                <em>{delta}</em>
              </span>
            ))}
          </div>
          <div className="crm-dashboard-body crm-dashboard-body-rich">
            <div className="crm-deals">
              <strong>Сделки в работе</strong>
              {["Внедрение CRM", "Интеграция WhatsApp", "Автоматизация продаж", "Корпоративный портал"].map(
                (item, index) => (
                  <span key={item}>
                    <i>{index + 1}</i>
                    {item}
                    <em>${(index + 1) * 45},000</em>
                  </span>
                )
              )}
            </div>
            <div className="crm-tasks">
              <strong>Задачи на сегодня</strong>
              {["Связаться с лидом", "Отправить КП", "Провести презентацию", "Подписать договор"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="crm-dashboard-pulse">
            {["42%", "68%", "52%", "81%", "73%", "94%", "63%", "88%"].map((height, index) => (
              <span key={`${height}-${index}`} style={{ "--crm-bar": height } as CSSProperties} />
            ))}
          </div>
        </div>
        <p>CRM панель</p>
        <div className="crm-dashboard-stats">
          {["128", "56", "24", "$2,450,000"].map((value) => (
            <span key={value}>
              <small>Показатель</small>
              <strong>{value}</strong>
            </span>
          ))}
        </div>
        <div className="crm-dashboard-body">
          <div className="crm-deals">
            <strong>Сделки в работе</strong>
            {["Внедрение CRM", "Интеграция WhatsApp", "Автоматизация продаж", "Корпоративный портал"].map(
              (item, index) => (
                <span key={item}>
                  <i>{index + 1}</i>
                  {item}
                  <em>${(index + 1) * 45},000</em>
                </span>
              )
            )}
          </div>
          <div className="crm-tasks">
            <strong>Задачи на сегодня</strong>
            {["Связаться с лидом", "Отправить КП", "Провести презентацию", "Подписать договор"].map(
              (item) => (
                <span key={item}>{item}</span>
              )
            )}
          </div>
        </div>
      </div>
      <div className="crm-automation-card">
        <strong>Автоматизации</strong>
        {["Новый лид", "Приветствие", "Квалификация", "Создать сделку"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="crm-client-card">
        <strong>Клиент 360°</strong>
        <span className="crm-avatar-placeholder" />
        <p>Иван Петров</p>
        {["Звонок", "Письмо отправлено", "Презентация", "Договор подписан"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function CrmMiniCard({
  title,
  variant,
}: {
  title: string;
  variant: "communications" | "donut" | "team" | "chart";
}) {
  return (
    <section className={`crm-mini-card crm-mini-card-${variant}`}>
      <h3>{title}</h3>
      {variant === "communications" && (
        <div>
          {["Email", "Телефония", "WhatsApp", "Telegram", "Чат"].map((item, index) => (
            <span key={item}>
              <CrmIcon src={crmIconSources.communications[index]} index={index} />
              <small>{item}</small>
            </span>
          ))}
        </div>
      )}
      {variant === "donut" && (
        <div className="crm-donut-wrap">
          <span className="crm-donut" />
          <p>Сайт 38%<br />Реклама 20%<br />Рефералы 18%</p>
        </div>
      )}
      {variant === "team" && (
        <ul>
          <li>Менеджеры в сети <strong>8</strong></li>
          <li>Задачи выполнено <strong>32</strong></li>
          <li>Встреч запланировано <strong>15</strong></li>
          <li>Просроченных задач <strong>3</strong></li>
        </ul>
      )}
      {variant === "chart" && (
        <div className="crm-revenue-chart" aria-hidden="true">
          <strong>$2,450,000</strong>
          <span>+24,7%</span>
          <svg viewBox="0 0 160 72" preserveAspectRatio="none">
            <defs>
              <linearGradient id="crmRevenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(179,147,255,0.36)" />
                <stop offset="100%" stopColor="rgba(179,147,255,0)" />
              </linearGradient>
            </defs>
            <polygon
              className="crm-revenue-fill"
              points="8,62 8,48 32,38 56,44 82,30 108,34 136,13 152,24 152,62"
            />
            <polyline
              className="crm-revenue-line"
              points="8,48 32,38 56,44 82,30 108,34 136,13 152,24"
            />
            {[8, 32, 56, 82, 108, 136, 152].map((cx, index) => (
              <circle
                key={cx}
                className="crm-revenue-dot"
                cx={cx}
                cy={[48, 38, 44, 30, 34, 13, 24][index]}
                r="2.8"
              />
            ))}
          </svg>
        </div>
      )}
    </section>
  );
}

function CrmIcon({ src, index }: { src: string; index: number }) {
  return (
    <span
      className="crm-placeholder-icon crm-image-icon"
      style={{ "--crm-icon-index": index } as CSSProperties}
      aria-hidden="true"
    >
      <Image src={src} alt="" fill sizes="48px" />
    </span>
  );
}

function UiUxHeroVisual() {
  return (
    <div className="uiux-visual uiux-static-bg" aria-hidden="true">
      <div className="uiux-image-slot uiux-main-screen uiux-static-bg-screen" />
    </div>
  );
}

function UiUxIcon({ className, src }: { className: string; src: string }) {
  return (
    <span className={`${className} uiux-icon-holder`} aria-hidden="true">
      <Image
        className="uiux-icon-image"
        src={src}
        alt=""
        width={96}
        height={96}
        sizes="48px"
      />
    </span>
  );
}

function CorporateAnimationVisual() {
  return (
    <div className="corporate-sites-visual" aria-hidden="true">
      <div className="corporate-sites-animation-shell">
        <video
          className="corporate-sites-animation-frame"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={corporateAnimationPoster}
        >
          <source src={corporateAnimationWebm} type="video/webm" />
          <source src={corporateAnimationMp4} type="video/mp4" />
        </video>
      </div>
      <span className="corporate-sites-animation-glow" />
    </div>
  );
}

function CorporateListCard({
  title,
  items,
  titleIconSrc,
  itemIconSources,
}: {
  title: string;
  items: string[];
  titleIconSrc: string;
  itemIconSources: readonly string[];
}) {
  return (
    <article className="corporate-sites-card">
      <h3>
        <span className="corporate-sites-list-icon" aria-hidden="true">
          <Image
            className="corporate-sites-list-icon-image"
            src={titleIconSrc}
            alt=""
            width={64}
            height={64}
          />
        </span>
        {title}
      </h3>
      <div>
        {items.map((item, index) => (
          <p key={item}>
            <span className="corporate-sites-row-icon" aria-hidden="true">
              <Image
                className="corporate-sites-row-icon-image"
                src={itemIconSources[index] ?? titleIconSrc}
                alt=""
                width={48}
                height={48}
              />
            </span>
            <span>{item}</span>
          </p>
        ))}
      </div>
    </article>
  );
}
