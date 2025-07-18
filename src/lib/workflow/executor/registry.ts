import type { TaskType } from "types/task";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor";
import type { ExecutionEnvironment } from "types/Executor";
import type { WorkflowTask } from "types/workflow";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor";
import { FillInputExecutor } from "./FillInputExecutor";
import { ClickElementExecutor } from "./ClickElementExecutor";
import { WaitForElementExecutor } from "./WaitForElementExecutor";
import { DeliverViaWebhookExecutor } from "./DeliverViaWebhookExecutor";
import { ExtractDataWithAIExecutor } from "./ExtractDataWithAIExecutor";
import { ReadPropertyFromJSONExecutor } from "./ReadPropertyfromJsonExecutor";
import { AddPropertyToJSONExecutor } from "./AddPropertyToJsonExecutor";
import { NavigateToUrlExecutor } from "./NavigateUrlExecutor";
import { ScrollToElementExecutor } from "./ScrolltoElementExecutor";

type ExecutorFn<T extends WorkflowTask> = (enviornment: ExecutionEnvironment<T>) => Promise<boolean>;


type RegistryType = {
    [K in TaskType] : ExecutorFn<WorkflowTask & {type: K}>
}
export const ExecutorRegistry: RegistryType = {
    LAUNCH_BROWSER : LaunchBrowserExecutor,
    PAGE_TO_HTML: PageToHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
    FILL_INPUT: FillInputExecutor,
    CLICK_ELEMENT: ClickElementExecutor,
    WAIT_FOR_ELEMENT: WaitForElementExecutor,
    DELIVER_VIA_WEBHOOK: DeliverViaWebhookExecutor,
    EXTRACT_DATA_WITH_AI: ExtractDataWithAIExecutor,
    READ_PROPERTY_FROM_JSON: ReadPropertyFromJSONExecutor,
    ADD_PROPERTY_TO_JSON: AddPropertyToJSONExecutor,
    NAVIGATE_TO_URL: NavigateToUrlExecutor,
    SCROLL_TO_ELEMENT : ScrollToElementExecutor
}