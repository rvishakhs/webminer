import { is } from "date-fns/locale";
import { CodeIcon, Eye, GlobeIcon, MousePointerClickIcon, TextIcon, Variable, type LucideProps } from "lucide-react";
import { TaskParamType, TaskType } from "types/task";
import type { WorkflowTask } from "types/workflow";

export const WaitForElementTask = {
    type: TaskType.WAIT_FOR_ELEMENT,
    label: "Wait For Element",
    icon: (props: LucideProps) => <Eye className="stroke-amber-400" {...props} />,
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
            name: "Visibility",
            type: TaskParamType.SELECT,
            hideHandle: true,

            required: true,
            options: [
                { label: "Visible", value: "visible" },
                { label: "Hidden", value: "hidden" },
            ]
        },
    ] as const,
    outputs: [
        {
            name: "Web Page",
            type: TaskParamType.BROWSER_INSTANCE,
        },
    ] as const,
} satisfies WorkflowTask;

