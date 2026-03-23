"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/constants/navigation";
import { Button } from "@/components/common/button";
import { DemoLaunchButton } from "@/components/common/demo-launch-button";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils/cn";

export const MarketingHeader = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const elevated = scrolled || open || pathname !== "/";

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          "mx-auto w-full max-w-7xl transition-all duration-300",
          elevated ? "glass-panel" : "bg-transparent"
        )}
      >
        <div className="flex h-[72px] items-center justify-between px-4 sm:px-5">
          <Logo />

          <nav className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium text-body transition duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-primary after:transition-all after:duration-300 hover:text-heading hover:after:w-full",
                    active && "text-heading after:w-full"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <DemoLaunchButton size="sm" label="Open Demo" />
          </div>

          <button
            className="focus-ring inline-flex rounded-xl border border-border/70 bg-white/70 p-2 text-heading shadow-soft md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div
          className={cn(
            "overflow-hidden border-t border-border/70 transition-all duration-300 md:hidden",
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-4 py-4 sm:px-5">
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-body transition duration-200 hover:bg-white hover:text-heading"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button className="w-full" variant="secondary" size="sm">
                    Sign in
                  </Button>
                </Link>
                <DemoLaunchButton
                  className="w-full"
                  size="sm"
                  label="Open Demo"
                  onNavigate={() => setOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

