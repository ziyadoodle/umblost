import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { ComponentProps } from "react";

interface LoadingButtonProps extends ComponentProps<"button"> {
    loading: boolean;
}

function LoadingButton({
    loading,
    disabled,
    className,
    ...props
}: LoadingButtonProps) {
    return (
        <Button
            disabled={loading || disabled}
            className={cn("flex items-center gap-2", className)}
            {...props}
        >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {props.children}
        </Button>
    )
}

export { LoadingButton }