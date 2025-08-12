import { StreamChat } from "stream-chat";

const streamServerClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_KEY!,
  process.env.STREAM_SECRET,
);

// Utility function to safely get unread count with error handling
export async function getUnreadMessagesCount(userId: string): Promise<number> {
  try {
    const response = await streamServerClient.getUnreadCount(userId);
    return response.total_unread_count;
  } catch (error) {
    console.error(
      "Failed to get unread messages count from Stream Chat:",
      error,
    );

    // Log more details for debugging
    if (error && typeof error === "object" && "status" in error) {
      console.error(
        `Stream Chat error status: ${(error as { status: number }).status}`,
      );
    }

    return 0; // Return 0 as fallback when Stream Chat is unavailable
  }
}

export default streamServerClient;
