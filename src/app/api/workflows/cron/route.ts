import { WorkflowStatus } from "types/workflow";
import { getAppUrl } from "~/lib/helper/appUrl";
import { prisma } from "~/lib/prisma";

export async function GET(req: Request) {

    const now = new Date();
    const workflows = await prisma.workflow.findMany({
        select: {id: true},
        where: {
            status: WorkflowStatus.PUBLISHED,
            cron: { not: null },
            nextRunAt: {
                lte: now, // Get workflows whose next run time is less than or equal to now
            },
        }
    })

    console.log("Cron workflows to run:", workflows.length);

    for (const workflow of workflows) {
        triggerWorkflow(workflow.id);
    }

    return new Response(null,{status: 200, statusText: "OK"})


} 

function triggerWorkflow(id: string) {
    const triggerApiUrl = getAppUrl(`/api/workflows/execute?id=${id}`);
    
    fetch(triggerApiUrl, {
        headers: {
            Authorization: `Bearer ${process.env.API_SECRET}`,
        },
        cache: "no-store",
        signal: AbortSignal.timeout(5000), // 5 seconds timeout
    }).catch((error) => {
        console.error(`Failed to trigger workflow ${id}:`, error);
    })
}


// http://localhost:3000/api/workflows/cron