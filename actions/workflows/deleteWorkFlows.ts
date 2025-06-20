"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "~/lib/prisma";

export async function deleteWorkFlows(id: string) {
    const {userId} = await auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    await prisma.workflow.delete({
        where: {
            id: id,
            userId: userId
        }
    })

    revalidatePath("/workspace");
}