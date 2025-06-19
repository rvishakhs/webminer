"use server";

import { auth } from "@clerk/nextjs/server";
import { log } from "console";
import { redirect } from "next/navigation";
import { createWorkflowSchema, type CreateWorkflowSchemaType } from "schema/workflow";
import { WorkflowStatus } from "types/workflow";
import { z } from "zod";
import { prisma } from "~/lib/prisma";


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

    const result = await prisma.workflow.create({
      data: {
        userId,
        status: WorkflowStatus.DRAFT,
        definition: "TODO",
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
