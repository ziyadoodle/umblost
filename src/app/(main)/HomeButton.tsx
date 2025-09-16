"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomeButton() {
    const pathname = usePathname();

    return (
        <Button
            variant="ghost"
            className={cn("flex items-center justify-start gap-3", { "bg-primary text-white hover:bg-primary hover:text-white": pathname === "/" })}
            title="Home"
            asChild>
            <Link href="/">
                <div className="flex items-center gap-3">
                    <Home className="size-5" />
                    <span className="hidden lg:inline">Home</span>
                </div>
            </Link>
        </Button>
    )
}