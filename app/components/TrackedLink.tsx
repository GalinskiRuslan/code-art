"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ComponentProps } from "react";
import { trackEvent } from "../lib/analytics";

type TrackedAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  eventPayload?: Record<string, unknown>;
};

// Server Component pages (career, services, ...) render mostly static
// HTML, but a plain <a onClick={...}> isn't allowed there — event
// handlers can only live on a Client Component. These two small
// components are the interactive leaf used to track clicks without
// converting the whole page to a Client Component.
export function TrackedAnchor({
  eventName,
  eventPayload,
  onClick,
  ...props
}: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventPayload);
        onClick?.(event);
      }}
    />
  );
}

type TrackedNextLinkProps = ComponentProps<typeof Link> & {
  eventName: string;
  eventPayload?: Record<string, unknown>;
};

export function TrackedLink({
  eventName,
  eventPayload,
  onClick,
  ...props
}: TrackedNextLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventPayload);
        onClick?.(event);
      }}
    />
  );
}
