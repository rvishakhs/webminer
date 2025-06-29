"use server";

import { auth } from "@clerk/nextjs/server";
import type { WorkFlowExecutionPlan } from "types/workflow";
import { prisma } from "~/lib/prisma";
import { FlowToExecutionPlan } from "~/lib/workflow/ExecutionPlan";

export async function RunWorkflow(form: {
    workflowId: string;
    flowDefinition?: string;
}) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    const { workflowId, flowDefinition } = form;
    if (!workflowId) {
        throw new Error("Workflow ID is required");
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            userId,
            id: workflowId,
        }
    }); 

    if (!workflow) {
        throw new Error("Workflow not found");
    }

    let executionPlan: WorkFlowExecutionPlan;

    if (!flowDefinition) {
        throw new Error("Flow definition is required");
    }

    const flow = JSON.parse(flowDefinition);

    const result = FlowToExecutionPlan(flow.nodes, flow.edges);

    if (result.error) {
        throw new Error("Flow definition is invalid: " + result.error.type);

    }

    if (!result.executionPlan) {
        throw new Error("Execution plan could not be generated");
    }

    executionPlan = result.executionPlan;

    console.log("Execution plan generated successfully", executionPlan);
}

