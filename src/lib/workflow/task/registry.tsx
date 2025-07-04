import type { TaskType } from "types/task";
import { ExtractTextFromElementTask } from "./ExtractTextFromElement";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { PageToHtml } from "./PageToHTML";
import type { WorkflowTask } from "types/workflow";

type Registry = {
    [K in TaskType] : WorkflowTask & {type: K}
}

export const TaskRegistry = {
    LAUNCH_BROWSER: LaunchBrowserTask,
    PAGE_TO_HTML : PageToHtml,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask
}

