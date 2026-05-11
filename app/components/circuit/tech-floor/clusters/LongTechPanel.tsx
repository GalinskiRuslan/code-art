"use client";

import { FoundationTileWide, MirrorPlateRect } from "../foundation/FoundationTiles";
import { ChipFlatModule, ChipMediumRect, ChipRibbedModule, ChipSmallRect, HeroChip } from "../chips/ChipModules";
import { LaneStraight, TraceDual, TraceMainChannel, TraceStraightL } from "../traces/TraceModules";
import { CapCluster3, CapCluster5, HeatsinkMedium, TowerChipSmall } from "../vertical/VerticalModules";
import { EmissiveBarStrip, EmissivePanelSquare, GreeblePlateA, PinsRowShort, SlotPanel } from "../details/DetailModules";

type PanelProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

export function LongTechPanel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: PanelProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <FoundationTileWide position={[-2.1, 0, 0]} />
      <FoundationTileWide position={[2.1, 0, 0]} />
      <MirrorPlateRect position={[-2.1, 0.26, 0]} scale={0.96} />
      <MirrorPlateRect position={[2.1, 0.26, 0]} scale={0.96} />

      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={[8.8, 0.12, 2.2]} />
        <meshStandardMaterial
          color="#08111b"
          roughness={0.28}
          metalness={0.86}
          emissive="#67c8ff"
          emissiveIntensity={0.06}
        />
      </mesh>

      <HeroChip position={[0, 0.18, 0]} scale={0.62} />

      <ChipMediumRect position={[-2.9, 0.28, -0.42]} />
      <ChipMediumRect position={[-2.9, 0.28, 0.42]} />
      <ChipMediumRect position={[2.9, 0.28, -0.42]} />
      <ChipMediumRect position={[2.9, 0.28, 0.42]} />

      <ChipRibbedModule position={[-1.45, 0.24, 0.74]} scale={0.9} />
      <ChipRibbedModule position={[1.45, 0.24, -0.74]} scale={0.9} />
      <ChipRibbedModule position={[-1.45, 0.24, -0.74]} scale={0.72} />
      <ChipRibbedModule position={[1.45, 0.24, 0.74]} scale={0.72} />
      <ChipFlatModule position={[-4.05, 0.2, 0.68]} scale={0.9} />
      <ChipFlatModule position={[4.05, 0.2, -0.68]} scale={0.9} />
      <ChipFlatModule position={[-2.35, 0.22, 0]} scale={0.68} />
      <ChipFlatModule position={[2.35, 0.22, 0]} scale={0.68} />
      <ChipSmallRect position={[-4.28, 0.22, -0.52]} />
      <ChipSmallRect position={[4.28, 0.22, 0.52]} />
      <ChipSmallRect position={[-3.1, 0.22, 0.92]} scale={0.78} />
      <ChipSmallRect position={[3.1, 0.22, -0.92]} scale={0.78} />
      <ChipSmallRect position={[-1.12, 0.24, 1.08]} scale={0.72} />
      <ChipSmallRect position={[1.12, 0.24, -1.08]} scale={0.72} />
      <ChipSmallRect position={[-0.42, 0.24, -1.18]} scale={0.6} />
      <ChipSmallRect position={[0.42, 0.24, 1.18]} scale={0.6} />
      <ChipFlatModule position={[-0.98, 0.22, 0]} scale={0.54} />
      <ChipFlatModule position={[0.98, 0.22, 0]} scale={0.54} />
      <ChipRibbedModule position={[-3.9, 0.22, 0]} scale={0.58} />
      <ChipRibbedModule position={[3.9, 0.22, 0]} scale={0.58} />

      <CapCluster5 position={[-1.12, 0.2, -1]} />
      <CapCluster3 position={[1.12, 0.2, 1]} />
      <CapCluster3 position={[-3.72, 0.2, 0.96]} />
      <CapCluster5 position={[3.72, 0.2, -0.96]} />
      <CapCluster3 position={[-4.92, 0.2, -0.86]} scale={0.82} />
      <CapCluster3 position={[4.92, 0.2, 0.86]} scale={0.82} />
      <CapCluster3 position={[-2.14, 0.2, 1.08]} scale={0.68} />
      <CapCluster3 position={[2.14, 0.2, -1.08]} scale={0.68} />

      <HeatsinkMedium position={[-2.22, 0.18, -0.98]} />
      <HeatsinkMedium position={[2.22, 0.18, 0.98]} />
      <HeatsinkMedium position={[-0.2, 0.18, -1.18]} scale={0.7} />
      <HeatsinkMedium position={[0.2, 0.18, 1.18]} scale={0.7} />
      <TowerChipSmall position={[-4.6, 0.18, -0.02]} />
      <TowerChipSmall position={[4.6, 0.18, 0.02]} />
      <TowerChipSmall position={[-2.9, 0.18, 0.02]} scale={0.82} />
      <TowerChipSmall position={[2.9, 0.18, -0.02]} scale={0.82} />
      <TowerChipSmall position={[-1.52, 0.18, -0.22]} scale={0.64} />
      <TowerChipSmall position={[1.52, 0.18, 0.22]} scale={0.64} />

      <PinsRowShort position={[-0.86, 0.26, -1.28]} scale={1.2} />
      <PinsRowShort position={[0.86, 0.26, 1.28]} scale={1.2} />
      <PinsRowShort position={[-2.76, 0.24, -1.18]} scale={0.92} />
      <PinsRowShort position={[2.76, 0.24, 1.18]} scale={0.92} />
      <PinsRowShort position={[-4.72, 0.22, -1.02]} scale={0.82} />
      <PinsRowShort position={[4.72, 0.22, 1.02]} scale={0.82} />
      <EmissivePanelSquare position={[0, 1.02, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0.72} />
      <EmissiveBarStrip position={[-2.96, 0.34, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.2} />
      <EmissiveBarStrip position={[2.96, 0.34, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.2} />
      <EmissiveBarStrip position={[-4.82, 0.28, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0.72} />
      <EmissiveBarStrip position={[4.82, 0.28, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0.72} />
      <EmissiveBarStrip position={[0, 0.3, -1.22]} rotation={[-Math.PI / 2, 0, 0]} scale={0.88} />
      <EmissiveBarStrip position={[0, 0.3, 1.22]} rotation={[-Math.PI / 2, 0, 0]} scale={0.88} />
      <GreeblePlateA position={[-4.86, 0.16, -0.86]} />
      <GreeblePlateA position={[4.86, 0.16, 0.86]} />
      <GreeblePlateA position={[-3.48, 0.16, 0]} scale={0.82} />
      <GreeblePlateA position={[3.48, 0.16, 0]} scale={0.82} />
      <GreeblePlateA position={[-1.86, 0.16, 0.82]} scale={0.62} />
      <GreeblePlateA position={[1.86, 0.16, -0.82]} scale={0.62} />
      <SlotPanel position={[-3.86, 0.16, 0.88]} />
      <SlotPanel position={[3.86, 0.16, -0.88]} />
      <SlotPanel position={[-1.84, 0.16, -0.92]} scale={0.82} />
      <SlotPanel position={[1.84, 0.16, 0.92]} scale={0.82} />
      <SlotPanel position={[-0.52, 0.16, 0]} scale={0.62} />
      <SlotPanel position={[0.52, 0.16, 0]} scale={0.62} />

      <LaneStraight position={[0, 0.24, -1.04]} scale={2.2} />
      <LaneStraight position={[0, 0.24, 1.04]} scale={2.2} />
      <LaneStraight position={[-3.54, 0.22, -1.02]} scale={1.18} />
      <LaneStraight position={[3.54, 0.22, 1.02]} scale={1.18} />
      <LaneStraight position={[-1.76, 0.22, -1.02]} scale={0.82} />
      <LaneStraight position={[1.76, 0.22, 1.02]} scale={0.82} />
      <TraceMainChannel position={[-2.92, 0.22, -0.08]} scale={1.16} />
      <TraceMainChannel position={[2.92, 0.22, 0.08]} rotation={[0, Math.PI, 0]} scale={1.16} />
      <TraceDual position={[-4.3, 0.2, 0]} scale={1.1} />
      <TraceDual position={[4.3, 0.2, 0]} scale={1.1} />
      <TraceDual position={[-1.92, 0.2, 0]} scale={0.72} />
      <TraceDual position={[1.92, 0.2, 0]} scale={0.72} />
      <TraceStraightL position={[-1.72, 0.2, -1.18]} rotation={[0, 0.04, 0]} />
      <TraceStraightL position={[1.72, 0.2, 1.18]} rotation={[0, -0.04, 0]} />
      <TraceStraightL position={[-4.92, 0.2, -0.86]} rotation={[0, 0.02, 0]} scale={0.78} />
      <TraceStraightL position={[4.92, 0.2, 0.86]} rotation={[0, -0.02, 0]} scale={0.78} />
      <TraceStraightL position={[-0.74, 0.2, -1.34]} rotation={[0, 0.02, 0]} scale={0.54} />
      <TraceStraightL position={[0.74, 0.2, 1.34]} rotation={[0, -0.02, 0]} scale={0.54} />

      <pointLight position={[0, 1.8, 0]} intensity={2.6} distance={12} color="#bfe1ff" />
    </group>
  );
}
