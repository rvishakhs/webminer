export enum TaskType {
    LAUNCH_BROWSER = "LAUNCH_BROWSER",
}

export enum TaskParamType {
    STRING = "STRING"
}

export interface TaskParam {
    name: string;
    type: TaskParamType;
    helperText?: string;
    required?: boolean;
    hideHandle?: boolean; // If true, the handle will not be displayed in the UI
    value?: string;
    [key: string]: any; // Allow additional properties
}