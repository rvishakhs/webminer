import { CodeIcon, GlobeIcon, TextIcon, type LucideProps } from "lucide-react";
import { TaskParamType, TaskType } from "types/task";

export const ExtractTextFromElementTask = {
    type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
    label: "Extract text from element",
    icon: (props: LucideProps) => <TextIcon className="stroke-rose-400" {...props} />,
    inputs : [
        {
            name: "Html",
            type: TaskParamType.STRING,
            required: true,
        }, 
        {
            name: "Selector",
            type: TaskParamType.STRING,
            required: true,
        }
    ],
    outputs: [
        {
            name: "Extracted Text",
            type: TaskParamType.STRING,
        },
    ]
}

