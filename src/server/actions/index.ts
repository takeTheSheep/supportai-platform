"use server";

import { revalidatePath } from "next/cache";
import { mutations } from "@/server/mutations";

export async function markConversationResolvedAction(conversationId: string) {
  await mutations.resolveConversation(conversationId);
  revalidatePath("/conversations");
  revalidatePath("/dashboard");
}

export async function updateWidgetConfigAction(payload: unknown) {
  const updated = await mutations.updateWidgetConfig(payload);
  revalidatePath("/widget");
  return updated;
}

export async function updateAssistantSettingsAction(payload: unknown) {
  const updated = await mutations.updateAssistantSettings(payload);
  revalidatePath("/settings");
  return updated;
}

