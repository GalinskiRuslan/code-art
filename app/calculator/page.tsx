import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorApp } from "./CalculatorApp";
import { applyPricingOverrides, products } from "./data";
import { calculatorFaq } from "./faq";
import { loadCalculatorPricing } from "./pricing-loader";
import styles from "./calculator.module.css";

const siteUrl = "https://codeart.kz";

export const metadata: Metadata = {
  title: {
    absolute:
      "Калькулятор стоимости сайта, веб-приложения и CRM — Code Art",
  },
  description:
    "Онлайн-калькулятор стоимости разработки от Code Art: узнайте цену сайта, интернет-магазина, веб-приложения или CRM за пару минут. Прозрачный расчёт на основе опыта 120+ проектов, без скрытых платежей.",
  keywords: [
    "калькулятор стоимости сайта",
    "калькулятор стоимости разработки",
    "калькулятор стоимости веб-приложения",
    "калькулятор стоимости интернет-магазина",
    "стоимость разработки сайта",
    "стоимость создания сайта",
    "стоимость разработки веб-приложения",
    "стоимость разработки интернет-магазина",
    "стоимость разработки CRM",
    "стоимость AI-интеграции",
    "стоимость MVP",
    "сколько стоит сайт",
    "сколько стоит разработка сайта",
    "сколько стоит интернет-магазин",
    "сколько стоит CRM система",
    "сколько стоит мобильное приложение",
    "цена разработки сайта",
    "цена сайта под ключ",
    "рассчитать стоимость сайта онлайн",
    "рассчитать бюджет на разработку",
    "смета на разработку сайта",
    "прайс на разработку сайта",
    "стоимость лендинга",
    "стоимость корпоративного сайта",
    "стоимость личного кабинета",
    "разработка сайта под ключ цена",
    "экспертная оценка стоимости проекта",
    "веб-студия Казахстан цены",
    "Code Art калькулятор",
  ],
  alternates: {
    canonical: "/calculator",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/calculator`,
    siteName: "Code Art",
    title: "Калькулятор стоимости сайта, веб-приложения и CRM — Code Art",
    description:
      "Соберите конфигурацию проекта и получите предварительную стоимость разработки на основе опыта 120+ реализованных проектов Code Art.",
    locale: "ru_KZ",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Калькулятор стоимости проекта Code Art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Калькулятор стоимости сайта, веб-приложения и CRM — Code Art",
    description:
      "Соберите конфигурацию проекта и получите предварительную стоимость разработки.",
    images: [`${siteUrl}/opengraph-image`],
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

// A function, not a top-level const — must run *after* applyPricingOverrides
// so the offers reflect live (admin-edited) prices rather than whatever
// was hardcoded when this module was first loaded at server boot.
function buildStructuredData() {
  return {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Калькулятор стоимости проекта",
          item: `${siteUrl}/calculator`,
        },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Калькулятор стоимости проекта Code Art",
      description:
        "Интерактивный калькулятор предварительной стоимости разработки сайта, интернет-магазина, веб-приложения, CRM или MVP.",
      url: `${siteUrl}/calculator`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      isAccessibleForFree: true,
      offers: products.map((product) => ({
        "@type": "Offer",
        name: product.name,
        price: product.basePrice,
        priceCurrency: "KZT",
        description: product.shortDescription,
      })),
      provider: {
        "@type": "Organization",
        name: "Code Art",
        url: siteUrl,
      },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/calculator#service`,
      name: "Разработка сайтов, веб-приложений и CRM — Code Art",
      serviceType: "Веб-разработка",
      areaServed: "Kazakhstan",
      provider: {
        "@type": "Organization",
        name: "Code Art",
        url: siteUrl,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Стоимость разработки по типам продуктов",
        itemListElement: products.map((product) => ({
          "@type": "Offer",
          priceCurrency: "KZT",
          price: product.basePrice,
          itemOffered: {
            "@type": "Service",
            name: product.name,
            description: product.shortDescription,
          },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/calculator#faq`,
      mainEntity: calculatorFaq.map((item) => ({
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
}

export default async function CalculatorPage() {
  const pricing = await loadCalculatorPricing();
  applyPricingOverrides(pricing);
  const structuredData = buildStructuredData();

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

          <Link href="/" className={styles.backLink}>
            На главную
          </Link>
        </header>

        <div className={styles.hero}>
          <span className={styles.eyebrow}>Калькулятор Code Art</span>
          <h1 className={styles.title}>Рассчитайте стоимость вашего проекта</h1>
          <p className={styles.subtitle}>
            Соберите нужную конфигурацию, выберите функционал и получите
            предварительную стоимость разработки сайта, интернет-магазина,
            веб-приложения или CRM-системы.
          </p>
          <ul className={styles.heroCredibility}>
            <li>120+ реализованных проектов</li>
            <li>Прозрачное ценообразование без скрытых платежей</li>
            <li>Расчёт основан на реальной экспертизе Code Art</li>
          </ul>
        </div>

        <CalculatorApp pricing={pricing} />

        <PricingFaq />
      </div>
    </main>
  );
}

function PricingFaq() {
  return (
    <section className={styles.faqSection} aria-labelledby="calculator-faq-title">
      <h2 id="calculator-faq-title" className={styles.faqTitle}>
        Частые вопросы о стоимости разработки
      </h2>
      <div className={styles.faqGrid}>
        {calculatorFaq.map((item) => (
          <article key={item.question} className={styles.faqCard}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
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
