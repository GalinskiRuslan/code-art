"use client";

import { HeroOverlay } from "./HeroOverlay";

export function OverlaySections() {
  return (
    <div className="overlay-flow">
      <section className="overlay-panel-stage">
        <div className="panel-copy">
          <HeroOverlay />
        </div>
      </section>
    </div>
  );
}
