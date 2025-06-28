
import type { Node } from '@xyflow/react';
import type { TaskParam, TaskType } from './task';

export interface AppNodeData {
    type: TaskType;
    inputs: Record<string, string>;
    [key: string]: any;
}

export interface AppNodes extends Node {
    data : AppNodeData;
}

export interface ParamProps {
    param: TaskParam;
    value: string | undefined;
    updateNodeParamValue: (newValue: string) => void;
    disabled?: boolean;
}

export type AppNodeMissingInputs = {
    nodeId: string;
    inputs: string[];
}