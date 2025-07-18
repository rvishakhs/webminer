import { is } from "date-fns/locale";
import { CodeIcon, Compass, GlobeIcon, MousePointerClickIcon, TextIcon, Variable, type LucideProps } from "lucide-react";
import { TaskParamType, TaskType } from "types/task";
import type { WorkflowTask } from "types/workflow";

export const NavigateToURLTask = {
    type: TaskType.NAVIGATE_TO_URL,
    label: "Navigate to URL",
    icon: (props: LucideProps) => <Compass className="stroke-orange-400" {...props} />,
    isEntryPoint: false,
    inputs : [
        {
            name: "Web page",
            type: TaskParamType.BROWSER_INSTANCE,
            required: true,
        }, 
        {
            name: "URL",
            type: TaskParamType.STRING,
            required: true,
        }
    ] as const,
    outputs: [
        {
            name: "Web Page",
            type: TaskParamType.BROWSER_INSTANCE,
        },
    ] as const,
} satisfies WorkflowTask;

