"use client";

import Image from "next/image";
import type { CSSProperties, KeyboardEvent } from "react";
import { useMemo, useRef, useState } from "react";
import { Html, Line } from "@react-three/drei";
import { useFrame, type RootState } from "@react-three/fiber";
import * as THREE from "three";

import { floatingPanelUiCopy } from "../../lib/hero-content";
import type { Language } from "../../lib/i18n";
import { getWhatsAppHref } from "../../lib/whatsapp";
import {
  moduleCopy,
  navIconSources,
  navItems,
  type NavItemId,
} from "../site/SystemNavCard";

type ThreeGroup = InstanceType<typeof THREE.Group>;
type Point3 = [number, number, number];

const coreLinkTarget: Point3 = [0.4, 0.2, -6.3];
const openedPanelPosition: Point3 = [2.15, 0.72, -25.5];
const performancePoints = [
  [0, 72],
  [34, 68],
  [68, 76],
  [102, 52],
  [136, 70],
  [170, 58],
  [204, 64],
  [238, 38],
  [272, 66],
  [306, 44],
  [340, 52],
  [374, 24],
  [408, 42],
  [442, 18],
  [476, 45],
  [510, 35],
  [544, 58],
  [578, 40],
  [612, 54],
  [646, 30],
] as const;

const panelLayouts: Record<
  NavItemId,
  {
    position: Point3;
    rotation: Point3;
  }
> = {
  overview: {
    position: [-13, -2.65, -63],
    rotation: [0.02, 0.16, 0],
  },
  aiSystems: {
    position: [-30, -1.2, -52],
    rotation: [0, 0.12, 0],
  },
  webArchitecture: {
    position: [0, -5, -58.5],
    rotation: [0.08, 0.12, 0],
  },
  projects: {
    position: [-24, 0.2, -65],
    rotation: [0, 0.12, 0],
  },
  services: {
    position: [13, -2.8, -62],
    rotation: [0.04, -0.16, 0],
  },
  contact: {
    position: [22, -0.8, -66],
    rotation: [0, -0.18, 0],
  },
};

function getTargetPosition(
  basePosition: Point3,
  index: number,
  openIndex: number
): Point3 {
  if (openIndex === -1 || index !== openIndex) {
    return [...basePosition];
  }

  return [
    openedPanelPosition[0] + (index - 2.5) * 0.05,
    openedPanelPosition[1],
    openedPanelPosition[2],
  ];
}

function createPanelLinks(source: Point3) {
  const sourceOffsets: Point3[] = [
    [-1.35, 0.82, 0],
    [-1.12, 0.04, 0],
    [-1.28, -0.66, 0],
  ];
  const targetOffsets: Point3[] = [
    [0.16, 0.48, 0],
    [0.52, 0.08, -0.12],
    [-0.44, -0.26, 0.08],
  ];

  return sourceOffsets.map((sourceOffset, index) => {
    const start: Point3 = [
      source[0] + sourceOffset[0],
      source[1] + sourceOffset[1],
      source[2] + sourceOffset[2],
    ];
    const end: Point3 = [
      coreLinkTarget[0] + targetOffsets[index][0],
      coreLinkTarget[1] + targetOffsets[index][1],
      coreLinkTarget[2] + targetOffsets[index][2],
    ];
    const mid: Point3 = [
      start[0] * 0.58 + end[0] * 0.42,
      start[1] * 0.56 + end[1] * 0.44 + 0.42,
      start[2] * 0.58 + end[2] * 0.42,
    ];

    return [start, mid, end];
  });
}

