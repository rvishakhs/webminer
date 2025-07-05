
import type {  ExecutionEnvironment } from 'types/Executor';
import type { LaunchBrowserTask } from '../task/LaunchBrowser';
import type { PageToHtml } from '../task/PageToHTML';

export async function PageToHtmlExecutor(environment: ExecutionEnvironment<typeof PageToHtml>): Promise<boolean> {
    try {
        const html = await environment.getPage()!.content();
        environment.setOutput("Html", html);

        return true;
    } catch (error: any) {
        environment.log.Error(`Error in PageToHtmlExecutor: ${error.message}`);
        return false
    }
}