"use client";

import { useEffect, useState } from "react";

export const useAnimatedNumber = (target: number, duration = 700) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
};

