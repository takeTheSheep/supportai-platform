import { create } from "zustand";
import { ScenarioMode } from "@/types/domain";

export interface DemoChatMessage {
  id: string;
  sender: "user" | "assistant" | "system";
  text: string;
  timestamp: string;
  confidence?: number;
  suggestedPrompts?: string[];
  feedback?: "HELPFUL" | "NOT_HELPFUL";
}

interface DemoChatState {
  scenario: ScenarioMode;
  messages: DemoChatMessage[];
  pending: boolean;
  escalationMarked: boolean;
  setScenario: (scenario: ScenarioMode) => void;
  addMessage: (message: DemoChatMessage) => void;
  setPending: (pending: boolean) => void;
  setMessageFeedback: (
    id: string,
    feedback: "HELPFUL" | "NOT_HELPFUL"
  ) => void;
  markEscalated: () => void;
  resetConversation: () => void;
}

const defaultSystemMessage = {
  id: "system_welcome",
  sender: "assistant" as const,
  text: "Welcome to SupportAI demo. Ask a question to see scenario-aware assistant behavior.",
  timestamp: new Date().toISOString()
};

export const useDemoChatStore = create<DemoChatState>((set) => ({
  scenario: "SAAS",
  messages: [defaultSystemMessage],
  pending: false,
  escalationMarked: false,
  setScenario: (scenario) =>
    set({
      scenario,
      messages: [
        {
          ...defaultSystemMessage,
          id: `system_${scenario}_${Date.now()}`,
          timestamp: new Date().toISOString(),
          text: `Scenario switched to ${scenario}.` 
        }
      ],
      escalationMarked: false
    }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setPending: (pending) => set({ pending }),
  setMessageFeedback: (id, feedback) =>
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === id ? { ...message, feedback } : message
      )
    })),
  markEscalated: () =>
    set((state) => ({
      escalationMarked: true,
      messages: [
        ...state.messages,
        {
          id: `system_escalate_${Date.now()}`,
          sender: "system",
          text: "Conversation marked for human follow-up.",
          timestamp: new Date().toISOString()
        }
      ]
    })),
  resetConversation: () =>
    set({
      messages: [
        {
          ...defaultSystemMessage,
          id: `system_reset_${Date.now()}`,
          timestamp: new Date().toISOString()
        }
      ],
      pending: false,
      escalationMarked: false
    })
}));

