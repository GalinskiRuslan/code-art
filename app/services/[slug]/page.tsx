import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWhatsAppHref } from "../../lib/whatsapp";
import { TrackedAnchor, TrackedLink } from "../../components/TrackedLink";
import styles from "../services.module.css";
import { getServicePage, servicePages } from "../service-pages";

const siteUrl = "https://codeart.kz";

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return servicePages.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    return {
      title: "Услуга не найдена",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: { absolute: `${service.title} — Code Art` },
    description: service.metaDescription,
    keywords: [
      service.title,
      ...service.keywords,
      "Code Art",
      "услуги для бизнеса",
    ],
    category: "Services",
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      type: "website",
      url: `${siteUrl}/services/${service.slug}`,
      siteName: "Code Art",
      title: `${service.title} — Code Art`,
      description: service.metaDescription,
      locale: "ru_KZ",
      images: [
        {
          url: `${siteUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} — Code Art`,
      description: service.metaDescription,
      images: [`${siteUrl}/opengraph-image`],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    notFound();
  }

  const relatedPages = servicePages.filter((item) => item.slug !== service.slug);

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
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: `${siteUrl}/services/${service.slug}`,
          },
        ],
      },
      {
        "@type": "Service",
        name: service.title,
        serviceType: service.shortTitle,
        description: service.summary,
        areaServed: service.geography,
        audience: {
          "@type": "Audience",
          audienceType: service.audience,
        },
        provider: {
          "@type": "Organization",
          name: "Code Art",
          url: siteUrl,
          logo: `${siteUrl}/favicon.ico`,
        },
        url: `${siteUrl}/services/${service.slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faq.map((item) => ({
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

          <Link href="/services" className={styles.backLink}>
            <span>Все услуги</span>
            <ArrowRightIcon />
          </Link>
        </header>

        <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
          <Link href="/" className={styles.breadcrumbLink}>
            Главная
          </Link>
          <span>/</span>
          <Link href="/services" className={styles.breadcrumbLink}>
            Услуги
          </Link>
          <span>/</span>
          <span className={styles.breadcrumbCurrent}>{service.shortTitle}</span>
        </nav>

        <section className={styles.detailHero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              <SparkIcon />
              <span>{service.eyebrow}</span>
            </span>

            <h1 className={styles.title}>{service.title}</h1>
            <p className={styles.lead}>{service.summary}</p>

            <div className={styles.signalRow}>
              <span className={styles.signal}>{service.shortTitle}</span>
              <span className={styles.signal}>{service.geography}</span>
            </div>

            <div className={styles.actionRow}>
              <TrackedAnchor
                className={styles.primaryAction}
                href={getWhatsAppHref("ru", service.ctaTopic)}
                target="_blank"
                rel="noopener noreferrer"
                eventName="whatsapp_click"
                eventPayload={{ location: "service_detail_hero", slug: service.slug }}
              >
                <span>Обсудить услугу</span>
                <ArrowUpRightIcon />
              </TrackedAnchor>

              <Link href="/services" className={styles.secondaryAction}>
                <span>Назад к услугам</span>
                <ArrowRightIcon />
              </Link>
            </div>
          </div>

          <aside className={styles.heroAside}>
            <div className={styles.statGrid}>
              <StatItem label="Кому подходит" value={service.audience} />
              <StatItem label="География" value={service.geography} />
              <StatItem label="Формат" value={service.format} />
              <StatItem label="Результат" value={service.results[0]} />
            </div>
          </aside>
        </section>

        <section className={styles.grid2}>
          <article className={styles.sectionCard}>
            <h2>С какими задачами к нам приходят</h2>
            <ul className={styles.list}>
              {service.pains.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={styles.sectionCard}>
            <h2>Что входит в услугу</h2>
            <ul className={styles.list}>
              {service.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className={styles.grid2}>
          <article className={styles.sectionCard}>
            <h2>Как проходит работа</h2>
            <ul className={styles.list}>
              {service.process.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={styles.sectionCard}>
            <h2>Что получает бизнес на выходе</h2>
            <ul className={styles.list}>
              {service.results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className={styles.grid2}>
          {service.faq.map((item) => (
            <article key={item.question} className={styles.faqCard}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </section>

        <section className={styles.grid2}>
          {relatedPages.map((item) => (
            <article key={item.slug} className={styles.serviceCard}>
              <div className={styles.serviceTop}>
                <span className={styles.serviceMeta}>{item.shortTitle}</span>
                <h2>{item.title}</h2>
              </div>

              <p>{item.cardDescription}</p>

              <div className={styles.serviceLinks}>
                <TrackedLink
                  href={`/services/${item.slug}`}
                  className={styles.miniLink}
                  eventName="service_card_click"
                  eventPayload={{ slug: item.slug, location: "related" }}
                >
                  <span>Открыть страницу</span>
                  <ArrowRightIcon />
                </TrackedLink>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.ctaCard}>
          <div className={styles.ctaCopy}>
            <h2>Хотите обсудить именно эту услугу под ваш кейс?</h2>
            <p>
              Можно прийти с черновым запросом, текущим сайтом, CRM или описанием
              процесса. Поможем собрать рабочий формат без лишней теории.
            </p>
          </div>

          <TrackedAnchor
            className={styles.primaryAction}
            href={getWhatsAppHref("ru", `${service.ctaTopic} — нужен расчёт и обсуждение`)}
            target="_blank"
            rel="noopener noreferrer"
            eventName="whatsapp_click"
            eventPayload={{ location: "service_detail_bottom", slug: service.slug }}
          >
            <span>Написать в WhatsApp</span>
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
