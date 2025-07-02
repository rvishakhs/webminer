
import "server-only";
import { prisma } from "../prisma";
import { ExecutionPhaseStatus, WorkFlowExecutionStatus } from "types/workflow";
import { waitFor } from "../helper/waitFor";
import type { ExecutionPhase } from "@prisma/client";
import type { AppNodes } from "types/appNode";
import { ExecutorRegistry } from "./executor/registry";
import type { Environment } from "types/Executor";
import { TaskRegistry } from "./task/registry";

export async function ExecuteWorkflow( executionId: string) {
    const execution = await prisma.workflowExecution.findUnique({
        where: {
            id: executionId,
        },
        include: {
            workflow: true,
            phases: true, 
        }
    })

    if (!execution) {
        throw new Error("Workflow execution not found");
    }

    // setup execution enviornment
    const environment = {
        phases: {}
    };

    //initialize workflow execution
    await initializeWorkFlowExecution(executionId, execution.workflowId)

    //initialize phases status
    await initializePhaseStatus(execution)

    let executionFailed = false;

    for (const phase of execution.phases) {
        const phaseExecution = await executeWorkFlowPhase(phase, environment)
        if(!phaseExecution.success) {
            executionFailed = true;
            break;
        }  
        // TODO: execute phase
    }


    // Finalize workflow execution
    await finalizeWorkFlowExecution(executionId, execution.workflowId, executionFailed);
    // TODO: update execution status


}
async function initializeWorkFlowExecution(executionId: string, workflowId: string) {
    await prisma.workflowExecution.update({
        where: {
            id: executionId,
        },
        data: {
            status: WorkFlowExecutionStatus.RUNNING,
            startedAt: new Date(),
        }
    })

    await prisma.workflow.update({
        where: {
            id: workflowId,
        }, 
        data: {
            lastRunAt: new Date(),
            lastRunId: executionId,
            lastRunStatus: WorkFlowExecutionStatus.RUNNING,
        }
    })
}

async function initializePhaseStatus(execution: { workflow: { name: string; id: string; userId: string; description: string | null; definition: string | null; status: string; lastRunAt: Date | null; lastRunId: string | null; lastRunStatus: string | null; CreatedAt: Date; updatedAt: Date; }; phases: { number: number; name: string; id: string; userId: string; status: string; startedAt: Date | null; completedAt: Date | null; node: string; inputs: string | null; outputs: string | null; creditsCost: number | null; workflowExecutionId: string; }[]; } & { id: string; userId: string; status: string; workflowId: string; trigger: string; createdAt: Date; startedAt: Date | null; completedAt: Date | null; }) {
    await prisma.executionPhase.updateMany({
        where: {
            id: {
                in: execution.phases.map((phase) => phase.id),
            },
        },
        data: {
            status: ExecutionPhaseStatus.PENDING,
        }
    })
}

async function finalizeWorkFlowExecution(executionId: string, workflowId: string, executionFailed: boolean) {
    const finalStatus = executionFailed ? WorkFlowExecutionStatus.FAILED : WorkFlowExecutionStatus.COMPLETED

    await prisma.workflowExecution.update({
        where: {
            id: executionId
        },
        data: {
            status: finalStatus,
            completedAt: new Date(),
        }
    })

    await prisma.workflow.update({
        where: {
            id : workflowId,
            lastRunId: executionId,
        },
        data: {
            lastRunStatus: finalStatus
        },
    }).catch((err) => {

    })
}


async function executeWorkFlowPhase(phase:ExecutionPhase, environment: Environment) {
    const startedAt = new Date();

    let node: AppNodes
    try {
        node = JSON.parse(phase.node) as AppNodes;
    } catch (error) {
        console.error("Invalid node JSON for phase:", phase.id, error);
        return { success: false };
    }


    setupEnvironmentForPhase(node, environment);
    // Update phase status 
    await prisma.executionPhase.update({
        where: {id: phase.id},
        data: {
            status: ExecutionPhaseStatus.RUNNING,
            startedAt,        
        },
    });

    const success = await executePhase(phase, node, environment); 


    await finalizePhase(phase.id, success);
    return {success}
}
async function finalizePhase(id: string, success: boolean) {
    const finalStatus = success ? ExecutionPhaseStatus.COMPLETED : ExecutionPhaseStatus.FAILED

    await prisma.executionPhase.update({
        where: {
            id: id
        }, 
        data: {
            status : finalStatus,
            completedAt : new Date(),
        }
    })
}

async function executePhase(
    phase: { number: number; name: string; id: string; userId: string; status: string; startedAt: Date | null; completedAt: Date | null; node: string; inputs: string | null; outputs: string | null; creditsCost: number | null; workflowExecutionId: string; },
    node: AppNodes,
    environment: Environment
): Promise<boolean> {
    const runFn = ExecutorRegistry[node.data.type];

    if (!runFn) {
        return false
    }
    
    const result = await runFn(environment);
    console.log("Execution result:", result); // Add this to debug

    return result;
}

function setupEnvironmentForPhase(node: AppNodes, environment: Environment) {
    environment.phases[node.id] = {
        inputs: {}, 
        outputs: {},
    }

    const inputs = TaskRegistry[node.data.type].inputs;
    for (const input of inputs) {
        const inputValue = node.data.inputs[input.name];
        if (inputValue) {
            environment.phases[node.id].inputs[input.name] = inputValue;
            continue;
        }
    }


}

