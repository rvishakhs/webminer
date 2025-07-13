import { timingSafeEqual } from "crypto";
import { id } from "date-fns/locale";
import { ExecutionPhaseStatus, WorkFlowExecutionStatus, WorkFlowExecutionTrigger, type WorkFlowExecutionPlan } from "types/workflow";
import { prisma } from "~/lib/prisma";
import { ExecuteWorkflow } from "~/lib/workflow/executeWorkFlow";
import { TaskRegistry } from "~/lib/workflow/task/registry";

function isValidSecret(Secret: string) {
    const API_SECRET = process.env.API_SECRET;
    if (!API_SECRET) return false;

    try {
        return timingSafeEqual(Buffer.from(Secret), Buffer.from(API_SECRET));
    } catch (error) {
        console.error("Secret validation error:", error);
        return false;
    }

}

export async function GET(request:Request) {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response("Unauthorized", { status: 401 });
    }

    const Secret = authHeader.split(" ")[1];

    if(!isValidSecret(Secret!)){
        return new Response("Unauthorized - secret key missmatch", { status: 401 });
    }

    const {searchParams} = new URL(request.url);
    const workflowId = searchParams.get("id") as string;

    if(!workflowId) {
        return new Response("Workflow ID is required", { status: 400 });
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            id: workflowId,
        }
    });

    if(!workflow) {
        return new Response("Workflow not found", { status: 404 });
    }

    const executionPlan = JSON.parse(workflow.executionPlan!) as WorkFlowExecutionPlan;

    if(!executionPlan) {
        return new Response("Workflow execution plan is empty", { status: 400 });
    }

    const execution = await prisma.workflowExecution.create({
        data: {
            workflowId,
            userId : workflow.userId,
            definition: workflow.definition!,
            status: WorkFlowExecutionStatus.PENDING,
            startedAt: new Date(),
            trigger: WorkFlowExecutionTrigger.SCHEDULED,
            phases: {
                create: executionPlan.flatMap((phase) => {
                    return phase.nodes.flatMap((node) => {
                        return {
                            userId : workflow.userId,
                            status: ExecutionPhaseStatus.CREATED,
                            number: phase.phase,
                            node: JSON.stringify(node),
                            name: TaskRegistry[node.data.type].label,

                        }
                    })
                })
            }
            },
    });

    await ExecuteWorkflow(execution.id);

    return new Response(null, { status: 200, statusText: "Workflow execution started" });



}


