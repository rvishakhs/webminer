import { TaskParamType } from "types/task"

export const ColorForHandle: Record<TaskParamType, string> = {
    [TaskParamType.BROWSER_INSTANCE] : "!bg-sky-400",
    [TaskParamType.STRING] : "!bg-amber-400",
    [TaskParamType.SELECT] : "!bg-emerald-400",
    [TaskParamType.CREDENTIAL] : "!bg-teal-400",
}