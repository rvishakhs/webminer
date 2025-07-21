"use server"

import { auth } from "@clerk/nextjs/server";
import type { Periods } from "types/analythics";
import { WorkFlowExecutionStatus } from "types/workflow";
import { PeriodToDateRange } from "~/lib/helper/dates";
import { prisma } from "~/lib/prisma";

export async function GetStatusCardsValues(selectedPeriod: Periods) {
    const dateRange = PeriodToDateRange(selectedPeriod);

    const  {COMPLETED, FAILED } = WorkFlowExecutionStatus

    const {userId} = await auth();
    if(!userId) {
        throw new Error("User not authenticated");
    }

    const executions = await prisma.workflowExecution.findMany({
        where: {
            userId,
            startedAt: {
                gte: dateRange.startDate,
                lte: dateRange.endDate,
            },
            status: {
                in: [COMPLETED, FAILED]
            },
            phases: {
                some: {
                    status: {
                        in: [COMPLETED, FAILED]
                    }
                }
            }
        }
    })

    const stats = {
        workflowExecutions : executions.length,
        phasesExecuted: 0,
        workflowCompleted: 0,
        workflowFailed: 0,
    }

    // stats.phasesExecuted = executions.reduce(
    //     (sum, executions) => sum + executions.phases.length, 0
    // )

    stats.workflowCompleted = executions.reduce(
        (sum, executions) => sum + (executions.status === COMPLETED ? 1 : 0), 0
    )

    stats.workflowFailed = executions.reduce(
        (sum, executions) => sum + (executions.status === FAILED ? 1 : 0), 0
    )

    return stats;
}