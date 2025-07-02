
import type {  ExecutionEnvironment } from 'types/Executor';
import type { LaunchBrowserTask } from '../task/LaunchBrowser';
import type { PageToHtml } from '../task/PageToHTML';
import type { ExtractTextFromElementTask } from '../task/ExtractTextFromElement';
import * as cheerio from 'cheerio';

export async function ExtractTextFromElementExecutor(environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>): Promise<boolean> {
    try {
        const selector = environment.getInput("Selector")
        if (!selector) {
            console.error(`No text found for selector: ${selector}`)
            throw new Error("Selector input is required for ExtractTextFromElementExecutor");
        }

        const html  = environment.getInput("Html")
        if (!html) {
            console.error(`No text found for selector: ${html}`)
            throw new Error("Html input is required for ExtractTextFromElementExecutor");
        }

        const $ = cheerio.load(html);
        const elements = $(selector);

        if(!elements) {
            console.error(`No elements found for selector: ${elements}`);
            return false;
        }

        const extractedText = $.text(elements);
        if (!extractedText) {
            console.error(`No text found for selector: ${extractedText}`);
            return false;
        }

        environment.setOutput("Extracted Text", extractedText);

        return true;
    } catch (error) {
        console.error("Error in LaunchBrowserExecutor:", error)
        return false
    }
}