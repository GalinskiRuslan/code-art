import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getWhatsAppHref } from "../../lib/whatsapp";
import { TrackedAnchor, TrackedLink } from "../../components/TrackedLink";
import styles from "../vacancy.module.css";
import {
  careerVacancies,
  getCareerVacancy,
  getCareerVacancyStructuredDescription,
} from "../vacancies";

const siteUrl = "https://codeart.kz";

type VacancyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return careerVacancies.map((vacancy) => ({
    slug: vacancy.slug,
  }));
}

export async function generateMetadata({
  params,
}: VacancyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const vacancy = getCareerVacancy(slug);

  if (!vacancy) {
    return {
      title: "Вакансия не найдена",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: { absolute: `${vacancy.title} — вакансия в Code Art` },
    description: vacancy.metaDescription,
    keywords: [
      vacancy.title,
      ...vacancy.seoKeywords,
      "удалённая работа",
      "вакансии Code Art",
      "работа в Казахстане",
    ],
    category: "Job posting",
    alternates: {
      canonical: `/career/${vacancy.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${siteUrl}/career/${vacancy.slug}`,
      siteName: "Code Art",
      title: `${vacancy.title} — Code Art`,
      description: vacancy.metaDescription,
      locale: "ru_KZ",
      images: [
        {
          url: `${siteUrl}/career/career-hero.png`,
          width: 1672,
          height: 941,
          alt: vacancy.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${vacancy.title} — Code Art`,
      description: vacancy.metaDescription,
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
}

export default async function CareerVacancyPage({ params }: VacancyPageProps) {
  const { slug } = await params;
  const vacancy = getCareerVacancy(slug);

  if (!vacancy) {
    notFound();
  }

  const relatedVacancy = careerVacancies.find((item) => item.slug !== vacancy.slug);
  const roleLabel = vacancy.tags.includes("Digital-вакансии")
    ? "Удалённая digital-вакансия"
    : "Удалённая IT-вакансия";

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
          {
            "@type": "ListItem",
            position: 3,
            name: vacancy.title,
            item: `${siteUrl}/career/${vacancy.slug}`,
          },
        ],
      },
      {
        "@type": "JobPosting",
        title: vacancy.title,
        description: getCareerVacancyStructuredDescription(vacancy),
        datePosted: vacancy.postedAt,
        validThrough: vacancy.validThrough,
        employmentType: vacancy.employmentTypes,
        industry: "Information Technology",
        occupationalCategory: vacancy.team,
        experienceRequirements: vacancy.level,
        workHours: vacancy.schedule,
        url: `${siteUrl}/career/${vacancy.slug}`,
        jobLocationType: "TELECOMMUTE",
        applicantLocationRequirements: {
          "@type": "Country",
          name: vacancy.applicantCountry,
        },
        identifier: {
          "@type": "PropertyValue",
          name: "Code Art vacancy",
          value: vacancy.slug,
        },
        hiringOrganization: {
          "@type": "Organization",
          name: "Code Art",
          sameAs: siteUrl,
          url: siteUrl,
          logo: `${siteUrl}/favicon.ico`,
        },
        mainEntityOfPage: `${siteUrl}/career/${vacancy.slug}`,
      },
    ],
  };

  return (
    <main className={styles.page}>
      <Script
        id={`career-vacancy-structured-data-${vacancy.slug}`}
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

        <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
          <Link href="/" className={styles.breadcrumbLink}>
            Главная
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link href="/career" className={styles.breadcrumbLink}>
            Карьера
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{vacancy.title}</span>
        </nav>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              <BriefcaseIcon />
              <span>{roleLabel}</span>
            </span>

            <h1 className={styles.title}>{vacancy.title}</h1>
            <p className={styles.lead}>{vacancy.summary}</p>

            <div className={styles.tagRow}>
              {vacancy.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>

            <div className={styles.actions}>
              <TrackedAnchor
                className={styles.primaryAction}
                href={getWhatsAppHref("ru", vacancy.topic)}
                target="_blank"
                rel="noopener noreferrer"
                eventName="whatsapp_click"
                eventPayload={{ location: "vacancy_detail_hero", slug: vacancy.slug }}
              >
                <span>Откликнуться</span>
                <ArrowUpRightIcon />
              </TrackedAnchor>
              <Link className={styles.secondaryAction} href="/career">
                <span>Все вакансии</span>
                <ArrowRightIcon />
              </Link>
            </div>
          </div>

          <aside className={styles.factCard}>
            <div className={styles.factGrid}>
              <FactItem label="Уровень" value={vacancy.level} />
              <FactItem label="Формат" value={vacancy.format} />
              <FactItem label="География" value={vacancy.location} />
              <FactItem label="Команда" value={vacancy.team} />
            </div>

            <div className={styles.scheduleBlock}>
              <span className={styles.scheduleLabel}>Ритм работы</span>
              <p className={styles.scheduleValue}>{vacancy.schedule}</p>
            </div>

            <div className={styles.visualFrame} aria-hidden="true">
              {vacancy.visual === "stack" ? <StackVisual /> : <ChartVisual />}
            </div>
          </aside>
        </section>

        <section className={styles.contentGrid}>
          <article className={styles.contentCard}>
            <h2>Чем заниматься</h2>
            <ul className={styles.list}>
              {vacancy.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={styles.contentCard}>
            <h2>Что ожидаем</h2>
            <ul className={styles.list}>
              {vacancy.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={styles.contentCard}>
            <h2>Будет плюсом</h2>
            <ul className={styles.list}>
              {vacancy.plus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={styles.contentCard}>
            <h2>Что даём со своей стороны</h2>
            <ul className={styles.list}>
              {vacancy.offer.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className={styles.processCard}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>Процесс</p>
            <h2>Как проходит знакомство</h2>
          </div>

          <div className={styles.processList}>
            {vacancy.process.map((item, index) => (
              <article key={item} className={styles.processItem}>
                <span className={styles.processIndex}>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        {relatedVacancy ? (
          <section className={styles.relatedCard}>
            <div className={styles.relatedCopy}>
              <p className={styles.sectionEyebrow}>Соседняя роль</p>
              <h2>{relatedVacancy.title}</h2>
              <p>{relatedVacancy.cardDescription}</p>
            </div>

            <div className={styles.relatedActions}>
              <TrackedLink
                className={styles.relatedLink}
                href={`/career/${relatedVacancy.slug}`}
                eventName="vacancy_card_click"
                eventPayload={{ slug: relatedVacancy.slug, location: "related" }}
              >
                <span>Открыть вакансию</span>
                <ArrowRightIcon />
              </TrackedLink>
            </div>
          </section>
        ) : null}

        <section className={styles.bottomBar}>
          <div className={styles.bottomCopy}>
            <h2>Есть вопросы по формату или хотите обсудить свой опыт?</h2>
            <p>
              Мы открыты к диалогу и по текущим ролям, и по будущему сотрудничеству,
              если ваш профиль близок к нашим digital- и IT-проектам.
            </p>
          </div>

          <TrackedAnchor
            className={styles.primaryAction}
            href={getWhatsAppHref("ru", `Обсудить вакансию: ${vacancy.title}`)}
            target="_blank"
            rel="noopener noreferrer"
            eventName="whatsapp_click"
            eventPayload={{ location: "vacancy_detail_bottom", slug: vacancy.slug }}
          >
            <span>Написать в WhatsApp</span>
            <ArrowUpRightIcon />
          </TrackedAnchor>
        </section>
      </div>
    </main>
  );
}

function FactItem({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.factItem}>
      <span className={styles.factLabel}>{label}</span>
      <span className={styles.factValue}>{value}</span>
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

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 7V5.7C8 4.76 8.76 4 9.7 4h4.6c.94 0 1.7.76 1.7 1.7V7" />
      <rect x="3.5" y="7" width="17" height="12" rx="2.4" />
      <path d="M3.5 11.6h17" />
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
