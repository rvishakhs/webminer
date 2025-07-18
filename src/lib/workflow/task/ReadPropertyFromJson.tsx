import { is } from "date-fns/locale";
import { Brain, BrainCircuit, CodeIcon, GlobeIcon, MousePointerClickIcon, TextIcon, Variable, type LucideProps } from "lucide-react";
import { TaskParamType, TaskType } from "types/task";
import type { WorkflowTask } from "types/workflow";

export const ReadPropertyFromJsonTask = {
    type: TaskType.READ_PROPERTY_FROM_JSON,
    label: "Read Properties From JSON",
    icon: (props: LucideProps) => <BrainCircuit className="stroke-rose-400" {...props} />,
    isEntryPoint: false,
    inputs : [
        {
            name: "JSON",
            type: TaskParamType.STRING,
            required: true,
        }, 
        {
            name: "Property Name",
            type: TaskParamType.STRING,
            required: true,
        }
    ] as const,
    outputs: [
        {
            name: "Property Value",
            type: TaskParamType.STRING,
        },
    ] as const,
} satisfies WorkflowTask;

