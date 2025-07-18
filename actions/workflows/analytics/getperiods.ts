"use server";

import { auth } from "@clerk/nextjs/server";
import type { Periods } from "types/analythics";
import { prisma } from "~/lib/prisma";

export async function GetPeriods() {

    const {userId} = await auth()

    const years = await prisma.workflowExecution.aggregate({
        where: {
            userId: userId || undefined,
        },
        _min: {
            startedAt: true
        },
    })

    console.log("Years:", years);   

    const currentYear = new Date().getFullYear();

    const minYear = years._min.startedAt 
        ?  years._min.startedAt.getFullYear() 
        : currentYear ;

    const periods: Periods[] = [];

    for (let year = minYear; year <= currentYear; year++){
        for (let month = 1; month <= 12; month++){
            periods.push({year, month});
        }
    }

    return periods;

}