import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import SessionProvider from "../(main)/SessionProvider";

export default async function Layout({ children }: { children: ReactNode }) {
    const session = await validateRequest();

    if (!session.user) redirect("/");

    return (
        <SessionProvider value={session}>
            {children}
        </SessionProvider>
    )
}