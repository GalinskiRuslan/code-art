export const heroAssets = {
  logoModel: "/models/codeart.glb",
  marsTexture: "/textures/Solarsystemscope_texture_8k_mars.jpg",
  earthTexture: "/textures/2k_earth_daymap.jpg",
} as const;

export const labAssets = {
  characterModel: "/models/anims/Typing.fbx",
  animations: [
    { name: "Work", url: "/models/anims/Typing.fbx" },
    { name: "Relax", url: "/models/anims/Female Sitting Pose.fbx" },
    { name: "Reset", url: "/models/anims/uberi pul.fbx" },
    { name: "Wave", url: "/models/anims/volna palcami.fbx" },
  ],
  notebook: "/models/noteBook.glb",
  desk: "/models/tableWood.glb",
  chair: "/models/Office_Comfort_1213133208_texture.glb",
  floorTexture:
    "/models/textures/textur-gas-kvas-com-7hme-p-teksturi-pol-parket-1.jpg",
  wallTexture: "/models/textures/0fc7afd1563eec5c52d610699bd6e893.jpg",
  ceilingTexture: "/models/textures/7i3kovkzemoqexiipwnnqdgsxzfju7va.jpg",
} as const;

export const interludeAssets = {
  electricNebula: "/models/Meshy_AI_Electric_Nebula_0406104156_texture.glb",
  neonCircuitGrid: "/models/Meshy_AI_Neon_Circuit_Grid_0406142803_texture.glb",
  neonCircuitMetropol: "/models/Meshy_AI_Neon_Circuit_Metropol_0407132653_texture.glb",
} as const;
