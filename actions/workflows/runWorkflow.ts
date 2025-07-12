"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ExecutionPhaseStatus, WorkFlowExecutionStatus, WorkFlowExecutionTrigger, WorkflowStatus, type WorkFlowExecutionPlan } from "types/workflow";
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
    let workflowDefinition =  flowDefinition;



    if(workflow.status === WorkflowStatus.PUBLISHED){
        if (!workflow.executionPlan) {
            throw new Error("Workflow execution plan is not available");
        }
        executionPlan = JSON.parse(workflow.executionPlan)
        workflowDefinition = workflow.definition!;
    } else {

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
    }


    const execution = await prisma.workflowExecution.create({
        data: {
            workflowId,
            userId,
            status: WorkFlowExecutionStatus.PENDING,
            startedAt: new Date(),
            trigger: WorkFlowExecutionTrigger.MANUAL,
            definition: workflowDefinition,
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

 

// "use server";

// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import {
//     ExecutionPhaseStatus,
//     WorkFlowExecutionStatus,
//     WorkFlowExecutionTrigger,
//     type WorkFlowExecutionPlan
// } from "types/workflow";
// import { prisma } from "~/lib/prisma";
// import { ExecuteWorkflow } from "~/lib/workflow/executeWorkFlow";
// import { FlowToExecutionPlan } from "~/lib/workflow/ExecutionPlan";
// import { TaskRegistry } from "~/lib/workflow/task/registry";

// export async function RunWorkflow(form: {
//     workflowId: string;
//     flowDefinition: string;
// }) {
//     console.log("RunWorkflow started");

//     const { userId } = await auth();
//     if (!userId) {
//         console.error("No userId found from auth()");
//         throw new Error("User not authenticated");
//     }

//     const { workflowId, flowDefinition } = form;
//     if (!workflowId) {
//         throw new Error("Workflow ID is required");
//     }

//     console.log("Fetching workflow from DB");
//     const workflow = await prisma.workflow.findUnique({
//         where: {
//             userId,
//             id: workflowId,
//         }
//     });

//     if (!workflow) {
//         console.error("Workflow not found for user:", userId, "workflowId:", workflowId);
//         throw new Error("Workflow not found");
//     }

//     if (!flowDefinition) {
//         console.error("No flow definition provided");
//         throw new Error("Flow definition is required");
//     }

//     let executionPlan: WorkFlowExecutionPlan;

//     console.log("Parsing flow definition");
//     let flow;
//     try {
//         flow = JSON.parse(flowDefinition);
//     } catch (e) {
//         console.error("Invalid JSON for flowDefinition", e);
//         throw new Error("Invalid flow definition JSON");
//     }

//     console.log("Generating execution plan");
//     const result = FlowToExecutionPlan(flow.nodes, flow.edges);

//     if (result.error) {
//         console.error("Execution plan generation failed:", result.error);
//         throw new Error("Flow definition is invalid: " + result.error.type);
//     }

//     if (!result.executionPlan) {
//         console.error("Execution plan result missing");
//         throw new Error("Execution plan could not be generated");
//     }

//     executionPlan = result.executionPlan;

//     console.log("Creating execution in DB");
//     let execution;
//     try {
//         execution = await prisma.workflowExecution.create({
//             data: {
//                 workflowId,
//                 userId,
//                 status: WorkFlowExecutionStatus.PENDING,
//                 startedAt: new Date(),
//                 trigger: WorkFlowExecutionTrigger.MANUAL,
//                 definition: flowDefinition,
//                 phases: {
//                     create: executionPlan.flatMap((phase) => {
//                         return phase.nodes.map((node) => {
//                             const taskDef = TaskRegistry[node.data.type];
//                             if (!taskDef) {
//                                 console.error("Unknown node type in TaskRegistry:", node.data.type);
//                                 throw new Error(`Unknown node type: ${node.data.type}`);
//                             }

//                             return {
//                                 userId,
//                                 status: ExecutionPhaseStatus.CREATED,
//                                 number: phase.phase,
//                                 node: JSON.stringify(node),
//                                 name: taskDef.label,
//                             };
//                         });
//                     })
//                 }
//             },
//             select: {
//                 id: true,
//                 phases: true,
//             },
//         });
//     } catch (e) {
//         console.error("Error creating execution:", e);
//         throw new Error("Execution could not be created");
//     }

//     if (!execution) {
//         throw new Error("Execution could not be created");
//     }

//     console.log("Execution created with ID:", execution.id);

//     try {
//         console.log("Calling ExecuteWorkflow...");
//         await ExecuteWorkflow(execution.id);
//     } catch (e) {
//         console.error("ExecuteWorkflow failed:", e);
//         // Optionally update DB status to FAILED here
//         throw new Error("Workflow execution failed to start");
//     }

//     return { redirectUrl: `/workspace/runs/${workflowId}/${execution.id}` };
// }
