 import { LogLevels, type Log, type LogCollector, type LogFunction, type LogLevel } from "types/log";

export function createLogCollector(): LogCollector {
    const logs: Log[] = [];
    const getAll = () => logs;
    console.log("Log collector created");


    const logFunctions = {} as Record<LogLevel, LogFunction>;
    LogLevels.forEach((level) => 
        (logFunctions[level] = (message: string) => {
            logs.push({  message, level, timestamp: new Date() });
    })
    )

    return {
        getAll,  
        ...logFunctions,
        }; 
}


