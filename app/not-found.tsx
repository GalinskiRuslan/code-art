import type { Metadata } from "next";
import Link from "next/link";
import styles from "./services/services.module.css";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.backdrop} aria-hidden="true" />

      <div className={styles.shell}>
        <header className={styles.header}>
          <Link href="/" className={styles.brand}>
            <span className={styles.brandMark} aria-hidden="true">
              <BrandMark />
            </span>
            <span className={styles.brandText}>Code-Art</span>
          </Link>
        </header>

        <section className={styles.detailHero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              <SparkIcon />
              <span>Ошибка 404</span>
            </span>

            <h1 className={styles.title}>Такой страницы не существует</h1>
            <p className={styles.lead}>
              Ссылка устарела или в адресе опечатка. Ниже — разделы, с которых
              удобно продолжить: главная, услуги или карьера в Code Art.
            </p>

            <div className={styles.actionRow}>
              <Link href="/" className={styles.primaryAction}>
                <span>На главную</span>
                <ArrowUpRightIcon />
              </Link>

              <Link href="/services" className={styles.secondaryAction}>
                <span>Все услуги</span>
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.grid2}>
          <article className={styles.sectionCard}>
            <h2>Услуги Code Art</h2>
            <p>
              Разработка сайтов, веб-приложений, CRM-автоматизация и
              AI-интеграции для бизнеса.
            </p>
            <Link href="/services" className={styles.miniLink}>
              <span>Открыть услуги</span>
              <ArrowRightIcon />
            </Link>
          </article>

          <article className={styles.sectionCard}>
            <h2>Карьера в Code Art</h2>
            <p>
              Открытые вакансии и формат удалённого сотрудничества с командой.
            </p>
            <Link href="/career" className={styles.miniLink}>
              <span>Открыть вакансии</span>
              <ArrowRightIcon />
            </Link>
          </article>
        </section>
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

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
