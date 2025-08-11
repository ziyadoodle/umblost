import { useEffect, useState } from "react";
import { useSession } from "../SessionProvider";
import { StreamChat } from "stream-chat";
import kyInstance from "@/lib/ky";

export default function useInitializeChatClient() {
  const { user } = useSession();

  const [chatClient, setChatClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!);

    client
      .connectUser(
        {
          id: user.id,
          username: user.username,
          name: user.name,
          image: user.avatarUrl || undefined,
        },
        async () =>
          kyInstance
            .get("api/get-token")
            .json<{ token: string }>()
            .then((data) => data.token),
      )
      .catch((error) =>
        console.error("Error connecting user to Stream Chat:", error),
      )
      .then(() => setChatClient(client));

    return () => {
      setChatClient(null);
      client
        .disconnectUser()
        .catch((error) =>
          console.error("Error disconnecting user from Stream Chat:", error),
        )
        .then(() => console.log("Stream Chat client disconnected"));
    };
  }, [user.id, user.username, user.name, user.avatarUrl]);

  return chatClient;
}
