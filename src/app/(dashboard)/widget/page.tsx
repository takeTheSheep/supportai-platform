import { WidgetCustomizer } from "@/components/widget/widget-customizer";
import { widgetService } from "@/lib/services/widget/widget-service";

export default async function WidgetPage() {
  const config = await widgetService.getConfig();

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Widget</p>
        <h1 className="text-2xl font-semibold text-heading">Customize your website support widget</h1>
      </div>
      <WidgetCustomizer config={config} />
    </div>
  );
}

