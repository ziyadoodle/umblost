"use client"

import { useState } from "react";
import { ChevronRight, Info } from "lucide-react";
import LostItemGuideDialog from "./sidebar-dialog/LostItemGuideDialog";

interface ButtonProps {
    onClick?: () => void;
}

export default function GuideButton() {
    const [showPostGuideDialog, setShowPostGuideDialog] = useState(false);

    return (
        <>
            <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
                <div className="text-xl font-bold">Guides</div>
                <PostGuide onClick={() => setShowPostGuideDialog(true)} />
            </div>
            <LostItemGuideDialog
                open={showPostGuideDialog}
                onClose={() => setShowPostGuideDialog(false)}
            />
        </>
    )
}

function PostGuide({ onClick }: ButtonProps) {
    return (
        <div className="flex justify-between items-center cursor-pointer" onClick={onClick}>
            <div className="flex items-center gap-1">
                <Info className="size-4" />
                <p className="line-clamp-1 break-all underline">
                    Panduan Posting Barang Hilang
                </p>
            </div>
            <ChevronRight className="size-5" />
        </div>
    )
}