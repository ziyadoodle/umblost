"use client"

import { LoadingButton } from "@/components/LoadingButton";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateNimSchema, UpdateNimValues } from "@/lib/valildation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateNim } from "./action";
import { redirect } from "next/navigation";
import { useTransition } from "react";

export default function UpdateNIMForm() {

    const [isPending, startTransition] = useTransition();

    const form = useForm<UpdateNimValues>({
        resolver: zodResolver(updateNimSchema),
        defaultValues: {
            nim: "",
        }
    })

    async function onSubmit(values: UpdateNimValues) {
        startTransition(async () => {
            const updateNimResult = await updateNim(values);
            if (!("error" in updateNimResult)) {
                return redirect("/");
            }
        })
    }

    return (
        <div className="flex flex-col gap-5 h-full max-h-[12rem] w-full max-w-[30rem] items-center justify-center rounded-2xl overflow-hidden bg-card shadow-2xl">
            <h1 className="text-2xl font-bold">Enter your NIM</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-2">
                        <FormField
                            control={form.control}
                            name="nim"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="NIM" autoComplete="off" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <LoadingButton type="submit" loading={isPending} className="cursor-pointer">
                            Save
                        </LoadingButton>
                    </div>
                </form>
            </Form>
            <p className="text-sm sm:text-xs text-muted-foreground text-center">Make sure to enter your correct NIM. Because it cannot be changed later.</p>
        </div>
    )
}