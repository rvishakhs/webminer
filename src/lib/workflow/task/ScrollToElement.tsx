import { is } from "date-fns/locale";
import { ArrowUpDown, CodeIcon, GlobeIcon, MousePointerClickIcon, TextIcon, Variable, type LucideProps } from "lucide-react";
import { TaskParamType, TaskType } from "types/task";
import type { WorkflowTask } from "types/workflow";

export const ScrollToElementTask = {
    type: TaskType.SCROLL_TO_ELEMENT,
    label: "Scroll to Element",
    icon: (props: LucideProps) => <ArrowUpDown className="stroke-orange-400" {...props} />,
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
        }
    ] as const,
    outputs: [
        {
            name: "Web Page",
            type: TaskParamType.BROWSER_INSTANCE,
        },
    ] as const,
} satisfies WorkflowTask;

