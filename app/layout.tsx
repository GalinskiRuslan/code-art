import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codeart.kz"),
  applicationName: "Code Art",
  title: {
    default:
      "Code Art — разработка сайтов, веб-приложений, CRM и AI-интеграций",
    template: "%s | Code Art",
  },
  description:
    "Code Art создает корпоративные сайты, веб-приложения, UX/UI-дизайн, CRM-автоматизацию, AI-интеграции и поддержку цифровых продуктов для бизнеса.",
  keywords: [
    "разработка сайтов Казахстан",
    "веб студия Казахстан",
    "создание сайтов",
    "корпоративный сайт",
    "веб-приложения",
    "CRM автоматизация",
    "AI интеграция",
    "UX UI дизайн",
    "техническая поддержка сайта",
    "Code Art",
  ],
  authors: [{ name: "Code Art", url: "https://codeart.kz" }],
  creator: "Code Art",
  publisher: "Code Art",
  category: "Web development",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    alternateLocale: ["en_US"],
    url: "https://codeart.kz/",
    siteName: "Code Art",
    title:
      "Code Art — разработка сайтов, веб-приложений, CRM и AI-интеграций",
    description:
      "Веб-студия полного цикла: сайты, веб-приложения, UX/UI, CRM-автоматизация, AI-интеграции и поддержка проектов.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Code Art — веб-студия полного цикла",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Code Art — разработка сайтов, веб-приложений, CRM и AI-интеграций",
    description:
      "Создаем сайты, веб-приложения, AI-интеграции, CRM-автоматизацию и поддерживаем цифровые продукты.",
    images: ["/opengraph-image"],
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  other: {
    "geo.region": "KZ",
    "geo.placename": "Kazakhstan",
    "format-detection": "telephone=no",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#09070b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
