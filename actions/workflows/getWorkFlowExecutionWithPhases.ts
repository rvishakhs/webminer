"use server"

import { auth } from "@clerk/nextjs/server";
import { prisma } from "~/lib/prisma";

export async function GetWorkFlowExecutionWithPhases(executionId:string) {
    // Check if the user is authenticated
    const { userId } = await auth();
    
    if (!userId) {
        throw new Error("User not authenticated");
    }

    return prisma.workflowExecution.findUnique({
        where: {
            id: executionId,
            userId: userId,
        },
        include: {
            phases: {
                orderBy: {
                    number: 'asc',
                },
            },
        },
    });
}