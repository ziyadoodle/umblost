"use client";

import { Button } from "@/components/ui/button";
import kyInstance from "@/lib/ky";
import { NotificationCountInfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import Link from "next/link";

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

    return (
        <Button
            variant="ghost"
            className="flex items-center justify-start gap-3"
            title="Notifications"
            asChild>
            <Link href="/notifications">
                <Bell />
                <span className="hidden lg:inline">Notifications</span>
                {!!data.unreadCount && (
                    <span className="rounded-full bg-primary text-primary-foreground px-1 text-xs font-medium tabular-nums">
                        {data.unreadCount > 99 ? "99+" : data.unreadCount}
                    </span>
                )}
            </Link>
        </Button>
    )
}