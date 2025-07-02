import { is } from "date-fns/locale";
import { CodeIcon, GlobeIcon, TextIcon, Variable, type LucideProps } from "lucide-react";
import { TaskParamType, TaskType } from "types/task";
import type { WorkflowTask } from "types/workflow";

export const ExtractTextFromElementTask = {
    type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
    label: "Extract text from element",
    icon: (props: LucideProps) => <TextIcon className="stroke-rose-400" {...props} />,
    isEntryPoint: false,
    inputs : [
        {
            name: "Html",
            type: TaskParamType.STRING,
            required: true,
            Variant : "textarea"
        }, 
        {
            name: "Selector",
            type: TaskParamType.STRING,
            required: true,
        }
    ] as const,
    outputs: [
        {
            name: "Extracted Text",
            type: TaskParamType.STRING,
        },
    ] as const,
} satisfies WorkflowTask;

