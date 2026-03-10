const auditFeed: Array<{
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}> = [];

const createAuditId = () => `audit_${Math.random().toString(36).slice(2, 10)}`;

export const auditService = {
  async log(entry: {
    actor: string;
    action: string;
    target: string;
    metadata?: Record<string, unknown>;
  }) {
    auditFeed.unshift({
      id: createAuditId(),
      actor: entry.actor,
      action: entry.action,
      target: entry.target,
      timestamp: new Date().toISOString(),
      metadata: entry.metadata
    });
  },

  async list(limit = 25) {
    return auditFeed.slice(0, limit);
  }
};

