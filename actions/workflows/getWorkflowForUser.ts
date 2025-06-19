"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "~/lib/prisma";

export async function getWorkflowForUser() {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User is not authenticated");
    }

    return prisma.Workflow.findMany({
        where : {
            userId
        },
        orderBy: {
            createdAt: "asc"
        }
    })
}