import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { getWhatsAppHref } from "../lib/whatsapp";
import { TrackedAnchor, TrackedLink } from "../components/TrackedLink";
import styles from "./career.module.css";
import {
  careerVacancies,
  getCareerVacancyStructuredDescription,
} from "./vacancies";

const siteUrl = "https://codeart.kz";

const benefits = [
  {
    title: "Реальные проекты",
    text: "CRM, сайты, автоматизация, AI-интеграции и digital-продукты.",
    number: "01",
    icon: "briefcase",
  },
  {
    title: "Обмен опытом",
    text: "Обсуждаем архитектуру, подходы, инструменты и растём вместе.",
    number: "02",
    icon: "people",
  },
  {
    title: "Гибкий формат",
    text: "Удалённая работа, проектная занятость и долгосрочное сотрудничество.",
    number: "03",
    icon: "device",
  },
] as const;

const heroSignals = [
  "Удалённая работа",
  "IT-вакансии",
  "Digital-вакансии",
  "Казахстан и СНГ",
] as const;

const careerHighlights = [
  {
    title: "Удалённая работа с понятным форматом",
    text: "Мы ищем специалистов, которым важны результат, качество работы и нормальная коммуникация. Без лишней бюрократии и без искусственно раздутых процессов.",
  },
  {
    title: "IT- и digital-вакансии под реальные проекты",
    text: "На странице собраны вакансии, связанные с реальными задачами бизнеса: backend, CRM, AI-интеграции, маркетинг, growth и digital-продвижение.",
  },
  {
    title: "Отдельные страницы ролей с подробным описанием",
    text: "У каждой роли есть своя страница с обязанностями, требованиями, форматом работы и понятной точкой входа для отклика.",
  },
] as const;

const careerFaq = [
  {
    question: "Можно ли откликнуться без готового резюме?",
    answer:
      "Да. Можно прислать краткое описание опыта, стек, ссылки на кейсы и проекты. Для первого контакта этого достаточно.",
  },
  {
    question: "Вы рассматриваете специалистов только из Казахстана?",
    answer:
      "Основной фокус — Казахстан и СНГ. Для удалённой работы нам важнее совпадение по профилю, опыту и рабочему ритму.",
  },
  {
    question: "Какие направления сейчас открыты?",
    answer:
      "Сейчас открыты backend-направление для высоконагруженных систем и роль по продвижению digital-проектов, но мы также открыты к сильным релевантным специалистам смежных направлений.",
  },
] as const;

