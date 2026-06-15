"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import styles from "./world.module.css";

type MapMode = "globalTech" | "signal" | "spectrum" | "focus";

type Country = {
  id: string;
  name: string;
};

type CompanyNode = {
  id: string;
  label: string;
  region: string;
  countryId: string;
  x: number;
  y: number;
  category: string;
  summary: string;
  why: string;
  highlights: string[];
  profile: {
    hq: string;
    focus: string;
    type: string;
    website: string;
  };
  marker: {
    badgeOffsetX: number;
    badgeOffsetY: number;
    labelOffsetX: number;
    labelOffsetY: number;
  };
};

type CompanyRoute = {
  id: string;
  from: string;
  to: string;
  label: string;
  connection: string;
  reason: string;
  kind: string;
};

const MODE_COPY: Record<
  MapMode,
  {
    label: string;
    summary: string;
    detail: string;
  }
> = {
  globalTech: {
    label: "Global Tech",
    summary: "Крупные IT-компании и тех-хабы из разных стран.",
    detail:
      "Это не карта офисов и не список логотипов. Это curated network: заметные игроки из разных стран, а линии между ними показывают смысловые связи между сегментами рынка.",
  },
  signal: {
    label: "Pulse",
    summary: "Живые импульсы по группе стран.",
    detail:
      "Более абстрактный режим для визуального ритма: карта ведет себя как статусный экран с динамическими акцентами.",
  },
  spectrum: {
    label: "Spectrum",
    summary: "Полная цветовая заливка карты.",
    detail:
      "Полезно, когда нужно оценить карту как графический слой и посмотреть, как она держит плотную цветовую подачу.",
  },
  focus: {
    label: "Focus",
    summary: "Выделение ключевых стран, остальное приглушено.",
    detail:
      "Ближе к продуктовой подаче: карта превращается в экран про приоритетные рынки, регионы присутствия или delivery coverage.",
  },
};

const FOCUS_IDS = ["KZ", "US", "CA", "DE", "AU", "JP", "KR"];

