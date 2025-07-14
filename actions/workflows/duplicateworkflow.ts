"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { duplicateWorkflowSchema, type duplicateWorkflowSchemaType } from "schema/workflow";
import { WorkflowStatus } from "types/workflow";
import { prisma } from "~/lib/prisma";

export async function DuplicateWorkflow(form: duplicateWorkflowSchemaType) {

    const {success, data} = duplicateWorkflowSchema.safeParse(form);

    if(!success) {
        throw new Error("Invalid form data");
    }

    const {userId} = await auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const sourceWorkflow = await prisma.workflow.findUnique({
        where: {
            id: data.workflowId,
            userId,
        },
        })

    if (!sourceWorkflow) {
        throw new Error("Workflow not found or you do not have permission to duplicate it");
    }

    const result = await prisma.workflow.create({
        data: {
            userId,
            name: data.name,
            description: data.description,
            status: WorkflowStatus.DRAFT,
            definition: sourceWorkflow.definition,            
        },
    })

    if(!result) {
        throw new Error("Failed to duplicate workflow");
    }

    revalidatePath(`/workspace`);

}