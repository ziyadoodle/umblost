"use client";

import { Button } from "@/components/ui/button";
import kyInstance from "@/lib/ky";
import { NotificationCountInfo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NotificationsButtonProps {
    initialState: NotificationCountInfo
}

export default function NotificationsButton({
    initialState
}: NotificationsButtonProps) {
    const { data } = useQuery({
        queryKey: ["unread-notification-count"],
        queryFn: () => kyInstance.get("api/notifications/unread-count")
            .json<NotificationCountInfo>(),
        initialData: initialState,
        refetchInterval: 60 * 1000,
    })

    const pathname = usePathname();

    return (
        <Button
            variant="ghost"
            className={cn("flex items-center justify-start gap-3", { "bg-primary text-white hover:bg-primary hover:text-white": pathname === "/notifications" })}
            title="Notifications"
            asChild>
            <Link href="/notifications">
                <div className="relative">
                    <Bell className="size-5" />
                    {!!data.unreadCount && (
                        <span className={cn("absolute -top-1 -right-1 rounded-full bg-primary text-primary-foreground px-1 text-xs font-medium tabular-nums", { "-right-2": data.unreadCount >= 10 })}>
                            {data.unreadCount >= 10 ? "9+" : data.unreadCount}
                        </span>
                    )}
                </div>
                <span className="hidden lg:inline">Notifications</span>
            </Link>
        </Button>
    )
}