import { CodeIcon, GlobeIcon, type LucideProps } from "lucide-react";
import { TaskParamType, TaskType } from "types/task";
import type { WorkflowTask } from "types/workflow";

export const PageToHtml = {
    type: TaskType.PAGE_TO_HTML,
    label: "Get Page HTML",
    icon: (props: LucideProps) => <CodeIcon className="stroke-rose-400" {...props} />,
    isEntryPoint: false,
    inputs : [
        {
            name: "Web page",
            type: TaskParamType.BROWSER_INSTANCE,
            required: true,
        }
    ] as const,
    outputs: [
        {
            name: "Html",
            type: TaskParamType.STRING,
        },
        {
            name: "Web Page",
            type: TaskParamType.BROWSER_INSTANCE,
        },
    ] as const,
} satisfies WorkflowTask;

