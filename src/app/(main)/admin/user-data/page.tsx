import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";
import { AllUserSchema, columns, DataTable } from "./DataTable";

async function getUsers(): Promise<AllUserSchema[]> {
    const { user } = await validateRequest();

    if (!user || user.role !== "ADMIN") return [];

    const users = await prisma.user.findMany({
        where: {
            NOT: { role: "ADMIN" },
        },
        select: getUserDataSelect(user.id)
    });

    return users.map(user => ({
        ...user,
        name: user.name,
        nim: user.nim || "",
        image: user.avatarUrl,
        postCount: user._count.posts
    }));
}

export default async function Page() {
    const data = await getUsers();

    return (
        <main className="flex w-full min-w-0 gap-5">
            <div className="w-full min-w-0 space-y-5">
                <div className="rounded-2xl bg-card p-5 shadow-sm">
                    <h1 className="text-center text-2xl font-bold">Users Data</h1>
                </div>
                <DataTable columns={columns} data={data} />
            </div>
        </main>
    )
}