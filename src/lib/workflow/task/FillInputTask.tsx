import { Edit3Icon, type LucideProps } from "lucide-react";
import { TaskParamType, TaskType } from "types/task";
import type { WorkflowTask } from "types/workflow";

export const FillInputTask = {
    type: TaskType.FILL_INPUT,
    label: "Fill Input",
    icon: (props: LucideProps) => <Edit3Icon className="stroke-orange-400" {...props} />,
    isEntryPoint: false,
    inputs : [
        {
            name: "Web page",
            type: TaskParamType.BROWSER_INSTANCE,
            required: true,
        },
        {
            name: "Selector",
            type: TaskParamType.STRING,
            required: true,
        },
        {
            name: "Value",
            type: TaskParamType.STRING,
            required: true,
        },
    ] as const,
    outputs: [
        {
            name: "Web Page",
            type: TaskParamType.BROWSER_INSTANCE,
        },
    ] as const,
} satisfies WorkflowTask;

 