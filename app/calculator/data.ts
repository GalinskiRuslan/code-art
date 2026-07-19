import type {
  CalculatorOption,
  CalculatorProduct,
  DesignTier,
  ExtraService,
  HostingOption,
  OptionCategoryId,
  SupportTier,
} from "./types";

export const products: CalculatorProduct[] = [
  {
    id: "landing",
    name: "Лендинг",
    shortDescription: "Одностраничный сайт под продукт, услугу или мероприятие.",
    basePrice: 120_000,
    minDays: 7,
    maxDays: 14,
    includedSummary: [
      "главная страница (посадочная)",
      "форма заявки",
      "адаптивная версия",
      "базовая SEO-настройка",
    ],
  },
  {
    id: "corporate",
    name: "Корпоративный сайт",
    shortDescription: "Многостраничный сайт-визитка компании с каталогом услуг.",
    basePrice: 250_000,
    minDays: 7,
    maxDays: 30,
    includedSummary: [
      "главная страница",
      "страницы услуг и о компании",
      "страница контактов",
      "административная панель",
      "адаптивная версия",
      "базовая SEO-настройка",
    ],
  },
  {
    id: "ecommerce",
    name: "Интернет-магазин",
    shortDescription:
      "Каталог, корзина, оформление заказа, личный кабинет и управление товарами.",
    basePrice: 600_000,
    minDays: 30,
    maxDays: 60,
    includedSummary: [
      "главная страница",
      "каталог",
      "карточка товара",
      "корзина",
      "оформление заказа",
      "административная панель",
      "адаптивная версия",
      "базовая SEO-настройка",
    ],
  },
  {
    id: "webservice",
    name: "Веб-сервис",
    shortDescription:
      "Сервис с пользовательскими сценариями, личным кабинетом и внутренней логикой.",
    basePrice: 800_000,
    minDays: 35,
    maxDays: 80,
    includedSummary: [
      "главная страница",
      "регистрация и авторизация",
      "личный кабинет",
      "административная панель",
      "адаптивная версия",
      "базовая SEO-настройка",
    ],
  },
  {
    id: "mvp",
    name: "MVP стартапа",
    shortDescription: "Первый полноценный продукт для проверки бизнес-гипотезы.",
    basePrice: 1_200_000,
    minDays: 60,
    maxDays: 120,
    includedSummary: [
      "главная страница",
      "регистрация и авторизация",
      "личный кабинет",
      "административная панель",
      "аналитическая панель",
      "адаптивная версия",
    ],
  },
  {
    id: "account",
    name: "Личный кабинет",
    shortDescription:
      "Веб-приложение с личным кабинетом, ролями и управлением данными пользователей.",
    basePrice: 500_000,
    minDays: 20,
    maxDays: 60,
    includedSummary: [
      "регистрация и авторизация",
      "личный кабинет",
      "роли и права доступа",
      "административная панель",
      "адаптивная версия",
    ],
  },
];

export const includedPages = 5;
export const pagePrice = 25_000;

export const designTiers: DesignTier[] = [
  {
    id: "ready",
    name: "Готовый дизайн",
    description: "Используется готовая структура с адаптацией цветов, шрифтов и контента.",
    price: 0,
  },
  {
    id: "template",
    name: "Дизайн на основе шаблона",
    description: "Переработка структуры, компонентов и визуального оформления.",
    price: 100_000,
  },
  {
    id: "custom",
    name: "Индивидуальный дизайн",
    description: "Уникальный интерфейс, прототипирование и подготовка дизайн-системы.",
    price: 250_000,
  },
  {
    id: "premium",
    name: "Премиальный дизайн",
    description:
      "Исследование конкурентов, UX-проектирование, анимации, дизайн-система и несколько концепций.",
    price: 450_000,
  },
];

export const optionCategories: Array<{ id: OptionCategoryId; title: string }> = [
  { id: "users", title: "Пользователи" },
  { id: "catalog", title: "Каталог и продажи" },
  { id: "communications", title: "Коммуникации" },
  { id: "content", title: "Управление контентом" },
  { id: "advanced", title: "Сложные функции" },
];

