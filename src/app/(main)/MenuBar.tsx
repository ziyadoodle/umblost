import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getUnreadMessagesCount } from "@/lib/stream";
import BookmarkButton from "./BookmarkButton";
import HomeButton from "./HomeButton";
import MessagesButton from "./MessagesButton";
import NotificationsButton from "./NotificationsButton";

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
            <HomeButton />
            <NotificationsButton initialState={{ unreadCount: unreadNotificationCount }} />
            <MessagesButton initialState={{ unreadCount: unreadMessagesCount }} />
            <BookmarkButton />
        </div>
    )
}