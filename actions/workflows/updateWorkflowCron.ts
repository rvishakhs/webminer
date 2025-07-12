"use server"

import { auth } from "@clerk/nextjs/server"
import { prisma } from "~/lib/prisma"
import parser from "cron-parser";

export async function UpdateWorkflowCron({id, cron}:{id: string, cron: string}) {
    
    const {userId} = await auth()

    if(!userId) {
        throw new Error("Unauthorized")
    }

    try {
        const interval = parser.parseExpression(cron, {utc: true});
        return await prisma.workflow.update({
            where: {
                id,
                userId
            }, 
            data: {
                cron,
                nextRunAt: interval.next().toDate() // Reset next run time when cron is updated
            }
        })
    
    } catch (error : any) {
        console.error("Cron parsing error:", error);
        throw new Error("Invalid cron expression");
    }


}