export const metadata: Metadata = {
  title: { absolute: "Карьера в Code Art" },
  description:
    "Карьера в Code Art: удалённая работа, IT-вакансии, digital-вакансии и сотрудничество со специалистами из Казахстана и СНГ.",
  keywords: [
    "карьера в Code Art",
    "вакансии Code Art",
    "удалённая работа Казахстан",
    "IT-вакансии Казахстан",
    "digital вакансии Казахстан",
    "backend вакансии удалённо",
    "marketing вакансии удалённо",
    "работа в digital компании",
  ],
  category: "Careers",
  alternates: {
    canonical: "/career",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/career`,
    siteName: "Code Art",
    title: "Карьера в Code Art",
    description:
      "Удалённая работа, IT-вакансии, digital-роли и сотрудничество над сильными проектами в Code Art.",
    locale: "ru_KZ",
    images: [
      {
        url: `${siteUrl}/career/career-hero.png`,
        width: 1672,
        height: 941,
        alt: "Карьера в Code Art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Карьера в Code Art",
    description:
      "Удалённая работа, IT-вакансии, digital-роли и сотрудничество над сильными проектами в Code Art.",
    images: [`${siteUrl}/career/career-hero.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function CareerPage() {
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
            name: "Карьера в Code Art",
            item: `${siteUrl}/career`,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/career#webpage`,
        url: `${siteUrl}/career`,
        name: "Карьера в Code Art",
        description:
          "Страница карьеры Code Art с удалённой работой, IT-вакансиями, digital-вакансиями и форматами сотрудничества.",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@type": "Organization",
          name: "Code Art",
          url: siteUrl,
        },
        inLanguage: "ru-KZ",
        mainEntity: {
          "@type": "ItemList",
          name: "Открытые вакансии Code Art",
          itemListElement: careerVacancies.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "JobPosting",
              title: item.title,
              description: getCareerVacancyStructuredDescription(item),
              url: `${siteUrl}/career/${item.slug}`,
              datePosted: item.postedAt,
              validThrough: item.validThrough,
              employmentType: item.employmentTypes,
              jobLocationType: "TELECOMMUTE",
              applicantLocationRequirements: {
                "@type": "Country",
                name: item.applicantCountry,
              },
              identifier: {
                "@type": "PropertyValue",
                name: "Code Art vacancy",
                value: item.slug,
              },
              hiringOrganization: {
                "@type": "Organization",
                name: "Code Art",
                sameAs: siteUrl,
                logo: `${siteUrl}/favicon.ico`,
              },
            },
          })),
        },
      },
    ],
  };

  return (
    <main className={styles.page}>
      <Script
        id="career-structured-data"
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
        </header>

        <section className={styles.heroCard}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.heroPill}>
                <UsersIcon />
                <span>Карьера и вакансии в Code-Art</span>
              </span>

              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleLine}>Сотрудничаем с</span>
                <span className={styles.heroTitleLine}>профессионалами.</span>
                <span className={styles.heroTitleLine}>Делимся опытом.</span>
                <span className={styles.heroTitleLine}>
                  Создаём сильные проекты.
                </span>
              </h1>

              <p className={styles.heroLead}>
                Открыты к сотрудничеству со специалистами, которым важны
                удалённая работа, сильные IT-вакансии, digital-задачи и реальные
                проекты: сайты, CRM, AI-интеграции и growth-направления.
              </p>

              <div className={styles.heroSignals}>
                {heroSignals.map((item) => (
                  <span key={item} className={styles.heroSignal}>
                    {item}
                  </span>
                ))}
              </div>

              <div className={styles.heroActions}>
                <TrackedAnchor
                  className={styles.primaryAction}
                  href={getWhatsAppHref("ru", "Отклик в Code Art")}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="whatsapp_click"
                  eventPayload={{ location: "career_hero_apply" }}
                >
                  <span>Откликнуться</span>
                  <ArrowUpRightIcon />
                </TrackedAnchor>
                <TrackedAnchor
                  className={styles.secondaryAction}
                  href={getWhatsAppHref(
                    "ru",
                    "Предложить сотрудничество Code Art",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="whatsapp_click"
                  eventPayload={{ location: "career_hero_cooperate" }}
                >
                  <span>Предложить сотрудничество</span>
                  <ArrowUpRightIcon />
                </TrackedAnchor>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroVisualGlow} aria-hidden="true" />
              <Image
                src="/career/career-hero.png"
                alt="Команда за круглым столом в цифровой среде с интерфейсами и аналитикой"
                fill
                priority
                sizes="(max-width: 1080px) 100vw, 52vw"
                className={styles.heroImage}
              />
            </div>
          </div>

          <div className={styles.benefitsGrid}>
            {benefits.map((item) => (
              <article key={item.title} className={styles.benefitCard}>
                <span className={styles.benefitIcon}>
                  {item.icon === "briefcase" ? <BriefcaseIcon /> : null}
                  {item.icon === "people" ? <UsersIcon /> : null}
                  {item.icon === "device" ? <DeviceIcon /> : null}
                </span>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
                <div className={styles.benefitFooter}>
                  <span className={styles.benefitArrow}>
                    <ArrowRightIcon />
                  </span>
                  <span className={styles.benefitNumber}>{item.number}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.openingsSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>
                <span className={styles.sectionDot} aria-hidden="true" />
                Вакансии
              </p>
              <h2>Открытые направления</h2>
              <p className={styles.sectionIntro}>
                Сейчас в работе две удалённые роли: backend-направление для
                сложных систем и growth-маркетинг для digital-проектов.
              </p>
            </div>
          </div>

          <div className={styles.openingsGrid}>
            {careerVacancies.map((item) => (
              <article key={item.slug} className={styles.openingCard}>
                <div className={styles.openingTop}>
                  <span className={styles.openingIcon}>
                    {item.icon === "code" ? <CodeIcon /> : <MegaphoneIcon />}
                  </span>
                  <span className={styles.openingStar} aria-hidden="true">
                    <StarIcon />
                  </span>
                </div>

                <div className={styles.openingContent}>
                  <div className={styles.openingCopy}>
                    <h3>{item.title}</h3>
                    <p>{item.cardDescription}</p>

                    <div className={styles.openingFacts}>
                      <span className={styles.openingFact}>
                        {item.location}
                      </span>
                      <span className={styles.openingFact}>{item.format}</span>
                    </div>

                    <div className={styles.tags}>
                      {item.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <TrackedLink
                      className={styles.openingLink}
                      href={`/career/${item.slug}`}
                      eventName="vacancy_card_click"
                      eventPayload={{ slug: item.slug }}
                    >
                      <span>Подробнее</span>
                      <ArrowRightIcon />
                    </TrackedLink>
                  </div>

                  <div className={styles.openingVisual} aria-hidden="true">
                    {item.visual === "stack" ? (
                      <StackVisual />
                    ) : (
                      <ChartVisual />
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.insightsSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>
              <span className={styles.sectionDot} aria-hidden="true" />О формате
            </p>
            <h2>Что важно на этой странице</h2>
            <p className={styles.sectionIntro}>
              Здесь собраны понятные описания ролей, формата сотрудничества и
              открытых направлений, чтобы специалист мог быстро оценить,
              подходит ли ему работа с Code Art.
            </p>
          </div>

          <div className={styles.insightsGrid}>
            {careerHighlights.map((item) => (
              <article key={item.title} className={styles.insightCard}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>
              <span className={styles.sectionDot} aria-hidden="true" />
              Частые вопросы
            </p>
            <h2>Ответы для кандидатов</h2>
          </div>

          <div className={styles.faqGrid}>
            {careerFaq.map((item) => (
              <article key={item.question} className={styles.faqCard}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}

            <article className={styles.faqCard}>
              <h3>Какие страницы вакансий уже опубликованы?</h3>
              <p>
                Сейчас доступны{" "}
                <Link href="/career/highload-systems-engineer">
                  отдельная страница вакансии backend-инженера
                </Link>{" "}
                и{" "}
                <Link href="/career/digital-project-growth-marketer">
                  отдельная страница вакансии digital-специалиста по росту
                </Link>
                .
              </p>
            </article>
          </div>
        </section>

        <section className={styles.bottomCta}>
          <div className={styles.bottomIcon}>
            <UsersIcon />
          </div>

          <div className={styles.bottomCopy}>
            <h2>Не нашли подходящую удалённую роль?</h2>
            <p>
              Напишите нам. Возможно, именно ваш опыт подойдёт для текущих или
              будущих IT- и digital-проектов Code Art.
            </p>
          </div>

          <TrackedAnchor
            className={styles.bottomAction}
            href={getWhatsAppHref("ru", "Не нашёл подходящую роль")}
            target="_blank"
            rel="noopener noreferrer"
            eventName="whatsapp_click"
            eventPayload={{ location: "career_bottom_cta" }}
          >
            <span>Связаться с нами</span>
            <ArrowUpRightIcon />
          </TrackedAnchor>
        </section>
      </div>
    </main>
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

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 7V5.7C8 4.76 8.76 4 9.7 4h4.6c.94 0 1.7.76 1.7 1.7V7" />
      <rect x="3.5" y="7" width="17" height="12" rx="2.4" />
      <path d="M3.5 11.6h17" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 18.7c1.1-2.6 3.35-4.2 6.5-4.2s5.4 1.6 6.5 4.2" />
    </svg>
  );
}

function DeviceIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="5" width="14" height="10" rx="2" />
      <path d="M9 19h6" />
      <path d="M7 15.5h10" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 6 4 12l5 6" />
      <path d="m15 6 5 6-5 6" />
      <path d="m13 4-3 16" />
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 13.8v-3.6a1.7 1.7 0 0 1 1.7-1.7h2.4L16 5v14l-7.4-3.5H6.2a1.7 1.7 0 0 1-1.7-1.7Z" />
      <path d="m10 15.8 1.6 3.2" />
      <path d="M18.5 9.2a4 4 0 0 1 0 5.6" />
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

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 4 2.15 4.72 5.1.52-3.8 3.52.98 5.04L12 15.25 7.57 17.8l.98-5.04-3.8-3.52 5.1-.52Z" />
    </svg>
  );
}

function StackVisual() {
  return (
    <div className={styles.stackVisual}>
      <span className={styles.stackPlatform} />
      <span className={styles.stackTowerOne}>
        <i />
        <i />
        <i />
      </span>
      <span className={styles.stackTowerTwo}>
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className={styles.stackBeam} />
    </div>
  );
}

function ChartVisual() {
  return (
    <div className={styles.chartVisual}>
      <span className={styles.chartGrid} />
      <span className={styles.chartBarOne} />
      <span className={styles.chartBarTwo} />
      <span className={styles.chartBarThree} />
      <span className={styles.chartBarFour} />
      <svg
        viewBox="0 0 200 120"
        className={styles.chartLine}
        aria-hidden="true"
      >
        <path d="M20 90 68 70 104 80 142 40 178 24" />
        <circle cx="20" cy="90" r="4" />
        <circle cx="68" cy="70" r="4" />
        <circle cx="104" cy="80" r="4" />
        <circle cx="142" cy="40" r="4" />
        <circle cx="178" cy="24" r="4" />
      </svg>
      <button id="ga4-test-button" type="button">
        Отправить тестовое событие
      </button>
    </div>
  );
}
