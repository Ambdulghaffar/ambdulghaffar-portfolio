"use client";

import { useEffect, useState } from "react";

/** Tracks the current URL hash (without the `#`) so nav items can mark themselves active. */
export function useActiveHash() {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const update = () => setHash(window.location.hash.replace("#", ""));
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  return hash;
}
