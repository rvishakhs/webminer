
import type {  ExecutionEnvironment } from 'types/Executor';
import type { LaunchBrowserTask } from '../task/LaunchBrowser';
import type { PageToHtml } from '../task/PageToHTML';
import type { FillInputTask } from '../task/FillInputTask';
import { waitFor } from '~/lib/helper/waitFor';
import type { ClickElementTask } from '../task/ClickElement';
import type { ExtractDataWithAiTask } from '../task/ExtractDataWithAI';
import { prisma } from '~/lib/prisma';
import { symetricDecrypt } from '~/lib/encryption';

export async function ExtractDataWithAIExecutor(environment: ExecutionEnvironment<typeof ExtractDataWithAiTask>): Promise<boolean> {
    try {
        const credentials = environment.getInput("Credentials");

        if(!credentials) {
            environment.log.error("Input 'Credentials' is required but not provided.");
            return false;
        }
        const prompt = environment.getInput("PROMPT");

        if(!prompt) {
            environment.log.error("Prompt is missing.");
            return false;
        }
        const content = environment.getInput("Content");

        if(!content) {
            environment.log.error("content is required to Analyse with AI.");
            return false;
        }

// Now we need to access the credentials from db and decrypt the value
        const credential = await prisma.credential.findUnique({
            where: {
                id: credentials,
            },
        })

        if(!credential) {
            environment.log.error("Credential not found in the DB.");
            return false;
        }

        // Assuming the credential value is encrypted, you would decrypt it here
        const decryptedValue = symetricDecrypt(credential.value)
        if(!decryptedValue) {
            environment.log.error("Failed to decrypt the credential value.");
            return false;
        }

        const mockExtractedData = {
            
        }

        await environment.setOutput("Extracted Data", JSON.stringify(mockExtractedData))
        return true;
    } catch (error: any) {
        environment.log.error(`Error in Click Element Executor: ${error.message}`);
        return false
    }
}