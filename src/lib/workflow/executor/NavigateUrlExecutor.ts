
import type {  ExecutionEnvironment } from 'types/Executor';
import type { LaunchBrowserTask } from '../task/LaunchBrowser';
import type { PageToHtml } from '../task/PageToHTML';
import type { FillInputTask } from '../task/FillInputTask';
import { waitFor } from '~/lib/helper/waitFor';
import type { ClickElementTask } from '../task/ClickElement';
import type { NavigateToURLTask } from '../task/NavigatetoUrlTask';

export async function NavigateToUrlExecutor(environment: ExecutionEnvironment<typeof NavigateToURLTask>): Promise<boolean> {
    try {
        const url = environment.getInput("URL");

        if(!url) {
            environment.log.error("URL input is required but not provided.");
            return false;
        }

        await environment.getPage()!.goto(url)
        environment.log.info(`Navigated to URL: ${url}`);
        return true;
    } catch (error: any) {
        environment.log.error(`Error in Navigate To URL Executor: ${error.message}`);
        return false
    }
}