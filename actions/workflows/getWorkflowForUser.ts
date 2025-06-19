"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "~/lib/prisma";

export async function getWorkflowForUser() {
    const { userId } = await auth();
    console.log("Fetching workflows for user:", userId);
    

    if (!userId) {
        throw new Error("User is not authenticated");
    }

    return prisma.Workflow.findMany({
        where : {
            userId
        },
        orderBy: {
            CreatedAt: "asc"
        }
    })
}