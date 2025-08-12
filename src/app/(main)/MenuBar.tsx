import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { getUnreadMessagesCount } from "@/lib/stream";
import { Bookmark, Home } from "lucide-react";
import Link from "next/link";
import NotificationsButton from "./NotificationsButton";
import MessagesButton from "./MessagesButton";

interface MenuBarProps {
    className?: string;
}

export default async function MenuBar({ className }: MenuBarProps) {
    const { user } = await validateRequest();

    if (!user) return null;

    const [unreadNotificationCount, unreadMessagesCount] = await Promise.all([
        prisma.notification.count({
            where: {
                recipientId: user.id,
                read: false
            }
        }),
        getUnreadMessagesCount(user.id)
    ])

    return (
        <div className={className}>
            <Button
                variant="ghost"
                className="flex justify-start"
                title="Home"
                asChild>
                <Link href="/">
                    <div className="flex items-center gap-3">
                        <Home className="size-5" />
                        <span className="hidden lg:inline">Home</span>
                    </div>
                </Link>
            </Button>
            <NotificationsButton initialState={{ unreadCount: unreadNotificationCount }} />
            <MessagesButton initialState={{ unreadCount: unreadMessagesCount }} />
            <Button
                variant="ghost"
                className="flex justify-start"
                title="Bookmarks"
                asChild>
                <Link href="/bookmarks">
                    <div className="flex items-center gap-3">
                        <Bookmark className="size-5" />
                        <span className="hidden lg:inline">Bookmarks</span>
                    </div>
                </Link>
            </Button>
        </div>
    )
}