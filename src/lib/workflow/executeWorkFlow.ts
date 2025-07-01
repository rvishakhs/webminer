
import "server-only";
import { prisma } from "../prisma";

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

    // TODO: setup execution enviornment
    

    // TODO: initialize workflow execution
    // TODO: initialize phases status

    let executionFailed = false;
    for (const phase of execution.phases) {
        // TODO: execute phase
    }

    // TDO: finalize workflow execution
    // TODO: update execution status


}
