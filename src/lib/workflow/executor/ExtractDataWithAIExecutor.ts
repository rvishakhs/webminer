
import type {  ExecutionEnvironment } from 'types/Executor';
import type { LaunchBrowserTask } from '../task/LaunchBrowser';
import type { PageToHtml } from '../task/PageToHTML';
import type { FillInputTask } from '../task/FillInputTask';
import { waitFor } from '~/lib/helper/waitFor';
import type { ClickElementTask } from '../task/ClickElement';
import type { ExtractDataWithAiTask } from '../task/ExtractDataWithAI';
import { prisma } from '~/lib/prisma';
import { symetricDecrypt } from '~/lib/encryption';
import { Mistral } from '@mistralai/mistralai';

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

        // Implymenting AI model to extract data
        // const apiKey = process.env.MISTRAL_API_KEY;
        const apiKey = decryptedValue;

        const client = new Mistral({apiKey: apiKey});

        const chatResponse = await client.chat.complete({
            model: 'mistral-large-latest',
            messages: [{
                role: 'system', 
                content: "You are a webscraper helper that extracts data from HTML or text. you will be given a piece of text or HTML content as input and also the prompt with the data you have to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. Analyse the input carefully and extract the data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text" 
            },{
                role: 'user',
                content: content
            }, {
                role: 'user',
                content: prompt
            }], 
            temperature: 1
        });

        environment.log.info(`Prompt Tokens: ${chatResponse.usage?.promptTokens}`);
        environment.log.info(`Completion Token: ${chatResponse.usage?.completionTokens}`);

        const result = chatResponse.choices[0]?.message?.content;
        if(!result) {
            environment.log.error(`No response from AI`)
            return false
        }

         environment.setOutput("Extracted Data", JSON.stringify(result, null, 2));
        return true;
    } catch (error: any) {
        environment.log.error(`Error in Click Element Executor: ${error.message}`);
        return false
    }
}