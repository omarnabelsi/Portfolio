"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Current year, resolved on the client so static pages never go stale. */
export function Year() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => 2026,
  );
  return <>{year}</>;
}
