import { GlobeIcon, type LucideProps } from "lucide-react";
import { TaskParamType, TaskType } from "types/task";
import type { WorkflowTask } from "types/workflow";

export const LaunchBrowserTask = {
    type: TaskType.LAUNCH_BROWSER,
    label: "Launch Browser",
    icon: (props: LucideProps) => <GlobeIcon className="stroke-pink-400" {...props} />,
    isEntryPoint: true,
    inputs : [
        {
            name: "Website URL",
            type: TaskParamType.STRING,
            helperText: "eg: https://www.google.com",
            required: true,
            hideHandle: true, 
        }
    ] as const,
    outputs : [
        {
            name: "Web Page",
            type: TaskParamType.BROWSER_INSTANCE,
        }
    ]
} satisfies WorkflowTask;

