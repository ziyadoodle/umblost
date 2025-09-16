"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import streamServerClient from "@/lib/stream";
import { getUserDataSelect } from "@/lib/types";
import { updateNimSchema, UpdateNimValues } from "@/lib/valildation";

export async function updateNim(values: UpdateNimValues) {
  const validatedValues = updateNimSchema.parse(values);

  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const existingNim = await prisma.user.findFirst({
    where: {
      nim: {
        equals: validatedValues.nim,
        mode: "insensitive",
      },
    },
  });

  if (existingNim) {
    return {
      error: "NIM already exists!",
    };
  }

  const updatedNim = await prisma.$transaction(async (tx) => {
    const updatedNim = await tx.user.update({
      where: { id: user.id },
      data: validatedValues,
      select: getUserDataSelect(user.id),
    });
    await streamServerClient.partialUpdateUser({
      id: user.id,
      set: {
        username: validatedValues.nim,
      },
    });
    return updatedNim;
  });

  return updatedNim;
}
