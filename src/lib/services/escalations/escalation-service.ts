import { repository } from "@/lib/repositories";

export const escalationService = {
  async listQueue() {
    return repository.listEscalations();
  }
};

