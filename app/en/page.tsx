import type { Metadata } from "next";
import { HomePage } from "../components/site/HomePage";

export const metadata: Metadata = {
  title: {
    absolute: "Code Art — website, web app, CRM and AI integration development",
  },
  description:
    "Code Art builds corporate websites, web applications, UX/UI design, CRM automation, AI integrations, and support for digital products.",
  keywords: [
    "web development Kazakhstan",
    "web studio Kazakhstan",
    "website development",
    "corporate website",
    "web applications",
    "CRM automation",
    "AI integration",
    "UX UI design",
    "website technical support",
    "Code Art",
  ],
  alternates: {
    canonical: "/en",
    languages: {
      "ru-KZ": "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ru_KZ"],
    url: "https://codeart.kz/en",
    siteName: "Code Art",
    title: "Code Art — website, web app, CRM and AI integration development",
    description:
      "Full-cycle web studio: websites, web applications, UX/UI, CRM automation, AI integrations, and project support.",
    images: [
      {
        url: "/en/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Code Art — full-cycle web studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Art — website, web app, CRM and AI integration development",
    description:
      "We build websites, web applications, AI integrations, CRM automation, and support digital products.",
    images: ["/en/opengraph-image"],
  },
};

export default function EnglishHomePage() {
  return <HomePage language="en" />;
}
