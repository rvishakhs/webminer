import type { AppNodeMissingInputs, AppNodes } from "types/appNode";
import { getIncomers, type Edge } from "@xyflow/react";
import type { WorkFlowExecutionPlan, WorkFlowExecutionPlanPhase } from "types/workflow";
import { TaskRegistry } from "./task/registry";

export enum FlowToExecutionPlanValidationError {
    "No_ENTRY_POINT" = "No entry point found in the workflow.",
    "INVALID_INPUTS" = "Invalid inputs found in the workflow.",

}

type FlowToExecutionPlanType = {
    executionPlan?: WorkFlowExecutionPlan;
    error?: {
        type: FlowToExecutionPlanValidationError;
        isinvalidElements?: AppNodeMissingInputs[];
    }
}

export function  FlowToExecutionPlan(nodes: AppNodes[], edges: Edge[] ): FlowToExecutionPlanType{

    const entryPoint = nodes.find((node) => TaskRegistry[node.data.type].isEntryPoint);

    if (!entryPoint) {
        return {
            error: {
                type: FlowToExecutionPlanValidationError.No_ENTRY_POINT,
            },
        };
    }

    const inputsWithErrors: AppNodeMissingInputs[] = [];

    const planned = new Set<string>();

    const invalidInputs = getInvalidInputs(entryPoint, edges, planned);

    if (invalidInputs.length > 0) {
        inputsWithErrors.push({
            nodeId: entryPoint.id,
            inputs: invalidInputs,
        });
    }

    const executionPlan: WorkFlowExecutionPlan = [
        {
            phase: 1,
            nodes: [entryPoint],
        },
    ];

    planned.add(entryPoint.id);

    for (
        let phase = 2; 
        phase <= nodes.length && planned.size < nodes.length; 
        phase++
    ) {
        const nextPhase: WorkFlowExecutionPlanPhase = {phase, nodes: []};

        for(const currentNode of nodes){
            if (planned.has(currentNode.id)) {
                continue; // Skip already planned nodes
            }

            const invalidInputs = getInvalidInputs(currentNode, edges, planned);
            // if (invalidInputs.length > 0) {
            //     const incomers = getIncomers(currentNode, nodes, edges);
            //     if(incomers.every((incomer) => planned.has(incomer.id))) {
            //         console.error("Invalid inputs", currentNode.id, invalidInputs);
            //         inputsWithErrors.push({
            //         nodeId: currentNode.id,
            //         inputs: invalidInputs,
            //     });
            //     } else {
            //         continue; // Skip this node, it has invalid inputs
            //     }
            // }

            // Trying New Logic

            const incomers = getIncomers(currentNode, nodes, edges);
            const allDependenciesPlanned = incomers.every((incomer) => planned.has(incomer.id));

            if (incomers.length > 0) {
                // Node has dependencies
                if (!allDependenciesPlanned) {
                    continue; // Wait for all connected nodes to be planned
                }

                // All dependencies planned: check inputs
                if (invalidInputs.length > 0) {
                    inputsWithErrors.push({
                        nodeId: currentNode.id,
                        inputs: invalidInputs,
                    });
                    continue;
                }
            } else {
                // No incomers: standalone node
                if (invalidInputs.length > 0) {
                    console.error("Invalid inputs", currentNode.id, invalidInputs);
                    inputsWithErrors.push({
                        nodeId: currentNode.id,
                        inputs: invalidInputs,
                    });                    
                }
            }

            nextPhase.nodes.push(currentNode);            
        }

        for (const node of nextPhase.nodes) {
            planned.add(node.id);
        }
        executionPlan.push(nextPhase);
    }

    if (inputsWithErrors.length > 0) {
        return {
            error : {
                type: FlowToExecutionPlanValidationError.INVALID_INPUTS,
                isinvalidElements: inputsWithErrors,
            }
        }
    }
    return {executionPlan}
}

function getInvalidInputs(node: AppNodes, edges: Edge[], planned: Set<string>) {
    const invalidInputs = [];
    const inputs = TaskRegistry[node.data.type].inputs;
    for (const input of inputs ) {
        const inputValue = node.data.inputs[input.name];
        const inputValueProvided = inputValue?.length! > 0;
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
        } else if (!input.required) {
            if(!inputLinkedByOutput) continue;
            if(inputLinkedByOutput && planned.has(inputLinkedByOutput.source)) {
                continue
            }
        }
        invalidInputs.push(input.name);
    }

    return invalidInputs;
}