import { validateRequest } from "@/auth"
import FollowButton from "@/components/FollowButton"
import FollowerCount from "@/components/FollowerCount"
import TrendsSidebar from "@/components/TrendsSidebar"
import { Button } from "@/components/ui/button"
import UserAvatar from "@/components/UserAvatar"
import prisma from "@/lib/prisma"
import { FollowerInfo, getUserDataSelect, UserData } from "@/lib/types"
import { formatNumber } from "@/lib/utils"
import { formatDate } from "date-fns"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { cache } from "react"
import UserPosts from "./UserPosts"
import Linkify from "@/components/Linkify"

interface PageProps {
    params: Promise<{ username: string }>
}

const getUser = cache(async (username: string, loggedInUserId: string) => {
    const user = await prisma.user.findFirst({
        where: {
            username: {
                equals: username,
                mode: "insensitive"
            }
        },
        select: getUserDataSelect(loggedInUserId)
    })

    if (!user) notFound()

    return user
})

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { username } = await params

    const { user: loggedInUserId } = await validateRequest()

    if (!loggedInUserId) return {}

    const user = await getUser(username, loggedInUserId.id)

    return {
        title: `${user.name} (@${user.username})`,
    }
}

export default async function Page({ params }: PageProps) {
    const { username } = await params
    const { user: loggedInUserId } = await validateRequest()

    if (!loggedInUserId) {
        return <p className="text-destructive">
            You&apos;re not authorized to view this page. Please log in to continue.
        </p>
    }

    const user = await getUser(username, loggedInUserId.id)

    return <main className="flex w-full min-w-0 gap-5">
        <div className="w-full min-w-0 space-y-5">
            <UserProfile user={user} loggedInUserId={loggedInUserId.id} />
            <div className="rounded-2xl bg-card p-5 shadow-sm">
                <h2 className="text-center text-2xl font-bold">
                    {user.name}&apos;s posts
                </h2>
            </div>
            <UserPosts userId={user.id} />
        </div>
        <TrendsSidebar />
    </main>
}

interface UserProfileProps {
    user: UserData;
    loggedInUserId: string;
}

async function UserProfile({ user, loggedInUserId }: UserProfileProps) {
    const followerInfo: FollowerInfo = {
        followers: user._count.followers,
        isFollowedByUser: user.followers.some(
            ({ followerId }) => followerId === loggedInUserId
        )
    }

    return <div className="h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
        <UserAvatar avatarUrl={user.avatarUrl} size={250} className="mx-auto size-full max-h-60 max-w-60 rounded-full" />
        <div className="flex flex-wrap gap-3 sm:flex-nowrap">
            <div className="me-auto space-y-3">
                <div>
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    <div className="text-muted-foreground">@{user.username}</div>
                </div>
                <div>Member since {formatDate(user.createdAt, "d MMM, yyyy")}</div>
                <div className="flex items-center gap-3 ">
                    <span>
                        Posts:{" "}
                        <span className="font-semibold">
                            {formatNumber(user._count.posts)}
                        </span>
                    </span>
                    <FollowerCount userId={user.id} initialState={followerInfo} />
                </div>
            </div>
            {user.id === loggedInUserId ? (
                <Button>Edit Profile</Button>
            ) : (
                <FollowButton
                    userId={user.id}
                    initialState={followerInfo}
                />
            )}
        </div>
        {user.bio && (
            <>
                <hr />
                <Linkify>
                    <div className="whitespace-pre-line overflow-hidden break-words">
                        {user.bio}
                    </div>
                </Linkify>
            </>
        )}
    </div>
}