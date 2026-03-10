import { SettingsCenter } from "@/components/forms/settings-center";
import { settingsService } from "@/lib/services/settings/settings-service";

export default async function SettingsPage() {
  const [workspace, assistant] = await Promise.all([
    settingsService.getWorkspaceSettings(),
    settingsService.getAssistantSettings()
  ]);

  return <SettingsCenter workspace={workspace} assistant={assistant} />;
}

