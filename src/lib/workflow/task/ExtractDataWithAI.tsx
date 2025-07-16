import { is } from "date-fns/locale";
import { Brain, CodeIcon, GlobeIcon, MousePointerClickIcon, TextIcon, Variable, type LucideProps } from "lucide-react";
import { TaskParamType, TaskType } from "types/task";
import type { WorkflowTask } from "types/workflow";

export const ExtractDataWithAiTask = {
    type: TaskType.EXTRACT_DATA_WITH_AI,
    label: "Extarct Data With AI",
    icon: (props: LucideProps) => <Brain className="stroke-rose-400" {...props} />,
    isEntryPoint: false,
    inputs : [
        {
            name: "Content",
            type: TaskParamType.STRING,
            required: true,
        }, 
        {
            name: "Credentials",
            type: TaskParamType.CREDENTIAL,
            required: true,
        },
        {
            name: "PROMPT",
            type: TaskParamType.STRING,
            required: true,
            variant: "textarea",
        }
    ] as const,
    outputs: [
        {
            name: "Extracted Data",
            type: TaskParamType.STRING,
        },
    ] as const,
} satisfies WorkflowTask;

