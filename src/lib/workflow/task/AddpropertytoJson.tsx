import { is } from "date-fns/locale";
import { CodeIcon, Database, GlobeIcon, MousePointerClickIcon, TextIcon, Variable, type LucideProps } from "lucide-react";
import { TaskParamType, TaskType } from "types/task";
import type { WorkflowTask } from "types/workflow";

export const AddPropertyToJsonTask = {
    type: TaskType.ADD_PROPERTY_TO_JSON,
    label: "Add Property to JSON",
    icon: (props: LucideProps) => <Database className="stroke-orange-400" {...props} />,
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
        },
        {
            name: "Property Value",
            type: TaskParamType.STRING,
            required: true,
        },
    ] as const,
    outputs: [
        {
            name: "Updated JSON",
            type: TaskParamType.STRING,
        },
    ] as const,
} satisfies WorkflowTask;

