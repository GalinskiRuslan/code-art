import type { MetadataRoute } from "next";
import { careerVacancies } from "./career/vacancies";
import { servicePages } from "./services/service-pages";

const siteUrl = "https://codeart.kz";

// Content on these routes isn't timestamped per-entry, so we pin a fixed
// date per section instead of `new Date()` (which lied to crawlers about
// freshness on every single build/deploy). Bump manually when the copy
// actually changes.
const homeLastModified = new Date("2026-06-22");
const careerListLastModified = new Date("2026-06-22");
const servicesListLastModified = new Date("2026-06-22");
const servicePagesLastModified = new Date("2026-06-22");
const worldLastModified = new Date("2026-06-16");
const calculatorLastModified = new Date("2026-07-19");

const homeLanguageAlternates = {
  languages: {
    "ru-KZ": siteUrl,
    en: `${siteUrl}/en`,
  },
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: homeLastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: homeLanguageAlternates,
    },
    {
      url: `${siteUrl}/en`,
      lastModified: homeLastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: homeLanguageAlternates,
    },
    {
      url: `${siteUrl}/career`,
      lastModified: careerListLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: servicesListLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/world`,
      lastModified: worldLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/calculator`,
      lastModified: calculatorLastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...careerVacancies.map((vacancy) => ({
      url: `${siteUrl}/career/${vacancy.slug}`,
      lastModified: new Date(vacancy.postedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...servicePages.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: servicePagesLastModified,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];
}
