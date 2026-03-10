"use client";

import { useEffect, useRef } from "react";

export const useAutoScroll = <T extends HTMLElement>(deps: unknown[]) => {
  const ref = useRef<T | null>(null);
  const depSignature = JSON.stringify(deps);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTo({
      top: ref.current.scrollHeight,
      behavior: "smooth"
    });
  }, [depSignature]);

  return ref;
};

