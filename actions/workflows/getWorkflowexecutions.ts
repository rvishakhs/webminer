"use server"

import { auth } from "@clerk/nextjs/server"
import { prisma } from "~/lib/prisma"

export async function GetWorkflowexecutions(workflowId: string) {
    const {userId} = await auth()

    if (!userId) {
        throw new Error("User not authenticated")
    }

    return prisma.workflowExecution.findMany({
        where: {
            userId,
            workflowId
        }, 
        orderBy: {
            createdAt: "desc", 
        }
    })

}

