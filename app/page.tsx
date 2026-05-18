import { LandingShell } from "./components/site/LandingShell";

const siteUrl = "https://codeart.kz";

const services = [
  {
    title: "Корпоративные сайты",
    text: "Имиджевые, презентационные и многостраничные сайты для бизнеса с адаптивной версткой, аналитикой и SEO-основой.",
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
  },
  {
    title: "AI-интеграции",
    text: "AI-ассистенты, подсказки менеджерам, суммаризация диалогов, прогнозы и автоматические действия.",
  },
  {
    title: "Поддержка и развитие",
    text: "Техническая поддержка, мониторинг, исправления, релизы, развитие продукта и повышение стабильности.",
  },
];

const faq = [
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
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Code Art",
      url: siteUrl,
      logo: `${siteUrl}/favicon.ico`,
      sameAs: [],
      description:
        "Code Art — веб-студия полного цикла: сайты, веб-приложения, UX/UI, CRM-автоматизация, AI-интеграции и поддержка проектов.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Code Art",
      inLanguage: "ru-KZ",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Code Art — разработка сайтов, веб-приложений, CRM и AI-интеграций",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "ru-KZ",
      description:
        "Разработка сайтов, веб-приложений, UX/UI-дизайн, CRM-автоматизация, AI-интеграции и поддержка цифровых продуктов.",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service-business`,
      name: "Code Art",
      url: siteUrl,
      areaServed: "Kazakhstan",
      priceRange: "$$",
      image: `${siteUrl}/opengraph-image`,
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Услуги Code Art",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.text,
            provider: {
              "@id": `${siteUrl}/#organization`,
            },
          },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <LandingShell />
      <SeoContent />
    </>
  );
}

function SeoContent() {
  return (
    <section className="seo-content" aria-labelledby="seo-title">
      <div className="seo-content-inner">
        <p className="seo-eyebrow">Code Art · веб-студия полного цикла</p>
        <h1 id="seo-title">
          Разработка сайтов, веб-приложений, CRM и AI-интеграций
        </h1>
        <p className="seo-lead">
          Создаем цифровые продукты для бизнеса: от корпоративных сайтов и
          интерфейсов до CRM-автоматизации, AI-инструментов и постоянной
          технической поддержки.
        </p>

        <div className="seo-services" aria-label="Услуги Code Art">
          {services.map((service) => (
            <article key={service.title}>
              <h2>{service.title}</h2>
              <p>{service.text}</p>
            </article>
          ))}
        </div>

        <div className="seo-process">
          <div>
            <h2>Как мы работаем</h2>
            <p>
              Анализируем задачу, проектируем структуру, создаем дизайн,
              разрабатываем интерфейс, подключаем интеграции, запускаем проект и
              развиваем его по метрикам.
            </p>
          </div>
          <ul>
            <li>Брифинг и аудит бизнес-задач</li>
            <li>UX/UI-дизайн и прототипирование</li>
            <li>Frontend-разработка и интеграции</li>
            <li>Тестирование, запуск и поддержка</li>
          </ul>
        </div>

        <div className="seo-faq" aria-label="Частые вопросы">
          {faq.map((item) => (
            <article key={item.question}>
              <h2>{item.question}</h2>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