const COMPANY_NODES: CompanyNode[] = [
  {
    id: "astana-hub",
    label: "Astana Hub",
    region: "Kazakhstan",
    countryId: "KZ",
    x: 60.5,
    y: 30,
    category: "Tech hub / startup ecosystem",
    summary:
      "Astana Hub выступает как точка сборки для стартапов, корпораций, инноваторов и tech community в Казахстане.",
    why:
      "Для вашего сайта это сильный региональный ориентир: не просто компания, а площадка, вокруг которой строится локальная инновационная экосистема.",
    highlights: ["Startup programs", "Tech community", "Innovation ecosystem", "Resident network"],
    profile: {
      hq: "Astana, Kazakhstan",
      focus: "Startups, innovation programs, tech community",
      type: "International technology hub",
      website: "https://astanahub.com/en/",
    },
    marker: {
      badgeOffsetX: 1.5,
      badgeOffsetY: -1.45,
      labelOffsetX: 4.3,
      labelOffsetY: -1.3,
    },
  },
  {
    id: "nvidia",
    label: "NVIDIA",
    region: "United States",
    countryId: "US",
    x: 24,
    y: 31,
    category: "AI infrastructure / compute",
    summary:
      "NVIDIA ассоциируется с вычислительной базой, на которой сегодня строится большая часть AI-инфраструктуры.",
    why:
      "Она нужна на карте как символ слоя compute: GPU, AI, robotics и high-performance computing, без которого весь AI-ландшафт выглядит неполным.",
    highlights: ["GPU", "AI computing", "Robotics", "High-performance compute"],
    profile: {
      hq: "Santa Clara, California, USA",
      focus: "AI, GPU computing, robotics, accelerated infrastructure",
      type: "Technology company",
      website: "https://www.nvidia.com/en-us/",
    },
    marker: {
      badgeOffsetX: -1.55,
      badgeOffsetY: 1.5,
      labelOffsetX: 4.25,
      labelOffsetY: 1.7,
    },
  },
  {
    id: "shopify",
    label: "Shopify",
    region: "Canada",
    countryId: "CA",
    x: 19,
    y: 22,
    category: "Commerce platform",
    summary:
      "Shopify — хороший пример платформы, которая превращает commerce в масштабируемый цифровой продукт с сильным AI-слоем.",
    why:
      "На карте она закрывает тему digital commerce: не enterprise-ERP и не consumer hardware, а инфраструктуру для продаж и роста бизнеса.",
    highlights: ["Commerce platform", "AI for merchants", "Multichannel selling", "Storefront tools"],
    profile: {
      hq: "Ottawa, Canada",
      focus: "Commerce infrastructure, merchant tools, multichannel selling",
      type: "Commerce software company",
      website: "https://www.shopify.com/",
    },
    marker: {
      badgeOffsetX: -1.65,
      badgeOffsetY: -1.55,
      labelOffsetX: 4.1,
      labelOffsetY: -1.4,
    },
  },
  {
    id: "sap",
    label: "SAP",
    region: "Germany",
    countryId: "DE",
    x: 52,
    y: 27,
    category: "Enterprise software / business AI",
    summary:
      "SAP показывает слой enterprise-систем: бизнес-приложения, сквозные процессы и business AI в большом масштабе.",
    why:
      "Для вашей карты это важный якорь enterprise-сегмента: там, где цифровизация — это уже не лендинг, а операционный контур бизнеса.",
    highlights: ["Enterprise apps", "Business AI", "Finance & operations", "Supply chain"],
    profile: {
      hq: "Walldorf, Germany",
      focus: "Enterprise applications, business processes, business AI",
      type: "Enterprise software company",
      website: "https://www.sap.com/about/company.html",
    },
    marker: {
      badgeOffsetX: -1.8,
      badgeOffsetY: -1.4,
      labelOffsetX: -4.6,
      labelOffsetY: -1.2,
    },
  },
  {
    id: "atlassian",
    label: "Atlassian",
    region: "Australia",
    countryId: "AU",
    x: 84,
    y: 76,
    category: "Teamwork / collaboration software",
    summary:
      "Atlassian собрал сильный стек вокруг совместной работы команд: Jira, Confluence, Trello, Loom и AI-слой для knowledge work.",
    why:
      "Она полезна на карте как маркер того, что IT-ландшафт — это не только код и инфраструктура, но и системы, через которые команды двигают работу.",
    highlights: ["Jira", "Confluence", "Trello", "AI teamwork tools"],
    profile: {
      hq: "Sydney, Australia",
      focus: "Team collaboration, knowledge, project and service workflows",
      type: "Collaboration software company",
      website: "https://www.atlassian.com/",
    },
    marker: {
      badgeOffsetX: -1.55,
      badgeOffsetY: -1.45,
      labelOffsetX: -4.9,
      labelOffsetY: -1.15,
    },
  },
  {
    id: "rakuten",
    label: "Rakuten",
    region: "Japan",
    countryId: "JP",
    x: 82,
    y: 34,
    category: "Digital ecosystem / internet services",
    summary:
      "Rakuten интересен как широкая цифровая экосистема: e-commerce, fintech, telecom и интернет-сервисы под одной группой.",
    why:
      "На карте он показывает не один продукт, а модель tech-экосистемы, где разные сервисы собираются в единую цифровую среду.",
    highlights: ["E-commerce", "Fintech", "Telecom", "Digital services"],
    profile: {
      hq: "Tokyo, Japan",
      focus: "Internet services, commerce, fintech, telecom",
      type: "Technology group",
      website: "https://global.rakuten.com/corp/about/",
    },
    marker: {
      badgeOffsetX: 1.45,
      badgeOffsetY: -1.6,
      labelOffsetX: 4.3,
      labelOffsetY: -1.4,
    },
  },
  {
    id: "samsung",
    label: "Samsung Electronics",
    region: "South Korea",
    countryId: "KR",
    x: 77,
    y: 37,
    category: "Devices / semiconductors / consumer tech",
    summary:
      "Samsung Electronics закрывает аппаратный и device-слой: consumer electronics, mobile and device solutions в глобальном масштабе.",
    why:
      "Она нужна как напоминание, что IT-карта мира — это не только софт, но и устройства, чипы и производственный технологический контур.",
    highlights: ["Consumer electronics", "Mobile", "Device solutions", "Tech innovation"],
    profile: {
      hq: "Suwon, South Korea",
      focus: "Consumer electronics, mobile, semiconductors, device solutions",
      type: "Electronics company",
      website: "https://www.samsung.com/us/about-us/our-business/",
    },
    marker: {
      badgeOffsetX: -1.75,
      badgeOffsetY: 1.55,
      labelOffsetX: -5.1,
      labelOffsetY: 1.55,
    },
  },
];