export function FloatingPanels({
  language,
  activeItem,
  onActiveItemChange,
}: {
  language: Language;
  activeItem: NavItemId | null;
  onActiveItemChange: (item: NavItemId | null) => void;
}) {
  const copy = floatingPanelUiCopy[language];
  const [hoveredPanel, setHoveredPanel] = useState<NavItemId | null>(null);
  const panelRefs = useRef<(ThreeGroup | null)[]>([]);
  const heroPanels = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        ...panelLayouts[item.id],
        ...moduleCopy[language][item.id],
      })),
    [language]
  );
  const activePanel = hoveredPanel ?? activeItem;
  const openIndex = useMemo(
    () => heroPanels.findIndex((panel) => panel.id === activeItem),
    [activeItem, heroPanels]
  );
  const activePanelLinks = useMemo(() => {
    if (openIndex === -1) return [];

    const panel = heroPanels[openIndex];

    return createPanelLinks(
      getTargetPosition(panel.position, openIndex, openIndex)
    );
  }, [openIndex, heroPanels]);
  const activeModule = activeItem ? moduleCopy[language][activeItem] : null;
  const performancePolyline = performancePoints
    .map(([x, y]) => `${x},${y}`)
    .join(" ");
  const performanceFill = `0,118 ${performancePolyline} 646,118`;
  const performanceLabel =
    language === "ru" ? "Р СџРЎР‚Р С•Р С‘Р В·Р Р†Р С•Р Т‘Р С‘РЎвЂљР ВµР В»РЎРЉР Р…Р С•РЎРѓРЎвЂљРЎРЉ" : "System Performance";

  useFrame((_state: RootState, delta: number) => {
    heroPanels.forEach((panel, index) => {
      const group = panelRefs.current[index];
      if (!group) return;

      const isOpen = openIndex !== -1 && index === openIndex;
      const [targetX, targetY, targetZ] = getTargetPosition(
        panel.position,
        index,
        openIndex
      );
      const targetScale = isOpen ? 1.02 : 1;
      const targetRotationY = isOpen ? panel.rotation[1] * 0.45 : panel.rotation[1];
      const targetRotationX = isOpen ? panel.rotation[0] * 0.45 : panel.rotation[0];

      group.position.x = THREE.MathUtils.lerp(group.position.x, targetX, delta * 2.8);
      group.position.y = THREE.MathUtils.lerp(group.position.y, targetY, delta * 2.8);
      group.position.z = THREE.MathUtils.lerp(group.position.z, targetZ, delta * 2.8);
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotationX, delta * 3.1);
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotationY, delta * 3.1);
      group.scale.x = THREE.MathUtils.lerp(group.scale.x, targetScale, delta * 3.1);
      group.scale.y = THREE.MathUtils.lerp(group.scale.y, targetScale, delta * 3.1);
      group.scale.z = THREE.MathUtils.lerp(group.scale.z, targetScale, delta * 3.1);
    });
  });

  const handlePanelKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    panelId: NavItemId
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onActiveItemChange(panelId);
    }
  };

  return (
    <group position={[0, 0, -2]}>
      {activePanelLinks.map((points, index) => (
        <group key={`active-panel-link-${activeItem ?? "closed"}-${index}`}>
          <Line
            points={points}
            color="#8e7cff"
            transparent
            opacity={0.1}
            lineWidth={3.2}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
          <Line
            points={points}
            color="#f3deff"
            transparent
            opacity={0.4}
            lineWidth={0.72}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </group>
      ))}

      {!activeItem ? heroPanels.map((panel, index) => {
        const isOpen = activeItem === panel.id;
        const isHovered = hoveredPanel === panel.id;
        const isActive = activePanel === panel.id;

        return (
          <group
            key={panel.id}
            ref={(group: ThreeGroup | null) => {
              panelRefs.current[index] = group;
            }}
            position={panel.position}
            rotation={panel.rotation}
          >
            <Html
              transform
              distanceFactor={isOpen ? 10.7 : 13.5}
              position={[0, 0, 0]}
              wrapperClass="floating-panel-wrap"
            >
              <article
                className={[
                  "floating-panel",
                  isOpen ? "is-selected" : "",
                  isHovered ? "is-hovered" : "",
                  isActive ? "is-active" : "",
                  activePanel && !isActive ? "is-inactive" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                role="button"
                tabIndex={0}
                onMouseEnter={() => setHoveredPanel(panel.id)}
                onMouseLeave={() =>
                  setHoveredPanel((current) =>
                    current === panel.id ? null : current
                  )
                }
                onClick={() => onActiveItemChange(panel.id)}
                onKeyDown={(event) => handlePanelKeyDown(event, panel.id)}
              >
                <div className="floating-panel-top">
                  <span className="floating-panel-eyebrow">{panel.eyebrow}</span>
                  <span className="floating-panel-accent">
                    {isOpen ? copy.linked : panel.code}
                  </span>
                </div>

                <div className="floating-panel-heading">
                  <span className="floating-panel-icon-frame" aria-hidden="true">
                    <Image
                      className="floating-panel-icon-image"
                      src={navIconSources[panel.id]}
                      alt=""
                      width={92}
                      height={92}
                      unoptimized
                    />
                  </span>
                  <div>
                    <p className="floating-panel-title">{panel.title}</p>
                    <p className="floating-panel-subtitle">{panel.subtitle}</p>
                  </div>
                </div>

                <p className="floating-panel-summary">{panel.subtitle}</p>

                <div className="floating-panel-grid">
                  <div className="floating-panel-lines">
                    {panel.cards.map((card) => (
                      <div key={card.title} className="floating-panel-line">
                        {card.title}
                      </div>
                    ))}
                  </div>
                  <div className="floating-panel-meter">
                    <span className="floating-panel-bar floating-panel-bar-a" />
                    <span className="floating-panel-bar floating-panel-bar-b" />
                    <span className="floating-panel-bar floating-panel-bar-c" />
                  </div>
                </div>

                <div className="floating-panel-footer">
                  <span className="floating-panel-hint">
                    {isOpen ? copy.linked : copy.activate}
                  </span>
                  <span className="floating-panel-state">
                    {isHovered ? copy.focused : isOpen ? copy.expanded : copy.standby}
                  </span>
                </div>

                <div className="floating-panel-corners">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </article>
            </Html>
          </group>
        );
      }) : null}

      {activeModule && activeItem ? (
        <Html fullscreen wrapperClass="system-module-stage">
          <section
            key={`${language}-${activeItem}`}
            className="system-module-panel"
            aria-label={activeModule.title}
          >
            <span className="system-module-corner system-module-corner-tl" />
            <span className="system-module-corner system-module-corner-tr" />
            <span className="system-module-corner system-module-corner-bl" />
            <span className="system-module-corner system-module-corner-br" />
            <span className="system-module-link-line system-module-link-line-a" />
            <span className="system-module-link-line system-module-link-line-b" />
            <span className="system-module-link-line system-module-link-line-c" />

            <div className="system-module-top">
              <span>{activeModule.eyebrow}</span>
              <div className="system-module-top-status">
                <span>Core Module</span>
                <strong>Active</strong>
              </div>
            </div>

            <div className="system-module-grid">
              <div className="system-module-main">
                <div className="system-module-heading">
                  <span className="system-module-icon-frame" aria-hidden="true">
                    <Image
                      className="system-module-icon-image"
                      src={navIconSources[activeItem]}
                      alt=""
                      width={120}
                      height={120}
                      unoptimized
                    />
                  </span>
                  <div>
                    <h2>{activeModule.title}</h2>
                    <p>{activeModule.subtitle}</p>
                  </div>
                </div>

                <p className="system-module-description">
                  {activeModule.description}
                </p>

                <div className="system-module-cards">
                  {activeModule.cards.map((card) => (
                    <article key={card.title} className="system-module-info-card">
                      <span aria-hidden="true" />
                      <h3>{card.title}</h3>
                      <p>{card.text}</p>
                      <i aria-hidden="true">&gt;</i>
                    </article>
                  ))}
                </div>
              </div>

              <div className="system-module-visual" aria-hidden="true">
                <span className="system-module-orbit" />
                <span className="system-module-orbit" />
                <span className="system-module-orbit" />
                <span className="system-module-core" />
                {Array.from({ length: 18 }, (_, index) => (
                  <span
                    key={index}
                    className="system-module-node"
                    style={
                      {
                        "--angle": `${index * 20}deg`,
                        "--radius": `${38 + (index % 4) * 10}%`,
                      } as CSSProperties
                    }
                  />
                ))}
              </div>

              <aside className="system-module-side">
                <div className="system-module-metrics">
                  {activeModule.metrics.map((metric) => (
                    <div key={metric.label}>
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                      <em aria-hidden="true" />
                      <i aria-hidden="true" />
                    </div>
                  ))}
                </div>
              </aside>

              <div className="system-module-performance">
                <div>
                  <span>{performanceLabel}</span>
                  <strong>24H</strong>
                </div>
                <div className="system-module-chart" aria-hidden="true">
                  <svg viewBox="0 0 646 118" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="moduleChartFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(179,147,255,0.34)" />
                        <stop offset="100%" stopColor="rgba(179,147,255,0)" />
                      </linearGradient>
                    </defs>
                    <polyline
                      className="system-module-chart-fill"
                      points={performanceFill}
                    />
                    <polyline
                      className="system-module-chart-line"
                      points={performancePolyline}
                    />
                    {performancePoints
                      .filter((_, index) => index % 4 === 3)
                      .map(([x, y]) => (
                        <circle key={`${x}-${y}`} cx={x} cy={y} r="4.2" />
                      ))}
                  </svg>
                </div>
              </div>

              <div className="system-module-status-card">
                <span>Model Status</span>
                <strong>Active</strong>
              </div>

              <div className="system-module-model">
                <span>{activeModule.modelTitle}</span>
                <strong>{activeModule.modelMeta}</strong>
                <div className="system-module-model-wave" aria-hidden="true">
                  {Array.from({ length: 48 }, (_, index) => (
                    <span
                      key={index}
                      style={
                        {
                          "--wave": `${18 + ((index * 13 + activeItem.length * 7) % 54)}%`,
                        } as CSSProperties
                      }
                    />
                  ))}
                </div>
                <i />
              </div>
            </div>

            <a
              className="system-module-action"
              href={getWhatsAppHref(language, activeModule.action)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span aria-hidden="true">&lt;&gt;</span>
              <strong>{activeModule.action}</strong>
              <i aria-hidden="true" />
            </a>
          </section>
        </Html>
      ) : null}
    </group>
  );
}
