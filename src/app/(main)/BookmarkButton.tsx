"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BookmarkButton() {
    const pathname = usePathname();

    return (
        <Button
            variant="ghost"
            className={cn("flex items-center justify-start gap-3", { "bg-primary text-white hover:bg-primary hover:text-white": pathname === "/bookmarks" })}
            title="Bookmarks"
            asChild>
            <Link href="/bookmarks">
                <div className="flex items-center gap-3">
                    <Bookmark className="size-5" />
                    <span className="hidden lg:inline">Bookmarks</span>
                </div>
            </Link>
        </Button>
    )
}