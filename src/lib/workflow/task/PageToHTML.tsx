import { CodeIcon, GlobeIcon, type LucideProps } from "lucide-react";
import { TaskParamType, TaskType } from "types/task";

export const PageToHtml = {
    type: TaskType.PAGE_TO_HTML,
    label: "Get Page HTML",
    icon: (props: LucideProps) => <CodeIcon className="stroke-rose-400" {...props} />,
    inputs : [
        {
            name: "Web page",
            type: TaskParamType.BROWSER_INSTANCE,
            required: true,
        }
    ]
}

