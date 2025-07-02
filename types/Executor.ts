import type { Browser } from "puppeteer";
import type { WorkflowTask } from "./workflow";

export type Environment = {

    browser?: Browser; // Puppeteer browser instance
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
}