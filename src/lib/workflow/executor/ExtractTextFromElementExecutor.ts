
import type {  ExecutionEnvironment } from 'types/Executor';
import type { LaunchBrowserTask } from '../task/LaunchBrowser';
import type { PageToHtml } from '../task/PageToHTML';
import type { ExtractTextFromElementTask } from '../task/ExtractTextFromElement';
import * as cheerio from 'cheerio';
import { waitFor } from '~/lib/helper/waitFor';

export async function ExtractTextFromElementExecutor(environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>): Promise<boolean> {
    

    try {
        const selector = environment.getInput("Selector")
        if (!selector) {
            console.error(`No text found for selector: ${selector}`)
        }

        console.log("@@Selector", selector)
        const html  = environment.getInput("Html")
        if (!html) {
            console.error(`No text found for html: ${html}`)
        }

        console.log("@@HTML", html)

        const $ = cheerio.load(html!);
        const elements = $(selector);

        console.log("@@Elements", elements)
        if(!elements) {
            console.error(`No elements found for selector: ${elements}`);
            return false;
        }
        if (elements.length === 0) {
        console.error(`No elements found for selector: ${selector}`);
        return false;
}

        // const extractedText = $.text(elements);
        const extractedText = elements.text();
        console.log("@@Extracted text", extractedText)
        if (!extractedText) {
            console.error(`No extracted text Found: ${extractedText}`);
            return false;
        }

        environment.setOutput("Extracted Text", extractedText);

        return true;
    } catch (error) {
        console.error("Error in LaunchBrowserExecutor:", error)
        return false
    }
}