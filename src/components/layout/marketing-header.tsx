"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS } from "@/constants/navigation";
import { Button } from "@/components/common/button";
import { DemoLaunchButton } from "@/components/common/demo-launch-button";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils/cn";

export const MarketingHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-app/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-3 rounded-full border border-border bg-panel px-3 py-1.5 md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-2.5 py-1 text-sm text-muted transition duration-200 hover:bg-surface hover:text-heading"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <DemoLaunchButton label="Get Demo" />
        </div>

        <button
          className="focus-ring inline-flex rounded-lg p-2 text-heading md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border px-4 transition-all duration-200 md:hidden",
          open ? "max-h-96 py-4" : "max-h-0 py-0"
        )}
      >
        <div className="flex flex-col gap-3">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-panel hover:text-heading"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-1">
            <Link href="/login" className="flex-1" onClick={() => setOpen(false)}>
              <Button className="w-full" variant="secondary">
                Sign In
              </Button>
            </Link>
            <DemoLaunchButton className="w-full flex-1" label="Get Demo" onNavigate={() => setOpen(false)} />
          </div>
        </div>
      </div>
    </header>
  );
};

