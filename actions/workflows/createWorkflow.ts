"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createWorkflowSchema, type CreateWorkflowSchemaType } from "schema/workflow";
import { TaskType } from "types/task";
import { WorkflowStatus } from "types/workflow";
import { z } from "zod";
import { prisma } from "~/lib/prisma";
import { CreateFlowNode } from "~/lib/workflow/CreateFlowNode";


export async function CreateWorkFlow(form: CreateWorkflowSchemaType) {
    try {
    const { success, data } = createWorkflowSchema.safeParse(form);

    if (!success) {
      throw new Error("Invalid form data");
    }

    const { userId } = await auth();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const initialFlow : {nodes : AppNode[], edges : Edge[]} = {
      nodes: [], 
      edges: [],
    }

    // Let's add the flow entry point node 
    initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER))

    const result = await prisma.workflow.create({
      data: {
        userId,
        status: WorkflowStatus.DRAFT,
        definition: JSON.stringify(initialFlow),
        ...data,
      },
    });

    console.log(result);

    if (!result) {
      throw new Error("Failed to create workflow");
    }

    // redirect(`/dashboard/workspace/${result.id}`);
    
    // Return a success response to the frontend
    return { success: true, data: result, redirect:`/dashboard/workspace/${result.id}` };
  } catch (error) {
    console.error("Error creating workflow:", error);
    // Return an error response to the frontend
    throw error;
  }
    
}
