declare module "@react-three/fiber" {
  export type RootState =
    import("@react-three/fiber/dist/declarations/src/core/store").RootState;
  export const useLoader:
    typeof import("@react-three/fiber/dist/declarations/src/core/hooks").useLoader;
}
