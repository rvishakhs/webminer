
import "server-only";
import { prisma } from "../prisma";
import { ExecutionPhaseStatus, WorkFlowExecutionStatus } from "types/workflow";
import { waitFor } from "../helper/waitFor";

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
    const enviornment = {
        phases: {}
    };

    //initialize workflow execution
    await initializeWorkFlowExecution(executionId, execution.workflowId)

    //initialize phases status
    await initializePhaseStatus(execution)

    let executionFailed = false;
    for (const phase of execution.phases) {
        await waitFor(3000)
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

