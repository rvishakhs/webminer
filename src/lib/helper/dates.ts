import { intervalToDuration } from "date-fns";

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