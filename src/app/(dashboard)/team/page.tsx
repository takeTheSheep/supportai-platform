import { TeamOverview } from "@/components/dashboard/team-overview";
import { repository } from "@/lib/repositories";

export default async function TeamPage() {
  const members = await repository.listTeamStats();

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Team</p>
        <h1 className="text-2xl font-semibold text-heading">Support team and oversight performance</h1>
      </div>
      <TeamOverview members={members} />
    </div>
  );
}

