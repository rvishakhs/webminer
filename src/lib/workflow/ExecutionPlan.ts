import type { AppNodes } from "types/appNode";
import type { Edge } from "@xyflow/react";
import type { WorkFlowExecutionPlan } from "types/workflow";
import { TaskRegistry } from "./task/registry";

type FlowToExecutionPlanType = {
    executionPlan?: WorkFlowExecutionPlan
}

export function FlowToExecutionPlan(nodes: AppNodes[], edges: Edge[] ): FlowToExecutionPlanType{

    const entryPoint = nodes.find((node) => TaskRegistry[node.data.type].isEntryPoint);

    if(!entryPoint) {
        console.error("No entry point found in the workflow.");
        return {executionPlan: []};
    }


    const executionPlan: WorkFlowExecutionPlan = [
        {
            phase: 1,
            nodes: [entryPoint]
        },
    ];
    return {executionPlan}
}