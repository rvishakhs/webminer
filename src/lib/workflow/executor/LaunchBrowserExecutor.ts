import puppeteer from 'puppeteer';
import type { Environment } from 'types/Executor';
import { waitFor } from '~/lib/helper/waitFor';

export async function LaunchBrowserExecutor(environment: Environment): Promise<boolean> {
    try {
        console.log("@@ENV", JSON.stringify(environment, null, 4));
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