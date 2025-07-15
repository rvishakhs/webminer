import { is } from "date-fns/locale";
import { CodeIcon, GlobeIcon, MousePointerClickIcon, SendIcon, TextIcon, Variable, type LucideProps } from "lucide-react";
import { TaskParamType, TaskType } from "types/task";
import type { WorkflowTask } from "types/workflow";

export const DeliverViaWebHookTask = {
    type: TaskType.DELIVER_VIA_WEBHOOK,
    label: "Deliver via Webhook",
    icon: (props: LucideProps) => <SendIcon className="stroke-blue-400" {...props} />,
    isEntryPoint: false,
    inputs : [
        {
            name: "Target URL",
            type: TaskParamType.STRING,
            required: true,
        }, 
        {
            name: "Body",
            type: TaskParamType.STRING,
            required: true,
        }
    ] as const,
    outputs: [] as const,
} satisfies WorkflowTask;

