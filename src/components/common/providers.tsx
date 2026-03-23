"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export const Providers = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.remove("route-pending");
    }
  }, [pathname]);

  return children;
};

