import type { Language } from "./i18n";

const whatsappPhone = "77029951886";

export function getWhatsAppHref(language: Language, topic?: string) {
  const message =
    language === "ru"
      ? `Здравствуйте! Хочу обсудить проект с Code Art.${topic ? ` Интересует: ${topic}.` : ""}`
      : `Hello! I would like to discuss a project with Code Art.${topic ? ` Topic: ${topic}.` : ""}`;

  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}
