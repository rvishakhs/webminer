
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
            environment.log.Error(`No selector found for ExtractTextFromElementExecutor: ${selector}`);
            return false;
        }

        const html  = environment.getInput("Html")
        if (!html) {
            environment.log.Error(`No html found for ExtractTextFromElementExecutor: ${html}`);
            return false;
        }


        const $ = cheerio.load(html!);
        const elements = $(selector);

        if(!elements) {
            environment.log.Error(`No elements found for selector: ${elements}`);
            return false;
        }
        if (elements.length === 0) {
        return false;
}

        // const extractedText = $.text(elements);
        const extractedText = elements.text();
        if (!extractedText) {
            environment.log.Error(`No text found for selector: ${extractedText}`);
            return false;
        }

        environment.setOutput("Extracted Text", extractedText);

        return true;
    } catch (error) {
        environment.log.Error(`Error in ExtractTextFromElementExecutor: ${error}`);
        return false
    }
}