export const calculatorOptions: CalculatorOption[] = [
  // Пользователи
  {
    id: "auth",
    categoryId: "users",
    name: "Регистрация и авторизация",
    description: "Базовый вход и регистрация пользователей по email или телефону.",
    price: 80_000,
    includedInProductIds: ["webservice", "mvp", "account"],
  },
  {
    id: "google-auth",
    categoryId: "users",
    name: "Вход через Google",
    description: "Быстрый вход в один клик через Google-аккаунт.",
    price: 40_000,
    requiredOptionIds: ["auth"],
  },
  {
    id: "phone-verify",
    categoryId: "users",
    name: "Подтверждение телефона",
    description: "Проверка номера телефона по SMS-коду при регистрации.",
    price: 60_000,
    requiredOptionIds: ["auth"],
  },
  {
    id: "personal-account",
    categoryId: "users",
    name: "Личный кабинет",
    description: "Раздел с профилем, историей действий и настройками пользователя.",
    price: 120_000,
    requiredOptionIds: ["auth"],
    includedInProductIds: ["webservice", "mvp", "account"],
  },
  {
    id: "roles",
    categoryId: "users",
    name: "Роли и права доступа",
    description: "Разграничение прав между администратором, менеджером и клиентом.",
    price: 100_000,
    requiredOptionIds: ["auth"],
    includedInProductIds: ["account"],
  },
  {
    id: "password-reset",
    categoryId: "users",
    name: "Восстановление пароля",
    description: "Сброс и восстановление доступа по email или SMS.",
    price: 30_000,
    requiredOptionIds: ["auth"],
  },

  // Каталог и продажи
  {
    id: "catalog",
    categoryId: "catalog",
    name: "Каталог товаров или услуг",
    description: "Структурированный список товаров или услуг с карточками.",
    price: 100_000,
    includedInProductIds: ["ecommerce"],
  },
  {
    id: "filters",
    categoryId: "catalog",
    name: "Фильтры и сортировка",
    description: "Фильтрация каталога по параметрам и сортировка результатов.",
    price: 70_000,
    requiredOptionIds: ["catalog"],
  },
  {
    id: "search",
    categoryId: "catalog",
    name: "Поиск",
    description: "Поиск по каталогу или содержимому сайта.",
    price: 50_000,
    requiredOptionIds: ["catalog"],
  },
  {
    id: "favorites",
    categoryId: "catalog",
    name: "Избранное",
    description: "Возможность сохранять товары или услуги в список избранного.",
    price: 40_000,
    requiredOptionIds: ["catalog", "personal-account"],
  },
  {
    id: "cart",
    categoryId: "catalog",
    name: "Корзина",
    description: "Добавление товаров в корзину перед оформлением заказа.",
    price: 90_000,
    requiredOptionIds: ["catalog"],
    includedInProductIds: ["ecommerce"],
  },
  {
    id: "checkout",
    categoryId: "catalog",
    name: "Оформление заказа",
    description: "Пошаговое оформление заказа с выбором доставки и оплаты.",
    price: 90_000,
    requiredOptionIds: ["cart"],
    includedInProductIds: ["ecommerce"],
  },
  {
    id: "promocodes",
    categoryId: "catalog",
    name: "Промокоды",
    description: "Скидочные коды и промоакции при оформлении заказа.",
    price: 60_000,
    requiredOptionIds: ["cart"],
  },
  {
    id: "online-payment",
    categoryId: "catalog",
    name: "Онлайн-оплата",
    description: "Приём платежей картой и через платёжные сервисы прямо на сайте.",
    price: 100_000,
    requiredOptionIds: ["cart"],
  },
  {
    id: "order-history",
    categoryId: "catalog",
    name: "История заказов",
    description: "Список прошлых заказов пользователя в личном кабинете.",
    price: 60_000,
    requiredOptionIds: ["auth", "personal-account", "checkout"],
  },

  // Коммуникации
  {
    id: "feedback-form",
    categoryId: "communications",
    name: "Форма обратной связи",
    description: "Форма для обращений и заявок с отправкой на почту.",
    price: 20_000,
  },
  {
    id: "email-notify",
    categoryId: "communications",
    name: "Email-уведомления",
    description: "Автоматические письма о заказах, заявках и действиях в системе.",
    price: 40_000,
  },
  {
    id: "sms-notify",
    categoryId: "communications",
    name: "SMS-уведомления",
    description: "Автоматические SMS о статусе заказа или заявки.",
    price: 60_000,
  },
  {
    id: "whatsapp-integration",
    categoryId: "communications",
    name: "WhatsApp-интеграция",
    description: "Приём заявок и уведомления клиентов через WhatsApp.",
    price: 80_000,
  },
  {
    id: "internal-chat",
    categoryId: "communications",
    name: "Внутренний чат",
    description: "Чат между пользователем и командой прямо внутри продукта.",
    price: 180_000,
    requiredOptionIds: ["auth"],
  },
  {
    id: "push-notify",
    categoryId: "communications",
    name: "Push-уведомления",
    description: "Push-уведомления в браузере или мобильном приложении.",
    price: 120_000,
  },

  // Управление контентом
  {
    id: "admin-panel",
    categoryId: "content",
    name: "Административная панель",
    description: "Панель управления содержимым, заказами и пользователями.",
    price: 150_000,
    includedInProductIds: ["corporate", "ecommerce", "webservice", "mvp", "account"],
  },
  {
    id: "page-management",
    categoryId: "content",
    name: "Управление страницами",
    description: "Создание и редактирование произвольных страниц сайта.",
    price: 70_000,
    requiredOptionIds: ["admin-panel"],
  },
  {
    id: "blog",
    categoryId: "content",
    name: "Блог или новости",
    description: "Раздел с публикациями, категориями и датами.",
    price: 70_000,
    requiredOptionIds: ["admin-panel"],
  },
  {
    id: "user-management",
    categoryId: "content",
    name: "Управление пользователями",
    description: "Просмотр, блокировка и редактирование пользователей из админки.",
    price: 80_000,
    requiredOptionIds: ["admin-panel", "auth"],
  },
  {
    id: "content-moderation",
    categoryId: "content",
    name: "Модерация контента",
    description: "Проверка и одобрение пользовательского контента перед публикацией.",
    price: 90_000,
    requiredOptionIds: ["admin-panel"],
  },
  {
    id: "analytics-panel",
    categoryId: "content",
    name: "Аналитическая панель",
    description: "Сводная статистика по продажам, пользователям и активности.",
    price: 120_000,
    requiredOptionIds: ["admin-panel"],
    includedInProductIds: ["mvp"],
  },

  // Сложные функции
  {
    id: "booking",
    categoryId: "advanced",
    name: "Онлайн-бронирование",
    description:
      "Пользователь выбирает услугу, дату и свободное время. Владелец получает заявку и подтверждает бронирование. Включает: календарь доступности, статусы бронирования, уведомления, управление заявками.",
    price: 150_000,
  },
  {
    id: "calendar-schedule",
    categoryId: "advanced",
    name: "Календарь и расписание",
    description: "Отображение расписания событий, занятий или сеансов.",
    price: 120_000,
  },
  {
    id: "reviews",
    categoryId: "advanced",
    name: "Система отзывов",
    description: "Отзывы и оценки от пользователей с привязкой к профилю.",
    price: 70_000,
    requiredOptionIds: ["personal-account"],
  },
  {
    id: "ratings",
    categoryId: "advanced",
    name: "Рейтинг пользователей",
    description: "Рейтинг товаров, услуг или исполнителей на основе оценок.",
    price: 70_000,
    requiredOptionIds: ["personal-account"],
  },
  {
    id: "maps-geo",
    categoryId: "advanced",
    name: "Карты и геолокация",
    description: "Карта с точками, расчёт расстояния и определение местоположения.",
    price: 100_000,
  },
  {
    id: "subscriptions",
    categoryId: "advanced",
    name: "Подписки и тарифы",
    description: "Регулярные платежи, тарифные планы и управление подпиской.",
    price: 180_000,
    requiredOptionIds: ["online-payment"],
  },
  {
    id: "marketplace",
    categoryId: "advanced",
    name: "Маркетплейс с поставщиками",
    description: "Несколько продавцов на одной площадке со своими каталогами и заказами.",
    price: 350_000,
    requiredOptionIds: ["catalog", "personal-account", "admin-panel"],
  },
  {
    id: "recommendation-system",
    categoryId: "advanced",
    name: "Рекомендательная система",
    description: "Персональные рекомендации товаров или контента на основе поведения.",
    price: null,
    priceFrom: 250_000,
    requiredOptionIds: ["catalog"],
  },
  {
    id: "ai-features",
    categoryId: "advanced",
    name: "AI-функции",
    description: "AI-ассистенты, генерация контента, умный поиск и другие AI-сценарии.",
    price: null,
    priceFrom: 250_000,
  },
];

