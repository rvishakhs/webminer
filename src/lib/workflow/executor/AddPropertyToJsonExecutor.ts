
import type {  ExecutionEnvironment } from 'types/Executor';

import type { ReadPropertyFromJsonTask } from '../task/ReadPropertyFromJson';
import type { AddPropertyToJsonTask } from '../task/AddpropertytoJson';

export async function AddPropertyToJSONExecutor(environment: ExecutionEnvironment<typeof AddPropertyToJsonTask>): Promise<boolean> {
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

        const propertyValue = environment.getInput("Property Value");

        if(!propertyValue) {
            environment.log.error("Property Value input is required but not provided.");
            return false;
        }

        const json = JSON.parse(jsonData);
        json[propertyName] = propertyValue;

        environment.setOutput("Updated JSON", JSON.stringify(json));

        return true;
    } catch (error: any) {
        environment.log.error(`Error in Read Property From JSON Executor: ${error.message}`);
        return false
    }
}