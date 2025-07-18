
import type {  ExecutionEnvironment } from 'types/Executor';

import type { ReadPropertyFromJsonTask } from '../task/ReadPropertyFromJson';

export async function ReadPropertyFromJSONExecutor(environment: ExecutionEnvironment<typeof ReadPropertyFromJsonTask>): Promise<boolean> {
    try {
        const jsonData = environment.getInput("JSON");

        if(!jsonData) {
            environment.log.error("JSON input is required but not provided.");
            return false;
        }

        const propertyName = environment.getInput("Property Name");

        if(!propertyName) {
            environment.log.error("Property Name input is required but not provided.");
            return false;
        }

        // Parse the JSON string
        const json = JSON.parse(jsonData);
        // Check if the property exists in the JSON
        const propertyValue = json[propertyName];
        if(propertyValue === undefined) {
            environment.log.error(`Property '${propertyName}' not found in the JSON.`);
            return false;
        }
        environment.setOutput("Property Value", propertyValue);
        return true;
    } catch (error: any) {
        environment.log.error(`Error in Read Property From JSON Executor: ${error.message}`);
        return false
    }
}