"use server"

import { auth } from "@clerk/nextjs/server";
import { eachDayOfInterval, format } from "date-fns";
import { WorkFlowExecutionStatus } from "types/workflow";
import { object } from "zod";
import { PeriodToDateRange } from "~/lib/helper/dates";
import { prisma } from "~/lib/prisma";

type Status = Record<string, {
    success: number;
    failed: number;
}>

export async function GetWorkflowExecutionStatus(params: { month: number; year: number }) {
   
    const {userId} = await auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const dateRange = PeriodToDateRange(params)
    const executions = await prisma.workflowExecution.findMany({
        where: {    
            userId,
            startedAt: {
                gte: dateRange.startDate,
                lte: dateRange.endDate,
            },
        }
    });

    const stats: Status  = eachDayOfInterval({
        start: dateRange.startDate,
        end: dateRange.endDate,
    }).map((date) => format(date, 'yyyy-MM-dd')).reduce((acc, date) => {
        acc[date] = {
            success: 0,
            failed: 0,
        };
        return acc;
    }, {} as Status);


    executions.forEach((execution) => {
        const date = format(execution.startedAt!, 'yyyy-MM-dd');
        if (execution.status === WorkFlowExecutionStatus.COMPLETED) {
            stats[date]!.success += 1;
        } else if (execution.status === WorkFlowExecutionStatus.FAILED) {
            stats[date]!.failed += 1;
        }
    });

    const result = Object.entries(stats).map(([date, info]) => ({
        date, 
        ...info
    }) )

    return result

}