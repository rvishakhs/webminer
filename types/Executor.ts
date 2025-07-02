import type { Browser } from "puppeteer";

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

export type ExecutionEnvironment = {
    getInput(name: string): string | undefined;
}