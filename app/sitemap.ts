import type { MetadataRoute } from "next";
import { careerVacancies } from "./career/vacancies";

const siteUrl = "https://codeart.kz";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/career`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...careerVacancies.map((vacancy) => ({
      url: `${siteUrl}/career/${vacancy.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
