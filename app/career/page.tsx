import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getWhatsAppHref } from "../lib/whatsapp";
import styles from "./career.module.css";

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

const openings = [
  {
    title: "Разработчик-инженер высоконагруженных систем",
    text:
      "Проектирование backend-решений, работа с архитектурой, API, производительностью и масштабированием.",
    tags: ["Backend", "Highload", "Architecture", "Remote"],
    visual: "stack",
    icon: "code",
    topic: "Карьера: разработчик-инженер высоконагруженных систем",
  },
  {
    title: "Мастер по продвижению digital-проектов",
    text:
      "Стратегия продвижения, реклама, SEO, аналитика и рост digital-проектов через эффективные каналы.",
    tags: ["Marketing", "SEO", "Ads", "Analytics"],
    visual: "chart",
    icon: "megaphone",
    topic: "Карьера: продвижение digital-проектов",
  },
] as const;

export const metadata: Metadata = {
  title: "Карьера в Code Art",
  description:
    "Страница карьеры Code Art: сотрудничество со специалистами, открытые направления, форматы работы и точки входа в команду.",
  alternates: {
    canonical: "/career",
  },
};

export default function CareerPage() {
  return (
    <main className={styles.page}>
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
                <span>Карьера в Code-Art</span>
              </span>

              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleLine}>Сотрудничаем с</span>
                <span className={styles.heroTitleLine}>профессионалами.</span>
                <span className={styles.heroTitleLine}>Делимся опытом.</span>
                <span className={styles.heroTitleLine}>Создаём сильные проекты.</span>
              </h1>

              <p className={styles.heroLead}>
                Мы всегда открыты к сотрудничеству со специалистами, которые
                хотят развиваться, обмениваться экспертизой и работать над
                сильными digital-проектами.
              </p>

              <div className={styles.heroActions}>
                <a
                  className={styles.primaryAction}
                  href={getWhatsAppHref("ru", "Отклик в Code Art")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Откликнуться</span>
                  <ArrowUpRightIcon />
                </a>
                <a
                  className={styles.secondaryAction}
                  href={getWhatsAppHref("ru", "Предложить сотрудничество Code Art")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Предложить сотрудничество</span>
                  <ArrowUpRightIcon />
                </a>
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
            </div>

            <div className={styles.controls} aria-hidden="true">
              <button type="button" className={styles.controlButton} tabIndex={-1}>
                <ArrowLeftIcon />
              </button>
              <button type="button" className={styles.controlButton} tabIndex={-1}>
                <ArrowRightIcon />
              </button>
            </div>
          </div>

          <div className={styles.openingsGrid}>
            {openings.map((item) => (
              <article key={item.title} className={styles.openingCard}>
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
                    <p>{item.text}</p>
                    <div className={styles.tags}>
                      {item.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      className={styles.openingLink}
                      href={getWhatsAppHref("ru", item.topic)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Подробнее</span>
                      <ArrowRightIcon />
                    </a>
                  </div>

                  <div className={styles.openingVisual} aria-hidden="true">
                    {item.visual === "stack" ? <StackVisual /> : <ChartVisual />}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.bottomCta}>
          <div className={styles.bottomIcon}>
            <UsersIcon />
          </div>

          <div className={styles.bottomCopy}>
            <h2>Не нашли подходящую роль?</h2>
            <p>
              Напишите нам — возможно, именно ваш опыт подойдёт для текущих или
              будущих проектов.
            </p>
          </div>

          <a
            className={styles.bottomAction}
            href={getWhatsAppHref("ru", "Не нашёл подходящую роль")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Связаться с нами</span>
            <ArrowUpRightIcon />
          </a>
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

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
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
      <svg viewBox="0 0 200 120" className={styles.chartLine} aria-hidden="true">
        <path d="M20 90 68 70 104 80 142 40 178 24" />
        <circle cx="20" cy="90" r="4" />
        <circle cx="68" cy="70" r="4" />
        <circle cx="104" cy="80" r="4" />
        <circle cx="142" cy="40" r="4" />
        <circle cx="178" cy="24" r="4" />
      </svg>
    </div>
  );
}
