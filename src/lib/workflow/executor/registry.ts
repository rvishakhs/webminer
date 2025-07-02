import type { TaskType } from "types/task";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor";
import type { ExecutionEnvironment } from "types/Executor";
import type { WorkflowTask } from "types/workflow";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor";

type ExecutorFn<T extends WorkflowTask> = (enviornment: ExecutionEnvironment<T>) => Promise<boolean>;


type RegistryType = {
    [K in TaskType] : ExecutorFn<WorkflowTask & {type: K}>
}
export const ExecutorRegistry: RegistryType = {
    LAUNCH_BROWSER : LaunchBrowserExecutor,
    PAGE_TO_HTML: PageToHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
}