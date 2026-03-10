import Link from "next/link";
import { Logo } from "@/components/layout/logo";

export const MarketingFooter = () => {
  return (
    <footer className="border-t border-border bg-panel">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Logo />
          <p className="text-sm text-muted">
            AI customer support platform for trustworthy business automation.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          <Link href="/security" className="hover:text-heading">
            Security
          </Link>
          <Link href="/privacy" className="hover:text-heading">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-heading">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

