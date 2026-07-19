import Link from "next/link";

import type { Language } from "../../lib/i18n";
import { homeContent } from "../../lib/home-content";
import { LandingShell } from "./LandingShell";

const siteUrl = "https://codeart.kz";

export function HomePage({ language }: { language: Language }) {
  const content = homeContent[language];
  const pageUrl = language === "ru" ? siteUrl : `${siteUrl}/en`;

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
        description: content.orgDescription,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Code Art",
        inLanguage: content.inLanguage,
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: content.webpageName,
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: content.inLanguage,
        description: content.webpageDescription,
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
          name: content.offerCatalogName,
          itemListElement: content.services.map((service) => ({
            "@type": "Offer",
            ...(service.href ? { url: `${siteUrl}${service.href}` } : {}),
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.text,
              ...(service.href ? { url: `${siteUrl}${service.href}` } : {}),
              provider: {
                "@id": `${siteUrl}/#organization`,
              },
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: content.faq.map((item) => ({
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <LandingShell language={language} />
      <SeoContent language={language} />
    </>
  );
}

function SeoContent({ language }: { language: Language }) {
  const content = homeContent[language];

  return (
    <section className="seo-content">
      <div className="seo-content-inner">
        <details className="seo-details">
          <summary className="seo-summary">
            <span className="seo-summary-chevron" aria-hidden="true">
              ⌄
            </span>
            <span className="seo-eyebrow">{content.eyebrow}</span>
            <span className="seo-summary-title">
              {content.detailsToggleLabel}
            </span>
          </summary>

          <div className="seo-details-body">
            <h2 id="seo-title" className="seo-title">
              {content.title}
            </h2>
            <p className="seo-lead">{content.lead}</p>

            <div className="seo-services" aria-label={content.servicesAriaLabel}>
              {content.services.map((service) => (
                <article key={service.title}>
                  <h2>
                    {service.href ? (
                      <Link href={service.href}>{service.title}</Link>
                    ) : (
                      service.title
                    )}
                  </h2>
                  <p>{service.text}</p>
                </article>
              ))}
            </div>

            <div className="seo-process">
              <div>
                <h2>{content.processTitle}</h2>
                <p>{content.processText}</p>
              </div>
              <ul>
                {content.processSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>

            <div className="seo-process">
              <div>
                <h2>{content.careerTitle}</h2>
                <p>{content.careerText}</p>
              </div>
              <ul>
                {content.careerLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="seo-process">
              <div>
                <h2>{content.servicesPageTitle}</h2>
                <p>{content.servicesPageText}</p>
              </div>
              <ul>
                {content.servicesLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="seo-faq" aria-label={content.faqAriaLabel}>
              {content.faq.map((item) => (
                <article key={item.question}>
                  <h2>{item.question}</h2>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}
