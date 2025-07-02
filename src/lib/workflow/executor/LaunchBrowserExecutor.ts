import puppeteer from 'puppeteer';
import { waitFor } from '~/lib/helper/waitFor';

export async function LaunchBrowserExecutor(): Promise<boolean> {
    try {
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