import puppeteer from 'puppeteer';
import type { Environment, ExecutionEnvironment } from 'types/Executor';
import { waitFor } from '~/lib/helper/waitFor';
import type { LaunchBrowserTask } from '../task/LaunchBrowser';

export async function LaunchBrowserExecutor(environment: ExecutionEnvironment<typeof LaunchBrowserTask>): Promise<boolean> {
    try {
        const websiteURL = environment.getInput("Website URL");
        console.log("@@WEBSITEURL", websiteURL);
        const browser = await puppeteer.launch({
            headless: false // for testing 
        })

        await waitFor(3000)
        await browser.close()
        return true;
    } catch (error) {
        console.error("Error in LaunchBrowserExecutor:", error)
        return false
    }
}