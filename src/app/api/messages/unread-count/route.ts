import { validateRequest } from "@/auth";
import streamServerClient from "@/lib/stream";
import { MessageCountInfo } from "@/lib/types";

export async function GET() {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { total_unread_count } = await streamServerClient.getUnreadCount(
      user.id,
    );

    const data: MessageCountInfo = {
      unreadCount: total_unread_count,
    };

    return Response.json(data);
  } catch (error) {
    console.error("Error fetching unread messages count:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
