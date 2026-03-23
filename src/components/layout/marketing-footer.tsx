import Link from "next/link";
import { Logo } from "@/components/layout/logo";

export const MarketingFooter = () => {
  const linkColumns = [
    {
      heading: "Product",
      links: [
        { href: "/product", label: "Product" },
        { href: "/solutions", label: "Solutions" },
        { href: "/pricing", label: "Pricing" },
        { href: "/demo", label: "Interactive Demo" }
      ]
    },
    {
      heading: "Platform",
      links: [
        { href: "/security", label: "Security" },
        { href: "/login", label: "Sign In" },
        { href: "/register", label: "Create Account" }
      ]
    },
    {
      heading: "Legal",
      links: [
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" }
      ]
    }
  ];

  return (
    <footer className="mt-8 border-t border-border/80 bg-white/60 backdrop-blur">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))] lg:px-8">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted">
            Intelligent customer support that resolves faster, escalates cleanly, and keeps teams
            in control.
          </p>
        </div>

        {linkColumns.map((column) => (
          <div key={column.heading}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-muted">
              {column.heading}
            </p>
            <div className="space-y-3 text-sm text-body">
              {column.links.map((link) => (
                <Link key={link.href} href={link.href} className="block transition duration-200 hover:text-heading">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-3 border-t border-border/70 px-4 py-6 text-xs text-muted sm:px-6 md:flex-row md:items-center lg:px-8">
        <p>&copy; {new Date().getFullYear()} SupportAI. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/security" className="transition duration-200 hover:text-heading">
            Security
          </Link>
          <Link href="/privacy" className="transition duration-200 hover:text-heading">
            Privacy
          </Link>
          <Link href="/terms" className="transition duration-200 hover:text-heading">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

