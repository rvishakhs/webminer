"use server"

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { WorkflowStatus } from "types/workflow";
import { prisma } from "~/lib/prisma";

export async function unpublishWorkFlow(id:string) {

    const { userId } = await auth();
    
    if (!userId) {
        throw new Error("User not authenticated")
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            id,
            userId: userId,
        }
    })

    if (!workflow) {
        throw new Error("Workflow not found")
    }

    if (workflow.status !== WorkflowStatus.PUBLISHED) {
         throw new Error("Workflow is not published");
    }

    await prisma.workflow.update({
        where: {
            id,
            userId: userId,
        },
        data: {
            status: WorkflowStatus.DRAFT,
            executionPlan: null, // Clear the execution plan when unpublishing
        }
    })

    return { redirectUrl: `/workspace/editor/${id}`, message: "Workflow unpublished successfully" };
    // revalidatePath(`/workspace/editor/${id}`);
}