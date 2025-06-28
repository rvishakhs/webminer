import type { AppNodes } from "types/appNode";
import { getIncomers, type Edge } from "@xyflow/react";
import type { WorkFlowExecutionPlan, WorkFlowExecutionPlanPhase } from "types/workflow";
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

    const planned = new Set<string>();
    const executionPlan: WorkFlowExecutionPlan = [
        {
            phase: 1,
            nodes: [entryPoint],
        },
    ];

    for (
        let phase = 2; 
        phase <= nodes.length || planned.size < nodes.length; 
        phase++
    ) {
        const nextPhase: WorkFlowExecutionPlanPhase = {phase, nodes: []};
        for(const currentNode of nodes){
            if (planned.has(currentNode.id)) {
                continue; // Skip already planned nodes
            }

            const invalidInputs = getInvalidInputs(currentNode, edges, planned);
            if (invalidInputs?.length > 0) {
                const incomers = getIncomers(currentNode, nodes, edges);
                if(incomers.every((incomer) => planned.has(incomer.id))) {
                    console.error("Invalid inputs", currentNode.id, invalidInputs);
                    throw new Error("TODO: Handle error one")
                } else {
                    continue; // Skip this node, it has invalid inputs
                }
            }
            nextPhase.nodes.push(currentNode);
            planned.add(currentNode.id);
        }
    }
    return {executionPlan}
}

function getInvalidInputs(node: AppNodes, edges: Edge[], planned: Set<string>) {
    const invalidInputs = [];
    const inputs = TaskRegistry[node.data.type].inputs;
    for (const input of inputs ) {
        const inputValue = node.data.inputs[input.name];
        const inputValueProvided = inputValue?.length > 0;

        if (inputValueProvided) {
            continue;
        }

        const incomingEdges = edges.filter((edge) => edge.target === node.id);

        const inputLinkedByOutput = incomingEdges.find(
            (edge) => edge.targetHandle === input.name 
        );

        const requiredInputProvidedByVisitedOutput = 
            input.required &&
            inputLinkedByOutput &&
            planned.has(inputLinkedByOutput.source);

        if (requiredInputProvidedByVisitedOutput) {
            continue;
        } else if (input.required) {
            if(!inputLinkedByOutput) continue;
            if(inputLinkedByOutput && planned.has(inputLinkedByOutput.source)) {
                continue
            }
        }
        invalidInputs.push(input.name);
    }

    return invalidInputs;
}