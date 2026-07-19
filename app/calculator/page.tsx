import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalculatorApp } from "./CalculatorApp";
import styles from "./calculator.module.css";

const siteUrl = "https://codeart.kz";

export const metadata: Metadata = {
  title: { absolute: "Калькулятор стоимости проекта — Code Art" },
  description:
    "Соберите конфигурацию проекта — тип продукта, дизайн, функционал, домен и хостинг — и получите предварительную стоимость разработки от Code Art.",
  keywords: [
    "калькулятор стоимости сайта",
    "стоимость разработки сайта",
    "рассчитать стоимость сайта",
    "калькулятор интернет-магазина",
    "Code Art",
  ],
  alternates: {
    canonical: "/calculator",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/calculator`,
    siteName: "Code Art",
    title: "Калькулятор стоимости проекта — Code Art",
    description:
      "Соберите конфигурацию проекта и получите предварительную стоимость разработки.",
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
    title: "Калькулятор стоимости проекта — Code Art",
    description:
      "Соберите конфигурацию проекта и получите предварительную стоимость разработки.",
    images: [`${siteUrl}/opengraph-image`],
  },
};

const structuredData = {
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
      url: `${siteUrl}/calculator`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        priceCurrency: "KZT",
        price: "120000",
      },
      provider: {
        "@type": "Organization",
        name: "Code Art",
        url: siteUrl,
      },
    },
  ],
};

export default function CalculatorPage() {
  return (
    <main className={styles.page}>
      <Script
        id="calculator-structured-data"
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
            предварительную стоимость разработки.
          </p>
        </div>

        <CalculatorApp />
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
