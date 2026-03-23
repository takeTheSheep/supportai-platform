import Link from "next/link";
import { APP_NAME } from "@/constants/navigation";

export const Logo = ({ href = "/" }: { href?: string }) => {
  const stem = APP_NAME.endsWith("AI") ? APP_NAME.slice(0, -2) : APP_NAME;

  return (
    <Link href={href} className="group inline-flex items-center gap-3">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primaryDeep text-sm font-bold text-white shadow-soft transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lift">
        S
      </span>
      <span className="text-base font-semibold tracking-tight text-heading">
        {stem}
        {APP_NAME.endsWith("AI") ? <span className="text-gradient-blue">AI</span> : null}
      </span>
    </Link>
  );
};

