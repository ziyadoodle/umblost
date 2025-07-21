import { PostData } from "@/lib/types";
import { useDeletePostMutation } from "./mutations";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { LoadingButton } from "../LoadingButton";
import { Button } from "../ui/button";

interface DeletePostDialogProps {
    post: PostData;
    open: boolean;
    onClose: () => void
}

export default function DeletePostDialog({ post, open, onClose }: DeletePostDialogProps) {
    const mutation = useDeletePostMutation();

    function handleOpenChange(open: boolean) {
        if (!open || !mutation.isPending) {
            onClose();
        }
    }

    return <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete post?</DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete this post? This action cannot be undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <LoadingButton
                    variant="destructive"
                    onClick={() => mutation.mutate(post.id, { onSuccess: onClose })}
                    loading={mutation.isPending}
                    className="cursor-pointer"
                >
                    Delete
                </LoadingButton>
                <Button variant="outline" onClick={onClose} disabled={mutation.isPending} className="cursor-pointer">
                    Cancel
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}