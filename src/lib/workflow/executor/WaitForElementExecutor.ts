
import type {  ExecutionEnvironment } from 'types/Executor';
import type { LaunchBrowserTask } from '../task/LaunchBrowser';
import type { PageToHtml } from '../task/PageToHTML';
import type { FillInputTask } from '../task/FillInputTask';
import { waitFor } from '~/lib/helper/waitFor';
import type { ClickElementTask } from '../task/ClickElement';
import type { WaitForElementTask } from '../task/WaitForElement';

export async function WaitForElementExecutor(environment: ExecutionEnvironment<typeof WaitForElementTask>): Promise<boolean> {
    try {
        const selector = environment.getInput("Selector");

        if(!selector) {
            environment.log.error("Selector input is required but not provided.");
            return false;
        }

        const visibility = environment.getInput("Visibility");
        if(!visibility) {
            environment.log.error("Visibility input is required but not provided.");
            return false;
        }

        await environment.getPage()!.waitForSelector(selector, {
            visible: visibility === "visible",
            hidden: visibility === "hidden",
        });
        environment.log.info(`Element with selector "${selector}" is now ${visibility}.`); // Log the visibility status
        return true;
    } catch (error: any) {
        environment.log.error(`Error in Click Element Executor: ${error.message}`);
        return false
    }
}