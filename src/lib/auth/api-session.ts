import { auth } from "@/lib/auth/auth";

export const requireApiSession = async () => {
  const session = await auth();
  if (!session?.user) {
    return { error: new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 }) };
  }

  return { session };
};

