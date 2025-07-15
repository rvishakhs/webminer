
import type {  ExecutionEnvironment } from 'types/Executor';
import type { LaunchBrowserTask } from '../task/LaunchBrowser';
import type { PageToHtml } from '../task/PageToHTML';
import type { FillInputTask } from '../task/FillInputTask';
import { waitFor } from '~/lib/helper/waitFor';

export async function FillInputExecutor(environment: ExecutionEnvironment<typeof FillInputTask>): Promise<boolean> {
    try {
        const selector = environment.getInput("Selector");

        if(!selector) {
            environment.log.error("Selector input is required but not provided.");
            return false;
        }

        const value = environment.getInput("Value");
        if(!value) {
             environment.log.error("Value for thew selector is null or undefined.");
            return false;
        }

        await environment.getPage()!.type(selector, value);
        return true;
    } catch (error: any) {
        environment.log.error(`Error in Fill input Executor: ${error.message}`);
        return false
    }
}