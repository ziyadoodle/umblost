"use client"

import { Button } from "@/components/ui/button";
import { UserData } from "@/lib/types";
import { useState } from "react";
import EditProfileDialog from "./EditProfileDialog";

interface EditProfileButtonProps {
    user: UserData;
}

export default function EditProfileUserButton({ user }: EditProfileButtonProps) {
    const [showDialog, setShowDialog] = useState(false);

    return <>
        <Button variant="outline" onClick={() => setShowDialog(true)} className="cursor-pointer">
            Edit Profile
        </Button>
        <EditProfileDialog
            user={user}
            open={showDialog}
            onOpenChange={setShowDialog}
        />
    </>
}