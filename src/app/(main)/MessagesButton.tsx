"use client";

import { Button } from "@/components/ui/button";
import kyInstance from "@/lib/ky";
import { MessageCountInfo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MessagesButtonProps {
    initialState: MessageCountInfo
}

export default function MessagesButton({ initialState }: MessagesButtonProps) {
    const { data } = useQuery({
        queryKey: ["unread-messages-count"],
        queryFn: () => kyInstance.get("api/messages/unread-count")
            .json<MessageCountInfo>(),
        initialData: initialState,
        refetchInterval: 60 * 1000,
    })

    const pathname = usePathname();

    return (
        <Button
            variant="ghost"
            className={cn("flex items-center justify-start gap-3", { "bg-primary text-white hover:bg-primary hover:text-white": pathname === "/messages" })}
            title="Messages"
            asChild>
            <Link href="/messages">
                <div className="relative">
                    <Mail className="size-5" />
                    {!!data.unreadCount && (
                        <span className={cn("absolute -top-1 -right-1 rounded-full bg-primary text-primary-foreground px-1 text-xs font-medium tabular-nums", { "-right-2": data.unreadCount >= 10 })}>
                            {data.unreadCount >= 10 ? "9+" : data.unreadCount}
                        </span>
                    )}
                </div>
                <span className="hidden lg:inline">Messages</span>
            </Link>
        </Button>
    );
}