import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import MenuBar from "./MenuBar";
import MenuBarAdmin from "./MenuBarAdmin";
import Navbar from "./Navbar";
import SessionProvider from "./SessionProvider";

export default async function Layout({ children }: { children: ReactNode }) {
    const session = await validateRequest();

    if (!session.user) redirect("/login");

    if (!session.user.nim) redirect("/onboarding/setup");

    return (
        <SessionProvider value={session}>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="max-w-7xl mx-auto p-5 flex w-full grow gap-5">
                    <div className="sticky top-[5.25rem] hidden sm:block lg:w-80 w-72 h-fit flex-none space-y-5">
                        <MenuBar className="h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 lg:px-5 shadow-sm xl:w-80" />
                        <MenuBarAdmin className="h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 lg:px-5 shadow-sm xl:w-80" />
                    </div>
                    {children}
                </div>
                <MenuBar className="sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden" />
            </div>
        </SessionProvider>
    )
}