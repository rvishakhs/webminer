"use server"

import type { Periods } from "types/analythics";
import { PeriodToDateRange } from "~/lib/helper/dates";

export async function GetStatusCardsValues(selectedPeriod: Periods) {
    const dateRange = PeriodToDateRange(selectedPeriod);
    
}