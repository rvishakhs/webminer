import type { TaskType } from "types/task";
import { ExtractTextFromElementTask } from "./ExtractTextFromElement";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { PageToHtml } from "./PageToHTML";
import type { WorkflowTask } from "types/workflow";
import { FillInputTask } from "./FillInputTask";
import { ClickElementTask } from "./ClickElement";
import { WaitForElementTask } from "./WaitForElement";
import { DeliverViaWebHookTask } from "./DeliverViaWebhookTask";
import { ExtractDataWithAiTask } from "./ExtractDataWithAI";
import { ReadPropertyFromJsonTask } from "./ReadPropertyFromJson";
import { AddPropertyToJsonTask } from "./AddpropertytoJson";
import { NavigateToURLTask } from "./NavigatetoUrlTask";
import { ScrollToElementTask } from "./ScrollToElement";

type Registry = {
    [K in TaskType] : WorkflowTask & {type: K}
}

export const TaskRegistry = {
    LAUNCH_BROWSER: LaunchBrowserTask,
    PAGE_TO_HTML : PageToHtml,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
    FILL_INPUT: FillInputTask,
    CLICK_ELEMENT: ClickElementTask,
    WAIT_FOR_ELEMENT: WaitForElementTask,
    DELIVER_VIA_WEBHOOK: DeliverViaWebHookTask,
    EXTRACT_DATA_WITH_AI: ExtractDataWithAiTask,
    READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonTask,
    ADD_PROPERTY_TO_JSON: AddPropertyToJsonTask,
    NAVIGATE_TO_URL: NavigateToURLTask,
    SCROLL_TO_ELEMENT: ScrollToElementTask,
}

