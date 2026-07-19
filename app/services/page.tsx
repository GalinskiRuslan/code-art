import type { Metadata } from "next";
import Link from "next/link";
import { getWhatsAppHref } from "../lib/whatsapp";
import { TrackedAnchor, TrackedLink } from "../components/TrackedLink";
import styles from "./services.module.css";
import { servicePages } from "./service-pages";

const siteUrl = "https://codeart.kz";

const serviceSignals = [
  "Разработка сайтов",
  "CRM-автоматизация",
  "AI-интеграции",
  "Казахстан и СНГ",
] as const;

const processSteps = [
  "Разбираем задачу бизнеса, ограничения и желаемый результат.",
  "Собираем структуру решения под конкретную услугу и формат работы.",
  "Реализуем дизайн, логику, интеграции и рабочую систему без лишней сложности.",
  "Запускаем, проверяем на практике и дорабатываем по реальным данным.",
] as const;

export const metadata: Metadata = {
  title: { absolute: "Услуги Code Art" },
  description:
    "Услуги Code Art для бизнеса: разработка сайтов, CRM-автоматизация и AI-интеграции для компаний в Казахстане и СНГ.",
  keywords: [
    "услуги Code Art",
    "разработка сайтов Казахстан",
    "crm автоматизация Казахстан",
    "ai интеграции Казахстан",
    "веб студия для бизнеса",
  ],
  category: "Services",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/services`,
    siteName: "Code Art",
    title: "Услуги Code Art",
    description:
      "Коммерческие страницы услуг Code Art: разработка сайтов, CRM-автоматизация и AI-интеграции для бизнеса.",
    locale: "ru_KZ",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Услуги Code Art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Услуги Code Art",
    description:
      "Разработка сайтов, CRM-автоматизация и AI-интеграции для бизнеса в Казахстане и СНГ.",
    images: [`${siteUrl}/opengraph-image`],
  },
};

export default function ServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Услуги Code Art",
            item: `${siteUrl}/services`,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/services#webpage`,
        url: `${siteUrl}/services`,
        name: "Услуги Code Art",
        description:
          "Коммерческие страницы услуг Code Art: разработка сайтов, CRM-автоматизация и AI-интеграции для бизнеса.",
        mainEntity: {
          "@type": "ItemList",
          name: "Услуги Code Art",
          itemListElement: servicePages.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${siteUrl}/services/${service.slug}`,
            name: service.title,
          })),
        },
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <div className={styles.backdrop} aria-hidden="true" />

      <div className={styles.shell}>
        <header className={styles.header}>
          <Link href="/" className={styles.brand}>
            <span className={styles.brandMark} aria-hidden="true">
              <BrandMark />
            </span>
            <span className={styles.brandText}>Code-Art</span>
          </Link>

          <Link href="/career" className={styles.headerLink}>
            <span>Карьера</span>
            <ArrowRightIcon />
          </Link>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              <SparkIcon />
              <span>Услуги Code Art</span>
            </span>

            <h1 className={styles.title}>Услуги Code Art для бизнеса</h1>
            <p className={styles.lead}>
              Мы предлагаем разработку сайтов, CRM-автоматизацию и
              AI-интеграции для бизнеса. Помогаем выстроить понятную цифровую
              систему под задачи компании: от упаковки и интерфейсов до
              автоматизации процессов и внедрения AI-инструментов.
            </p>

            <div className={styles.signalRow}>
              {serviceSignals.map((item) => (
                <span key={item} className={styles.signal}>
                  {item}
                </span>
              ))}
            </div>

            <div className={styles.actionRow}>
              <TrackedAnchor
                className={styles.primaryAction}
                href={getWhatsAppHref("ru", "Запрос по услугам Code Art")}
                target="_blank"
                rel="noopener noreferrer"
                eventName="whatsapp_click"
                eventPayload={{ location: "services_hero" }}
              >
                <span>Обсудить задачу</span>
                <ArrowUpRightIcon />
              </TrackedAnchor>

              <Link href="/" className={styles.secondaryAction}>
                <span>На главную</span>
                <ArrowRightIcon />
              </Link>
            </div>
          </div>

          <aside className={styles.heroAside}>
            <div className={styles.statGrid}>
              <StatItem label="Фокус" value="3 ключевые услуги" />
              <StatItem label="Регион" value="Казахстан / СНГ" />
              <StatItem label="Формат" value="Удалённая работа" />
              <StatItem label="Подход" value="Под бизнес-задачу" />
            </div>

            <ul className={styles.miniList}>
              <li>Каждое направление описано отдельно, чтобы было проще быстро понять формат работы.</li>
              <li>Можно перейти сразу к нужной услуге и посмотреть, кому она подходит и что входит в работу.</li>
              <li>Структура страницы собрана так, чтобы клиенту было легче сравнить варианты и принять решение.</li>
            </ul>
          </aside>
        </section>

        <section className={styles.grid3}>
          {servicePages.map((service) => (
            <article key={service.slug} className={styles.serviceCard}>
              <div className={styles.serviceTop}>
                <span className={styles.serviceMeta}>{service.shortTitle}</span>
                <h2>{service.title}</h2>
              </div>

              <p>{service.cardDescription}</p>

              <div className={styles.tagRow}>
                <span className={styles.tag}>{service.audience}</span>
                <span className={styles.tag}>{service.geography}</span>
              </div>

              <div className={styles.serviceLinks}>
                <TrackedLink
                  href={`/services/${service.slug}`}
                  className={styles.serviceLink}
                  eventName="service_card_click"
                  eventPayload={{ slug: service.slug }}
                >
                  <span>Открыть страницу</span>
                  <ArrowRightIcon />
                </TrackedLink>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.grid2}>
          <article className={styles.sectionCard}>
            <h2>Как мы подходим к услугам</h2>
            <ul className={styles.list}>
              {processSteps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={styles.sectionCard}>
            <h2>Что это даёт бизнесу</h2>
            <ul className={styles.list}>
              <li>Проще быстро перейти к нужному направлению и не тратить время на общий обзор всего сразу.</li>
              <li>Каждая услуга объяснена отдельно: задачи, формат, процесс и ожидаемый результат.</li>
              <li>У клиента сразу есть понятная точка входа для обсуждения конкретной задачи.</li>
            </ul>
          </article>
        </section>

        <section className={styles.ctaCard}>
          <div className={styles.ctaCopy}>
            <h2>Нужна не общая презентация, а понятное решение под вашу задачу?</h2>
            <p>
              Можно прийти с конкретным запросом по сайту, CRM или AI-направлению,
              а дальше мы поможем собрать рабочий формат без лишней перегрузки.
            </p>
          </div>

          <TrackedAnchor
            className={styles.primaryAction}
            href={getWhatsAppHref("ru", "Запрос по коммерческой странице услуги")}
            target="_blank"
            rel="noopener noreferrer"
            eventName="whatsapp_click"
            eventPayload={{ location: "services_bottom_cta" }}
          >
            <span>Связаться с нами</span>
            <ArrowUpRightIcon />
          </TrackedAnchor>
        </section>
      </div>
    </main>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.statItem}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
    </div>
  );
}

function BrandMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 5 4 12l5 7" />
      <path d="M15 5l5 7-5 7" />
      <path d="m12.5 4-3 16" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
