import type { Browser, Page } from "puppeteer";
import type { WorkflowTask } from "./workflow";
import type { LogCollector } from "./log";

export type Environment = {

    browser?: Browser; // Puppeteer browser instance
    page?: Page; // Puppeteer page instance
    phases: Record<
        string,
        {
            inputs: Record<string, string>;
            outputs: Record<string, string>;
        }
        >;

}

export type ExecutionEnvironment<T extends WorkflowTask> = {
    getInput(name: T["inputs"][number]["name"]): string | undefined;
    setOutput(name: T["outputs"][number]["name"], value: string): void;

    getBrowser(): Browser | undefined;
    setBrowser(browser: Browser): void;

    getPage(): Page | undefined;
    setPage(page: Page): void // Puppeteer Page instance
    log: LogCollector;
}