export const multilingualOptionId = "multilingual";
export const multilingualPricePerLanguage = 80_000;

export const domainZones: Array<{
  id: "kz" | "com";
  name: string;
  rangeLabel: string;
  yearlyEstimate: number;
}> = [
  { id: "kz", name: "Домен .kz", rangeLabel: "7 000–12 000 ₸ в год", yearlyEstimate: 10_000 },
  { id: "com", name: "Домен .com", rangeLabel: "8 000–15 000 ₸ в год", yearlyEstimate: 12_000 },
];

export const domainRegistrationSetupFee = 5_000;
export const domainConnectPrice = 15_000;
export const domainPickPrice = 20_000;

export const hostingOptions: HostingOption[] = [
  {
    id: "client",
    name: "Хостинг клиента",
    description: "Сайт разворачивается на вашем существующем хостинге.",
    oneTimePrice: 0,
    recurringPrice: null,
    recurringPeriod: null,
  },
  {
    id: "basic",
    name: "Базовый хостинг",
    description: "Подходит для лендингов и небольших сайтов.",
    oneTimePrice: 0,
    recurringPrice: 60_000,
    recurringPeriod: "year",
  },
  {
    id: "business",
    name: "Бизнес-хостинг",
    description: "Для интернет-магазинов и сервисов с нагрузкой повыше.",
    oneTimePrice: 0,
    recurringPrice: 120_000,
    recurringPeriod: "year",
  },
  {
    id: "cloud",
    name: "Облачная инфраструктура",
    description: "Масштабируемая инфраструктура под рост нагрузки.",
    oneTimePrice: 0,
    recurringPrice: 25_000,
    recurringPeriod: "month",
    recurringPriceFrom: true,
  },
  {
    id: "own-server",
    name: "Настройка собственного сервера",
    description: "Разовая настройка сервера клиента под проект.",
    oneTimePrice: 100_000,
    oneTimePriceFrom: true,
    recurringPrice: null,
    recurringPeriod: null,
  },
];

