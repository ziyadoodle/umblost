import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import { FileUser } from "lucide-react";
import Link from "next/link";

interface MenuBarAdminProps {
    className?: string;
}

export default async function MenuBarAdmin({ className }: MenuBarAdminProps) {
    const { user } = await validateRequest();

    if (!user) return null;

    return (
        <>
            {user.role === "ADMIN" && (
                <div className={className}>
                    <Button
                        variant="ghost"
                        className="flex items-center justify-start gap-3"
                        title="Users Data"
                        asChild>
                        <Link href="/admin/user-data">
                            <div className="flex items-center gap-3">
                                <FileUser className="size-5" />
                                <span className="hidden lg:inline">Users Data</span>
                            </div>
                        </Link>
                    </Button>
                </div>
            )}
        </>
    )
}