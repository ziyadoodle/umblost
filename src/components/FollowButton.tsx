"use client"

import useFollowerInfo from "@/hooks/useFollowerInfo";
import { FollowerInfo } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import kyInstance from "@/lib/ky";

interface FollowButtonProps {
    userId: string;
    initialState: FollowerInfo;
}

export default function FollowButton({ userId, initialState }: FollowButtonProps) {
    const queryClient = useQueryClient();

    const { data } = useFollowerInfo(userId, initialState);

    const { mutate } = useMutation({
        mutationFn:
            () => data.isFollowedByUser ? kyInstance.delete(`/api/users/${userId}/followers`)
                : kyInstance.post(`/api/users/${userId}/followers`),

    })

    return <Button
        variant={data.isFollowedByUser ? "secondary" : "default"}
        onClick={() => mutate()}>
        {data.isFollowedByUser ? "Unfollow" : "Follow"}
    </Button>
}