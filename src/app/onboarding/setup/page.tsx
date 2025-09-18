import UpdateNIMForm from "./UpdateNIMForm";
import prisma from "@/lib/prisma";
import { cache } from "react";
import { getUserDataSelect } from "@/lib/types";
import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";

const getUser = cache(async (loggedInUserId: string) => {
    const user = await prisma.user.findFirst({
        where: {
            nim: {
                equals: null,
            }
        },
        select: getUserDataSelect(loggedInUserId)
    })

    if (!user) redirect("/");

    return user
})

export default async function Page() {
    const { user: loggedInUserId } = await validateRequest()

    if (!loggedInUserId) {
        return <p className="text-destructive">
            You&apos;re not authorized to view this page. Please log in to continue.
        </p>
    }

    const user = await getUser(loggedInUserId.id);

    if (user.nim) redirect("/");

    return (
        <main className="flex h-screen items-center justify-center p-5">
            <UpdateNIMForm />
        </main>
    );
}