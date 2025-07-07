import puppeteer from 'puppeteer';
import type { Environment, ExecutionEnvironment } from 'types/Executor';
import { waitFor } from '~/lib/helper/waitFor';
import type { LaunchBrowserTask } from '../task/LaunchBrowser';

export async function LaunchBrowserExecutor(environment: ExecutionEnvironment<typeof LaunchBrowserTask>): Promise<boolean> {
    try {
        const websiteUrl = environment.getInput("Website URL");
        const browser = await puppeteer.launch({
            headless: false // for testing 
        })
        environment.log.info('Launching browser...');
        environment.setBrowser(browser);
        const page = await browser.newPage();
        await page.goto(websiteUrl!)
        environment.setPage(page);
        environment.log.info(`Browser launched and navigated to ${websiteUrl}`);
        return true;
    } catch (error: any) {
        environment.log.error(`Error in LaunchBrowserExecutor: ${error.message}`);
        return false
    }
}