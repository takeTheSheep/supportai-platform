"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/common/button";
import { cn } from "@/lib/utils/cn";

export const DemoLaunchButton = ({
  className,
  size = "md",
  variant = "primary",
  label = "Get Demo",
  onNavigate
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost" | "danger";
  label?: string;
  onNavigate?: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [launching, setLaunching] = useState(false);
  const fallbackTimerRef = useRef<number | null>(null);
  const pushTimerRef = useRef<number | null>(null);

  useEffect(() => {
    router.prefetch("/demo");
  }, [router]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.remove("route-pending");
    }

    if (pathname === "/demo") {
      setLaunching(false);
    }
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (fallbackTimerRef.current) {
        window.clearTimeout(fallbackTimerRef.current);
      }
      if (pushTimerRef.current) {
        window.clearTimeout(pushTimerRef.current);
      }
    };
  }, []);

  const launchDemo = () => {
    if (launching) return;
    if (pathname === "/demo") return;

    setLaunching(true);
    onNavigate?.();

    if (typeof document !== "undefined") {
      document.body.classList.add("route-pending");
    }

    pushTimerRef.current = window.setTimeout(() => {
      router.push("/demo");
    }, 180);

    // Client routing fallback so the button cannot stay stuck.
    fallbackTimerRef.current = window.setTimeout(() => {
      if (window.location.pathname !== "/demo") {
        window.location.assign("/demo");
      }
    }, 1500);
  };

  return (
    <Button
      type="button"
      className={cn("gap-2", className)}
      size={size}
      variant={variant}
      loading={launching}
      loadingLabel="Opening demo..."
      onClick={launchDemo}
      aria-label="Launch interactive demo"
    >
      {label}
    </Button>
  );
};
