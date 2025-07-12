"use server"

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { WorkflowStatus } from "types/workflow";
import { prisma } from "~/lib/prisma";
import { FlowToExecutionPlan } from "~/lib/workflow/ExecutionPlan";

export async function publishWorkFlow({id, definition}: {id: string, definition: string}) {
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

    if (workflow.status !== WorkflowStatus.DRAFT){
        return { redirectUrl: `/workspace` , message: "Workflow is already published or not in draft status" }; 
    }

    const flow = JSON.parse(definition);
    const result = FlowToExecutionPlan(flow.nodes, flow.edges);

    if(result.error) {
        throw new Error("Flow definition is invalid" );
    }

    if(!result.executionPlan) {
        throw new Error("nO EXECUTION pLAN GENERATED" );
    }

    await prisma.workflow.update({
        where: {
            id,
            userId: userId,
        },
        data: {
            definition: definition,
            status: WorkflowStatus.PUBLISHED,
            executionPlan: JSON.stringify(result.executionPlan),
        }
    })


    return { redirectUrl: `/workspace`, message: "Workflow published successfully" };

}