const COMPANY_ROUTES: CompanyRoute[] = [
  {
    id: "r1",
    from: "astana-hub",
    to: "nvidia",
    label: "Innovation -> AI infrastructure",
    connection: "Astana Hub -> NVIDIA",
    reason:
      "Хаб и комьюнити показывают, где появляются новые команды и идеи, а NVIDIA — на какой вычислительной базе строится современный AI.",
    kind: "ecosystem bridge",
  },
  {
    id: "r2",
    from: "nvidia",
    to: "sap",
    label: "AI compute -> Enterprise adoption",
    connection: "NVIDIA -> SAP",
    reason:
      "Линия связывает инфраструктурный AI-слой с enterprise-миром, где AI встраивается в реальные бизнес-процессы.",
    kind: "AI to enterprise",
  },
  {
    id: "r3",
    from: "sap",
    to: "atlassian",
    label: "Enterprise systems -> Teamwork layer",
    connection: "SAP -> Atlassian",
    reason:
      "ERP и business apps живут рядом с системами совместной работы: процессы мало значат, если команды не могут их быстро двигать.",
    kind: "operations to execution",
  },
  {
    id: "r4",
    from: "atlassian",
    to: "shopify",
    label: "Team execution -> Commerce operations",
    connection: "Atlassian -> Shopify",
    reason:
      "Командные workflow и commerce stack часто встречаются в одном цифровом продукте: одна линия про работу команды, вторая — про рост продаж.",
    kind: "workflow to commerce",
  },
  {
    id: "r5",
    from: "shopify",
    to: "rakuten",
    label: "Commerce platform -> Digital ecosystem",
    connection: "Shopify -> Rakuten",
    reason:
      "Связь между платформой для торговли и более широкой интернет-экосистемой помогает показать масштаб развития digital business.",
    kind: "commerce to ecosystem",
  },
  {
    id: "r6",
    from: "rakuten",
    to: "samsung",
    label: "Internet services -> Device layer",
    connection: "Rakuten -> Samsung Electronics",
    reason:
      "Сервисы и экосистемы в итоге приходят к устройствам и hardware-слою, через который люди вообще потребляют цифровой опыт.",
    kind: "services to devices",
  },
  {
    id: "r7",
    from: "samsung",
    to: "astana-hub",
    label: "Hardware innovation -> Regional ecosystem",
    connection: "Samsung Electronics -> Astana Hub",
    reason:
      "Цикл замыкается: крупные глобальные игроки задают технологическую планку, а региональные хабы превращают это в новые локальные продукты и команды.",
    kind: "global to regional",
  },
];

const COMPANY_NODE_IDS = COMPANY_NODES.map((node) => node.countryId);
const COMPANY_NODE_BY_ID = new Map(COMPANY_NODES.map((node) => [node.id, node]));
const COMPANY_NODE_BY_COUNTRY = new Map(COMPANY_NODES.map((node) => [node.countryId, node]));

