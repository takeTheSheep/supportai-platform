"use client";

import { useEffect, useRef, useState } from "react";

const metrics = [
  { value: 4.2, decimals: 1, suffix: "s", label: "Avg response time" },
  { value: 94, decimals: 0, suffix: "%", label: "Resolution rate" },
  { value: 73, decimals: 0, suffix: "%", label: "Fewer escalations", prefix: "-" },
  { value: 4.8, decimals: 1, suffix: "/5", label: "User satisfaction" }
];

const AnimatedMetric = ({
  value,
  decimals,
  suffix,
  label,
  prefix = ""
}: {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
  prefix?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let started = false;
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;

        const duration = 1100;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setDisplay(value * eased);
          if (progress < 1) {
            frame = window.requestAnimationFrame(tick);
          }
        };

        frame = window.requestAnimationFrame(tick);
      },
      { threshold: 0.45 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [value]);

  const formatted = decimals === 0 ? Math.round(display).toString() : display.toFixed(decimals);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-semibold tracking-tight text-heading md:text-5xl">
        {prefix}
        {formatted}
        {suffix}
      </div>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </div>
  );
};

export const ReferenceLandingTrustMetricsSection = () => {
  return (
    <section className="section-block pt-10 md:pt-14">
      <div className="section-shell">
        <p className="mb-12 text-center text-xs font-semibold uppercase tracking-[0.28em] text-muted">
          Measurable impact from day one
        </p>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {metrics.map((metric) => (
            <AnimatedMetric key={metric.label} {...metric} />
          ))}
        </div>
      </div>
    </section>
  );
};
