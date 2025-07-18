
import type {  ExecutionEnvironment } from 'types/Executor';
import type { LaunchBrowserTask } from '../task/LaunchBrowser';
import type { PageToHtml } from '../task/PageToHTML';
import type { FillInputTask } from '../task/FillInputTask';
import { waitFor } from '~/lib/helper/waitFor';
import type { ClickElementTask } from '../task/ClickElement';
import type { ScrollToElementTask } from '../task/ScrollToElement';

export async function ScrollToElementExecutor(environment: ExecutionEnvironment<typeof ScrollToElementTask>): Promise<boolean> {
    try {
        const selector = environment.getInput("Selector");

        if(!selector) {
            environment.log.error("Selector input is required but not provided.");
            return false;
        }

        await environment.getPage()!.evaluate((selector) => {
            const element = document.querySelector(selector);
            if(!element) {
                throw new Error(`Element with selector "${selector}" not found.`);
            }

            const top = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top,
                behavior: "smooth"
            });
        }, selector)
        return true;
    } catch (error: any) {
        environment.log.error(`Error in Scroll To Element Executor: ${error.message}`);
        return false
    }
}