function hashValue(input: string) {
  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

function pickIds(countries: Country[], count: number, seed: number) {
  return countries
    .map((country, index) => ({
      id: country.id,
      score: (hashValue(`${country.id}-${seed}`) + index * 37) % 1000,
    }))
    .sort((left, right) => left.score - right.score)
    .slice(0, count)
    .map((entry) => entry.id);
}

function readCountryFromTarget(target: EventTarget | null): Country | null {
  if (!(target instanceof Element)) {
    return null;
  }

  const path = target.closest<SVGPathElement>("path[data-country-id]");

  if (!path) {
    return null;
  }

  const id = path.dataset.countryId;
  const name = path.dataset.countryName;

  if (!id || !name) {
    return null;
  }

  return { id, name };
}

function buildRoutePath(from: CompanyNode, to: CompanyNode) {
  const controlX = (from.x + to.x) / 2;
  const distance = Math.abs(from.x - to.x);
  const lift = Math.max(6, Math.min(18, distance * 0.24));
  const controlY = Math.max(8, Math.min(from.y, to.y) - lift);

  return `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`;
}

function getWebsiteHost(website: string) {
  try {
    return new URL(website).hostname.replace(/^www\./, "");
  } catch {
    return website;
  }
}

function isTargetInsideContainer(target: EventTarget | null, container: HTMLElement | null) {
  if (!container || !(target instanceof Node)) {
    return false;
  }

  return container.contains(target);
}

export function WorldMapLab() {
  const mapStackRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [svgMarkup, setSvgMarkup] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [mode, setMode] = useState<MapMode>("globalTech");
  const [seed, setSeed] = useState(1);
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [hoveredCompanyId, setHoveredCompanyId] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [routeIndex, setRouteIndex] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 24, y: 24 });

  useEffect(() => {
    const controller = new AbortController();

    async function loadMap() {
      const response = await fetch("/world.svg", {
        signal: controller.signal,
      });
      const markup = await response.text();
      const parsed = new DOMParser().parseFromString(markup, "image/svg+xml");
      const parsedCountries = Array.from(
        parsed.querySelectorAll<SVGPathElement>("path[id][name]"),
      ).map((path) => ({
        id: path.getAttribute("id") ?? "",
        name: path.getAttribute("name") ?? path.getAttribute("id") ?? "",
      }));

      setSvgMarkup(markup);
      setCountries(parsedCountries.filter((country) => country.id && country.name));
    }

    loadMap().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      console.error("Failed to load world.svg", error);
    });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (mode !== "globalTech") {
      return;
    }

    if (selectedCompanyId || hoveredCompanyId) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setRouteIndex((current) => (current + 1) % COMPANY_ROUTES.length);
    }, 2600);

    return () => window.clearInterval(intervalId);
  }, [hoveredCompanyId, mode, selectedCompanyId]);

  const spotlightIds = useMemo(() => {
    if (!countries.length) {
      return [];
    }

    if (mode === "globalTech") {
      return COMPANY_NODE_IDS.filter((id) => countries.some((country) => country.id === id));
    }

    if (mode === "focus") {
      return FOCUS_IDS.filter((id) => countries.some((country) => country.id === id));
    }

    if (mode === "signal") {
      return pickIds(countries, Math.min(20, countries.length), seed);
    }

    return countries.map((country) => country.id);
  }, [countries, mode, seed]);

  const spotlightSet = useMemo(() => new Set(spotlightIds), [spotlightIds]);

  const countryById = useMemo(() => {
    return new Map(countries.map((country) => [country.id, country]));
  }, [countries]);

  const spotlightCountries = useMemo(() => {
    return spotlightIds
      .map((id) => countryById.get(id))
      .filter((country): country is Country => Boolean(country))
      .slice(0, 12);
  }, [countryById, spotlightIds]);

  const resolvedSelectedCountry =
    selectedCountry && countryById.has(selectedCountry.id) ? selectedCountry : null;

  const fallbackCountry = resolvedSelectedCountry ?? hoveredCountry;

  const activeRoute = COMPANY_ROUTES[routeIndex % COMPANY_ROUTES.length];
  const selectedCompany =
    selectedCompanyId ? COMPANY_NODE_BY_ID.get(selectedCompanyId) ?? null : null;
  const hoveredCompany =
    hoveredCompanyId ? COMPANY_NODE_BY_ID.get(hoveredCompanyId) ?? null : null;
  const autoNode = COMPANY_NODE_BY_ID.get(activeRoute.to) ?? COMPANY_NODES[0];
  const detailNode = selectedCompany ?? hoveredCompany ?? autoNode;
  const focusNode = hoveredCompany ?? selectedCompany ?? autoNode;
  const activeCountry =
    mode === "globalTech"
      ? countryById.get(focusNode.countryId) ?? null
      : fallbackCountry;
  const tooltipCompany = mode === "globalTech" ? hoveredCompany : null;

  const connectedRoutes = useMemo(() => {
    if (mode !== "globalTech") {
      return [];
    }

    const prioritized = COMPANY_ROUTES.filter(
      (route) => route.from === detailNode.id || route.to === detailNode.id,
    );

    if (prioritized.length) {
      return prioritized;
    }

    return [activeRoute];
  }, [activeRoute, detailNode.id, mode]);

  const heroStats = useMemo(() => {
    if (mode === "globalTech") {
      return [
        { label: "Компаний", value: String(COMPANY_NODES.length) },
        { label: "Стран", value: String(new Set(COMPANY_NODES.map((node) => node.countryId)).size) },
        { label: "Тип карты", value: "curated network" },
      ];
    }

    return [
      { label: "Стран в SVG", value: countries.length ? String(countries.length) : "..." },
      { label: "Активный режим", value: MODE_COPY[mode].label },
      { label: "Подсвечено", value: String(spotlightIds.length) },
    ];
  }, [countries.length, mode, spotlightIds.length]);

  useEffect(() => {
    const root = mapRef.current;

    if (!root || !svgMarkup) {
      return;
    }

    const svg = root.querySelector("svg");

    if (!svg) {
      return;
    }

    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.removeAttribute("width");
    svg.removeAttribute("height");

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path[id][name]"));

    for (const path of paths) {
      const id = path.getAttribute("id") ?? "";
      const name = path.getAttribute("name") ?? id;
      const isHighlighted = spotlightSet.has(id);
      const isActive = activeCountry?.id === id;
      const isCompanyNode = COMPANY_NODE_BY_COUNTRY.has(id);
      const isCompanyActive = focusNode.countryId === id;
      const intensity = (hashValue(id) + seed * 13) % 100;
      const spectrumHue = 180 + Math.round(intensity * 1.5);
      const signalHue = 188 + (intensity % 4) * 18;

      path.dataset.countryId = id;
      path.dataset.countryName = name;
      path.style.pointerEvents = "auto";
      path.setAttribute("tabindex", "0");
      path.setAttribute("role", "button");
      path.setAttribute("aria-label", name);
      path.setAttribute("data-active", isActive ? "true" : "false");
      path.setAttribute("data-highlighted", isHighlighted ? "true" : "false");
      path.style.removeProperty("--country-fill");
      path.style.removeProperty("--country-opacity");
      path.style.removeProperty("--country-stroke");
      path.style.removeProperty("--country-stroke-width");
      path.style.removeProperty("--country-glow");

      if (mode === "globalTech") {
        if (!isCompanyNode) {
          path.style.pointerEvents = "none";
          path.setAttribute("tabindex", "-1");
          path.setAttribute("role", "presentation");
        }

        path.style.setProperty(
          "--country-fill",
          isActive || isCompanyActive
            ? "rgba(255, 190, 116, 0.95)"
            : isCompanyNode
              ? "rgba(110, 233, 255, 0.82)"
              : "rgba(208, 216, 228, 0.08)",
        );
        path.style.setProperty(
          "--country-opacity",
          isActive || isCompanyActive ? "1" : isCompanyNode ? "0.95" : "0.28",
        );
        path.style.setProperty(
          "--country-stroke",
          isActive || isCompanyActive
            ? "rgba(255, 241, 216, 0.98)"
            : isCompanyNode
              ? "rgba(194, 245, 255, 0.74)"
              : "rgba(255, 255, 255, 0.08)",
        );
        path.style.setProperty(
          "--country-stroke-width",
          isActive || isCompanyActive ? "1.2" : "0.42",
        );
        path.style.setProperty(
          "--country-glow",
          isActive || isCompanyActive
            ? "drop-shadow(0 0 18px rgba(255, 185, 110, 0.75))"
            : isCompanyNode
              ? "drop-shadow(0 0 12px rgba(110, 233, 255, 0.34))"
              : "none",
        );
      } else if (mode === "signal") {
        path.style.setProperty(
          "--country-fill",
          isActive
            ? "rgba(255, 200, 122, 0.96)"
            : isHighlighted
              ? `hsla(${signalHue} 96% 64% / 0.9)`
              : "rgba(232, 236, 242, 0.18)",
        );
        path.style.setProperty("--country-opacity", isHighlighted || isActive ? "1" : "0.52");
        path.style.setProperty(
          "--country-stroke",
          isActive ? "rgba(255, 243, 214, 0.98)" : "rgba(188, 242, 255, 0.48)",
        );
        path.style.setProperty("--country-stroke-width", isActive ? "1.15" : "0.58");
        path.style.setProperty(
          "--country-glow",
          isActive
            ? "drop-shadow(0 0 16px rgba(255, 184, 116, 0.85))"
            : isHighlighted
              ? "drop-shadow(0 0 10px rgba(107, 232, 255, 0.42))"
              : "none",
        );
      } else if (mode === "spectrum") {
        path.style.setProperty(
          "--country-fill",
          isActive
            ? "rgba(255, 205, 130, 0.96)"
            : `hsla(${spectrumHue} 78% ${40 + (intensity % 18)}% / 0.92)`,
        );
        path.style.setProperty("--country-opacity", isActive ? "1" : "0.92");
        path.style.setProperty(
          "--country-stroke",
          isActive ? "rgba(255, 245, 226, 0.98)" : "rgba(255, 255, 255, 0.18)",
        );
        path.style.setProperty("--country-stroke-width", isActive ? "1.2" : "0.4");
        path.style.setProperty(
          "--country-glow",
          isActive
            ? "drop-shadow(0 0 16px rgba(255, 184, 116, 0.72))"
            : "drop-shadow(0 0 4px rgba(121, 134, 255, 0.18))",
        );
      } else {
        path.style.setProperty(
          "--country-fill",
          isActive
            ? "rgba(255, 198, 120, 0.96)"
            : isHighlighted
              ? "rgba(126, 233, 255, 0.88)"
              : "rgba(196, 203, 220, 0.09)",
        );
        path.style.setProperty("--country-opacity", isHighlighted || isActive ? "1" : "0.34");
        path.style.setProperty(
          "--country-stroke",
          isActive
            ? "rgba(255, 245, 226, 0.98)"
            : isHighlighted
              ? "rgba(190, 247, 255, 0.86)"
              : "rgba(255, 255, 255, 0.12)",
        );
        path.style.setProperty("--country-stroke-width", isActive ? "1.2" : "0.48");
        path.style.setProperty(
          "--country-glow",
          isActive
            ? "drop-shadow(0 0 16px rgba(255, 184, 116, 0.72))"
            : isHighlighted
              ? "drop-shadow(0 0 12px rgba(126, 233, 255, 0.34))"
              : "none",
        );
      }
    }
  }, [activeCountry, focusNode.countryId, mode, seed, spotlightSet, svgMarkup]);

  const hasCompanySelection = mode === "globalTech" ? Boolean(selectedCompanyId) : false;

  function setHoveredCompany(nextId: string | null) {
    setHoveredCompanyId((current) => (current === nextId ? current : nextId));
  }

  function handleCompanyCountryHover(country: Country | null) {
    const company = country ? COMPANY_NODE_BY_COUNTRY.get(country.id) ?? null : null;
    setHoveredCompany(company?.id ?? null);
  }

  function handleCompanyCountrySelect(country: Country) {
    const company = COMPANY_NODE_BY_COUNTRY.get(country.id) ?? null;

    if (!company) {
      setSelectedCompanyId(null);
      return;
    }

    setSelectedCompanyId((current) => (current === company.id ? null : company.id));
  }

  function updateTooltipPosition(clientX: number, clientY: number) {
    const container = mapStackRef.current;

    if (!container) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const tooltipWidth = 288;
    const tooltipHeight = 176;
    const horizontalOffset = 18;
    const verticalOffset = 18;
    const minPadding = 16;

    const nextX = clientX - rect.left + horizontalOffset;
    const nextY = clientY - rect.top + verticalOffset;
    const clampedX = Math.min(
      Math.max(minPadding, nextX),
      Math.max(minPadding, rect.width - tooltipWidth - minPadding),
    );
    const clampedY = Math.min(
      Math.max(minPadding, nextY),
      Math.max(minPadding, rect.height - tooltipHeight - minPadding),
    );

    setTooltipPosition({ x: clampedX, y: clampedY });
  }

  return (
    <main className={styles.page}>
      <div className={styles.backdrop} aria-hidden="true" />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <Link href="/" className={styles.backLink}>
            На главную
          </Link>
          <p className={styles.eyebrow}>World SVG Lab</p>
          <h1>Карта глобальных IT-компаний и тех-хабов с живыми связями между сегментами</h1>
          <p className={styles.lead}>
            Оставляем линии и сетевую подачу, но меняем смысл: теперь карта показывает
            крупные компании и хабы из разных стран, а по наведению и клику раскрывает их
            профиль, роль и место в мировой tech-экосистеме.
          </p>
          {mode === "globalTech" ? (
            <p className={styles.noteText}>
              Важно: линии на карте — это <code>смысловые связи</code> между сегментами
              рынка, а не утверждение о прямом партнёрстве или аффилиации компаний.
            </p>
          ) : null}
        </div>

        <div className={styles.heroStats}>
          {heroStats.map((item) => (
            <div key={item.label} className={styles.metricCard}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.controls}>
        <div className={styles.modeTabs} aria-label="Режимы карты">
          {(Object.keys(MODE_COPY) as MapMode[]).map((modeKey) => (
            <button
              key={modeKey}
              type="button"
              className={mode === modeKey ? styles.modeButtonActive : styles.modeButton}
              onClick={() => setMode(modeKey)}
            >
              <span>{MODE_COPY[modeKey].label}</span>
              <small>{MODE_COPY[modeKey].summary}</small>
            </button>
          ))}
        </div>

        <div className={styles.actionRow}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => {
              if (mode === "globalTech") {
                setRouteIndex((current) => (current + 1) % COMPANY_ROUTES.length);
                return;
              }

              setSeed((value) => value + 1);
            }}
          >
            {mode === "globalTech" ? "Следующая связь" : "Перемешать акценты"}
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => {
              setSelectedCountry(null);
              setSelectedCompanyId(null);
            }}
            disabled={mode === "globalTech" ? !hasCompanySelection : !resolvedSelectedCountry}
          >
            Сбросить выбор
          </button>
        </div>
      </section>

      <section className={styles.layout}>
        <article className={styles.mapCard}>
          <div className={styles.mapTopbar}>
            <div>
              <p className={styles.cardLabel}>Режим</p>
              <h2>{MODE_COPY[mode].label}</h2>
            </div>
            <p className={styles.cardDescription}>{MODE_COPY[mode].detail}</p>
          </div>

          <div ref={mapStackRef} className={styles.mapStack}>
            <div
              ref={mapRef}
              className={styles.mapViewport}
              onPointerOver={(event) => {
                const country = readCountryFromTarget(event.target);

                if (mode === "globalTech") {
                  handleCompanyCountryHover(country);
                  if (country) {
                    updateTooltipPosition(event.clientX, event.clientY);
                  }
                  return;
                }

                if (country) {
                  setHoveredCountry(country);
                }
              }}
              onPointerLeave={(event) => {
                if (mode === "globalTech") {
                  if (isTargetInsideContainer(event.relatedTarget, mapStackRef.current)) {
                    return;
                  }

                  handleCompanyCountryHover(null);
                  return;
                }

                setHoveredCountry(null);
              }}
              onFocusCapture={(event) => {
                const country = readCountryFromTarget(event.target);

                if (mode === "globalTech") {
                  handleCompanyCountryHover(country);
                  return;
                }

                if (country) {
                  setHoveredCountry(country);
                }
              }}
              onBlurCapture={(event) => {
                if (mode === "globalTech") {
                  if (isTargetInsideContainer(event.relatedTarget, mapStackRef.current)) {
                    return;
                  }

                  const country = readCountryFromTarget(event.relatedTarget);
                  handleCompanyCountryHover(country);
                  return;
                }

                const country = readCountryFromTarget(event.relatedTarget);

                if (!country) {
                  setHoveredCountry(null);
                }
              }}
              onClick={(event) => {
                const country = readCountryFromTarget(event.target);

                if (!country) {
                  return;
                }

                if (mode === "globalTech") {
                  handleCompanyCountrySelect(country);
                  return;
                }

                setSelectedCountry((current) => {
                  if (current?.id === country.id) {
                    return null;
                  }

                  return country;
                });
              }}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") {
                  return;
                }

                const country = readCountryFromTarget(event.target);

                if (!country) {
                  return;
                }

                event.preventDefault();

                if (mode === "globalTech") {
                  handleCompanyCountrySelect(country);
                  return;
                }

                setSelectedCountry((current) => {
                  if (current?.id === country.id) {
                    return null;
                  }

                  return country;
                });
              }}
              onPointerMove={(event) => {
                if (mode !== "globalTech") {
                  return;
                }

                const country = readCountryFromTarget(event.target);

                handleCompanyCountryHover(country);

                if (country) {
                  updateTooltipPosition(event.clientX, event.clientY);
                }
              }}
              dangerouslySetInnerHTML={svgMarkup ? { __html: svgMarkup } : undefined}
            />

            {mode === "globalTech" ? (
              <div className={styles.networkLayer}>
                <svg
                  className={styles.networkSvg}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {COMPANY_ROUTES.map((route, index) => {
                    const from = COMPANY_NODE_BY_ID.get(route.from);
                    const to = COMPANY_NODE_BY_ID.get(route.to);

                    if (!from || !to) {
                      return null;
                    }

                    const path = buildRoutePath(from, to);
                    const isHoverConnected = hoveredCompany
                      ? route.from === hoveredCompany.id || route.to === hoveredCompany.id
                      : false;
                    const isConnected =
                      route.id === activeRoute.id ||
                      route.from === focusNode.id ||
                      route.to === focusNode.id;

                    return (
                      <g key={route.id}>
                        <path d={path} className={styles.networkRouteBase} />
                        <path
                          d={path}
                          className={
                            isHoverConnected
                              ? styles.networkRouteHover
                              : isConnected
                                ? styles.networkRouteActive
                                : styles.networkRoute
                          }
                          style={{ animationDelay: `${index * 0.22}s` }}
                        />
                      </g>
                    );
                  })}
                </svg>

                {COMPANY_NODES.map((node) => {
                  const isCurrent = node.id === focusNode.id;
                  const nodeStyle = {
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    "--flag-offset-x": `${node.marker.badgeOffsetX}rem`,
                    "--flag-offset-y": `${node.marker.badgeOffsetY}rem`,
                    "--label-offset-x": `${node.marker.labelOffsetX}rem`,
                    "--label-offset-y": `${node.marker.labelOffsetY}rem`,
                  } as CSSProperties;

                  return (
                    <button
                      key={node.id}
                      type="button"
                      className={isCurrent ? styles.networkNodeActive : styles.networkNode}
                      style={nodeStyle}
                      aria-label={`${node.label}, ${node.region}`}
                      onPointerEnter={(event) => {
                        setHoveredCompany(node.id);
                        updateTooltipPosition(event.clientX, event.clientY);
                      }}
                      onPointerLeave={(event) => {
                        if (isTargetInsideContainer(event.relatedTarget, mapStackRef.current)) {
                          return;
                        }

                        setHoveredCompany(null);
                      }}
                      onPointerMove={(event) => {
                        setHoveredCompany(node.id);
                        updateTooltipPosition(event.clientX, event.clientY);
                      }}
                      onFocus={(event) => {
                        const rect = event.currentTarget.getBoundingClientRect();
                        setHoveredCompany(node.id);
                        updateTooltipPosition(rect.left + rect.width / 2, rect.top + rect.height / 2);
                      }}
                      onBlur={(event) => {
                        if (isTargetInsideContainer(event.relatedTarget, mapStackRef.current)) {
                          return;
                        }

                        setHoveredCompany(null);
                      }}
                      onClick={() => {
                        setSelectedCompanyId((current) => (current === node.id ? null : node.id));
                      }}
                    >
                      <span className={styles.networkNodeFlag}>{node.countryId}</span>
                      <span className={styles.networkNodePulse} aria-hidden="true" />
                      <span className={styles.networkNodeDot} aria-hidden="true" />
                      {isCurrent ? (
                        <span className={styles.networkNodeLabel}>
                          <strong>{node.label}</strong>
                          <small>{node.region}</small>
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ) : null}

            {tooltipCompany ? (
              <div
                className={styles.companyTooltip}
                style={{
                  left: `${tooltipPosition.x}px`,
                  top: `${tooltipPosition.y}px`,
                }}
                aria-hidden="true"
              >
                <span className={styles.companyTooltipEyebrow}>{tooltipCompany.region}</span>
                <strong>{tooltipCompany.label}</strong>
                <p>{tooltipCompany.category}</p>
                <span className={styles.companyTooltipMeta}>
                  {getWebsiteHost(tooltipCompany.profile.website)}
                </span>
                <small>{tooltipCompany.profile.focus}</small>
                <div className={styles.companyTooltipTags}>
                  {tooltipCompany.highlights.slice(0, 2).map((item) => (
                    <span key={item} className={styles.companyTooltipTag}>
                      {item}
                    </span>
                  ))}
                </div>
                <em>Клик, чтобы закрепить карточку</em>
              </div>
            ) : null}
          </div>

          <div className={styles.mapFooter}>
            {mode === "globalTech" ? (
              <>
                <span>Наведение показывает компанию, клик фиксирует карточку справа.</span>
                <span>Связи между узлами концептуальные: они объясняют tech-ландшафт, а не формальные партнёрства.</span>
              </>
            ) : (
              <>
                <span>Hover показывает страну, клик фиксирует выбор.</span>
                <span>SVG остается исходным, мы только накладываем стили и поведение поверх.</span>
              </>
            )}
          </div>
        </article>

        <aside className={styles.sidebar}>
          {mode === "globalTech" ? (
            <>
              <article className={styles.infoCard}>
                <p className={styles.cardLabel}>Активная компания</p>
                <h3>{detailNode.label}</h3>
                <p className={styles.infoText}>{detailNode.summary}</p>
                <dl className={styles.countryMeta}>
                  <div>
                    <dt>Страна</dt>
                    <dd>{detailNode.region}</dd>
                  </div>
                  <div>
                    <dt>HQ</dt>
                    <dd>{detailNode.profile.hq}</dd>
                  </div>
                  <div>
                    <dt>Категория</dt>
                    <dd>{detailNode.category}</dd>
                  </div>
                  <div>
                    <dt>Фокус</dt>
                    <dd>{detailNode.profile.focus}</dd>
                  </div>
                  <div>
                    <dt>Тип</dt>
                    <dd>{detailNode.profile.type}</dd>
                  </div>
                </dl>
                <p className={styles.infoText}>{detailNode.why}</p>
                <div className={styles.stackGrid}>
                  {detailNode.highlights.map((item) => (
                    <span key={item} className={styles.stackChip}>
                      {item}
                    </span>
                  ))}
                </div>
                <a
                  className={styles.sourceLink}
                  href={detailNode.profile.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  Официальный сайт
                </a>
              </article>

              <article className={styles.infoCard}>
                <p className={styles.cardLabel}>Связи</p>
                <h3>Почему линии между компаниями вообще нужны</h3>
                <p className={styles.infoText}>
                  Карта станет интереснее, если линии будут объяснять переходы между
                  сегментами: от стартап-экосистемы к AI-инфраструктуре, от enterprise-систем
                  к collaboration, от commerce к более широким digital-экосистемам.
                </p>
                <div className={styles.routeFeed}>
                  {connectedRoutes.map((route) => (
                    <div key={route.id} className={styles.routeItem}>
                      <div className={styles.routeHead}>
                        <strong>{route.label}</strong>
                        <span className={styles.routeBadge}>{route.kind}</span>
                      </div>
                      <p>{route.connection}</p>
                      <small>{route.reason}</small>
                    </div>
                  ))}
                </div>
              </article>

              <article className={styles.infoCard}>
                <p className={styles.cardLabel}>Компании на карте</p>
                <h3>Что можно открывать по клику</h3>
                <div className={styles.countryTags}>
                  {COMPANY_NODES.map((node) => (
                    <button
                      key={node.id}
                      type="button"
                      className={styles.countryTag}
                      onClick={() => {
                        setSelectedCompanyId(node.id);
                      }}
                    >
                      <span>{node.label}</span>
                      <small>{node.region}</small>
                    </button>
                  ))}
                </div>
              </article>
            </>
          ) : (
            <>
              <article className={styles.infoCard}>
                <p className={styles.cardLabel}>Сейчас под курсором</p>
                <h3>{activeCountry?.name ?? "Наведите на страну"}</h3>
                <dl className={styles.countryMeta}>
                  <div>
                    <dt>Код</dt>
                    <dd>{activeCountry?.id ?? "—"}</dd>
                  </div>
                  <div>
                    <dt>Режим</dt>
                    <dd>{MODE_COPY[mode].label}</dd>
                  </div>
                  <div>
                    <dt>Выбранная страна</dt>
                    <dd>{resolvedSelectedCountry?.name ?? "нет"}</dd>
                  </div>
                </dl>
              </article>

              <article className={styles.infoCard}>
                <p className={styles.cardLabel}>Текущие акценты</p>
                <h3>Подсвеченные страны</h3>
                <div className={styles.countryTags}>
                  {spotlightCountries.map((country) => (
                    <button
                      key={country.id}
                      type="button"
                      className={styles.countryTag}
                      onClick={() => setSelectedCountry(country)}
                    >
                      <span>{country.name}</span>
                      <small>{country.id}</small>
                    </button>
                  ))}
                </div>
              </article>
            </>
          )}
        </aside>
      </section>
    </main>
  );
}
