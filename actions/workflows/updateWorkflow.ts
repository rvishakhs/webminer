"use server"

import { auth } from "@clerk/nextjs/server";
import { WorkflowStatus } from "types/workflow";
import { prisma } from "~/lib/prisma";

export async function updateWorkflow({id, definition} : {id: string, definition: string}) {
    const {userId}  = await auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            id: id,
            userId: userId
        }
    })

    if (!workflow) {
        throw new Error("Workflow not found or you do not have permission to update it");
    }

    if (workflow.status !== WorkflowStatus.DRAFT){
        throw new Error("Workflow is not in draft status and cannot be updated");
    }

    const updateWorkFlow = await prisma.workflow.update({
        where: {
            id: id,
            userId: userId
        },
        data: {
            definition: definition
        }
    })


}