"use client";

import { useEffect } from "react";

/** Fallback for browsers/transitions where Next.js's built-in hash scroll doesn't kick in. */
export function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const target = document.getElementById(hash);
    if (target) {
      target.scrollIntoView();
    }
  }, []);

  return null;
}
