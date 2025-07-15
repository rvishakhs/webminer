import type { TaskType } from "types/task";
import { ExtractTextFromElementTask } from "./ExtractTextFromElement";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { PageToHtml } from "./PageToHTML";
import type { WorkflowTask } from "types/workflow";
import { FillInputTask } from "./FillInputTask";
import { ClickElementTask } from "./ClickElement";
import { WaitForElementTask } from "./WaitForElement";

type Registry = {
    [K in TaskType] : WorkflowTask & {type: K}
}

export const TaskRegistry = {
    LAUNCH_BROWSER: LaunchBrowserTask,
    PAGE_TO_HTML : PageToHtml,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
    FILL_INPUT: FillInputTask,
    CLICK_ELEMENT: ClickElementTask,
    WAIT_FOR_ELEMENT: WaitForElementTask
}

