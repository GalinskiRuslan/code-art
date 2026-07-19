import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const googleTagManagerId = "GTM-KSCQTMNS";

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
    languages: {
      "ru-KZ": "/",
      en: "/en",
      "x-default": "/",
    },
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${googleTagManagerId}');
            `,
          }}
        />
      </body>
    </html>
  );
}
