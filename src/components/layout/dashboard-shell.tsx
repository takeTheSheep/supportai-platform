import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { auth } from "@/lib/auth/auth";

export const DashboardShell = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  const session = await auth();

  const user = session?.user ?? {
    name: "Demo User",
    role: "SUPPORT_AGENT"
  };

  return (
    <div className="min-h-screen bg-app lg:flex">
      <DashboardSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardTopbar
          userName={user.name ?? "Demo User"}
          role={(user.role ?? "SUPPORT_AGENT").replaceAll("_", " ")}
        />
        <main className="mx-auto w-full max-w-[1480px] flex-1 px-4 py-7 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

