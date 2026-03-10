const notificationFeed: Array<{
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}> = [
  {
    id: "n1",
    title: "Escalation queue updated",
    body: "Northline Retail conversation needs manual follow-up.",
    read: false,
    createdAt: new Date().toISOString()
  }
];

export const notificationService = {
  async list() {
    return notificationFeed;
  },

  async markAsRead(id: string) {
    const found = notificationFeed.find((item) => item.id === id);
    if (found) {
      found.read = true;
    }

    return found ?? null;
  }
};

