import type { AppNodes } from "types/appNode";
import type { TaskType } from "types/task";

export function CreateFlowNode(
    nodeType : TaskType,
    position? : { x: number; y: number },
) : AppNodes {
    return {
        id: crypto.randomUUID(),
        position: position ?? { x: 0, y: 0 },
        data: {
            type: nodeType,
            inputs: {},
        },
    }
}