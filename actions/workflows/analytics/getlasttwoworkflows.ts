"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "~/lib/prisma";

export async function getLastTwoWorkflows() {

    const {userId} = await auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const workflows = await prisma.workflow.findMany({
        where: {
            userId: userId,
            status: "published"

        },
        orderBy: {
            updatedAt: 'desc'
        },
        take: 2
    });
    return workflows;

    
}