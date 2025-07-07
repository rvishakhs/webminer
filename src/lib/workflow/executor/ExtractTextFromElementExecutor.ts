
import type {  ExecutionEnvironment } from 'types/Executor';
import type { LaunchBrowserTask } from '../task/LaunchBrowser';
import type { PageToHtml } from '../task/PageToHTML';
import type { ExtractTextFromElementTask } from '../task/ExtractTextFromElement';
import * as cheerio from 'cheerio';
import { waitFor } from '~/lib/helper/waitFor';

export async function ExtractTextFromElementExecutor(environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>): Promise<boolean> {
    

    console.log("[DEBUG] ExtractTextFromElementExecutor called");
    try {
        const selector = environment.getInput("Selector")
        if (!selector) {
            console.log("[DEBUG] selector:", selector);
            environment.log.error(`No selector found for ExtractTextFromElementExecutor: ${selector}`);
            return false;
        }

        const html  = environment.getInput("Html")
        console.log("[DEBUG] html length:", html?.length);
        if (!html) {
            environment.log.error(`No html found for ExtractTextFromElementExecutor: ${html}`);
            return false;
        }


        const $ = cheerio.load(html!);
        const elements = $(selector);

        if(!elements) {
            environment.log.error(`No elements found for selector: ${elements}`);
            return false;
        }
        if (elements.length === 0) {
            environment.log.error(`No elements found for selector: ${selector}`);
            return false;
        }

        // const extractedText = $.text(elements);
        const extractedText = elements.text();
        if (!extractedText) {
            environment.log.error(`No text found for selector: ${extractedText}`);
            return false;
        }

        environment.setOutput("Extracted Text", extractedText);

        return true;
    } catch (error: any) {
        environment.log.error(`Error in ExtractTextFromElementExecutor: ${error.message}`);
        return false
    }
}