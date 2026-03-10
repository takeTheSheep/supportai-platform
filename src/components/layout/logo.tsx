import Link from "next/link";
import { APP_NAME } from "@/constants/navigation";

export const Logo = ({ href = "/" }: { href?: string }) => {
  return (
    <Link href={href} className="inline-flex items-center gap-2">
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-xl border border-primary/20 bg-gradient-to-br from-primary to-violet text-sm font-bold text-white shadow-soft">
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border border-panel bg-teal" />
        AI
      </span>
      <span className="text-sm font-semibold tracking-tight text-heading">{APP_NAME}</span>
    </Link>
  );
};