export const extraServiceCategories: Array<{
  id: "content" | "promotion" | "technical";
  title: string;
}> = [
  { id: "content", title: "Контент" },
  { id: "promotion", title: "Продвижение" },
  { id: "technical", title: "Технические услуги" },
];

export const extraServices: ExtraService[] = [
  { id: "content-fill", categoryId: "content", name: "Заполнение сайта контентом" },
  { id: "copywriting", categoryId: "content", name: "Написание текстов" },
  { id: "image-processing", categoryId: "content", name: "Обработка изображений" },
  { id: "banners", categoryId: "content", name: "Создание баннеров" },
  { id: "product-upload", categoryId: "content", name: "Добавление товаров" },
  { id: "translation", categoryId: "content", name: "Перевод на другие языки" },

  { id: "basic-seo", categoryId: "promotion", name: "Базовое SEO" },
  { id: "advanced-seo", categoryId: "promotion", name: "Расширенное SEO" },
  { id: "google-analytics", categoryId: "promotion", name: "Подключение Google Analytics" },
  { id: "yandex-metrika", categoryId: "promotion", name: "Подключение Яндекс Метрики" },
  { id: "ad-events", categoryId: "promotion", name: "Настройка рекламных событий" },
  { id: "crm-integration", categoryId: "promotion", name: "Интеграция с CRM" },

  { id: "site-migration", categoryId: "technical", name: "Перенос старого сайта" },
  { id: "corporate-mail", categoryId: "technical", name: "Настройка корпоративной почты" },
  { id: "data-import", categoryId: "technical", name: "Импорт данных" },
  { id: "1c-integration", categoryId: "technical", name: "Интеграция с 1С" },
  { id: "bitrix24-integration", categoryId: "technical", name: "Интеграция с Bitrix24" },
  { id: "api-integration", categoryId: "technical", name: "API-интеграция" },
  { id: "backup", categoryId: "technical", name: "Резервное копирование" },
  { id: "uptime-monitoring", categoryId: "technical", name: "Мониторинг доступности" },
];

export const supportTiers: SupportTier[] = [
  {
    id: "none",
    name: "Без поддержки",
    price: 0,
    description: "Исправление гарантийных ошибок в течение 30 дней.",
    perks: [],
  },
  {
    id: "basic",
    name: "Базовая",
    price: 40_000,
    description: "Постоянное сопровождение проекта в небольшом объёме.",
    perks: [
      "до 5 часов работ",
      "обновление контента",
      "резервное копирование",
      "технические консультации",
    ],
  },
  {
    id: "business",
    name: "Бизнес",
    price: 100_000,
    description: "Расширенное сопровождение с приоритетной реакцией.",
    perks: [
      "до 15 часов работ",
      "приоритетная реакция",
      "мониторинг",
      "небольшие доработки",
      "ежемесячный отчёт",
    ],
  },
  {
    id: "personal",
    name: "Персональная",
    price: 250_000,
    priceFrom: true,
    description: "Выделенные часы разработчика и индивидуальный SLA.",
    perks: [],
  },
];

export function getOptionById(id: string): CalculatorOption | undefined {
  return calculatorOptions.find((option) => option.id === id);
}

export function getProductById(id: string): CalculatorProduct | undefined {
  return products.find((product) => product.id === id);
}
