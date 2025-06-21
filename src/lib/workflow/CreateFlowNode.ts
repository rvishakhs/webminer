import type { AppNodes } from "types/appNode";
import type { TaskType } from "types/task";

export function CreateFlowNode(
    nodeType : TaskType,
    position? : { x: number; y: number },
) : AppNodes {
    return {
        id: crypto.randomUUID(),
        type: "WebMinerNode",
        position: position ?? { x: 0, y: 0 },
        dragHandle: ".drag-handle",
        data: {
            type: nodeType, 
            inputs: {},
        },
    }
}