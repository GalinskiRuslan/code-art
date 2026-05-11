"use client";

import { FoundationTileB, FoundationTileC, FoundationTileWide, MirrorPlateRect } from "../foundation/FoundationTiles";
import { ChipFlatModule, ChipMediumRect, ChipRibbedModule, ChipSmallRect, ChipSmallSquare, HeroChip } from "../chips/ChipModules";
import { LaneCornerRound, LaneRingLarge, LaneStraight, TraceCorner, TraceMainChannel, TraceStraightL, TraceStraightS } from "../traces/TraceModules";
import { CapCluster3, CapCluster5, HeatsinkMedium, HeatsinkSmall, TowerChipMedium, TowerChipSmall } from "../vertical/VerticalModules";
import { EmissiveBarStrip, EmissivePanelSquare, GreeblePlateA, GreeblePlateB, PinsGridSmall, PinsRowShort, SlotPanel } from "../details/DetailModules";

type ClusterProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

export function ClusterProcessorCorner({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: ClusterProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <FoundationTileWide />
      <MirrorPlateRect position={[0, 0.26, 0]} />
      <HeroChip position={[0, 0.18, 0]} scale={0.68} />
      <CapCluster3 position={[-1.4, 0.2, -0.9]} />
      <CapCluster5 position={[1.24, 0.2, 0.96]} />
      <HeatsinkSmall position={[1.48, 0.18, -0.98]} />
      <HeatsinkMedium position={[-1.42, 0.18, 0.92]} />
      <LaneRingLarge position={[0, 0.92, 0]} />
    </group>
  );
}

export function ClusterMemoryBank({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: ClusterProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <FoundationTileC />
      <ChipMediumRect position={[-0.44, 0.26, -0.38]} />
      <ChipMediumRect position={[0.44, 0.26, -0.38]} />
      <ChipMediumRect position={[-0.44, 0.26, 0.38]} />
      <ChipMediumRect position={[0.44, 0.26, 0.38]} />
      <PinsRowShort position={[0, 0.28, -0.94]} />
      <PinsRowShort position={[0, 0.28, 0.94]} />
      <EmissiveBarStrip position={[0, 0.34, 0]} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  );
}

export function ClusterCapacitorField({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: ClusterProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <FoundationTileB />
      <CapCluster5 position={[-0.4, 0.18, 0.08]} />
      <CapCluster3 position={[0.62, 0.18, -0.12]} />
      <TowerChipSmall position={[0.92, 0.18, 0.28]} />
      <GreeblePlateA position={[-0.92, 0.16, -0.2]} />
    </group>
  );
}

export function ClusterTraceHub({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: ClusterProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <FoundationTileB />
      <EmissivePanelSquare position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <TraceMainChannel position={[-0.7, 0.2, -0.2]} />
      <TraceCorner position={[0.82, 0.2, 0.46]} />
      <TraceStraightL position={[0, 0.2, 0.62]} />
      <LaneStraight position={[0, 0.24, -0.52]} />
      <LaneCornerRound position={[1.02, 0.24, -0.52]} />
    </group>
  );
}

export function ClusterGreebleField({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: ClusterProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <FoundationTileC />
      <ChipSmallSquare position={[-0.62, 0.22, -0.4]} />
      <ChipSmallRect position={[0.42, 0.22, -0.5]} />
      <ChipFlatModule position={[0.66, 0.18, 0.34]} />
      <ChipRibbedModule position={[-0.72, 0.18, 0.48]} scale={0.7} />
      <GreeblePlateA position={[0, 0.14, 0]} />
      <GreeblePlateB position={[0.92, 0.15, 0.06]} />
      <SlotPanel position={[-1, 0.15, 0.12]} />
      <PinsGridSmall position={[0.02, 0.18, -0.88]} />
      <TraceStraightS position={[0.94, 0.2, -0.18]} />
    </group>
  );
}

export function ClusterSkylineBlock({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: ClusterProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <FoundationTileB />
      <TowerChipMedium position={[-0.38, 0.18, -0.06]} />
      <TowerChipSmall position={[0.44, 0.18, 0.18]} />
      <CapCluster3 position={[0.94, 0.18, -0.22]} />
      <LaneStraight position={[-0.1, 0.2, 0.56]} scale={0.8} />
    </group>
  );
}
