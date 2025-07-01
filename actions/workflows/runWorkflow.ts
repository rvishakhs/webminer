"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ExecutionPhaseStatus, WorkFlowExecutionStatus, WorkFlowExecutionTrigger, type WorkFlowExecutionPlan } from "types/workflow";
import { prisma } from "~/lib/prisma";
import { ExecuteWorkflow } from "~/lib/workflow/executeWorkFlow";
import { FlowToExecutionPlan } from "~/lib/workflow/ExecutionPlan";
import { TaskRegistry } from "~/lib/workflow/task/registry";

export async function RunWorkflow(form: {
    workflowId: string;
    flowDefinition: string;
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

    const execution = await prisma.workflowExecution.create({
        data: {
            workflowId,
            userId,
            status: WorkFlowExecutionStatus.PENDING,
            startedAt: new Date(),
            trigger: WorkFlowExecutionTrigger.MANUAL,
            phases: {
                create: executionPlan.flatMap((phase) => {
                    return phase.nodes.flatMap((node) => {
                        return {
                            userId,
                            status: ExecutionPhaseStatus.CREATED,
                            number: phase.phase,
                            node: JSON.stringify(node),
                            name: TaskRegistry[node.data.type].label,

                        }
                    })
                })
            }
        },
        select: {
            id: true,
            phases: true,
        },
    });
    if (!execution) {
        throw new Error("Execution could not be created");
    }

    ExecuteWorkflow(execution.id)

    return { redirectUrl: `/workspace/runs/${workflowId}/${execution.id}` };

}

 