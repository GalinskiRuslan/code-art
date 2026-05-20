"use client";

import Link from "next/link";

import { getWhatsAppHref } from "../../lib/whatsapp";

const navItems = ["Услуги", "Проекты", "Процесс", "О нас"];

export function SiteHeader() {
  return (
    <header className="site-header" aria-label="Code Art">

      <nav className="site-header-nav" aria-label="Основная навигация">
        {navItems.map((item) => (
          <Link className="site-header-nav-link" href="/" key={item}>
            {item}
          </Link>
        ))}
      </nav>
      <a
        className="site-header-action"
        href={getWhatsAppHref("ru", "Связаться")}
        target="_blank"
        rel="noopener noreferrer"
      >
        Связаться
      </a>
    </header>
  );
}
