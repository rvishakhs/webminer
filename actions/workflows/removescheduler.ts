"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { prisma } from "~/lib/prisma"

export async function RemoveScheduler({id}:{id: string}) {

    // Validate user
    const {userId} = await auth()

    if(!userId) {
        throw new Error("Unauthorized")
    }

    // Remove the cron schedule from the workflow
    await prisma.workflow.update({
        where: {
            id, 
            userId,
        }, data : {
            cron: null,
            nextRunAt: null, // Reset next run time when cron is removed
        }
    })

    revalidatePath("/workspace")
}