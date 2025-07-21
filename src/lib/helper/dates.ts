import { endOfMonth, intervalToDuration, startOfMonth } from "date-fns";
import type { Periods } from "types/analythics";

export function DatesToDurationString(
    end: Date | null | undefined,
    start: Date | null | undefined
){
    if(!start || !end) return null;

    const timeElapased = end.getTime() - start.getTime()

    if (timeElapased < 1000) return `${timeElapased} ms`;

    const duration = intervalToDuration({
        start: 0,
        end: timeElapased,
    })

    return `${duration.minutes || 0}m ${duration.seconds || 0}s`;
}

export function PeriodToDateRange(period: Periods){
    const startDate = startOfMonth(new Date(period.year, period.month - 1));
    const endDate = endOfMonth(new Date(period.year, period.month - 1));
    return { startDate, endDate };
}