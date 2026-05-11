"use client";

import Link from "next/link";

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
      <Link className="site-header-action" href="/">
        Связаться
      </Link>
    </header>
  );
}
