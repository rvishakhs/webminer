
import type {  ExecutionEnvironment } from 'types/Executor';
import type { LaunchBrowserTask } from '../task/LaunchBrowser';
import type { PageToHtml } from '../task/PageToHTML';
import type { FillInputTask } from '../task/FillInputTask';
import { waitFor } from '~/lib/helper/waitFor';
import type { ClickElementTask } from '../task/ClickElement';

export async function ClickElementExecutor(environment: ExecutionEnvironment<typeof ClickElementTask>): Promise<boolean> {
    try {
        const selector = environment.getInput("Selector");

        if(!selector) {
            environment.log.error("Selector input is required but not provided.");
            return false;
        }

        await environment.getPage()!.click(selector)
        await waitFor(2000)
        return true;
    } catch (error: any) {
        environment.log.error(`Error in Click Element Executor: ${error.message}`);
        return false
    }
}