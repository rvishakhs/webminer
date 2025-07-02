
import type {  ExecutionEnvironment } from 'types/Executor';
import type { LaunchBrowserTask } from '../task/LaunchBrowser';
import type { PageToHtml } from '../task/PageToHTML';

export async function PageToHtmlExecutor(environment: ExecutionEnvironment<typeof PageToHtml>): Promise<boolean> {
    try {
        const html = await environment.getPage()!.content();
        console.log("HTML content retrieved successfully");
        console.log("@@HTML@@", html);



        return true;
    } catch (error) {
        console.error("Error in LaunchBrowserExecutor:", error)
        return false
    }
}