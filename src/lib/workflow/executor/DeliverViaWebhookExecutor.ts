
import type {  ExecutionEnvironment } from 'types/Executor';
import type { LaunchBrowserTask } from '../task/LaunchBrowser';
import type { PageToHtml } from '../task/PageToHTML';
import type { FillInputTask } from '../task/FillInputTask';
import { waitFor } from '~/lib/helper/waitFor';
import type { ClickElementTask } from '../task/ClickElement';
import type { DeliverViaWebHookTask } from '../task/DeliverViaWebhookTask';

export async function DeliverViaWebhookExecutor(environment: ExecutionEnvironment<typeof DeliverViaWebHookTask>): Promise<boolean> {
    try {
        const target_url = environment.getInput("Target URL");

        if(!target_url) {
            environment.log.error("target Url is required but not provided.");
            return false;
        }
        const body = environment.getInput("Body");

        if(!body) {
            environment.log.error("body is required but not provided.");
            return false;
        }

        const response = await fetch(target_url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        const statusCode = response.status;

        if(statusCode !== 200) {
            environment.log.error(`Failed to deliver via webhook. Status code: ${statusCode}`);
            return false;
        }

        const responseBody = await response.json();
        environment.log.info(`Successfully delivered via webhook. Response: ${JSON.stringify(responseBody.data, null, 2)}`);
        return true;
    } catch (error: any) {
        environment.log.error(`Error in Click Element Executor: ${error.message}`);
        return false
    }
}