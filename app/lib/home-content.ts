import type { Language } from "./i18n";

export type HomeServiceItem = {
  title: string;
  text: string;
  href?: string;
};

export type HomeFaqItem = {
  question: string;
  answer: string;
};

export type HomeLinkItem = {
  href: string;
  label: string;
};

export type HomeContent = {
  orgDescription: string;
  webpageName: string;
  webpageDescription: string;
  offerCatalogName: string;
  inLanguage: string;
  eyebrow: string;
  title: string;
  detailsToggleLabel: string;
  lead: string;
  servicesAriaLabel: string;
  services: HomeServiceItem[];
  processTitle: string;
  processText: string;
  processSteps: string[];
  careerTitle: string;
  careerText: string;
  careerLinks: HomeLinkItem[];
  servicesPageTitle: string;
  servicesPageText: string;
  servicesLinks: HomeLinkItem[];
  faqAriaLabel: string;
  faq: HomeFaqItem[];
};

export const homeContent: Record<Language, HomeContent> = {
  ru: {
    orgDescription:
      "Code Art — веб-студия полного цикла: сайты, веб-приложения, UX/UI, CRM-автоматизация, AI-интеграции и поддержка проектов.",
    webpageName: "Code Art — разработка сайтов, веб-приложений, CRM и AI-интеграций",
    webpageDescription:
      "Разработка сайтов, веб-приложений, UX/UI-дизайн, CRM-автоматизация, AI-интеграции и поддержка цифровых продуктов.",
    offerCatalogName: "Услуги Code Art",
    inLanguage: "ru-KZ",
    eyebrow: "Code Art · веб-студия полного цикла",
    title: "Разработка сайтов, веб-приложений, CRM и AI-интеграций",
    detailsToggleLabel:
      "Подробнее: услуги, процесс работы, вакансии и частые вопросы",
    lead:
      "Создаем цифровые продукты для бизнеса: от корпоративных сайтов и интерфейсов до CRM-автоматизации, AI-инструментов и постоянной технической поддержки.",
    servicesAriaLabel: "Услуги Code Art",
    services: [
      {
        title: "Корпоративные сайты",
        text: "Имиджевые, презентационные и многостраничные сайты для бизнеса с адаптивной версткой, аналитикой и продуманной структурой.",
        href: "/services/website-development",
      },
      {
        title: "Веб-приложения",
        text: "Личные кабинеты, CRM, внутренние сервисы и масштабируемые интерфейсы для управления процессами.",
      },
      {
        title: "UX/UI дизайн",
        text: "Проектирование удобных интерфейсов, дизайн-систем, пользовательских сценариев и экранов продукта.",
      },
      {
        title: "CRM / Автоматизация",
        text: "Внедрение CRM, автоматизация продаж, задач, коммуникаций, интеграций и отчетности.",
        href: "/services/crm-automation",
      },
      {
        title: "AI-интеграции",
        text: "AI-ассистенты, подсказки менеджерам, суммаризация диалогов, прогнозы и автоматические действия.",
        href: "/services/ai-integrations",
      },
      {
        title: "Поддержка и развитие",
        text: "Техническая поддержка, мониторинг, исправления, релизы, развитие продукта и повышение стабильности.",
      },
    ],
    processTitle: "Как мы работаем",
    processText:
      "Анализируем задачу, проектируем структуру, создаем дизайн, разрабатываем интерфейс, подключаем интеграции, запускаем проект и развиваем его по метрикам.",
    processSteps: [
      "Брифинг и аудит бизнес-задач",
      "UX/UI-дизайн и прототипирование",
      "Frontend-разработка и интеграции",
      "Тестирование, запуск и поддержка",
    ],
    careerTitle: "Карьера и вакансии Code Art",
    careerText:
      "Помимо услуг, мы публикуем отдельные страницы для удалённой работы, IT-вакансий и digital-вакансий, чтобы кандидаты сразу попадали на нужную роль, видели формат сотрудничества и могли быстро понять, подходит ли им это направление.",
    careerLinks: [
      { href: "/career", label: "Карьера в Code Art" },
      {
        href: "/career/highload-systems-engineer",
        label: "Вакансия backend-инженера высоконагруженных систем",
      },
      {
        href: "/career/digital-project-growth-marketer",
        label: "Вакансия по продвижению digital-проектов",
      },
    ],
    servicesPageTitle: "Отдельные страницы услуг Code Art",
    servicesPageText:
      "Мы собрали ключевые направления на отдельных страницах, чтобы было проще быстро перейти к нужной услуге, сравнить форматы и понять, чем именно можем помочь бизнесу.",
    servicesLinks: [
      { href: "/services", label: "Все услуги Code Art" },
      { href: "/services/website-development", label: "Разработка сайтов для бизнеса" },
      { href: "/services/crm-automation", label: "CRM-автоматизация и внедрение процессов" },
      { href: "/services/ai-integrations", label: "AI-интеграции для бизнеса" },
      { href: "/calculator", label: "Калькулятор стоимости проекта" },
    ],
    faqAriaLabel: "Частые вопросы",
    faq: [
      {
        question: "Какие проекты разрабатывает Code Art?",
        answer:
          "Code Art разрабатывает корпоративные сайты, веб-приложения, CRM-системы, интерфейсы, AI-интеграции и сопровождает цифровые продукты после запуска.",
      },
      {
        question: "Можно ли заказать только дизайн или только разработку?",
        answer:
          "Да. Команда может подключиться на отдельный этап: UX/UI-дизайн, frontend-разработка, интеграции, автоматизация, аудит или поддержка.",
      },
      {
        question: "Вы занимаетесь CRM и автоматизацией бизнеса?",
        answer:
          "Да. Мы проектируем процессы, внедряем CRM, подключаем каналы коммуникаций, автоматизируем задачи и настраиваем аналитику.",
      },
      {
        question: "Делаете ли вы AI-интеграции?",
        answer:
          "Да. Мы подключаем AI к CRM, продажам, поддержке и аналитике: ассистенты, прогнозы, суммаризация, скоринг и автоматические сценарии.",
      },
    ],
  },
  en: {
    orgDescription:
      "Code Art is a full-cycle web studio: websites, web apps, UX/UI, CRM automation, AI integrations, and product support.",
    webpageName: "Code Art — website, web app, CRM and AI integration development",
    webpageDescription:
      "Website development, web applications, UX/UI design, CRM automation, AI integrations, and support for digital products.",
    offerCatalogName: "Code Art services",
    inLanguage: "en-US",
    eyebrow: "Code Art · full-cycle web studio",
    title: "Website, web app, CRM and AI integration development",
    detailsToggleLabel: "More: services, our process, careers, and FAQ",
    lead:
      "We build digital products for business: from corporate websites and interfaces to CRM automation, AI tools, and ongoing technical support.",
    servicesAriaLabel: "Code Art services",
    services: [
      {
        title: "Corporate websites",
        text: "Brand, presentation, and multi-page websites for business with responsive layout, analytics, and a well-considered structure.",
        href: "/services/website-development",
      },
      {
        title: "Web applications",
        text: "Client portals, CRM, internal services, and scalable interfaces for managing business processes.",
      },
      {
        title: "UX/UI design",
        text: "Designing usable interfaces, design systems, user scenarios, and product screens.",
      },
      {
        title: "CRM / Automation",
        text: "CRM implementation, automating sales, tasks, communications, integrations, and reporting.",
        href: "/services/crm-automation",
      },
      {
        title: "AI integrations",
        text: "AI assistants, manager prompts, dialogue summarization, forecasts, and automated actions.",
        href: "/services/ai-integrations",
      },
      {
        title: "Support & growth",
        text: "Technical support, monitoring, fixes, releases, product development, and stability improvements.",
      },
    ],
    processTitle: "How we work",
    processText:
      "We analyze the task, design the structure, create the design, build the interface, connect integrations, launch the project, and keep improving it by the metrics.",
    processSteps: [
      "Briefing and business task audit",
      "UX/UI design and prototyping",
      "Frontend development and integrations",
      "Testing, launch, and support",
    ],
    careerTitle: "Careers and open roles at Code Art",
    careerText:
      "Besides services, we publish dedicated pages for remote work, IT roles, and digital roles, so candidates land directly on the right position, see the collaboration format, and can quickly tell if it fits them.",
    careerLinks: [
      { href: "/career", label: "Careers at Code Art" },
      {
        href: "/career/highload-systems-engineer",
        label: "Highload systems backend engineer role",
      },
      {
        href: "/career/digital-project-growth-marketer",
        label: "Digital project growth marketer role",
      },
    ],
    servicesPageTitle: "Code Art service pages",
    servicesPageText:
      "We grouped our core directions into dedicated pages, so it's easy to jump to a specific service, compare formats, and see exactly how we can help your business.",
    servicesLinks: [
      { href: "/services", label: "All Code Art services" },
      { href: "/services/website-development", label: "Website development for business" },
      { href: "/services/crm-automation", label: "CRM automation and process implementation" },
      { href: "/services/ai-integrations", label: "AI integrations for business" },
      { href: "/calculator", label: "Project cost calculator" },
    ],
    faqAriaLabel: "Frequently asked questions",
    faq: [
      {
        question: "What kind of projects does Code Art build?",
        answer:
          "Code Art builds corporate websites, web applications, CRM systems, interfaces, and AI integrations, and supports digital products after launch.",
      },
      {
        question: "Can I order only design or only development?",
        answer:
          "Yes. The team can join at a specific stage: UX/UI design, frontend development, integrations, automation, an audit, or ongoing support.",
      },
      {
        question: "Do you work on CRM and business automation?",
        answer:
          "Yes. We design processes, implement CRM, connect communication channels, automate tasks, and set up analytics.",
      },
      {
        question: "Do you build AI integrations?",
        answer:
          "Yes. We connect AI to CRM, sales, support, and analytics: assistants, forecasts, summarization, scoring, and automated scenarios.",
      },
    ],
  },
};
