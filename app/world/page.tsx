import type { Metadata } from "next";
import { WorldMapLab } from "./WorldMapLab";

export const metadata: Metadata = {
  title: "Global Tech Map",
  description:
    "Экспериментальная страница с картой глобальных IT-компаний, тех-хабов, маршрутов и интерактивной SVG-картой мира.",
  alternates: {
    canonical: "/world",
  },
};

export default function WorldPage() {
  return <WorldMapLab />;
}
