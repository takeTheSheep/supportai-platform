import Link from "next/link";
import { Logo } from "@/components/layout/logo";

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen bg-app lg:grid-cols-[1.1fr_1fr]">
      <section className="hidden border-r border-border bg-panel p-10 lg:flex lg:flex-col lg:justify-between">
        <Logo />
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-heading">
            Controlled AI support for modern teams.
          </h1>
          <p className="max-w-md text-sm text-muted">
            Deploy a trustworthy support assistant, monitor performance, and escalate with confidence.
          </p>
        </div>
        <p className="text-xs text-muted">
          Need a public preview? <Link href="/demo" className="text-primary">Open interactive demo</Link>
        </p>
      </section>
      <section className="flex items-center justify-center px-4 py-12 sm:px-6">{children}</section>
    </div>
  );
}

